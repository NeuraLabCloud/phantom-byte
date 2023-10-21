-- Create custom role type
CREATE TYPE public.Role AS ENUM (
    'User',
    'Mod',
    'Admin',
    'Developer',
    'System'
);

-- Create custom LogLevels type
CREATE TYPE public.LogLevels AS ENUM (
    'Info',
    'Warn',
    'Debug',
    'Error',
    'Trace'
);

-- Create projects table
CREATE TABLE public.projects (
    id BIGINT GENERATED BY DEFAULT AS IDENTITY,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
    members BIGINT [] NOT NULL,
    team_email TEXT NOT NULL,
    description TEXT NULL,
    CONSTRAINT projects_pkey PRIMARY KEY (id)
) TABLESPACE pg_default;

ALTER TABLE
    public.projects ENABLE ROW LEVEL SECURITY;

-- Create clients table
CREATE TABLE public.clients (
    id BIGINT GENERATED BY DEFAULT AS IDENTITY,
    user_id UUID NULL DEFAULT auth.uid (),
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
    role public.Role NOT NULL DEFAULT 'User',
    project_1 BIGINT NULL,
    project_2 BIGINT NULL,
    project_3 BIGINT NULL,
    email CHARACTER VARYING NOT NULL,
    CONSTRAINT Clients_pkey PRIMARY KEY (id),
    CONSTRAINT Clients_user_id_key UNIQUE (user_id),
    CONSTRAINT clients_project_1_fkey FOREIGN KEY (project_1) REFERENCES projects (id),
    CONSTRAINT clients_project_2_fkey FOREIGN KEY (project_2) REFERENCES projects (id),
    CONSTRAINT clients_project_3_fkey FOREIGN KEY (project_3) REFERENCES projects (id)
) TABLESPACE pg_default;

ALTER TABLE
    public.clients ENABLE ROW LEVEL SECURITY;

-- Create logs table
CREATE TABLE public.logs (
    id BIGINT GENERATED BY DEFAULT AS IDENTITY,
    project_id BIGINT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
    data JSONB NULL,
    message TEXT NULL,
    severity public.LogLevels NULL,
    CONSTRAINT logs_pkey PRIMARY KEY (id),
    CONSTRAINT logs_project_id_fkey FOREIGN KEY (project_id) REFERENCES projects (id) ON DELETE CASCADE
) TABLESPACE pg_default;

ALTER TABLE
    public.logs ENABLE ROW LEVEL SECURITY;

-- Create tokens table
CREATE TABLE public.tokens (
    id BIGINT GENERATED BY DEFAULT AS IDENTITY,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
    project_id BIGINT NOT NULL,
    token UUID NOT NULL DEFAULT gen_random_uuid (),
    CONSTRAINT tokens_pkey PRIMARY KEY (id),
    CONSTRAINT tokens_token_key UNIQUE (token),
    CONSTRAINT tokens_project_id_fkey FOREIGN KEY (project_id) REFERENCES projects (id) ON UPDATE CASCADE ON DELETE CASCADE
) TABLESPACE pg_default;

ALTER TABLE
    public.tokens ENABLE ROW LEVEL SECURITY;