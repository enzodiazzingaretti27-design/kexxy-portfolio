import { useEffect, useMemo, useState } from "react";
import { siteContent } from "./siteContent.js";

const cardCuts = ["cut-corners", "card-cut-b", "card-cut-c"];

function resolvePublicAsset(path) {
  if (!path || path.startsWith("data:") || path.startsWith("http")) return path;
  return `${import.meta.env.BASE_URL}${path.replace(/^\//, "")}`;
}

function resolveAppLink(hash = "") {
  return `${import.meta.env.BASE_URL}${hash}`;
}

const MONTH_MAP = {
  jan: 0,
  january: 0,
  ene: 0,
  enero: 0,
  feb: 1,
  february: 1,
  febrero: 1,
  mar: 2,
  march: 2,
  marzo: 2,
  apr: 3,
  april: 3,
  abr: 3,
  abril: 3,
  may: 4,
  mayo: 4,
  jun: 5,
  june: 5,
  junio: 5,
  jul: 6,
  july: 6,
  julio: 6,
  aug: 7,
  august: 7,
  ago: 7,
  agosto: 7,
  sep: 8,
  sept: 8,
  september: 8,
  septiembre: 8,
  oct: 9,
  october: 9,
  octubre: 9,
  nov: 10,
  november: 10,
  noviembre: 10,
  dec: 11,
  december: 11,
  dic: 11,
  diciembre: 11,
};

function parseShowDate(rawDate) {
  const text = String(rawDate ?? "")
    .trim()
    .toLowerCase();
  if (!text) return null;

  const numeric = text.match(/^(\d{1,2})[/-](\d{1,2})[/-](\d{4})$/);
  if (numeric) {
    const day = Number(numeric[1]);
    const month = Number(numeric[2]) - 1;
    const year = Number(numeric[3]);
    const dt = new Date(year, month, day, 12, 0, 0, 0);
    return Number.isNaN(dt.getTime()) ? null : dt;
  }

  const tokenized = text.match(/^(\d{1,2})\s+([a-záéíóúüñ]+)\s+(\d{4})$/i);
  if (!tokenized) return null;

  const day = Number(tokenized[1]);
  const monthToken = tokenized[2]
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
  const month = MONTH_MAP[monthToken];
  const year = Number(tokenized[3]);
  if (month === undefined) return null;

  const dt = new Date(year, month, day, 12, 0, 0, 0);
  return Number.isNaN(dt.getTime()) ? null : dt;
}

function SectionHeading({ index, title, subtitle, action }) {
  return (
    <div className="fluid-section-head mb-7 flex flex-col gap-3 border-b border-white/10 pb-4 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <p className="mb-2 text-[10px] tracking-[0.28em] text-white/55">{index}</p>
        <h2 className="font-display text-3xl uppercase leading-none tracking-[0.03em] md:text-5xl">{title}</h2>
      </div>
      <div className="flex flex-col gap-3 sm:items-end">
        {subtitle ? (
          <p className="max-w-xs text-xs uppercase leading-relaxed tracking-[0.14em] text-white/50 sm:text-right">{subtitle}</p>
        ) : null}
        {action ? (
          <a
            href={action.href}
            target={action.newTab ? "_blank" : undefined}
            rel={action.newTab ? "noreferrer" : undefined}
            className="cut-corners border border-raveRed/70 px-4 py-2 text-[10px] uppercase tracking-[0.2em] text-raveRed transition hover:bg-raveRed/15 hover:text-white"
          >
            {action.label}
          </a>
        ) : null}
      </div>
    </div>
  );
}

function DistortedCard({ children, className = "", surfaceIndex = 0, style }) {
  const cut = cardCuts[surfaceIndex % cardCuts.length];
  return (
    <article className={`${cut} grime-panel organic-card ${className}`} style={style}>
      {children}
    </article>
  );
}

function HeroRedFringe() {
  return (
    <div
      className="pointer-events-none absolute inset-0 z-10 mix-blend-soft-light opacity-70"
      style={{
        background:
          "linear-gradient(165deg, rgba(255,0,0,0.22) 0%, transparent 42%), linear-gradient(25deg, transparent 55%, rgba(120,0,0,0.35) 100%)",
      }}
    />
  );
}

