import { useCallback, useEffect, useRef, useState } from "react";
import { RotateCcw, Trophy } from "lucide-react";

const SIZE = 4;
const WIN_VALUE = 2048;

const TILE_STYLE = {
  0: "bg-slate-500/10 text-transparent",
  2: "bg-slate-200 text-slate-900",
  4: "bg-slate-300 text-slate-900",
  8: "bg-orange-300 text-white",
  16: "bg-orange-400 text-white",
  32: "bg-orange-500 text-white",
  64: "bg-rose-500 text-white",
  128: "bg-yellow-400 text-white",
  256: "bg-yellow-500 text-white",
  512: "bg-cyan-500 text-white",
  1024: "bg-sky-500 text-white",
  2048: "bg-violet-500 text-white shadow-[0_0_28px_rgba(139,92,246,0.7)]",
};

function createEmptyGrid() {
  return Array.from({ length: SIZE }, () => new Array(SIZE).fill(0));
}

function cloneGrid(grid) {
  return grid.map((row) => row.slice());
}

function reverseRows(grid) {
  return grid.map((row) => [...row].reverse());
}

function transpose(grid) {
  const n = grid.length;
  const out = Array.from({ length: n }, () => new Array(n).fill(0));
  for (let r = 0; r < n; r += 1) {
    for (let c = 0; c < n; c += 1) {
      out[c][r] = grid[r][c];
    }
  }
  return out;
}

function slideRowLeft(row) {
  const filtered = row.filter((v) => v !== 0);
  const merged = [];
  let scored = 0;
  let i = 0;
  while (i < filtered.length) {
    if (filtered[i] === filtered[i + 1]) {
      const value = filtered[i] * 2;
      merged.push(value);
      scored += value;
      i += 2;
    } else {
      merged.push(filtered[i]);
      i += 1;
    }
  }
  while (merged.length < SIZE) merged.push(0);
  return { row: merged, scored };
}

function move(grid, direction) {
  let working = cloneGrid(grid);
  if (direction === "right") working = reverseRows(working);
  else if (direction === "up") working = transpose(working);
  else if (direction === "down") working = reverseRows(transpose(working));

  let gained = 0;
  let changed = false;
  working = working.map((row) => {
    const { row: next, scored } = slideRowLeft(row);
    gained += scored;
    if (next.some((v, i) => v !== row[i])) changed = true;
    return next;
  });

  if (direction === "right") working = reverseRows(working);
  else if (direction === "up") working = transpose(working);
  else if (direction === "down") working = transpose(reverseRows(working));

  return { grid: working, changed, scored: gained };
}

function emptyCells(grid) {
  const cells = [];
  for (let r = 0; r < SIZE; r += 1) {
    for (let c = 0; c < SIZE; c += 1) {
      if (grid[r][c] === 0) cells.push([r, c]);
    }
  }
  return cells;
}

function addRandomTile(grid) {
  const cells = emptyCells(grid);
  if (!cells.length) return grid;
  const [r, c] = cells[Math.floor(Math.random() * cells.length)];
  const next = cloneGrid(grid);
  next[r][c] = Math.random() < 0.9 ? 2 : 4;
  return next;
}

function hasMoves(grid) {
  if (emptyCells(grid).length) return true;
  for (let r = 0; r < SIZE; r += 1) {
    for (let c = 0; c < SIZE; c += 1) {
      if (c + 1 < SIZE && grid[r][c] === grid[r][c + 1]) return true;
      if (r + 1 < SIZE && grid[r][c] === grid[r + 1][c]) return true;
    }
  }
  return false;
}

function highestTile(grid) {
  let max = 0;
  for (const row of grid) for (const v of row) if (v > max) max = v;
  return max;
}

function freshGame() {
  let grid = createEmptyGrid();
  grid = addRandomTile(grid);
  grid = addRandomTile(grid);
  return grid;
}

const KEY_MAP = {
  ArrowLeft: "left",
  ArrowRight: "right",
  ArrowUp: "up",
  ArrowDown: "down",
  a: "left",
  d: "right",
  w: "up",
  s: "down",
};

