import { useMemo, useState } from "react";
import { Braces, ClipboardCheck, Compass, RotateCcw, Share2, TerminalSquare } from "lucide-react";

const QUESTIONS = [
  {
    id: "interface",
    text: { zh: "你更愿意先打磨哪种体验？", en: "Which experience would you polish first?" },
    options: [
      { label: { zh: "命令行效率", en: "CLI efficiency" }, value: "tool" },
      { label: { zh: "页面交互", en: "UI interaction" }, value: "product" },
      { label: { zh: "算法过程", en: "Algorithm flow" }, value: "algorithm" },
    ],
  },
  {
    id: "bug",
    text: { zh: "遇到线上 bug，你第一步通常是？", en: "When a production bug appears, what comes first?" },
    options: [
      { label: { zh: "复现并写最小用例", en: "Reproduce with a minimal case" }, value: "tool" },
      { label: { zh: "看用户路径", en: "Inspect the user path" }, value: "product" },
      { label: { zh: "分析边界条件", en: "Analyze edge cases" }, value: "algorithm" },
    ],
  },
  {
    id: "project",
    text: { zh: "你最想展示哪类个人项目？", en: "Which project type would you most like to show?" },
    options: [
      { label: { zh: "开发效率工具", en: "Developer tool" }, value: "tool" },
      { label: { zh: "完整 Web 产品", en: "Complete web product" }, value: "product" },
      { label: { zh: "可视化算法实验", en: "Algorithm lab" }, value: "algorithm" },
    ],
  },
  {
    id: "finish",
    text: { zh: "你判断一个功能完成的标准是？", en: "How do you decide a feature is done?" },
    options: [
      { label: { zh: "稳定、可复用、可维护", en: "Stable, reusable, maintainable" }, value: "tool" },
      { label: { zh: "用户能顺畅走完流程", en: "Users can complete the flow" }, value: "product" },
      { label: { zh: "复杂度和边界都讲得清", en: "Complexity and boundaries are clear" }, value: "algorithm" },
    ],
  },
];

const RESULTS = {
  tool: {
    icon: TerminalSquare,
    title: { zh: "工具型工程师", en: "Tooling-Oriented Builder" },
    desc: {
      zh: "你重视效率、稳定性和可复用性，适合做 CLI、自动化、开发者工具和工程化系统。",
      en: "You value efficiency, stability, and reuse. CLI tools, automation, developer tooling, and engineering systems fit you well.",
    },
  },
  product: {
    icon: ClipboardCheck,
    title: { zh: "产品型构建者", en: "Product-Minded Builder" },
    desc: {
      zh: "你关注真实使用路径和交互体验，适合做可落地的 Web 应用、仪表盘和完整产品原型。",
      en: "You care about real user flows and interaction quality. Web apps, dashboards, and complete product prototypes fit you well.",
    },
  },
  algorithm: {
    icon: Braces,
    title: { zh: "算法型探索者", en: "Algorithmic Explorer" },
    desc: {
      zh: "你习惯从模型、边界和复杂度理解问题，适合做算法可视化、训练系统和技术实验。",
      en: "You understand problems through models, boundaries, and complexity. Algorithm visualizers, training systems, and technical experiments fit you well.",
    },
  },
};

