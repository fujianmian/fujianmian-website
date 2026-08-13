export function SectionHero({ eyebrow, title, description, decorativeWord, titleId }) {
  return (
    <header className="relative overflow-hidden border-b border-slate-800 pb-6 sm:pb-7">
      {eyebrow && <p className="relative z-10 text-xs font-semibold tracking-[0.2em] text-cyan-300 uppercase">{eyebrow}</p>}
      <h1 id={titleId} className={`relative z-10 text-4xl font-semibold tracking-tight text-white sm:text-5xl lg:text-6xl ${eyebrow ? "mt-3" : ""}`}>{title}</h1>
      {description && <p className="relative z-10 mt-4 max-w-2xl text-base leading-7 text-slate-300 sm:text-lg">{description}</p>}
      {decorativeWord && (
        <span aria-hidden="true" className="pointer-events-none absolute z-0 -right-3 -bottom-5 hidden select-none text-7xl font-semibold tracking-[-0.08em] text-transparent opacity-50 [-webkit-text-stroke:1px_rgba(148,163,184,0.35)] md:block lg:text-8xl">
          {decorativeWord}
        </span>
      )}
    </header>
  );
}
