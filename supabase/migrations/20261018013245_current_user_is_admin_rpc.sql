-- Lets the app ask "is the signed-in caller an admin?" without exposing the private schema.
-- Security invoker: it runs as the caller and only ever answers about the caller.
create function public.current_user_is_admin()
returns boolean
language sql
stable
security invoker
set search_path = ''
as $$
  select private.is_admin();
$$;
revoke execute on function public.current_user_is_admin() from public, anon;
grant execute on function public.current_user_is_admin() to authenticated;
