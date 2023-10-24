export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      clients: {
        Row: {
          created_at: string;
          email: string;
          id: number;
          project_1: number | null;
          project_2: number | null;
          project_3: number | null;
          role: Database["public"]["Enums"]["role"];
          tombstoned: boolean;
          user_id: string;
          username: string | null;
        };
        Insert: {
          created_at?: string;
          email: string;
          id?: number;
          project_1?: number | null;
          project_2?: number | null;
          project_3?: number | null;
          role?: Database["public"]["Enums"]["role"];
          tombstoned?: boolean;
          user_id?: string;
          username?: string | null;
        };
        Update: {
          created_at?: string;
          email?: string;
          id?: number;
          project_1?: number | null;
          project_2?: number | null;
          project_3?: number | null;
          role?: Database["public"]["Enums"]["role"];
          tombstoned?: boolean;
          user_id?: string;
          username?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "clients_project_1_fkey";
            columns: ["project_1"];
            referencedRelation: "projects";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "clients_project_2_fkey";
            columns: ["project_2"];
            referencedRelation: "projects";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "clients_project_3_fkey";
            columns: ["project_3"];
            referencedRelation: "projects";
            referencedColumns: ["id"];
          },
        ];
      };
      global_settings: {
        Row: {
          created_at: string;
          id: number;
          info_id: string;
          info_value: string;
        };
        Insert: {
          created_at?: string;
          id?: number;
          info_id: string;
          info_value: string;
        };
        Update: {
          created_at?: string;
          id?: number;
          info_id?: string;
          info_value?: string;
        };
        Relationships: [];
      };
      logs: {
        Row: {
          created_at: string;
          data: Json | null;
          id: number;
          message: string | null;
          project_id: number;
          service_id: number;
          severity: Database["public"]["Enums"]["loglevels"] | null;
        };
        Insert: {
          created_at?: string;
          data?: Json | null;
          id?: number;
          message?: string | null;
          project_id: number;
          service_id: number;
          severity?: Database["public"]["Enums"]["loglevels"] | null;
        };
        Update: {
          created_at?: string;
          data?: Json | null;
          id?: number;
          message?: string | null;
          project_id?: number;
          service_id?: number;
          severity?: Database["public"]["Enums"]["loglevels"] | null;
        };
        Relationships: [
          {
            foreignKeyName: "logs_project_id_fkey";
            columns: ["project_id"];
            referencedRelation: "projects";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "logs_service_id_fkey";
            columns: ["service_id"];
            referencedRelation: "project_service";
            referencedColumns: ["id"];
          },
        ];
      };
      members: {
        Row: {
          client_id: number;
          created_at: string;
          id: number;
          privileges: Database["public"]["Enums"]["projectmemberprivileges"];
          project_id: number;
        };
        Insert: {
          client_id: number;
          created_at?: string;
          id?: number;
          privileges?: Database["public"]["Enums"]["projectmemberprivileges"];
          project_id: number;
        };
        Update: {
          client_id?: number;
          created_at?: string;
          id?: number;
          privileges?: Database["public"]["Enums"]["projectmemberprivileges"];
          project_id?: number;
        };
        Relationships: [
          {
            foreignKeyName: "members_client_id_fkey";
            columns: ["client_id"];
            referencedRelation: "clients";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "members_project_id_fkey";
            columns: ["project_id"];
            referencedRelation: "projects";
            referencedColumns: ["id"];
          },
        ];
      };
      project_service: {
        Row: {
          created_at: string;
          description: string | null;
          id: number;
          name: string;
          project_id: number;
        };
        Insert: {
          created_at?: string;
          description?: string | null;
          id?: number;
          name: string;
          project_id: number;
        };
        Update: {
          created_at?: string;
          description?: string | null;
          id?: number;
          name?: string;
          project_id?: number;
        };
        Relationships: [
          {
            foreignKeyName: "project_service_project_id_fkey";
            columns: ["project_id"];
            referencedRelation: "projects";
            referencedColumns: ["id"];
          },
        ];
      };
      projects: {
        Row: {
          created_at: string;
          description: string | null;
          id: number;
          members: number[];
          team_email: string;
        };
        Insert: {
          created_at?: string;
          description?: string | null;
          id?: number;
          members: number[];
          team_email: string;
        };
        Update: {
          created_at?: string;
          description?: string | null;
          id?: number;
          members?: number[];
          team_email?: string;
        };
        Relationships: [];
      };
      tokens: {
        Row: {
          created_at: string;
          id: number;
          project_id: number;
          token: string;
        };
        Insert: {
          created_at?: string;
          id?: number;
          project_id: number;
          token?: string;
        };
        Update: {
          created_at?: string;
          id?: number;
          project_id?: number;
          token?: string;
        };
        Relationships: [
          {
            foreignKeyName: "tokens_project_id_fkey";
            columns: ["project_id"];
            referencedRelation: "projects";
            referencedColumns: ["id"];
          },
        ];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      loglevels: "Info" | "Warn" | "Debug" | "Error" | "Trace";
      projectmemberprivileges: "Read" | "Write" | "Admin" | "Owner";
      role: "User" | "Mod" | "Admin" | "Developer" | "System";
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
  storage: {
    Tables: {
      buckets: {
        Row: {
          allowed_mime_types: string[] | null;
          avif_autodetection: boolean | null;
          created_at: string | null;
          file_size_limit: number | null;
          id: string;
          name: string;
          owner: string | null;
          public: boolean | null;
          updated_at: string | null;
        };
        Insert: {
          allowed_mime_types?: string[] | null;
          avif_autodetection?: boolean | null;
          created_at?: string | null;
          file_size_limit?: number | null;
          id: string;
          name: string;
          owner?: string | null;
          public?: boolean | null;
          updated_at?: string | null;
        };
        Update: {
          allowed_mime_types?: string[] | null;
          avif_autodetection?: boolean | null;
          created_at?: string | null;
          file_size_limit?: number | null;
          id?: string;
          name?: string;
          owner?: string | null;
          public?: boolean | null;
          updated_at?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "buckets_owner_fkey";
            columns: ["owner"];
            referencedRelation: "users";
            referencedColumns: ["id"];
          },
        ];
      };
      migrations: {
        Row: {
          executed_at: string | null;
          hash: string;
          id: number;
          name: string;
        };
        Insert: {
          executed_at?: string | null;
          hash: string;
          id: number;
          name: string;
        };
        Update: {
          executed_at?: string | null;
          hash?: string;
          id?: number;
          name?: string;
        };
        Relationships: [];
      };
      objects: {
        Row: {
          bucket_id: string | null;
          created_at: string | null;
          id: string;
          last_accessed_at: string | null;
          metadata: Json | null;
          name: string | null;
          owner: string | null;
          path_tokens: string[] | null;
          updated_at: string | null;
          version: string | null;
        };
        Insert: {
          bucket_id?: string | null;
          created_at?: string | null;
          id?: string;
          last_accessed_at?: string | null;
          metadata?: Json | null;
          name?: string | null;
          owner?: string | null;
          path_tokens?: string[] | null;
          updated_at?: string | null;
          version?: string | null;
        };
        Update: {
          bucket_id?: string | null;
          created_at?: string | null;
          id?: string;
          last_accessed_at?: string | null;
          metadata?: Json | null;
          name?: string | null;
          owner?: string | null;
          path_tokens?: string[] | null;
          updated_at?: string | null;
          version?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "objects_bucketId_fkey";
            columns: ["bucket_id"];
            referencedRelation: "buckets";
            referencedColumns: ["id"];
          },
        ];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      can_insert_object: {
        Args: {
          bucketid: string;
          name: string;
          owner: string;
          metadata: Json;
        };
        Returns: undefined;
      };
      extension: {
        Args: {
          name: string;
        };
        Returns: string;
      };
      filename: {
        Args: {
          name: string;
        };
        Returns: string;
      };
      foldername: {
        Args: {
          name: string;
        };
        Returns: unknown;
      };
      get_size_by_bucket: {
        Args: Record<PropertyKey, never>;
        Returns: {
          size: number;
          bucket_id: string;
        }[];
      };
      search: {
        Args: {
          prefix: string;
          bucketname: string;
          limits?: number;
          levels?: number;
          offsets?: number;
          search?: string;
          sortcolumn?: string;
          sortorder?: string;
        };
        Returns: {
          name: string;
          id: string;
          updated_at: string;
          created_at: string;
          last_accessed_at: string;
          metadata: Json;
        }[];
      };
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
}
