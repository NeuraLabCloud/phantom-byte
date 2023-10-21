-- inserts a row into public.profiles
CREATE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
-- This will be passed to the supabase function body
BEGIN
  -- We want to pass the id, email to the new clients object
  INSERT INTO public.clients (user_id, email)
  VALUES (new.id, new.email);
  RETURN NEW;
END;
$$;


-- trigger the function every time a user is created
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();
