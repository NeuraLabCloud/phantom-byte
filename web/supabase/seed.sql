-- Seed data for projects table
INSERT INTO public.projects (members, team_email, description)
VALUES 
    ('{1,2}', 'team1@example.com', 'Project 1 Description'),
    ('{3,4}', 'team2@example.com', 'Project 2 Description'),
    ('{5}', 'team3@example.com', 'Project 3 Description'),
    ('{6,7}', 'team4@example.com', 'Project 4 Description'),
    ('{8,9}', 'team5@example.com', 'Project 5 Description');

-- Seed data for clients table
INSERT INTO public.clients (user_id, role, project_1, project_2, project_3, email, username, tombstoned)
VALUES 
    ('aa58f2d2-72f3-4158-9d17-0d33f9e70a3e', 'User', 1, 2, NULL, 'user1@example.com', 'user1', FALSE),
    ('ee9d7d6c-2876-4e19-bd17-15d6f1dca68a', 'Mod', 3, 4, NULL, 'user2@example.com', 'user2', FALSE),
    ('cb8f89a3-0bf7-4a6b-8bc6-96d8760f9a45', 'Admin', 5, NULL, NULL, 'admin1@example.com', 'admin1', FALSE),
    ('70b3e8e5-2d79-4e16-85f7-43f9e0a7a7de', 'User', NULL, NULL, NULL, 'user3@example.com', 'user3', TRUE),
    ('fe683103-24ce-4f0e-97f0-cdb3650ac891', 'Developer', 4, NULL, NULL, 'dev1@example.com', 'dev1', FALSE);

-- Seed data for members table
INSERT INTO public.members (project_id, client_id, privileges)
VALUES 
    (1, 1, 'Admin'),
    (1, 2, 'Write'),
    (2, 3, 'Read'),
    (2, 4, 'Admin'),
    (3, 5, 'Owner');

-- Seed data for logs table
INSERT INTO public.logs (project_id, data, message, severity)
VALUES 
    (1, '{"key": "value1"}', 'Log message 1', 'Info'),
    (1, '{"key": "value2"}', 'Log message 2', 'Error'),
    (2, '{"key": "value3"}', 'Log message 3', 'Warn'),
    (3, '{"key": "value4"}', 'Log message 4', 'Debug'),
    (4, '{"key": "value5"}', 'Log message 5', 'Trace');

-- Seed data for tokens table
INSERT INTO public.tokens (project_id, token)
VALUES 
    (1, '9a8cb0f8-04ff-43b7-af87-9740c0f95f1d'),
    (2, 'd6c48404-9062-4db3-aef8-258f5d978a49'),
    (3, 'b1e76b13-ea8e-4c6d-a55c-f047d1f32ea1'),
    (4, '229a9e61-6016-45f6-9c63-5d994f27b8ce'),
    (5, '03619bd2-7482-4a92-bd01-69f1810d4475');

-- Seed data for global_settings table
INSERT INTO public.global_settings (info_id, info_value)
VALUES 
    ('caching_enabled', 'true'),
    ('telemetry_enabled', 'false'),
    ('feature_toggle_1', 'true'),
    ('feature_toggle_2', 'false'),
    ('max_connections', '100');
