-- Certification categories (editorial grouping for the archive filter; no new facts).
update public.certifications set category = 'Electronics and embedded systems' where title in ('Advanced IoT System Design', 'Arduino Fundamentals');
update public.certifications set category = 'Programming and software development' where title = 'C++ Programming for Robotics';

-- Navigation now points at real section pages (rows updated in place; nothing deleted).
update public.navigation_items set href = '/education' where label = 'Education';
update public.navigation_items set href = '/experience' where label = 'Experience';
update public.navigation_items set href = '/certifications' where label = 'Certifications';
update public.navigation_items set label = 'Activities', href = '/activities' where label = 'Skills';

-- Contact rate limits, enforced in the database so direct API calls are limited too.
-- Runs as owner because callers cannot read contact_messages; it only counts, never returns rows.
create function private.limit_contact_messages()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
begin
  if (select count(*) from public.contact_messages
      where lower(email) = lower(new.email) and created_at > now() - interval '1 hour') >= 3 then
    raise exception 'contact_rate_limited' using errcode = 'P0001', hint = 'per_email';
  end if;
  if (select count(*) from public.contact_messages where created_at > now() - interval '1 hour') >= 30 then
    raise exception 'contact_rate_limited' using errcode = 'P0001', hint = 'global';
  end if;
  return new;
end;
$$;
revoke execute on function private.limit_contact_messages() from public, anon, authenticated;

create trigger contact_messages_rate_limit
before insert on public.contact_messages
for each row execute function private.limit_contact_messages();

create index contact_messages_email_created_at_idx on public.contact_messages (lower(email), created_at desc);