function makePlaceholderSlide(label) {
  const safe = encodeURIComponent(label.toUpperCase());
  return `data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1600 900'><defs><linearGradient id='bg' x1='0' y1='0' x2='1' y2='1'><stop offset='0%' stop-color='%23060606'/><stop offset='60%' stop-color='%23111111'/><stop offset='100%' stop-color='%23200000'/></linearGradient></defs><rect width='1600' height='900' fill='url(%23bg)'/><rect x='90' y='90' width='1420' height='720' fill='none' stroke='%23ff0000' stroke-opacity='0.45' stroke-width='3'/><text x='800' y='435' fill='%23ffffff' fill-opacity='0.9' font-size='64' font-family='Arial' text-anchor='middle' letter-spacing='8'>${safe}</text><text x='800' y='505' fill='%23ff0000' fill-opacity='0.85' font-size='28' font-family='Arial' text-anchor='middle' letter-spacing='5'>KEXXY PORTFOLIO PREVIEW</text></svg>`;
}

function DetailModal({ viewer, onClose, onPrev, onNext }) {
  if (!viewer) return null;
  const item = viewer.items[viewer.index];
  return (
    <div className="fixed inset-0 z-[120] flex items-center justify-center bg-black/80 px-4 py-6 backdrop-blur-sm" onClick={onClose}>
      <div
        className="modal-panel cut-corners w-full max-w-4xl border border-white/25 bg-[#0a0a0a] p-4 md:p-6"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="mb-4 flex items-start justify-between gap-4 border-b border-white/15 pb-3">
          <div>
            <p className="text-[10px] uppercase tracking-[0.24em] text-raveRed/80">{viewer.sectionLabel}</p>
            <h3 className="font-display text-2xl uppercase tracking-[0.05em] md:text-3xl">{item.title}</h3>
            {item.subtitle ? <p className="mt-1 text-xs uppercase tracking-[0.16em] text-white/55">{item.subtitle}</p> : null}
          </div>
          <button type="button" onClick={onClose} className="polish-btn border border-white/30 px-3 py-1 text-xs uppercase tracking-[0.18em]">
            Cerrar
          </button>
        </div>

        <div className="relative">
          <div className="relative aspect-[16/9] w-full overflow-hidden border border-white/15 bg-black">
            <img src={item.slides[viewer.slideIndex]} alt={item.title} className="h-full w-full object-cover" />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-black/25" />
          </div>
          {item.slides.length > 1 ? (
            <>
              <button
                type="button"
                onClick={onPrev}
                className="polish-btn absolute left-2 top-1/2 -translate-y-1/2 border border-white/40 bg-black/70 px-3 py-2 text-xs uppercase tracking-[0.2em]"
              >
                {"<"}
              </button>
              <button
                type="button"
                onClick={onNext}
                className="polish-btn absolute right-2 top-1/2 -translate-y-1/2 border border-white/40 bg-black/70 px-3 py-2 text-xs uppercase tracking-[0.2em]"
              >
                {">"}
              </button>
            </>
          ) : null}
        </div>

        <p className="mt-4 text-sm leading-relaxed text-white/80">{item.description}</p>
        {item.tags?.length ? (
          <div className="mt-4 flex flex-wrap gap-2">
            {item.tags.map((tag) => (
              <span key={`${item.title}-${tag}`} className="border border-white/20 bg-white/5 px-2 py-1 text-[10px] uppercase tracking-[0.14em] text-white/70">
                {tag}
              </span>
            ))}
          </div>
        ) : null}
        <p className="mt-4 text-[10px] uppercase tracking-[0.22em] text-white/45">
          Slide {viewer.slideIndex + 1} / {item.slides.length}
        </p>
      </div>
    </div>
  );
}

