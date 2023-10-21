-- Allow users to access their own data in all tables
CREATE POLICY select_policy_clients ON public.clients 
  FOR SELECT
  USING (
    user_id = auth.uid()
  );

CREATE POLICY select_policy_projects ON public.projects 
  FOR SELECT
  USING (
    id IN (SELECT project_1 FROM clients WHERE user_id = auth.uid() 
           UNION 
           SELECT project_2 FROM clients WHERE user_id = auth.uid() 
           UNION 
           SELECT project_3 FROM clients WHERE user_id = auth.uid())
  );

CREATE POLICY select_policy_logs ON public.logs 
  FOR SELECT
  USING (
    project_id IN (SELECT id FROM projects WHERE id IN (SELECT project_1 FROM clients WHERE user_id = auth.uid() 
                   UNION 
                   SELECT project_2 FROM clients WHERE user_id = auth.uid() 
                   UNION 
                   SELECT project_3 FROM clients WHERE user_id = auth.uid()))
  );

CREATE POLICY select_policy_tokens ON public.tokens 
  FOR SELECT
  USING (
    project_id IN (SELECT id FROM projects WHERE id IN (SELECT project_1 FROM clients WHERE user_id = auth.uid() 
                   UNION 
                   SELECT project_2 FROM clients WHERE user_id = auth.uid() 
                   UNION 
                   SELECT project_3 FROM clients WHERE user_id = auth.uid()))
  );
