import type { Metadata } from "next";
import { DOG, PixelSprite } from "@/components/sections/PixelSprite";
import { formatMonth, getExperience } from "@/lib/content";

export const metadata: Metadata = {
  alternates: { canonical: "/experience" },
  title: "Experience",
  description: "Work experience: roles, responsibilities and what each one taught.",
};

const typeLabel: Record<string, string> = {
  employment: "Employment",
  internship: "Internship",
  research: "Research",
  teaching: "Teaching",
  volunteer: "Volunteer",
  freelance: "Freelance",
  other: "Other",
};

export default async function ExperiencePage() {
  const experience = await getExperience();

  return (
    <div data-world="studio" className="grow bg-sheet text-ink">
      <div className="mx-auto max-w-[1440px] px-6 pb-28 pt-16 sm:px-10 lg:px-16 lg:pt-24">
        <header className="grid gap-10 border-b-2 border-ink pb-12 lg:grid-cols-12">
          <div className="lg:col-span-8">
            <h1 className="text-[clamp(3.5rem,8vw,6rem)] font-bold uppercase leading-[0.9]">The studio</h1>
            <p className="mt-6 max-w-[56ch] text-xl leading-snug">
              Where the work meets other people: the roles I’ve held and what each one asked of me.
            </p>
          </div>
          {/* A playful detection overlay. Illustrative only: no model is running. */}
          <figure className="self-end lg:col-span-4 lg:justify-self-end">
            <div className="relative inline-block p-3">
              <PixelSprite rows={DOG} palette={{ K: "fill-ink", B: "fill-ink-dim", W: "fill-sheet" }} size={7} />
              <span aria-hidden className="absolute inset-0 border-2 border-copper-deep" />
              <span
                aria-hidden
                className="absolute -top-6 left-0 bg-copper-deep px-1.5 py-0.5 font-mono text-xs text-sheet"
              >
                dog
              </span>
            </div>
            <figcaption className="mt-2 font-hand text-ink-dim">illustration, not a real detection</figcaption>
          </figure>
        </header>

        <ol className="divide-y divide-sheet-line">
          {experience.map((x) => (
            <li key={`${x.organization}-${x.start}`} className="grid gap-6 py-12 lg:grid-cols-12">
              <div className="lg:col-span-3">
                <p className="font-mono text-sm tabular-nums text-ink-dim">
                  {formatMonth(x.start)} – {formatMonth(x.end)}
                </p>
                <p className="mt-2 font-display text-sm font-semibold uppercase tracking-[0.12em] text-ink-dim">
                  {typeLabel[x.employmentType] ?? x.employmentType}
                  {x.location && <span className="font-sans font-normal normal-case tracking-normal"> · {x.location}</span>}
                </p>
              </div>
              <div className="lg:col-span-6">
                <h2 className="text-4xl font-bold uppercase leading-none">{x.role}</h2>
                <p className="mt-2 text-xl text-ink-dim">{x.organization}</p>
                <ul className="mt-6 space-y-2.5 text-lg">
                  {[...x.points, ...x.achievements].map((pt) => (
                    <li key={pt} className="flex gap-3">
                      <span aria-hidden className="mt-[0.65em] h-px w-4 shrink-0 bg-copper-deep" />
                      {pt}
                    </li>
                  ))}
                </ul>
              </div>
              {x.technologies.length > 0 && (
                <ul className="flex flex-wrap content-start gap-2 lg:col-span-3">
                  {x.technologies.map((t) => (
                    <li key={t} className="border border-ink/40 px-3 py-1 text-sm">
                      {t}
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}
