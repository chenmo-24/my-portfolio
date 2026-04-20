const algorithmProgress = {
  summary: {
    title: {
      zh: "算法进度面板",
      en: "Algorithm Progress Panel",
    },
    subtitle: {
      zh: "把刷题从零散记录变成可视化推进。这里先放 LeetCode Hot 100 和 AcWing 算法基础题的阶段性进度。",
      en: "Turn fragmented problem-solving records into visible progress. This panel currently tracks LeetCode Hot 100 and AcWing fundamentals.",
    },
  },
  tracks: [
    {
      title: {
        zh: "LeetCode Hot 100",
        en: "LeetCode Hot 100",
      },
      badge: {
        zh: "面试核心",
        en: "Interview Core",
      },
      completed: 37,
      total: 100,
      note: {
        zh: "当前优先把高频题型刷顺，先建立题型识别和常见套路反应速度。",
        en: "The current priority is to get comfortable with high-frequency patterns and improve recognition speed for common techniques.",
      },
      details: [
        { label: { zh: "哈希 / 双指针", en: "Hash / Two Pointers" }, completed: 8, total: 12 },
        { label: { zh: "滑动窗口 / 子串", en: "Sliding Window / Substring" }, completed: 5, total: 9 },
        { label: { zh: "二叉树 / DFS / BFS", en: "Binary Tree / DFS / BFS" }, completed: 9, total: 22 },
        { label: { zh: "动态规划", en: "Dynamic Programming" }, completed: 7, total: 18 },
        { label: { zh: "链表 / 栈 / 队列", en: "Linked List / Stack / Queue" }, completed: 8, total: 16 },
      ],
    },
    {
      title: {
        zh: "AcWing 算法基础题",
        en: "AcWing Fundamentals",
      },
      badge: {
        zh: "基础训练",
        en: "Foundation",
      },
      completed: 54,
      total: 120,
      note: {
        zh: "更偏向打基础和训练代码稳定性，重点放在模板熟练度、边界处理和复杂度意识。",
        en: "This track focuses more on fundamentals and code stability, especially templates, edge-case handling, and complexity awareness.",
      },
      details: [
        { label: { zh: "基础算法", en: "Basic Algorithms" }, completed: 12, total: 18 },
        { label: { zh: "数据结构", en: "Data Structures" }, completed: 14, total: 26 },
        { label: { zh: "搜索与图论", en: "Search and Graph Theory" }, completed: 11, total: 28 },
        { label: { zh: "数学知识", en: "Math" }, completed: 9, total: 22 },
        { label: { zh: "动态规划", en: "Dynamic Programming" }, completed: 8, total: 26 },
      ],
    },
  ],
};

export default algorithmProgress;
