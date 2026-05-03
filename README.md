<div align="center">

# chenmo-24 Portfolio

![README Preview](./public/readme-preview.svg)

**[English](#english) | [中文](#中文) | [日本語](#日本語) | [Deutsch](#deutsch) | [Français](#français) | [Español](#español) | [العربية](#العربية) | [한국어](#한국어)**

</div>

---

<a id="english"></a>

## English

### Project Overview

`chenmo-24 Portfolio` is a single-page personal portfolio built with **Vite + React 18 + Tailwind CSS**. It presents personal information, recommended projects, learning progress, interactive programming modules, contact methods, and several small games in one responsive web experience.

The site is designed for a computer science student who focuses on **full-stack web development**, **algorithms and data structures**, and **engineering practice**. It supports Chinese and English UI switching, dark and light themes, a global command palette, section-based scrolling navigation, and GitHub Pages deployment through GitHub Actions.

### Technology Stack

- **Vite 5**: local development server, fast hot module replacement, and production bundling.
- **React 18**: component-based UI structure and state-driven interaction.
- **Tailwind CSS 3**: utility-first styling, responsive layout, and theme-aware visual design.
- **Lucide React**: consistent icon system for navigation, actions, and interface details.
- **PostCSS + Autoprefixer**: CSS processing and browser compatibility support.
- **GitHub Actions**: automated build and deployment workflow for GitHub Pages.

### Core Features

- Single-page portfolio layout with `Home`, `About`, `Projects`, `Fun Zone`, and `Contact` sections.
- Bilingual application UI with Chinese and English content stored in local data files.
- Dark theme by default, with a light theme toggle.
- Sticky navigation with active-section highlighting while scrolling.
- Hero terminal card, personal profile text, role tags, skill list, and current learning status.
- Project showcase area for recommended open-source projects and future personal projects.
- Growth map and learning-oriented content blocks for algorithm and engineering progress.
- Contact section with GitHub and email information.
- Global command palette opened with `Cmd/Ctrl + K`.
- Konami Code easter egg: `↑ ↑ ↓ ↓ ← → ← → B A`.
- Responsive layout for desktop and mobile devices.
- GitHub Pages-ready configuration with a repository base path.

### Fun Zone Modules

- **Algorithm Tracker**: displays algorithm-learning progress and topic completion.
- **Algorithm Visualizer**: interactive pathfinding visualization for `BFS`, `DFS`, `Dijkstra`, and `A*`.
- **Skill Radar**: visual overview of technical skill areas.
- **Daily Quote**: rotating programming and learning quotes.
- **Now Page**: current focus, short-term plans, and ongoing work.
- **Check-in Calendar**: habit and learning activity calendar.
- **GitHub Stats**: contribution-style activity and GitHub-related statistics.
- **Interactive Terminal**: command-line style interaction inside the portfolio.
- **Terminal Quest**: terminal-themed puzzle module.
- **Code Typing Challenge**: typing practice based on code snippets.
- **Bug Hunt**: small debugging challenge.
- **Developer Quiz**: developer personality-style quiz.
- **Snake**: classic snake game.
- **2048**: number-merging puzzle game.
- **Conway's Game of Life**: cellular automaton simulation.

### Local Development

Install dependencies and start the development server:

```bash
npm install
npm run dev
```

Default development URL:

```text
http://localhost:5173/my-portfolio/
```

If Vite cache does not refresh correctly, start the dev server with force mode:

```bash
npm run dev -- --force
```

### Build and Preview

Create a production build:

```bash
npm run build
```

Preview the production build locally:

```bash
npm run preview
```

Default preview URL:

```text
http://localhost:4173/my-portfolio/
```

### GitHub Pages Deployment

This project is already configured for GitHub Pages:

- `vite.config.js` sets `base: "/my-portfolio/"`, which matches the repository name.
- `.github/workflows/deploy.yml` builds and deploys the site automatically.
- The workflow installs dependencies with `npm ci`, runs `npm run build`, uploads `dist`, and deploys it to Pages.
- `index.html` includes favicon, Open Graph, and Twitter Card metadata.
- `public/og-cover.svg` is used as the social sharing image.
- `public/readme-preview.svg` is used as the README preview image.

After pushing the repository to GitHub:

1. Open the repository **Settings**.
2. Go to **Pages**.
3. Under **Build and deployment**, choose **GitHub Actions**.
4. Push to the `main` branch.
5. GitHub Actions will build the project and publish the `dist` output automatically.

### Uploading to GitHub

Check the working tree before committing:

```bash
git status --short
```

Recommended project-only staging command:

```bash
git add README.md .gitignore package.json package-lock.json index.html vite.config.js tailwind.config.js postcss.config.js public src .github
git status --short
git commit -m "Update portfolio site"
git push origin main
```

If the remote repository has not been added yet:

```bash
git remote add origin https://github.com/chenmo-24/my-portfolio.git
git branch -M main
git push -u origin main
```

### Files That Should Not Be Committed

The following local files and folders are ignored by `.gitignore`:

- `node_modules/`
- `dist/`
- `.vite/`
- `.claude/`
- `.vscode/`
- `.idea/`
- `.env`
- `.env.*`
- `.DS_Store`
- `Thumbs.db`

### Project Structure

```text
my-portfolio/
|-- index.html
|-- package.json
|-- package-lock.json
|-- vite.config.js
|-- tailwind.config.js
|-- postcss.config.js
|-- README.md
|-- .github/
|   `-- workflows/
|       `-- deploy.yml
|-- public/
|   |-- favicon.svg
|   |-- og-cover.svg
|   `-- readme-preview.svg
`-- src/
    |-- main.jsx
    |-- App.jsx
    |-- index.css
    |-- data/
    |   |-- personalInfo.js
    |   |-- projects.js
    |   |-- quotes.js
    |   |-- algorithmProgress.js
    |   |-- skills.js
    |   |-- nowPage.js
    |   |-- githubStats.js
    |   `-- codeSnippets.js
    |-- components/
    `-- hooks/
```

### Common Edit Locations

| What to change | File |
| --- | --- |
| Personal name, intro, roles, focus areas, email, GitHub link | `src/data/personalInfo.js` |
| Project cards, descriptions, badges, links, and tech stacks | `src/data/projects.js` |
| Daily quote content | `src/data/quotes.js` |
| Algorithm progress data | `src/data/algorithmProgress.js` |
| Skill radar data | `src/data/skills.js` |
| Now page content | `src/data/nowPage.js` |
| GitHub activity display data | `src/data/githubStats.js` |
| Typing challenge snippets | `src/data/codeSnippets.js` |
| Main page section order and app-level wiring | `src/App.jsx` |
| Hero section and terminal-style card | `src/components/Hero.jsx` |
| Fun Zone module list | `src/components/FunZone.jsx` |
| Algorithm visualizer behavior | `src/components/AlgorithmVisualizer.jsx` |
| Command palette actions | `src/components/CommandPalette.jsx` |
| Global styles, animations, and CSS variables | `src/index.css` |

### Troubleshooting

- If the page path is wrong on GitHub Pages, confirm that `base` in `vite.config.js` is `/my-portfolio/`.
- If dependencies behave unexpectedly, delete `node_modules/` and run `npm install` again.
- If the development server shows stale content, run `npm run dev -- --force`.
- If GitHub Pages does not update, check the **Actions** tab and confirm that Pages is set to **GitHub Actions**.
- If social preview images do not appear immediately, wait for the platform cache to refresh and verify `public/og-cover.svg`.

---

<a id="中文"></a>

## 中文

### 项目概览

`chenmo-24 Portfolio` 是一个基于 **Vite + React 18 + Tailwind CSS** 构建的单页个人作品集。它把个人信息、推荐项目、学习进度、编程互动模块、联系方式和多个小游戏整合在一个响应式网页体验中。

这个网站面向一名关注 **Web 全栈开发**、**算法与数据结构**、**工程化实践** 的计算机学生。项目支持中英文界面切换、深浅色主题切换、全局命令面板、按区块滚动导航，并通过 GitHub Actions 配置了 GitHub Pages 自动部署。

### 技术栈

- **Vite 5**：本地开发服务、快速热更新和生产构建。
- **React 18**：组件化界面结构和状态驱动交互。
- **Tailwind CSS 3**：原子化样式、响应式布局和主题化视觉设计。
- **Lucide React**：用于导航、操作和界面细节的统一图标系统。
- **PostCSS + Autoprefixer**：CSS 处理和浏览器兼容支持。
- **GitHub Actions**：用于 GitHub Pages 的自动构建与部署流程。

### 核心功能

- 单页作品集布局，包含 `Home`、`About`、`Projects`、`Fun Zone` 和 `Contact` 区块。
- 应用界面支持中英文，本地数据文件中维护双语内容。
- 默认深色主题，并提供浅色主题切换。
- 粘性导航栏，滚动时自动高亮当前区块。
- Hero 终端卡片、个人简介、身份标签、技能列表和当前学习状态。
- 项目展示区域，用于推荐开源项目和后续个人项目展示。
- 成长地图和学习导向内容，用来展示算法与工程实践进度。
- 联系区块展示 GitHub 和邮箱信息。
- 使用 `Cmd/Ctrl + K` 打开全局命令面板。
- Konami Code 彩蛋：`↑ ↑ ↓ ↓ ← → ← → B A`。
- 适配桌面和移动设备的响应式布局。
- 已配置适用于仓库路径的 GitHub Pages 部署基础路径。

### Fun Zone 模块

- **算法进度**：展示算法学习进度和题型完成情况。
- **算法可视化**：交互式寻路可视化，支持 `BFS`、`DFS`、`Dijkstra` 和 `A*`。
- **技能雷达**：可视化展示技术能力方向。
- **每日语录**：轮换展示编程与学习相关语录。
- **Now 页面**：展示当前关注点、短期计划和正在进行的事情。
- **打卡日历**：展示习惯和学习活动日历。
- **GitHub 活跃度**：展示类似贡献图的活动和 GitHub 相关统计。
- **交互式终端**：在作品集中提供命令行风格交互。
- **Terminal Quest**：终端主题的解谜模块。
- **代码打字挑战**：基于代码片段的打字练习。
- **Bug Hunt**：小型调试挑战。
- **代码人格测试**：开发者人格风格测试。
- **贪吃蛇**：经典贪吃蛇游戏。
- **2048**：数字合成益智游戏。
- **康威生命游戏**：元胞自动机模拟。

### 本地开发

安装依赖并启动开发服务：

```bash
npm install
npm run dev
```

默认开发地址：

```text
http://localhost:5173/my-portfolio/
```

如果 Vite 缓存没有正确刷新，可以使用强制模式启动：

```bash
npm run dev -- --force
```

### 构建与预览

生成生产构建：

```bash
npm run build
```

在本地预览生产构建：

```bash
npm run preview
```

默认预览地址：

```text
http://localhost:4173/my-portfolio/
```

### GitHub Pages 部署

本项目已经完成 GitHub Pages 配置：

- `vite.config.js` 设置了 `base: "/my-portfolio/"`，与仓库名称匹配。
- `.github/workflows/deploy.yml` 会自动构建并部署网站。
- 工作流使用 `npm ci` 安装依赖，运行 `npm run build`，上传 `dist`，并部署到 Pages。
- `index.html` 包含 favicon、Open Graph 和 Twitter Card 元数据。
- `public/og-cover.svg` 用作社交分享图片。
- `public/readme-preview.svg` 用作 README 预览图片。

推送仓库到 GitHub 后：

1. 打开仓库 **Settings**。
2. 进入 **Pages**。
3. 在 **Build and deployment** 中选择 **GitHub Actions**。
4. 推送到 `main` 分支。
5. GitHub Actions 会自动构建项目并发布 `dist` 输出。

### 上传到 GitHub

提交前检查工作区：

```bash
git status --short
```

推荐只暂存项目相关文件：

```bash
git add README.md .gitignore package.json package-lock.json index.html vite.config.js tailwind.config.js postcss.config.js public src .github
git status --short
git commit -m "Update portfolio site"
git push origin main
```

如果还没有添加远程仓库：

```bash
git remote add origin https://github.com/chenmo-24/my-portfolio.git
git branch -M main
git push -u origin main
```

### 不应提交的文件

以下本地文件和文件夹已被 `.gitignore` 忽略：

- `node_modules/`
- `dist/`
- `.vite/`
- `.claude/`
- `.vscode/`
- `.idea/`
- `.env`
- `.env.*`
- `.DS_Store`
- `Thumbs.db`

### 项目结构

```text
my-portfolio/
|-- index.html
|-- package.json
|-- package-lock.json
|-- vite.config.js
|-- tailwind.config.js
|-- postcss.config.js
|-- README.md
|-- .github/
|   `-- workflows/
|       `-- deploy.yml
|-- public/
|   |-- favicon.svg
|   |-- og-cover.svg
|   `-- readme-preview.svg
`-- src/
    |-- main.jsx
    |-- App.jsx
    |-- index.css
    |-- data/
    |   |-- personalInfo.js
    |   |-- projects.js
    |   |-- quotes.js
    |   |-- algorithmProgress.js
    |   |-- skills.js
    |   |-- nowPage.js
    |   |-- githubStats.js
    |   `-- codeSnippets.js
    |-- components/
    `-- hooks/
```

### 常用修改位置

| 修改内容 | 文件 |
| --- | --- |
| 个人名称、简介、身份、关注方向、邮箱、GitHub 链接 | `src/data/personalInfo.js` |
| 项目卡片、描述、标签、链接和技术栈 | `src/data/projects.js` |
| 每日语录内容 | `src/data/quotes.js` |
| 算法进度数据 | `src/data/algorithmProgress.js` |
| 技能雷达数据 | `src/data/skills.js` |
| Now 页面内容 | `src/data/nowPage.js` |
| GitHub 活跃度展示数据 | `src/data/githubStats.js` |
| 打字挑战代码片段 | `src/data/codeSnippets.js` |
| 页面区块顺序和应用级组装 | `src/App.jsx` |
| Hero 区域和终端风格卡片 | `src/components/Hero.jsx` |
| Fun Zone 模块列表 | `src/components/FunZone.jsx` |
| 算法可视化行为 | `src/components/AlgorithmVisualizer.jsx` |
| 命令面板操作 | `src/components/CommandPalette.jsx` |
| 全局样式、动画和 CSS 变量 | `src/index.css` |

### 排错

- 如果 GitHub Pages 页面路径错误，确认 `vite.config.js` 中的 `base` 是 `/my-portfolio/`。
- 如果依赖表现异常，删除 `node_modules/` 后重新运行 `npm install`。
- 如果开发服务显示旧内容，运行 `npm run dev -- --force`。
- 如果 GitHub Pages 没有更新，检查 **Actions** 页面，并确认 Pages 设置为 **GitHub Actions**。
- 如果社交预览图片没有立即显示，等待平台缓存刷新，并确认 `public/og-cover.svg` 存在。

---

<a id="日本語"></a>

## 日本語

### プロジェクト概要

`chenmo-24 Portfolio` は **Vite + React 18 + Tailwind CSS** で構築されたシングルページの個人ポートフォリオです。個人情報、推薦プロジェクト、学習進捗、プログラミング系のインタラクティブモジュール、連絡先、複数の小さなゲームを、1 つのレスポンシブな Web 体験としてまとめています。

このサイトは、**フルスタック Web 開発**、**アルゴリズムとデータ構造**、**エンジニアリング実践** に関心を持つコンピューターサイエンス学生向けに作られています。中国語と英語の UI 切り替え、ダーク / ライトテーマ、グローバルコマンドパレット、セクション単位のスクロールナビゲーション、GitHub Actions による GitHub Pages 自動デプロイに対応しています。

### 技術スタック

- **Vite 5**：ローカル開発サーバー、高速なホットモジュール更新、本番ビルド。
- **React 18**：コンポーネントベースの UI 構造と状態駆動のインタラクション。
- **Tailwind CSS 3**：ユーティリティファーストのスタイル、レスポンシブレイアウト、テーマ対応デザイン。
- **Lucide React**：ナビゲーション、操作、UI ディテールに使う統一アイコンシステム。
- **PostCSS + Autoprefixer**：CSS 処理とブラウザー互換性の補助。
- **GitHub Actions**：GitHub Pages 用の自動ビルドとデプロイワークフロー。

### 主な機能

- `Home`、`About`、`Projects`、`Fun Zone`、`Contact` を含むシングルページ構成。
- アプリ UI は中国語と英語に対応し、ローカルデータファイルで多言語内容を管理。
- デフォルトはダークテーマで、ライトテーマへ切り替え可能。
- 固定ナビゲーションと、スクロール中の現在セクション自動ハイライト。
- Hero のターミナルカード、プロフィール文、ロールタグ、スキル一覧、現在の学習状況。
- 推薦オープンソースプロジェクトと今後の個人制作を表示するプロジェクト領域。
- アルゴリズムとエンジニアリング進捗を示す成長マップと学習コンテンツ。
- GitHub とメール情報を表示する連絡先セクション。
- `Cmd/Ctrl + K` で開くグローバルコマンドパレット。
- Konami Code イースターエッグ：`↑ ↑ ↓ ↓ ← → ← → B A`。
- デスクトップとモバイルに対応するレスポンシブレイアウト。
- リポジトリパスに合わせた GitHub Pages 用ベースパス設定。

### Fun Zone モジュール

- **Algorithm Tracker**：アルゴリズム学習の進捗とトピック完了状況を表示。
- **Algorithm Visualizer**：`BFS`、`DFS`、`Dijkstra`、`A*` に対応したインタラクティブな経路探索可視化。
- **Skill Radar**：技術スキル領域を視覚的に表示。
- **Daily Quote**：プログラミングと学習に関する引用を切り替え表示。
- **Now Page**：現在の注力点、短期計画、進行中の作業を表示。
- **Check-in Calendar**：習慣と学習活動のカレンダー。
- **GitHub Stats**：コントリビューション風の活動と GitHub 関連統計。
- **Interactive Terminal**：ポートフォリオ内で使えるコマンドライン風インタラクション。
- **Terminal Quest**：ターミナルをテーマにしたパズルモジュール。
- **Code Typing Challenge**：コードスニペットを使ったタイピング練習。
- **Bug Hunt**：小さなデバッグチャレンジ。
- **Developer Quiz**：開発者タイプ診断風クイズ。
- **Snake**：クラシックなスネークゲーム。
- **2048**：数字を合成するパズルゲーム。
- **Conway's Game of Life**：セル・オートマトンのシミュレーション。

### ローカル開発

依存関係をインストールして開発サーバーを起動します：

```bash
npm install
npm run dev
```

デフォルトの開発 URL：

```text
http://localhost:5173/my-portfolio/
```

Vite のキャッシュが正しく更新されない場合は、強制モードで起動します：

```bash
npm run dev -- --force
```

### ビルドとプレビュー

本番ビルドを作成します：

```bash
npm run build
```

本番ビルドをローカルでプレビューします：

```bash
npm run preview
```

デフォルトのプレビュー URL：

```text
http://localhost:4173/my-portfolio/
```

### GitHub Pages デプロイ

このプロジェクトは GitHub Pages 用に設定済みです：

- `vite.config.js` で `base: "/my-portfolio/"` を設定し、リポジトリ名と一致させています。
- `.github/workflows/deploy.yml` がサイトを自動でビルドしてデプロイします。
- ワークフローは `npm ci` で依存関係をインストールし、`npm run build` を実行し、`dist` をアップロードして Pages にデプロイします。
- `index.html` には favicon、Open Graph、Twitter Card メタデータが含まれています。
- `public/og-cover.svg` はソーシャル共有画像として使われます。
- `public/readme-preview.svg` は README のプレビュー画像として使われます。

リポジトリを GitHub にプッシュした後：

1. リポジトリの **Settings** を開きます。
2. **Pages** に移動します。
3. **Build and deployment** で **GitHub Actions** を選択します。
4. `main` ブランチにプッシュします。
5. GitHub Actions がプロジェクトをビルドし、`dist` の出力を自動で公開します。

### GitHub へのアップロード

コミット前に作業ツリーを確認します：

```bash
git status --short
```

プロジェクト関連ファイルだけをステージする推奨コマンド：

```bash
git add README.md .gitignore package.json package-lock.json index.html vite.config.js tailwind.config.js postcss.config.js public src .github
git status --short
git commit -m "Update portfolio site"
git push origin main
```

まだリモートリポジトリを追加していない場合：

```bash
git remote add origin https://github.com/chenmo-24/my-portfolio.git
git branch -M main
git push -u origin main
```

### コミットしないファイル

次のローカルファイルとフォルダーは `.gitignore` で無視されています：

- `node_modules/`
- `dist/`
- `.vite/`
- `.claude/`
- `.vscode/`
- `.idea/`
- `.env`
- `.env.*`
- `.DS_Store`
- `Thumbs.db`

### プロジェクト構成

```text
my-portfolio/
|-- index.html
|-- package.json
|-- package-lock.json
|-- vite.config.js
|-- tailwind.config.js
|-- postcss.config.js
|-- README.md
|-- .github/
|   `-- workflows/
|       `-- deploy.yml
|-- public/
|   |-- favicon.svg
|   |-- og-cover.svg
|   `-- readme-preview.svg
`-- src/
    |-- main.jsx
    |-- App.jsx
    |-- index.css
    |-- data/
    |   |-- personalInfo.js
    |   |-- projects.js
    |   |-- quotes.js
    |   |-- algorithmProgress.js
    |   |-- skills.js
    |   |-- nowPage.js
    |   |-- githubStats.js
    |   `-- codeSnippets.js
    |-- components/
    `-- hooks/
```

### よく編集する場所

| 変更内容 | ファイル |
| --- | --- |
| 名前、紹介文、ロール、注力領域、メール、GitHub リンク | `src/data/personalInfo.js` |
| プロジェクトカード、説明、バッジ、リンク、技術スタック | `src/data/projects.js` |
| Daily Quote の内容 | `src/data/quotes.js` |
| アルゴリズム進捗データ | `src/data/algorithmProgress.js` |
| Skill Radar データ | `src/data/skills.js` |
| Now Page の内容 | `src/data/nowPage.js` |
| GitHub 活動表示データ | `src/data/githubStats.js` |
| タイピングチャレンジのコードスニペット | `src/data/codeSnippets.js` |
| メインページのセクション順序とアプリ全体の接続 | `src/App.jsx` |
| Hero セクションとターミナル風カード | `src/components/Hero.jsx` |
| Fun Zone のモジュール一覧 | `src/components/FunZone.jsx` |
| アルゴリズム可視化の挙動 | `src/components/AlgorithmVisualizer.jsx` |
| コマンドパレットの操作 | `src/components/CommandPalette.jsx` |
| グローバルスタイル、アニメーション、CSS 変数 | `src/index.css` |

### トラブルシューティング

- GitHub Pages のページパスが間違っている場合は、`vite.config.js` の `base` が `/my-portfolio/` であることを確認します。
- 依存関係の挙動がおかしい場合は、`node_modules/` を削除してから `npm install` を再実行します。
- 開発サーバーが古い内容を表示する場合は、`npm run dev -- --force` を実行します。
- GitHub Pages が更新されない場合は、**Actions** タブを確認し、Pages が **GitHub Actions** に設定されていることを確認します。
- ソーシャルプレビュー画像がすぐに表示されない場合は、プラットフォームのキャッシュ更新を待ち、`public/og-cover.svg` を確認します。

---

<a id="deutsch"></a>

## Deutsch

### Projektüberblick

`chenmo-24 Portfolio` ist ein einseitiges persönliches Portfolio, gebaut mit **Vite + React 18 + Tailwind CSS**. Es bündelt persönliche Informationen, empfohlene Projekte, Lernfortschritt, interaktive Programmiermodule, Kontaktmöglichkeiten und mehrere kleine Spiele in einer responsiven Web-Erfahrung.

Die Seite ist für einen Informatikstudenten gedacht, der sich auf **Full-Stack-Webentwicklung**, **Algorithmen und Datenstrukturen** sowie **Engineering-Praxis** konzentriert. Sie unterstützt eine chinesische und englische UI, Dark- und Light-Theme, eine globale Command Palette, abschnittsbasierte Scroll-Navigation und GitHub-Pages-Deployment über GitHub Actions.

### Technologie-Stack

- **Vite 5**: lokaler Entwicklungsserver, schnelles Hot Module Replacement und Produktions-Bundling.
- **React 18**: komponentenbasierte UI-Struktur und zustandsgetriebene Interaktion.
- **Tailwind CSS 3**: Utility-First-Styling, responsives Layout und themenbewusstes Design.
- **Lucide React**: einheitliches Icon-System für Navigation, Aktionen und UI-Details.
- **PostCSS + Autoprefixer**: CSS-Verarbeitung und Unterstützung für Browser-Kompatibilität.
- **GitHub Actions**: automatisierter Build- und Deployment-Workflow für GitHub Pages.

### Kernfunktionen

- Einseitiges Portfolio-Layout mit den Bereichen `Home`, `About`, `Projects`, `Fun Zone` und `Contact`.
- Zweisprachige App-Oberfläche mit chinesischen und englischen Inhalten in lokalen Datendateien.
- Dark Theme als Standard, mit Umschaltung auf Light Theme.
- Sticky Navigation mit automatischer Hervorhebung des aktuellen Abschnitts beim Scrollen.
- Hero-Terminalkarte, Profiltext, Rollen-Tags, Skill-Liste und aktueller Lernstatus.
- Projektbereich für empfohlene Open-Source-Projekte und zukünftige eigene Projekte.
- Growth Map und lernorientierte Inhalte für Fortschritte in Algorithmen und Engineering.
- Kontaktbereich mit GitHub- und E-Mail-Informationen.
- Globale Command Palette, geöffnet mit `Cmd/Ctrl + K`.
- Konami-Code-Easter-Egg: `↑ ↑ ↓ ↓ ← → ← → B A`.
- Responsives Layout für Desktop- und Mobilgeräte.
- GitHub-Pages-fähige Konfiguration mit Repository-Basispfad.

### Fun-Zone-Module

- **Algorithm Tracker**: zeigt Lernfortschritt und abgeschlossene Algorithmusthemen.
- **Algorithm Visualizer**: interaktive Pfadsuche-Visualisierung für `BFS`, `DFS`, `Dijkstra` und `A*`.
- **Skill Radar**: visuelle Übersicht über technische Skill-Bereiche.
- **Daily Quote**: wechselnde Zitate zu Programmierung und Lernen.
- **Now Page**: aktuelle Schwerpunkte, kurzfristige Pläne und laufende Arbeit.
- **Check-in Calendar**: Kalender für Gewohnheiten und Lernaktivitäten.
- **GitHub Stats**: beitragsähnliche Aktivität und GitHub-bezogene Statistiken.
- **Interactive Terminal**: Kommandozeilenartige Interaktion im Portfolio.
- **Terminal Quest**: Terminal-basiertes Rätselmodul.
- **Code Typing Challenge**: Tipptraining mit Code-Snippets.
- **Bug Hunt**: kleine Debugging-Challenge.
- **Developer Quiz**: Quiz im Stil einer Entwickler-Persönlichkeit.
- **Snake**: klassisches Snake-Spiel.
- **2048**: Zahlen-Puzzle mit Zusammenführen von Kacheln.
- **Conway's Game of Life**: Simulation eines zellulären Automaten.

### Lokale Entwicklung

Abhängigkeiten installieren und Entwicklungsserver starten:

```bash
npm install
npm run dev
```

Standard-Entwicklungs-URL:

```text
http://localhost:5173/my-portfolio/
```

Wenn der Vite-Cache nicht korrekt aktualisiert wird, starte den Server im Force-Modus:

```bash
npm run dev -- --force
```

### Build und Vorschau

Produktions-Build erstellen:

```bash
npm run build
```

Produktions-Build lokal ansehen:

```bash
npm run preview
```

Standard-Vorschau-URL:

```text
http://localhost:4173/my-portfolio/
```

### GitHub-Pages-Deployment

Dieses Projekt ist bereits für GitHub Pages konfiguriert:

- `vite.config.js` setzt `base: "/my-portfolio/"`, passend zum Repository-Namen.
- `.github/workflows/deploy.yml` baut und deployt die Seite automatisch.
- Der Workflow installiert Abhängigkeiten mit `npm ci`, führt `npm run build` aus, lädt `dist` hoch und deployt es zu Pages.
- `index.html` enthält favicon-, Open-Graph- und Twitter-Card-Metadaten.
- `public/og-cover.svg` wird als Social-Sharing-Bild verwendet.
- `public/readme-preview.svg` wird als README-Vorschaubild verwendet.

Nach dem Push des Repositorys zu GitHub:

1. Öffne die Repository-**Settings**.
2. Gehe zu **Pages**.
3. Wähle unter **Build and deployment** die Option **GitHub Actions**.
4. Pushe auf den Branch `main`.
5. GitHub Actions baut das Projekt und veröffentlicht automatisch die Ausgabe aus `dist`.

### Upload zu GitHub

Arbeitsbaum vor dem Commit prüfen:

```bash
git status --short
```

Empfohlener Befehl, um nur Projektdateien zu stagen:

```bash
git add README.md .gitignore package.json package-lock.json index.html vite.config.js tailwind.config.js postcss.config.js public src .github
git status --short
git commit -m "Update portfolio site"
git push origin main
```

Falls das Remote-Repository noch nicht hinzugefügt wurde:

```bash
git remote add origin https://github.com/chenmo-24/my-portfolio.git
git branch -M main
git push -u origin main
```

### Dateien, die nicht committet werden sollten

Die folgenden lokalen Dateien und Ordner werden durch `.gitignore` ignoriert:

- `node_modules/`
- `dist/`
- `.vite/`
- `.claude/`
- `.vscode/`
- `.idea/`
- `.env`
- `.env.*`
- `.DS_Store`
- `Thumbs.db`

### Projektstruktur

```text
my-portfolio/
|-- index.html
|-- package.json
|-- package-lock.json
|-- vite.config.js
|-- tailwind.config.js
|-- postcss.config.js
|-- README.md
|-- .github/
|   `-- workflows/
|       `-- deploy.yml
|-- public/
|   |-- favicon.svg
|   |-- og-cover.svg
|   `-- readme-preview.svg
`-- src/
    |-- main.jsx
    |-- App.jsx
    |-- index.css
    |-- data/
    |   |-- personalInfo.js
    |   |-- projects.js
    |   |-- quotes.js
    |   |-- algorithmProgress.js
    |   |-- skills.js
    |   |-- nowPage.js
    |   |-- githubStats.js
    |   `-- codeSnippets.js
    |-- components/
    `-- hooks/
```

### Häufige Bearbeitungsorte

| Was geändert werden soll | Datei |
| --- | --- |
| Name, Intro, Rollen, Fokusbereiche, E-Mail, GitHub-Link | `src/data/personalInfo.js` |
| Projektkarten, Beschreibungen, Badges, Links und Tech-Stacks | `src/data/projects.js` |
| Inhalte der Daily Quotes | `src/data/quotes.js` |
| Daten zum Algorithmusfortschritt | `src/data/algorithmProgress.js` |
| Skill-Radar-Daten | `src/data/skills.js` |
| Inhalte der Now Page | `src/data/nowPage.js` |
| Daten für die GitHub-Aktivitätsanzeige | `src/data/githubStats.js` |
| Code-Snippets für die Tipp-Challenge | `src/data/codeSnippets.js` |
| Reihenfolge der Hauptsektionen und App-Verknüpfung | `src/App.jsx` |
| Hero-Bereich und Terminalkarte | `src/components/Hero.jsx` |
| Liste der Fun-Zone-Module | `src/components/FunZone.jsx` |
| Verhalten der Algorithmusvisualisierung | `src/components/AlgorithmVisualizer.jsx` |
| Aktionen der Command Palette | `src/components/CommandPalette.jsx` |
| Globale Styles, Animationen und CSS-Variablen | `src/index.css` |

### Fehlerbehebung

- Wenn der Pfad auf GitHub Pages falsch ist, prüfe, ob `base` in `vite.config.js` auf `/my-portfolio/` gesetzt ist.
- Wenn Abhängigkeiten unerwartet reagieren, lösche `node_modules/` und führe `npm install` erneut aus.
- Wenn der Entwicklungsserver veraltete Inhalte zeigt, führe `npm run dev -- --force` aus.
- Wenn GitHub Pages nicht aktualisiert wird, prüfe den Tab **Actions** und bestätige, dass Pages auf **GitHub Actions** gesetzt ist.
- Wenn Social-Preview-Bilder nicht sofort erscheinen, warte auf die Cache-Aktualisierung der Plattform und prüfe `public/og-cover.svg`.

---

<a id="français"></a>

## Français

### Présentation du projet

`chenmo-24 Portfolio` est un portfolio personnel en page unique construit avec **Vite + React 18 + Tailwind CSS**. Il regroupe les informations personnelles, les projets recommandés, la progression d'apprentissage, des modules interactifs liés à la programmation, les moyens de contact et plusieurs petits jeux dans une expérience web responsive.

Le site est conçu pour un étudiant en informatique qui se concentre sur le **développement web full-stack**, les **algorithmes et structures de données**, et la **pratique d'ingénierie logicielle**. Il prend en charge une interface en chinois et en anglais, les thèmes sombre et clair, une palette de commandes globale, une navigation par sections au défilement, et un déploiement GitHub Pages via GitHub Actions.

### Stack technique

- **Vite 5** : serveur de développement local, remplacement de modules à chaud rapide et bundling de production.
- **React 18** : structure d'interface basée sur les composants et interactions pilotées par l'état.
- **Tailwind CSS 3** : styles utility-first, mise en page responsive et design sensible au thème.
- **Lucide React** : système d'icônes cohérent pour la navigation, les actions et les détails d'interface.
- **PostCSS + Autoprefixer** : traitement CSS et prise en charge de la compatibilité navigateur.
- **GitHub Actions** : workflow automatisé de build et de déploiement pour GitHub Pages.

### Fonctionnalités principales

- Portfolio en page unique avec les sections `Home`, `About`, `Projects`, `Fun Zone` et `Contact`.
- Interface d'application bilingue avec contenus chinois et anglais stockés dans des fichiers de données locaux.
- Thème sombre par défaut, avec bascule vers le thème clair.
- Navigation fixe avec mise en évidence automatique de la section active pendant le défilement.
- Carte terminal dans le Hero, texte de profil, étiquettes de rôle, liste de compétences et statut d'apprentissage actuel.
- Zone de projets pour des projets open source recommandés et de futurs projets personnels.
- Growth map et blocs orientés apprentissage pour la progression en algorithmes et en ingénierie.
- Section de contact avec informations GitHub et email.
- Palette de commandes globale ouverte avec `Cmd/Ctrl + K`.
- Easter egg Konami Code : `↑ ↑ ↓ ↓ ← → ← → B A`.
- Mise en page responsive pour ordinateurs et appareils mobiles.
- Configuration prête pour GitHub Pages avec chemin de base du dépôt.

### Modules Fun Zone

- **Algorithm Tracker** : affiche la progression d'apprentissage des algorithmes et les sujets terminés.
- **Algorithm Visualizer** : visualisation interactive de recherche de chemin pour `BFS`, `DFS`, `Dijkstra` et `A*`.
- **Skill Radar** : aperçu visuel des domaines de compétences techniques.
- **Daily Quote** : citations tournantes sur la programmation et l'apprentissage.
- **Now Page** : priorités actuelles, plans à court terme et travaux en cours.
- **Check-in Calendar** : calendrier d'habitudes et d'activités d'apprentissage.
- **GitHub Stats** : activité de style contributions et statistiques liées à GitHub.
- **Interactive Terminal** : interaction de style ligne de commande dans le portfolio.
- **Terminal Quest** : module de puzzle sur le thème du terminal.
- **Code Typing Challenge** : entraînement à la frappe basé sur des extraits de code.
- **Bug Hunt** : petit défi de débogage.
- **Developer Quiz** : quiz de type personnalité développeur.
- **Snake** : jeu Snake classique.
- **2048** : jeu de puzzle de fusion de nombres.
- **Conway's Game of Life** : simulation d'automate cellulaire.

### Développement local

Installer les dépendances et démarrer le serveur de développement :

```bash
npm install
npm run dev
```

URL de développement par défaut :

```text
http://localhost:5173/my-portfolio/
```

Si le cache de Vite ne se rafraîchit pas correctement, démarrez le serveur en mode forcé :

```bash
npm run dev -- --force
```

### Build et prévisualisation

Créer un build de production :

```bash
npm run build
```

Prévisualiser le build de production localement :

```bash
npm run preview
```

URL de prévisualisation par défaut :

```text
http://localhost:4173/my-portfolio/
```

### Déploiement GitHub Pages

Ce projet est déjà configuré pour GitHub Pages :

- `vite.config.js` définit `base: "/my-portfolio/"`, ce qui correspond au nom du dépôt.
- `.github/workflows/deploy.yml` construit et déploie le site automatiquement.
- Le workflow installe les dépendances avec `npm ci`, exécute `npm run build`, téléverse `dist`, puis le déploie sur Pages.
- `index.html` inclut les métadonnées favicon, Open Graph et Twitter Card.
- `public/og-cover.svg` sert d'image de partage social.
- `public/readme-preview.svg` sert d'image d'aperçu du README.

Après avoir poussé le dépôt vers GitHub :

1. Ouvrez les **Settings** du dépôt.
2. Allez dans **Pages**.
3. Dans **Build and deployment**, choisissez **GitHub Actions**.
4. Poussez vers la branche `main`.
5. GitHub Actions construira le projet et publiera automatiquement la sortie `dist`.

### Envoi vers GitHub

Vérifier l'arbre de travail avant le commit :

```bash
git status --short
```

Commande recommandée pour ne staged que les fichiers du projet :

```bash
git add README.md .gitignore package.json package-lock.json index.html vite.config.js tailwind.config.js postcss.config.js public src .github
git status --short
git commit -m "Update portfolio site"
git push origin main
```

Si le dépôt distant n'a pas encore été ajouté :

```bash
git remote add origin https://github.com/chenmo-24/my-portfolio.git
git branch -M main
git push -u origin main
```

### Fichiers à ne pas committer

Les fichiers et dossiers locaux suivants sont ignorés par `.gitignore` :

- `node_modules/`
- `dist/`
- `.vite/`
- `.claude/`
- `.vscode/`
- `.idea/`
- `.env`
- `.env.*`
- `.DS_Store`
- `Thumbs.db`

### Structure du projet

```text
my-portfolio/
|-- index.html
|-- package.json
|-- package-lock.json
|-- vite.config.js
|-- tailwind.config.js
|-- postcss.config.js
|-- README.md
|-- .github/
|   `-- workflows/
|       `-- deploy.yml
|-- public/
|   |-- favicon.svg
|   |-- og-cover.svg
|   `-- readme-preview.svg
`-- src/
    |-- main.jsx
    |-- App.jsx
    |-- index.css
    |-- data/
    |   |-- personalInfo.js
    |   |-- projects.js
    |   |-- quotes.js
    |   |-- algorithmProgress.js
    |   |-- skills.js
    |   |-- nowPage.js
    |   |-- githubStats.js
    |   `-- codeSnippets.js
    |-- components/
    `-- hooks/
```

### Emplacements de modification fréquents

| Élément à modifier | Fichier |
| --- | --- |
| Nom, introduction, rôles, axes de travail, email, lien GitHub | `src/data/personalInfo.js` |
| Cartes de projets, descriptions, badges, liens et stacks techniques | `src/data/projects.js` |
| Contenu des citations quotidiennes | `src/data/quotes.js` |
| Données de progression des algorithmes | `src/data/algorithmProgress.js` |
| Données du radar de compétences | `src/data/skills.js` |
| Contenu de la Now Page | `src/data/nowPage.js` |
| Données d'affichage de l'activité GitHub | `src/data/githubStats.js` |
| Extraits de code pour le défi de frappe | `src/data/codeSnippets.js` |
| Ordre des sections principales et assemblage de l'application | `src/App.jsx` |
| Section Hero et carte style terminal | `src/components/Hero.jsx` |
| Liste des modules Fun Zone | `src/components/FunZone.jsx` |
| Comportement de la visualisation d'algorithmes | `src/components/AlgorithmVisualizer.jsx` |
| Actions de la palette de commandes | `src/components/CommandPalette.jsx` |
| Styles globaux, animations et variables CSS | `src/index.css` |

### Dépannage

- Si le chemin de la page est incorrect sur GitHub Pages, vérifiez que `base` dans `vite.config.js` vaut `/my-portfolio/`.
- Si les dépendances se comportent de façon inattendue, supprimez `node_modules/` et relancez `npm install`.
- Si le serveur de développement affiche du contenu obsolète, exécutez `npm run dev -- --force`.
- Si GitHub Pages ne se met pas à jour, vérifiez l'onglet **Actions** et confirmez que Pages utilise **GitHub Actions**.
- Si les images d'aperçu social n'apparaissent pas immédiatement, attendez le rafraîchissement du cache de la plateforme et vérifiez `public/og-cover.svg`.

---

<a id="español"></a>

## Español

### Descripción del proyecto

`chenmo-24 Portfolio` es un portafolio personal de una sola página construido con **Vite + React 18 + Tailwind CSS**. Reúne información personal, proyectos recomendados, progreso de aprendizaje, módulos interactivos de programación, métodos de contacto y varios juegos pequeños en una experiencia web responsive.

El sitio está diseñado para un estudiante de informática centrado en el **desarrollo web full-stack**, los **algoritmos y estructuras de datos**, y la **práctica de ingeniería**. Soporta interfaz en chino e inglés, temas claro y oscuro, una paleta global de comandos, navegación por secciones durante el desplazamiento y despliegue en GitHub Pages mediante GitHub Actions.

### Stack tecnológico

- **Vite 5**: servidor local de desarrollo, hot module replacement rápido y empaquetado de producción.
- **React 18**: estructura de UI basada en componentes e interacción controlada por estado.
- **Tailwind CSS 3**: estilos utility-first, diseño responsive y diseño sensible al tema.
- **Lucide React**: sistema de iconos consistente para navegación, acciones y detalles de interfaz.
- **PostCSS + Autoprefixer**: procesamiento CSS y soporte de compatibilidad con navegadores.
- **GitHub Actions**: flujo automatizado de build y despliegue para GitHub Pages.

### Funciones principales

- Diseño de portafolio de una sola página con secciones `Home`, `About`, `Projects`, `Fun Zone` y `Contact`.
- Interfaz bilingüe con contenido en chino e inglés guardado en archivos de datos locales.
- Tema oscuro por defecto, con cambio a tema claro.
- Navegación fija con resaltado automático de la sección activa al hacer scroll.
- Tarjeta de terminal en el Hero, texto de perfil, etiquetas de rol, lista de habilidades y estado actual de aprendizaje.
- Área de proyectos para proyectos open source recomendados y futuros proyectos personales.
- Growth map y bloques orientados al aprendizaje para progreso en algoritmos e ingeniería.
- Sección de contacto con información de GitHub y correo electrónico.
- Paleta global de comandos abierta con `Cmd/Ctrl + K`.
- Easter egg de Konami Code: `↑ ↑ ↓ ↓ ← → ← → B A`.
- Diseño responsive para escritorio y dispositivos móviles.
- Configuración lista para GitHub Pages con ruta base del repositorio.

### Módulos de Fun Zone

- **Algorithm Tracker**: muestra el progreso de aprendizaje de algoritmos y temas completados.
- **Algorithm Visualizer**: visualización interactiva de búsqueda de caminos para `BFS`, `DFS`, `Dijkstra` y `A*`.
- **Skill Radar**: resumen visual de áreas de habilidades técnicas.
- **Daily Quote**: citas rotativas sobre programación y aprendizaje.
- **Now Page**: foco actual, planes a corto plazo y trabajo en curso.
- **Check-in Calendar**: calendario de hábitos y actividades de aprendizaje.
- **GitHub Stats**: actividad estilo contribuciones y estadísticas relacionadas con GitHub.
- **Interactive Terminal**: interacción estilo línea de comandos dentro del portafolio.
- **Terminal Quest**: módulo de acertijos con temática de terminal.
- **Code Typing Challenge**: práctica de escritura basada en fragmentos de código.
- **Bug Hunt**: pequeño desafío de depuración.
- **Developer Quiz**: quiz estilo personalidad de desarrollador.
- **Snake**: juego clásico de Snake.
- **2048**: juego de puzzle de fusión de números.
- **Conway's Game of Life**: simulación de autómata celular.

### Desarrollo local

Instalar dependencias e iniciar el servidor de desarrollo:

```bash
npm install
npm run dev
```

URL de desarrollo por defecto:

```text
http://localhost:5173/my-portfolio/
```

Si la caché de Vite no se actualiza correctamente, inicia el servidor en modo forzado:

```bash
npm run dev -- --force
```

### Build y vista previa

Crear un build de producción:

```bash
npm run build
```

Previsualizar el build de producción localmente:

```bash
npm run preview
```

URL de vista previa por defecto:

```text
http://localhost:4173/my-portfolio/
```

### Despliegue en GitHub Pages

Este proyecto ya está configurado para GitHub Pages:

- `vite.config.js` define `base: "/my-portfolio/"`, que coincide con el nombre del repositorio.
- `.github/workflows/deploy.yml` construye y despliega el sitio automáticamente.
- El workflow instala dependencias con `npm ci`, ejecuta `npm run build`, sube `dist` y lo despliega en Pages.
- `index.html` incluye metadatos de favicon, Open Graph y Twitter Card.
- `public/og-cover.svg` se usa como imagen para compartir en redes sociales.
- `public/readme-preview.svg` se usa como imagen de vista previa del README.

Después de subir el repositorio a GitHub:

1. Abre **Settings** del repositorio.
2. Ve a **Pages**.
3. En **Build and deployment**, elige **GitHub Actions**.
4. Haz push a la rama `main`.
5. GitHub Actions construirá el proyecto y publicará automáticamente la salida `dist`.

### Subir a GitHub

Revisar el árbol de trabajo antes del commit:

```bash
git status --short
```

Comando recomendado para preparar solo archivos del proyecto:

```bash
git add README.md .gitignore package.json package-lock.json index.html vite.config.js tailwind.config.js postcss.config.js public src .github
git status --short
git commit -m "Update portfolio site"
git push origin main
```

Si aún no se ha agregado el repositorio remoto:

```bash
git remote add origin https://github.com/chenmo-24/my-portfolio.git
git branch -M main
git push -u origin main
```

### Archivos que no deben commitearse

Los siguientes archivos y carpetas locales están ignorados por `.gitignore`:

- `node_modules/`
- `dist/`
- `.vite/`
- `.claude/`
- `.vscode/`
- `.idea/`
- `.env`
- `.env.*`
- `.DS_Store`
- `Thumbs.db`

### Estructura del proyecto

```text
my-portfolio/
|-- index.html
|-- package.json
|-- package-lock.json
|-- vite.config.js
|-- tailwind.config.js
|-- postcss.config.js
|-- README.md
|-- .github/
|   `-- workflows/
|       `-- deploy.yml
|-- public/
|   |-- favicon.svg
|   |-- og-cover.svg
|   `-- readme-preview.svg
`-- src/
    |-- main.jsx
    |-- App.jsx
    |-- index.css
    |-- data/
    |   |-- personalInfo.js
    |   |-- projects.js
    |   |-- quotes.js
    |   |-- algorithmProgress.js
    |   |-- skills.js
    |   |-- nowPage.js
    |   |-- githubStats.js
    |   `-- codeSnippets.js
    |-- components/
    `-- hooks/
```

### Ubicaciones comunes de edición

| Qué cambiar | Archivo |
| --- | --- |
| Nombre, introducción, roles, áreas de foco, email, enlace de GitHub | `src/data/personalInfo.js` |
| Tarjetas de proyectos, descripciones, badges, enlaces y stacks técnicos | `src/data/projects.js` |
| Contenido de citas diarias | `src/data/quotes.js` |
| Datos de progreso de algoritmos | `src/data/algorithmProgress.js` |
| Datos del radar de habilidades | `src/data/skills.js` |
| Contenido de Now Page | `src/data/nowPage.js` |
| Datos de visualización de actividad de GitHub | `src/data/githubStats.js` |
| Fragmentos de código para el desafío de escritura | `src/data/codeSnippets.js` |
| Orden de secciones principales y conexión general de la app | `src/App.jsx` |
| Sección Hero y tarjeta estilo terminal | `src/components/Hero.jsx` |
| Lista de módulos Fun Zone | `src/components/FunZone.jsx` |
| Comportamiento del visualizador de algoritmos | `src/components/AlgorithmVisualizer.jsx` |
| Acciones de la paleta de comandos | `src/components/CommandPalette.jsx` |
| Estilos globales, animaciones y variables CSS | `src/index.css` |

### Solución de problemas

- Si la ruta de la página en GitHub Pages es incorrecta, confirma que `base` en `vite.config.js` sea `/my-portfolio/`.
- Si las dependencias se comportan de forma inesperada, elimina `node_modules/` y ejecuta `npm install` de nuevo.
- Si el servidor de desarrollo muestra contenido antiguo, ejecuta `npm run dev -- --force`.
- Si GitHub Pages no se actualiza, revisa la pestaña **Actions** y confirma que Pages esté configurado como **GitHub Actions**.
- Si las imágenes de vista previa social no aparecen inmediatamente, espera a que se actualice la caché de la plataforma y verifica `public/og-cover.svg`.

---

<a id="العربية"></a>

## العربية

### نظرة عامة على المشروع

`chenmo-24 Portfolio` هو موقع معرض أعمال شخصي من صفحة واحدة، مبني باستخدام **Vite + React 18 + Tailwind CSS**. يجمع الموقع المعلومات الشخصية، والمشاريع المقترحة، وتقدم التعلم، ووحدات برمجية تفاعلية، وطرق التواصل، وعدة ألعاب صغيرة داخل تجربة ويب متجاوبة واحدة.

صمم الموقع لطالب في علوم الحاسوب يركز على **تطوير الويب الكامل**، و**الخوارزميات وهياكل البيانات**، و**الممارسة الهندسية**. يدعم الموقع واجهة بالصينية والإنجليزية، والتبديل بين الوضع الداكن والفاتح، ولوحة أوامر عامة، والتنقل حسب الأقسام أثناء التمرير، والنشر على GitHub Pages من خلال GitHub Actions.

### حزمة التقنيات

- **Vite 5**: خادم تطوير محلي، وتحديث سريع للوحدات، وتجميع للإنتاج.
- **React 18**: بنية واجهة مبنية على المكونات وتفاعل قائم على الحالة.
- **Tailwind CSS 3**: تنسيق بأسلوب utility-first، وتخطيط متجاوب، وتصميم واع بالثيم.
- **Lucide React**: نظام أيقونات موحد للتنقل، والإجراءات، وتفاصيل الواجهة.
- **PostCSS + Autoprefixer**: معالجة CSS ودعم توافق المتصفحات.
- **GitHub Actions**: سير عمل آلي للبناء والنشر على GitHub Pages.

### الميزات الأساسية

- تخطيط معرض أعمال من صفحة واحدة يتضمن أقسام `Home` و`About` و`Projects` و`Fun Zone` و`Contact`.
- واجهة تطبيق ثنائية اللغة، مع محتوى صيني وإنجليزي محفوظ في ملفات بيانات محلية.
- الوضع الداكن هو الافتراضي، مع إمكانية التبديل إلى الوضع الفاتح.
- شريط تنقل ثابت يبرز القسم النشط تلقائيا أثناء التمرير.
- بطاقة طرفية في قسم Hero، ونص تعريفي، ووسوم أدوار، وقائمة مهارات، وحالة التعلم الحالية.
- منطقة مشاريع لعرض مشاريع مفتوحة المصدر موصى بها ومشاريع شخصية مستقبلية.
- خريطة نمو ومحتوى تعليمي لعرض التقدم في الخوارزميات والهندسة.
- قسم تواصل يعرض معلومات GitHub والبريد الإلكتروني.
- لوحة أوامر عامة تفتح باستخدام `Cmd/Ctrl + K`.
- سر Konami Code: `↑ ↑ ↓ ↓ ← → ← → B A`.
- تخطيط متجاوب لأجهزة سطح المكتب والهواتف.
- إعداد جاهز لـ GitHub Pages مع مسار أساس مطابق للمستودع.

### وحدات Fun Zone

- **Algorithm Tracker**: يعرض تقدم تعلم الخوارزميات والموضوعات المكتملة.
- **Algorithm Visualizer**: تصور تفاعلي للبحث عن المسار باستخدام `BFS` و`DFS` و`Dijkstra` و`A*`.
- **Skill Radar**: نظرة مرئية على مجالات المهارات التقنية.
- **Daily Quote**: اقتباسات متغيرة حول البرمجة والتعلم.
- **Now Page**: التركيز الحالي، والخطط قصيرة المدى، والعمل الجاري.
- **Check-in Calendar**: تقويم للعادات وأنشطة التعلم.
- **GitHub Stats**: نشاط يشبه مساهمات GitHub وإحصاءات مرتبطة به.
- **Interactive Terminal**: تفاعل بأسلوب سطر الأوامر داخل معرض الأعمال.
- **Terminal Quest**: وحدة ألغاز بطابع الطرفية.
- **Code Typing Challenge**: تدريب على الكتابة باستخدام مقاطع كود.
- **Bug Hunt**: تحد صغير لتصحيح الأخطاء.
- **Developer Quiz**: اختبار بأسلوب شخصية المطور.
- **Snake**: لعبة الثعبان الكلاسيكية.
- **2048**: لعبة ألغاز لدمج الأرقام.
- **Conway's Game of Life**: محاكاة أوتوماتا خلوية.

### التطوير المحلي

ثبت الاعتماديات وشغل خادم التطوير:

```bash
npm install
npm run dev
```

رابط التطوير الافتراضي:

```text
http://localhost:5173/my-portfolio/
```

إذا لم يتم تحديث ذاكرة Vite المؤقتة بشكل صحيح، شغل الخادم بوضع القوة:

```bash
npm run dev -- --force
```

### البناء والمعاينة

إنشاء بناء إنتاج:

```bash
npm run build
```

معاينة بناء الإنتاج محليا:

```bash
npm run preview
```

رابط المعاينة الافتراضي:

```text
http://localhost:4173/my-portfolio/
```

### النشر على GitHub Pages

هذا المشروع معد مسبقا لـ GitHub Pages:

- يضبط `vite.config.js` القيمة `base: "/my-portfolio/"`، وهي مطابقة لاسم المستودع.
- يبني `.github/workflows/deploy.yml` الموقع وينشره تلقائيا.
- يثبت سير العمل الاعتماديات باستخدام `npm ci`، ثم يشغل `npm run build`، ويرفع `dist`، وينشره على Pages.
- يحتوي `index.html` على بيانات favicon وOpen Graph وTwitter Card.
- يستخدم `public/og-cover.svg` كصورة مشاركة اجتماعية.
- يستخدم `public/readme-preview.svg` كصورة معاينة README.

بعد رفع المستودع إلى GitHub:

1. افتح **Settings** في المستودع.
2. انتقل إلى **Pages**.
3. ضمن **Build and deployment** اختر **GitHub Actions**.
4. ادفع التغييرات إلى فرع `main`.
5. سيبني GitHub Actions المشروع وينشر مخرجات `dist` تلقائيا.

### الرفع إلى GitHub

افحص شجرة العمل قبل إنشاء commit:

```bash
git status --short
```

أمر موصى به لإضافة ملفات المشروع فقط:

```bash
git add README.md .gitignore package.json package-lock.json index.html vite.config.js tailwind.config.js postcss.config.js public src .github
git status --short
git commit -m "Update portfolio site"
git push origin main
```

إذا لم تتم إضافة المستودع البعيد بعد:

```bash
git remote add origin https://github.com/chenmo-24/my-portfolio.git
git branch -M main
git push -u origin main
```

### ملفات لا يجب رفعها في commit

الملفات والمجلدات المحلية التالية متجاهلة في `.gitignore`:

- `node_modules/`
- `dist/`
- `.vite/`
- `.claude/`
- `.vscode/`
- `.idea/`
- `.env`
- `.env.*`
- `.DS_Store`
- `Thumbs.db`

### بنية المشروع

```text
my-portfolio/
|-- index.html
|-- package.json
|-- package-lock.json
|-- vite.config.js
|-- tailwind.config.js
|-- postcss.config.js
|-- README.md
|-- .github/
|   `-- workflows/
|       `-- deploy.yml
|-- public/
|   |-- favicon.svg
|   |-- og-cover.svg
|   `-- readme-preview.svg
`-- src/
    |-- main.jsx
    |-- App.jsx
    |-- index.css
    |-- data/
    |   |-- personalInfo.js
    |   |-- projects.js
    |   |-- quotes.js
    |   |-- algorithmProgress.js
    |   |-- skills.js
    |   |-- nowPage.js
    |   |-- githubStats.js
    |   `-- codeSnippets.js
    |-- components/
    `-- hooks/
```

### أماكن التعديل الشائعة

| ما الذي تريد تغييره | الملف |
| --- | --- |
| الاسم، المقدمة، الأدوار، مجالات التركيز، البريد، رابط GitHub | `src/data/personalInfo.js` |
| بطاقات المشاريع، الأوصاف، الشارات، الروابط، وحزم التقنيات | `src/data/projects.js` |
| محتوى الاقتباسات اليومية | `src/data/quotes.js` |
| بيانات تقدم الخوارزميات | `src/data/algorithmProgress.js` |
| بيانات رادار المهارات | `src/data/skills.js` |
| محتوى Now Page | `src/data/nowPage.js` |
| بيانات عرض نشاط GitHub | `src/data/githubStats.js` |
| مقاطع الكود لتحدي الكتابة | `src/data/codeSnippets.js` |
| ترتيب أقسام الصفحة الرئيسية وربط التطبيق | `src/App.jsx` |
| قسم Hero والبطاقة ذات نمط الطرفية | `src/components/Hero.jsx` |
| قائمة وحدات Fun Zone | `src/components/FunZone.jsx` |
| سلوك تصور الخوارزميات | `src/components/AlgorithmVisualizer.jsx` |
| إجراءات لوحة الأوامر | `src/components/CommandPalette.jsx` |
| الأنماط العامة، والحركات، ومتغيرات CSS | `src/index.css` |

### استكشاف الأخطاء

- إذا كان مسار الصفحة على GitHub Pages غير صحيح، تأكد أن `base` في `vite.config.js` يساوي `/my-portfolio/`.
- إذا تصرفت الاعتماديات بشكل غير متوقع، احذف `node_modules/` ثم شغل `npm install` من جديد.
- إذا عرض خادم التطوير محتوى قديما، شغل `npm run dev -- --force`.
- إذا لم يتم تحديث GitHub Pages، افحص تبويب **Actions** وتأكد أن Pages مضبوط على **GitHub Actions**.
- إذا لم تظهر صور المعاينة الاجتماعية فورا، انتظر تحديث ذاكرة المنصة المؤقتة وتحقق من `public/og-cover.svg`.

---

<a id="한국어"></a>

## 한국어

### 프로젝트 개요

`chenmo-24 Portfolio`는 **Vite + React 18 + Tailwind CSS**로 만든 단일 페이지 개인 포트폴리오입니다. 개인 정보, 추천 프로젝트, 학습 진행 상황, 프로그래밍 인터랙티브 모듈, 연락처, 여러 작은 게임을 하나의 반응형 웹 경험으로 구성합니다.

이 사이트는 **풀스택 웹 개발**, **알고리즘과 자료구조**, **엔지니어링 실천**에 집중하는 컴퓨터공학 학생을 위해 설계되었습니다. 중국어와 영어 UI 전환, 다크 / 라이트 테마, 전역 명령 팔레트, 섹션 기반 스크롤 내비게이션, GitHub Actions를 통한 GitHub Pages 자동 배포를 지원합니다.

### 기술 스택

- **Vite 5**: 로컬 개발 서버, 빠른 핫 모듈 교체, 프로덕션 번들링.
- **React 18**: 컴포넌트 기반 UI 구조와 상태 기반 인터랙션.
- **Tailwind CSS 3**: 유틸리티 우선 스타일링, 반응형 레이아웃, 테마 인식 디자인.
- **Lucide React**: 내비게이션, 동작, UI 세부 요소에 사용하는 일관된 아이콘 시스템.
- **PostCSS + Autoprefixer**: CSS 처리와 브라우저 호환성 지원.
- **GitHub Actions**: GitHub Pages용 자동 빌드 및 배포 워크플로.

### 핵심 기능

- `Home`, `About`, `Projects`, `Fun Zone`, `Contact` 섹션을 포함한 단일 페이지 포트폴리오 레이아웃.
- 로컬 데이터 파일에 저장된 중국어와 영어 콘텐츠를 사용하는 이중 언어 앱 UI.
- 기본 다크 테마와 라이트 테마 전환 기능.
- 스크롤 중 현재 섹션을 자동으로 강조하는 고정 내비게이션.
- Hero 터미널 카드, 프로필 텍스트, 역할 태그, 기술 목록, 현재 학습 상태.
- 추천 오픈소스 프로젝트와 향후 개인 프로젝트를 위한 프로젝트 쇼케이스 영역.
- 알고리즘과 엔지니어링 진행 상황을 보여 주는 성장 맵과 학습 중심 콘텐츠 블록.
- GitHub와 이메일 정보를 제공하는 연락처 섹션.
- `Cmd/Ctrl + K`로 여는 전역 명령 팔레트.
- Konami Code 이스터 에그: `↑ ↑ ↓ ↓ ← → ← → B A`.
- 데스크톱과 모바일 기기를 위한 반응형 레이아웃.
- 저장소 경로에 맞춘 GitHub Pages 배포용 기본 경로 설정.

### Fun Zone 모듈

- **Algorithm Tracker**: 알고리즘 학습 진행률과 주제 완료 상태를 표시합니다.
- **Algorithm Visualizer**: `BFS`, `DFS`, `Dijkstra`, `A*`를 지원하는 인터랙티브 경로 탐색 시각화입니다.
- **Skill Radar**: 기술 역량 영역을 시각적으로 보여 줍니다.
- **Daily Quote**: 프로그래밍과 학습 관련 문구를 순환 표시합니다.
- **Now Page**: 현재 집중 분야, 단기 계획, 진행 중인 작업을 보여 줍니다.
- **Check-in Calendar**: 습관과 학습 활동 캘린더입니다.
- **GitHub Stats**: 기여 그래프 스타일의 활동과 GitHub 관련 통계를 표시합니다.
- **Interactive Terminal**: 포트폴리오 안에서 사용하는 명령줄 스타일 인터랙션입니다.
- **Terminal Quest**: 터미널 테마의 퍼즐 모듈입니다.
- **Code Typing Challenge**: 코드 스니펫 기반 타이핑 연습입니다.
- **Bug Hunt**: 작은 디버깅 챌린지입니다.
- **Developer Quiz**: 개발자 성향 테스트 스타일의 퀴즈입니다.
- **Snake**: 클래식 스네이크 게임입니다.
- **2048**: 숫자 병합 퍼즐 게임입니다.
- **Conway's Game of Life**: 세포 자동자 시뮬레이션입니다.

### 로컬 개발

의존성을 설치하고 개발 서버를 시작합니다:

```bash
npm install
npm run dev
```

기본 개발 URL:

```text
http://localhost:5173/my-portfolio/
```

Vite 캐시가 올바르게 갱신되지 않으면 강제 모드로 개발 서버를 시작합니다:

```bash
npm run dev -- --force
```

### 빌드와 미리보기

프로덕션 빌드를 생성합니다:

```bash
npm run build
```

프로덕션 빌드를 로컬에서 미리 봅니다:

```bash
npm run preview
```

기본 미리보기 URL:

```text
http://localhost:4173/my-portfolio/
```

### GitHub Pages 배포

이 프로젝트는 이미 GitHub Pages용으로 설정되어 있습니다:

- `vite.config.js`는 저장소 이름과 일치하는 `base: "/my-portfolio/"`를 설정합니다.
- `.github/workflows/deploy.yml`이 사이트를 자동으로 빌드하고 배포합니다.
- 워크플로는 `npm ci`로 의존성을 설치하고, `npm run build`를 실행한 뒤, `dist`를 업로드하고 Pages에 배포합니다.
- `index.html`에는 favicon, Open Graph, Twitter Card 메타데이터가 포함되어 있습니다.
- `public/og-cover.svg`는 소셜 공유 이미지로 사용됩니다.
- `public/readme-preview.svg`는 README 미리보기 이미지로 사용됩니다.

저장소를 GitHub에 푸시한 뒤:

1. 저장소 **Settings**를 엽니다.
2. **Pages**로 이동합니다.
3. **Build and deployment**에서 **GitHub Actions**를 선택합니다.
4. `main` 브랜치로 푸시합니다.
5. GitHub Actions가 프로젝트를 빌드하고 `dist` 출력을 자동으로 게시합니다.

### GitHub에 업로드

커밋 전에 작업 트리를 확인합니다:

```bash
git status --short
```

프로젝트 파일만 스테이징하는 권장 명령:

```bash
git add README.md .gitignore package.json package-lock.json index.html vite.config.js tailwind.config.js postcss.config.js public src .github
git status --short
git commit -m "Update portfolio site"
git push origin main
```

아직 원격 저장소를 추가하지 않았다면:

```bash
git remote add origin https://github.com/chenmo-24/my-portfolio.git
git branch -M main
git push -u origin main
```

### 커밋하지 않아야 하는 파일

다음 로컬 파일과 폴더는 `.gitignore`에서 무시됩니다:

- `node_modules/`
- `dist/`
- `.vite/`
- `.claude/`
- `.vscode/`
- `.idea/`
- `.env`
- `.env.*`
- `.DS_Store`
- `Thumbs.db`

### 프로젝트 구조

```text
my-portfolio/
|-- index.html
|-- package.json
|-- package-lock.json
|-- vite.config.js
|-- tailwind.config.js
|-- postcss.config.js
|-- README.md
|-- .github/
|   `-- workflows/
|       `-- deploy.yml
|-- public/
|   |-- favicon.svg
|   |-- og-cover.svg
|   `-- readme-preview.svg
`-- src/
    |-- main.jsx
    |-- App.jsx
    |-- index.css
    |-- data/
    |   |-- personalInfo.js
    |   |-- projects.js
    |   |-- quotes.js
    |   |-- algorithmProgress.js
    |   |-- skills.js
    |   |-- nowPage.js
    |   |-- githubStats.js
    |   `-- codeSnippets.js
    |-- components/
    `-- hooks/
```

### 자주 수정하는 위치

| 변경할 내용 | 파일 |
| --- | --- |
| 이름, 소개, 역할, 집중 분야, 이메일, GitHub 링크 | `src/data/personalInfo.js` |
| 프로젝트 카드, 설명, 배지, 링크, 기술 스택 | `src/data/projects.js` |
| Daily Quote 콘텐츠 | `src/data/quotes.js` |
| 알고리즘 진행 데이터 | `src/data/algorithmProgress.js` |
| Skill Radar 데이터 | `src/data/skills.js` |
| Now Page 콘텐츠 | `src/data/nowPage.js` |
| GitHub 활동 표시 데이터 | `src/data/githubStats.js` |
| 타이핑 챌린지 코드 스니펫 | `src/data/codeSnippets.js` |
| 메인 페이지 섹션 순서와 앱 수준 연결 | `src/App.jsx` |
| Hero 섹션과 터미널 스타일 카드 | `src/components/Hero.jsx` |
| Fun Zone 모듈 목록 | `src/components/FunZone.jsx` |
| 알고리즘 시각화 동작 | `src/components/AlgorithmVisualizer.jsx` |
| 명령 팔레트 동작 | `src/components/CommandPalette.jsx` |
| 전역 스타일, 애니메이션, CSS 변수 | `src/index.css` |

### 문제 해결

- GitHub Pages의 페이지 경로가 잘못되면 `vite.config.js`의 `base`가 `/my-portfolio/`인지 확인합니다.
- 의존성이 예상과 다르게 동작하면 `node_modules/`를 삭제하고 `npm install`을 다시 실행합니다.
- 개발 서버가 오래된 내용을 보여 주면 `npm run dev -- --force`를 실행합니다.
- GitHub Pages가 업데이트되지 않으면 **Actions** 탭을 확인하고 Pages가 **GitHub Actions**로 설정되어 있는지 확인합니다.
- 소셜 미리보기 이미지가 바로 나타나지 않으면 플랫폼 캐시 갱신을 기다리고 `public/og-cover.svg`를 확인합니다.

---

<div align="center">

Built with React by [chenmo-24](https://github.com/chenmo-24)

</div>
