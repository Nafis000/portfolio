"use client";

import { useRef } from "react";
import type { Certification } from "@/lib/content/types";

// Native <dialog>: focus moves in, Esc closes, focus returns to the opener.
export function useCertificateViewer() {
  const ref = useRef<HTMLDialogElement>(null);
  return { ref, open: () => ref.current?.showModal(), close: () => ref.current?.close() };
}

export function CertificateViewer({
  cert,
  dialogRef,
  onClose,
}: {
  cert: Certification;
  dialogRef: React.RefObject<HTMLDialogElement | null>;
  onClose: () => void;
}) {
  const file = cert.certificate;
  const titleId = `cert-${cert.title.replace(/\W+/g, "-").toLowerCase()}`;

  return (
    <dialog
      ref={dialogRef}
      aria-labelledby={titleId}
      onClick={(e) => e.target === e.currentTarget && onClose()} // click on the backdrop closes
      className="m-auto w-[min(960px,calc(100vw-2rem))] bg-sheet p-0 text-ink shadow-[0_30px_80px_-20px_rgb(0_0_0/0.7)] backdrop:bg-mat-deep/80"
    >
      <div className="flex items-start justify-between gap-6 border-b-2 border-ink px-6 py-4">
        <div>
          <h2 id={titleId} className="text-2xl font-bold uppercase leading-tight">
            {cert.title}
          </h2>
          <p className="text-ink-dim">
            {cert.issuer} · {cert.year}
          </p>
        </div>
        <button
          type="button"
          onClick={onClose}
          className="border-2 border-ink px-4 py-1.5 font-display font-semibold uppercase tracking-[0.08em] hover:bg-ink hover:text-sheet"
        >
          Close
        </button>
      </div>
      <div className="p-4 sm:p-6">
        {!file ? null : file.mimeType === "application/pdf" ? (
          <>
            <iframe src={file.url} title={file.alt} className="h-[70dvh] w-full border border-sheet-line" />
            <a href={file.url} target="_blank" rel="noopener noreferrer" className="mt-3 inline-block underline underline-offset-4">
              Open the PDF in a new tab
            </a>
          </>
        ) : (
          // Certificate scans have arbitrary sizes; a plain img keeps their natural ratio.
          // eslint-disable-next-line @next/next/no-img-element
          <img src={file.url} alt={file.alt} className="mx-auto max-h-[75dvh] w-auto" />
        )}
      </div>
    </dialog>
  );
}
