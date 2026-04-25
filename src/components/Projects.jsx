import { ArrowUpRight, Github } from "lucide-react";
import GrowthTimeline from "./GrowthTimeline";

function LinkButton({ href, icon: Icon, children }) {
  if (!href) {
    return null;
  }

  return (
    <a className="secondary-button" href={href} rel="noreferrer" target="_blank">
      <Icon size={16} />
      {children}
    </a>
  );
}

function getValue(value, language) {
  return typeof value === "string" ? value : value[language];
}

function Projects({ items, language }) {
  return (
    <section
      className="container-shell py-20 md:py-24"
      data-reveal
      data-section
      id="projects"
      style={{ "--reveal-delay": "0.12s" }}
    >
      <div className="mb-12">
        <p className="section-title">Selected Work</p>
        <h2 className="section-heading">{language === "zh" ? "我推荐的项目" : "Projects I Recommend"}</h2>
        <p className="section-copy">
          {language === "zh"
            ? "个人项目这部分我先临时换成了近期比较推荐的开源项目，最后保留一张“我的项目待更新中”的占位卡片，后续你可以再切回自己的作品展示。"
            : "For now, I replaced the personal project section with a few open-source projects I currently recommend, while keeping one placeholder card for my own work that will be updated later."}
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {items.map((project) => (
          <article
            key={getValue(project.title, language)}
            className={`panel-card group flex h-full flex-col p-7 ${
              project.isPlaceholder
                ? "border-dashed border-cyan-400/30 bg-cyan-400/5"
                : "hover:-translate-y-2 hover:border-cyan-400/40 hover:shadow-glow"
            }`}
          >
            <div className="mb-6 flex items-start justify-between gap-4">
              <div>
                <h3 className="text-2xl font-semibold text-slate-900 dark:text-white">
                  {getValue(project.title, language)}
                </h3>
                <p className="mt-4 text-base leading-8 text-slate-700 dark:text-slate-300">
                  {project.description[language]}
                </p>
              </div>
              <span className="rounded-full border border-cyan-400/20 bg-cyan-400/10 px-3 py-1 text-xs uppercase tracking-[0.28em] text-cyan-400">
                {project.badge[language]}
              </span>
            </div>

            <div className="mt-auto">
              <div className="mb-6 flex flex-wrap gap-2">
                {project.stack.map((item) => (
                  <span
                    key={item}
                    className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-sm text-slate-700 dark:text-slate-300"
                  >
                    {item}
                  </span>
                ))}
              </div>

              <div className="flex flex-wrap gap-3">
                <LinkButton href={project.liveUrl} icon={ArrowUpRight}>
                  {language === "zh" ? "查看项目" : "View Project"}
                </LinkButton>
                <LinkButton href={project.githubUrl} icon={Github}>
                  GitHub
                </LinkButton>
              </div>

              {project.isPlaceholder ? (
                <p className="mt-4 text-sm leading-7 text-slate-600 dark:text-slate-300">
                  {language === "zh"
                    ? "后面你只需要修改 "
                    : "Later, you only need to edit "}
                  <code className="rounded bg-white/10 px-2 py-1">src/data/projects.js</code>
                  {language === "zh"
                    ? " 里的这张卡，就能把推荐项目重新切回你自己的作品。"
                    : " to replace this placeholder with your own featured projects."}
                </p>
              ) : null}
            </div>
          </article>
        ))}
      </div>

      <GrowthTimeline language={language} />
    </section>
  );
}

export default Projects;
