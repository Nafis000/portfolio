import { z } from "zod";
import type { Field, Module } from "./modules";

// Builds the server-side validator for a module from its field list.
// Empty optional values become null so the database stores "unknown", never "".
function fieldSchema(f: Field): z.ZodType {
  const empty = (v: unknown) => (typeof v === "string" && v.trim() === "" ? null : v);
  const req = (s: z.ZodType) => (f.required ? s : z.preprocess(empty, s.nullable()));

  switch (f.type) {
    case "boolean":
      return z.preprocess((v) => v === "on" || v === "true", z.boolean());
    case "list":
      return z.preprocess(
        (v) =>
          String(v ?? "")
            .split("\n")
            .map((s) => s.trim())
            .filter(Boolean),
        z.array(z.string().max(300, `Each item in “${f.label}” must be under 300 characters.`)).max(50),
      );
    case "number":
      return req(z.coerce.number({ message: `${f.label} must be a number.` }).int().min(1900).max(2100));
    case "media":
      return z.preprocess(empty, z.coerce.number().int().positive().nullable());
    case "date":
      return req(z.string().regex(/^\d{4}-\d{2}-\d{2}$/, `${f.label} must be a date.`));
    case "select":
      return req(
        z.enum((f.options ?? []).map((o) => o.value).filter(Boolean) as [string, ...string[]], {
          message: `Choose a valid ${f.label.toLowerCase()}.`,
        }),
      );
    case "email":
      return req(z.email(`${f.label} must be an email address.`).max(254));
    default: {
      let s = z.string().trim();
      if (f.required) s = s.min(1, `${f.label} is required.`);
      if (f.max) s = s.max(f.max, `${f.label} must be under ${f.max} characters.`);
      if (f.pattern) s = s.regex(new RegExp(f.pattern.regex), f.pattern.message);
      return req(s);
    }
  }
}

export function moduleSchema(m: Module) {
  const shape: Record<string, z.ZodType> = {};
  for (const f of m.fields) shape[f.name] = fieldSchema(f);
  if (m.publishable) shape.published = fieldSchema({ name: "published", label: "Published", type: "boolean" });
  return z.object(shape);
}

export type FieldErrors = Record<string, string>;

export function firstErrors(error: z.ZodError): FieldErrors {
  const out: FieldErrors = {};
  for (const issue of error.issues) {
    const key = String(issue.path[0] ?? "_");
    out[key] ??= issue.message;
  }
  return out;
}
