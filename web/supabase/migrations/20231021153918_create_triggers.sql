-- Function to handle new users from different providers on sign-up
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
    IF (new.raw_user_meta_data ->> 'iss') = 'https://accounts.google.com' THEN
        INSERT INTO public.clients (user_id, email, username)
        VALUES (new.id, new.email, new.raw_user_meta_data ->> 'name');
    ELSIF (new.raw_user_meta_data ->> 'iss') = 'https://api.github.com' THEN
        INSERT INTO public.clients (user_id, email, username)
        VALUES (new.id, new.email, new.raw_user_meta_data ->> 'user_name');
    END IF;

    RETURN NEW;
END;
$$;

-- Trigger the function every time a user is created
CREATE TRIGGER on_auth_user_created
AFTER
INSERT
  ON auth.users FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();