function Game2048({ language }) {
  const [grid, setGrid] = useState(freshGame);
  const [score, setScore] = useState(0);
  const [best, setBest] = useState(() => {
    if (typeof window === "undefined") return 0;
    const raw = window.localStorage.getItem("game2048-best");
    return raw ? Number(raw) || 0 : 0;
  });
  const [status, setStatus] = useState("running");
  const boardRef = useRef(null);
  const touchStart = useRef(null);

  const applyMove = useCallback((direction) => {
    if (status === "over") return;
    setGrid((current) => {
      const { grid: next, changed, scored } = move(current, direction);
      if (!changed) return current;

      const withTile = addRandomTile(next);
      const top = highestTile(withTile);

      setScore((s) => {
        const nextScore = s + scored;
        setBest((b) => {
          const nb = Math.max(b, nextScore);
          if (typeof window !== "undefined") {
            window.localStorage.setItem("game2048-best", String(nb));
          }
          return nb;
        });
        return nextScore;
      });

      if (top >= WIN_VALUE && status !== "won") setStatus("won");
      else if (!hasMoves(withTile)) setStatus("over");

      return withTile;
    });
  }, [status]);

  useEffect(() => {
    const handler = (event) => {
      const direction = KEY_MAP[event.key];
      if (!direction) return;
      if (document.activeElement && /input|textarea/i.test(document.activeElement.tagName)) {
        return;
      }
      const board = boardRef.current;
      if (!board) return;
      const rect = board.getBoundingClientRect();
      const inView = rect.top < window.innerHeight && rect.bottom > 0;
      if (!inView) return;
      event.preventDefault();
      applyMove(direction);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [applyMove]);

  const reset = () => {
    setGrid(freshGame());
    setScore(0);
    setStatus("running");
  };

  const onTouchStart = (event) => {
    const touch = event.touches[0];
    touchStart.current = { x: touch.clientX, y: touch.clientY };
  };

  const onTouchEnd = (event) => {
    if (!touchStart.current) return;
    const touch = event.changedTouches[0];
    const dx = touch.clientX - touchStart.current.x;
    const dy = touch.clientY - touchStart.current.y;
    touchStart.current = null;
    const absX = Math.abs(dx);
    const absY = Math.abs(dy);
    if (Math.max(absX, absY) < 30) return;
    if (absX > absY) {
      applyMove(dx > 0 ? "right" : "left");
    } else {
      applyMove(dy > 0 ? "down" : "up");
    }
  };

  return (
    <div className="panel-card overflow-hidden p-5 sm:p-8 md:p-10">
      <div className="mb-6">
        <p className="section-title mb-2">Module J</p>
        <h3 className="text-2xl font-semibold text-slate-900 dark:text-white">
          {language === "zh" ? "2048 小游戏" : "2048 Mini Game"}
        </h3>
        <p className="mt-4 max-w-3xl text-base leading-8 text-slate-700 dark:text-slate-300">
          {language === "zh"
            ? "经典数字合并。方向键或 WASD 控制，手机端支持滑动。目标：合成 2048。"
            : "Classic tile merging. Arrow keys or WASD on desktop, swipe on mobile. Goal: reach 2048."}
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1fr_18rem]">
        <div className="glass-panel p-4 sm:p-6">
          <div className="mb-4 grid grid-cols-3 gap-2 sm:gap-3">
            <div className="rounded-xl sm:rounded-2xl border border-white/10 bg-white/5 px-3 py-2">
              <p className="text-[10px] sm:text-sm uppercase tracking-wider text-slate-500 dark:text-slate-400">Score</p>
              <p className="mt-0.5 text-xl sm:text-3xl font-bold text-slate-900 dark:text-white">{score}</p>
            </div>
            <div className="rounded-xl sm:rounded-2xl border border-white/10 bg-white/5 px-3 py-2">
              <p className="text-[10px] sm:text-sm uppercase tracking-wider text-slate-500 dark:text-slate-400">Best</p>
              <p className="mt-0.5 text-xl sm:text-3xl font-bold text-slate-900 dark:text-white">{best}</p>
            </div>
            <div className="rounded-xl sm:rounded-2xl border border-white/10 bg-white/5 px-3 py-2">
              <p className="text-[10px] sm:text-sm uppercase tracking-wider text-slate-500 dark:text-slate-400">Top</p>
              <p className="mt-0.5 text-xl sm:text-3xl font-bold text-slate-900 dark:text-white">{highestTile(grid)}</p>
            </div>
          </div>

          <div
            ref={boardRef}
            className="relative mx-auto w-full max-w-[360px] rounded-2xl border border-white/10 bg-slate-950/85 p-2 sm:max-w-[420px] sm:p-3"
            onTouchStart={onTouchStart}
            onTouchEnd={onTouchEnd}
            style={{ touchAction: "none" }}
          >
            <div className="grid grid-cols-4 gap-2 sm:gap-3">
              {grid.flatMap((row, r) =>
                row.map((value, c) => (
                  <div
                    key={`${r}-${c}`}
                    className={`flex aspect-square items-center justify-center rounded-xl text-lg font-bold tabular-nums transition-colors duration-150 sm:text-2xl ${TILE_STYLE[value] ?? TILE_STYLE[2048]}`}
                  >
                    {value === 0 ? "·" : value}
                  </div>
                ))
              )}
            </div>
            {status !== "running" && (
              <div className="absolute inset-0 flex flex-col items-center justify-center rounded-2xl bg-slate-950/80 text-center">
                {status === "won" ? (
                  <>
                    <Trophy className="mb-3 text-amber-300" size={32} />
                    <p className="text-sm uppercase tracking-[0.32em] text-amber-300">
                      {language === "zh" ? "达成 2048" : "You Reached 2048"}
                    </p>
                  </>
                ) : (
                  <p className="text-sm uppercase tracking-[0.32em] text-rose-300">Game Over</p>
                )}
                <p className="mt-3 text-3xl font-bold text-white">{score}</p>
                <button className="primary-button mt-5" onClick={reset} type="button">
                  <RotateCcw size={16} />
                  {language === "zh" ? "再玩一局" : "Play Again"}
                </button>
              </div>
            )}
          </div>
        </div>

        <div className="space-y-5">
          <div className="glass-panel p-5">
            <p className="text-sm uppercase tracking-[0.28em] text-slate-500 dark:text-slate-400">
              {language === "zh" ? "操作说明" : "How to Play"}
            </p>
            <ul className="mt-4 space-y-3 text-sm leading-7 text-slate-700 dark:text-slate-300">
              <li>{language === "zh" ? "方向键 / WASD 控制方块移动。" : "Arrow keys or WASD move all tiles."}</li>
              <li>{language === "zh" ? "相同数字碰到会合并为两倍。" : "Matching tiles merge into one of double value."}</li>
              <li>{language === "zh" ? "手机端直接在棋盘上滑动。" : "On mobile, swipe directly on the board."}</li>
              <li>{language === "zh" ? "Best 分数保存在本地，刷新也不丢。" : "Your best score is kept locally across refreshes."}</li>
            </ul>
          </div>

          <button className="primary-button w-full" onClick={reset} type="button">
            <RotateCcw size={16} />
            {language === "zh" ? "重新开始" : "Restart"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default Game2048;