export default function App() {
  const content = siteContent;
  const s = content.sections;
  const [viewer, setViewer] = useState(null);
  const [currentHash, setCurrentHash] = useState(() => window.location.hash);
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const normalizedTourDates = content.tourDates.map((show, index) => {
    const parsed = parseShowDate(show.date);
    const isPast = parsed ? parsed.getTime() < today.getTime() : false;
    return {
      ...show,
      originalIndex: index,
      parsedTime: parsed?.getTime() ?? null,
      isPast,
    };
  });

  const pastShows = normalizedTourDates.filter((show) => show.isPast);
  const visiblePastSet = new Set(pastShows.slice(-3).map((show) => show.originalIndex));
  const visibleTourDates = normalizedTourDates.filter((show) => !show.isPast || visiblePastSet.has(show.originalIndex));
  const projectDetails = useMemo(
    () =>
      content.projects.map((project) => ({
        title: project.title,
        subtitle: project.type,
        description: project.description,
        tags: project.tags ?? [],
        slides: [project.imageUrl ? resolvePublicAsset(project.imageUrl) : makePlaceholderSlide(project.title)],
      })),
    [content.projects],
  );
  const loopDetails = useMemo(
    () =>
      content.touchDesignerLoops.map((loop) => ({
        title: loop.name,
        subtitle: "TouchDesigner Loop",
        description: loop.notes,
        tags: ["touchdesigner", "generative", "live visuals"],
        slides: [
          makePlaceholderSlide(`${loop.name} - Scene 1`),
          makePlaceholderSlide(`${loop.name} - Scene 2`),
        ],
      })),
    [content.touchDesignerLoops],
  );
  const blenderDetails = useMemo(
    () =>
      content.blenderWorks.map((work) => ({
        title: work,
        subtitle: "Blender Render",
        description: `Serie visual "${work}" enfocada en composicion cinematica, materiales y look development.`,
        tags: ["blender", "3d", "render"],
        slides: [
          makePlaceholderSlide(`${work} - Render 1`),
          makePlaceholderSlide(`${work} - Render 2`),
        ],
      })),
    [content.blenderWorks],
  );
  const requestedArchive = currentHash.replace("#", "");
  const activeArchive = ["web-archive", "touchdesigner-archive", "blender-archive"].includes(requestedArchive)
    ? requestedArchive
    : "";
  const closeArchive = () => {
    window.close();
    window.location.href = import.meta.env.BASE_URL;
  };

  useEffect(() => {
    const nodes = document.querySelectorAll(".reveal-on-scroll");
    if (!nodes.length) return undefined;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.16, rootMargin: "0px 0px -8% 0px" },
    );

    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!viewer) return undefined;
    const onKey = (event) => {
      if (event.key === "Escape") setViewer(null);
      if (event.key === "ArrowLeft") {
        setViewer((current) => {
          if (!current) return current;
          const total = current.items[current.index].slides.length;
          return { ...current, slideIndex: (current.slideIndex - 1 + total) % total };
        });
      }
      if (event.key === "ArrowRight") {
        setViewer((current) => {
          if (!current) return current;
          const total = current.items[current.index].slides.length;
          return { ...current, slideIndex: (current.slideIndex + 1) % total };
        });
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [viewer]);

  useEffect(() => {
    let ticking = false;
    const update = () => {
      const max = Math.max(document.body.scrollHeight - window.innerHeight, 1);
      const progress = Math.min(window.scrollY / max, 1);
      document.documentElement.style.setProperty("--scroll-progress", progress.toFixed(4));
      ticking = false;
    };
    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  useEffect(() => {
    const updateHash = () => setCurrentHash(window.location.hash);
    window.addEventListener("hashchange", updateHash);
    return () => window.removeEventListener("hashchange", updateHash);
  }, []);

  return (
    <div className="tribal-fluid relative min-h-screen overflow-x-hidden bg-ink text-white selection:bg-raveRed/50">
      <div className="page-enter-overlay pointer-events-none fixed inset-0 z-[70]" />
      <div className="noise fixed inset-0 z-20 pointer-events-none opacity-30" />

      <header className="fixed left-0 top-0 z-40 w-full border-b border-white/20 bg-black/70 backdrop-blur-sm">
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 md:px-10">
          <a href="#hero" className="font-display text-lg uppercase tracking-[0.22em]">
            {content.brand}
          </a>
          <div className="hidden items-center gap-5 md:flex">
            {content.nav.map((item) => (
              <a
                key={item.href + item.label}
                href={item.href}
                className="nav-link text-[10px] uppercase tracking-[0.2em] text-white/65 transition hover:text-raveRed"
              >
                {item.label}
              </a>
            ))}
          </div>
        </nav>
        <div className="mx-auto flex max-w-7xl gap-2 overflow-x-auto px-5 pb-3 md:hidden md:px-10">
          {content.nav.map((item) => (
            <a
              key={`mobile-${item.href}-${item.label}`}
              href={item.href}
              className="shrink-0 border border-white/20 px-3 py-1 text-[10px] uppercase tracking-[0.18em] text-white/70 transition hover:border-raveRed hover:text-raveRed"
            >
              {item.label}
            </a>
          ))}
        </div>
      </header>

      <main className="organic-flow relative z-10 mx-auto max-w-7xl px-5 pb-16 pt-32 md:px-10 md:pt-24">
        {!activeArchive ? (
        <>
        <section id="hero" className="relative mb-10 grid gap-6 border-b border-white/15 pb-10 md:grid-cols-2 md:items-stretch">
          <div className="hero-glow pointer-events-none absolute -left-8 -top-8 z-0 h-40 w-40 rounded-full bg-raveRed/25 blur-3xl" />
          <div className="cut-corners grime-panel reveal-up reveal-on-scroll flex min-h-[18rem] justify-center p-6 md:p-8">
            <div className="flex w-full flex-col items-center justify-center text-center">
              <p className="mb-3 text-[10px] uppercase tracking-[0.28em] text-white/65">{content.hero.tagline}</p>
              <h1 className="font-display text-4xl uppercase leading-[0.9] tracking-[0.03em] md:text-6xl">
                <span className="inline-block border border-white/35 bg-black px-3 py-1 shadow-[4px_4px_0_#ff0000]">{content.hero.title}</span>
              </h1>
              <p className="mt-4 max-w-md text-sm uppercase tracking-[0.16em] text-white/70">{content.hero.description}</p>
              <div className="mt-6 flex flex-wrap justify-center gap-3 md:justify-start">
                <a
                  href="#projects"
                  className="polish-btn cut-corners border border-raveRed/80 bg-raveRed/15 px-4 py-2 text-[10px] uppercase tracking-[0.2em] text-white transition hover:bg-raveRed/25"
                >
                  Ver proyectos
                </a>
                <a
                  href="#contact"
                  className="polish-btn cut-corners border border-white/30 px-4 py-2 text-[10px] uppercase tracking-[0.2em] text-white/85 transition hover:border-raveRed hover:text-raveRed"
                >
                  Contacto
                </a>
              </div>
            </div>
          </div>

          <div className="card-cut-b reveal-up reveal-on-scroll relative w-full overflow-hidden border border-white/20 bg-ink">
            <div className="relative h-full min-h-[18rem] w-full">
              <img
                src={resolvePublicAsset(content.heroImage)}
                alt={content.hero.title}
                className="hero-parallax-image relative z-0 mx-auto block h-full w-full max-w-full object-cover brightness-[0.88] contrast-[1.28] saturate-[0.82]"
              />
              <div className="pointer-events-none absolute inset-0 z-10 bg-gradient-to-t from-black via-black/35 to-black/55" />
              <div
                className="pointer-events-none absolute inset-0 z-10 mix-blend-multiply"
                style={{
                  background:
                    "radial-gradient(ellipse 68% 58% at 50% 42%, transparent 0%, rgba(0,0,0,0.38) 58%, rgba(0,0,0,0.82) 100%)",
                  opacity: 0.95,
                }}
              />
              <HeroRedFringe />
              <div className="pointer-events-none absolute inset-0 z-10 bg-gradient-to-b from-transparent via-transparent to-black/40" />
            </div>
          </div>
        </section>

        <section id="tour" className="mb-10">
          <SectionHeading index={s.tour.index} title={s.tour.title} subtitle={s.tour.subtitle || undefined} />
          <div className="space-y-3">
            {visibleTourDates.map((show, index) => (
              <DistortedCard
                key={`${show.date}-${show.city}`}
                surfaceIndex={index}
                className={`reveal-up reveal-on-scroll group grid gap-4 border border-white/25 p-4 transition hover:-translate-y-0.5 hover:border-raveRed md:grid-cols-[1fr_1fr_1fr] ${
                  show.isPast ? "past-show-card " : ""
                }${
                  index % 2 === 0 ? "md:-rotate-[0.4deg]" : "md:rotate-[0.65deg]"
                }`}
                style={{ "--reveal-delay": `${index * 80}ms` }}
              >
                <p className={`font-display text-lg uppercase tracking-[0.08em] ${show.isPast ? "text-white/45" : ""}`}>
                  {show.date}
                </p>
                <p className={`text-sm uppercase tracking-[0.2em] ${show.isPast ? "text-white/45" : "text-white/80"}`}>
                  {show.city}
                </p>
                <p className={`text-sm uppercase tracking-[0.2em] ${show.isPast ? "text-raveRed/55" : "text-raveRed"}`}>
                  {show.venue}
                </p>
              </DistortedCard>
            ))}
          </div>
        </section>

        <section id="projects" className="mb-10">
          <SectionHeading
            index={s.projects.index}
            title={s.projects.title}
            subtitle={s.projects.subtitle}
            action={{ label: "Ver mas", href: resolveAppLink("#web-archive"), newTab: true }}
          />
          <div className="grid gap-4 md:grid-cols-3">
            {content.projects.map((project, index) => (
              <DistortedCard
                key={`${project.title}-${index}`}
                surfaceIndex={index + 1}
                className={`reveal-up reveal-on-scroll border border-white/20 p-5 transition hover:border-raveRed hover:bg-raveRed/10 ${
                  index === 1 ? "md:-translate-y-2 md:rotate-[0.75deg]" : "md:rotate-[-0.4deg]"
                }`}
                style={{ "--reveal-delay": `${index * 90}ms` }}
              >
                <p className="mb-3 text-[10px] uppercase tracking-[0.26em] text-white/60">{project.type}</p>
                <h3 className="font-display text-lg uppercase leading-snug md:text-xl">{project.title}</h3>
                <p className="mt-3 text-[13px] leading-relaxed text-white/80 md:text-sm">{project.description}</p>
                {project.tags?.length ? (
                  <div className="mt-4 flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <span
                        key={`${project.title}-${tag}`}
                        className="border border-white/20 bg-black/40 px-2 py-1 text-[10px] uppercase tracking-[0.14em] text-white/75"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                ) : null}
                <button
                  type="button"
                  onClick={() => setViewer({ sectionLabel: "Web Projects", items: projectDetails, index, slideIndex: 0 })}
                  className="mt-5 inline-block text-[10px] uppercase tracking-[0.2em] text-raveRed transition hover:text-white"
                >
                  Ver proyecto {"->"}
                </button>
              </DistortedCard>
            ))}
          </div>
        </section>

        <section id="touchdesigner" className="mb-10">
          <SectionHeading
            index={s.touchDesigner.index}
            title={s.touchDesigner.title}
            subtitle={s.touchDesigner.subtitle}
            action={{ label: "Ver mas", href: resolveAppLink("#touchdesigner-archive"), newTab: true }}
          />
          <div className="grid gap-4 md:grid-cols-3">
            {content.touchDesignerLoops.map((loop, index) => (
              <DistortedCard
                key={loop.name}
                surfaceIndex={index + 2}
                className={`reveal-up reveal-on-scroll experimental-grid border border-raveRed/40 p-4 ${
                  index % 2 === 0 ? "md:rotate-[0.6deg]" : "md:-rotate-[0.55deg]"
                }`}
                style={{ "--reveal-delay": `${index * 90}ms` }}
              >
                <div className="mb-4 aspect-video w-full border border-white/25 bg-black/70 p-3">
                  <div className="h-full w-full bg-gradient-to-br from-raveRed/30 via-white/5 to-black" />
                </div>
                <h3 className="font-display text-lg uppercase md:text-xl">{loop.name}</h3>
                <p className="mt-3 text-[13px] leading-relaxed text-white/80 md:text-sm">{loop.notes}</p>
                <button
                  type="button"
                  onClick={() => setViewer({ sectionLabel: "TouchDesigner", items: loopDetails, index, slideIndex: 0 })}
                  className="mt-4 inline-block text-[10px] uppercase tracking-[0.2em] text-raveRed transition hover:text-white"
                >
                  Abrir carrusel {"->"}
                </button>
              </DistortedCard>
            ))}
          </div>
        </section>

        <section id="blender" className="mb-10">
          <SectionHeading
            index={s.blender.index}
            title={s.blender.title}
            subtitle={s.blender.subtitle}
            action={{ label: "Ver mas", href: resolveAppLink("#blender-archive"), newTab: true }}
          />
          <div className="grid gap-4 md:grid-cols-2">
            {content.blenderWorks.slice(0, 2).map((work, index) => (
              <DistortedCard
                key={work}
                surfaceIndex={index}
                className={`reveal-up reveal-on-scroll border border-white/20 p-4 ${
                  index % 2 === 0 ? "md:-rotate-[0.5deg]" : "md:rotate-[0.45deg]"
                }`}
                style={{ "--reveal-delay": `${index * 85}ms` }}
              >
                <div className="mb-4 aspect-[4/3] border border-white/20 bg-gradient-to-tr from-black to-zinc-900 p-4">
                  <div className="h-full w-full rounded-sm border border-raveRed/35 bg-gradient-to-br from-zinc-950 via-zinc-900 to-black" />
                </div>
                <p className="text-[10px] uppercase tracking-[0.22em] text-white/55">Frame {String(index + 1).padStart(2, "0")}</p>
                <h3 className="mt-2 font-display text-lg uppercase md:text-xl">{work}</h3>
                <button
                  type="button"
                  onClick={() => setViewer({ sectionLabel: "Blender Renders", items: blenderDetails, index, slideIndex: 0 })}
                  className="mt-4 inline-block text-[10px] uppercase tracking-[0.2em] text-raveRed transition hover:text-white"
                >
                  Ver render {"->"}
                </button>
              </DistortedCard>
            ))}
          </div>
        </section>
        </>
        ) : null}

        {activeArchive === "web-archive" ? (
        <section id="web-archive" className="mb-10">
          <button
            type="button"
            onClick={closeArchive}
            className="mb-6 cut-corners border border-white/30 px-4 py-2 text-[10px] uppercase tracking-[0.2em] text-white/80 transition hover:border-raveRed hover:text-raveRed"
          >
            Cerrar archivo
          </button>
          <SectionHeading index="ARCHIVE / WEB" title="WEB PROJECTS" subtitle="Galeria completa de proyectos web para actualizar y anunciar." />
          <div className="grid gap-4 md:grid-cols-3">
            {projectDetails.map((project, index) => (
              <DistortedCard key={`web-archive-${index}`} surfaceIndex={index} className="reveal-up reveal-on-scroll border border-white/20 p-5">
                <div className="mb-4 aspect-video overflow-hidden border border-white/15 bg-black">
                  <img src={project.slides[0]} alt={project.title} className="h-full w-full object-cover" />
                </div>
                <p className="mb-2 text-[10px] uppercase tracking-[0.22em] text-white/55">{project.subtitle}</p>
                <h3 className="font-display text-lg uppercase md:text-xl">{project.title}</h3>
                <p className="mt-3 text-[13px] leading-relaxed text-white/75">{project.description}</p>
                <button
                  type="button"
                  onClick={() => setViewer({ sectionLabel: "Web Projects", items: projectDetails, index, slideIndex: 0 })}
                  className="mt-4 inline-block text-[10px] uppercase tracking-[0.2em] text-raveRed transition hover:text-white"
                >
                  Abrir archivo {"->"}
                </button>
              </DistortedCard>
            ))}
          </div>
        </section>
        ) : null}

        {activeArchive === "touchdesigner-archive" ? (
        <section id="touchdesigner-archive" className="mb-10">
          <button
            type="button"
            onClick={closeArchive}
            className="mb-6 cut-corners border border-white/30 px-4 py-2 text-[10px] uppercase tracking-[0.2em] text-white/80 transition hover:border-raveRed hover:text-raveRed"
          >
            Cerrar archivo
          </button>
          <SectionHeading index="ARCHIVE / TOUCHDESIGNER" title="VISUAL LOOPS" subtitle="Archivo completo de visuales audioritmicas y loops generativos." />
          <div className="grid gap-4 md:grid-cols-3">
            {loopDetails.map((loop, index) => (
              <DistortedCard key={loop.title} surfaceIndex={index + 1} className="reveal-up reveal-on-scroll experimental-grid border border-raveRed/40 p-4">
                <div className="mb-4 aspect-video overflow-hidden border border-white/15 bg-black">
                  <img src={loop.slides[0]} alt={loop.title} className="h-full w-full object-cover" />
                </div>
                <p className="mb-2 text-[10px] uppercase tracking-[0.22em] text-white/55">{loop.subtitle}</p>
                <h3 className="font-display text-lg uppercase md:text-xl">{loop.title}</h3>
                <p className="mt-3 text-[13px] leading-relaxed text-white/75">{loop.description}</p>
                <button
                  type="button"
                  onClick={() => setViewer({ sectionLabel: "TouchDesigner", items: loopDetails, index, slideIndex: 0 })}
                  className="mt-4 inline-block text-[10px] uppercase tracking-[0.2em] text-raveRed transition hover:text-white"
                >
                  Abrir archivo {"->"}
                </button>
              </DistortedCard>
            ))}
          </div>
        </section>
        ) : null}

        {activeArchive === "blender-archive" ? (
        <section id="blender-archive" className="mb-10">
          <button
            type="button"
            onClick={closeArchive}
            className="mb-6 cut-corners border border-white/30 px-4 py-2 text-[10px] uppercase tracking-[0.2em] text-white/80 transition hover:border-raveRed hover:text-raveRed"
          >
            Cerrar archivo
          </button>
          <SectionHeading index="ARCHIVE / BLENDER" title="RENDER ARCHIVE" subtitle="Galeria completa de renders artisticos, tecnicos y arquitectonicos." />
          <div className="grid gap-4 md:grid-cols-3">
            {blenderDetails.map((work, index) => (
              <DistortedCard key={work.title} surfaceIndex={index + 2} className="reveal-up reveal-on-scroll border border-white/20 p-4">
                <div className="mb-4 aspect-[4/3] overflow-hidden border border-white/15 bg-black">
                  <img src={work.slides[0]} alt={work.title} className="h-full w-full object-cover" />
                </div>
                <p className="mb-2 text-[10px] uppercase tracking-[0.22em] text-white/55">{work.subtitle}</p>
                <h3 className="font-display text-lg uppercase md:text-xl">{work.title}</h3>
                <p className="mt-3 text-[13px] leading-relaxed text-white/75">{work.description}</p>
                <button
                  type="button"
                  onClick={() => setViewer({ sectionLabel: "Blender Renders", items: blenderDetails, index, slideIndex: 0 })}
                  className="mt-4 inline-block text-[10px] uppercase tracking-[0.2em] text-raveRed transition hover:text-white"
                >
                  Abrir archivo {"->"}
                </button>
              </DistortedCard>
            ))}
          </div>
        </section>
        ) : null}

        {!activeArchive ? (
        <>
        <section id="about" className="mb-10">
          <SectionHeading index={s.about.index} title={s.about.title} subtitle={s.about.subtitle} />
          <DistortedCard surfaceIndex={2} className="reveal-up reveal-on-scroll border border-white/20 p-6 md:p-8">
            <p className="max-w-4xl text-base leading-relaxed text-white/85 md:text-lg">{content.about.paragraph}</p>
          </DistortedCard>
        </section>

        <section id="contact">
          <SectionHeading index={s.contact.index} title={s.contact.title} subtitle={s.contact.subtitle} />
          <DistortedCard surfaceIndex={0} className="reveal-up reveal-on-scroll border border-raveRed/70 p-6 md:p-8">
            <p className="mb-5 font-display text-2xl uppercase tracking-[0.06em] md:text-3xl">
              <span className="inline-block border border-white/35 bg-black px-3 py-1 shadow-[4px_4px_0_#ff0000]">
                {content.contact.headline}
              </span>
            </p>
            <div className="flex flex-wrap items-center gap-4">
              <a
                href={`mailto:${content.contact.email}`}
                className="cut-corners border border-white/25 px-4 py-2 text-xs uppercase tracking-[0.2em] transition hover:border-raveRed hover:text-raveRed"
              >
                {content.contact.email}
              </a>
              <a
                href={content.contact.instagram}
                className="cut-corners border border-white/25 px-4 py-2 text-xs uppercase tracking-[0.2em] transition hover:border-raveRed hover:text-raveRed"
              >
                Instagram
              </a>
              <a
                href={content.contact.soundcloud}
                className="cut-corners border border-white/25 px-4 py-2 text-xs uppercase tracking-[0.2em] transition hover:border-raveRed hover:text-raveRed"
              >
                Soundcloud
              </a>
            </div>
          </DistortedCard>
        </section>
        </>
        ) : null}
      </main>
      <DetailModal
        viewer={viewer}
        onClose={() => setViewer(null)}
        onPrev={() =>
          setViewer((current) => {
            if (!current) return current;
            const total = current.items[current.index].slides.length;
            return { ...current, slideIndex: (current.slideIndex - 1 + total) % total };
          })
        }
        onNext={() =>
          setViewer((current) => {
            if (!current) return current;
            const total = current.items[current.index].slides.length;
            return { ...current, slideIndex: (current.slideIndex + 1) % total };
          })
        }
      />
    </div>
  );
}
