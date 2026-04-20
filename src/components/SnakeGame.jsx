import { Play, RotateCcw, ArrowUp, ArrowDown, ArrowLeft, ArrowRight } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";

const GRID = 20;
const SPEED = 150;

const DIR = {
  ArrowUp: [0, -1],
  ArrowDown: [0, 1],
  ArrowLeft: [-1, 0],
  ArrowRight: [1, 0],
  w: [0, -1],
  s: [0, 1],
  a: [-1, 0],
  d: [1, 0],
};

function opposites(a, b) {
  return a[0] + b[0] === 0 && a[1] + b[1] === 0;
}

function randomFood(occupied) {
  const free = [];
  for (let y = 0; y < GRID; y++) {
    for (let x = 0; x < GRID; x++) {
      if (!occupied.has(`${x},${y}`)) free.push([x, y]);
    }
  }
  return free[Math.floor(Math.random() * free.length)];
}

function buildOccupied(snake) {
  const set = new Set();
  for (const [x, y] of snake) set.add(`${x},${y}`);
  return set;
}

function freshGame() {
  const snake = [[8, 10], [7, 10], [6, 10]];
  return {
    snake,
    dir: [1, 0],
    food: randomFood(buildOccupied(snake)),
    score: 0,
    status: "idle",
  };
}

