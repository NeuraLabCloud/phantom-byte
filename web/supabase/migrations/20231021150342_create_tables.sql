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

-- Create custom ProjectMemberPrivileges type
CREATE TYPE public.ProjectMemberPrivileges AS ENUM (
    'Read',
    'Write',
    'Admin',
    'Owner'
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

-- Create project_service table
-- Each log will be associated with a service. This table will hold the services for each project.
-- This way clients can separate different services within a project and filter logs by service.
CREATE TABLE public.project_service (
    id BIGINT GENERATED BY DEFAULT AS IDENTITY,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
    project_id BIGINT NOT NULL,
    name TEXT NOT NULL,
    description TEXT NULL,
    CONSTRAINT project_service_pkey PRIMARY KEY (id),
    CONSTRAINT project_service_project_id_fkey FOREIGN KEY (project_id) REFERENCES projects (id) ON UPDATE CASCADE ON DELETE CASCADE
) TABLESPACE pg_default;

ALTER TABLE
    public.project_service ENABLE ROW LEVEL SECURITY;

-- Create clients table
CREATE TABLE public.clients (
    id BIGINT GENERATED BY DEFAULT AS IDENTITY,
    user_id UUID NOT NULL DEFAULT auth.uid (),
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
    role public.Role NOT NULL DEFAULT 'User',
    project_1 BIGINT NULL,
    project_2 BIGINT NULL,
    project_3 BIGINT NULL,
    email CHARACTER VARYING NOT NULL,
    username TEXT NULL,
    tombstoned BOOLEAN NOT NULL DEFAULT FALSE,
    CONSTRAINT Clients_pkey PRIMARY KEY (id),
    CONSTRAINT Clients_user_id_key UNIQUE (user_id),
    CONSTRAINT clients_project_1_fkey FOREIGN KEY (project_1) REFERENCES projects (id),
    CONSTRAINT clients_project_2_fkey FOREIGN KEY (project_2) REFERENCES projects (id),
    CONSTRAINT clients_project_3_fkey FOREIGN KEY (project_3) REFERENCES projects (id)
) TABLESPACE pg_default;

ALTER TABLE
    public.clients ENABLE ROW LEVEL SECURITY;

ALTER publication supabase_realtime add TABLE public.clients;

-- Create members table
-- Members of a project will have different privileges.
CREATE TABLE public.members (
    id BIGINT GENERATED BY DEFAULT AS IDENTITY,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
    project_id BIGINT NOT NULL,
    client_id BIGINT NOT NULL,
    privileges public.ProjectMemberPrivileges NOT NULL DEFAULT 'Read',
    CONSTRAINT members_pkey PRIMARY KEY (id),
    CONSTRAINT members_project_id_fkey FOREIGN KEY (project_id) REFERENCES projects (id) ON UPDATE cascade ON DELETE CASCADE,
    CONSTRAINT members_client_id_fkey FOREIGN KEY (client_id) REFERENCES clients (id) ON UPDATE cascade ON DELETE CASCADE
) TABLESPACE pg_default;

ALTER TABLE
    public.members ENABLE ROW LEVEL SECURITY;

-- Create logs table
CREATE TABLE public.logs (
    id BIGINT GENERATED BY DEFAULT AS IDENTITY,
    project_id BIGINT NOT NULL,
    service_id BIGINT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
    data JSONB NULL,
    message TEXT NULL,
    severity public.LogLevels NULL,
    CONSTRAINT logs_pkey PRIMARY KEY (id),
    CONSTRAINT logs_project_id_fkey FOREIGN KEY (project_id) REFERENCES projects (id) ON DELETE CASCADE,
    CONSTRAINT logs_service_id_fkey FOREIGN KEY (service_id) REFERENCES project_service (id) ON DELETE CASCADE
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

-- Create global table
-- The global table controls the global settings for the system.
-- The info_id is the unique identifier for the setting. Eg. "caching_enabled" or "telemetry_enabled"
-- The info_value is the value of the setting. Eg. "true" or "false". This will always be a string and will need to be parsed by the client.
CREATE TABLE public.global_settings (
    id BIGINT GENERATED BY DEFAULT AS IDENTITY,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
    info_id TEXT NOT NULL,
    info_value TEXT NOT NULL,
    CONSTRAINT global_pkey PRIMARY KEY (id),
    CONSTRAINT global_info_id_key UNIQUE (info_id)
) TABLESPACE pg_default;

ALTER TABLE
    public.global_settings ENABLE ROW LEVEL SECURITY;