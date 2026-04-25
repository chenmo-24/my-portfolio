import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Eraser, Flag, Map as MapIcon, MousePointer2, Play, RotateCcw, Route, Sparkles } from "lucide-react";

const ROWS = 10;
const COLS = 16;

const PRESET_WALLS = [
  [1, 3], [2, 3], [3, 3], [4, 3], [6, 3], [7, 3], [8, 3],
  [1, 8], [2, 8], [3, 8], [5, 8], [6, 8], [7, 8], [8, 8],
  [5, 4], [5, 5], [5, 6], [5, 7], [5, 9], [5, 10], [5, 11], [5, 12],
  [2, 12], [3, 12], [4, 12], [6, 12], [7, 12],
];

function keyOf(cell) {
  return `${cell.r},${cell.c}`;
}

function sameCell(a, b) {
  return a.r === b.r && a.c === b.c;
}

function neighbors(cell) {
  return [
    { r: cell.r - 1, c: cell.c },
    { r: cell.r, c: cell.c + 1 },
    { r: cell.r + 1, c: cell.c },
    { r: cell.r, c: cell.c - 1 },
  ].filter((next) => next.r >= 0 && next.r < ROWS && next.c >= 0 && next.c < COLS);
}

function heuristic(a, b) {
  return Math.abs(a.r - b.r) + Math.abs(a.c - b.c);
}

function reconstructPath(parent, startKey, endKey) {
  const path = [];
  let cursor = endKey;

  while (cursor) {
    const [r, c] = cursor.split(",").map(Number);
    path.unshift({ r, c });
    if (cursor === startKey) break;
    cursor = parent.get(cursor);
  }

  return path;
}

function cellStyle({ isActive, isEnd, isPath, isStart, isVisited, isWall }) {
  let background = "rgba(100, 116, 139, 0.1)";
  let color = "#f8fafc";
  let boxShadow = "none";
  let borderColor = "rgba(255, 255, 255, 0.08)";
  let transform = "none";

  if (isWall) {
    background = "#475569";
  }

  if (isVisited) {
    background = "rgba(34, 211, 238, 0.5)";
    boxShadow = "0 0 12px rgba(34, 211, 238, 0.3)";
  }

  if (isPath) {
    background = "#facc15";
    color = "#020617";
    boxShadow = "0 0 18px rgba(250, 204, 21, 0.55)";
  }

  if (isStart) {
    background = "#34d399";
    color = "#020617";
    boxShadow = "0 0 18px rgba(52, 211, 153, 0.55)";
  }

  if (isEnd) {
    background = "#fb7185";
    color = "#020617";
    boxShadow = "0 0 18px rgba(251, 113, 133, 0.55)";
  }

  if (isActive) {
    borderColor = "#ffffff";
    boxShadow = `${boxShadow === "none" ? "" : `${boxShadow}, `}0 0 0 3px rgba(255, 255, 255, 0.85)`;
    transform = "scale(1.12)";
  }

  return { background, borderColor, boxShadow, color, transform };
}

function runSearch(type, start, end, walls) {
  const startKey = keyOf(start);
  const endKey = keyOf(end);
  const visited = new Set();
  const parent = new Map();
  const order = [];

  const isBlocked = (cellKey) => cellKey !== startKey && cellKey !== endKey && walls.has(cellKey);

  if (startKey === endKey) {
    return {
      found: true,
      order: [start],
      path: [start],
    };
  }

  if (type === "dfs") {
    const stack = [start];
    const queued = new Set([startKey]);

    while (stack.length) {
      const current = stack.pop();
      const currentKey = keyOf(current);
      if (visited.has(currentKey) || isBlocked(currentKey)) continue;

      visited.add(currentKey);
      order.push(current);
      if (currentKey === endKey) break;

      [...neighbors(current)].reverse().forEach((next) => {
        const nextKey = keyOf(next);
        if (!queued.has(nextKey) && !visited.has(nextKey) && !isBlocked(nextKey)) {
          if (!parent.has(nextKey)) parent.set(nextKey, currentKey);
          queued.add(nextKey);
          stack.push(next);
        }
      });
    }
  } else if (type === "bfs") {
    const queue = [start];
    visited.add(startKey);
    while (queue.length) {
      const current = queue.shift();
      const currentKey = keyOf(current);
      if (isBlocked(currentKey)) continue;

      order.push(current);
      if (currentKey === endKey) break;

      neighbors(current).forEach((next) => {
        const nextKey = keyOf(next);
        if (!visited.has(nextKey) && !isBlocked(nextKey)) {
          visited.add(nextKey);
          parent.set(nextKey, currentKey);
          queue.push(next);
        }
      });
    }
  } else {
    const open = [start];
    const distance = new Map([[startKey, 0]]);
    const score = new Map([[startKey, type === "astar" ? heuristic(start, end) : 0]]);

    while (open.length) {
      open.sort((a, b) => (score.get(keyOf(a)) ?? Infinity) - (score.get(keyOf(b)) ?? Infinity));
      const current = open.shift();
      const currentKey = keyOf(current);
      if (visited.has(currentKey) || isBlocked(currentKey)) continue;

      visited.add(currentKey);
      order.push(current);
      if (currentKey === endKey) break;

      neighbors(current).forEach((next) => {
        const nextKey = keyOf(next);
        if (isBlocked(nextKey) || visited.has(nextKey)) return;

        const nextDistance = (distance.get(currentKey) ?? Infinity) + 1;
        if (nextDistance < (distance.get(nextKey) ?? Infinity)) {
          parent.set(nextKey, currentKey);
          distance.set(nextKey, nextDistance);
          score.set(nextKey, nextDistance + (type === "astar" ? heuristic(next, end) : 0));
          open.push(next);
        }
      });
    }
  }

  const found = order.some((cell) => keyOf(cell) === endKey);
  return {
    found,
    order,
    path: found ? reconstructPath(parent, startKey, endKey) : [],
  };
}

