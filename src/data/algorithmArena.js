export const arenaChallenges = [
  {
    id: "city-grid",
    title: { zh: "城市网格", en: "City Grid" },
    desc: { zh: "避开街区障碍，比较不同算法的访问范围。", en: "Avoid city blocks and compare algorithm visit ranges." },
    rows: 8,
    cols: 10,
    start: { r: 1, c: 1 },
    end: { r: 6, c: 8 },
    walls: [
      [1, 3], [2, 3], [3, 3], [5, 3], [6, 3],
      [2, 6], [3, 6], [4, 6], [5, 6],
      [0, 8], [1, 8], [3, 8],
    ],
  },
  {
    id: "narrow-pass",
    title: { zh: "狭窄通道", en: "Narrow Pass" },
    desc: { zh: "只有一条绕行通路，适合观察路径重建。", en: "A single winding route makes path reconstruction visible." },
    rows: 8,
    cols: 10,
    start: { r: 0, c: 0 },
    end: { r: 7, c: 9 },
    walls: [
      [0, 2], [1, 2], [2, 2], [3, 2], [5, 2], [6, 2],
      [1, 5], [2, 5], [3, 5], [4, 5], [5, 5], [7, 5],
      [0, 7], [2, 7], [3, 7], [4, 7], [5, 7],
    ],
  },
  {
    id: "open-field",
    title: { zh: "开阔场地", en: "Open Field" },
    desc: { zh: "少量障碍让启发式搜索的方向感更明显。", en: "Sparse walls make heuristic direction easier to observe." },
    rows: 8,
    cols: 10,
    start: { r: 6, c: 1 },
    end: { r: 1, c: 8 },
    walls: [
      [2, 2], [3, 2], [4, 2],
      [3, 4], [4, 4], [5, 4],
      [1, 6], [2, 6], [4, 7], [5, 7],
    ],
  },
];

export const arenaAlgorithms = [
  { id: "bfs", label: "BFS" },
  { id: "dfs", label: "DFS" },
  { id: "dijkstra", label: "Dijkstra" },
  { id: "astar", label: "A*" },
];
