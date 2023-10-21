-- Define a function that handles the insertion of a new user into the public.clients table
CREATE
OR REPLACE FUNCTION public.handle_new_user() RETURNS TRIGGER LANGUAGE plpgsql SECURITY DEFINER
SET
  search_path = public AS $$ BEGIN -- We want to pass the id, email to the new clients object
INSERT INTO
  public.clients (user_id, email)
VALUES
  (new.id, new.email);

RETURN NEW;

END;

$$;

-- Trigger the function every time a user is created
CREATE TRIGGER on_auth_user_created
AFTER
INSERT
  ON auth.users FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();