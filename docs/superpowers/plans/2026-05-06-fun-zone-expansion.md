# Fun Zone Expansion Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build five connected Fun Zone additions: Achievement Passport, Learning Quest Map, Project Case Files, Algorithm Arena, and Debug Case Lab.

**Architecture:** Add a small shared `localStorage` progress layer, structured bilingual data files, and five focused React components. Wire the new modules into `FunZone` and `CommandPalette`, then add low-risk achievement hooks to selected existing modules.

**Tech Stack:** React 18, Vite 5, Tailwind CSS 3, lucide-react, browser `localStorage`.

---

## File Structure

- Create `src/utils/progressStore.js`: versioned progress storage, achievement unlock helpers, listeners, and safe fallback behavior.
- Create `src/data/achievements.js`: achievement definitions grouped by exploration, algorithms, debugging, projects, games, and consistency.
- Create `src/data/learningQuests.js`: Web, Algorithms, Engineering, and Open Source quest tracks.
- Create `src/data/projectCases.js`: case files for this portfolio and study/reference projects.
- Create `src/data/algorithmArena.js`: deterministic challenge presets.
- Create `src/data/debugCases.js`: debug lab cases.
- Create `src/components/AchievementPassport.jsx`: progress dashboard, grouped badges, reset control.
- Create `src/components/LearningQuestMap.jsx`: responsive quest track map.
- Create `src/components/ProjectCaseFiles.jsx`: responsive case file browser.
- Create `src/components/AlgorithmArena.jsx`: deterministic pathfinding challenge module.
- Create `src/components/DebugCaseLab.jsx`: issue/code/fix debugging challenge module.
- Modify `src/components/FunZone.jsx`: import and place new modules; unlock visit achievement.
- Modify `src/components/CommandPalette.jsx`: add navigation entries for new modules; unlock palette achievements.
- Modify selected existing modules with safe hooks:
  - `InteractiveTerminal.jsx`
  - `TerminalQuest.jsx`
  - `BugHunt.jsx`
  - `DeveloperQuiz.jsx`
  - `CodeTyping.jsx`
  - `SnakeGame.jsx`
  - `Game2048.jsx`
  - `GameOfLife.jsx`
  - `AlgorithmVisualizer.jsx`
  - `CheckinCalendar.jsx`

## Task 1: Shared Progress Store

**Files:**
- Create: `src/utils/progressStore.js`

- [ ] **Step 1: Create progress store**

Create `src/utils/progressStore.js` with:

```js
const STORAGE_KEY = "chenmo-portfolio-progress-v1";
const PROGRESS_EVENT = "chenmo-progress-change";

const DEFAULT_PROGRESS = {
  version: 1,
  achievements: [],
  quests: [],
  viewedCases: [],
  arena: {},
  debugCases: [],
  interactions: {},
  recent: [],
};

let memoryProgress = { ...DEFAULT_PROGRESS };

function canUseStorage() {
  return typeof window !== "undefined" && typeof window.localStorage !== "undefined";
}

function normalizeProgress(value) {
  if (!value || value.version !== 1) return { ...DEFAULT_PROGRESS };
  return {
    ...DEFAULT_PROGRESS,
    ...value,
    achievements: Array.isArray(value.achievements) ? value.achievements : [],
    quests: Array.isArray(value.quests) ? value.quests : [],
    viewedCases: Array.isArray(value.viewedCases) ? value.viewedCases : [],
    arena: value.arena && typeof value.arena === "object" ? value.arena : {},
    debugCases: Array.isArray(value.debugCases) ? value.debugCases : [],
    interactions: value.interactions && typeof value.interactions === "object" ? value.interactions : {},
    recent: Array.isArray(value.recent) ? value.recent.slice(0, 8) : [],
  };
}

export function getProgress() {
  if (!canUseStorage()) return normalizeProgress(memoryProgress);
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return normalizeProgress(memoryProgress);
    const parsed = JSON.parse(raw);
    memoryProgress = normalizeProgress(parsed);
    return memoryProgress;
  } catch {
    return normalizeProgress(memoryProgress);
  }
}

function emitProgressChange(progress) {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new CustomEvent(PROGRESS_EVENT, { detail: progress }));
}

export function saveProgress(updater) {
  const current = getProgress();
  const next = normalizeProgress(typeof updater === "function" ? updater(current) : updater);
  memoryProgress = next;
  if (canUseStorage()) {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    } catch {
      // Keep memory fallback; UI should not crash when storage is blocked.
    }
  }
  emitProgressChange(next);
  return next;
}

function uniqueAppend(list, id) {
  return list.includes(id) ? list : [...list, id];
}

function recentEntry(type, id) {
  return { type, id, at: new Date().toISOString() };
}

export function unlockAchievement(id) {
  return saveProgress((progress) => {
    if (progress.achievements.includes(id)) return progress;
    return {
      ...progress,
      achievements: [...progress.achievements, id],
      recent: [recentEntry("achievement", id), ...progress.recent].slice(0, 8),
    };
  });
}

export function completeQuest(id) {
  return saveProgress((progress) => ({
    ...progress,
    quests: uniqueAppend(progress.quests, id),
    recent: progress.quests.includes(id)
      ? progress.recent
      : [recentEntry("quest", id), ...progress.recent].slice(0, 8),
  }));
}

export function viewCase(id) {
  return saveProgress((progress) => ({
    ...progress,
    viewedCases: uniqueAppend(progress.viewedCases, id),
  }));
}

export function completeDebugCase(id) {
  return saveProgress((progress) => ({
    ...progress,
    debugCases: uniqueAppend(progress.debugCases, id),
    recent: progress.debugCases.includes(id)
      ? progress.recent
      : [recentEntry("debug", id), ...progress.recent].slice(0, 8),
  }));
}

export function recordArenaResult(id, result) {
  return saveProgress((progress) => {
    const previous = progress.arena[id];
    const bestScore = Math.max(previous?.bestScore ?? 0, result.score ?? 0);
    return {
      ...progress,
      arena: {
        ...progress.arena,
        [id]: {
          attempts: (previous?.attempts ?? 0) + 1,
          bestScore,
          last: result,
        },
      },
      recent: [recentEntry("arena", id), ...progress.recent].slice(0, 8),
    };
  });
}

export function recordInteraction(id) {
  return saveProgress((progress) => ({
    ...progress,
    interactions: {
      ...progress.interactions,
      [id]: (progress.interactions[id] ?? 0) + 1,
    },
  }));
}

export function resetProgress() {
  return saveProgress({ ...DEFAULT_PROGRESS });
}

export function subscribeProgress(listener) {
  if (typeof window === "undefined") return () => {};
  const handler = (event) => listener(event.detail ?? getProgress());
  window.addEventListener(PROGRESS_EVENT, handler);
  return () => window.removeEventListener(PROGRESS_EVENT, handler);
}
```

