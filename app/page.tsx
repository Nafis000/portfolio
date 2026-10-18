import Image from "next/image";
import Link from "next/link";
import { HeroDrawing } from "@/components/sections/HeroDrawing";
import { SITE_URL } from "@/lib/site";
import { MatMarkings } from "@/components/layout/MatMarkings";
import { Arrow } from "@/components/ui/Arrow";
import { DatasheetLink } from "@/components/projects/Datasheet";
import { ContactForm } from "@/components/sections/ContactForm";
import {
  formatMonth,
  getCertifications,
  getEducation,
  getExperience,
  getProfile,
  getProjects,
  getSkills,
} from "@/lib/content";

export default async function Home() {
  const [profile, projects, education, experience, certifications, skills] = await Promise.all([
    getProfile(),
    getProjects(),
    getEducation(),
    getExperience(),
    getCertifications(),
    getSkills(),
  ]);
  const featured = projects.filter((p) => p.featured);
  // Structured data only states what the page itself shows.
  const person = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: profile.name,
    url: SITE_URL,
    description: profile.headline,
    knowsAbout: profile.interests,
    alumniOf: education.filter((e) => e.end).map((e) => ({ "@type": "EducationalOrganization", name: e.institution })),
    affiliation: education
      .filter((e) => !e.end)
      .map((e) => ({ "@type": "CollegeOrUniversity", name: e.institution })),
    sameAs: profile.githubUrl ? [profile.githubUrl] : [],
  };
  const [lead, ...rest] = featured;

  return (
    <>
      <script
        type="application/ld+json"
        // escaped so content can never close the script tag
        dangerouslySetInnerHTML={{ __html: JSON.stringify(person).replace(/</g, "\\u003c") }}
      />
      {/* ───────── Hero: the drawing sheet ───────── */}
      <section className="mat-grid relative overflow-hidden" aria-labelledby="hero-name">
        <MatMarkings />

        <div className="mx-auto grid min-h-[calc(100dvh-57px)] max-w-[1440px] items-center gap-10 px-6 pb-16 pt-14 sm:px-10 lg:grid-cols-[1.05fr_1fr] lg:gap-6 lg:px-16">
          <div className="max-w-2xl">
            <h1
              id="hero-name"
              className="text-[clamp(3.6rem,9vw,7.25rem)] font-bold uppercase leading-[0.86] tracking-[-0.01em] text-chalk"
            >
              Nafis
              <br />
              Islam <span className="text-copper">Nitol</span>
            </h1>
            <p className="mt-7 max-w-[34ch] text-xl leading-snug text-chalk sm:text-2xl">{profile.headline}</p>
            <p className="mt-5 flex flex-wrap items-baseline gap-x-3 gap-y-1 text-chalk-dim">
              <span className="font-hand text-lg text-copper">interested in</span>
              {profile.interests.map((i, n) => (
                <span key={i} className="font-display text-lg font-medium uppercase tracking-[0.06em]">
                  {i}
                  {n < profile.interests.length - 1 && <span className="ml-3 text-chalk/35">/</span>}
                </span>
              ))}
            </p>
            <div className="mt-10 flex flex-wrap gap-3">
              <Link
                href="/projects"
                className="bg-copper px-6 py-3.5 font-display text-lg font-semibold uppercase tracking-[0.08em] text-ink transition-colors hover:bg-chalk"
              >
                Explore projects
              </Link>
              {profile.cvUrl && (
                <a
                  href={profile.cvUrl}
                  className="border border-chalk/60 px-6 py-3.5 font-display text-lg font-semibold uppercase tracking-[0.08em] text-chalk transition-colors hover:border-chalk hover:bg-chalk/10"
                >
                  View CV <span className="font-sans text-sm font-normal normal-case tracking-normal text-chalk-dim">(PDF)</span>
                </a>
              )}
            </div>
          </div>
          <div className="-mx-4 flex justify-center sm:mx-0 lg:justify-end">
            <HeroDrawing />
          </div>
        </div>
      </section>

      {/* ───────── About ───────── */}
      <section aria-labelledby="about-title" className="border-t border-chalk/20 bg-mat-deep">
        <div className="mx-auto grid max-w-[1440px] gap-12 px-6 py-24 sm:px-10 md:grid-cols-[minmax(0,320px)_1fr] lg:px-16 lg:py-32">
          <figure className="relative w-full max-w-[320px]">
            <Image
              src={profile.portrait.src}
              alt={profile.portrait.alt}
              width={800}
              height={800}
              sizes="320px"
              className="aspect-[4/5] w-full object-cover object-top outline outline-1 -outline-offset-1 outline-chalk/10"
            />
            <figcaption className="mt-3 font-hand text-base text-chalk-dim">Pécs, Hungary · Electrical Engineering</figcaption>
          </figure>
          <div className="max-w-[68ch] self-center">
            <h2 id="about-title" className="text-4xl font-bold uppercase text-chalk sm:text-5xl">
              Theory first, then the soldering iron
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-chalk-dim sm:text-xl">{profile.about}</p>
            {profile.languages && <p className="mt-6 text-chalk-dim">{profile.languages}</p>}
          </div>
        </div>
      </section>

      {/* ───────── Education: the notebook ───────── */}
      <section id="education" aria-labelledby="education-title" className="graph-paper scroll-mt-16 text-pencil">
        <div className="mx-auto max-w-[1440px] px-6 py-24 sm:px-10 lg:px-16 lg:py-28">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <h2 id="education-title" className="text-5xl font-bold uppercase text-ink sm:text-6xl">
              Education
            </h2>
            <Link href="/education" className="font-display text-lg font-semibold uppercase tracking-[0.08em] text-ink hover:text-copper-deep">
              Open the notebook <Arrow />
            </Link>
          </div>
          <ol className="mt-14 grid gap-x-10 gap-y-12 md:grid-cols-2">
            {education.map((e, i) => (
              <li key={e.institution} className={i % 2 ? "md:translate-y-10" : ""}>
                <p className="font-mono text-sm tabular-nums text-pencil">
                  {formatMonth(e.start)} – {formatMonth(e.end)}
                </p>
                <h3 className="mt-1 text-3xl font-bold uppercase leading-tight text-ink">{e.qualification}</h3>
                <p className="mt-1 text-lg text-ink">
                  {e.institution} {e.location && <span className="text-pencil">· {e.location}</span>}
                </p>
                {(e.grade || e.note) && (
                  <p className="mt-3 inline-block -rotate-2 rounded-[50%] border-2 border-pencil/70 px-4 py-1 font-hand text-lg text-ink">
                    {e.grade ?? e.note}
                  </p>
                )}
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ───────── Projects: sheets on the bench ───────── */}
      <section aria-labelledby="projects-title" className="mat-grid border-y border-chalk/20">
        <div className="mx-auto max-w-[1440px] px-6 py-24 sm:px-10 lg:px-16 lg:py-32">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <h2 id="projects-title" className="text-5xl font-bold uppercase text-chalk sm:text-6xl">
              On the bench
            </h2>
            <Link href="/projects" className="font-display text-lg font-semibold uppercase tracking-[0.08em] text-copper hover:text-chalk">
              All {projects.length} projects <Arrow />
            </Link>
          </div>
          <div className="mt-14 grid gap-10 lg:grid-cols-12 lg:gap-12">
            {lead && (
              <div className="lg:col-span-7">
                <DatasheetLink project={lead} tilt={-1.2} large />
              </div>
            )}
            <div className="grid gap-10 lg:col-span-5 lg:gap-12">
              {rest.map((p, i) => (
                <DatasheetLink key={p.slug} project={p} tilt={i % 2 ? -0.6 : 1.1} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ───────── Experience: the studio ───────── */}
      <section id="experience" aria-labelledby="experience-title" className="scroll-mt-16 bg-sheet text-ink">
        <div className="mx-auto grid max-w-[1440px] gap-10 px-6 py-24 sm:px-10 lg:grid-cols-12 lg:px-16 lg:py-28">
          <div className="lg:col-span-4">
            <h2 id="experience-title" className="text-5xl font-bold uppercase sm:text-6xl">
              Experience
            </h2>
            <Link href="/experience" className="mt-4 inline-block font-display text-lg font-semibold uppercase tracking-[0.08em] hover:text-copper-deep">
              The studio <Arrow />
            </Link>
          </div>
          <ul className="divide-y divide-sheet-line border-y-2 border-ink lg:col-span-8">
            {experience.map((x) => (
              <li key={x.organization} className="grid gap-4 py-8 sm:grid-cols-[12rem_1fr]">
                <p className="font-mono text-sm tabular-nums text-ink-dim">
                  {formatMonth(x.start)} – {formatMonth(x.end)}
                </p>
                <div>
                  <h3 className="text-2xl font-bold uppercase">{x.role}</h3>
                  <p className="text-lg text-ink-dim">{x.organization}</p>
                  <ul className="mt-4 space-y-2 text-ink">
                    {x.points.map((pt) => (
                      <li key={pt} className="flex gap-3">
                        <span aria-hidden className="mt-[0.6em] h-px w-4 shrink-0 bg-copper-deep" />
                        {pt}
                      </li>
                    ))}
                  </ul>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ───────── Certifications ───────── */}
      <section id="certifications" aria-labelledby="certs-title" className="scroll-mt-16 bg-mat-deep">
        <div className="mx-auto max-w-[1440px] px-6 py-24 sm:px-10 lg:px-16">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <h2 id="certs-title" className="text-5xl font-bold uppercase text-chalk sm:text-6xl">
              Certifications
            </h2>
            <Link href="/certifications" className="font-display text-lg font-semibold uppercase tracking-[0.08em] text-copper hover:text-chalk">
              The archive <Arrow />
            </Link>
          </div>
          <ul className="mt-12 grid gap-px border border-chalk/20 bg-chalk/20 md:grid-cols-3">
            {certifications.map((c) => (
              <li key={c.title} className="flex flex-col gap-3 bg-mat-deep p-7">
                <p className="font-mono text-sm tabular-nums text-copper">{c.year}</p>
                <h3 className="text-2xl font-bold uppercase leading-tight text-chalk">{c.title}</h3>
                <p className="text-chalk-dim">{c.issuer}</p>
                <p className="leading-relaxed text-chalk-dim">{c.description}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ───────── Skills: the parts bin ───────── */}
      <section id="skills" aria-labelledby="skills-title" className="mat-grid scroll-mt-16 border-y border-chalk/20">
        <div className="mx-auto grid max-w-[1440px] gap-12 px-6 py-24 sm:px-10 lg:grid-cols-12 lg:px-16">
          <div className="lg:col-span-4">
            <h2 id="skills-title" className="text-5xl font-bold uppercase text-chalk sm:text-6xl">
              Parts bin
            </h2>
            <p className="mt-4 max-w-[36ch] text-chalk-dim">
              The skills I reach for, sorted into compartments. Levels appear only where I&rsquo;ve stated them.
            </p>
          </div>
          <div className="grid gap-px border border-chalk/30 bg-chalk/30 sm:grid-cols-3 lg:col-span-8">
            {skills.map((g) => (
              <div key={g.name} className="bg-mat p-6">
                <h3 className="font-display text-sm font-semibold uppercase tracking-[0.12em] text-copper">{g.name}</h3>
                <ul className="mt-4 space-y-2.5">
                  {g.items.map((s) => (
                    <li key={s.label} className="flex items-baseline justify-between gap-3 text-chalk">
                      {s.label}
                      {s.level && <span className="font-hand text-chalk-dim">{s.level}</span>}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ───────── Contact ───────── */}
      <section id="contact" aria-labelledby="contact-title" className="relative scroll-mt-16 bg-copper text-ink">
        <div className="mx-auto grid max-w-[1440px] gap-14 px-6 py-24 sm:px-10 lg:grid-cols-12 lg:px-16 lg:py-32">
          <div className="lg:col-span-5">
            <h2 id="contact-title" className="max-w-[12ch] text-[clamp(3rem,6vw,5.5rem)] font-bold uppercase leading-[0.9]">
              Building something? Let&rsquo;s talk.
            </h2>
            <p className="mt-6 max-w-[44ch] text-lg">
              Happy to talk about robotics, automation and embedded systems: projects, teams and opportunities.
            </p>
            <ul className="mt-10 space-y-3 font-display text-2xl font-semibold uppercase tracking-[0.04em]">
              {profile.email && (
                <li>
                  <a
                    href={`mailto:${profile.email}`}
                    className="normal-case tracking-normal underline decoration-2 underline-offset-[0.2em] hover:decoration-[3px]"
                  >
                    {profile.email}
                  </a>
                </li>
              )}
              {profile.githubUrl && (
                <li>
                  <a href={profile.githubUrl} className="underline-offset-[0.2em] hover:underline">
                    GitHub
                  </a>
                </li>
              )}
              {profile.cvUrl && (
                <li>
                  <a href={profile.cvUrl} className="underline-offset-[0.2em] hover:underline">
                    CV (PDF)
                  </a>
                </li>
              )}
            </ul>
          </div>
          <div className="lg:col-span-7 lg:pt-3">
            <ContactForm email={profile.email} />
          </div>
        </div>
        {/* Discreet admin entry. A design detail only: the admin area enforces auth on the server. */}
        <Link
          href="/admin/login"
          aria-label="Administrator sign in"
          className="group absolute bottom-3 left-1/2 grid size-6 -translate-x-1/2 place-items-center rounded-full"
        >
          <span className="size-2 rounded-full bg-[#2f9e5a] transition-transform group-hover:scale-150" />
        </Link>
      </section>
    </>
  );
}