function SnakeGame({ language }) {
  const game = useRef(freshGame());
  const pending = useRef(null);
  const timer = useRef(null);
  const [, setTick] = useState(0);
  const [highlight, setHighlight] = useState(false);

  const rerender = useCallback(() => setTick((n) => n + 1), []);

  const stop = useCallback(() => {
    if (timer.current) {
      clearInterval(timer.current);
      timer.current = null;
    }
  }, []);

  const step = useCallback(() => {
    const g = game.current;
    if (g.status !== "running") return;

    const dir = pending.current ?? g.dir;
    pending.current = null;

    const head = g.snake[0];
    const nx = head[0] + dir[0];
    const ny = head[1] + dir[1];

    if (nx < 0 || nx >= GRID || ny < 0 || ny >= GRID) {
      g.status = "over";
      g.dir = dir;
      stop();
      rerender();
      return;
    }

    for (let i = 0; i < g.snake.length - 1; i++) {
      if (g.snake[i][0] === nx && g.snake[i][1] === ny) {
        g.status = "over";
        g.dir = dir;
        stop();
        rerender();
        return;
      }
    }

    const ate = nx === g.food[0] && ny === g.food[1];

    const newSnake = [[nx, ny]];
    for (let i = 0; i < g.snake.length; i++) {
      newSnake.push(g.snake[i]);
    }
    if (!ate) {
      newSnake.pop();
    }

    g.snake = newSnake;
    g.dir = dir;

    if (ate) {
      g.score += 1;
      g.food = randomFood(buildOccupied(newSnake));
      setHighlight(true);
      setTimeout(() => setHighlight(false), 220);
    }

    rerender();
  }, [stop, rerender]);

  const start = useCallback(() => {
    stop();
    const g = freshGame();
    g.status = "running";
    game.current = g;
    pending.current = null;
    rerender();
    timer.current = setInterval(step, SPEED);
  }, [stop, step, rerender]);

  const changeDir = useCallback((key) => {
    const next = DIR[key];
    if (!next) return;
    const effective = pending.current ?? game.current.dir;
    if (opposites(effective, next)) return;
    pending.current = next;
  }, []);

  useEffect(() => {
    const onKey = (e) => {
      if (DIR[e.key]) {
        e.preventDefault();
        changeDir(e.key);
      }
      if ((e.key === " " || e.key === "Enter") && game.current.status !== "running") {
        e.preventDefault();
        start();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [changeDir, start]);

  useEffect(() => () => stop(), [stop]);

  const g = game.current;
  const occupied = buildOccupied(g.snake);
  const headKey = `${g.snake[0][0]},${g.snake[0][1]}`;
  const foodKey = `${g.food[0]},${g.food[1]}`;

  const cells = [];
  for (let y = 0; y < GRID; y++) {
    for (let x = 0; x < GRID; x++) {
      const k = `${x},${y}`;
      let cls = "snake-cell bg-slate-500/[0.08]";
      if (k === foodKey) {
        cls = "snake-cell bg-orange-400 shadow-[0_0_12px_rgba(251,146,60,0.45)]";
      } else if (k === headKey) {
        cls = "snake-cell bg-sky-300 shadow-[0_0_18px_rgba(125,211,252,0.5)]";
      } else if (occupied.has(k)) {
        cls = "snake-cell bg-cyan-500";
      }
      cells.push(<div key={k} className={cls} />);
    }
  }

  return (
    <div className="panel-card overflow-hidden p-5 sm:p-8 md:p-10">
      <div className="mb-6">
        <p className="section-title mb-2">Module C</p>
        <h3 className="text-2xl font-semibold text-slate-900 dark:text-white">
          {language === "zh" ? "贪吃蛇小游戏" : "Snake Mini Game"}
        </h3>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1fr_18rem]">
        <div className="glass-panel relative p-3 sm:p-4 md:p-5">
          <div className="mb-3 grid grid-cols-3 gap-2 sm:mb-4 sm:gap-3">
            <div className="rounded-xl sm:rounded-2xl border border-white/10 bg-white/5 px-2 py-1.5 sm:px-4 sm:py-3">
              <p className="text-[10px] sm:text-sm uppercase tracking-wider sm:tracking-[0.28em] text-slate-500 dark:text-slate-400">Score</p>
              <p className="mt-0.5 sm:mt-2 text-lg sm:text-3xl font-bold text-slate-900 dark:text-white">{g.score}</p>
            </div>
            <div
              className={`rounded-xl sm:rounded-2xl border px-2 py-1.5 sm:px-4 sm:py-3 transition duration-200 ${
                highlight
                  ? "border-cyan-300/50 bg-cyan-400/15 shadow-[0_0_24px_rgba(34,211,238,0.2)]"
                  : "border-white/10 bg-white/5"
              }`}
            >
              <p className="text-[10px] sm:text-sm uppercase tracking-wider sm:tracking-[0.28em] text-slate-500 dark:text-slate-400">Length</p>
              <p className="mt-0.5 sm:mt-2 text-lg sm:text-3xl font-bold text-slate-900 dark:text-white">{g.snake.length}</p>
            </div>
            <div className="rounded-xl sm:rounded-2xl border border-white/10 bg-white/5 px-2 py-1.5 sm:px-4 sm:py-3">
              <p className="text-[10px] sm:text-sm uppercase tracking-wider sm:tracking-[0.28em] text-slate-500 dark:text-slate-400">Status</p>
              <p className="mt-0.5 sm:mt-2 text-xs sm:text-lg font-semibold text-slate-900 dark:text-white">
                {g.status === "running"
                  ? language === "zh" ? "进行中" : "Running"
                  : g.status === "over"
                    ? language === "zh" ? "已结束" : "Game Over"
                    : language === "zh" ? "待开始" : "Idle"}
              </p>
            </div>
          </div>

          <div className="relative rounded-xl sm:rounded-3xl border border-white/10 bg-slate-950/80 p-1 sm:p-2">
            <div className="snake-grid">{cells}</div>
            {g.status === "over" && (
              <div className="absolute inset-0 flex flex-col items-center justify-center rounded-xl sm:rounded-3xl bg-slate-950/75 text-center">
                <p className="text-sm uppercase tracking-[0.32em] text-orange-300">Game Over</p>
                <p className="mt-3 text-3xl font-bold text-white">
                  {language === "zh" ? `最终得分 ${g.score}` : `Final Score ${g.score}`}
                </p>
              </div>
            )}
          </div>

          <div className="mt-4 space-y-3 lg:hidden">
            {g.status !== "running" && (
              <button className="primary-button w-full py-2.5" onClick={start} type="button">
                {g.status === "over" ? <RotateCcw size={16} /> : <Play size={16} />}
                {g.status === "over"
                  ? language === "zh" ? "重新开始" : "Restart"
                  : language === "zh" ? "开始游戏" : "Start Game"}
              </button>
            )}
            <div className="grid grid-cols-3 gap-2">
              <span />
              <button className="secondary-button px-0 py-2" onClick={() => changeDir("ArrowUp")} type="button" aria-label="Up"><ArrowUp size={16} /></button>
              <span />
              <button className="secondary-button px-0 py-2" onClick={() => changeDir("ArrowLeft")} type="button" aria-label="Left"><ArrowLeft size={16} /></button>
              <button className="secondary-button px-0 py-2" onClick={() => changeDir("ArrowDown")} type="button" aria-label="Down"><ArrowDown size={16} /></button>
              <button className="secondary-button px-0 py-2" onClick={() => changeDir("ArrowRight")} type="button" aria-label="Right"><ArrowRight size={16} /></button>
            </div>
          </div>
        </div>

        <div className="space-y-5">
          <div className="glass-panel p-5">
            <p className="text-sm uppercase tracking-[0.28em] text-slate-500 dark:text-slate-400">
              {language === "zh" ? "操作说明" : "How to Play"}
            </p>
            <ul className="mt-4 space-y-3 text-sm leading-7 text-slate-700 dark:text-slate-300">
              <li>{language === "zh" ? "使用方向键或 WASD 控制移动方向。" : "Use arrow keys or WASD to control the snake."}</li>
              <li>{language === "zh" ? "吃到食物后分数加一，蛇身长度也会增加一格。" : "Eating food increases both the score and the snake length by one."}</li>
              <li>{language === "zh" ? "不能直接反向移动，撞墙或撞到自己会结束。" : "You cannot reverse direction directly, and hitting a wall or yourself ends the game."}</li>
            </ul>
          </div>

          <div className="hidden flex-wrap gap-3 lg:flex">
            {g.status !== "running" && (
              <button className="primary-button flex-1" onClick={start} type="button">
                {g.status === "over" ? <RotateCcw size={16} /> : <Play size={16} />}
                {g.status === "over"
                  ? language === "zh" ? "重新开始" : "Restart"
                  : language === "zh" ? "开始游戏" : "Start Game"}
              </button>
            )}
          </div>

          <div className="glass-panel hidden p-5 lg:block">
            <p className="mb-4 text-sm uppercase tracking-[0.28em] text-slate-500 dark:text-slate-400">
              {language === "zh" ? "触屏方向键" : "Touch Controls"}
            </p>
            <div className="grid grid-cols-3 gap-3">
              <span />
              <button className="secondary-button px-0 py-3" onClick={() => changeDir("ArrowUp")} type="button"><ArrowUp size={18} /></button>
              <span />
              <button className="secondary-button px-0 py-3" onClick={() => changeDir("ArrowLeft")} type="button"><ArrowLeft size={18} /></button>
              <button className="secondary-button px-0 py-3" onClick={() => changeDir("ArrowDown")} type="button"><ArrowDown size={18} /></button>
              <button className="secondary-button px-0 py-3" onClick={() => changeDir("ArrowRight")} type="button"><ArrowRight size={18} /></button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SnakeGame;