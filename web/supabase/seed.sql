-- Seed data for projects table
INSERT INTO public.projects (created_at, name, description, team_support_email, members) 
VALUES 
(NOW(), 'Project 1', 'Description for Project 1', 'team1@example.com', ARRAY[1, 2]),
(NOW(), 'Project 2', 'Description for Project 2', 'team2@example.com', ARRAY[3, 4]),
(NOW(), 'Project 3', 'Description for Project 3', 'team3@example.com', ARRAY[5, 6]),
(NOW(), 'Project 4', 'Description for Project 4', 'team4@example.com', ARRAY[7, 8]),
(NOW(), 'Project 5', 'Description for Project 5', 'team5@example.com', ARRAY[9, 10]);


-- Seed data for project_service table
INSERT INTO public.project_service (created_at, project_id, name, description) 
VALUES 
(NOW(), 1, 'Service 1', 'Description for Service 1'),
(NOW(), 2, 'Service 2', 'Description for Service 2'),
(NOW(), 3, 'Service 3', 'Description for Service 3'),
(NOW(), 4, 'Service 4', 'Description for Service 4'),
(NOW(), 5, 'Service 5', 'Description for Service 5');

-- Seed data for clients table
INSERT INTO public.clients (user_id, created_at, role, email, username, tombstoned) 
VALUES 
('123e4567-e89b-12d3-a456-426614174000', NOW(), 'User', 'user1@example.com', 'user1', FALSE),
('223e4567-e89b-12d3-a456-426614174000', NOW(), 'User', 'user2@example.com', 'user2', FALSE),
('323e4567-e89b-12d3-a456-426614174000', NOW(), 'User', 'user3@example.com', 'user3', FALSE),
('423e4567-e89b-12d3-a456-426614174000', NOW(), 'User', 'user4@example.com', 'user4', FALSE),
('523e4567-e89b-12d3-a456-426614174000', NOW(), 'User', 'user5@example.com', 'user5', FALSE);

-- Seed data for members table
INSERT INTO public.members (created_at, project_id, client_id, privileges) 
VALUES 
(NOW(), 1, 1, 'Owner'),
(NOW(), 2, 2, 'Admin'),
(NOW(), 3, 3, 'Write'),
(NOW(), 4, 4, 'Read'),
(NOW(), 5, 5, 'Write');

-- Seed data for logs table
INSERT INTO public.logs (project_id, service_id, created_at, data, message, severity) 
VALUES 
(1, 1, NOW(), '{"key": "value"}', 'Log message 1', 'Info'),
(2, 2, NOW(), '{"key": "value"}', 'Log message 2', 'Debug'),
(3, 3, NOW(), '{"key": "value"}', 'Log message 3', 'Warn'),
(4, 4, NOW(), '{"key": "value"}', 'Log message 4', 'Error'),
(5, 5, NOW(), '{"key": "value"}', 'Log message 5', 'Trace');

-- Seed data for tokens table
INSERT INTO public.tokens (created_at, project_id) 
VALUES 
(NOW(), 1),
(NOW(), 2),
(NOW(), 3),
(NOW(), 4),
(NOW(), 5);

-- Seed data for global_settings table
INSERT INTO public.global_settings (created_at, info_id, info_value) 
VALUES 
(NOW(), 'caching_enabled', 'true'),
(NOW(), 'telemetry_enabled', 'false'),
(NOW(), 'logging_enabled', 'true'),
(NOW(), 'debug_mode', 'false'),
(NOW(), 'maintenance_mode', 'false');
