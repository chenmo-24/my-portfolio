import { useEffect, useMemo, useRef, useState } from "react";
import { TerminalSquare, CornerDownLeft } from "lucide-react";
import { personalInfo } from "../data/personalInfo";
import projectsData from "../data/projects";
import skillRadar from "../data/skills";

const BANNER = {
  zh: [
    "chenmo-os 1.0 · 交互式终端",
    "输入 help 查看支持的命令。直接按 ↑ / ↓ 可调用历史输入。",
  ],
  en: [
    "chenmo-os 1.0 · interactive terminal",
    "Type 'help' for available commands. Use ↑ / ↓ to reuse history.",
  ],
};

const COMMAND_CATALOG = [
  { name: "help", desc: { zh: "列出所有命令", en: "list all commands" } },
  { name: "about", desc: { zh: "显示自我介绍", en: "show the about text" } },
  { name: "skills", desc: { zh: "查看技能水平", en: "show skill levels" } },
  { name: "projects", desc: { zh: "列出项目推荐", en: "list recommended projects" } },
  { name: "contact", desc: { zh: "显示联系方式", en: "show contact details" } },
  { name: "whoami", desc: { zh: "打印当前身份", en: "print current identity" } },
  { name: "pwd", desc: { zh: "打印当前路径", en: "print working directory" } },
  { name: "ls", desc: { zh: "列出虚拟文件", en: "list virtual files" } },
  { name: "date", desc: { zh: "显示当前时间", en: "show current time" } },
  { name: "echo <text>", desc: { zh: "回显输入内容", en: "echo the text back" } },
  { name: "github", desc: { zh: "新标签页打开 GitHub", en: "open GitHub in a new tab" } },
  { name: "snake", desc: { zh: "滚动到贪吃蛇模块", en: "scroll to the snake module" } },
  { name: "theme / lang", desc: { zh: "提示右上角切换入口", en: "hint at the top-right toggles" } },
  { name: "clear", desc: { zh: "清空终端", en: "clear the terminal" } },
];

function pad(text, width) {
  if (text.length >= width) return text;
  return text + " ".repeat(width - text.length);
}

