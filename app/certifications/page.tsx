import type { Metadata } from "next";
import { CertificationArchive } from "@/components/sections/CertificationArchive";
import { getCertifications } from "@/lib/content";

export const metadata: Metadata = {
  alternates: { canonical: "/certifications" },
  title: "Certifications",
  description: "Courses and certificates in IoT, embedded systems and C++ for robotics.",
};

export default async function CertificationsPage() {
  const certifications = await getCertifications();

  return (
    <div className="grow bg-mat-deep">
      <div className="mx-auto max-w-[1440px] px-6 pb-28 pt-16 sm:px-10 lg:px-16 lg:pt-24">
        <header className="mb-12 max-w-3xl">
          <h1 className="text-[clamp(3.5rem,8vw,6rem)] font-bold uppercase leading-[0.9] text-chalk">The archive</h1>
          <p className="mt-6 max-w-[56ch] text-xl leading-snug text-chalk-dim">
            Structured learning alongside the projects. Filter by field or sort by year.
          </p>
        </header>
        <CertificationArchive items={certifications} />
      </div>
    </div>
  );
}
