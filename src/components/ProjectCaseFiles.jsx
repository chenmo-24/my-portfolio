import { useEffect, useMemo, useState } from "react";
import { BookOpen, BriefcaseBusiness, CheckCircle2, FileText, Layers3 } from "lucide-react";
import { projectCases } from "../data/projectCases";
import { getProgress, subscribeProgress, unlockAchievement, viewCase } from "../utils/progressStore";

function ProjectCaseFiles({ language }) {
  const [activeId, setActiveId] = useState(projectCases[0].id);
  const [progress, setProgress] = useState(() => getProgress());
  const zh = language === "zh";
  const activeCase = projectCases.find((item) => item.id === activeId) ?? projectCases[0];
  const viewed = useMemo(() => new Set(progress.viewedCases), [progress.viewedCases]);

  useEffect(() => subscribeProgress(setProgress), []);

  useEffect(() => {
    viewCase(activeId);
    unlockAchievement("view-project-case");
  }, [activeId]);

  const detailRows = [
    { label: zh ? "背景" : "Context", value: activeCase.context[language] },
    { label: zh ? "角色" : "Role", value: activeCase.role[language] },
    { label: zh ? "问题" : "Problem", value: activeCase.problem[language] },
    { label: zh ? "方案" : "Solution", value: activeCase.solution[language] },
    { label: zh ? "收获" : "Lesson", value: activeCase.lesson[language] },
    { label: zh ? "下一步" : "Next", value: activeCase.next[language] },
  ];

  return (
    <div className="panel-card overflow-hidden p-5 sm:p-8 md:p-10">
      <div className="mb-6">
        <p className="section-title mb-2">Module Case Files</p>
        <h3 className="text-2xl font-semibold text-slate-900 dark:text-white">
          {zh ? "项目档案" : "Project Case Files"}
        </h3>
        <p className="mt-4 max-w-3xl text-base leading-8 text-slate-700 dark:text-slate-300">
          {zh
            ? "用档案形式展示项目背景、技术选择和复盘，比普通卡片更能说明工程判断。"
            : "Case files show project context, technical choices, and lessons with more engineering signal than ordinary cards."}
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-[18rem_1fr]">
        <div className="space-y-3">
          {projectCases.map((item) => {
            const active = item.id === activeId;
            const isViewed = viewed.has(item.id);
            return (
              <button
                className={`w-full rounded-2xl border p-4 text-left transition ${
                  active
                    ? "border-cyan-400/50 bg-cyan-400/15"
                    : "border-white/10 bg-white/5 hover:border-cyan-400/30"
                }`}
                key={item.id}
                onClick={() => setActiveId(item.id)}
                type="button"
              >
                <span className="flex items-start justify-between gap-3">
                  <span className="min-w-0">
                    <span className="inline-flex items-center gap-2 text-sm font-semibold text-slate-900 dark:text-white">
                      <FileText size={16} className="text-cyan-500" />
                      {item.title[language]}
                    </span>
                    <span className="mt-2 block text-xs uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400">
                      {item.type[language]}
                    </span>
                  </span>
                  {isViewed ? <CheckCircle2 size={17} className="flex-shrink-0 text-cyan-500" /> : null}
                </span>
              </button>
            );
          })}
        </div>

        <article className="glass-panel min-w-0 p-5 sm:p-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            <div className="min-w-0">
              <p className="inline-flex items-center gap-2 text-sm uppercase tracking-[0.24em] text-slate-500 dark:text-slate-400">
                <BriefcaseBusiness size={15} />
                {activeCase.type[language]}
              </p>
              <h4 className="mt-3 text-2xl font-bold text-slate-900 dark:text-white">
                {activeCase.title[language]}
              </h4>
            </div>
            <div className="flex flex-wrap gap-2 sm:justify-end">
              {activeCase.stack.map((item) => (
                <span
                  className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-semibold text-slate-700 dark:text-slate-300"
                  key={item}
                >
                  {item}
                </span>
              ))}
            </div>
          </div>

          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {detailRows.map((row) => (
              <section className="rounded-2xl border border-white/10 bg-white/5 p-4" key={row.label}>
                <p className="mb-2 inline-flex items-center gap-2 text-xs uppercase tracking-[0.22em] text-slate-500 dark:text-slate-400">
                  <Layers3 size={13} />
                  {row.label}
                </p>
                <p className="text-sm leading-7 text-slate-700 dark:text-slate-300">{row.value}</p>
              </section>
            ))}
          </div>

          <div className="mt-6 rounded-3xl border border-cyan-400/20 bg-cyan-400/10 p-5">
            <p className="mb-2 inline-flex items-center gap-2 text-sm font-semibold text-cyan-700 dark:text-cyan-200">
              <BookOpen size={16} />
              {zh ? "档案价值" : "Why this file matters"}
            </p>
            <p className="text-sm leading-7 text-slate-700 dark:text-slate-300">
              {zh
                ? "这个模块把“做了什么”转换成“为什么这么做”，更适合展示项目判断和成长轨迹。"
                : "This turns what was built into why it was built, making project judgment and growth easier to inspect."}
            </p>
          </div>
        </article>
      </div>
    </div>
  );
}

export default ProjectCaseFiles;
