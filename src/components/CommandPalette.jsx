import { useEffect, useMemo, useRef, useState } from "react";
import { Search, Command, ArrowRight } from "lucide-react";
import { personalInfo } from "../data/personalInfo";

function matches(action, query) {
  if (!query) return true;
  const q = query.toLowerCase();
  const fields = [action.title, action.subtitle, ...(action.keywords ?? [])];
  return fields.filter(Boolean).some((text) => text.toLowerCase().includes(q));
}

function CommandPalette({ language, theme, toggleTheme, toggleLanguage }) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);
  const listRef = useRef(null);

  const actions = useMemo(() => {
    const zh = language === "zh";
    const scrollTo = (id) => () => {
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    };
    const navGroup = zh ? "导航" : "Navigate";
    const quickGroup = zh ? "快捷操作" : "Actions";
    const linkGroup = zh ? "外部链接" : "Links";
    const funGroup = zh ? "Fun Zone 模块" : "Fun Zone Modules";

    return [
      { id: "nav-home", title: zh ? "跳转 · 首页" : "Go to · Home", subtitle: "#home", group: navGroup, keywords: ["home", "首页"], run: scrollTo("home") },
      { id: "nav-about", title: zh ? "跳转 · 关于" : "Go to · About", subtitle: "#about", group: navGroup, keywords: ["about", "关于"], run: scrollTo("about") },
      { id: "nav-projects", title: zh ? "跳转 · 项目" : "Go to · Projects", subtitle: "#projects", group: navGroup, keywords: ["projects", "项目"], run: scrollTo("projects") },
      { id: "nav-funzone", title: zh ? "跳转 · Fun Zone" : "Go to · Fun Zone", subtitle: "#fun-zone", group: navGroup, keywords: ["fun", "zone", "玩乐"], run: scrollTo("fun-zone") },
      { id: "nav-contact", title: zh ? "跳转 · 联系" : "Go to · Contact", subtitle: "#contact", group: navGroup, keywords: ["contact", "联系"], run: scrollTo("contact") },

      { id: "fun-algorithm", title: zh ? "Fun · 算法进度" : "Fun · Algorithm Tracker", group: funGroup, keywords: ["algorithm", "leetcode", "acwing", "算法"], run: scrollTo("mod-algorithm") },
      { id: "fun-radar", title: zh ? "Fun · 技能雷达" : "Fun · Skill Radar", group: funGroup, keywords: ["skill", "radar", "技能"], run: scrollTo("mod-radar") },
      { id: "fun-quote", title: zh ? "Fun · 每日语录" : "Fun · Daily Quote", group: funGroup, keywords: ["quote", "语录"], run: scrollTo("mod-quote") },
      { id: "fun-now", title: zh ? "Fun · Now Page" : "Fun · Now Page", group: funGroup, keywords: ["now", "本周"], run: scrollTo("mod-now") },
      { id: "fun-checkin", title: zh ? "Fun · 打卡日历" : "Fun · Check-in Calendar", group: funGroup, keywords: ["checkin", "calendar", "打卡"], run: scrollTo("mod-checkin") },
      { id: "fun-github", title: zh ? "Fun · GitHub 活跃度" : "Fun · GitHub Stats", group: funGroup, keywords: ["github", "stats", "活跃度"], run: scrollTo("mod-github") },
      { id: "fun-terminal", title: zh ? "Fun · 交互式终端" : "Fun · Interactive Terminal", group: funGroup, keywords: ["terminal", "cli", "终端"], run: scrollTo("mod-terminal") },
      { id: "fun-typing", title: zh ? "Fun · 代码打字挑战" : "Fun · Code Typing", group: funGroup, keywords: ["typing", "wpm", "打字"], run: scrollTo("mod-typing") },
      { id: "fun-snake", title: zh ? "Fun · 贪吃蛇" : "Fun · Snake", group: funGroup, keywords: ["snake", "game", "贪吃蛇"], run: scrollTo("mod-snake") },
      { id: "fun-2048", title: zh ? "Fun · 2048" : "Fun · 2048", group: funGroup, keywords: ["2048", "game"], run: scrollTo("mod-2048") },
      { id: "fun-life", title: zh ? "Fun · 康威生命游戏" : "Fun · Game of Life", group: funGroup, keywords: ["life", "conway", "cellular", "生命"], run: scrollTo("mod-life") },

      {
        id: "toggle-theme",
        title: zh
          ? theme === "dark" ? "切换 · 亮色主题" : "切换 · 深色主题"
          : theme === "dark" ? "Switch · Light theme" : "Switch · Dark theme",
        subtitle: theme,
        group: quickGroup,
        keywords: ["theme", "dark", "light", "主题"],
        run: toggleTheme,
      },
      {
        id: "toggle-language",
        title: language === "zh" ? "切换 · English" : "Switch · 中文",
        subtitle: language.toUpperCase(),
        group: quickGroup,
        keywords: ["language", "english", "chinese", "语言"],
        run: toggleLanguage,
      },
      {
        id: "copy-email",
        title: zh ? "复制邮箱地址" : "Copy email address",
        subtitle: personalInfo.email,
        group: quickGroup,
        keywords: ["email", "copy", "邮箱"],
        run: () => {
          if (navigator.clipboard) {
            navigator.clipboard.writeText(personalInfo.email).catch(() => {});
          }
        },
      },

      {
        id: "open-github",
        title: zh ? "打开 · GitHub" : "Open · GitHub",
        subtitle: personalInfo.github,
        group: linkGroup,
        keywords: ["github"],
        run: () => window.open(personalInfo.github, "_blank", "noopener,noreferrer"),
      },
      {
        id: "send-mail",
        title: zh ? "发送邮件" : "Send email",
        subtitle: personalInfo.email,
        group: linkGroup,
        keywords: ["email", "mail", "邮箱"],
        run: () => { window.location.href = `mailto:${personalInfo.email}`; },
      },
    ];
  }, [language, theme, toggleTheme, toggleLanguage]);

  const filtered = useMemo(() => actions.filter((a) => matches(a, query)), [actions, query]);

  useEffect(() => {
    const onKey = (event) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setOpen((value) => !value);
      } else if (event.key === "Escape" && open) {
        event.preventDefault();
        setOpen(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  useEffect(() => {
    if (open) {
      setQuery("");
      setActive(0);
    }
  }, [open]);

  useEffect(() => {
    setActive(0);
  }, [query]);

  useEffect(() => {
    const list = listRef.current;
    if (!list) return;
    const item = list.querySelector(`[data-idx="${active}"]`);
    if (item) item.scrollIntoView({ block: "nearest" });
  }, [active]);

  const runAction = (action) => {
    setOpen(false);
    window.setTimeout(() => action.run(), 40);
  };

  const onInputKeyDown = (event) => {
    if (event.key === "ArrowDown") {
      event.preventDefault();
      setActive((index) => Math.min(index + 1, Math.max(filtered.length - 1, 0)));
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      setActive((index) => Math.max(index - 1, 0));
    } else if (event.key === "Enter") {
      event.preventDefault();
      const action = filtered[active];
      if (action) runAction(action);
    }
  };

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-start justify-center px-4 pt-[15vh]"
      onClick={() => setOpen(false)}
      role="presentation"
    >
      <div className="absolute inset-0 bg-slate-950/65 backdrop-blur-md" />
      <div
        className="relative w-full max-w-xl overflow-hidden rounded-2xl border border-white/10 bg-slate-900/95 shadow-2xl"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="flex items-center gap-3 border-b border-white/10 px-4 py-3">
          <Search size={16} className="text-slate-400" />
          <input
            autoFocus
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            onKeyDown={onInputKeyDown}
            placeholder={language === "zh" ? "搜索命令、导航或模块…" : "Search commands, sections or modules…"}
            className="flex-1 bg-transparent text-slate-100 outline-none placeholder:text-slate-500"
            spellCheck={false}
          />
          <span className="hidden items-center gap-1 rounded border border-white/10 bg-white/5 px-2 py-1 text-xs text-slate-400 sm:inline-flex">ESC</span>
        </div>

        <div ref={listRef} className="max-h-80 overflow-y-auto py-2">
          {filtered.length === 0 ? (
            <p className="px-4 py-8 text-center text-sm text-slate-400">
              {language === "zh" ? "没有匹配的命令" : "No matching commands"}
            </p>
          ) : (
            filtered.map((action, index) => (
              <button
                key={action.id}
                data-idx={index}
                onMouseEnter={() => setActive(index)}
                onClick={() => runAction(action)}
                type="button"
                className={`flex w-full items-center justify-between gap-3 px-4 py-3 text-left transition ${
                  index === active
                    ? "bg-cyan-500/20 text-cyan-100"
                    : "text-slate-200 hover:bg-white/5"
                }`}
              >
                <div className="min-w-0">
                  <p className="truncate text-sm font-medium">{action.title}</p>
                  {action.subtitle ? (
                    <p className="truncate text-xs text-slate-400">{action.subtitle}</p>
                  ) : null}
                </div>
                <span className="inline-flex flex-shrink-0 items-center gap-1 text-xs text-slate-500">
                  <ArrowRight size={12} />
                  {action.group}
                </span>
              </button>
            ))
          )}
        </div>

        <div className="flex items-center justify-between border-t border-white/10 bg-slate-950/60 px-4 py-2 text-xs text-slate-500">
          <span className="inline-flex items-center gap-1">
            <Command size={12} /> K · {language === "zh" ? "打开 / 关闭" : "open / close"}
          </span>
          <span>
            ↑↓ {language === "zh" ? "选择" : "navigate"} · Enter {language === "zh" ? "执行" : "run"}
          </span>
        </div>
      </div>
    </div>
  );
}

export default CommandPalette;
