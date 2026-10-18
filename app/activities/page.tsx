import type { Metadata } from "next";
import { formatDay, getActivities } from "@/lib/content";

export const metadata: Metadata = {
  alternates: { canonical: "/activities" },
  title: "Activities",
  description: "Workshops, competitions, volunteering and travel: the journal beside the engineering work.",
};

export default async function ActivitiesPage() {
  const activities = await getActivities();

  return (
    <div data-world="journal" className="journal-surface min-h-[80dvh] grow">
      <div className="mx-auto max-w-[1180px] px-6 pb-28 pt-16 sm:px-10 lg:pt-24">
        <header className="max-w-3xl">
          <h1 className="text-[clamp(3.5rem,8vw,6rem)] font-bold uppercase leading-[0.9] text-chalk">The journal</h1>
          <p className="mt-6 max-w-[56ch] text-xl leading-snug text-chalk-dim">
            Competitions, workshops, volunteering and travel, kept beside the engineering work.
          </p>
        </header>

        {activities.length === 0 ? (
          <div className="mt-16 max-w-xl -rotate-1 bg-sheet p-8 text-ink shadow-[0_24px_50px_-24px_rgb(5_20_14/0.8)]">
            <p className="font-hand text-2xl text-copper-deep">first page, still blank</p>
            <p className="mt-2 text-lg">
              No journal entries yet. Stories from events and workshops will appear here once they’re written up.
            </p>
          </div>
        ) : (
          <ol className="mt-16 space-y-16">
            {activities.map((a, i) => (
              <li
                key={a.slug}
                style={{ "--float-delay": `${(i % 4) * -1.6}s` } as React.CSSProperties}
                className={`float-card max-w-xl ${i % 2 ? "ml-auto rotate-1" : "-rotate-1"}`}
              >
                <article className="bg-sheet p-7 text-ink shadow-[0_24px_50px_-24px_rgb(5_20_14/0.8)]">
                  <p className="font-mono text-sm tabular-nums text-ink-dim">
                    {formatDay(a.date)}
                    {a.location && <span className="font-sans"> · {a.location}</span>}
                  </p>
                  <h2 className="mt-1 text-3xl font-bold uppercase leading-none">{a.title}</h2>
                  <p className="mt-1 font-hand text-lg text-copper-deep">{a.category}</p>
                  <p className="mt-4 leading-relaxed">{a.summary}</p>
                  {a.story && (
                    <details className="mt-4">
                      <summary className="cursor-pointer font-display font-semibold uppercase tracking-[0.08em]">
                        Read the story
                      </summary>
                      <p className="mt-3 leading-relaxed">{a.story}</p>
                    </details>
                  )}
                </article>
              </li>
            ))}
          </ol>
        )}
      </div>
    </div>
  );
}