- [ ] **Step 2: Build to verify syntax**

Run: `npm run build`

Expected: build completes without syntax errors.

## Task 2: Data Definitions

**Files:**
- Create: `src/data/achievements.js`
- Create: `src/data/learningQuests.js`
- Create: `src/data/projectCases.js`
- Create: `src/data/algorithmArena.js`
- Create: `src/data/debugCases.js`

- [ ] **Step 1: Add achievement data**

Create achievement IDs used by new and existing modules. Include at least these IDs:

```js
export const achievementGroups = [
  {
    id: "exploration",
    label: { zh: "探索", en: "Exploration" },
    items: [
      { id: "visit-fun-zone", title: { zh: "进入 Fun Zone", en: "Entered Fun Zone" }, desc: { zh: "浏览互动模块区域。", en: "Visited the interactive module area." } },
      { id: "open-command-palette", title: { zh: "快捷指挥官", en: "Command Navigator" }, desc: { zh: "打开全局命令面板。", en: "Opened the global command palette." } },
      { id: "run-terminal-command", title: { zh: "终端初试", en: "Terminal Starter" }, desc: { zh: "执行一次交互式终端命令。", en: "Ran an interactive terminal command." } },
      { id: "complete-terminal-quest", title: { zh: "解开终端谜题", en: "Terminal Quest Solved" }, desc: { zh: "找到隐藏口令并解锁。", en: "Found the hidden token and unlocked the quest." } },
    ],
  },
  {
    id: "algorithms",
    label: { zh: "算法", en: "Algorithms" },
    items: [
      { id: "run-pathfinder", title: { zh: "路径启动", en: "Pathfinder Started" }, desc: { zh: "运行一次寻路可视化。", en: "Ran the pathfinding visualizer." } },
      { id: "complete-arena", title: { zh: "竞技场通关", en: "Arena Cleared" }, desc: { zh: "完成一次算法竞技场挑战。", en: "Completed an Algorithm Arena challenge." } },
    ],
  },
  {
    id: "debugging",
    label: { zh: "调试", en: "Debugging" },
    items: [
      { id: "solve-bug-hunt", title: { zh: "Bug 捕手", en: "Bug Hunter" }, desc: { zh: "答对一次 Bug Hunt。", en: "Solved a Bug Hunt challenge." } },
      { id: "complete-debug-case", title: { zh: "调试实验员", en: "Debug Lab Solver" }, desc: { zh: "完成一次 Debug Case Lab。", en: "Completed a Debug Case Lab case." } },
    ],
  },
  {
    id: "projects",
    label: { zh: "项目", en: "Projects" },
    items: [
      { id: "view-project-case", title: { zh: "阅读项目档案", en: "Read a Case File" }, desc: { zh: "查看一个项目档案。", en: "Viewed a project case file." } },
      { id: "complete-learning-quest", title: { zh: "完成学习节点", en: "Quest Node Complete" }, desc: { zh: "完成学习路线图中的一个节点。", en: "Completed a learning quest node." } },
    ],
  },
  {
    id: "games",
    label: { zh: "游戏", en: "Games" },
    items: [
      { id: "play-snake", title: { zh: "启动贪吃蛇", en: "Snake Started" }, desc: { zh: "开始一次贪吃蛇。", en: "Started Snake." } },
      { id: "play-2048", title: { zh: "启动 2048", en: "2048 Started" }, desc: { zh: "进行一次 2048 操作。", en: "Made a 2048 move." } },
      { id: "play-life", title: { zh: "启动生命游戏", en: "Life Started" }, desc: { zh: "运行康威生命游戏。", en: "Ran Conway's Game of Life." } },
    ],
  },
  {
    id: "consistency",
    label: { zh: "练习", en: "Practice" },
    items: [
      { id: "complete-typing", title: { zh: "代码打字完成", en: "Typing Round Complete" }, desc: { zh: "完成一次代码打字挑战。", en: "Completed one code typing round." } },
      { id: "copy-quiz-result", title: { zh: "分享开发者画像", en: "Shared Builder Profile" }, desc: { zh: "复制代码人格测试结果。", en: "Copied the developer quiz result." } },
      { id: "add-checkin", title: { zh: "今日打卡", en: "Daily Check-in" }, desc: { zh: "添加一次学习打卡。", en: "Added one study check-in." } },
    ],
  },
];

export const achievements = achievementGroups.flatMap((group) =>
  group.items.map((item) => ({ ...item, group: group.id }))
);
```

