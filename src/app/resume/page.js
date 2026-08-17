import Image from "next/image";
import { ResumeStrip } from "@/components/resume/resume-strip";
import { profile } from "@/content/profile";
import { resume } from "@/content/resume";

export const metadata = {
  title: "Resume",
  description: "Professional profile and experience of Heng Jun Yong.",
};

function ResumePanel({ id, title, children, className = "" }) {
  return (
    <section aria-labelledby={id} className={`border-t border-slate-800 px-5 py-7 first:border-t-0 sm:px-7 sm:py-8 lg:w-[26rem] lg:shrink-0 lg:border-t-0 lg:border-r lg:px-8 lg:py-6 xl:w-[29rem] ${className}`}>
      <h2 id={id} className="text-3xl font-semibold tracking-tight text-cyan-100 sm:text-4xl">{title}</h2>
      <div className="mt-6">{children}</div>
    </section>
  );
}

export default function ResumePage() {
  const [experience] = resume.experience;
  return (
    <section className="resume-page mx-auto w-full max-w-[100rem] lg:-my-8 lg:flex lg:h-[calc(100dvh-4rem)] lg:flex-col">
      <ResumeStrip className="!mt-0 lg:min-h-0 lg:flex-1">
        <ResumePanel id="profile-heading" title="Profile" className="lg:w-[28rem] xl:w-[31rem]">
          <Image src="/profile/profile-photo.jpg" alt={profile.name} width={640} height={640} sizes="(max-width: 1023px) 100vw, 28rem" className="aspect-[4/5] w-full max-w-xs border border-slate-700 object-cover lg:h-60 lg:w-auto lg:aspect-auto" />
          <h3 className="mt-6 text-2xl font-semibold tracking-tight text-white sm:text-3xl">{profile.name}</h3>
          <p className="mt-3 max-w-md leading-7 text-slate-300">{profile.introduction}</p>
        </ResumePanel>

        <ResumePanel id="education-heading" title="Education" className="lg:w-[31rem] xl:w-[34rem]">
          <div className="space-y-8">
            {resume.education.map((education) => (
              <article key={education.id}>
                <p className="text-sm font-medium text-cyan-200">{education.period}</p>
                <h3 className="mt-3 text-2xl font-semibold leading-tight tracking-tight text-white sm:text-3xl">{education.institution}</h3>
                <p className="mt-4 text-lg text-cyan-100">{education.program}</p>
                <p className="mt-2 text-slate-400">{education.abbreviation} · CGPA: {education.cgpa}</p>
              </article>
            ))}
          </div>
        </ResumePanel>

        <ResumePanel id="experience-heading" title="Experience" className="lg:w-[34rem] xl:w-[38rem]">
          <p className="text-sm font-medium text-cyan-200">{experience.dateLabel}</p>
          <h3 className="mt-3 text-2xl font-semibold tracking-tight text-white sm:text-3xl">{experience.role}</h3>
          <p className="mt-2 text-lg text-slate-300">{experience.company}</p>
          <ul className="mt-7 space-y-3 border-l border-slate-700 pl-5 leading-7 text-slate-300">{experience.highlights.map((highlight) => <li key={highlight}>{highlight}</li>)}</ul>
          <ul className="mt-7 flex flex-wrap gap-2" aria-label={`${experience.company} technologies`}>{experience.technologies.map((technology) => <li key={technology} className="border border-slate-700 px-2.5 py-1 text-sm text-slate-200">{technology}</li>)}</ul>
          <a href={experience.link} target="_blank" rel="noopener noreferrer" className="mt-6 inline-flex border border-cyan-300/60 px-3 py-2 text-sm font-semibold text-cyan-100 transition-colors hover:border-cyan-200 hover:bg-cyan-200/10">View on LinkedIn <span aria-hidden="true" className="ml-2">-&gt;</span><span className="sr-only"> - Razer internship post</span></a>
        </ResumePanel>

        <ResumePanel id="skills-heading" title="Skills" className="lg:w-[35rem] xl:w-[38rem]">
          <dl className="space-y-8">{resume.skills.map((group) => <div key={group.id}><dt className="text-lg font-semibold text-white">{group.label}</dt><dd className="mt-4 flex flex-wrap gap-2.5">{group.items.map((item) => <span key={item} className="rounded-full border border-slate-600 bg-slate-800 px-3.5 py-1.5 text-[0.7rem] font-semibold tracking-[0.12em] text-slate-100 uppercase">{item}</span>)}</dd></div>)}</dl>
        </ResumePanel>

        <ResumePanel id="selected-projects-heading" title="Selected Projects" className="lg:w-[37rem] xl:w-[41rem]">
          <div className="space-y-8">{resume.selectedProjects.map((project) => <article key={project.slug}><p className="text-sm font-medium text-cyan-200">{project.eyebrow}</p><h3 className="mt-3 text-2xl font-semibold tracking-tight text-white sm:text-3xl">{project.title}</h3><p className="mt-4 leading-7 text-slate-300">{project.description}</p><ul className="mt-5 space-y-2 border-l border-slate-700 pl-5 leading-7 text-slate-300">{project.highlights.map((highlight) => <li key={highlight}>{highlight}</li>)}</ul>{project.links?.github && <a href={project.links.github} target="_blank" rel="noopener noreferrer" className="mt-5 inline-flex border border-cyan-300/60 px-3 py-2 text-sm font-semibold text-cyan-100 transition-colors hover:border-cyan-200 hover:bg-cyan-200/10">View on GitHub <span aria-hidden="true" className="ml-2">-&gt;</span><span className="sr-only"> - {project.title}</span></a>}</article>)}</div>
        </ResumePanel>

        <ResumePanel id="achievements-heading" title="Achievements">
          <div className="space-y-8">{resume.achievements.map((achievement) => <article key={achievement.id}><h3 className="text-2xl font-semibold tracking-tight text-white sm:text-3xl">{achievement.title}</h3><p className="mt-5 leading-7 text-slate-300">{achievement.description}</p></article>)}</div>
        </ResumePanel>

        <ResumePanel id="languages-heading" title="Languages"><ul className="space-y-4 text-xl font-semibold tracking-tight text-white sm:text-2xl">{resume.languages.map((language) => <li key={language}>{language}</li>)}</ul></ResumePanel>
      </ResumeStrip>
    </section>
  );
}
