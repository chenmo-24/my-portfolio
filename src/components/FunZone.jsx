import AlgorithmTracker from "./AlgorithmTracker";
import DailyQuote from "./DailyQuote";
import CheckinCalendar from "./CheckinCalendar";
import SnakeGame from "./SnakeGame";
import SkillRadar from "./SkillRadar";
import NowPage from "./NowPage";
import GithubStats from "./GithubStats";
import InteractiveTerminal from "./InteractiveTerminal";
import CodeTyping from "./CodeTyping";
import Game2048 from "./Game2048";
import GameOfLife from "./GameOfLife";
import algorithmProgress from "../data/algorithmProgress";
import skillRadarData from "../data/skills";
import nowPageData from "../data/nowPage";
import githubStatsData from "../data/githubStats";
import codeSnippets from "../data/codeSnippets";

function FunZone({ language, quotes }) {
  const modules = [
    { id: "mod-algorithm", delay: "0.05s", node: <AlgorithmTracker language={language} progress={algorithmProgress} /> },
    { id: "mod-radar", delay: "0.07s", node: <SkillRadar language={language} data={skillRadarData} /> },
    { id: "mod-quote", delay: "0.09s", node: <DailyQuote language={language} quotes={quotes} /> },
    { id: "mod-now", delay: "0.11s", node: <NowPage language={language} data={nowPageData} /> },
    { id: "mod-checkin", delay: "0.13s", node: <CheckinCalendar language={language} /> },
    { id: "mod-github", delay: "0.15s", node: <GithubStats language={language} data={githubStatsData} /> },
    { id: "mod-terminal", delay: "0.17s", node: <InteractiveTerminal language={language} /> },
    { id: "mod-typing", delay: "0.19s", node: <CodeTyping language={language} snippets={codeSnippets} /> },
    { id: "mod-snake", delay: "0.21s", node: <SnakeGame language={language} /> },
    { id: "mod-2048", delay: "0.23s", node: <Game2048 language={language} /> },
    { id: "mod-life", delay: "0.25s", node: <GameOfLife language={language} /> },
  ];

  return (
    <section
      className="container-shell py-20 md:py-24"
      data-section
      id="fun-zone"
    >
      <div className="mb-12" data-reveal style={{ "--reveal-delay": "0s" }}>
        <p className="section-title">Fun Zone</p>
        <h2 className="section-heading">
          {language === "zh" ? "有趣但不空的交互区" : "Interactive, but not Empty"}
        </h2>
        <p className="section-copy">
          {language === "zh"
            ? "这里集中放 11 个模块：算法进度、技能雷达、每日语录、Now 页、打卡日历、GitHub 活跃度、交互式终端、打字挑战、贪吃蛇、2048、康威生命游戏。按 Cmd/Ctrl + K 可以快速跳转，也可以尝试输入古老的 Konami Code。"
            : "Eleven modules live here: algorithm tracker, skill radar, daily quote, now page, check-in calendar, GitHub stats, interactive terminal, typing challenge, snake, 2048, and Conway's Game of Life. Press Cmd/Ctrl + K to jump between them — or try typing the ancient Konami Code."}
        </p>
      </div>

      <div className="space-y-8">
        {modules.map((m) => (
          <div key={m.id} id={m.id} data-reveal style={{ "--reveal-delay": m.delay }}>
            {m.node}
          </div>
        ))}
      </div>
    </section>
  );
}

export default FunZone;
