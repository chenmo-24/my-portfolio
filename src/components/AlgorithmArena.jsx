import { useMemo, useState } from "react";
import { Gauge, Play, Route, Trophy } from "lucide-react";
import { arenaAlgorithms, arenaChallenges } from "../data/algorithmArena";
import { recordArenaResult, unlockAchievement } from "../utils/progressStore";

function keyOf(cell) {
  return `${cell.r},${cell.c}`;
}

function neighbors(cell, rows, cols) {
  return [
    { r: cell.r - 1, c: cell.c },
    { r: cell.r, c: cell.c + 1 },
    { r: cell.r + 1, c: cell.c },
    { r: cell.r, c: cell.c - 1 },
  ].filter((next) => next.r >= 0 && next.r < rows && next.c >= 0 && next.c < cols);
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

function runSearch(type, challenge) {
  const start = challenge.start;
  const end = challenge.end;
  const startKey = keyOf(start);
  const endKey = keyOf(end);
  const walls = new Set(challenge.walls.map(([r, c]) => `${r},${c}`));
  const parent = new Map();
  const visited = new Set();
  const order = [];
  const blocked = (cell) => walls.has(keyOf(cell));

  if (type === "dfs") {
    const stack = [start];
    const queued = new Set([startKey]);
    while (stack.length) {
      const current = stack.pop();
      const currentKey = keyOf(current);
      if (visited.has(currentKey) || blocked(current)) continue;
      visited.add(currentKey);
      order.push(current);
      if (currentKey === endKey) break;
      [...neighbors(current, challenge.rows, challenge.cols)].reverse().forEach((next) => {
        const nextKey = keyOf(next);
        if (!queued.has(nextKey) && !visited.has(nextKey) && !blocked(next)) {
          parent.set(nextKey, currentKey);
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
      if (blocked(current)) continue;
      order.push(current);
      if (currentKey === endKey) break;
      neighbors(current, challenge.rows, challenge.cols).forEach((next) => {
        const nextKey = keyOf(next);
        if (!visited.has(nextKey) && !blocked(next)) {
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
      if (visited.has(currentKey) || blocked(current)) continue;
      visited.add(currentKey);
      order.push(current);
      if (currentKey === endKey) break;
      neighbors(current, challenge.rows, challenge.cols).forEach((next) => {
        const nextKey = keyOf(next);
        if (visited.has(nextKey) || blocked(next)) return;
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
  const path = found ? reconstructPath(parent, startKey, endKey) : [];
  const score = found ? Math.max(10, 120 - order.length * 2 - path.length) : 0;
  return { found, order, path, score };
}

function AlgorithmArena({ language }) {
  const [challengeId, setChallengeId] = useState(arenaChallenges[0].id);
  const [algorithm, setAlgorithm] = useState("astar");
  const [result, setResult] = useState(null);
  const zh = language === "zh";
  const challenge = arenaChallenges.find((item) => item.id === challengeId) ?? arenaChallenges[0];

  const wallSet = useMemo(() => new Set(challenge.walls.map(([r, c]) => `${r},${c}`)), [challenge]);
  const resultSets = useMemo(
    () => ({
      visited: new Set(result?.order.map(keyOf) ?? []),
      path: new Set(result?.path.map(keyOf) ?? []),
    }),
    [result]
  );

  const run = () => {
    const next = runSearch(algorithm, challenge);
    setResult(next);
    recordArenaResult(challenge.id, {
      algorithm,
      visited: next.order.length,
      path: next.path.length,
      score: next.score,
      found: next.found,
    });
    if (next.found) unlockAchievement("complete-arena");
  };

  const cells = [];
  for (let r = 0; r < challenge.rows; r += 1) {
    for (let c = 0; c < challenge.cols; c += 1) {
      const cell = { r, c };
      const key = keyOf(cell);
      const isStart = key === keyOf(challenge.start);
      const isEnd = key === keyOf(challenge.end);
      const isWall = wallSet.has(key);
      const isPath = resultSets.path.has(key);
      const isVisited = resultSets.visited.has(key);
      cells.push({ key, isStart, isEnd, isWall, isPath, isVisited });
    }
  }

  return (
    <div className="panel-card overflow-hidden p-5 sm:p-8 md:p-10">
      <div className="mb-6">
        <p className="section-title mb-2">Module Arena</p>
        <h3 className="text-2xl font-semibold text-slate-900 dark:text-white">
          {zh ? "算法竞技场" : "Algorithm Arena"}
        </h3>
        <p className="mt-4 max-w-3xl text-base leading-8 text-slate-700 dark:text-slate-300">
          {zh
            ? "选择一个稳定挑战和算法，比较访问节点、路径长度和得分。"
            : "Pick a deterministic challenge and algorithm, then compare visited cells, path length, and score."}
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1fr_20rem]">
        <div className="min-w-0">
          <div
            className="grid gap-1 rounded-3xl border border-white/10 bg-slate-950/80 p-3"
            style={{ gridTemplateColumns: `repeat(${challenge.cols}, minmax(0, 1fr))` }}
          >
            {cells.map((cell) => (
              <div
                className={`aspect-square rounded-md border text-[10px] sm:text-xs ${
                  cell.isStart
                    ? "border-emerald-300 bg-emerald-400 text-slate-950"
                    : cell.isEnd
                      ? "border-rose-300 bg-rose-400 text-slate-950"
                      : cell.isWall
                        ? "border-slate-500 bg-slate-600"
                        : cell.isPath
                          ? "border-yellow-300 bg-yellow-300 text-slate-950"
                          : cell.isVisited
                            ? "border-cyan-300 bg-cyan-400/60"
                            : "border-white/10 bg-white/5"
                }`}
                key={cell.key}
              />
            ))}
          </div>

          <div className="mt-4 flex flex-wrap gap-3 text-xs text-slate-600 dark:text-slate-300">
            <span className="inline-flex items-center gap-2"><span className="h-3 w-3 rounded bg-emerald-400" />{zh ? "起点" : "Start"}</span>
            <span className="inline-flex items-center gap-2"><span className="h-3 w-3 rounded bg-rose-400" />{zh ? "终点" : "End"}</span>
            <span className="inline-flex items-center gap-2"><span className="h-3 w-3 rounded bg-cyan-400/60" />{zh ? "访问" : "Visited"}</span>
            <span className="inline-flex items-center gap-2"><span className="h-3 w-3 rounded bg-yellow-300" />{zh ? "路径" : "Path"}</span>
          </div>
        </div>

        <div className="space-y-5">
          <div className="glass-panel p-5">
            <p className="mb-3 inline-flex items-center gap-2 text-sm uppercase tracking-[0.24em] text-slate-500 dark:text-slate-400">
              <Route size={15} />
              {zh ? "挑战" : "Challenge"}
            </p>
            <div className="space-y-2">
              {arenaChallenges.map((item) => (
                <button
                  className={`w-full rounded-2xl border px-4 py-3 text-left text-sm font-semibold transition ${
                    item.id === challenge.id
                      ? "border-cyan-400/50 bg-cyan-400/15 text-cyan-700 dark:text-cyan-100"
                      : "border-white/10 bg-white/5 text-slate-700 hover:border-cyan-400/30 dark:text-slate-300"
                  }`}
                  key={item.id}
                  onClick={() => {
                    setChallengeId(item.id);
                    setResult(null);
                  }}
                  type="button"
                >
                  {item.title[language]}
                </button>
              ))}
            </div>
            <p className="mt-4 text-sm leading-7 text-slate-700 dark:text-slate-300">
              {challenge.desc[language]}
            </p>
          </div>

          <div className="glass-panel p-5">
            <p className="mb-3 inline-flex items-center gap-2 text-sm uppercase tracking-[0.24em] text-slate-500 dark:text-slate-400">
              <Gauge size={15} />
              {zh ? "算法" : "Algorithm"}
            </p>
            <div className="grid grid-cols-2 gap-2">
              {arenaAlgorithms.map((item) => (
                <button
                  className={`rounded-2xl border px-3 py-2 text-sm font-semibold transition ${
                    item.id === algorithm
                      ? "border-cyan-400/50 bg-cyan-400/15 text-cyan-700 dark:text-cyan-100"
                      : "border-white/10 bg-white/5 text-slate-700 hover:border-cyan-400/30 dark:text-slate-300"
                  }`}
                  key={item.id}
                  onClick={() => setAlgorithm(item.id)}
                  type="button"
                >
                  {item.label}
                </button>
              ))}
            </div>
            <button className="primary-button mt-4 w-full px-4 py-3" onClick={run} type="button">
              <Play size={17} />
              {zh ? "运行挑战" : "Run Challenge"}
            </button>
          </div>

          <div className="glass-panel p-5">
            <p className="mb-3 inline-flex items-center gap-2 text-sm uppercase tracking-[0.24em] text-slate-500 dark:text-slate-400">
              <Trophy size={15} />
              {zh ? "结果" : "Result"}
            </p>
            <div className="grid grid-cols-3 gap-2 text-center">
              <div className="rounded-2xl bg-white/5 p-3">
                <p className="text-xs text-slate-500 dark:text-slate-400">{zh ? "访问" : "Visited"}</p>
                <p className="mt-1 text-xl font-bold text-slate-900 dark:text-white">{result?.order.length ?? 0}</p>
              </div>
              <div className="rounded-2xl bg-white/5 p-3">
                <p className="text-xs text-slate-500 dark:text-slate-400">{zh ? "路径" : "Path"}</p>
                <p className="mt-1 text-xl font-bold text-slate-900 dark:text-white">{result?.path.length ?? 0}</p>
              </div>
              <div className="rounded-2xl bg-white/5 p-3">
                <p className="text-xs text-slate-500 dark:text-slate-400">{zh ? "得分" : "Score"}</p>
                <p className="mt-1 text-xl font-bold text-cyan-500">{result?.score ?? 0}</p>
              </div>
            </div>
            <p className="mt-4 text-sm leading-7 text-slate-700 dark:text-slate-300">
              {result
                ? result.found
                  ? zh
                    ? "挑战完成，结果已写入本地成就护照。"
                    : "Challenge complete. The result was recorded in your local passport."
                  : zh
                    ? "没有找到路径，可以换一个算法或挑战。"
                    : "No path found. Try another algorithm or challenge."
                : zh
                  ? "运行后这里会显示指标。"
                  : "Run a challenge to see metrics."}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AlgorithmArena;