- [ ] **Step 2: Add quest, case, arena, and debug data**

Use arrays with stable IDs. Each item must include bilingual `title` and `desc` fields. Challenge data should be deterministic and small enough for mobile.

- [ ] **Step 3: Build to verify exports**

Run: `npm run build`

Expected: build completes.

## Task 3: Achievement Passport

**Files:**
- Create: `src/components/AchievementPassport.jsx`
- Modify: `src/components/FunZone.jsx`
- Modify: `src/components/CommandPalette.jsx`

- [ ] **Step 1: Create the passport component**

Implement a panel that imports `achievementGroups`, `getProgress`, `resetProgress`, and `subscribeProgress`. It should:

- Show unlocked count and total count.
- Render grouped badges.
- Render recent events.
- Confirm before reset.
- Use responsive grids: one column on phones, two or three columns on larger screens.

- [ ] **Step 2: Wire into Fun Zone**

Import `AchievementPassport` in `FunZone.jsx`, add it near the top of `modules`, and call `unlockAchievement("visit-fun-zone")` in a `useEffect` when `FunZone` mounts.

- [ ] **Step 3: Wire command palette achievements**

In `CommandPalette.jsx`, call `unlockAchievement("open-command-palette")` when the palette opens. Add navigation actions for:

- `mod-passport`
- `mod-quest-map`
- `mod-case-files`
- `mod-arena`
- `mod-debug-lab`

- [ ] **Step 4: Build**

Run: `npm run build`

Expected: build completes.

## Task 4: Learning Quest Map

**Files:**
- Create: `src/components/LearningQuestMap.jsx`
- Modify: `src/components/FunZone.jsx`
- Modify: `src/components/CommandPalette.jsx`

- [ ] **Step 1: Build the component**

Use `learningQuestTracks` data and progress helpers. The component should show track tabs, node cards, selected node detail, and a complete button for available nodes.

- [ ] **Step 2: Connect progress**

When a node is completed, call:

```js
completeQuest(node.id);
unlockAchievement("complete-learning-quest");
```

- [ ] **Step 3: Add to Fun Zone and command palette**

Use id `mod-quest-map`.

- [ ] **Step 4: Build**

Run: `npm run build`

Expected: build completes.

## Task 5: Project Case Files

**Files:**
- Create: `src/components/ProjectCaseFiles.jsx`
- Modify: `src/components/FunZone.jsx`
- Modify: `src/components/CommandPalette.jsx`

- [ ] **Step 1: Build the component**

Use `projectCases` data. The component should show a file list, selected case details, stack tags, lessons, and next steps.

- [ ] **Step 2: Connect progress**

When a case is selected, call:

```js
viewCase(caseItem.id);
unlockAchievement("view-project-case");
```

