import { useEffect, useMemo, useState } from "react";
import { Award, RotateCcw, ShieldCheck, Sparkles } from "lucide-react";
import { achievementGroups, achievements } from "../data/achievements";
import { getProgress, resetProgress, subscribeProgress } from "../utils/progressStore";

function formatRecent(entry, language) {
  const achievement = achievements.find((item) => item.id === entry.id);
  if (achievement) return achievement.title[language];

  const labels = {
    quest: { zh: "完成学习节点", en: "Quest completed" },
    arena: { zh: "完成算法挑战", en: "Arena attempt" },
    debug: { zh: "完成调试案例", en: "Debug case solved" },
  };
  return labels[entry.type]?.[language] ?? entry.id;
}

function AchievementPassport({ language }) {
  const [progress, setProgress] = useState(() => getProgress());
  const zh = language === "zh";

  useEffect(() => subscribeProgress(setProgress), []);

  const unlocked = useMemo(() => new Set(progress.achievements), [progress.achievements]);
  const total = achievements.length;
  const unlockedCount = unlocked.size;
  const completion = total ? Math.round((unlockedCount / total) * 100) : 0;

  const handleReset = () => {
    const ok = window.confirm(
      zh
        ? "确定要重置本浏览器里的 Fun Zone 进度吗？"
        : "Reset Fun Zone progress stored in this browser?"
    );
    if (ok) setProgress(resetProgress());
  };

  return (
    <div className="panel-card overflow-hidden p-5 sm:p-8 md:p-10">
      <div className="grid gap-6 lg:grid-cols-[1fr_18rem]">
        <div className="min-w-0">
          <div className="mb-6">
            <p className="section-title mb-2">Module Passport</p>
            <h3 className="text-2xl font-semibold text-slate-900 dark:text-white">
              {zh ? "成就护照" : "Achievement Passport"}
            </h3>
            <p className="mt-4 max-w-3xl text-base leading-8 text-slate-700 dark:text-slate-300">
              {zh
                ? "把 Fun Zone 的探索、算法、调试、项目和小游戏串成一张本地进度护照。所有记录只保存在当前浏览器。"
                : "A local progress passport that connects Fun Zone exploration, algorithms, debugging, projects, and mini-games. Everything stays in this browser."}
            </p>
          </div>

          <div className="grid gap-3 sm:grid-cols-3">
            <div className="glass-panel p-4">
              <p className="text-sm uppercase tracking-[0.24em] text-slate-500 dark:text-slate-400">
                {zh ? "解锁" : "Unlocked"}
              </p>
              <p className="mt-3 text-3xl font-bold text-slate-900 dark:text-white">
                {unlockedCount} / {total}
              </p>
            </div>
            <div className="glass-panel p-4">
              <p className="text-sm uppercase tracking-[0.24em] text-slate-500 dark:text-slate-400">
                {zh ? "完成度" : "Completion"}
              </p>
              <p className="mt-3 text-3xl font-bold text-cyan-500">{completion}%</p>
            </div>
            <div className="glass-panel p-4">
              <p className="text-sm uppercase tracking-[0.24em] text-slate-500 dark:text-slate-400">
                {zh ? "本地记录" : "Storage"}
              </p>
              <p className="mt-3 inline-flex items-center gap-2 text-sm font-semibold text-slate-700 dark:text-slate-200">
                <ShieldCheck size={18} className="text-emerald-400" />
                localStorage
              </p>
            </div>
          </div>
        </div>

        <div className="glass-panel p-5">
          <div className="mb-4 flex items-center justify-between gap-3">
            <p className="inline-flex items-center gap-2 text-sm uppercase tracking-[0.24em] text-slate-500 dark:text-slate-400">
              <Sparkles size={15} />
              {zh ? "最近" : "Recent"}
            </p>
            <button className="secondary-button px-3 py-2 text-xs" onClick={handleReset} type="button">
              <RotateCcw size={14} />
              {zh ? "重置" : "Reset"}
            </button>
          </div>
          <div className="space-y-2">
            {progress.recent.length ? (
              progress.recent.slice(0, 5).map((entry) => (
                <div
                  className="rounded-2xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-slate-700 dark:text-slate-300"
                  key={`${entry.type}-${entry.id}-${entry.at}`}
                >
                  {formatRecent(entry, language)}
                </div>
              ))
            ) : (
              <p className="text-sm leading-7 text-slate-600 dark:text-slate-300">
                {zh ? "开始探索后，这里会出现最近解锁记录。" : "Recent unlocks will appear here as you explore."}
              </p>
            )}
          </div>
        </div>
      </div>

      <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {achievementGroups.map((group) => (
          <div className="glass-panel p-5" key={group.id}>
            <h4 className="mb-4 inline-flex items-center gap-2 text-base font-semibold text-slate-900 dark:text-white">
              <Award size={18} className="text-cyan-500" />
              {group.label[language]}
            </h4>
            <div className="space-y-3">
              {group.items.map((item) => {
                const isUnlocked = unlocked.has(item.id);
                return (
                  <div
                    className={`rounded-2xl border px-4 py-3 transition ${
                      isUnlocked
                        ? "border-cyan-400/40 bg-cyan-400/10"
                        : "border-white/10 bg-white/5 opacity-70"
                    }`}
                    key={item.id}
                  >
                    <div className="flex min-w-0 items-start justify-between gap-3">
                      <div className="min-w-0">
                        <p className="font-semibold text-slate-900 dark:text-white">{item.title[language]}</p>
                        <p className="mt-1 text-sm leading-6 text-slate-600 dark:text-slate-300">
                          {item.desc[language]}
                        </p>
                      </div>
                      <span
                        className={`mt-1 h-3 w-3 flex-shrink-0 rounded-full ${
                          isUnlocked ? "bg-cyan-400 shadow-[0_0_14px_rgba(34,211,238,0.7)]" : "bg-slate-400/40"
                        }`}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AchievementPassport;