function DeveloperQuiz({ language }) {
  const [answers, setAnswers] = useState({});
  const zh = language === "zh";
  const completed = Object.keys(answers).length;

  const resultKey = useMemo(() => {
    const scores = { tool: 0, product: 0, algorithm: 0 };
    Object.values(answers).forEach((value) => {
      scores[value] += 1;
    });
    return Object.entries(scores).sort((a, b) => b[1] - a[1])[0][0];
  }, [answers]);

  const result = RESULTS[resultKey];
  const ResultIcon = result.icon;

  const setAnswer = (questionId, value) => {
    setAnswers((current) => ({ ...current, [questionId]: value }));
  };

  const copyResult = () => {
    const text = zh
      ? `我的开发者人格：${result.title.zh}。${result.desc.zh}`
      : `My developer profile: ${result.title.en}. ${result.desc.en}`;
    navigator.clipboard?.writeText(text).catch(() => {});
  };

  return (
    <div className="panel-card overflow-hidden p-5 sm:p-8 md:p-10">
      <div className="mb-6">
        <p className="section-title mb-2">Module O</p>
        <h3 className="text-2xl font-semibold text-slate-900 dark:text-white">
          {zh ? "代码人格测试" : "Developer Preference Quiz"}
        </h3>
        <p className="mt-4 max-w-3xl text-base leading-8 text-slate-700 dark:text-slate-300">
          {zh
            ? "一个轻量问答小游戏，用开发习惯生成你的偏好画像。适合放在作品集里增加分享感，但不会喧宾夺主。"
            : "A lightweight quiz that turns development habits into a preference profile. It adds shareable personality without taking over the portfolio."}
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1fr_18rem]">
        <div className="space-y-4">
          {QUESTIONS.map((question, index) => (
            <div key={question.id} className="glass-panel p-5">
              <div className="mb-4 flex items-start gap-3">
                <span className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-cyan-500 text-sm font-bold text-slate-950">
                  {index + 1}
                </span>
                <h4 className="text-lg font-semibold text-slate-900 dark:text-white">
                  {question.text[language]}
                </h4>
              </div>
              <div className="grid gap-2 md:grid-cols-3">
                {question.options.map((option) => {
                  const selected = answers[question.id] === option.value;
                  return (
                    <button
                      key={option.value}
                      className={`rounded-2xl border px-4 py-3 text-left text-sm font-semibold transition ${
                        selected
                          ? "border-cyan-400/50 bg-cyan-400/15 text-cyan-600 dark:text-cyan-200"
                          : "border-white/10 bg-white/5 text-slate-700 hover:border-cyan-400/30 dark:text-slate-300"
                      }`}
                      onClick={() => setAnswer(question.id, option.value)}
                      type="button"
                    >
                      {option.label[language]}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        <div className="space-y-5">
          <div className="glass-panel p-5">
            <p className="text-sm uppercase tracking-[0.28em] text-slate-500 dark:text-slate-400">
              {zh ? "完成度" : "Progress"}
            </p>
            <p className="mt-3 text-4xl font-bold text-slate-900 dark:text-white">
              {completed} / {QUESTIONS.length}
            </p>
            <div className="mt-4 h-2 overflow-hidden rounded-full bg-slate-300/25 dark:bg-slate-800/80">
              <div
                className="h-full rounded-full bg-cyan-500 transition-[width] duration-300"
                style={{ width: `${(completed / QUESTIONS.length) * 100}%` }}
              />
            </div>
          </div>

          <div className="glass-panel p-5">
            <p className="mb-3 inline-flex items-center gap-2 text-sm uppercase tracking-[0.28em] text-slate-500 dark:text-slate-400">
              <Compass size={14} />
              {zh ? "结果" : "Result"}
            </p>
            <div className="flex items-center gap-3 text-cyan-500">
              <ResultIcon size={24} />
              <h4 className="text-xl font-bold text-slate-900 dark:text-white">{result.title[language]}</h4>
            </div>
            <p className="mt-4 text-sm leading-7 text-slate-700 dark:text-slate-300">
              {completed === 0
                ? zh
                  ? "先回答问题，结果会实时变化。"
                  : "Answer questions and the result will update live."
                : result.desc[language]}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <button className="secondary-button px-3 py-2 text-xs" onClick={() => setAnswers({})} type="button">
              <RotateCcw size={15} />
              {zh ? "重置" : "Reset"}
            </button>
            <button className="primary-button px-3 py-2 text-xs" disabled={completed === 0} onClick={copyResult} type="button">
              <Share2 size={15} />
              {zh ? "复制结果" : "Copy"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DeveloperQuiz;
