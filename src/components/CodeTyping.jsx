import { useEffect, useMemo, useRef, useState } from "react";
import { Keyboard, RotateCcw, Timer, Percent, Gauge } from "lucide-react";

function CodeTyping({ language, snippets }) {
  const [snippetId, setSnippetId] = useState(snippets[0].id);
  const [input, setInput] = useState("");
  const [startTs, setStartTs] = useState(null);
  const [endTs, setEndTs] = useState(null);
  const [tick, setTick] = useState(0);
  const textareaRef = useRef(null);

  const snippet = useMemo(
    () => snippets.find((item) => item.id === snippetId) ?? snippets[0],
    [snippetId, snippets]
  );
  const target = snippet.code;
  const done = input.length >= target.length && input.length > 0;

  useEffect(() => {
    setInput("");
    setStartTs(null);
    setEndTs(null);
  }, [snippetId]);

  useEffect(() => {
    if (!startTs || done) return undefined;
    const id = window.setInterval(() => setTick((n) => n + 1), 250);
    return () => window.clearInterval(id);
  }, [startTs, done]);

  const correctCount = useMemo(() => {
    let count = 0;
    for (let i = 0; i < input.length; i += 1) {
      if (input[i] === target[i]) count += 1;
    }
    return count;
  }, [input, target]);

  const elapsed = useMemo(() => {
    if (!startTs) return 0;
    const end = done && endTs ? endTs : Date.now();
    return Math.max((end - startTs) / 1000, 0);
  }, [startTs, endTs, done, tick]);

  const accuracy = input.length === 0 ? 100 : Math.round((correctCount / input.length) * 100);
  const wpm = elapsed > 0 ? Math.round((input.length / 5 / elapsed) * 60) : 0;
  const progress = Math.round((input.length / target.length) * 100);

  const handleChange = (event) => {
    const value = event.target.value;
    if (done) return;
    if (value.length > target.length) return;
    if (value.length === 1 && !startTs) {
      setStartTs(Date.now());
    }
    if (value.length === target.length) {
      setEndTs(Date.now());
    }
    setInput(value);
  };

  const handleKeyDown = (event) => {
    if (event.key === "Tab") {
      event.preventDefault();
      const el = event.target;
      const { selectionStart, selectionEnd } = el;
      const next = input.slice(0, selectionStart) + "  " + input.slice(selectionEnd);
      if (next.length <= target.length) {
        if (!startTs) setStartTs(Date.now());
        if (next.length === target.length) setEndTs(Date.now());
        setInput(next);
        requestAnimationFrame(() => {
          el.selectionStart = el.selectionEnd = selectionStart + 2;
        });
      }
    }
  };

  const reset = () => {
    setInput("");
    setStartTs(null);
    setEndTs(null);
    requestAnimationFrame(() => textareaRef.current?.focus());
  };

  return (
    <div className="panel-card overflow-hidden p-5 sm:p-8 md:p-10">
      <div className="mb-6">
        <p className="section-title mb-2">Module H</p>
        <h3 className="text-2xl font-semibold text-slate-900 dark:text-white">
          {language === "zh" ? "代码打字挑战" : "Code Typing Challenge"}
        </h3>
        <p className="mt-4 max-w-3xl text-base leading-8 text-slate-700 dark:text-slate-300">
          {language === "zh"
            ? "选一段代码敲完，实时计算 WPM、准确率和耗时。Tab 会被转成两个空格，更贴近真实编辑器。"
            : "Pick a snippet and type it out. WPM, accuracy, and elapsed time update live. Tab is mapped to two spaces, mimicking a real editor."}
        </p>
      </div>

      <div className="mb-5 flex flex-wrap gap-2">
        {snippets.map((item) => (
          <button
            key={item.id}
            className={`rounded-full border px-4 py-2 text-xs font-semibold uppercase tracking-[0.22em] transition ${
              item.id === snippetId
                ? "border-cyan-400/40 bg-cyan-500/15 text-cyan-500"
                : "border-white/10 bg-white/5 text-slate-500 hover:border-cyan-400/30 hover:text-cyan-500 dark:text-slate-400"
            }`}
            onClick={() => setSnippetId(item.id)}
            type="button"
          >
            {item.title[language]} · {item.lang}
          </button>
        ))}
      </div>

      <div className="mb-5 grid gap-3 sm:grid-cols-4">
        {[
          { icon: Gauge, color: "text-cyan-400", label: "WPM", value: wpm },
          { icon: Percent, color: "text-emerald-400", label: language === "zh" ? "准确率" : "Accuracy", value: `${accuracy}%` },
          { icon: Timer, color: "text-violet-400", label: language === "zh" ? "耗时" : "Elapsed", value: `${elapsed.toFixed(1)}s` },
          { icon: Keyboard, color: "text-orange-400", label: language === "zh" ? "进度" : "Progress", value: `${progress}%` },
        ].map((m) => {
          const Icon = m.icon;
          return (
            <div key={m.label} className="glass-panel px-4 py-3">
              <div className={`flex items-center gap-2 ${m.color}`}>
                <Icon size={14} />
                <span className="text-xs uppercase tracking-[0.24em]">{m.label}</span>
              </div>
              <p className="mt-1 text-2xl font-bold text-slate-900 dark:text-white">{m.value}</p>
            </div>
          );
        })}
      </div>

      <div className="relative mb-4 overflow-hidden rounded-2xl border border-white/10 bg-slate-950/85 p-5 font-mono text-sm leading-7 text-slate-300 shadow-inner">
        <pre className="whitespace-pre-wrap break-all">
          {target.split("").map((ch, i) => {
            let cls = "text-slate-500";
            if (i < input.length) {
              cls = input[i] === ch ? "text-emerald-300" : "rounded bg-rose-500/30 text-rose-200";
            } else if (i === input.length) {
              cls = "rounded bg-cyan-400/30 text-white";
            }
            const display = ch === "\n" ? "↵\n" : ch === " " && i === input.length ? "·" : ch;
            return (
              <span key={i} className={cls}>
                {display}
              </span>
            );
          })}
        </pre>
      </div>

      <textarea
        ref={textareaRef}
        className="min-h-[8rem] w-full rounded-2xl border border-white/10 bg-white/5 p-4 font-mono text-sm text-slate-900 shadow-inner outline-none transition focus:border-cyan-400/40 focus:bg-white/10 dark:text-slate-100"
        placeholder={language === "zh" ? "点击这里开始打字…" : "Click here and start typing…"}
        spellCheck={false}
        autoComplete="off"
        autoCorrect="off"
        autoCapitalize="off"
        value={input}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
      />

      <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
        <p className="text-sm text-slate-500 dark:text-slate-400">
          {done
            ? language === "zh"
              ? `完成！WPM ${wpm}，准确率 ${accuracy}%，用时 ${elapsed.toFixed(1)} 秒。`
              : `Done! ${wpm} WPM, ${accuracy}% accuracy in ${elapsed.toFixed(1)}s.`
            : language === "zh"
              ? "小提示：保留换行与缩进，挑战会更真实。"
              : "Tip: keep line breaks and indentation for a realistic run."}
        </p>
        <button className="secondary-button" onClick={reset} type="button">
          <RotateCcw size={16} />
          {language === "zh" ? "重置" : "Reset"}
        </button>
      </div>
    </div>
  );
}

export default CodeTyping;
