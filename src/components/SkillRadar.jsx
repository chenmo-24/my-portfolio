import { Radar } from "lucide-react";

const CENTER = 150;
const RADIUS = 110;
const MAX_VALUE = 10;
const LEVELS = 4;

function axisPoint(index, total, radius) {
  const angle = (Math.PI * 2 * index) / total - Math.PI / 2;
  return {
    x: CENTER + Math.cos(angle) * radius,
    y: CENTER + Math.sin(angle) * radius,
  };
}

function polygonPoints(values, axes) {
  return axes
    .map((_, index) => {
      const ratio = Math.min(values[index] / MAX_VALUE, 1);
      const p = axisPoint(index, axes.length, RADIUS * ratio);
      return `${p.x.toFixed(2)},${p.y.toFixed(2)}`;
    })
    .join(" ");
}

function gridPolygon(level, total) {
  const r = (RADIUS * level) / LEVELS;
  return Array.from({ length: total })
    .map((_, index) => {
      const p = axisPoint(index, total, r);
      return `${p.x.toFixed(2)},${p.y.toFixed(2)}`;
    })
    .join(" ");
}

function SkillRadar({ language, data }) {
  const axes = data.axes;
  const values = axes.map((axis) => axis.value);
  const dataPolygon = polygonPoints(values, axes);

  return (
    <div className="panel-card overflow-hidden p-5 sm:p-8 md:p-10">
      <div className="mb-6">
        <p className="section-title mb-2">Module E</p>
        <h3 className="text-2xl font-semibold text-slate-900 dark:text-white">
          {data.summary.title[language]}
        </h3>
        <p className="mt-4 max-w-3xl text-base leading-8 text-slate-700 dark:text-slate-300">
          {data.summary.subtitle[language]}
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
        <div className="glass-panel flex items-center justify-center p-4 sm:p-6">
          <svg
            viewBox="0 0 300 300"
            role="img"
            aria-label={language === "zh" ? "技能雷达图" : "Skill radar chart"}
            className="h-auto w-full max-w-[22rem]"
          >
            <defs>
              <radialGradient id="radar-fill" cx="50%" cy="50%" r="55%">
                <stop offset="0%" stopColor="rgba(34, 211, 238, 0.55)" />
                <stop offset="100%" stopColor="rgba(139, 92, 246, 0.25)" />
              </radialGradient>
            </defs>

            {Array.from({ length: LEVELS }).map((_, level) => (
              <polygon
                key={`grid-${level}`}
                points={gridPolygon(level + 1, axes.length)}
                fill="none"
                stroke="rgba(148, 163, 184, 0.25)"
                strokeDasharray={level === LEVELS - 1 ? "0" : "3 4"}
              />
            ))}

            {axes.map((_, index) => {
              const end = axisPoint(index, axes.length, RADIUS);
              return (
                <line
                  key={`axis-${index}`}
                  x1={CENTER}
                  y1={CENTER}
                  x2={end.x}
                  y2={end.y}
                  stroke="rgba(148, 163, 184, 0.25)"
                />
              );
            })}

            <polygon
              points={dataPolygon}
              fill="url(#radar-fill)"
              stroke="rgba(34, 211, 238, 0.9)"
              strokeWidth="2"
            />

            {axes.map((axis, index) => {
              const ratio = Math.min(values[index] / MAX_VALUE, 1);
              const p = axisPoint(index, axes.length, RADIUS * ratio);
              return (
                <circle
                  key={`dot-${index}`}
                  cx={p.x}
                  cy={p.y}
                  r="4"
                  fill="rgb(34, 211, 238)"
                  stroke="rgba(15, 23, 42, 0.85)"
                  strokeWidth="1.5"
                />
              );
            })}

            {axes.map((axis, index) => {
              const labelPoint = axisPoint(index, axes.length, RADIUS + 22);
              return (
                <text
                  key={`label-${index}`}
                  x={labelPoint.x}
                  y={labelPoint.y}
                  textAnchor="middle"
                  dominantBaseline="middle"
                  fontSize="11"
                  fill="currentColor"
                  className="fill-slate-600 dark:fill-slate-300"
                >
                  {axis.name[language]}
                </text>
              );
            })}
          </svg>
        </div>

        <div className="space-y-5">
          <div className="glass-panel p-5">
            <div className="mb-4 flex items-center gap-3 text-cyan-500">
              <Radar size={18} />
              <span className="text-sm uppercase tracking-[0.24em]">
                {language === "zh" ? "维度水平" : "Axis Levels"}
              </span>
            </div>
            <ul className="space-y-3">
              {axes.map((axis) => (
                <li key={axis.name.en}>
                  <div className="mb-1 flex items-center justify-between text-sm">
                    <span className="text-slate-700 dark:text-slate-200">{axis.name[language]}</span>
                    <span className="font-semibold text-cyan-500">{axis.value} / 10</span>
                  </div>
                  <div className="h-1.5 overflow-hidden rounded-full bg-slate-300/25 dark:bg-slate-800/70">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-cyan-500 via-sky-400 to-violet-500"
                      style={{ width: `${(axis.value / MAX_VALUE) * 100}%` }}
                    />
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <div className="glass-panel p-5">
            <p className="text-sm uppercase tracking-[0.28em] text-slate-500 dark:text-slate-400">
              {language === "zh" ? "自评补充" : "Self-Assessment Notes"}
            </p>
            <ul className="mt-4 space-y-3 text-sm leading-7 text-slate-700 dark:text-slate-300">
              {data.notes[language].map((line) => (
                <li key={line} className="flex gap-2">
                  <span className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-cyan-400" />
                  <span>{line}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SkillRadar;
