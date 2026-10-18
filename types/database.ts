// Subset of the Supabase-generated types for the tables the app reads or writes.
// Regenerate with the Supabase MCP `generate_typescript_types` (or `supabase gen types`) after schema changes.

type Table<Row, Insert = Partial<Row>> = { Row: Row; Insert: Insert; Update: Partial<Row>; Relationships: [] };

export type ProjectStatus = "prototype" | "experiment" | "in_progress" | "completed";
export type CredentialKind = "verified" | "informal" | "in_progress";

export type Database = {
  public: {
    Tables: {
      profiles: Table<{
        id: number;
        name: string;
        headline: string;
        about: string;
        interests: string[];
        location: string | null;
        languages: string | null;
        public_email: string | null;
        portrait_asset_id: number | null;
        cv_asset_id: number | null;
        published: boolean;
      }>;
      projects: Table<{
        id: number;
        slug: string;
        title: string;
        category: string;
        summary: string;
        status: ProjectStatus | null;
        problem: string | null;
        motivation: string | null;
        approach: string | null;
        hardware: string[];
        software: string[];
        challenges: string | null;
        results: string | null;
        lessons: string | null;
        started_on: string | null;
        completed_on: string | null;
        repo_url: string | null;
        demo_url: string | null;
        docs_url: string | null;
        featured: boolean;
        sort_order: number;
        published: boolean;
        updated_at: string;
      }>;
      education: Table<{
        id: number;
        institution: string;
        qualification: string;
        field_of_study: string | null;
        location: string | null;
        start_date: string;
        end_date: string | null;
        grade: string | null;
        note: string | null;
        coursework: string[];
        achievements: string[];
        description: string | null;
        sort_order: number;
        published: boolean;
      }>;
      experience: Table<{
        id: number;
        organization: string;
        role: string;
        employment_type: string;
        location: string | null;
        start_date: string;
        end_date: string | null;
        responsibilities: string[];
        achievements: string[];
        technologies: string[];
        sort_order: number;
        published: boolean;
      }>;
      certifications: Table<{
        id: number;
        title: string;
        issuer: string;
        issued_year: number;
        issued_on: string | null;
        expires_on: string | null;
        credential_id: string | null;
        credential_url: string | null;
        category: string | null;
        kind: CredentialKind;
        description: string | null;
        media_asset_id: number | null;
        sort_order: number;
        published: boolean;
      }>;
      skills: Table<{ id: number; name: string; category: string; level: string | null; sort_order: number; published: boolean }>;
      activities: Table<{
        id: number;
        slug: string;
        title: string;
        occurred_on: string;
        location: string | null;
        category: string;
        summary: string;
        story: string | null;
        organizer: string | null;
        external_url: string | null;
        cover_asset_id: number | null;
        achievements: string[];
        sort_order: number;
        published: boolean;
      }>;
      project_media: Table<{ id: number; project_id: number; media_asset_id: number; kind: string; caption: string | null; is_cover: boolean; sort_order: number }>;
      media_assets: Table<{ id: number; bucket: string; path: string; alt: string; mime_type: string; width: number | null; height: number | null }>;
      social_links: Table<{ id: number; label: string; url: string; sort_order: number; published: boolean }>;
      navigation_items: Table<{ id: number; label: string; href: string; sort_order: number; published: boolean }>;
      contact_messages: Table<
        { id: number; name: string; email: string; subject: string | null; message: string; handled: boolean; created_at: string },
        { name: string; email: string; subject?: string | null; message: string }
      >;
    };
    Views: Record<string, never>;
    Functions: { current_user_is_admin: { Args: never; Returns: boolean } };
    Enums: { project_status: ProjectStatus; credential_kind: CredentialKind };
    CompositeTypes: Record<string, never>;
  };
};
