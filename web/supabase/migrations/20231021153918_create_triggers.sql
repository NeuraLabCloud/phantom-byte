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

-- Todo - Fix this someday...
-- This does not work when seeding data because the clients are created after the projects table as 
-- the clients table has a foreign key constraint to the projects table. Because of this, the trigger
-- will cause an error when creating the projects because members belong to clients. So for now, we don't run this!

-- CREATE OR REPLACE FUNCTION public.handle_new_project()
-- RETURNS TRIGGER
-- LANGUAGE plpgsql
-- SECURITY DEFINER
-- SET search_path = public
-- AS $$
-- BEGIN
--     INSERT INTO public.members (project_id, client_id, privileges)
--     VALUES (new.id, new.members[1], 'Owner');

--     RETURN NEW;
-- END;
-- $$;

-- CREATE TRIGGER on_project_created
-- AFTER
-- INSERT
--   ON public.projects FOR EACH ROW EXECUTE PROCEDURE public.handle_new_project();