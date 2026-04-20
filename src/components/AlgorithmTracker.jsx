import { BarChart3, BookOpen, Target } from "lucide-react";

function percentage(completed, total) {
  if (!total) {
    return 0;
  }

  return Math.round((completed / total) * 100);
}

function ProgressBar({ completed, total }) {
  const progress = percentage(completed, total);

  return (
    <div>
      <div className="mb-2 flex items-center justify-between gap-4 text-sm">
        <span className="text-slate-600 dark:text-slate-300">
          {completed} / {total}
        </span>
        <span className="font-semibold text-cyan-500">{progress}%</span>
      </div>
      <div className="h-3 overflow-hidden rounded-full bg-slate-300/25 dark:bg-slate-800/80">
        <div
          className="h-full rounded-full bg-gradient-to-r from-cyan-500 via-sky-400 to-violet-500 transition-[width] duration-500"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
}

function AlgorithmTracker({ language, progress }) {
  const totalCompleted = progress.tracks.reduce((sum, track) => sum + track.completed, 0);
  const totalQuestions = progress.tracks.reduce((sum, track) => sum + track.total, 0);
  const totalPercent = percentage(totalCompleted, totalQuestions);

  return (
    <div className="panel-card overflow-hidden p-5 sm:p-8 md:p-10">
      <div className="mb-6">
        <p className="section-title mb-2">Module D</p>
        <h3 className="text-2xl font-semibold text-slate-900 dark:text-white">
          {progress.summary.title[language]}
        </h3>
        <p className="mt-4 max-w-3xl text-base leading-8 text-slate-700 dark:text-slate-300">
          {progress.summary.subtitle[language]}
        </p>
      </div>

      <div className="mb-8 grid gap-4 sm:grid-cols-2 md:grid-cols-3">
        <div className="glass-panel p-5">
          <div className="flex items-center gap-3 text-cyan-500">
            <BarChart3 size={18} />
            <span className="text-sm uppercase tracking-[0.24em]">
              {language === "zh" ? "总进度" : "Overall Progress"}
            </span>
          </div>
          <p className="mt-3 text-3xl font-bold text-slate-900 dark:text-white">{totalPercent}%</p>
          <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
            {language === "zh"
              ? `已完成 ${totalCompleted} / ${totalQuestions}`
              : `Completed ${totalCompleted} / ${totalQuestions}`}
          </p>
        </div>

        <div className="glass-panel p-5">
          <div className="flex items-center gap-3 text-violet-500">
            <BookOpen size={18} />
            <span className="text-sm uppercase tracking-[0.24em]">
              {language === "zh" ? "当前策略" : "Current Strategy"}
            </span>
          </div>
          <p className="mt-3 text-base leading-7 text-slate-700 dark:text-slate-300">
            {language === "zh"
              ? "先稳定高频题型，再补模板和专题，保证“做过”逐步变成“能独立写出”。"
              : "First stabilize high-frequency patterns, then fill in templates and topics until “I have seen it” becomes “I can write it independently.”"}
          </p>
        </div>

        <div className="glass-panel p-5">
          <div className="flex items-center gap-3 text-emerald-500">
            <Target size={18} />
            <span className="text-sm uppercase tracking-[0.24em]">
              {language === "zh" ? "下一目标" : "Next Goal"}
            </span>
          </div>
          <p className="mt-3 text-base leading-7 text-slate-700 dark:text-slate-300">
            {language === "zh"
              ? "先把 Hot 100 推到 50+，再把 AcWing 基础题的搜索、图论和 DP 补齐到可复现。"
              : "Push Hot 100 past 50 first, then make AcWing search, graph, and DP topics reproducible from memory."}
          </p>
        </div>
      </div>

      <div className="grid gap-6 xl:grid-cols-2">
        {progress.tracks.map((track) => (
          <article key={track.title[language]} className="glass-panel p-6">
            <div className="mb-5 flex flex-wrap items-start justify-between gap-3">
              <div>
                <h4 className="text-xl font-semibold text-slate-900 dark:text-white">
                  {track.title[language]}
                </h4>
                <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-300">
                  {track.note[language]}
                </p>
              </div>
              <span className="rounded-full border border-cyan-400/20 bg-cyan-400/10 px-3 py-1 text-xs uppercase tracking-[0.28em] text-cyan-500">
                {track.badge[language]}
              </span>
            </div>

            <ProgressBar completed={track.completed} total={track.total} />

            <div className="mt-6 space-y-4">
              {track.details.map((detail) => {
                const progressValue = percentage(detail.completed, detail.total);

                return (
                  <div key={detail.label[language]} className="rounded-2xl border border-white/10 bg-white/5 p-4">
                    <div className="mb-2 flex items-center justify-between gap-4">
                      <p className="font-medium text-slate-900 dark:text-white">{detail.label[language]}</p>
                      <span className="text-sm text-slate-600 dark:text-slate-300">
                        {detail.completed} / {detail.total}
                      </span>
                    </div>
                    <div className="h-2 overflow-hidden rounded-full bg-slate-300/25 dark:bg-slate-800/70">
                      <div
                        className="h-full rounded-full bg-cyan-500 transition-[width] duration-500"
                        style={{ width: `${progressValue}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}

export default AlgorithmTracker;