- [ ] **Step 3: Add to Fun Zone and command palette**

Use id `mod-case-files`.

- [ ] **Step 4: Build**

Run: `npm run build`

Expected: build completes.

## Task 6: Algorithm Arena

**Files:**
- Create: `src/components/AlgorithmArena.jsx`
- Modify: `src/components/FunZone.jsx`
- Modify: `src/components/CommandPalette.jsx`

- [ ] **Step 1: Build deterministic pathfinding helpers inside the component**

Implement small helpers for `keyOf`, `neighbors`, `heuristic`, `reconstructPath`, and `runSearch`. Keep the grid smaller than the existing visualizer so mobile controls remain usable.

- [ ] **Step 2: Render challenge UI**

Render challenge selector, algorithm selector, grid, result metrics, and run button. Use fixed aspect ratio cells and stable button sizes.

- [ ] **Step 3: Connect progress**

On successful run, call:

```js
recordArenaResult(challenge.id, { algorithm, visited, path, score });
unlockAchievement("complete-arena");
```

- [ ] **Step 4: Add to Fun Zone and command palette**

Use id `mod-arena`.

- [ ] **Step 5: Build**

Run: `npm run build`

Expected: build completes.

## Task 7: Debug Case Lab

**Files:**
- Create: `src/components/DebugCaseLab.jsx`
- Modify: `src/components/FunZone.jsx`
- Modify: `src/components/CommandPalette.jsx`

- [ ] **Step 1: Build the component**

Use `debugCases` data. Render case selector, issue summary, code block, choices, result explanation, and corrected snippet.

- [ ] **Step 2: Connect progress**

When the user chooses the correct answer, call:

```js
completeDebugCase(caseItem.id);
unlockAchievement("complete-debug-case");
```

- [ ] **Step 3: Add to Fun Zone and command palette**

Use id `mod-debug-lab`.

- [ ] **Step 4: Build**

Run: `npm run build`

Expected: build completes.

## Task 8: Existing Module Hooks

**Files:**
- Modify selected existing interactive modules.

- [ ] **Step 1: Add minimal imports**

Import `unlockAchievement` only where needed.

- [ ] **Step 2: Add low-risk hooks**

Add these hooks:

- `InteractiveTerminal`: after a non-empty command is handled, unlock `run-terminal-command`.
- `TerminalQuest`: after successful unlock, unlock `complete-terminal-quest`.
- `BugHunt`: after a correct answer, unlock `solve-bug-hunt`.
- `DeveloperQuiz`: after copying result, unlock `copy-quiz-result`.
- `CodeTyping`: after completing a snippet, unlock `complete-typing`.
- `SnakeGame`: when game starts or first direction is pressed, unlock `play-snake`.
- `Game2048`: after a valid move, unlock `play-2048`.
- `GameOfLife`: when simulation starts, unlock `play-life`.
- `AlgorithmVisualizer`: when a search starts, unlock `run-pathfinder`.
- `CheckinCalendar`: when a day is checked in, unlock `add-checkin`.

- [ ] **Step 3: Build**

Run: `npm run build`

Expected: build completes.

## Task 9: Responsive and Polish Pass

**Files:**
- Modify new components and `src/index.css` only if component-local classes are insufficient.

- [ ] **Step 1: Scan for overflow-prone text and controls**

Check new modules for long labels, multi-column layouts, and narrow buttons. Ensure mobile layouts use single-column stacking and `min-w-0` where needed.

- [ ] **Step 2: Production build**

Run: `npm run build`

Expected: build completes.

- [ ] **Step 3: Browser verification**

Start local preview:

```powershell
npm run dev -- --host 127.0.0.1
```

Open the app in browser and verify widths around 390, 412, 768, 1280, and 1440 px. Expected: no horizontal overflow, no overlapping text, all controls usable by touch.

## Task 10: Documentation Update

**Files:**
- Modify: `README.md`

- [ ] **Step 1: Update Fun Zone module list**

Add the five new modules to the English and Chinese Fun Zone sections.

- [ ] **Step 2: Build**

Run: `npm run build`

Expected: build completes.

## Self-Review Notes

Spec coverage:

- Achievement Passport is covered by Tasks 1, 2, 3, and 8.
- Learning Quest Map is covered by Tasks 1, 2, and 4.
- Project Case Files is covered by Tasks 1, 2, and 5.
- Algorithm Arena is covered by Tasks 1, 2, and 6.
- Debug Case Lab is covered by Tasks 1, 2, and 7.
- Responsive compatibility is covered by Task 9.
- Documentation is covered by Task 10.

The plan avoids backend work, accounts, external analytics, and new heavy dependencies.