function AlgorithmVisualizer({ language }) {
  const [algorithm, setAlgorithm] = useState("astar");
  const [mode, setMode] = useState("wall");
  const [start, setStart] = useState({ r: 1, c: 1 });
  const [end, setEnd] = useState({ r: 8, c: 14 });
  const [walls, setWalls] = useState(() => new Set(PRESET_WALLS.map(([r, c]) => `${r},${c}`)));
  const [visitedCells, setVisitedCells] = useState(new Set());
  const [pathCells, setPathCells] = useState(new Set());
  const [activeCell, setActiveCell] = useState(null);
  const [stats, setStats] = useState({ visited: 0, path: 0, status: "idle", error: "" });
  const [running, setRunning] = useState(false);
  const timerRef = useRef(null);
  const drawingRef = useRef(false);
  const wallActionRef = useRef(null);

  const zh = language === "zh";

  const labels = useMemo(
    () => ({
      wall: zh ? "画墙" : "Wall",
      start: zh ? "起点" : "Start",
      end: zh ? "终点" : "End",
    }),
    [zh]
  );

  const stopTimer = useCallback(() => {
    if (timerRef.current) {
      window.clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  useEffect(() => () => stopTimer(), [stopTimer]);

  useEffect(() => {
    const stopDrawing = () => {
      drawingRef.current = false;
      wallActionRef.current = null;
    };

    window.addEventListener("pointerup", stopDrawing);
    window.addEventListener("pointercancel", stopDrawing);
    return () => {
      window.removeEventListener("pointerup", stopDrawing);
      window.removeEventListener("pointercancel", stopDrawing);
    };
  }, []);

  const resetView = () => {
    stopTimer();
    setRunning(false);
    setVisitedCells(new Set());
    setPathCells(new Set());
    setActiveCell(null);
    setStats({ visited: 0, path: 0, status: "idle", error: "" });
  };

  const resetMaze = () => {
    resetView();
    setStart({ r: 1, c: 1 });
    setEnd({ r: 8, c: 14 });
    setWalls(new Set(PRESET_WALLS.map(([r, c]) => `${r},${c}`)));
  };

  const clearWalls = () => {
    resetView();
    setWalls(new Set());
  };

  const randomWalls = () => {
    resetView();
    const next = new Set();
    for (let r = 0; r < ROWS; r += 1) {
      for (let c = 0; c < COLS; c += 1) {
        const cell = { r, c };
        if (!sameCell(cell, start) && !sameCell(cell, end) && Math.random() < 0.23) {
          next.add(keyOf(cell));
        }
      }
    }
    setWalls(next);
  };

  const setWallAt = (cell, shouldAdd) => {
    const cellKey = keyOf(cell);
    if (sameCell(cell, start) || sameCell(cell, end)) return;

    setWalls((current) => {
      const next = new Set(current);
      if (shouldAdd) next.add(cellKey);
      else next.delete(cellKey);
      return next;
    });
  };

  const toggleCell = (cell) => {
    resetView();
    const cellKey = keyOf(cell);

    if (mode === "start") {
      if (sameCell(cell, end)) return;
      setStart(cell);
      setWalls((current) => {
        const next = new Set(current);
        next.delete(cellKey);
        return next;
      });
      return;
    }

    if (mode === "end") {
      if (sameCell(cell, start)) return;
      setEnd(cell);
      setWalls((current) => {
        const next = new Set(current);
        next.delete(cellKey);
        return next;
      });
      return;
    }

    if (sameCell(cell, start) || sameCell(cell, end)) return;
    setWalls((current) => {
      const next = new Set(current);
      if (next.has(cellKey)) next.delete(cellKey);
      else next.add(cellKey);
      return next;
    });
  };

  const handleCellPointerDown = (event, cell) => {
    event.preventDefault();

    if (mode !== "wall") {
      drawingRef.current = false;
      wallActionRef.current = null;
      toggleCell(cell);
      return;
    }

    resetView();
    const shouldAdd = !walls.has(keyOf(cell));
    drawingRef.current = true;
    wallActionRef.current = shouldAdd;
    setWallAt(cell, shouldAdd);
  };

  const handleCellPointerEnter = (cell) => {
    if (!drawingRef.current || mode !== "wall" || wallActionRef.current === null) return;
    setWallAt(cell, wallActionRef.current);
  };

  const run = () => {
    stopTimer();
    setRunning(false);
    setVisitedCells(new Set());
    setPathCells(new Set());
    setActiveCell(null);

    try {
      const wallsCopy = new Set(walls);
      const result = runSearch(algorithm, { ...start }, { ...end }, wallsCopy);
      const visitedKeys = new Set(result.order.map(keyOf));
      const pathKeys = new Set(result.path.map(keyOf));

      setVisitedCells(visitedKeys);
      setPathCells(pathKeys);
      setActiveCell(result.path.length ? keyOf(result.path[result.path.length - 1]) : null);
      setStats({
        visited: result.order.length,
        path: result.path.length,
        status: result.found ? "done" : "blocked",
        error: "",
      });
    } catch (err) {
      setStats({ visited: 0, path: 0, status: "blocked", error: String(err) });
    }
  };

  const cells = [];
  for (let r = 0; r < ROWS; r += 1) {
    for (let c = 0; c < COLS; c += 1) {
      const cell = { r, c };
      const cellKey = keyOf(cell);
      const isStart = sameCell(cell, start);
      const isEnd = sameCell(cell, end);
      const isWall = walls.has(cellKey);
      const isPath = pathCells.has(cellKey);
      const isVisited = visitedCells.has(cellKey);
      const isActive = activeCell === cellKey;

      let cls = "bg-slate-500/10 hover:bg-cyan-400/20";
      if (isWall) cls = "bg-slate-800 dark:bg-slate-100/80";
      if (isVisited) cls = "bg-cyan-400/35 shadow-[0_0_10px_rgba(34,211,238,0.2)]";
      if (isPath) cls = "bg-amber-300 text-slate-950 shadow-[0_0_14px_rgba(252,211,77,0.45)]";
      if (isStart) cls = "bg-emerald-400 text-slate-950 shadow-[0_0_16px_rgba(52,211,153,0.45)]";
      if (isEnd) cls = "bg-rose-400 text-slate-950 shadow-[0_0_16px_rgba(251,113,133,0.45)]";
      if (isActive) {
        cls += " scale-110 ring-2 ring-cyan-200 ring-offset-1 ring-offset-slate-950";
      }
      const style = cellStyle({ isActive, isEnd, isPath, isStart, isVisited, isWall });

      cells.push(
        <button
          key={cellKey}
          className={`relative aspect-square rounded-[4px] border border-white/5 text-[10px] font-bold transition ${cls}`}
          style={style}
          onPointerDown={(event) => handleCellPointerDown(event, cell)}
          onPointerEnter={() => handleCellPointerEnter(cell)}
          type="button"
          aria-label={`${r},${c}`}
        >
          {isStart ? "S" : isEnd ? "E" : ""}
          {isActive && !isStart && !isEnd ? (
            <span className="absolute inset-0 flex items-center justify-center rounded-[3px] border border-white/80 bg-white/30 text-[9px] font-black text-white">
              +
            </span>
          ) : null}
        </button>
      );
    }
  }

  const statusText = {
    idle: zh ? "待运行" : "Idle",
    running: zh ? "搜索中" : "Searching",
    path: zh ? "回溯路径" : "Tracing",
    done: zh ? "路径完成" : "Path Found",
    blocked: zh ? "未找到路径" : "No Path",
  }[stats.status];

  return (
    <div className="panel-card overflow-hidden p-5 sm:p-8 md:p-10">
      <div className="mb-6">
        <p className="section-title mb-2">Module L</p>
        <h3 className="text-2xl font-semibold text-slate-900 dark:text-white">
          {zh ? "算法可视化挑战" : "Algorithm Visualizer Challenge"}
        </h3>
        <p className="mt-4 max-w-3xl text-base leading-8 text-slate-700 dark:text-slate-300">
          {zh
            ? "选择 BFS、DFS、Dijkstra 或 A*，手动画墙、调整起点终点，再观察搜索顺序和最终路径。这个模块把算法进度从数字变成可见的推演过程。"
            : "Choose BFS, DFS, Dijkstra, or A*, edit walls and endpoints, then watch the search order and final route. It turns algorithm progress into visible reasoning."}
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1fr_18rem]">
        <div className="glass-panel p-3 sm:p-5">
          <div className="mb-4 grid grid-cols-3 gap-2 sm:gap-3">
            <div className="rounded-xl border border-white/10 bg-white/5 px-3 py-2">
              <p className="text-[10px] uppercase tracking-wider text-slate-500 dark:text-slate-400">
                {zh ? "访问格" : "Visited"}
              </p>
              <p className="mt-1 text-2xl font-bold text-slate-900 dark:text-white">{stats.visited}</p>
            </div>
            <div className="rounded-xl border border-white/10 bg-white/5 px-3 py-2">
              <p className="text-[10px] uppercase tracking-wider text-slate-500 dark:text-slate-400">
                {zh ? "路径长" : "Path"}
              </p>
              <p className="mt-1 text-2xl font-bold text-slate-900 dark:text-white">{stats.path}</p>
            </div>
            <div className="rounded-xl border border-white/10 bg-white/5 px-3 py-2">
              <p className="text-[10px] uppercase tracking-wider text-slate-500 dark:text-slate-400">
                {zh ? "状态" : "Status"}
              </p>
              <p className="mt-1 text-sm font-semibold text-slate-900 dark:text-white sm:text-base">{statusText}</p>
              {stats.error ? <p className="mt-1 text-[9px] text-rose-400 break-all">{stats.error}</p> : null}
            </div>
          </div>

          <div
            className="grid gap-[3px] rounded-2xl border border-white/10 bg-slate-950/80 p-2"
            style={{ gridTemplateColumns: `repeat(${COLS}, minmax(0, 1fr))`, touchAction: "none" }}
          >
            {cells}
          </div>
        </div>

        <div className="space-y-5">
          <div className="glass-panel p-5">
            <p className="mb-3 inline-flex items-center gap-2 text-sm uppercase tracking-[0.28em] text-slate-500 dark:text-slate-400">
              <Route size={14} />
              {zh ? "算法" : "Algorithm"}
            </p>
            <div className="grid grid-cols-2 gap-2">
              {[
                ["bfs", "BFS"],
                ["dfs", "DFS"],
                ["dijkstra", "Dijkstra"],
                ["astar", "A*"],
              ].map(([id, label]) => (
                <button
                  key={id}
                  className={`rounded-full px-3 py-2 text-xs font-semibold transition ${
                    algorithm === id
                      ? "bg-cyan-500 text-slate-950 shadow-[0_8px_24px_rgba(34,211,238,0.35)]"
                      : "border border-white/10 bg-white/5 text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white"
                  }`}
                  onClick={() => {
                    resetView();
                    setAlgorithm(id);
                  }}
                  type="button"
                >
                  {label}
                </button>
              ))}
            </div>
          </div>

          <div className="glass-panel p-5">
            <p className="mb-3 inline-flex items-center gap-2 text-sm uppercase tracking-[0.28em] text-slate-500 dark:text-slate-400">
              <MousePointer2 size={14} />
              {zh ? "编辑模式" : "Edit Mode"}
            </p>
            <div className="grid grid-cols-3 gap-2">
              {[
                ["wall", MapIcon],
                ["start", Flag],
                ["end", Sparkles],
              ].map(([id, Icon]) => (
                <button
                  key={id}
                  className={`secondary-button px-0 py-2 text-xs ${mode === id ? "border-cyan-400/40 bg-cyan-400/15 text-cyan-500" : ""}`}
                  onClick={() => setMode(id)}
                  type="button"
                >
                  <Icon size={14} />
                  {labels[id]}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <button className="primary-button px-3 py-2 text-xs" onClick={run} disabled={running} type="button">
              <Play size={15} />
              {running ? (zh ? "运行中…" : "Running…") : (zh ? "运行" : "Run")}
            </button>
            <button className="secondary-button px-3 py-2 text-xs" onClick={resetView} type="button">
              <RotateCcw size={15} />
              {zh ? "重置视图" : "Reset View"}
            </button>
            <button className="secondary-button px-3 py-2 text-xs" onClick={randomWalls} type="button">
              <Sparkles size={15} />
              {zh ? "随机墙" : "Random"}
            </button>
            <button className="secondary-button px-3 py-2 text-xs" onClick={clearWalls} type="button">
              <Eraser size={15} />
              {zh ? "清空墙" : "Clear"}
            </button>
          </div>

          <button className="secondary-button w-full px-3 py-2 text-xs" onClick={resetMaze} type="button">
            <MapIcon size={15} />
            {zh ? "恢复预设迷宫" : "Restore Preset"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default AlgorithmVisualizer;
