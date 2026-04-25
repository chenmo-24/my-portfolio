import { useMemo, useState } from "react";
import { Bug, CheckCircle2, Lightbulb, RotateCcw, XCircle } from "lucide-react";

const CHALLENGES = [
  {
    id: "binary-search",
    title: { zh: "二分边界", en: "Binary Search Boundary" },
    lang: "JavaScript",
    buggyLine: 4,
    code: [
      "function lowerBound(nums, target) {",
      "  let left = 0;",
      "  let right = nums.length;",
      "  while (left <= right) {",
      "    const mid = Math.floor((left + right) / 2);",
      "    if (nums[mid] < target) left = mid + 1;",
      "    else right = mid;",
      "  }",
      "  return left;",
      "}",
    ],
    explanation: {
      zh: "right 使用的是开区间 nums.length，循环条件应该是 left < right。当前写成 <= 会让 mid 访问到 nums.length。",
      en: "right is an open boundary at nums.length, so the loop should use left < right. With <=, mid can read nums[nums.length].",
    },
  },
  {
    id: "react-state",
    title: { zh: "React 状态更新", en: "React State Update" },
    lang: "React",
    buggyLine: 3,
    code: [
      "function addTodo(text) {",
      "  todos.push({ id: Date.now(), text });",
      "  setTodos(todos);",
      "}",
    ],
    explanation: {
      zh: "这里原地修改了 todos 数组，React 可能拿到同一个引用。应该创建新数组：setTodos([...todos, item])。",
      en: "This mutates the todos array in place, so React may receive the same reference. Create a new array instead.",
    },
  },
  {
    id: "python-default",
    title: { zh: "Python 默认参数", en: "Python Default Argument" },
    lang: "Python",
    buggyLine: 1,
    code: [
      "def append_item(value, bucket=[]):",
      "    bucket.append(value)",
      "    return bucket",
    ],
    explanation: {
      zh: "可变默认参数会在多次调用之间共享。应使用 None 作为默认值，并在函数内部创建新列表。",
      en: "Mutable default arguments are shared between calls. Use None as the default and create the list inside the function.",
    },
  },
];

