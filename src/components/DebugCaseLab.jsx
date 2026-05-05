import { useMemo, useState } from "react";
import { CheckCircle2, FileWarning, Lightbulb, RotateCcw, XCircle } from "lucide-react";
import { debugCases } from "../data/debugCases";
import { completeDebugCase, unlockAchievement } from "../utils/progressStore";

function DebugCaseLab({ language }) {
  const [caseId, setCaseId] = useState(debugCases[0].id);
  const [choiceId, setChoiceId] = useState("");
  const zh = language === "zh";
  const caseItem = debugCases.find((item) => item.id === caseId) ?? debugCases[0];
  const selectedChoice = useMemo(
    () => caseItem.choices.find((choice) => choice.id === choiceId),
    [caseItem, choiceId]
  );

  const choose = (choice) => {
    setChoiceId(choice.id);
    if (choice.correct) {
      completeDebugCase(caseItem.id);
      unlockAchievement("complete-debug-case");
    }
  };

  const resetCase = (nextCaseId) => {
    setCaseId(nextCaseId);
    setChoiceId("");
  };

  return (
    <div className="panel-card overflow-hidden p-5 sm:p-8 md:p-10">
      <div className="mb-6">
        <p className="section-title mb-2">Module Debug Lab</p>
        <h3 className="text-2xl font-semibold text-slate-900 dark:text-white">
          {zh ? "调试案例实验室" : "Debug Case Lab"}
        </h3>
        <p className="mt-4 max-w-3xl text-base leading-8 text-slate-700 dark:text-slate-300">
          {zh
            ? "阅读小型故障报告，判断根因和修复方式，再查看解释。"
            : "Read small issue reports, identify the root cause and fix, then inspect the explanation."}
        </p>
      </div>

      <div className="mb-6 grid gap-3 md:grid-cols-3">
        {debugCases.map((item) => (
          <button
            className={`rounded-2xl border p-4 text-left transition ${
              item.id === caseItem.id
                ? "border-cyan-400/50 bg-cyan-400/15"
                : "border-white/10 bg-white/5 hover:border-cyan-400/30"
            }`}
            key={item.id}
            onClick={() => resetCase(item.id)}
            type="button"
          >
            <span className="inline-flex items-center gap-2 text-sm font-semibold text-slate-900 dark:text-white">
              <FileWarning size={16} className="text-cyan-500" />
              {item.title[language]}
            </span>
            <span className="mt-2 block text-sm leading-6 text-slate-600 dark:text-slate-300">
              {item.desc[language]}
            </span>
          </button>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-[1fr_20rem]">
        <div className="min-w-0 space-y-5">
          <section className="glass-panel p-5">
            <p className="mb-2 text-xs uppercase tracking-[0.24em] text-slate-500 dark:text-slate-400">
              {zh ? "故障报告" : "Issue Report"}
            </p>
            <h4 className="text-xl font-bold text-slate-900 dark:text-white">{caseItem.title[language]}</h4>
            <p className="mt-3 text-sm leading-7 text-slate-700 dark:text-slate-300">
              {caseItem.issue[language]}
            </p>
          </section>

          <section className="overflow-hidden rounded-3xl border border-white/10 bg-slate-950/90 shadow-2xl">
            <div className="flex items-center justify-between border-b border-white/10 bg-white/5 px-5 py-3">
              <span className="font-mono text-xs uppercase tracking-[0.24em] text-slate-400">case.jsx</span>
              <button className="inline-flex items-center gap-2 text-xs text-slate-400" onClick={() => setChoiceId("")} type="button">
                <RotateCcw size={13} />
                {zh ? "重答" : "Retry"}
              </button>
            </div>
            <pre className="overflow-x-auto p-5 text-sm leading-7 text-slate-200">
              <code>{caseItem.code}</code>
            </pre>
          </section>
        </div>

        <div className="space-y-5">
          <div className="glass-panel p-5">
            <p className="mb-3 text-sm uppercase tracking-[0.24em] text-slate-500 dark:text-slate-400">
              {zh ? "选择修复" : "Choose Fix"}
            </p>
            <div className="space-y-2">
              {caseItem.choices.map((choice) => {
                const selected = choice.id === choiceId;
                return (
                  <button
                    className={`flex w-full items-start gap-3 rounded-2xl border px-4 py-3 text-left text-sm font-semibold transition ${
                      selected
                        ? choice.correct
                          ? "border-emerald-400/50 bg-emerald-400/15 text-emerald-700 dark:text-emerald-100"
                          : "border-rose-400/50 bg-rose-400/15 text-rose-700 dark:text-rose-100"
                        : "border-white/10 bg-white/5 text-slate-700 hover:border-cyan-400/30 dark:text-slate-300"
                    }`}
                    key={choice.id}
                    onClick={() => choose(choice)}
                    type="button"
                  >
                    {selected ? (
                      choice.correct ? <CheckCircle2 size={17} /> : <XCircle size={17} />
                    ) : (
                      <span className="mt-1 h-3 w-3 rounded-full border border-current" />
                    )}
                    <span>{choice.label[language]}</span>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="glass-panel p-5">
            <p className="mb-3 inline-flex items-center gap-2 text-sm uppercase tracking-[0.24em] text-slate-500 dark:text-slate-400">
              <Lightbulb size={15} />
              {zh ? "解释" : "Explanation"}
            </p>
            {selectedChoice ? (
              <>
                <p className="text-sm leading-7 text-slate-700 dark:text-slate-300">
                  {selectedChoice.correct
                    ? caseItem.explanation[language]
                    : zh
                      ? "这个选择没有解决根因。再看一次代码里的状态、引用或身份问题。"
                      : "That choice does not address the root cause. Check the state, reference, or identity issue again."}
                </p>
                {selectedChoice.correct ? (
                  <pre className="mt-4 overflow-x-auto rounded-2xl bg-slate-950/90 p-4 text-sm leading-7 text-slate-200">
                    <code>{caseItem.fix}</code>
                  </pre>
                ) : null}
              </>
            ) : (
              <p className="text-sm leading-7 text-slate-700 dark:text-slate-300">
                {zh ? "选择一个修复方案后，这里会显示判断理由。" : "Choose a fix to see the reasoning."}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default DebugCaseLab;
