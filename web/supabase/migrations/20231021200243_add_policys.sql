-- SELECT POLICY'S

-- Allow users to access their own data in the public.clients table
CREATE POLICY select_policy_clients ON public.clients FOR
SELECT
  TO authenticated USING (user_id = auth.uid());

-- Allow users to access specific projects they are associated with in the public.projects table
CREATE POLICY select_policy_projects ON public.projects FOR
SELECT
  TO authenticated USING (
    id IN (
      SELECT
        project_1
      FROM
        clients
      WHERE
        user_id = auth.uid()
      UNION
      SELECT
        project_2
      FROM
        clients
      WHERE
        user_id = auth.uid()
      UNION
      SELECT
        project_3
      FROM
        clients
      WHERE
        user_id = auth.uid()
    )
  );

-- Allow users to access logs associated with projects they are associated with in the public.logs table
CREATE POLICY select_policy_logs ON public.logs FOR
SELECT
  TO authenticated USING (
    project_id IN (
      SELECT
        id
      FROM
        projects
      WHERE
        id IN (
          SELECT
            project_1
          FROM
            clients
          WHERE
            user_id = auth.uid()
          UNION
          SELECT
            project_2
          FROM
            clients
          WHERE
            user_id = auth.uid()
          UNION
          SELECT
            project_3
          FROM
            clients
          WHERE
            user_id = auth.uid()
        )
    )
  );

-- Allow users to access tokens associated with projects they are associated with in the public.tokens table
CREATE POLICY select_policy_tokens ON public.tokens FOR
SELECT
  TO authenticated USING (
    project_id IN (
      SELECT
        id
      FROM
        projects
      WHERE
        id IN (
          SELECT
            project_1
          FROM
            clients
          WHERE
            user_id = auth.uid()
          UNION
          SELECT
            project_2
          FROM
            clients
          WHERE
            user_id = auth.uid()
          UNION
          SELECT
            project_3
          FROM
            clients
          WHERE
            user_id = auth.uid()
        )
    )
  );

-- UPDATE POLICY'S
CREATE POLICY update_policy_clients
ON public.clients
FOR UPDATE TO authenticated USING (
  auth.jwt() ->> 'email' = email
) WITH CHECK (
  auth.jwt() ->> 'email' = email
);