function InteractiveTerminal({ language }) {
  const [history, setHistory] = useState([]);
  const [input, setInput] = useState("");
  const [cmdHistory, setCmdHistory] = useState([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const inputRef = useRef(null);
  const scrollRef = useRef(null);

  const bannerLines = useMemo(() => BANNER[language], [language]);

  useEffect(() => {
    setHistory([{ type: "banner", lines: bannerLines }]);
  }, [bannerLines]);

  useEffect(() => {
    const el = scrollRef.current;
    if (el) {
      el.scrollTop = el.scrollHeight;
    }
  }, [history]);

  const handleCommand = (raw) => {
    const cmd = raw.trim();
    if (!cmd) {
      setHistory((prev) => [...prev, { type: "input", text: "" }]);
      return;
    }

    setCmdHistory((prev) => [cmd, ...prev].slice(0, 40));
    setHistoryIndex(-1);

    const [name, ...args] = cmd.split(/\s+/);
    const outputs = [];

    switch (name) {
      case "help":
        outputs.push(
          language === "zh" ? "支持的命令：" : "Supported commands:",
          ...COMMAND_CATALOG.map((c) => `  ${pad(c.name, 14)} ${c.desc[language]}`)
        );
        break;
      case "about":
        outputs.push(...personalInfo.aboutParagraphs[language]);
        break;
      case "skills":
        outputs.push(
          language === "zh" ? "技能水平（满分 10）：" : "Skill levels (max 10):",
          ...skillRadar.axes.map(
            (axis) => `  ${pad(axis.name[language], 18)} ${axis.value.toString().padStart(2, " ")} / 10`
          )
        );
        break;
      case "projects":
        outputs.push(language === "zh" ? "项目推荐：" : "Recommended projects:");
        projectsData.forEach((project) => {
          const title = typeof project.title === "string" ? project.title : project.title[language];
          outputs.push(`  • ${title}`);
          const desc = project.description?.[language];
          if (desc) outputs.push(`    ${desc}`);
          if (project.githubUrl) outputs.push(`    ↳ ${project.githubUrl}`);
        });
        break;
      case "contact":
        outputs.push(
          `email   ${personalInfo.email}`,
          `github  ${personalInfo.github}`
        );
        break;
      case "whoami":
        outputs.push(personalInfo.name);
        break;
      case "pwd":
        outputs.push("/home/chenmo/portfolio");
        break;
      case "ls":
        outputs.push("about.md  projects/  skills.json  quotes.txt  snake.bin  now.log  github.log");
        break;
      case "date": {
        const d = new Date();
        outputs.push(d.toString());
        break;
      }
      case "echo":
        outputs.push(args.join(" "));
        break;
      case "github":
        outputs.push(language === "zh" ? "正在打开 GitHub…" : "Opening GitHub…");
        window.open(personalInfo.github, "_blank", "noopener,noreferrer");
        break;
      case "snake":
        outputs.push(language === "zh" ? "滚动到贪吃蛇模块…" : "Scrolling to the snake module…");
        document.getElementById("fun-zone")?.scrollIntoView({ behavior: "smooth", block: "start" });
        break;
      case "theme":
        outputs.push(
          language === "zh"
            ? "请使用右上角 Navbar 的主题切换按钮。"
            : "Please use the theme toggle in the top-right Navbar."
        );
        break;
      case "lang":
      case "language":
        outputs.push(
          language === "zh"
            ? "请使用右上角 Navbar 的语言切换按钮。"
            : "Please use the language toggle in the top-right Navbar."
        );
        break;
      case "clear":
        setHistory([]);
        return;
      default:
        outputs.push(
          language === "zh"
            ? `未知命令：${name}。输入 help 查看所有命令。`
            : `Unknown command: ${name}. Type 'help' to list commands.`
        );
    }

    setHistory((prev) => [
      ...prev,
      { type: "input", text: cmd },
      { type: "output", lines: outputs },
    ]);
  };

  const onKeyDown = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      handleCommand(input);
      setInput("");
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      if (!cmdHistory.length) return;
      const next = Math.min(historyIndex + 1, cmdHistory.length - 1);
      setHistoryIndex(next);
      setInput(cmdHistory[next] ?? "");
    } else if (event.key === "ArrowDown") {
      event.preventDefault();
      const next = historyIndex - 1;
      if (next < 0) {
        setHistoryIndex(-1);
        setInput("");
      } else {
        setHistoryIndex(next);
        setInput(cmdHistory[next] ?? "");
      }
    } else if (event.key === "l" && (event.ctrlKey || event.metaKey)) {
      event.preventDefault();
      setHistory([]);
    }
  };

  const focusInput = () => inputRef.current?.focus();

  return (
    <div className="panel-card overflow-hidden p-5 sm:p-8 md:p-10">
      <div className="mb-6">
        <p className="section-title mb-2">Module I</p>
        <h3 className="text-2xl font-semibold text-slate-900 dark:text-white">
          {language === "zh" ? "交互式终端" : "Interactive Terminal"}
        </h3>
        <p className="mt-4 max-w-3xl text-base leading-8 text-slate-700 dark:text-slate-300">
          {language === "zh"
            ? "这是 Hero 终端的可交互版本，可以直接输入命令看自我介绍、项目、技能等。键盘极客专属。"
            : "An interactive version of the Hero terminal. Run commands to explore the about text, projects, and skills — keyboard-first by design."}
        </p>
      </div>

      <div
        className="rounded-3xl border border-white/10 bg-slate-950/90 shadow-2xl"
        onClick={focusInput}
        role="presentation"
      >
        <div className="flex items-center justify-between gap-3 border-b border-white/10 bg-white/5 px-5 py-3">
          <div className="flex items-center gap-2">
            <span className="h-3 w-3 rounded-full bg-rose-400" />
            <span className="h-3 w-3 rounded-full bg-amber-400" />
            <span className="h-3 w-3 rounded-full bg-emerald-400" />
          </div>
          <span className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.24em] text-slate-400">
            <TerminalSquare size={14} />
            ~/portfolio · chenmo-24
          </span>
          <span className="text-xs text-slate-500">{language === "zh" ? "点击聚焦" : "click to focus"}</span>
        </div>

        <div
          ref={scrollRef}
          className="h-80 overflow-y-auto px-5 py-4 font-mono text-sm leading-7 text-slate-200"
        >
          {history.map((entry, index) => {
            if (entry.type === "banner") {
              return (
                <div key={`banner-${index}`} className="mb-3 text-cyan-300">
                  {entry.lines.map((line, i) => (
                    <div key={i}>{line}</div>
                  ))}
                </div>
              );
            }
            if (entry.type === "input") {
              return (
                <div key={`input-${index}`} className="flex gap-2 text-cyan-300">
                  <span className="text-emerald-300">❯</span>
                  <span>{entry.text}</span>
                </div>
              );
            }
            return (
              <div key={`output-${index}`} className="mb-2 whitespace-pre-wrap text-slate-300">
                {entry.lines.map((line, i) => (
                  <div key={i}>{line}</div>
                ))}
              </div>
            );
          })}

          <div className="flex items-center gap-2">
            <span className="text-emerald-300">❯</span>
            <input
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={onKeyDown}
              className="flex-1 bg-transparent font-mono text-cyan-200 caret-cyan-300 outline-none"
              placeholder={language === "zh" ? "输入命令，例如 help" : "type a command, e.g. help"}
              spellCheck={false}
              autoComplete="off"
              autoCorrect="off"
              autoCapitalize="off"
            />
            <span className="hidden text-xs text-slate-600 sm:inline-flex sm:items-center sm:gap-1">
              <CornerDownLeft size={12} /> Enter
            </span>
          </div>
        </div>
      </div>

      <p className="mt-4 text-sm text-slate-500 dark:text-slate-400">
        {language === "zh"
          ? "小彩蛋：Ctrl + L 清屏；输入 snake 会滚到贪吃蛇模块。"
          : "Easter eggs: Ctrl + L clears the screen; 'snake' scrolls to the snake module."}
      </p>
    </div>
  );
}

export default InteractiveTerminal;
