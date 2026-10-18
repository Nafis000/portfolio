import type { Metadata } from "next";
import { MatrixSketch, RcSketch, TangentSketch, VectorSketch } from "@/components/sections/NotebookSketches";
import { formatMonth, getEducation } from "@/lib/content";

export const metadata: Metadata = {
  alternates: { canonical: "/education" },
  title: "Education",
  description:
    "Electrical Engineering at the University of Pécs, Computer Science and Engineering at the University of Asia Pacific, and school in Dhaka.",
};

const sketches = [TangentSketch, RcSketch, VectorSketch, MatrixSketch];

export default async function EducationPage() {
  const education = await getEducation();

  return (
    <div className="graph-paper grow text-pencil">
      {/* the notebook's ruled margin */}
      <div className="relative mx-auto max-w-[1440px] px-6 pb-28 pt-16 sm:px-10 lg:px-16 lg:pt-24">
        <div aria-hidden className="absolute inset-y-0 left-[calc(1.5rem-2px)] hidden w-px bg-copper-deep/40 sm:left-6 sm:block lg:left-12" />

        <header className="max-w-3xl">
          <h1 className="text-[clamp(3.5rem,8vw,6rem)] font-bold uppercase leading-[0.9] text-ink">The notebook</h1>
          <p className="mt-6 max-w-[56ch] text-xl leading-snug text-ink">
            Where it starts: equations on paper. From school in Dhaka to Electrical Engineering in Pécs.
          </p>
        </header>

        <ol className="mt-16 space-y-16 lg:space-y-20">
          {education.map((e, i) => {
            const Sketch = sketches[i % sketches.length];
            return (
              <li key={e.institution} className="grid items-start gap-8 lg:grid-cols-12">
                <div className={`lg:col-span-7 ${i % 2 ? "lg:order-2 lg:col-start-6" : ""}`}>
                  <p className="font-mono text-sm tabular-nums text-pencil">
                    {formatMonth(e.start)} – {formatMonth(e.end)}
                    {e.location && <span className="font-sans"> · {e.location}</span>}
                  </p>
                  <h2 className="mt-1 text-4xl font-bold uppercase leading-[0.95] text-ink sm:text-5xl">{e.qualification}</h2>
                  <p className="mt-2 text-xl text-ink">{e.institution}</p>
                  {(e.grade || e.note) && (
                    <p className="mt-4 flex flex-wrap gap-3">
                      {[e.grade, e.note].filter(Boolean).map((t, k) => (
                        <span
                          key={t}
                          className={`inline-block rounded-[50%] border-2 border-pencil/70 px-4 py-1 font-hand text-lg text-ink ${k ? "rotate-1" : "-rotate-2"}`}
                        >
                          {t}
                        </span>
                      ))}
                    </p>
                  )}
                  {e.coursework.length > 0 && (
                    <p className="mt-4 max-w-[60ch] text-ink">
                      <span className="font-hand text-lg text-copper-deep">coursework: </span>
                      {e.coursework.join(", ")}
                    </p>
                  )}
                  {e.achievements.length > 0 && (
                    <ul className="mt-3 list-disc pl-5 text-ink">
                      {e.achievements.map((a) => (
                        <li key={a}>{a}</li>
                      ))}
                    </ul>
                  )}
                </div>
                <div className={`max-w-xs lg:col-span-4 ${i % 2 ? "lg:order-1 lg:col-start-1" : "lg:col-start-9"} ${i % 2 ? "-rotate-1" : "rotate-1"}`}>
                  <Sketch />
                </div>
              </li>
            );
          })}
        </ol>
      </div>
    </div>
  );
}
