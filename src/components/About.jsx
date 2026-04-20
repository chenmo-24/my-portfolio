import { Code2, Layers3, Sparkles } from "lucide-react";

const iconMap = [Code2, Layers3, Sparkles];

function About({ info, language }) {
  const aboutParagraphs = info.aboutParagraphs[language];
  const focusAreas = info.focusAreas[language];
  const currentStatus = info.currentStatus[language];

  return (
    <section
      className="container-shell py-20 md:py-24"
      data-reveal
      data-section
      id="about"
      style={{ "--reveal-delay": "0.08s" }}
    >
      <div className="mb-12">
        <p className="section-title">About Me</p>
        <h2 className="section-heading">{language === "zh" ? "关于我" : "About Me"}</h2>
        <p className="section-copy">
          {language === "zh"
            ? "我更看重项目是否真实可用，而不只是看起来完成了。这个页面中的内容、交互和结构都围绕这一点组织。"
            : "I care more about whether a project is truly usable than whether it merely looks finished. The content, interaction, and structure of this site are all organized around that idea."}
        </p>
      </div>

      <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="panel-card p-8 md:p-10">
          <div className="space-y-6">
            {aboutParagraphs.map((paragraph) => (
              <p key={paragraph} className="text-base leading-8 text-slate-700 dark:text-slate-300">
                {paragraph}
              </p>
            ))}
          </div>
        </div>

        <div className="space-y-6">
          <div className="panel-card p-6">
            <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
              {language === "zh" ? "技术栈" : "Tech Stack"}
            </h3>
            <div className="mt-5 flex flex-wrap gap-3">
              {info.skills.map((skill) => (
                <span key={skill} className="badge-chip">
                  {skill}
                </span>
              ))}
            </div>
          </div>

          <div className="panel-card p-6">
            <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
              {language === "zh" ? "当前方向" : "Current Focus"}
            </h3>
            <ul className="mt-5 space-y-3">
              {focusAreas.map((item, index) => {
                const Icon = iconMap[index % iconMap.length];
                return (
                  <li key={item} className="flex items-center gap-3 text-slate-700 dark:text-slate-300">
                    <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-cyan-400/10 text-cyan-400">
                      <Icon size={18} />
                    </span>
                    <span>{item}</span>
                  </li>
                );
              })}
            </ul>
          </div>

          <div className="panel-card p-6">
            <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
              {language === "zh" ? "最近在做什么" : "What I'm Doing Recently"}
            </h3>
            <div className="mt-5 space-y-3">
              {currentStatus.map((item) => (
                <div
                  key={item}
                  className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm leading-7 text-slate-700 dark:text-slate-300"
                >
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default About;
