export const achievementGroups = [
  {
    id: "exploration",
    label: { zh: "探索", en: "Exploration" },
    items: [
      {
        id: "visit-fun-zone",
        title: { zh: "进入 Fun Zone", en: "Entered Fun Zone" },
        desc: { zh: "浏览互动模块区域。", en: "Visited the interactive module area." },
      },
      {
        id: "open-command-palette",
        title: { zh: "快捷指挥官", en: "Command Navigator" },
        desc: { zh: "打开全局命令面板。", en: "Opened the global command palette." },
      },
      {
        id: "run-terminal-command",
        title: { zh: "终端初试", en: "Terminal Starter" },
        desc: { zh: "执行一次交互式终端命令。", en: "Ran an interactive terminal command." },
      },
      {
        id: "complete-terminal-quest",
        title: { zh: "解开终端谜题", en: "Terminal Quest Solved" },
        desc: { zh: "找到隐藏口令并解锁。", en: "Found the hidden token and unlocked the quest." },
      },
    ],
  },
  {
    id: "algorithms",
    label: { zh: "算法", en: "Algorithms" },
    items: [
      {
        id: "run-pathfinder",
        title: { zh: "路径启动", en: "Pathfinder Started" },
        desc: { zh: "运行一次寻路可视化。", en: "Ran the pathfinding visualizer." },
      },
      {
        id: "complete-arena",
        title: { zh: "竞技场通关", en: "Arena Cleared" },
        desc: { zh: "完成一次算法竞技场挑战。", en: "Completed an Algorithm Arena challenge." },
      },
    ],
  },
  {
    id: "debugging",
    label: { zh: "调试", en: "Debugging" },
    items: [
      {
        id: "solve-bug-hunt",
        title: { zh: "Bug 捕手", en: "Bug Hunter" },
        desc: { zh: "答对一次 Bug Hunt。", en: "Solved a Bug Hunt challenge." },
      },
      {
        id: "complete-debug-case",
        title: { zh: "调试实验员", en: "Debug Lab Solver" },
        desc: { zh: "完成一次 Debug Case Lab。", en: "Completed a Debug Case Lab case." },
      },
    ],
  },
  {
    id: "projects",
    label: { zh: "项目", en: "Projects" },
    items: [
      {
        id: "view-project-case",
        title: { zh: "阅读项目档案", en: "Read a Case File" },
        desc: { zh: "查看一个项目档案。", en: "Viewed a project case file." },
      },
      {
        id: "complete-learning-quest",
        title: { zh: "完成学习节点", en: "Quest Node Complete" },
        desc: { zh: "完成学习路线图中的一个节点。", en: "Completed a learning quest node." },
      },
    ],
  },
  {
    id: "games",
    label: { zh: "游戏", en: "Games" },
    items: [
      {
        id: "play-snake",
        title: { zh: "启动贪吃蛇", en: "Snake Started" },
        desc: { zh: "开始一次贪吃蛇。", en: "Started Snake." },
      },
      {
        id: "play-2048",
        title: { zh: "启动 2048", en: "2048 Started" },
        desc: { zh: "进行一次 2048 操作。", en: "Made a 2048 move." },
      },
      {
        id: "play-life",
        title: { zh: "启动生命游戏", en: "Life Started" },
        desc: { zh: "运行康威生命游戏。", en: "Ran Conway's Game of Life." },
      },
    ],
  },
  {
    id: "consistency",
    label: { zh: "练习", en: "Practice" },
    items: [
      {
        id: "complete-typing",
        title: { zh: "代码打字完成", en: "Typing Round Complete" },
        desc: { zh: "完成一次代码打字挑战。", en: "Completed one code typing round." },
      },
      {
        id: "copy-quiz-result",
        title: { zh: "分享开发者画像", en: "Shared Builder Profile" },
        desc: { zh: "复制代码人格测试结果。", en: "Copied the developer quiz result." },
      },
      {
        id: "add-checkin",
        title: { zh: "今日打卡", en: "Daily Check-in" },
        desc: { zh: "添加一次学习打卡。", en: "Added one study check-in." },
      },
    ],
  },
];

export const achievements = achievementGroups.flatMap((group) =>
  group.items.map((item) => ({ ...item, group: group.id }))
);
