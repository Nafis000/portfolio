export function SiteFooter() {
  return (
    <footer className="border-t border-chalk/25 bg-mat-deep">
      <div className="mx-auto flex max-w-[1440px] flex-wrap items-center justify-between gap-4 px-6 py-6 text-sm text-chalk-dim">
        <p>
          <span className="font-display font-semibold text-chalk">Nafis Islam Nitol</span> · Electrical Engineering ·
          University of Pécs
        </p>
        <div className="flex items-center gap-6">
          <a href="https://github.com/Nafis000" className="hover:text-chalk">
            github.com/Nafis000
          </a>
        </div>
      </div>
    </footer>
  );
}
