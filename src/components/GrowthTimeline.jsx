import { useState } from "react";
import { Code2, GitBranch, Rocket, Route, Sparkles, Target } from "lucide-react";

const MILESTONES = [
  {
    id: "foundation",
    icon: Code2,
    title: { zh: "打基础", en: "Foundation" },
    period: { zh: "课程与自学", en: "Coursework and self-learning" },
    desc: {
      zh: "从 JavaScript、React、C++、Python 和基础数据结构开始，把语法学习转成可运行的小功能。",
      en: "Starting from JavaScript, React, C++, Python, and core data structures, turning syntax learning into working features.",
    },
    tags: ["JavaScript", "React", "C++", "Python"],
  },
  {
    id: "algorithm",
    icon: Route,
    title: { zh: "算法训练", en: "Algorithm Training" },
    period: { zh: "持续推进", en: "Ongoing" },
    desc: {
      zh: "围绕 AcWing 与 LeetCode 训练建模、边界处理和复杂度意识，并把进度沉淀成可视化面板。",
      en: "Using AcWing and LeetCode to train modeling, edge-case handling, and complexity awareness, then turning progress into a visual panel.",
    },
    tags: ["AcWing", "LeetCode", "DP", "Graph"],
  },
  {
    id: "portfolio",
    icon: Sparkles,
    title: { zh: "作品集交互", en: "Portfolio Interaction" },
    period: { zh: "当前重点", en: "Current focus" },
    desc: {
      zh: "把个人主页做成真正可玩的单页应用：终端、命令面板、小游戏、调试挑战和算法可视化组合在一起。",
      en: "Making the portfolio a genuinely interactive single-page app with terminal UI, command palette, games, debugging, and algorithm visualization.",
    },
    tags: ["Vite", "Tailwind", "Fun Zone", "UX"],
  },
  {
    id: "shipping",
    icon: Rocket,
    title: { zh: "部署交付", en: "Shipping" },
    period: { zh: "工程化完善", en: "Engineering polish" },
    desc: {
      zh: "通过 GitHub Actions 自动部署到 GitHub Pages，关注构建产物、路径配置、元信息和可维护结构。",
      en: "Deploying to GitHub Pages through GitHub Actions while caring about build output, base paths, metadata, and maintainable structure.",
    },
    tags: ["GitHub Actions", "Pages", "Build", "Deploy"],
  },
  {
    id: "next",
    icon: Target,
    title: { zh: "下一阶段", en: "Next Stage" },
    period: { zh: "待展开", en: "Planned" },
    desc: {
      zh: "补齐自己的正式项目展示：真实 Demo、实现细节、代码链接、踩坑记录和迭代过程。",
      en: "Filling in formal personal projects with real demos, implementation notes, code links, lessons learned, and iteration history.",
    },
    tags: ["Demo", "Case Study", "Notes", "Iteration"],
  },
];

function GrowthTimeline({ language }) {
  const [activeId, setActiveId] = useState("portfolio");
  const zh = language === "zh";
  const active = MILESTONES.find((item) => item.id === activeId) ?? MILESTONES[0];
  const ActiveIcon = active.icon;

  return (
    <div id="growth-map" className="mt-10 panel-card overflow-hidden p-5 sm:p-8 md:p-10">
      <div className="mb-6">
        <p className="section-title mb-2">Growth Map</p>
        <h3 className="text-2xl font-semibold text-slate-900 dark:text-white">
          {zh ? "项目时间线 / 成长地图" : "Project Timeline / Growth Map"}
        </h3>
        <p className="mt-4 max-w-3xl text-base leading-8 text-slate-700 dark:text-slate-300">
          {zh
            ? "相比只摆项目卡片，这条线把学习、训练、交互实现和部署过程串起来，展示你如何一步步把想法做成可运行的东西。"
            : "Instead of only showing project cards, this map connects learning, training, interaction work, and deployment into a visible building path."}
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1fr_20rem]">
        <div className="relative">
          <div className="absolute left-5 top-6 hidden h-[calc(100%-3rem)] w-px bg-cyan-400/25 md:block" />
          <div className="space-y-3">
            {MILESTONES.map((item, index) => {
              const Icon = item.icon;
              const selected = activeId === item.id;
              return (
                <button
                  key={item.id}
                  className={`relative flex w-full items-start gap-4 rounded-2xl border p-4 text-left transition ${
                    selected
                      ? "border-cyan-400/40 bg-cyan-400/10 shadow-[0_16px_40px_rgba(34,211,238,0.12)]"
                      : "border-white/10 bg-white/5 hover:border-cyan-400/25"
                  }`}
                  onClick={() => setActiveId(item.id)}
                  type="button"
                >
                  <span
                    className={`relative z-10 flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full ${
                      selected ? "bg-cyan-500 text-slate-950" : "bg-slate-900/10 text-cyan-500 dark:bg-white/10"
                    }`}
                  >
                    <Icon size={18} />
                  </span>
                  <span className="min-w-0">
                    <span className="text-xs uppercase tracking-[0.28em] text-slate-500 dark:text-slate-400">
                      {String(index + 1).padStart(2, "0")} · {item.period[language]}
                    </span>
                    <span className="mt-1 block text-lg font-semibold text-slate-900 dark:text-white">
                      {item.title[language]}
                    </span>
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        <aside className="glass-panel p-5">
          <div className="mb-4 flex items-center gap-3 text-cyan-500">
            <ActiveIcon size={24} />
            <div>
              <p className="text-xs uppercase tracking-[0.28em] text-slate-500 dark:text-slate-400">
                {active.period[language]}
              </p>
              <h4 className="mt-1 text-xl font-bold text-slate-900 dark:text-white">
                {active.title[language]}
              </h4>
            </div>
          </div>
          <p className="text-sm leading-7 text-slate-700 dark:text-slate-300">
            {active.desc[language]}
          </p>
          <div className="mt-5 flex flex-wrap gap-2">
            {active.tags.map((tag) => (
              <span key={tag} className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-slate-600 dark:text-slate-300">
                {tag}
              </span>
            ))}
          </div>

          <div className="mt-6 rounded-2xl border border-white/10 bg-white/5 p-4">
            <p className="mb-2 inline-flex items-center gap-2 text-xs uppercase tracking-[0.24em] text-slate-500 dark:text-slate-400">
              <GitBranch size={13} />
              {zh ? "叙事价值" : "Narrative Value"}
            </p>
            <p className="text-sm leading-7 text-slate-700 dark:text-slate-300">
              {zh
                ? "这块内容可以在你正式项目还不多时，先把成长路径和工程思考表达出来。"
                : "This section communicates your growth path and engineering thinking even before many formal projects are ready."}
            </p>
          </div>
        </aside>
      </div>
    </div>
  );
}

export default GrowthTimeline;
