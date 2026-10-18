// Every CMS-editable content type, described once. Lists, forms, validation and saves are driven from here.

export type FieldType =
  | "text"
  | "textarea"
  | "list" // one item per line -> text[]
  | "date"
  | "number"
  | "url"
  | "email"
  | "boolean"
  | "select"
  | "media"; // a media_assets id, chosen from the library

export type Field = {
  name: string;
  label: string;
  type: FieldType;
  required?: boolean;
  max?: number;
  options?: { value: string; label: string }[];
  help?: string;
  pattern?: { regex: string; message: string };
  wide?: boolean; // spans both form columns
};

export type Module = {
  key: string;
  table: string;
  label: string;
  singular: string;
  tags: string[]; // cache tags to refresh after any change
  titleField: string;
  subtitle?: (row: Record<string, unknown>) => string;
  orderable: boolean;
  publishable: boolean;
  singleton?: boolean; // one row (the profile)
  fields: Field[];
};

const slug: Field = {
  name: "slug",
  label: "URL slug",
  type: "text",
  required: true,
  max: 80,
  pattern: { regex: "^[a-z0-9]+(-[a-z0-9]+)*$", message: "Use lowercase letters, numbers and single hyphens." },
  help: "Appears in the page address, e.g. line-following-robot.",
};
const https = { regex: "^https://", message: "Use a full https:// address." };

