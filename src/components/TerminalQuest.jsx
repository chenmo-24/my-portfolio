import { useEffect, useMemo, useRef, useState } from "react";
import { CornerDownLeft, KeyRound, Lock, TerminalSquare, Trophy } from "lucide-react";

const FILE_SYSTEM = {
  "/": {
    type: "dir",
    children: {
      "README.md": {
        type: "file",
        content: {
          zh: [
            "# chenmo-lab",
            "这是一个迷你终端解谜。目标是找到 unlock 指令需要的口令。",
            "建议先看看 projects 目录，也许某个文件留下了线索。",
          ],
          en: [
            "# chenmo-lab",
            "This is a mini terminal puzzle. Your goal is to find the token required by the unlock command.",
            "Try inspecting the projects directory first. A clue may be waiting there.",
          ],
        },
      },
      projects: {
        type: "dir",
        children: {
          "roadmap.md": {
            type: "file",
            content: {
              zh: [
                "Roadmap",
                "1. ship small features",
                "2. verify behavior",
                "3. keep the interface useful",
                "",
                "提示：最重要的词是 ship。",
              ],
              en: [
                "Roadmap",
                "1. ship small features",
                "2. verify behavior",
                "3. keep the interface useful",
                "",
                "Hint: the most important word is ship.",
              ],
            },
          },
          "notes.txt": {
            type: "file",
            content: {
              zh: ["命令不是 magic，口令也不是随机。把 ship 和 it 连起来。"],
              en: ["Commands are not magic, and the token is not random. Join ship and it."],
            },
          },
        },
      },
      secrets: {
        type: "dir",
        children: {
          "key.txt": {
            type: "file",
            content: {
              zh: ["unlock token: ship-it", "运行：run unlock ship-it"],
              en: ["unlock token: ship-it", "Run: run unlock ship-it"],
            },
          },
        },
      },
    },
  },
};

function getNode(pathParts) {
  let node = FILE_SYSTEM["/"];
  for (const part of pathParts) {
    if (!node.children?.[part]) return null;
    node = node.children[part];
  }
  return node;
}

function normalizePath(cwd, raw) {
  const parts = raw.startsWith("/") ? [] : cwd.slice();
  raw.split("/").forEach((part) => {
    if (!part || part === ".") return;
    if (part === "..") parts.pop();
    else parts.push(part);
  });
  return parts;
}

function displayPath(parts) {
  return `/${parts.join("/")}`;
}

