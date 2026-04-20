import { Code2, BookOpen, Target, Music, Sparkles, Clock } from "lucide-react";

const ICON_MAP = {
  code: Code2,
  book: BookOpen,
  target: Target,
  music: Music,
  sparkle: Sparkles,
};

function formatDate(dateString, language) {
  const date = new Date(dateString);
  if (Number.isNaN(date.getTime())) {
    return dateString;
  }
  if (language === "zh") {
    return `${date.getFullYear()} 年 ${date.getMonth() + 1} 月 ${date.getDate()} 日`;
  }
  return date.toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" });
}

function NowPage({ language, data }) {
  return (
    <div className="panel-card overflow-hidden p-5 sm:p-8 md:p-10">
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="section-title mb-2">Module F</p>
          <h3 className="text-2xl font-semibold text-slate-900 dark:text-white">
            {data.summary.title[language]}
          </h3>
          <p className="mt-4 max-w-3xl text-base leading-8 text-slate-700 dark:text-slate-300">
            {data.summary.subtitle[language]}
          </p>
        </div>
        <div className="inline-flex items-center gap-2 self-start rounded-full border border-cyan-400/20 bg-cyan-400/10 px-4 py-2 text-xs uppercase tracking-[0.24em] text-cyan-500 sm:self-end">
          <Clock size={14} />
          {language === "zh" ? `更新于 ${formatDate(data.updatedAt, language)}` : `Updated ${formatDate(data.updatedAt, language)}`}
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {data.items.map((item) => {
          const Icon = ICON_MAP[item.icon] ?? Sparkles;
          return (
            <article key={item.label.en} className="glass-panel p-5">
              <div className="flex items-center gap-3 text-cyan-500">
                <span className="flex h-9 w-9 items-center justify-center rounded-full border border-cyan-400/20 bg-cyan-400/10">
                  <Icon size={16} />
                </span>
                <span className="text-sm uppercase tracking-[0.24em]">{item.label[language]}</span>
              </div>
              <p className="mt-3 text-sm leading-7 text-slate-700 dark:text-slate-300">
                {item.text[language]}
              </p>
            </article>
          );
        })}
      </div>
    </div>
  );
}

export default NowPage;
