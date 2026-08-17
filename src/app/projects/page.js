import Image from "next/image";
import { ProjectGalleryStrip } from "@/components/projects/project-gallery-strip";
import { SectionHero } from "@/components/section-hero";
import { projects } from "@/content/projects";

export const metadata = {
  title: "Projects",
  description: "Selected projects by Heng Jun Yong.",
};

function ProjectTile({ project, index }) {
  return (
    <article className="project-tile group relative isolate flex min-h-[30rem] w-full shrink-0 overflow-hidden border border-slate-700 bg-slate-950 lg:h-[30rem] lg:w-[31rem] xl:h-[34rem] xl:w-[35rem]">
      <div className="absolute inset-0 bg-slate-900">
        {project.image ? (
          <Image
            src={project.image.src}
            alt={project.image.alt}
            fill
            sizes="(max-width: 1023px) calc(100vw - 2.5rem), (max-width: 1279px) 34rem, 39rem"
            className="project-tile-image object-contain p-3 sm:p-5"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center bg-[radial-gradient(circle_at_top_right,_#164e63,_transparent_42%),linear-gradient(135deg,_#0f172a,_#020617)] p-8">
            <span className="max-w-xs text-center text-3xl font-semibold tracking-[0.2em] text-cyan-100/70 uppercase sm:text-4xl">{project.visualLabel}</span>
          </div>
        )}
      </div>
      <div aria-hidden="true" className="project-tile-overlay absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/45 to-slate-950/5" />

      <div className="relative z-10 mt-auto w-full p-5 sm:p-6">
        <p className="text-xs font-semibold tracking-[0.18em] text-cyan-200 uppercase">{project.eyebrow ?? `Project / ${String(index + 1).padStart(2, "0")}`}</p>
        <h2 className="mt-2 text-3xl font-semibold tracking-tight text-white sm:text-4xl">{project.title}</h2>

        <div className="project-tile-details">
          <div>
            <p className="mt-4 max-w-xl text-sm leading-6 text-slate-200 sm:text-base">{project.description}</p>
            {project.highlights?.length > 0 && <p className="mt-3 max-w-xl text-sm leading-6 text-slate-300">{project.highlights[0]}</p>}
            <ul className="mt-4 flex flex-wrap gap-x-3 gap-y-1.5 text-sm text-cyan-100" aria-label={`${project.title} featured technologies`}>
              {project.featuredTech.map((technology) => <li key={technology}>{technology}</li>)}
            </ul>
            {project.links && (
              <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-3 text-sm font-semibold">
                {project.links.github && <a href={project.links.github} target="_blank" rel="noopener noreferrer" className="project-primary-action text-cyan-200 hover:text-cyan-100">GitHub<span aria-hidden="true"> -&gt;</span><span className="sr-only"> - {project.title}</span></a>}
                {project.links.demoVideo && <a href={project.links.demoVideo} target="_blank" rel="noopener noreferrer" className="text-slate-200 hover:text-white">Demo video<span aria-hidden="true"> -&gt;</span><span className="sr-only"> - {project.title}</span></a>}
              </div>
            )}
          </div>
        </div>
      </div>
    </article>
  );
}

export default function ProjectsPage() {
  const scrollHintId = "projects-scroll-hint";

  return (
    <section className="mx-auto w-full max-w-[100rem]" aria-labelledby="projects-title">
      <SectionHero title="Projects" titleId="projects-title" decorativeWord="PROJECTS" />
      <p id={scrollHintId} className="mt-5 hidden items-center gap-2 text-sm text-slate-400 lg:flex"><span aria-hidden="true">&lt;-</span> Scroll or use arrow keys to explore the work <span aria-hidden="true">-&gt;</span></p>
      <ProjectGalleryStrip hintId={scrollHintId}>
        {projects.map((project, index) => <ProjectTile key={project.slug} project={project} index={index} />)}
      </ProjectGalleryStrip>
    </section>
  );
}
