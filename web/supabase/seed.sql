-- Insert sample data for projects table
INSERT INTO
    public.projects (created_at, members, team_email, description)
VALUES
    (
        NOW(),
        ARRAY [1,2,3],
        'team1@example.com',
        'Project 1 description'
    ),
    (
        NOW(),
        ARRAY [4,5],
        'team2@example.com',
        'Project 2 description'
    ),
    (
        NOW(),
        ARRAY [6,7],
        'team3@example.com',
        'Project 3 description'
    ),
    (
        NOW(),
        ARRAY [8,9],
        'team4@example.com',
        'Project 4 description'
    ),
    (
        NOW(),
        ARRAY [10,11],
        'team5@example.com',
        'Project 5 description'
    );

-- Insert sample data for clients table
INSERT INTO
    public.clients (
        user_id,
        created_at,
        role,
        project_1,
        project_2,
        email,
        username,
        tombstoned
    )
VALUES
    (
        '6ba7b810-9dad-11d1-80b4-00c04fd430c8',
        NOW(),
        'User',
        1,
        2,
        'user1@example.com',
        'User1',
        FALSE
    ),
    (
        '6ba7b811-9dad-11d1-80b4-00c04fd430c8',
        NOW(),
        'Admin',
        2,
        NULL,
        'admin@example.com',
        'Admin1',
        FALSE
    ),
    (
        '6ba7b812-9dad-11d1-80b4-00c04fd430c8',
        NOW(),
        'User',
        3,
        4,
        'user2@example.com',
        'User2',
        FALSE
    ),
    (
        '6ba7b813-9dad-11d1-80b4-00c04fd430c8',
        NOW(),
        'Mod',
        4,
        NULL,
        'moderator@example.com',
        'Mod1',
        FALSE
    ),
    (
        '6ba7b814-9dad-11d1-80b4-00c04fd430c8',
        NOW(),
        'Admin',
        5,
        NULL,
        'admin2@example.com',
        'Admin2',
        FALSE
    );

-- Insert sample data for members table
INSERT INTO
    public.members (created_at, project_id, client_id)
VALUES
    (NOW(), 1, 1),
    (NOW(), 2, 2),
    (NOW(), 3, 3),
    (NOW(), 4, 4),
    (NOW(), 5, 5);

-- Insert sample data for logs table
INSERT INTO
    public.logs (project_id, created_at, data, message, severity)
VALUES
    (
        1,
        NOW(),
        '{"key": "value1"}',
        'Log message 1',
        'Info'
    ),
    (
        2,
        NOW(),
        '{"key": "value2"}',
        'Log message 2',
        'Error'
    ),
    (
        3,
        NOW(),
        '{"key": "value3"}',
        'Log message 3',
        'Debug'
    ),
    (
        4,
        NOW(),
        '{"key": "value4"}',
        'Log message 4',
        'Warn'
    ),
    (
        5,
        NOW(),
        '{"key": "value5"}',
        'Log message 5',
        'Trace'
    );

-- Insert sample data for tokens table
INSERT INTO
    public.tokens (created_at, project_id, token)
VALUES
    (NOW(), 1, '6ba7b815-9dad-11d1-80b4-00c04fd430c8'),
    (NOW(), 2, '6ba7b816-9dad-11d1-80b4-00c04fd430c8'),
    (NOW(), 3, '6ba7b817-9dad-11d1-80b4-00c04fd430c8'),
    (NOW(), 4, '6ba7b818-9dad-11d1-80b4-00c04fd430c8'),
    (NOW(), 5, '6ba7b819-9dad-11d1-80b4-00c04fd430c8');

-- Insert sample data for global_settings table
INSERT INTO
    public.global_settings (created_at, info_id, info_value)
VALUES
    (NOW(), 'caching_enabled', 'true'),
    (NOW(), 'telemetry_enabled', 'false');