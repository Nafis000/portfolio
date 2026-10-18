import Image from "next/image";
import Link from "next/link";
import { statusLabel } from "@/lib/content/format";
import type { Project } from "@/lib/content/types";

export function StatusStamp({ status, className = "" }: { status: Project["status"]; className?: string }) {
  if (!status)
    return (
      <span
        className={`inline-block -rotate-6 border-2 border-dashed border-ink-dim px-2 py-0.5 font-display text-sm font-bold uppercase tracking-[0.14em] text-ink-dim ${className}`}
      >
        Status TBC
      </span>
    );
  return (
    <span
      className={`inline-block -rotate-6 border-2 border-copper-deep px-2 py-0.5 font-display text-sm font-bold uppercase tracking-[0.14em] text-copper-deep ${className}`}
    >
      {statusLabel[status]}
    </span>
  );
}

export function PartsList({ items, limit }: { items: string[]; limit?: number }) {
  const shown = limit ? items.slice(0, limit) : items;
  if (!shown.length) return null;
  return (
    <table className="w-full border-collapse text-left text-sm">
      <caption className="sr-only">Hardware parts list</caption>
      <thead>
        <tr className="border-y border-ink/70 font-display text-xs uppercase tracking-[0.12em] text-ink-dim">
          <th scope="col" className="w-12 py-1.5 pr-2 font-semibold">Item</th>
          <th scope="col" className="py-1.5 font-semibold">Part</th>
        </tr>
      </thead>
      <tbody>
        {shown.map((part, i) => (
          <tr key={part} className="border-b border-sheet-line">
            <td className="py-1.5 pr-2 font-mono text-xs tabular-nums text-ink-dim">{String(i + 1).padStart(2, "0")}</td>
            <td className="py-1.5 text-ink">{part}</td>
          </tr>
        ))}
        {limit && items.length > limit && (
          <tr>
            <td />
            <td className="py-1.5 text-ink-dim">+{items.length - limit} more</td>
          </tr>
        )}
      </tbody>
    </table>
  );
}

// A project as a sheet laid on the mat. `tilt` gives each sheet its own resting angle.
export function DatasheetLink({
  project,
  tilt = 0,
  large = false,
}: {
  project: Project;
  tilt?: number;
  large?: boolean;
}) {
  return (
    <Link
      href={`/projects/${project.slug}`}
      style={{ "--tilt": `${tilt}deg` } as React.CSSProperties}
      className="group relative flex h-full rotate-(--tilt) flex-col bg-sheet text-ink shadow-[0_18px_40px_-18px_rgb(5_20_14/0.7),0_2px_6px_rgb(5_20_14/0.25)] transition-[rotate,translate,box-shadow] duration-500 ease-out-expo hover:-translate-y-1 hover:rotate-0 hover:shadow-[0_28px_50px_-20px_rgb(5_20_14/0.75),0_2px_6px_rgb(5_20_14/0.25)] focus-visible:rotate-0"
    >
      {large && project.image && (
        <Image
          src={project.image.src}
          alt={project.image.alt}
          width={project.image.width}
          height={project.image.height}
          sizes="(min-width: 1024px) 55vw, 100vw"
          className="aspect-[2/1] w-full object-cover"
        />
      )}
      <div className="flex flex-1 flex-col gap-5 p-6 sm:p-7">
        <p className={`${large ? "text-lg" : "text-base"} max-w-[52ch] leading-relaxed text-ink`}>{project.summary}</p>
        <PartsList items={project.hardware} limit={large ? 6 : 3} />
      </div>
      {/* title block */}
      <div className="grid grid-cols-[1fr_auto] border-t-2 border-ink">
        <div className="border-r border-ink px-6 py-3 sm:px-7">
          <h3 className={`${large ? "text-3xl" : "text-2xl"} font-bold uppercase leading-none tracking-[0.02em] group-hover:text-copper-deep`}>
            {project.title}
          </h3>
          <p className="mt-1 font-display text-xs uppercase tracking-[0.12em] text-ink-dim">{project.category}</p>
        </div>
        <div className="flex items-center px-4">
          <StatusStamp status={project.status} />
        </div>
      </div>
    </Link>
  );
}