export const MODULES: Module[] = [
  {
    key: "projects",
    table: "projects",
    label: "Projects",
    singular: "project",
    tags: ["projects"],
    titleField: "title",
    subtitle: (r) => [r.category, r.status ?? "status TBC"].filter(Boolean).join(" · "),
    orderable: true,
    publishable: true,
    fields: [
      { name: "title", label: "Title", type: "text", required: true, max: 200 },
      slug,
      { name: "category", label: "Category", type: "text", max: 80 },
      {
        name: "status",
        label: "Status",
        type: "select",
        options: [
          { value: "", label: "Not stated (shows “Status TBC”)" },
          { value: "prototype", label: "Prototype" },
          { value: "experiment", label: "Experiment" },
          { value: "in_progress", label: "In progress" },
          { value: "completed", label: "Completed" },
        ],
        help: "Never mark a prototype as completed.",
      },
      { name: "summary", label: "Short description", type: "textarea", required: true, max: 600, wide: true },
      { name: "problem", label: "Problem statement", type: "textarea", max: 4000, wide: true },
      { name: "motivation", label: "Motivation and objectives", type: "textarea", max: 4000, wide: true },
      { name: "approach", label: "Technical approach", type: "textarea", max: 6000, wide: true },
      { name: "hardware", label: "Hardware components", type: "list", help: "One per line." },
      { name: "software", label: "Software and frameworks", type: "list", help: "One per line." },
      { name: "challenges", label: "Challenges and trade-offs", type: "textarea", max: 4000, wide: true },
      { name: "results", label: "Results and verified metrics", type: "textarea", max: 4000, wide: true },
      { name: "lessons", label: "Lessons learned", type: "textarea", max: 4000, wide: true },
      { name: "started_on", label: "Started", type: "date" },
      { name: "completed_on", label: "Completed", type: "date" },
      { name: "repo_url", label: "Source repository", type: "url", pattern: https },
      { name: "demo_url", label: "Live demo", type: "url", pattern: https },
      { name: "docs_url", label: "Documentation", type: "url", pattern: https },
      { name: "cover_media_id", label: "Cover image", type: "media", help: "Upload in the Media library first." },
      { name: "featured", label: "Featured on the home page", type: "boolean" },
    ],
  },
  {
    key: "education",
    table: "education",
    label: "Education",
    singular: "education entry",
    tags: ["education"],
    titleField: "qualification",
    subtitle: (r) => String(r.institution ?? ""),
    orderable: true,
    publishable: true,
    fields: [
      { name: "qualification", label: "Qualification", type: "text", required: true, max: 200 },
      { name: "institution", label: "Institution", type: "text", required: true, max: 200 },
      { name: "field_of_study", label: "Field of study", type: "text", max: 200 },
      { name: "location", label: "Location", type: "text", max: 120 },
      { name: "start_date", label: "Start date", type: "date", required: true },
      { name: "end_date", label: "End date", type: "date", help: "Leave empty if current." },
      { name: "grade", label: "Grade", type: "text", max: 80 },
      { name: "note", label: "Note (e.g. scholarship)", type: "text", max: 200 },
      { name: "coursework", label: "Relevant coursework", type: "list" },
      { name: "achievements", label: "Achievements", type: "list" },
      { name: "description", label: "Description", type: "textarea", max: 4000, wide: true },
    ],
  },
  {
    key: "experience",
    table: "experience",
    label: "Experience",
    singular: "experience entry",
    tags: ["experience"],
    titleField: "role",
    subtitle: (r) => String(r.organization ?? ""),
    orderable: true,
    publishable: true,
    fields: [
      { name: "role", label: "Role", type: "text", required: true, max: 200 },
      { name: "organization", label: "Organization", type: "text", required: true, max: 200 },
      {
        name: "employment_type",
        label: "Type",
        type: "select",
        required: true,
        options: ["employment", "internship", "research", "teaching", "volunteer", "freelance", "other"].map((v) => ({
          value: v,
          label: v[0].toUpperCase() + v.slice(1),
        })),
      },
      { name: "location", label: "Location", type: "text", max: 120 },
      { name: "start_date", label: "Start date", type: "date", required: true },
      { name: "end_date", label: "End date", type: "date", help: "Leave empty if current." },
      { name: "responsibilities", label: "Responsibilities", type: "list" },
      { name: "achievements", label: "Achievements", type: "list" },
      { name: "technologies", label: "Technologies", type: "list" },
    ],
  },
  {
    key: "certifications",
    table: "certifications",
    label: "Certifications",
    singular: "certification",
    tags: ["certifications"],
    titleField: "title",
    subtitle: (r) => `${r.issuer ?? ""} · ${r.issued_year ?? ""}`,
    orderable: true,
    publishable: true,
    fields: [
      { name: "title", label: "Title", type: "text", required: true, max: 200 },
      { name: "issuer", label: "Issuer", type: "text", required: true, max: 200 },
      { name: "issued_year", label: "Year issued", type: "number", required: true },
      { name: "issued_on", label: "Exact issue date", type: "date" },
      { name: "expires_on", label: "Expires", type: "date" },
      {
        name: "kind",
        label: "Kind",
        type: "select",
        required: true,
        options: [
          { value: "verified", label: "Certificate" },
          { value: "informal", label: "Informal learning" },
          { value: "in_progress", label: "In progress" },
        ],
      },
      { name: "category", label: "Category", type: "text", max: 120 },
      { name: "credential_id", label: "Credential ID", type: "text", max: 200 },
      { name: "credential_url", label: "Verification URL", type: "url", pattern: https, help: "Powers the Verify button." },
      { name: "media_asset_id", label: "Certificate file", type: "media", help: "Powers the Show certificate button." },
      { name: "description", label: "Description", type: "textarea", max: 2000, wide: true },
    ],
  },
  {
    key: "skills",
    table: "skills",
    label: "Skills",
    singular: "skill",
    tags: ["skills"],
    titleField: "name",
    subtitle: (r) => [r.category, r.level].filter(Boolean).join(" · "),
    orderable: true,
    publishable: true,
    fields: [
      { name: "name", label: "Skill", type: "text", required: true, max: 100 },
      { name: "category", label: "Category", type: "text", required: true, max: 100 },
      { name: "level", label: "Level (only if you state one)", type: "text", max: 40 },
    ],
  },
  {
    key: "activities",
    table: "activities",
    label: "Activities",
    singular: "activity",
    tags: ["activities"],
    titleField: "title",
    subtitle: (r) => `${r.category ?? ""} · ${r.occurred_on ?? ""}`,
    orderable: true,
    publishable: true,
    fields: [
      { name: "title", label: "Title", type: "text", required: true, max: 200 },
      slug,
      { name: "occurred_on", label: "Date", type: "date", required: true },
      { name: "category", label: "Category", type: "text", required: true, max: 80 },
      { name: "location", label: "Location", type: "text", max: 120 },
      { name: "organizer", label: "Organizer", type: "text", max: 200 },
      { name: "summary", label: "Short description", type: "textarea", required: true, max: 600, wide: true },
      { name: "story", label: "Longer story", type: "textarea", max: 8000, wide: true },
      { name: "achievements", label: "Achievements", type: "list" },
      { name: "external_url", label: "External link", type: "url", pattern: https },
      { name: "cover_asset_id", label: "Cover image", type: "media" },
    ],
  },
  {
    key: "profile",
    table: "profiles",
    label: "Profile",
    singular: "profile",
    tags: ["profile"],
    titleField: "name",
    orderable: false,
    publishable: true,
    singleton: true,
    fields: [
      { name: "name", label: "Name", type: "text", required: true, max: 120 },
      { name: "headline", label: "Headline", type: "textarea", required: true, max: 300, wide: true },
      { name: "about", label: "About", type: "textarea", max: 4000, wide: true },
      { name: "interests", label: "Interests", type: "list" },
      { name: "location", label: "Location", type: "text", max: 120 },
      { name: "languages", label: "Languages", type: "text", max: 300 },
      { name: "public_email", label: "Public email", type: "email" },
      { name: "portrait_asset_id", label: "Portrait", type: "media" },
      { name: "cv_asset_id", label: "CV file (PDF)", type: "media", help: "Use a version without your phone number and date of birth." },
    ],
  },
  {
    key: "links",
    table: "social_links",
    label: "Social links",
    singular: "link",
    tags: ["profile"],
    titleField: "label",
    subtitle: (r) => String(r.url ?? ""),
    orderable: true,
    publishable: true,
    fields: [
      { name: "label", label: "Label", type: "text", required: true, max: 60 },
      {
        name: "url",
        label: "URL",
        type: "url",
        required: true,
        pattern: { regex: "^(https://|mailto:)", message: "Use https:// or mailto:." },
      },
    ],
  },
  {
    key: "navigation",
    table: "navigation_items",
    label: "Navigation",
    singular: "navigation item",
    tags: ["navigation"],
    titleField: "label",
    subtitle: (r) => String(r.href ?? ""),
    orderable: true,
    publishable: true,
    fields: [
      { name: "label", label: "Label", type: "text", required: true, max: 40 },
      { name: "href", label: "Link", type: "text", required: true, pattern: { regex: "^/", message: "Start with / (a page on this site)." } },
    ],
  },
];

export const getModule = (key: string) => MODULES.find((m) => m.key === key);
