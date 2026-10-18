-- Atomic reordering for the CMS: sets sort_order to each id's position in one statement.
-- Security invoker, so the caller's RLS policies apply (only admins can update content tables).
-- The table name is checked against a fixed allow-list before it is used as an identifier.
create function public.reorder_rows(p_table text, p_ids bigint[])
returns void
language plpgsql
security invoker
set search_path = ''
as $$
begin
  if p_table not in ('projects', 'education', 'experience', 'certifications', 'skills',
                     'activities', 'social_links', 'navigation_items') then
    raise exception 'reorder not allowed for %', p_table using errcode = '42501';
  end if;
  execute format(
    'update public.%I t set sort_order = o.pos from unnest($1) with ordinality as o(id, pos) where t.id = o.id',
    p_table
  ) using p_ids;
end;
$$;
revoke execute on function public.reorder_rows(text, bigint[]) from public, anon;
grant execute on function public.reorder_rows(text, bigint[]) to authenticated;
