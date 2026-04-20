const skillRadar = {
  summary: {
    title: {
      zh: "技能雷达图",
      en: "Skill Radar",
    },
    subtitle: {
      zh: "把现有技术栈画成一张六维图，比列清单更容易看到边界和成长方向。",
      en: "Turn the current stack into a six-axis chart so gaps and growth areas become visible.",
    },
  },
  axes: [
    { name: { zh: "React / 前端", en: "React / Frontend" }, value: 8 },
    { name: { zh: "JavaScript", en: "JavaScript" }, value: 8 },
    { name: { zh: "算法 / 数据结构", en: "Algorithms / DS" }, value: 7 },
    { name: { zh: "C++", en: "C++" }, value: 6 },
    { name: { zh: "Linux / Git", en: "Linux / Git" }, value: 7 },
    { name: { zh: "工程化 / 部署", en: "Engineering / Deploy" }, value: 6 },
  ],
  notes: {
    zh: [
      "前端目前最熟悉，能独立搭建 React 项目并完成部署。",
      "算法在持续训练，Hot 100 与 AcWing 基础题同步推进。",
      "C++ 仍以竞赛/训练题为主，工程应用后续补齐。",
    ],
    en: [
      "Frontend is the most comfortable area, with independent React builds and deployments.",
      "Algorithms are in active training, Hot 100 and AcWing fundamentals progressing in parallel.",
      "C++ usage is still mainly contest-oriented; engineering usage will follow later.",
    ],
  },
};

export default skillRadar;
