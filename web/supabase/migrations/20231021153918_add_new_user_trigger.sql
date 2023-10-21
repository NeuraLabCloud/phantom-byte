-- Define a function that handles the insertion of a new user into the public.clients table
CREATE
OR REPLACE FUNCTION public.handle_new_user() RETURNS TRIGGER LANGUAGE plpgsql AS $ $ BEGIN -- Insert a new row into the public.clients table using the values from the new user
INSERT INTO
  public.clients (user_id, email)
VALUES
  (NEW.id, NEW.email);

-- You need to return the NEW variable to complete the trigger operation
RETURN NEW;

END;

-- Create a trigger to execute the function every time a user is created in the auth.users table
CREATE TRIGGER on_auth_user_created
AFTER
INSERT
  ON auth.users FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();