import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { PartsList, StatusStamp } from "@/components/projects/Datasheet";
import { MatMarkings } from "@/components/layout/MatMarkings";
import { Arrow } from "@/components/ui/Arrow";
import { getProjects } from "@/lib/content";

export const metadata: Metadata = {
  alternates: { canonical: "/projects" },
  title: "Projects",
  description: "Robots, drones and embedded systems: what each one had to do, how it works and what it is built from.",
};

export default async function ProjectsPage() {
  const projects = await getProjects();

  return (
    <div data-world="lab" className="mat-grid relative grow">
      <MatMarkings />
      <header className="relative mx-auto max-w-[1440px] px-6 pb-10 pt-20 sm:px-10 lg:px-16 lg:pt-28">
        <h1 className="text-[clamp(3.5rem,8vw,6rem)] font-bold uppercase leading-[0.9] text-chalk">The lab</h1>
        <p className="mt-6 max-w-[56ch] text-xl leading-snug text-chalk-dim">
          Every project as a datasheet: what it had to do, how it works and what it&rsquo;s made of. Stamps mark how far
          each one got.
        </p>
      </header>

      <ol className="relative mx-auto max-w-[1440px] space-y-14 px-6 pb-28 sm:px-10 lg:space-y-20 lg:px-16">
        {projects.map((p, i) => (
          <li key={p.slug}>
            <article
              aria-labelledby={`p-${p.slug}`}
              className="relative grid bg-sheet text-ink shadow-[0_24px_50px_-24px_rgb(5_20_14/0.8),0_2px_6px_rgb(5_20_14/0.25)] lg:grid-cols-12"
            >
              <div className={`p-7 sm:p-10 ${p.image ? "lg:col-span-7" : "lg:col-span-8"} ${i % 2 && p.image ? "lg:order-2" : ""}`}>
                <div className="flex justify-end">
                  <StatusStamp status={p.status} />
                </div>
                <h2 id={`p-${p.slug}`} className="mt-1 text-4xl font-bold uppercase leading-none sm:text-5xl">
                  <Link href={`/projects/${p.slug}`} className="hover:text-copper-deep">
                    {p.title}
                  </Link>
                </h2>
                <p className="mt-2 font-display text-sm uppercase tracking-[0.12em] text-ink-dim">{p.category}</p>
                <p className="mt-5 max-w-[60ch] text-lg leading-relaxed">{p.summary}</p>
                {p.problem && (
                  <p className="mt-4 max-w-[60ch] leading-relaxed text-ink-dim">
                    <span className="font-hand text-lg text-copper-deep">the problem: </span>
                    {p.problem}
                  </p>
                )}
                <Link
                  href={`/projects/${p.slug}`}
                  className="mt-7 inline-block border-b-2 border-ink pb-0.5 font-display font-semibold uppercase tracking-[0.08em] hover:border-copper-deep hover:text-copper-deep"
                >
                  Read the datasheet <span className="sr-only">for {p.title}</span> <Arrow />
                </Link>
              </div>
              <div
                className={`border-t-2 border-ink p-7 sm:p-10 lg:border-t-0 ${p.image ? "lg:col-span-5 lg:border-l-2" : "lg:col-span-4 lg:border-l-2"} ${i % 2 && p.image ? "lg:order-1 lg:border-l-0 lg:border-r-2" : ""}`}
              >
                {p.image && (
                  <Image
                    src={p.image.src}
                    alt={p.image.alt}
                    width={p.image.width}
                    height={p.image.height}
                    sizes="(min-width: 1024px) 38vw, 100vw"
                    className="mb-7 aspect-[2/1] w-full object-cover"
                  />
                )}
                <PartsList items={p.hardware} />
              </div>
            </article>
          </li>
        ))}
      </ol>
    </div>
  );
}
