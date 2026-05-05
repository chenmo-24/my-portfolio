export const learningQuestTracks = [
  {
    id: "web",
    label: { zh: "Web 构建", en: "Web Building" },
    desc: {
      zh: "从组件、状态和响应式体验推进到可部署作品。",
      en: "Move from components, state, and responsive UX toward shippable work.",
    },
    nodes: [
      {
        id: "web-react-components",
        title: { zh: "拆分可靠组件", en: "Split Reliable Components" },
        desc: { zh: "把复杂界面拆成清晰、可复用的 React 组件。", en: "Break complex UI into clear reusable React components." },
        evidence: { zh: "Fun Zone 组件化结构", en: "Componentized Fun Zone structure" },
      },
      {
        id: "web-responsive-ui",
        title: { zh: "响应式体验", en: "Responsive Experience" },
        desc: { zh: "确认手机、平板、桌面端都能顺畅使用。", en: "Verify the site works smoothly on phones, tablets, and desktops." },
        evidence: { zh: "移动端卡片和触控控件", en: "Mobile cards and touch controls" },
      },
      {
        id: "web-deployment",
        title: { zh: "部署闭环", en: "Deployment Loop" },
        desc: { zh: "让作品能稳定构建并发布到静态站点。", en: "Keep the portfolio buildable and deployable as a static site." },
        evidence: { zh: "Vite build + GitHub Pages", en: "Vite build + GitHub Pages" },
      },
    ],
  },
  {
    id: "algorithms",
    label: { zh: "算法训练", en: "Algorithm Training" },
    desc: {
      zh: "把抽象算法变成可观察、可比较、可解释的过程。",
      en: "Turn abstract algorithms into observable, comparable, explainable processes.",
    },
    nodes: [
      {
        id: "algo-search-basics",
        title: { zh: "搜索基础", en: "Search Basics" },
        desc: { zh: "理解 BFS 和 DFS 的访问顺序差异。", en: "Understand traversal differences between BFS and DFS." },
        evidence: { zh: "寻路可视化模块", en: "Pathfinding visualizer" },
      },
      {
        id: "algo-weighted-path",
        title: { zh: "代价与启发", en: "Cost and Heuristic" },
        desc: { zh: "比较 Dijkstra 与 A* 的路径选择。", en: "Compare how Dijkstra and A* choose paths." },
        evidence: { zh: "Algorithm Arena 指标", en: "Algorithm Arena metrics" },
      },
      {
        id: "algo-edge-cases",
        title: { zh: "边界条件", en: "Edge Cases" },
        desc: { zh: "训练无路、起终点重合和墙体阻塞等情况。", en: "Practice blocked, unreachable, and overlapping start/end cases." },
        evidence: { zh: "稳定挑战预设", en: "Stable challenge presets" },
      },
    ],
  },
  {
    id: "engineering",
    label: { zh: "工程实践", en: "Engineering Practice" },
    desc: {
      zh: "用验证、调试和复盘让项目更可靠。",
      en: "Use verification, debugging, and review to make projects more reliable.",
    },
    nodes: [
      {
        id: "eng-debug-flow",
        title: { zh: "调试路径", en: "Debug Flow" },
        desc: { zh: "先复现，再定位，再解释修复。", en: "Reproduce first, isolate second, explain the fix third." },
        evidence: { zh: "Debug Case Lab", en: "Debug Case Lab" },
      },
      {
        id: "eng-progress-state",
        title: { zh: "本地状态", en: "Local State" },
        desc: { zh: "用 localStorage 保存轻量进度并处理失败情况。", en: "Use localStorage for lightweight progress with failure handling." },
        evidence: { zh: "Achievement Passport", en: "Achievement Passport" },
      },
      {
        id: "eng-build-check",
        title: { zh: "构建验证", en: "Build Verification" },
        desc: { zh: "每个阶段都通过生产构建检查。", en: "Pass a production build after each phase." },
        evidence: { zh: "npm run build", en: "npm run build" },
      },
    ],
  },
  {
    id: "open-source",
    label: { zh: "开源观察", en: "Open Source" },
    desc: {
      zh: "通过阅读成熟项目学习产品边界和工程取舍。",
      en: "Study mature projects to learn product boundaries and engineering tradeoffs.",
    },
    nodes: [
      {
        id: "oss-read-code",
        title: { zh: "读项目结构", en: "Read Project Shape" },
        desc: { zh: "从目录、入口和数据流理解一个项目。", en: "Understand a project through its folders, entry points, and data flow." },
        evidence: { zh: "Project Case Files", en: "Project Case Files" },
      },
      {
        id: "oss-compare-tools",
        title: { zh: "比较工具体验", en: "Compare Tool UX" },
        desc: { zh: "观察 CLI、桌面端、Web 工具的不同节奏。", en: "Compare the rhythm of CLI, desktop, and web tools." },
        evidence: { zh: "推荐项目档案", en: "Recommended project case files" },
      },
      {
        id: "oss-write-notes",
        title: { zh: "写复盘笔记", en: "Write Review Notes" },
        desc: { zh: "把学到的结构和取舍记录成自己的判断。", en: "Turn observed structure and tradeoffs into personal judgment." },
        evidence: { zh: "项目档案 Lessons", en: "Project case lessons" },
      },
    ],
  },
];
