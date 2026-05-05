# Fun Zone Expansion Design

Date: 2026-05-06
Project: `chenmo-24 Portfolio`

## Goal

Expand the existing Fun Zone into a connected developer playground while preserving the current single-page portfolio flow. The implementation will add five features:

- Achievement Passport
- Learning Quest Map
- Project Case Files
- Algorithm Arena
- Debug Case Lab

All progress is stored in the visitor's current browser with `localStorage`. There is no account system, backend, cross-device sync, or external API requirement.

## Chosen Approach

Use a hybrid structure.

The existing Fun Zone remains a vertical sequence of modules. A new Achievement Passport appears near the top and acts as the system-level progress summary. The four new content modules appear as polished cards in the same Fun Zone flow. Existing modules stay in place but emit small progress events when users interact with them.

This avoids a large redesign, keeps mobile browsing straightforward, and gives the page a stronger sense of progression.

## Architecture

### Shared Progress Layer

Create a small utility module:

- `src/utils/progressStore.js`

Responsibilities:

- Read and write one `localStorage` object under a versioned key such as `chenmo-portfolio-progress-v1`.
- Track unlocked achievement IDs.
- Track quest completion IDs.
- Track project case views.
- Track Algorithm Arena attempts and best scores.
- Track Debug Case Lab completions.
- Expose helpers that are safe when `window` or `localStorage` is unavailable.
- Dispatch a browser event after progress changes so mounted components can refresh.

The store should fail gracefully. If `localStorage` is blocked, the UI still renders and progress changes stay in memory for the current session where practical.

### Data Files

Add structured data files:

- `src/data/achievements.js`
- `src/data/learningQuests.js`
- `src/data/projectCases.js`
- `src/data/algorithmArena.js`
- `src/data/debugCases.js`

Data should stay bilingual with the current `{ zh, en }` style used elsewhere in the project.

### Components

Add components:

- `src/components/AchievementPassport.jsx`
- `src/components/LearningQuestMap.jsx`
- `src/components/ProjectCaseFiles.jsx`
- `src/components/AlgorithmArena.jsx`
- `src/components/DebugCaseLab.jsx`

Update:

- `src/components/FunZone.jsx`
- `src/components/CommandPalette.jsx`
- Selected existing interactive modules with lightweight achievement hooks.

## Module Designs

### Achievement Passport

Purpose: Tie the existing and new modules together.

Behavior:

- Shows total unlocked achievements, completion percentage, and recent unlocks.
- Groups badges by category: exploration, algorithms, debugging, projects, games, consistency.
- Includes a reset progress control with confirmation.
- Unlocks achievements from both existing and new modules.

Initial achievement examples:

- Visit Fun Zone.
- Open the command palette.
- Complete Terminal Quest.
- Run a command in Interactive Terminal.
- Complete a Debug Case Lab case.
- Finish an Algorithm Arena challenge.
- View all Project Case Files.
- Complete a Learning Quest Map node.
- Start Snake, 2048, or Game of Life.

### Learning Quest Map

Purpose: Turn the portfolio's learning story into a visible progression system.

Behavior:

- Displays tracks for Web, Algorithms, Engineering, and Open Source.
- Each track contains nodes with status: locked, available, completed.
- Completing a node updates local progress and may unlock achievements.
- Nodes include short evidence text, not long explanations.
- The module suggests a next action based on incomplete available nodes.

Mobile layout:

- Track selector at the top.
- Nodes become a vertical timeline.

Tablet and desktop layout:

- Two-column layout with a map on the left and selected node details on the right.

### Project Case Files

Purpose: Strengthen professional credibility beyond fun interactions.

Behavior:

- Presents project case files with fields: context, role, stack, problem, solution, lesson, next step.
- Starts with this portfolio itself as a case, plus current recommended/open-source study cases.
- Shows a compact file list and a selected case detail panel.
- Viewing case files can unlock progress.

Mobile layout:

- Case list is a horizontal scroll or compact segmented selector.
- Detail panel appears below.

Desktop layout:

- File list on the left, case detail on the right.

### Algorithm Arena

Purpose: Upgrade the existing algorithm visual theme into a challenge module.

Behavior:

