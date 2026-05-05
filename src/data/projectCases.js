export const projectCases = [
  {
    id: "portfolio",
    title: { zh: "chenmo-24 Portfolio", en: "chenmo-24 Portfolio" },
    type: { zh: "个人作品集", en: "Personal Portfolio" },
    stack: ["React", "Vite", "Tailwind CSS", "localStorage"],
    context: {
      zh: "一个面向学生开发者的单页作品集，强调交互、算法和工程化实践。",
      en: "A single-page portfolio for a student developer, focused on interaction, algorithms, and engineering practice.",
    },
    role: { zh: "设计、实现、验证", en: "Design, implementation, verification" },
    problem: {
      zh: "普通作品集容易只展示静态信息，缺少能体现动手能力的体验。",
      en: "Typical portfolios often stay static and do not show hands-on building ability.",
    },
    solution: {
      zh: "把项目展示、命令面板、终端、算法可视化和小游戏组合成一个可探索的开发者空间。",
      en: "Combine projects, command palette, terminal UI, algorithm visualization, and mini-games into an explorable developer space.",
    },
    lesson: {
      zh: "有趣的模块需要服务于个人定位，否则只是堆功能。",
      en: "Fun modules need to support the personal positioning, otherwise they are just feature stacking.",
    },
    next: { zh: "继续补齐真实项目档案和工程复盘。", en: "Add more real project case files and engineering reviews." },
  },
  {
    id: "cherry-studio",
    title: { zh: "Cherry Studio", en: "Cherry Studio" },
    type: { zh: "开源观察", en: "Open-source Study" },
    stack: ["Electron", "AI Client", "Desktop App"],
    context: {
      zh: "成熟的桌面 AI 客户端，适合观察多模型工作流和产品化界面组织。",
      en: "A mature desktop AI client useful for studying multi-model workflow and productized interface organization.",
    },
    role: { zh: "体验研究", en: "Experience study" },
    problem: {
      zh: "多模型工具容易让入口和状态变复杂。",
      en: "Multi-model tools can quickly become complex in navigation and state.",
    },
    solution: {
      zh: "通过清晰的信息架构和桌面端交互模式降低复杂度。",
      en: "Use clear information architecture and desktop interaction patterns to reduce complexity.",
    },
    lesson: {
      zh: "工具型产品要让高频操作足够近，低频设置足够稳。",
      en: "Tooling products should keep frequent actions close and infrequent settings stable.",
    },
    next: { zh: "对比它和 Web 工具的信息密度。", en: "Compare its information density with web tools." },
  },
  {
    id: "copyq",
    title: { zh: "CopyQ", en: "CopyQ" },
    type: { zh: "工具演进", en: "Tool Evolution" },
    stack: ["Qt", "Clipboard", "Scripting"],
    context: {
      zh: "一个长期演进的剪贴板管理工具，功能密度高且脚本能力强。",
      en: "A long-lived clipboard manager with dense functionality and strong scripting support.",
    },
    role: { zh: "工程取舍观察", en: "Engineering tradeoff study" },
    problem: {
      zh: "实用工具需要同时支持新手入口和高级能力。",
      en: "Practical tools need to support both beginner entry points and advanced capability.",
    },
    solution: {
      zh: "把常用操作、搜索、历史和脚本能力放进可持续扩展的结构中。",
      en: "Place common actions, search, history, and scripting inside an extensible structure.",
    },
    lesson: {
      zh: "长期维护的工具最考验边界和默认值。",
      en: "Long-maintained tools are shaped by boundaries and defaults.",
    },
    next: { zh: "学习它如何处理高密度设置。", en: "Study how it handles high-density settings." },
  },
];