function BugHunt({ language }) {
  const [challengeId, setChallengeId] = useState(CHALLENGES[0].id);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [score, setScore] = useState(0);
  const zh = language === "zh";

  const challenge = useMemo(
    () => CHALLENGES.find((item) => item.id === challengeId) ?? CHALLENGES[0],
    [challengeId]
  );

  const selectedLine = selectedAnswers[challenge.id] ?? null;
  const result =
    selectedLine == null
      ? "idle"
      : selectedLine === challenge.buggyLine
        ? "correct"
        : "wrong";

  const chooseLine = (lineNumber) => {
    if (selectedAnswers[challenge.id]) return;
    setSelectedAnswers((current) => ({ ...current, [challenge.id]: lineNumber }));
    if (lineNumber === challenge.buggyLine) {
      setScore((value) => value + 1);
    }
  };

  const switchChallenge = (id) => {
    setChallengeId(id);
  };

  const reset = () => {
    setChallengeId(CHALLENGES[0].id);
    setSelectedAnswers({});
    setScore(0);
  };

  return (
    <div className="panel-card overflow-hidden p-5 sm:p-8 md:p-10">
      <div className="mb-6">
        <p className="section-title mb-2">Module N</p>
        <h3 className="text-2xl font-semibold text-slate-900 dark:text-white">
          {zh ? "Bug Hunt 调试挑战" : "Bug Hunt Debug Challenge"}
        </h3>
        <p className="mt-4 max-w-3xl text-base leading-8 text-slate-700 dark:text-slate-300">
          {zh
            ? "阅读代码片段，点出最关键的 bug 行。它比打字挑战更偏代码理解，也能展示边界条件和工程细节意识。"
            : "Read the snippet and click the most important buggy line. It tests code understanding, edge cases, and engineering detail."}
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1fr_18rem]">
        <div className="glass-panel overflow-hidden">
          <div className="flex flex-col gap-3 border-b border-white/10 bg-white/5 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.28em] text-cyan-500">{challenge.lang}</p>
              <h4 className="mt-1 text-xl font-semibold text-slate-900 dark:text-white">
                {challenge.title[language]}
              </h4>
            </div>
            <div className="inline-flex items-center gap-2 text-sm text-slate-600 dark:text-slate-300">
              <Bug size={16} className="text-rose-400" />
              {zh ? "点击有问题的行" : "Click the buggy line"}
            </div>
          </div>

          <div className="bg-slate-950/90 p-4 font-mono text-sm leading-7 text-slate-200">
            {challenge.code.map((line, index) => {
              const lineNumber = index + 1;
              const isSelected = selectedLine === lineNumber;
              const isAnswer = selectedAnswers[challenge.id] && challenge.buggyLine === lineNumber;
              const isWrong = isSelected && result === "wrong";

              return (
                <button
                  key={`${challenge.id}-${lineNumber}`}
                  className={`grid w-full grid-cols-[2.5rem_1fr] rounded-lg px-2 py-1 text-left transition ${
                    isAnswer
                      ? "bg-emerald-400/20 text-emerald-100"
                      : isWrong
                        ? "bg-rose-500/20 text-rose-100"
                        : "hover:bg-white/10"
                  }`}
                  onClick={() => chooseLine(lineNumber)}
                  type="button"
                >
                  <span className="select-none text-slate-500">{lineNumber}</span>
                  <span className="whitespace-pre-wrap break-all">{line}</span>
                </button>
              );
            })}
          </div>

          <div className="border-t border-white/10 bg-white/5 px-5 py-4">
            {result === "idle" ? (
              <p className="text-sm text-slate-600 dark:text-slate-300">
                {zh ? "先读代码，不急着点。真正的 bug 通常藏在边界条件里。" : "Read first. The real bug usually hides in the boundary condition."}
              </p>
            ) : (
              <div className="flex items-start gap-3">
                {result === "correct" ? (
                  <CheckCircle2 className="mt-1 flex-shrink-0 text-emerald-400" size={18} />
                ) : (
                  <XCircle className="mt-1 flex-shrink-0 text-rose-400" size={18} />
                )}
                <p className="text-sm leading-7 text-slate-700 dark:text-slate-300">
                  {challenge.explanation[language]}
                </p>
              </div>
            )}
          </div>
        </div>

        <div className="space-y-5">
          <div className="glass-panel p-5">
            <p className="text-sm uppercase tracking-[0.28em] text-slate-500 dark:text-slate-400">
              {zh ? "得分" : "Score"}
            </p>
            <p className="mt-3 text-4xl font-bold text-slate-900 dark:text-white">
              {score} / {CHALLENGES.length}
            </p>
          </div>

          <div className="glass-panel p-5">
            <p className="mb-3 inline-flex items-center gap-2 text-sm uppercase tracking-[0.28em] text-slate-500 dark:text-slate-400">
              <Lightbulb size={14} />
              {zh ? "题目" : "Cases"}
            </p>
            <div className="space-y-2">
              {CHALLENGES.map((item) => (
                <button
                  key={item.id}
                  className={`w-full rounded-full px-4 py-2 text-left text-sm font-semibold transition ${
                    challengeId === item.id
                      ? "bg-cyan-500 text-slate-950"
                      : "border border-white/10 bg-white/5 text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white"
                  }`}
                  onClick={() => switchChallenge(item.id)}
                  type="button"
                >
                  {item.title[language]}
                </button>
              ))}
            </div>
          </div>

          <button className="secondary-button w-full" onClick={reset} type="button">
            <RotateCcw size={16} />
            {zh ? "重新挑战" : "Reset Challenge"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default BugHunt;
