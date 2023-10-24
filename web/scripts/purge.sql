-- Drop policies
DROP POLICY IF EXISTS select_policy_clients ON public.clients;
DROP POLICY IF EXISTS select_policy_logs ON public.logs;
DROP POLICY IF EXISTS select_policy_tokens ON public.tokens;
DROP POLICY IF EXISTS select_policy_projects ON public.projects;
DROP POLICY IF EXISTS update_policy_clients ON public.clients;

-- Drop tables
DROP TABLE IF EXISTS public.clients CASCADE;
DROP TABLE IF EXISTS public.tokens CASCADE;
DROP TABLE IF EXISTS public.logs CASCADE;
DROP TABLE IF EXISTS public.projects CASCADE;
DROP TABLE IF EXISTS public.project_service CASCADE;
DROP TABLE IF EXISTS public.members CASCADE;
DROP TABLE IF EXISTS public.global_settings CASCADE;


-- Drop Functions and Triggers
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
DROP FUNCTION IF EXISTS public.handle_new_user();

-- Drop Types
DROP TYPE IF EXISTS public.Role;
DROP TYPE IF EXISTS public.LogLevels;
DROP TYPE IF EXISTS public.ProjectMemberPrivileges;