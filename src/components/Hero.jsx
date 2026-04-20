import { useEffect, useMemo, useState } from "react";
import { ArrowDownRight, Github, Mail, TerminalSquare } from "lucide-react";

function wait(ms) {
  return new Promise((resolve) => {
    window.setTimeout(resolve, ms);
  });
}

function getNextLogIndex(currentIndex, total) {
  if (total <= 1) {
    return currentIndex;
  }

  return (currentIndex + 1 + Math.floor(Math.random() * (total - 1))) % total;
}

function Hero({ info, language }) {
  const [typedText, setTypedText] = useState("");
  const [terminalLines, setTerminalLines] = useState([]);
  const [activeCommand, setActiveCommand] = useState("");
  const [isTerminalTyping, setIsTerminalTyping] = useState(false);
  const [statusProgress, setStatusProgress] = useState(0);
  const [currentLogIndex, setCurrentLogIndex] = useState(0);

  const intro = info.intro[language];
  const roles = info.roles[language];

  const terminalSequence = useMemo(
    () =>
      language === "zh"
        ? [
            { type: "command", text: "$ whoami" },
            { type: "output", text: "chenmo-24" },
            { type: "space", text: "" },
            { type: "command", text: "$ cat profile.json" },
            { type: "output", text: "{" },
            { type: "output", text: '  "role": "学生开发者",' },
            { type: "output", text: '  "focus": ["Web", "Algorithm", "Engineering"],' },
            { type: "output", text: '  "status": "持续构建可靠的东西",' },
            { type: "output", text: '  "language": "zh-CN",' },
            { type: "output", text: '  "theme": "dark by default"' },
            { type: "output", text: "}" },
          ]
        : [
            { type: "command", text: "$ whoami" },
            { type: "output", text: "chenmo-24" },
            { type: "space", text: "" },
            { type: "command", text: "$ cat profile.json" },
            { type: "output", text: "{" },
            { type: "output", text: '  "role": "Student Developer",' },
            { type: "output", text: '  "focus": ["Web", "Algorithm", "Engineering"],' },
            { type: "output", text: '  "status": "Building reliable things",' },
            { type: "output", text: '  "language": "en",' },
            { type: "output", text: '  "theme": "dark by default"' },
            { type: "output", text: "}" },
          ],
    [language]
  );

  const terminalLogSets = useMemo(
    () =>
      language === "zh"
        ? [
            [
              { time: "[09:12:04]", text: "加载个人资料上下文", status: "normal" },
              { time: "[09:12:05]", text: "同步主题与语言设置", status: "normal" },
              { time: "[09:12:06]", text: "Hero 卡片状态正常", status: "ok" },
            ],
            [
              { time: "[09:14:11]", text: "刷新项目推荐数据", status: "normal" },
              { time: "[09:14:12]", text: "校验交互模块可见性", status: "normal" },
              { time: "[09:14:13]", text: "终端面板渲染完成", status: "ok" },
            ],
            [
              { time: "[09:16:28]", text: "准备首屏视觉层级", status: "normal" },
              { time: "[09:16:29]", text: "注入滚动引导提示", status: "normal" },
              { time: "[09:16:30]", text: "首页状态面板在线", status: "ok" },
            ],
          ]
        : [
            [
              { time: "[09:12:04]", text: "Loading profile context", status: "normal" },
              { time: "[09:12:05]", text: "Syncing theme and language settings", status: "normal" },
              { time: "[09:12:06]", text: "Hero card status healthy", status: "ok" },
            ],
            [
              { time: "[09:14:11]", text: "Refreshing recommended project data", status: "normal" },
              { time: "[09:14:12]", text: "Checking interactive modules visibility", status: "normal" },
              { time: "[09:14:13]", text: "Terminal panel render completed", status: "ok" },
            ],
            [
              { time: "[09:16:28]", text: "Preparing hero visual hierarchy", status: "normal" },
              { time: "[09:16:29]", text: "Injecting scroll guidance cue", status: "normal" },
              { time: "[09:16:30]", text: "Homepage status panel online", status: "ok" },
            ],
          ],
    [language]
  );

  useEffect(() => {
    setTypedText("");
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) {
      setTypedText(intro);
      return undefined;
    }

    let currentIndex = 0;
    const intervalId = window.setInterval(() => {
      currentIndex += 1;
      setTypedText(intro.slice(0, currentIndex));

      if (currentIndex >= intro.length) {
        window.clearInterval(intervalId);
      }
    }, 85);

    return () => window.clearInterval(intervalId);
  }, [intro]);

  useEffect(() => {
    let cancelled = false;
    let logIndex = 0;

    async function runTerminalAnimation() {
      const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (reduceMotion) {
        setTerminalLines(terminalSequence.map((item) => item.text));
        setActiveCommand("");
        setIsTerminalTyping(false);
        setStatusProgress(100);
        setCurrentLogIndex(0);
        return;
      }

      setCurrentLogIndex(0);

      while (!cancelled) {
        setTerminalLines([]);
        setActiveCommand("");
        setIsTerminalTyping(false);
        setStatusProgress(0);
        setCurrentLogIndex(logIndex);
        await wait(220);

        for (let index = 0; index < terminalSequence.length; index += 1) {
          const item = terminalSequence[index];
          if (cancelled) {
            return;
          }

          if (item.type === "command") {
            let current = "";
            setIsTerminalTyping(true);

            for (const character of item.text) {
              if (cancelled) {
                return;
              }

              current += character;
              setActiveCommand(current);
              await wait(38);
            }

            setTerminalLines((previous) => [...previous, item.text]);
            setActiveCommand("");
            setIsTerminalTyping(false);
            setStatusProgress(Math.round(((index + 1) / terminalSequence.length) * 100));
            await wait(120);
            continue;
          }

          setTerminalLines((previous) => [...previous, item.text]);
          setStatusProgress(Math.round(((index + 1) / terminalSequence.length) * 100));
          await wait(item.type === "space" ? 100 : 92);
        }

        await wait(2600);
        logIndex = getNextLogIndex(logIndex, terminalLogSets.length);
        setCurrentLogIndex(logIndex);
      }
    }

    runTerminalAnimation();

    return () => {
      cancelled = true;
    };
  }, [terminalSequence, terminalLogSets.length]);

  const currentLogs = terminalLogSets[currentLogIndex] ?? terminalLogSets[0];

  return (
    <section
      className="container-shell flex min-h-screen items-center py-16 sm:py-20"
      data-reveal
      data-section
      id="home"
      style={{ "--reveal-delay": "0s" }}
    >
      <div className="glass-panel hero-stage w-full overflow-hidden px-5 py-10 sm:px-6 sm:py-14 md:px-12 md:py-20">
        <div className="hero-scene">
          <div className="hero-divider hidden lg:block" aria-hidden="true" />

          <div className="hero-copy max-w-2xl lg:max-w-none">
            <p className="section-title">{language === "zh" ? "Portfolio / 主页" : "Portfolio / Homepage"}</p>
            <h1 className="max-w-3xl text-4xl font-black leading-tight tracking-tight text-slate-900 dark:text-white md:text-6xl">
              {info.heroTitle}
            </h1>
            <p className="typing-caret mt-6 min-h-[3rem] text-lg font-medium text-slate-600 dark:text-slate-300 md:text-2xl">
              {typedText}
            </p>

            <div className="hero-role-row mt-8 flex flex-wrap gap-3">
              {roles.map((role, index) => (
                <span
                  key={role}
                  className="badge-chip"
                  style={{ transitionDelay: `${index * 70}ms` }}
                >
                  {role}
                </span>
              ))}
            </div>

            <div className="hero-action-panel mt-10">
              <div className="hero-action-copy">
                <p className="hero-action-kicker">{language === "zh" ? "快速入口" : "Quick Access"}</p>
                <p className="hero-action-text">
                  {language === "zh"
                    ? "先看推荐项目，或者直接跳到联系区。"
                    : "Jump into the recommended projects first, or go straight to contact."}
                </p>
              </div>

              <div className="hero-cta-row flex flex-col gap-4 sm:flex-row">
                <a className="primary-button" href="#projects">
                  {language === "zh" ? "查看项目" : "View Projects"}
                  <ArrowDownRight size={18} />
                </a>
                <a className="secondary-button" href="#contact">
                  {language === "zh" ? "联系我" : "Contact Me"}
                  <Mail size={18} />
                </a>
              </div>
            </div>
          </div>

          <div className="hero-terminal-wrap">
            <div className="panel-card relative overflow-hidden p-5 sm:p-6 md:p-8">
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 via-transparent to-violet-500/20" />
              <div className="hero-terminal-glow" aria-hidden="true" />

              <div className="relative space-y-5">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <span className="inline-flex items-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-400/10 px-4 py-1 text-xs font-semibold uppercase tracking-[0.3em] text-cyan-400">
                    <TerminalSquare size={14} />
                    {language === "zh" ? "终端卡片" : "Terminal Card"}
                  </span>
                  <a
                    className="secondary-button px-4 py-2"
                    href={info.github}
                    rel="noreferrer"
                    target="_blank"
                  >
                    <Github size={16} />
                    GitHub
                  </a>
                </div>

                <div className="terminal-shell">
                  <div className="terminal-topbar">
                    <div className="flex items-center gap-2">
                      <span className="h-3 w-3 rounded-full bg-rose-400" />
                      <span className="h-3 w-3 rounded-full bg-amber-400" />
                      <span className="h-3 w-3 rounded-full bg-emerald-400" />
                    </div>
                    <span className="terminal-title">~/portfolio/hero-card</span>
                  </div>

                  <pre className="terminal-code">
                    <code>
                      {terminalLines.map((line, index) => (
                        <span
                          key={`${line}-${index}`}
                          className={
                            line.startsWith("$")
                              ? "terminal-line terminal-line-command"
                              : line.startsWith('"') || line.startsWith("  ")
                                ? "terminal-line terminal-line-json"
                                : "terminal-line"
                          }
                        >
                          {line || " "}
                        </span>
                      ))}

                      {activeCommand ? (
                        <span className="terminal-line terminal-line-command terminal-line-live">
                          {activeCommand}
                          <span className="terminal-cursor" />
                        </span>
                      ) : null}

                      {!activeCommand && isTerminalTyping ? (
                        <span className="terminal-line terminal-line-command terminal-line-live">
                          <span className="terminal-cursor" />
                        </span>
                      ) : null}
                    </code>
                  </pre>
                </div>

                <div className="terminal-statusbar">
                  <div className="flex items-center gap-3">
                    <span className="terminal-status-dot" />
                    <span className="terminal-status-label">
                      {language === "zh"
                        ? isTerminalTyping
                          ? "命令执行中"
                          : "命令执行成功"
                        : isTerminalTyping
                          ? "Running command"
                          : "Command completed"}
                    </span>
                  </div>
                  <div className="terminal-progress-track">
                    <span className="terminal-progress-fill" style={{ width: `${statusProgress}%` }} />
                  </div>
                </div>

                <div className="terminal-loglist">
                  {currentLogs.map((log) => (
                    <div key={`${log.time}-${log.text}`} className="terminal-logrow">
                      <span className="terminal-logtime">{log.time}</span>
                      <span
                        className={`terminal-logtext ${log.status === "ok" ? "terminal-logtext-ok" : ""}`}
                      >
                        {log.text}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="hero-terminal-meta grid gap-4 sm:grid-cols-2">
                  <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
                    <p className="text-sm text-slate-400">{language === "zh" ? "邮箱" : "Email"}</p>
                    <a className="mt-2 block break-all font-medium text-white" href={`mailto:${info.email}`}>
                      {info.email}
                    </a>
                  </div>
                  <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
                    <p className="text-sm text-slate-400">{language === "zh" ? "当前关注" : "Current Focus"}</p>
                    <p className="mt-2 font-medium text-white">
                      {language === "zh"
                        ? "React、算法训练、工程化部署"
                        : "React, algorithm training, and engineering deployment"}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="hero-scrollcue">
          <a className="hero-scrollcue-link" href="#about">
            <span className="hero-scrollcue-label">
              {language === "zh" ? "继续向下浏览" : "Scroll to explore"}
            </span>
            <span className="hero-scrollcue-mouse" aria-hidden="true">
              <span className="hero-scrollcue-wheel" />
            </span>
            <span className="hero-scrollcue-arrow" aria-hidden="true" />
          </a>
        </div>
      </div>
    </section>
  );
}

export default Hero;