- Provides small pathfinding challenges using BFS, DFS, Dijkstra, and A*.
- User chooses an algorithm, runs the challenge, and receives metrics: visited cells, path length, score, and status.
- Challenge presets stay deterministic so results are stable across devices.
- The module favors clarity and reliable interaction over complex animations.

Mobile layout:

- Touch-safe controls above the grid.
- Grid uses fixed aspect ratio and avoids tiny hit targets.

Desktop layout:

- Controls and metrics can sit beside the grid.

### Debug Case Lab

Purpose: Show engineering reasoning through small debugging cases.

Behavior:

- Presents issue reports with code snippets and observed output.
- User selects the likely fix or root cause.
- After answering, the module shows explanation, corrected snippet, and lesson.
- Completion updates progress and achievements.

Mobile layout:

- Issue, snippet, choices, and explanation stack vertically.

Desktop layout:

- Code and choices can be shown side by side.

## Existing Module Instrumentation

Add small progress hooks without changing core behavior.

Candidate hooks:

- `CommandPalette`: unlock when opened and when a Fun Zone command is run.
- `InteractiveTerminal`: unlock after first valid command.
- `TerminalQuest`: unlock when the hidden token is solved.
- `BugHunt`: unlock when a challenge is answered correctly.
- `DeveloperQuiz`: unlock when a result is copied.
- `CodeTyping`: unlock after completing a typing round.
- `SnakeGame`, `Game2048`, `GameOfLife`: unlock on first play/start.
- `AlgorithmVisualizer`: unlock after running a search.
- `CheckinCalendar`: unlock after adding a check-in.

Instrumentation should be minimal. If a module is complex or risky, it can receive only a simple "first interaction" achievement in the first implementation pass.

## Responsive Compatibility

Target devices:

- iPhone and Android phones.
- Tablets.
- macOS, Windows, and Linux desktop browsers.

Rules:

- No hover-only interaction.
- All interactive controls must be reachable by touch.
- Buttons should keep stable dimensions and avoid text overflow.
- Complex modules must collapse to single-column layouts under mobile breakpoints.
- Use existing Tailwind responsive patterns and existing `panel-card`, `glass-panel`, `section-title`, and button classes.
- Avoid adding heavy libraries.
- Respect reduced-motion settings where animation is introduced.
- Keep grids playable on narrow screens with fixed aspect ratios and touch-safe cell sizes.

## Error Handling

- If `localStorage` read fails, use default empty progress.
- If `localStorage` write fails, do not crash the UI.
- Reset progress requires confirmation.
- Invalid data versions should be ignored or migrated to the current default shape.

## Testing and Verification

Run:

- `npm run build`

Manual browser checks:

- Mobile narrow viewport around 390px width.
- Android-style width around 412px.
- Tablet width around 768px.
- Desktop widths around 1280px and 1440px.

Verify:

- No horizontal overflow.
- Text does not overlap or escape controls.
- New modules remain usable with touch.
- Existing Fun Zone modules still render.
- Theme and language toggles still work.
- Command palette can navigate to new modules.
- Progress persists after refresh.
- Reset progress works.

## Implementation Phases

### Phase 1: Progress Foundation and Achievement Passport

- Add shared progress store.
- Add achievement data.
- Add Achievement Passport.
- Wire basic hooks into Fun Zone and a small set of existing modules.
- Add command palette entries.
- Verify build and responsive layout.

### Phase 2: Learning Quest Map and Project Case Files

- Add data and components for quest map and case files.
- Connect completion/view events to progress store.
- Add command palette entries.
- Verify mobile and tablet layouts.

### Phase 3: Algorithm Arena and Debug Case Lab

- Add data and components for challenge modules.
- Connect scoring and completion to progress store.
- Add command palette entries.
- Verify touch controls, grid sizing, and no layout overflow.

### Phase 4: Polish and Cross-Device Verification

- Review copy, spacing, and badge states.
- Add additional lightweight hooks to existing modules where safe.
- Run production build.
- Perform responsive browser checks.

## Non-Goals

- No backend.
- No login.
- No real cross-device sync.
- No external analytics.
- No new animation or game library.
- No full redesign of the homepage.

## Approval State

The selected strategy is "phased, still complete." The selected page organization is "hybrid structure." Progress storage is `localStorage`.
