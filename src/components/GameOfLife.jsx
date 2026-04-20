import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Play, Pause, SkipForward, Shuffle, Trash2, Sparkles } from "lucide-react";

const COLS = 36;
const ROWS = 20;
const SPEED_PRESETS = {
  slow: 260,
  normal: 120,
  fast: 55,
};

function createEmptyGrid() {
  return Array.from({ length: ROWS }, () => new Array(COLS).fill(0));
}

function countNeighbors(grid, r, c) {
  let count = 0;
  for (let dr = -1; dr <= 1; dr += 1) {
    for (let dc = -1; dc <= 1; dc += 1) {
      if (dr === 0 && dc === 0) continue;
      const nr = (r + dr + ROWS) % ROWS;
      const nc = (c + dc + COLS) % COLS;
      count += grid[nr][nc];
    }
  }
  return count;
}

function stepGrid(grid) {
  const next = Array.from({ length: ROWS }, () => new Array(COLS).fill(0));
  for (let r = 0; r < ROWS; r += 1) {
    for (let c = 0; c < COLS; c += 1) {
      const n = countNeighbors(grid, r, c);
      const cur = grid[r][c];
      if (cur === 1 && (n === 2 || n === 3)) next[r][c] = 1;
      else if (cur === 0 && n === 3) next[r][c] = 1;
    }
  }
  return next;
}

const PATTERNS = {
  glider: [[0, 1], [1, 2], [2, 0], [2, 1], [2, 2]],
  pulsar: [
    [0, 2], [0, 3], [0, 4], [0, 8], [0, 9], [0, 10],
    [2, 0], [3, 0], [4, 0], [2, 5], [3, 5], [4, 5],
    [2, 7], [3, 7], [4, 7], [2, 12], [3, 12], [4, 12],
    [5, 2], [5, 3], [5, 4], [5, 8], [5, 9], [5, 10],
    [7, 2], [7, 3], [7, 4], [7, 8], [7, 9], [7, 10],
    [8, 0], [9, 0], [10, 0], [8, 5], [9, 5], [10, 5],
    [8, 7], [9, 7], [10, 7], [8, 12], [9, 12], [10, 12],
    [12, 2], [12, 3], [12, 4], [12, 8], [12, 9], [12, 10],
  ],
  gun: [
    [5, 1], [5, 2], [6, 1], [6, 2],
    [5, 11], [6, 11], [7, 11], [4, 12], [8, 12], [3, 13], [9, 13],
    [3, 14], [9, 14], [6, 15], [4, 16], [8, 16],
    [5, 17], [6, 17], [7, 17], [6, 18],
    [3, 21], [4, 21], [5, 21], [3, 22], [4, 22], [5, 22],
    [2, 23], [6, 23], [1, 25], [2, 25], [6, 25], [7, 25],
    [3, 35], [4, 35], [3, 36], [4, 36],
  ],
};

function placePattern(pattern, offsetR, offsetC) {
  const grid = createEmptyGrid();
  for (const [r, c] of pattern) {
    const nr = r + offsetR;
    const nc = c + offsetC;
    if (nr >= 0 && nr < ROWS && nc >= 0 && nc < COLS) {
      grid[nr][nc] = 1;
    }
  }
  return grid;
}

function randomGrid(density = 0.28) {
  const grid = createEmptyGrid();
  for (let r = 0; r < ROWS; r += 1) {
    for (let c = 0; c < COLS; c += 1) {
      if (Math.random() < density) grid[r][c] = 1;
    }
  }
  return grid;
}

function countAlive(grid) {
  let n = 0;
  for (const row of grid) for (const v of row) if (v) n += 1;
  return n;
}

