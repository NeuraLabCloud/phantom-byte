-- Seed data for projects table
INSERT INTO public.projects (created_at, members, team_email, description) 
VALUES 
    ('2023-10-15 07:00:00', '{1,2}', 'team1@example.com', 'First project'),
    ('2023-10-14 06:00:00', '{3,4}', 'team2@example.com', 'Second project');

-- Seed data for clients table
INSERT INTO public.clients (user_id, created_at, role, project_1, project_2, email) 
VALUES 
    ('e715539e-cc6f-4ad8-9a90-648da33b8f8a', '2023-10-20 12:00:00', 'User', 1, NULL, 'client1@example.com'),
    ('c048305a-8b7f-4e57-8d26-15b5f4ddbe8d', '2023-10-19 11:00:00', 'User', 1, 2, 'client2@example.com'),
    ('d973cd5a-0a2d-4213-a8ab-93df0a5e8754', '2023-10-18 10:00:00', 'User', NULL, 2, 'client3@example.com'),
    ('9a8d9a45-3c19-4ff6-b77b-ec45c5c58563', '2023-10-17 09:00:00', 'User', 2, 1, 'client4@example.com'),
    ('2bb0c9c5-3b04-4b25-8bfc-02062d01827f', '2023-10-16 08:00:00', 'User', 2, NULL, 'client5@example.com');

-- Seed data for logs table
INSERT INTO public.logs (project_id, created_at, data, message, severity) 
VALUES 
    (1, '2023-10-14 07:00:00', '{"key": "value"}', 'Log message 1', 'Info'),
    (1, '2023-10-14 08:00:00', '{"key": "value2"}', 'Log message 2', 'Warn'),
    (2, '2023-10-15 09:00:00', '{"key": "value3"}', 'Log message 3', 'Error'),
    (2, '2023-10-15 10:00:00', '{"key": "value4"}', 'Log message 4', 'Info'),
    (2, '2023-10-15 11:00:00', '{"key": "value5"}', 'Log message 5', 'Error');

-- Seed data for tokens table
INSERT INTO public.tokens (project_id, created_at, token) 
VALUES 
    (1, '2023-10-14 07:00:00', 'f8a3dc9c-dcb3-42d4-bccd-8ad759d8e7bb'),
    (2, '2023-10-15 09:00:00', '245aef72-6010-4d17-9f3f-48bf3f0a5066'),
    (2, '2023-10-15 10:00:00', 'b80b55db-af33-4804-a23f-1e49ac1cf434');