function TerminalQuest({ language }) {
  const [cwd, setCwd] = useState([]);
  const [input, setInput] = useState("");
  const [history, setHistory] = useState([]);
  const [unlocked, setUnlocked] = useState(() => window.localStorage.getItem("terminal-quest-unlocked") === "true");
  const inputRef = useRef(null);
  const scrollRef = useRef(null);
  const zh = language === "zh";

  const intro = useMemo(
    () =>
      zh
        ? [
            "chenmo-lab quest online",
            "输入 help 查看命令。目标：找到隐藏口令并执行 run unlock <token>。",
          ]
        : [
            "chenmo-lab quest online",
            "Type help for commands. Goal: find the hidden token and run unlock <token>.",
          ],
    [zh]
  );

  useEffect(() => {
    setHistory([{ type: "output", lines: intro }]);
  }, [intro]);

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [history]);

  const push = (entry) => setHistory((current) => [...current, entry]);

  const handleCommand = (raw) => {
    const command = raw.trim();
    if (!command) {
      push({ type: "input", cwd: displayPath(cwd), text: "" });
      return;
    }

    const [name, ...args] = command.split(/\s+/);
    const output = [];
    push({ type: "input", cwd: displayPath(cwd), text: command });

    if (name === "help") {
      output.push(
        "help",
        "pwd",
        "ls",
        "cd <dir>",
        "cat <file>",
        "hint",
        "run unlock <token>",
        "clear"
      );
    } else if (name === "pwd") {
      output.push(displayPath(cwd));
    } else if (name === "ls") {
      const node = getNode(cwd);
      output.push(
        ...Object.entries(node.children ?? {}).map(([key, child]) => `${child.type === "dir" ? "dir " : "file"}  ${key}`)
      );
    } else if (name === "cd") {
      const target = args[0] ?? "/";
      const nextPath = normalizePath(cwd, target);
      const node = getNode(nextPath);
      if (!node || node.type !== "dir") output.push(zh ? "目录不存在" : "Directory not found");
      else setCwd(nextPath);
    } else if (name === "cat") {
      const target = args[0];
      if (!target) output.push(zh ? "请提供文件名" : "Please provide a file name");
      else {
        const node = getNode(normalizePath(cwd, target));
        if (!node || node.type !== "file") output.push(zh ? "文件不存在" : "File not found");
        else output.push(...node.content[language]);
      }
    } else if (name === "hint") {
      output.push(zh ? "先 ls，再 cd projects，最后别忘了 secrets。" : "Start with ls, then cd projects, and do not forget secrets.");
    } else if (name === "run" && args[0] === "unlock") {
      if (args[1] === "ship-it") {
        window.localStorage.setItem("terminal-quest-unlocked", "true");
        setUnlocked(true);
        output.push(zh ? "解锁成功：你找到了隐藏徽章。" : "Unlocked: you found the hidden badge.");
      } else {
        output.push(zh ? "口令错误。" : "Wrong token.");
      }
    } else if (name === "clear") {
      setHistory([]);
      return;
    } else {
      output.push(zh ? `未知命令：${name}` : `Unknown command: ${name}`);
    }

    if (output.length) push({ type: "output", lines: output });
  };

  const onKeyDown = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      handleCommand(input);
      setInput("");
    }
  };

  return (
    <div className="panel-card overflow-hidden p-5 sm:p-8 md:p-10">
      <div className="mb-6">
        <p className="section-title mb-2">Module M</p>
        <h3 className="text-2xl font-semibold text-slate-900 dark:text-white">
          {zh ? "Terminal 解谜小游戏" : "Terminal Quest"}
        </h3>
        <p className="mt-4 max-w-3xl text-base leading-8 text-slate-700 dark:text-slate-300">
          {zh
            ? "一个迷你文件系统谜题。通过 ls、cd、cat 找线索，最后用 run unlock 解锁隐藏徽章。"
            : "A mini filesystem puzzle. Use ls, cd, and cat to gather clues, then run unlock to reveal a hidden badge."}
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1fr_18rem]">
        <div
          className="rounded-3xl border border-white/10 bg-slate-950/90 shadow-2xl"
          onClick={() => inputRef.current?.focus()}
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
              ~/quest
            </span>
          </div>

          <div ref={scrollRef} className="h-80 overflow-y-auto px-5 py-4 font-mono text-sm leading-7 text-slate-200">
            {history.map((entry, index) =>
              entry.type === "input" ? (
                <div key={`i-${index}`} className="flex flex-wrap gap-2 text-cyan-300">
                  <span className="text-emerald-300">quest:{entry.cwd}$</span>
                  <span>{entry.text}</span>
                </div>
              ) : (
                <div key={`o-${index}`} className="mb-2 whitespace-pre-wrap text-slate-300">
                  {entry.lines.map((line, i) => (
                    <div key={i}>{line}</div>
                  ))}
                </div>
              )
            )}

            <div className="flex items-center gap-2">
              <span className="text-emerald-300">quest:{displayPath(cwd)}$</span>
              <input
                ref={inputRef}
                value={input}
                onChange={(event) => setInput(event.target.value)}
                onKeyDown={onKeyDown}
                className="min-w-0 flex-1 bg-transparent font-mono text-cyan-200 caret-cyan-300 outline-none"
                placeholder={zh ? "输入命令" : "type command"}
                spellCheck={false}
              />
              <span className="hidden text-xs text-slate-600 sm:inline-flex sm:items-center sm:gap-1">
                <CornerDownLeft size={12} /> Enter
              </span>
            </div>
          </div>
        </div>

        <div className="space-y-5">
          <div className={`glass-panel p-5 ${unlocked ? "border-amber-300/30 bg-amber-300/10" : ""}`}>
            <p className="mb-3 inline-flex items-center gap-2 text-sm uppercase tracking-[0.28em] text-slate-500 dark:text-slate-400">
              {unlocked ? <Trophy size={14} /> : <Lock size={14} />}
              {zh ? "解锁状态" : "Unlock State"}
            </p>
            <p className="text-2xl font-bold text-slate-900 dark:text-white">
              {unlocked ? (zh ? "已解锁" : "Unlocked") : (zh ? "未解锁" : "Locked")}
            </p>
            <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-300">
              {unlocked
                ? zh
                  ? "隐藏徽章会保存在本地，刷新后仍然存在。"
                  : "The hidden badge is stored locally and survives refreshes."
                : zh
                  ? "提示：从 README.md 开始。"
                  : "Hint: start from README.md."}
            </p>
          </div>

          <div className="glass-panel p-5">
            <p className="mb-3 inline-flex items-center gap-2 text-sm uppercase tracking-[0.28em] text-slate-500 dark:text-slate-400">
              <KeyRound size={14} />
              {zh ? "快捷尝试" : "Quick Try"}
            </p>
            <div className="space-y-2 font-mono text-sm text-slate-700 dark:text-slate-300">
              <p>ls</p>
              <p>cat README.md</p>
              <p>cd projects</p>
              <p>cd /secrets</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TerminalQuest;
