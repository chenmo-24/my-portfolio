<div align="center">

# chenmo-24 · Portfolio

![README Preview](./public/readme-preview.svg)

**[中文](#中文) · [English](#english)**

</div>

---

<a id="中文"></a>

## 中文

> 切到 [English ↓](#english)

基于 **Vite + React 18 + Tailwind CSS** 构建的单页作品集网站。支持中英双语、深浅色切换，内置 11 个 Fun Zone 交互模块（算法进度、技能雷达、打卡日历、GitHub 活跃度、交互式终端、打字挑战、贪吃蛇、2048、康威生命游戏等），并通过 GitHub Actions 自动部署到 GitHub Pages。

### 技术栈

- **Vite 5** — 极速开发与构建
- **React 18** — 组件化 UI
- **Tailwind CSS 3** — 原子化样式
- **Lucide React** — 图标库

### 功能特色

- 默认深色主题，一键切换浅色
- 默认中文界面，一键切换英文
- 单页滚动导航 + IntersectionObserver 自动高亮当前区块
- Hero 终端卡片、状态条、日志面板与滚动引导
- 推荐项目与个人项目双视图展示
- Fun Zone 11 个交互模块：算法进度 / 技能雷达 / 每日语录 / Now 页 / 打卡日历 / GitHub 活跃度 / 交互式终端 / 打字挑战 / 贪吃蛇 / 2048 / 康威生命游戏
- `Cmd/Ctrl + K` 全局命令面板，快速跳转与切换
- Konami Code 彩蛋（↑↑↓↓←→←→BA）
- 本地存储打卡记录与 2048 最高分
- GitHub Pages 自动部署工作流

### 本地运行

```bash
git clone https://github.com/chenmo-24/my-portfolio.git
cd my-portfolio
npm install
npm run dev
```

默认开发地址通常是 `http://localhost:5173`。

### 构建与预览

```bash
npm run build
npm run preview
```

### 部署说明

项目已经配置好：

- `vite.config.js` 中的 `base: '/my-portfolio/'`
- `.github/workflows/deploy.yml` GitHub Pages 自动部署
- `index.html` 中的 favicon、OG、Twitter Card 元信息
- `public/og-cover.svg` 作为社交分享封面

#### GitHub Pages 自动部署

1. 将仓库推送到 `main` 分支
2. 进入仓库 Settings → Pages
3. **Build and deployment** 选择 **GitHub Actions**
4. 之后每次推送到 `main` 都会自动构建并部署

#### 部署前最终检查

- 仓库名仍为 `my-portfolio`
- GitHub 用户名仍为 `chenmo-24`
- `vite.config.js` 中 `base` 仍是 `/my-portfolio/`
- `index.html` 中的 OG 地址指向 `https://chenmo-24.github.io/my-portfolio/og-cover.svg`
- GitHub Pages Source 已设置为 **GitHub Actions**

### 项目结构

```text
my-portfolio/
|-- index.html
|-- package.json
|-- vite.config.js
|-- tailwind.config.js
|-- postcss.config.js
|-- README.md
|-- .github/workflows/deploy.yml
|-- public/
|   |-- favicon.svg
|   |-- og-cover.svg
|   `-- readme-preview.svg
`-- src/
    |-- main.jsx
    |-- App.jsx
    |-- index.css
    |-- data/         # personalInfo / projects / quotes / skills / githubStats ...
    |-- components/   # Hero / About / Projects / FunZone / GameOfLife / Konami ...
    `-- hooks/        # useTheme / useLanguage
```

### 自定义修改

| 想改什么 | 去这里 |
| --- | --- |
| 个人信息 | `src/data/personalInfo.js` |
| 推荐/个人项目 | `src/data/projects.js` |
| 每日语录 | `src/data/quotes.js` |
| 算法进度 | `src/data/algorithmProgress.js` |
| 技能雷达 | `src/data/skills.js` |
| Now 页 | `src/data/nowPage.js` |
| GitHub 活跃度 | `src/data/githubStats.js` |
| 打字片段 | `src/data/codeSnippets.js` |
| 打卡逻辑 | `src/components/CheckinCalendar.jsx` |
| Hero 终端动画 | `src/components/Hero.jsx` |
| 主题 / 全局动效 | `src/index.css` |

### 修改用户名或仓库名时需同步调整

- `vite.config.js` 中的 `base`
- `index.html` 中的 `og:url` / `og:image` / `twitter:image`
- `src/data/personalInfo.js` 中的 GitHub 链接
- `src/data/githubStats.js` 中的仓库 URL
- 本 README 里的仓库地址
- GitHub 仓库 Pages 配置

### 常见问题排查

**端口被占用**

```bash
npm run dev -- --host 0.0.0.0 --port 4173
```

**node_modules 权限异常 / 依赖安装失败**

```bash
rm -rf node_modules package-lock.json
npm cache clean --force
npm install
```

**GitHub Pages 页面空白**

优先检查：
- `base` 配置是否正确
- 部署产物是否来自 `dist/`
- Pages 是否启用了 **GitHub Actions**
- 资源地址是否仍带 `/my-portfolio/` 前缀

---

<a id="english"></a>

## English

> Switch to [中文 ↑](#中文)

A single-page portfolio site built with **Vite + React 18 + Tailwind CSS**. It ships with bilingual (zh/en) UI, light/dark theme switching, and 11 interactive Fun Zone modules (algorithm tracker, skill radar, check-in calendar, GitHub stats, interactive terminal, typing challenge, Snake, 2048, Conway's Game of Life, and more), auto-deployed to GitHub Pages via GitHub Actions.

### Tech Stack

- **Vite 5** — blazing-fast dev and build
- **React 18** — component-based UI
- **Tailwind CSS 3** — utility-first styling
- **Lucide React** — icon set

### Features

- Dark theme by default, one-click toggle to light
- Chinese by default, one-click toggle to English
- Single-page scroll navigation with IntersectionObserver-driven section highlighting
- Hero terminal card, status bar, log panel, and scroll cue
- Featured and personal projects shown in dual views
- Fun Zone with 11 interactive modules: algorithm tracker, skill radar, daily quote, Now page, check-in calendar, GitHub activity, interactive terminal, typing challenge, Snake, 2048, and Conway's Game of Life
- Global `Cmd/Ctrl + K` command palette for quick navigation and toggles
- Konami Code easter egg (↑↑↓↓←→←→BA)
- localStorage-backed check-in history and 2048 best score
- GitHub Pages auto-deploy workflow

### Run Locally

```bash
git clone https://github.com/chenmo-24/my-portfolio.git
cd my-portfolio
npm install
npm run dev
```

The default dev server usually runs at `http://localhost:5173`.

### Build and Preview

```bash
npm run build
npm run preview
```

### Deployment

Already configured:

- `base: '/my-portfolio/'` in `vite.config.js`
- `.github/workflows/deploy.yml` for GitHub Pages auto-deploy
- favicon / OG / Twitter Card metadata in `index.html`
- `public/og-cover.svg` as the social share cover

#### GitHub Pages Auto-Deploy

1. Push the repo to the `main` branch
2. Go to repo **Settings → Pages**
3. Set **Build and deployment** to **GitHub Actions**
4. Every push to `main` will now auto-build and deploy

#### Final Pre-Deploy Checklist

- Repo name is still `my-portfolio`
- GitHub username is still `chenmo-24`
- `base` in `vite.config.js` is still `/my-portfolio/`
- OG URL in `index.html` points to `https://chenmo-24.github.io/my-portfolio/og-cover.svg`
- GitHub Pages **Source** is set to **GitHub Actions**

### Project Structure

```text
my-portfolio/
|-- index.html
|-- package.json
|-- vite.config.js
|-- tailwind.config.js
|-- postcss.config.js
|-- README.md
|-- .github/workflows/deploy.yml
|-- public/
|   |-- favicon.svg
|   |-- og-cover.svg
|   `-- readme-preview.svg
`-- src/
    |-- main.jsx
    |-- App.jsx
    |-- index.css
    |-- data/         # personalInfo / projects / quotes / skills / githubStats ...
    |-- components/   # Hero / About / Projects / FunZone / GameOfLife / Konami ...
    `-- hooks/        # useTheme / useLanguage
```

### Customize

| What to change | Where to go |
| --- | --- |
| Personal info | `src/data/personalInfo.js` |
| Featured / personal projects | `src/data/projects.js` |
| Daily quotes | `src/data/quotes.js` |
| Algorithm progress | `src/data/algorithmProgress.js` |
| Skill radar | `src/data/skills.js` |
| Now page | `src/data/nowPage.js` |
| GitHub activity | `src/data/githubStats.js` |
| Typing snippets | `src/data/codeSnippets.js` |
| Check-in logic | `src/components/CheckinCalendar.jsx` |
| Hero terminal animation | `src/components/Hero.jsx` |
| Theme / global motion | `src/index.css` |

### When Changing Username or Repo Name

Sync-check:

- `base` in `vite.config.js`
- `og:url` / `og:image` / `twitter:image` in `index.html`
- GitHub link in `src/data/personalInfo.js`
- Repo URLs in `src/data/githubStats.js`
- Repo URLs in this README
- Repo Pages settings on GitHub

### Troubleshooting

**Port in use**

```bash
npm run dev -- --host 0.0.0.0 --port 4173
```

**node_modules permission error / install failure**

```bash
rm -rf node_modules package-lock.json
npm cache clean --force
npm install
```

**Blank GitHub Pages**

Check first:
- Whether `base` is correct
- Whether the build output comes from `dist/`
- Whether Pages is set to **GitHub Actions**
- Whether asset URLs still include the `/my-portfolio/` prefix

---

<div align="center">

Built with care and React · [chenmo-24](https://github.com/chenmo-24)

</div>
