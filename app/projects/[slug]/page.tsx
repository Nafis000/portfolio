import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { PartsList, StatusStamp } from "@/components/projects/Datasheet";
import { Arrow } from "@/components/ui/Arrow";
import { getProject, getProjects } from "@/lib/content";

export async function generateStaticParams() {
  return (await getProjects()).map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps<"/projects/[slug]">): Promise<Metadata> {
  const project = await getProject((await params).slug);
  return project
    ? { title: project.title, description: project.summary, alternates: { canonical: `/projects/${project.slug}` } }
    : {};
}

export default function ProjectPage({ params }: PageProps<"/projects/[slug]">) {
  return (
    <div data-world="lab" className="mat-grid grow px-4 py-12 sm:px-8 lg:py-20">
      <Suspense fallback={<div className="mx-auto min-h-[70dvh] max-w-[1180px] bg-sheet/90" aria-busy="true" />}>
        <ProjectSheet params={params} />
      </Suspense>
    </div>
  );
}

async function ProjectSheet({ params }: { params: PageProps<"/projects/[slug]">["params"] }) {
  const project = await getProject((await params).slug);
  if (!project) notFound();

  const sections = [
    { label: "The problem", body: project.problem },
    { label: "How it works", body: project.approach },
  ].filter((s): s is { label: string; body: string } => Boolean(s.body));

  return (
      <article className="mx-auto max-w-[1180px] bg-sheet text-ink shadow-[0_30px_60px_-28px_rgb(5_20_14/0.85),0_2px_6px_rgb(5_20_14/0.25)]">
        <div className="border-b-2 border-ink px-6 py-4 sm:px-10">
          <Link href="/projects" className="font-display text-sm font-semibold uppercase tracking-[0.1em] text-ink-dim hover:text-copper-deep">
            <Arrow dir="left" /> All projects
          </Link>
        </div>

        <header className="grid gap-8 px-6 py-10 sm:px-10 lg:grid-cols-12 lg:py-14">
          <div className="lg:col-span-8">
            <h1 className="text-[clamp(3rem,7vw,5.5rem)] font-bold uppercase leading-[0.9]">{project.title}</h1>
            <p className="mt-3 font-display text-sm uppercase tracking-[0.12em] text-ink-dim">{project.category}</p>
            <p className="mt-6 max-w-[58ch] text-xl leading-relaxed">{project.summary}</p>
          </div>
          <div className="flex flex-col items-start gap-6 lg:col-span-4 lg:items-end">
            <StatusStamp status={project.status} className="text-lg" />
            {project.image && (
              <Image
                src={project.image.src}
                alt={project.image.alt}
                width={project.image.width}
                height={project.image.height}
                sizes="(min-width: 1024px) 340px, 100vw"
                priority
                className="w-full max-w-[486px] border-2 border-ink object-cover"
              />
            )}
          </div>
        </header>

        <div className="grid border-t-2 border-ink lg:grid-cols-12">
          <div className="space-y-10 px-6 py-10 sm:px-10 lg:col-span-7 lg:py-14">
            {sections.length ? (
              sections.map((s) => (
                <section key={s.label}>
                  <h2 className="font-hand text-2xl text-copper-deep">{s.label}</h2>
                  <p className="mt-2 max-w-[62ch] text-lg leading-relaxed">{s.body}</p>
                </section>
              ))
            ) : (
              <p className="max-w-[56ch] text-lg leading-relaxed text-ink-dim">
                The full write-up for this project hasn’t been added yet. The parts below are the ones listed so far.
              </p>
            )}
            {project.software.length > 0 && (
              <section>
                <h2 className="font-hand text-2xl text-copper-deep">Software</h2>
                <ul className="mt-3 flex flex-wrap gap-2">
                  {project.software.map((s) => (
                    <li key={s} className="border border-ink/40 px-3 py-1 text-sm">
                      {s}
                    </li>
                  ))}
                </ul>
              </section>
            )}
          </div>
          <aside aria-label="Parts list" className="border-t-2 border-ink px-6 py-10 sm:px-10 lg:col-span-5 lg:border-l-2 lg:border-t-0 lg:py-14">
            <h2 className="mb-4 font-display text-sm font-semibold uppercase tracking-[0.12em] text-ink-dim">Bill of materials</h2>
            <PartsList items={project.hardware} />
          </aside>
        </div>
      </article>
  );
}
