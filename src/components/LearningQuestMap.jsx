import { useEffect, useMemo, useState } from "react";
import { CheckCircle2, Circle, Compass, Map, Sparkles } from "lucide-react";
import { learningQuestTracks } from "../data/learningQuests";
import { completeQuest, getProgress, subscribeProgress, unlockAchievement } from "../utils/progressStore";

function LearningQuestMap({ language }) {
  const [activeTrackId, setActiveTrackId] = useState(learningQuestTracks[0].id);
  const [selectedNodeId, setSelectedNodeId] = useState(learningQuestTracks[0].nodes[0].id);
  const [progress, setProgress] = useState(() => getProgress());
  const zh = language === "zh";

  useEffect(() => subscribeProgress(setProgress), []);

  const completed = useMemo(() => new Set(progress.quests), [progress.quests]);
  const activeTrack = learningQuestTracks.find((track) => track.id === activeTrackId) ?? learningQuestTracks[0];
  const selectedNode = activeTrack.nodes.find((node) => node.id === selectedNodeId) ?? activeTrack.nodes[0];
  const totalNodes = learningQuestTracks.reduce((sum, track) => sum + track.nodes.length, 0);
  const completedCount = learningQuestTracks.reduce(
    (sum, track) => sum + track.nodes.filter((node) => completed.has(node.id)).length,
    0
  );
  const nextNode = activeTrack.nodes.find((node) => !completed.has(node.id)) ?? activeTrack.nodes[0];

  const switchTrack = (trackId) => {
    const nextTrack = learningQuestTracks.find((track) => track.id === trackId);
    setActiveTrackId(trackId);
    setSelectedNodeId(nextTrack?.nodes[0]?.id ?? selectedNodeId);
  };

  const markComplete = () => {
    completeQuest(selectedNode.id);
    unlockAchievement("complete-learning-quest");
  };

  return (
    <div className="panel-card overflow-hidden p-5 sm:p-8 md:p-10">
      <div className="mb-6">
        <p className="section-title mb-2">Module Quest Map</p>
        <h3 className="text-2xl font-semibold text-slate-900 dark:text-white">
          {zh ? "学习任务地图" : "Learning Quest Map"}
        </h3>
        <p className="mt-4 max-w-3xl text-base leading-8 text-slate-700 dark:text-slate-300">
          {zh
            ? "把 Web、算法、工程实践和开源观察整理成可完成的路线节点，让成长过程比一段文字更具体。"
            : "A concrete roadmap for Web, algorithms, engineering practice, and open-source study."}
        </p>
      </div>

      <div className="mb-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {learningQuestTracks.map((track) => {
          const trackDone = track.nodes.filter((node) => completed.has(node.id)).length;
          const active = track.id === activeTrackId;
          return (
            <button
              className={`rounded-2xl border p-4 text-left transition ${
                active
                  ? "border-cyan-400/50 bg-cyan-400/15"
                  : "border-white/10 bg-white/5 hover:border-cyan-400/30"
              }`}
              key={track.id}
              onClick={() => switchTrack(track.id)}
              type="button"
            >
              <span className="inline-flex items-center gap-2 text-sm font-semibold text-slate-900 dark:text-white">
                <Map size={16} className="text-cyan-500" />
                {track.label[language]}
              </span>
              <span className="mt-2 block text-xs uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400">
                {trackDone} / {track.nodes.length}
              </span>
            </button>
          );
        })}
      </div>

      <div className="grid gap-6 lg:grid-cols-[1fr_20rem]">
        <div className="space-y-4">
          {activeTrack.nodes.map((node, index) => {
            const done = completed.has(node.id);
            const selected = selectedNode.id === node.id;
            return (
              <button
                className={`flex w-full items-start gap-4 rounded-3xl border p-4 text-left transition ${
                  selected
                    ? "border-cyan-400/50 bg-cyan-400/15"
                    : "border-white/10 bg-white/5 hover:border-cyan-400/30"
                }`}
                key={node.id}
                onClick={() => setSelectedNodeId(node.id)}
                type="button"
              >
                <span
                  className={`flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full ${
                    done ? "bg-cyan-500 text-slate-950" : "bg-white/10 text-slate-500 dark:text-slate-300"
                  }`}
                >
                  {done ? <CheckCircle2 size={20} /> : <Circle size={18} />}
                </span>
                <span className="min-w-0">
                  <span className="block text-xs uppercase tracking-[0.24em] text-slate-500 dark:text-slate-400">
                    {zh ? "节点" : "Node"} {index + 1}
                  </span>
                  <span className="mt-1 block text-lg font-semibold text-slate-900 dark:text-white">
                    {node.title[language]}
                  </span>
                  <span className="mt-2 block text-sm leading-7 text-slate-700 dark:text-slate-300">
                    {node.desc[language]}
                  </span>
                </span>
              </button>
            );
          })}
        </div>

        <div className="space-y-5">
          <div className="glass-panel p-5">
            <p className="mb-3 inline-flex items-center gap-2 text-sm uppercase tracking-[0.24em] text-slate-500 dark:text-slate-400">
              <Compass size={15} />
              {zh ? "当前节点" : "Selected"}
            </p>
            <h4 className="text-xl font-bold text-slate-900 dark:text-white">{selectedNode.title[language]}</h4>
            <p className="mt-3 text-sm leading-7 text-slate-700 dark:text-slate-300">
              {selectedNode.desc[language]}
            </p>
            <div className="mt-4 rounded-2xl border border-white/10 bg-white/5 p-4">
              <p className="text-xs uppercase tracking-[0.22em] text-slate-500 dark:text-slate-400">
                {zh ? "证据" : "Evidence"}
              </p>
              <p className="mt-2 text-sm font-semibold text-slate-800 dark:text-slate-100">
                {selectedNode.evidence[language]}
              </p>
            </div>
            <button
              className="primary-button mt-5 w-full px-4 py-3"
              disabled={completed.has(selectedNode.id)}
              onClick={markComplete}
              type="button"
            >
              <CheckCircle2 size={17} />
              {completed.has(selectedNode.id) ? (zh ? "已完成" : "Completed") : (zh ? "标记完成" : "Mark Complete")}
            </button>
          </div>

          <div className="glass-panel p-5">
            <p className="mb-3 inline-flex items-center gap-2 text-sm uppercase tracking-[0.24em] text-slate-500 dark:text-slate-400">
              <Sparkles size={15} />
              {zh ? "下一步" : "Next Action"}
            </p>
            <p className="text-sm leading-7 text-slate-700 dark:text-slate-300">
              {nextNode
                ? zh
                  ? `继续完成「${nextNode.title.zh}」。`
                  : `Continue with "${nextNode.title.en}".`
                : zh
                  ? "这个方向已经完成。"
                  : "This track is complete."}
            </p>
            <div className="mt-4 h-2 overflow-hidden rounded-full bg-slate-300/25 dark:bg-slate-800/80">
              <div
                className="h-full rounded-full bg-cyan-500 transition-[width] duration-300"
                style={{ width: `${(completedCount / totalNodes) * 100}%` }}
              />
            </div>
            <p className="mt-3 text-xs uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400">
              {completedCount} / {totalNodes}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LearningQuestMap;