function GameOfLife({ language }) {
  const [grid, setGrid] = useState(() => placePattern(PATTERNS.glider, 2, 2));
  const [running, setRunning] = useState(false);
  const [generation, setGeneration] = useState(0);
  const [speed, setSpeed] = useState("normal");
  const timer = useRef(null);
  const isDragging = useRef(false);
  const dragValue = useRef(null);

  const alive = useMemo(() => countAlive(grid), [grid]);

  const doStep = useCallback(() => {
    setGrid((g) => stepGrid(g));
    setGeneration((n) => n + 1);
  }, []);

  useEffect(() => {
    if (!running) {
      if (timer.current) clearInterval(timer.current);
      timer.current = null;
      return undefined;
    }
    timer.current = setInterval(doStep, SPEED_PRESETS[speed]);
    return () => {
      if (timer.current) clearInterval(timer.current);
      timer.current = null;
    };
  }, [running, speed, doStep]);

  useEffect(
    () => () => {
      if (timer.current) clearInterval(timer.current);
    },
    []
  );

  const setCell = (r, c, value) => {
    setGrid((g) => {
      if (g[r][c] === value) return g;
      const next = g.map((row) => row.slice());
      next[r][c] = value;
      return next;
    });
  };

  const clear = () => {
    setRunning(false);
    setGrid(createEmptyGrid());
    setGeneration(0);
  };

  const randomize = () => {
    setRunning(false);
    setGrid(randomGrid());
    setGeneration(0);
  };

  const loadPattern = (name) => {
    setRunning(false);
    setGeneration(0);
    if (name === "glider") setGrid(placePattern(PATTERNS.glider, 2, 2));
    else if (name === "pulsar")
      setGrid(
        placePattern(
          PATTERNS.pulsar,
          Math.floor((ROWS - 13) / 2),
          Math.floor((COLS - 13) / 2)
        )
      );
    else if (name === "gun") setGrid(placePattern(PATTERNS.gun, 3, 1));
  };

  const onCellDown = (r, c) => {
    isDragging.current = true;
    const value = grid[r][c] ? 0 : 1;
    dragValue.current = value;
    setCell(r, c, value);
  };

  const onCellEnter = (r, c) => {
    if (!isDragging.current) return;
    setCell(r, c, dragValue.current);
  };

  useEffect(() => {
    const onUp = () => {
      isDragging.current = false;
      dragValue.current = null;
    };
    window.addEventListener("mouseup", onUp);
    window.addEventListener("touchend", onUp);
    return () => {
      window.removeEventListener("mouseup", onUp);
      window.removeEventListener("touchend", onUp);
    };
  }, []);

  return (
    <div className="panel-card overflow-hidden p-5 sm:p-8 md:p-10">
      <div className="mb-6">
        <p className="section-title mb-2">Module K</p>
        <h3 className="text-2xl font-semibold text-slate-900 dark:text-white">
          {language === "zh" ? "康威生命游戏" : "Conway's Game of Life"}
        </h3>
        <p className="mt-4 max-w-3xl text-base leading-8 text-slate-700 dark:text-slate-300">
          {language === "zh"
            ? "1970 年的经典细胞自动机：格子依据简单规则自我演化。点击或拖动绘制初始图案，选择自动播放或手动步进，观察生与死的边界。"
            : "The classic 1970 cellular automaton — cells evolve by simple rules. Click or drag to paint, then autoplay or step through generations to watch the patterns bloom and collapse."}
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1fr_18rem]">
        <div className="glass-panel p-3 sm:p-4 md:p-5">
          <div className="mb-4 grid grid-cols-3 gap-2 sm:gap-3">
            <div className="rounded-xl sm:rounded-2xl border border-white/10 bg-white/5 px-3 py-2">
              <p className="text-[10px] sm:text-sm uppercase tracking-wider text-slate-500 dark:text-slate-400">
                {language === "zh" ? "代数" : "Gen"}
              </p>
              <p className="mt-0.5 text-xl sm:text-3xl font-bold text-slate-900 dark:text-white tabular-nums">
                {generation}
              </p>
            </div>
            <div className="rounded-xl sm:rounded-2xl border border-white/10 bg-white/5 px-3 py-2">
              <p className="text-[10px] sm:text-sm uppercase tracking-wider text-slate-500 dark:text-slate-400">
                {language === "zh" ? "存活" : "Alive"}
              </p>
              <p className="mt-0.5 text-xl sm:text-3xl font-bold text-slate-900 dark:text-white tabular-nums">
                {alive}
              </p>
            </div>
            <div className="rounded-xl sm:rounded-2xl border border-white/10 bg-white/5 px-3 py-2">
              <p className="text-[10px] sm:text-sm uppercase tracking-wider text-slate-500 dark:text-slate-400">
                {language === "zh" ? "状态" : "Status"}
              </p>
              <p className="mt-0.5 text-xs sm:text-lg font-semibold text-slate-900 dark:text-white">
                {running
                  ? language === "zh"
                    ? "演化中"
                    : "Running"
                  : language === "zh"
                    ? "已暂停"
                    : "Paused"}
              </p>
            </div>
          </div>

          <div
            className="relative rounded-xl sm:rounded-2xl border border-white/10 bg-slate-950/80 p-1 sm:p-2 select-none"
            style={{ touchAction: "none" }}
          >
            <div
              className="grid gap-[1px]"
              style={{ gridTemplateColumns: `repeat(${COLS}, minmax(0, 1fr))` }}
            >
              {grid.flatMap((row, r) =>
                row.map((value, c) => {
                  const cls = value
                    ? "bg-cyan-400 shadow-[0_0_4px_rgba(34,211,238,0.65)]"
                    : "bg-slate-500/10 hover:bg-cyan-400/25";
                  return (
                    <div
                      key={`${r}-${c}`}
                      onMouseDown={() => onCellDown(r, c)}
                      onMouseEnter={() => onCellEnter(r, c)}
                      onTouchStart={(event) => {
                        event.preventDefault();
                        onCellDown(r, c);
                      }}
                      className={`aspect-square cursor-pointer rounded-[2px] transition-colors duration-100 ${cls}`}
                    />
                  );
                })
              )}
            </div>
          </div>

          <div className="mt-4 flex flex-wrap gap-2">
            <button
              className="primary-button px-4 py-2 text-xs sm:text-sm"
              onClick={() => setRunning((v) => !v)}
              type="button"
            >
              {running ? <Pause size={16} /> : <Play size={16} />}
              {running
                ? language === "zh" ? "暂停" : "Pause"
                : language === "zh" ? "自动播放" : "Autoplay"}
            </button>
            <button
              className="secondary-button px-4 py-2 text-xs sm:text-sm"
              onClick={doStep}
              type="button"
            >
              <SkipForward size={16} />
              {language === "zh" ? "下一代" : "Step"}
            </button>
            <button
              className="secondary-button px-4 py-2 text-xs sm:text-sm"
              onClick={randomize}
              type="button"
            >
              <Shuffle size={16} />
              {language === "zh" ? "随机" : "Random"}
            </button>
            <button
              className="secondary-button px-4 py-2 text-xs sm:text-sm"
              onClick={clear}
              type="button"
            >
              <Trash2 size={16} />
              {language === "zh" ? "清空" : "Clear"}
            </button>
          </div>
        </div>

        <div className="space-y-5">
          <div className="glass-panel p-5">
            <p className="text-sm uppercase tracking-[0.28em] text-slate-500 dark:text-slate-400">
              {language === "zh" ? "游戏规则" : "The Rules"}
            </p>
            <ul className="mt-4 space-y-2 text-sm leading-7 text-slate-700 dark:text-slate-300">
              <li>
                {language === "zh"
                  ? "活细胞邻居 < 2 或 > 3 → 死亡"
                  : "Live cell with <2 or >3 neighbors dies"}
              </li>
              <li>
                {language === "zh"
                  ? "活细胞邻居为 2 或 3 → 存活"
                  : "Live cell with 2 or 3 neighbors survives"}
              </li>
              <li>
                {language === "zh"
                  ? "死细胞邻居正好为 3 → 新生"
                  : "Dead cell with exactly 3 neighbors is born"}
              </li>
              <li>
                {language === "zh"
                  ? "画面四边相连为环形拓扑"
                  : "Edges wrap around (toroidal board)"}
              </li>
            </ul>
          </div>

          <div className="glass-panel p-5">
            <p className="mb-3 inline-flex items-center gap-2 text-sm uppercase tracking-[0.28em] text-slate-500 dark:text-slate-400">
              <Sparkles size={14} />
              {language === "zh" ? "经典图案" : "Preset Patterns"}
            </p>
            <div className="grid grid-cols-3 gap-2">
              <button
                className="secondary-button px-0 py-2 text-xs"
                onClick={() => loadPattern("glider")}
                type="button"
              >
                Glider
              </button>
              <button
                className="secondary-button px-0 py-2 text-xs"
                onClick={() => loadPattern("pulsar")}
                type="button"
              >
                Pulsar
              </button>
              <button
                className="secondary-button px-0 py-2 text-xs"
                onClick={() => loadPattern("gun")}
                type="button"
              >
                Gun
              </button>
            </div>
          </div>

          <div className="glass-panel p-5">
            <p className="mb-3 text-sm uppercase tracking-[0.28em] text-slate-500 dark:text-slate-400">
              {language === "zh" ? "速度" : "Speed"}
            </p>
            <div className="grid grid-cols-3 gap-2">
              {["slow", "normal", "fast"].map((s) => (
                <button
                  key={s}
                  className={`rounded-full px-2 py-2 text-xs font-semibold transition ${
                    speed === s
                      ? "bg-cyan-500 text-slate-950 shadow-[0_8px_24px_rgba(34,211,238,0.35)]"
                      : "border border-white/10 bg-white/5 text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
                  }`}
                  onClick={() => setSpeed(s)}
                  type="button"
                >
                  {s === "slow"
                    ? language === "zh" ? "慢" : "Slow"
                    : s === "normal"
                      ? language === "zh" ? "中" : "Normal"
                      : language === "zh" ? "快" : "Fast"}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default GameOfLife;
