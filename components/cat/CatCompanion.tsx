"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState, useSyncExternalStore } from "react";
import { CAT, PixelSprite } from "@/components/sections/PixelSprite";
import { catHidden } from "./catPreference";

// Which world the visitor is reading, from the nearest [data-world] section at the middle of the viewport.
export type World = "mat" | "notebook" | "lab" | "studio" | "journal" | "away";

function useWorld(): World {
  const pathname = usePathname();
  const [world, setWorld] = useState<World>("mat");
  const [awayInView, setAwayInView] = useState(false);

  useEffect(() => {
    // A thin band across the middle of the screen: whichever section crosses it sets the mood.
    const io = new IntersectionObserver(
      (entries) => {
        const hit = entries.find((e) => e.isIntersecting);
        if (hit) setWorld((hit.target as HTMLElement).dataset.world as World);
      },
      { rootMargin: "-48% 0px -48% 0px" },
    );
    document.querySelectorAll("[data-world]").forEach((s) => io.observe(s));

    // Any visible "away" zone (the footer, the admin area) sends the cat off-stage so it never covers links.
    const inView = new Set<Element>();
    const away = new IntersectionObserver((entries) => {
      entries.forEach((e) => (e.isIntersecting ? inView.add(e.target) : inView.delete(e.target)));
      setAwayInView(inView.size > 0);
    });
    document.querySelectorAll('[data-world="away"]').forEach((s) => away.observe(s));

    return () => {
      io.disconnect();
      away.disconnect();
    };
  }, [pathname]);

  return awayInView ? "away" : world;
}

function usePageVisible() {
  return useSyncExternalStore(
    (cb) => {
      document.addEventListener("visibilitychange", cb);
      return () => document.removeEventListener("visibilitychange", cb);
    },
    () => document.visibilityState === "visible",
    () => true,
  );
}

const SPOT: Record<World, string> = {
  mat: "right",
  notebook: "left", // curious: walks over to the notebook margin
  lab: "right",
  studio: "right",
  journal: "left",
  away: "right",
};

export function CatCompanion() {
  const world = useWorld();
  const visible = usePageVisible();
  const hidden = useSyncExternalStore(catHidden.subscribe, catHidden.get, () => true);

  if (hidden) return null;

  return (
    <div
      aria-hidden
      data-mood={world}
      data-spot={SPOT[world]}
      className={`cat pointer-events-none fixed bottom-3 z-30 ${visible ? "" : "cat-paused"} ${world === "away" ? "opacity-0" : "opacity-100"}`}
    >
      {world === "lab" ? (
        // Projects: the cat goes pixel, with a playful (not real) detection box.
        <div className="relative p-1.5">
          <PixelSprite
            rows={CAT}
            palette={{ K: "fill-ink", G: "fill-[#8d9399]", L: "fill-[#c3c8cc]", W: "fill-chalk", P: "fill-copper" }}
            size={4}
            className="cat-pixel"
          />
          <span className="absolute inset-0 border-2 border-copper" />
          <span className="absolute -top-5 left-0 whitespace-nowrap bg-copper px-1 font-mono text-[10px] leading-4 text-ink">
            lazy cat
          </span>
        </div>
      ) : (
        <SoftCat />
      )}
    </div>
  );
}

// A half-fluffy grey cat, sitting. Fluff lives on the chest and tail; the rest is smooth.
function SoftCat() {
  return (
    <svg viewBox="0 0 84 76" className="cat-soft h-auto w-[68px] sm:w-[84px]">
      <g className="cat-tail">
        <path d="M 58 66 C 76 64, 82 50, 74 38" fill="none" stroke="#8d9399" strokeWidth="7" strokeLinecap="round" />
        <path d="M 76 44 l 5 -3 M 78 51 l 5 -1 M 77 58 l 4 2" stroke="#c3c8cc" strokeWidth="2" strokeLinecap="round" />
      </g>
      <ellipse cx="44" cy="56" rx="20" ry="17" fill="#8d9399" />
      <path d="M 30 50 q 4 -6 8 0 q 4 -6 8 0 q 4 -6 8 0 l -2 16 h -20 z" fill="#c3c8cc" />
      <ellipse cx="36" cy="72" rx="6" ry="3.2" fill="#7b8186" />
      <ellipse cx="52" cy="72" rx="6" ry="3.2" fill="#7b8186" />
      <g className="cat-head">
        <path d="M 24 22 L 27 6 L 36 16 Z M 48 16 L 57 6 L 60 22 Z" fill="#8d9399" />
        <path d="M 27.5 11 L 33 16 L 28 19 Z M 56.5 11 L 51 16 L 56 19 Z" fill="#c9a49a" />
        <circle cx="42" cy="27" r="17" fill="#8d9399" />
        <g className="cat-eyes" fill="#13201a">
          <ellipse cx="35" cy="26" rx="2.4" ry="3.2" />
          <ellipse cx="49" cy="26" rx="2.4" ry="3.2" />
        </g>
        <path d="M 40 33 h 4 l -2 2.5 z" fill="#c9a49a" />
        <path d="M 30 33 h -9 M 30 36 l -8 2 M 54 33 h 9 M 54 36 l 8 2" stroke="#c3c8cc" strokeWidth="1" strokeLinecap="round" />
      </g>
    </svg>
  );
}
