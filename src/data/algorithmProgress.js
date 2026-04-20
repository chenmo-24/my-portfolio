const algorithmProgress = {
  summary: {
    title: {
      zh: "算法进度面板",
      en: "Algorithm Progress Panel",
    },
    subtitle: {
      zh: "把刷题从零散记录变成可视化推进。当前主线是 AcWing 算法基础课，LeetCode Hot 100 作为后续系统训练的备选队列。",
      en: "Turn fragmented problem-solving records into visible progress. The main track is the AcWing Algorithm Fundamentals course, with LeetCode Hot 100 queued as follow-up systematic practice.",
    },
  },
  tracks: [
    {
      title: {
        zh: "AcWing 算法基础课",
        en: "AcWing Algorithm Fundamentals",
      },
      badge: {
        zh: "主线训练",
        en: "Main Track",
      },
      completed: 8,
      total: 106,
      note: {
        zh: "覆盖从基础算法到动态规划的 6 讲模板。当前从数据结构和动态规划切入，后续补齐搜索、图论和数学部分。",
        en: "Six lectures spanning basic algorithms to dynamic programming. Currently starting from Data Structures and DP, with Search / Graph Theory / Math to follow.",
      },
      details: [
        { label: { zh: "第一讲 · 基础算法", en: "1 · Basic Algorithms" }, completed: 0, total: 20 },
        { label: { zh: "第二讲 · 数据结构", en: "2 · Data Structures" }, completed: 5, total: 17 },
        { label: { zh: "第三讲 · 搜索与图论", en: "3 · Search & Graph Theory" }, completed: 0, total: 17 },
        { label: { zh: "第四讲 · 数学知识", en: "4 · Math" }, completed: 0, total: 26 },
        { label: { zh: "第五讲 · 动态规划", en: "5 · Dynamic Programming" }, completed: 3, total: 18 },
        { label: { zh: "第六讲 · 贪心", en: "6 · Greedy" }, completed: 0, total: 8 },
      ],
    },
    {
      title: {
        zh: "LeetCode Hot 100",
        en: "LeetCode Hot 100",
      },
      badge: {
        zh: "待启动",
        en: "Planned",
      },
      completed: 0,
      total: 100,
      note: {
        zh: "等 AcWing 算法基础课过一遍、模板熟练后再系统刷，目标是把高频题型做到条件反射。",
        en: "Will kick off after the AcWing course is through and templates are fluent — goal is muscle-memory on high-frequency patterns.",
      },
      details: [
        { label: { zh: "哈希 / 双指针", en: "Hash / Two Pointers" }, completed: 0, total: 12 },
        { label: { zh: "滑动窗口 / 子串", en: "Sliding Window / Substring" }, completed: 0, total: 9 },
        { label: { zh: "二叉树 / DFS / BFS", en: "Binary Tree / DFS / BFS" }, completed: 0, total: 22 },
        { label: { zh: "动态规划", en: "Dynamic Programming" }, completed: 0, total: 18 },
        { label: { zh: "链表 / 栈 / 队列", en: "Linked List / Stack / Queue" }, completed: 0, total: 16 },
      ],
    },
  ],
};

export default algorithmProgress;
