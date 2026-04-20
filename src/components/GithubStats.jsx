import { Github, Star, GitFork, Users, Flame, TrendingUp } from "lucide-react";
import { useMemo } from "react";

const WEEKS = 52;
const DAYS = 7;

function formatDateKey(date) {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

function commitsToLevel(commits) {
  if (!commits) return 0;
  if (commits >= 10) return 4;
  if (commits >= 7) return 3;
  if (commits >= 4) return 2;
  return 1;
}

function buildHeatmap(contributionDays = {}) {
  const today = new Date();
  const base = new Date(today);
  base.setDate(base.getDate() - (WEEKS * DAYS - 1));
  const startDayOffset = base.getDay();
  const grid = [];

  for (let d = 0; d < WEEKS * DAYS; d += 1) {
    const date = new Date(base);
    date.setDate(base.getDate() + d);
    const commits = contributionDays[formatDateKey(date)] ?? 0;
    grid.push({ date, level: commitsToLevel(commits), commits });
  }

  const columns = [];
  for (let col = 0; col < WEEKS; col += 1) {
    const column = [];
    for (let row = 0; row < DAYS; row += 1) {
      const idx = col * DAYS + row;
      if (idx < grid.length) column.push(grid[idx]);
    }
    columns.push(column);
  }
  return { columns, startDayOffset };
}

const LEVEL_CLASS = [
  "bg-slate-300/30 dark:bg-slate-800/50",
  "bg-cyan-400/30",
  "bg-cyan-400/55",
  "bg-cyan-500/80",
  "bg-cyan-400 shadow-[0_0_6px_rgba(34,211,238,0.55)]",
];

function GithubStats({ language, data }) {
  const heatmap = useMemo(() => buildHeatmap(data.contributionDays), [data.contributionDays]);
  const { stats, languages, pinnedRepos } = data;
  const langTotal = languages.reduce((sum, lang) => sum + lang.value, 0) || 1;

  return (
    <div className="panel-card overflow-hidden p-5 sm:p-8 md:p-10">
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="section-title mb-2">Module G</p>
          <h3 className="text-2xl font-semibold text-slate-900 dark:text-white">
            {data.summary.title[language]}
          </h3>
          <p className="mt-4 max-w-3xl text-base leading-8 text-slate-700 dark:text-slate-300">
            {data.summary.subtitle[language]}
          </p>
        </div>
        <a
          className="secondary-button self-start sm:self-end"
          href={`https://github.com/${data.username}`}
          rel="noreferrer"
          target="_blank"
        >
          <Github size={16} />
          @{data.username}
        </a>
      </div>

      <div className="mb-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[
          { icon: Star, color: "text-amber-400", label: { zh: "获得星标", en: "Stars" }, value: stats.totalStars },
          { icon: GitFork, color: "text-cyan-400", label: { zh: "公共仓库", en: "Public Repos" }, value: stats.publicRepos },
          { icon: Users, color: "text-violet-400", label: { zh: "Followers", en: "Followers" }, value: stats.followers },
          { icon: Flame, color: "text-orange-400", label: { zh: "当前连击", en: "Current Streak" }, value: `${stats.currentStreak}d` },
        ].map((item) => {
          const Icon = item.icon;
          return (
            <div key={item.label.en} className="glass-panel p-5">
              <div className={`flex items-center gap-3 ${item.color}`}>
                <Icon size={18} />
                <span className="text-sm uppercase tracking-[0.24em]">{item.label[language]}</span>
              </div>
              <p className="mt-3 text-3xl font-bold text-slate-900 dark:text-white">{item.value}</p>
            </div>
          );
        })}
      </div>

      <div className="glass-panel mb-6 p-5">
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3 text-emerald-400">
            <TrendingUp size={18} />
            <span className="text-sm uppercase tracking-[0.24em]">
              {language === "zh" ? "近一年贡献" : "Contributions (52 weeks)"}
            </span>
          </div>
          <span className="text-sm text-slate-600 dark:text-slate-300">
            {language === "zh"
              ? `约 ${stats.contributionsYear} 次提交 · 最长连击 ${stats.longestStreak} 天`
              : `${stats.contributionsYear} commits · longest streak ${stats.longestStreak}d`}
          </span>
        </div>

        <div className="overflow-x-auto">
          <div className="flex min-w-max gap-[3px]">
            {heatmap.columns.map((column, colIndex) => (
              <div key={`col-${colIndex}`} className="flex flex-col gap-[3px]">
                {column.map((cell, rowIndex) => (
                  <span
                    key={`cell-${colIndex}-${rowIndex}`}
                    className={`h-3 w-3 rounded-[3px] ${LEVEL_CLASS[cell.level]}`}
                    title={`${formatDateKey(cell.date)} · ${cell.commits || 0} ${language === "zh" ? "次提交" : "commits"}`}
                  />
                ))}
              </div>
            ))}
          </div>
        </div>

        <div className="mt-4 flex items-center justify-end gap-2 text-xs text-slate-500 dark:text-slate-400">
          <span>{language === "zh" ? "更少" : "Less"}</span>
          {LEVEL_CLASS.map((cls, idx) => (
            <span key={idx} className={`h-3 w-3 rounded-[3px] ${cls}`} />
          ))}
          <span>{language === "zh" ? "更多" : "More"}</span>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-[minmax(0,0.62fr)_minmax(0,0.38fr)]">
        <div className="space-y-3">
          <p className="text-sm uppercase tracking-[0.28em] text-slate-500 dark:text-slate-400">
            {language === "zh" ? "置顶仓库" : "Pinned Repositories"}
          </p>
          {pinnedRepos.map((repo) => (
            <a
              key={repo.name}
              href={repo.url}
              rel="noreferrer"
              target="_blank"
              className="glass-panel block p-5 transition hover:-translate-y-0.5 hover:border-cyan-400/30"
            >
              <div className="flex items-center justify-between gap-3">
                <span className="font-mono text-base font-semibold text-cyan-500">
                  {repo.name}
                </span>
                <span className="inline-flex items-center gap-1 text-xs text-slate-500 dark:text-slate-400">
                  <Star size={12} /> {repo.stars}
                </span>
              </div>
              <p className="mt-2 text-sm leading-7 text-slate-700 dark:text-slate-300">
                {repo.description[language]}
              </p>
              <p className="mt-3 inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400">
                <span className="h-2 w-2 rounded-full bg-cyan-400" />
                {repo.language}
              </p>
            </a>
          ))}
        </div>

        <div className="glass-panel p-5">
          <p className="mb-4 text-sm uppercase tracking-[0.28em] text-slate-500 dark:text-slate-400">
            {language === "zh" ? "语言构成" : "Language Usage"}
          </p>
          <div className="mb-4 flex h-2.5 w-full overflow-hidden rounded-full">
            {languages.map((lang) => (
              <span
                key={lang.name}
                style={{ width: `${(lang.value / langTotal) * 100}%`, backgroundColor: lang.color }}
              />
            ))}
          </div>
          <ul className="space-y-2">
            {languages.map((lang) => (
              <li key={lang.name} className="flex items-center justify-between text-sm">
                <span className="inline-flex items-center gap-2 text-slate-700 dark:text-slate-200">
                  <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: lang.color }} />
                  {lang.name}
                </span>
                <span className="text-slate-500 dark:text-slate-400">
                  {Math.round((lang.value / langTotal) * 100)}%
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default GithubStats;
