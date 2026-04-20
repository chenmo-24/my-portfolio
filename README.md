# chenmo-24 | 个人作品集

![README Preview](./public/readme-preview.svg)

一个基于 Vite、React 和 Tailwind CSS 构建的单页作品集网站，包含双语界面、深浅色切换、算法进度面板、打卡日历、每日语录和贪吃蛇小游戏，并已适配 GitHub Pages 部署。

## 技术栈

- Vite 5
- React 18
- Tailwind CSS 3
- Lucide React

## 功能特色

- 默认深色主题，支持一键切换深浅色
- 默认中文界面，支持一键切换中英文
- 单页滚动导航，自动高亮当前区块
- Hero 区终端卡片、状态条、日志面板与滚动引导
- 推荐项目展示与后续个人项目占位
- 算法进度可视化面板
- 每日语录随机切换
- 本月打卡日历，支持 `localStorage` 持久化
- 20x20 网格贪吃蛇小游戏，支持方向键、WASD 和触屏按钮
- GitHub Pages 自动部署工作流

## 本地运行

```bash
cd my-portfolio
npm install
npm run dev
```

默认开发地址通常为 `http://localhost:5173`。

## 构建与预览

```bash
npm run build
npm run preview
```

## 部署说明

项目已经配置：

- `vite.config.js` 中的 `base: '/my-portfolio/'`
- `.github/workflows/deploy.yml` GitHub Pages 自动部署
- `index.html` 中的 favicon、OG、Twitter Card 元信息
- `public/og-cover.svg` 用作社交分享封面

### GitHub Pages 自动部署

1. 将仓库推送到 `main` 分支。
2. 进入 GitHub 仓库设置，打开 `Pages`。
3. `Build and deployment` 选择 `GitHub Actions`。
4. 后续每次推送到 `main` 都会自动构建并部署。

### 部署前最终检查

- 确认仓库名仍为 `my-portfolio`
- 确认 GitHub 用户名仍为 `chenmo-24`
- 确认 `vite.config.js` 中 `base` 仍是 `/my-portfolio/`
- 确认 `index.html` 中的 OG 地址指向 `https://chenmo-24.github.io/my-portfolio/og-cover.svg`
- 确认 GitHub Pages Source 已设置为 `GitHub Actions`

## 项目结构

```text
my-portfolio/
|-- index.html
|-- package.json
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
    |   `-- algorithmProgress.js
    |-- components/
    |   |-- Navbar.jsx
    |   |-- Hero.jsx
    |   |-- About.jsx
    |   |-- Projects.jsx
    |   |-- FunZone.jsx
    |   |-- DailyQuote.jsx
    |   |-- CheckinCalendar.jsx
    |   |-- SnakeGame.jsx
    |   |-- AlgorithmTracker.jsx
    |   |-- Contact.jsx
    |   `-- Footer.jsx
    `-- hooks/
        |-- useTheme.js
        `-- useLanguage.js
```

## 自定义修改

- 修改个人信息：`src/data/personalInfo.js`
- 修改推荐项目和占位项目：`src/data/projects.js`
- 修改每日语录：`src/data/quotes.js`
- 修改算法进度：`src/data/algorithmProgress.js`
- 修改打卡逻辑：`src/components/CheckinCalendar.jsx`
- 修改首页终端动画：`src/components/Hero.jsx`
- 修改主题和全局动效：`src/index.css`

## 修改 GitHub 用户名或仓库名时需要同步调整的位置

如果你之后修改 GitHub 用户名或仓库名，需要同步检查：

- `vite.config.js` 中的 `base`
- `index.html` 中的 `og:url`、`og:image`、`twitter:image`
- `src/data/personalInfo.js` 中的 GitHub 链接
- `README.md` 中涉及的仓库地址说明
- GitHub 仓库 Pages 配置

## 常见问题排查

### 1. 端口被占用

```bash
npm run dev -- --host 0.0.0.0 --port 4173
```

### 2. `node_modules` 权限异常

```bash
rm -rf node_modules package-lock.json
npm cache verify
npm install
```

### 3. 依赖安装失败

```bash
npm cache clean --force
rm -rf node_modules package-lock.json
npm install
```

### 4. GitHub Pages 页面空白

优先检查：

- `base` 配置是否正确
- 部署产物是否来自 `dist/`
- Pages 是否启用了 `GitHub Actions`
- 资源地址是否仍带 `/my-portfolio/` 前缀
