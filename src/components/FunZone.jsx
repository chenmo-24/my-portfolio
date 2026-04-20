import AlgorithmTracker from "./AlgorithmTracker";
import DailyQuote from "./DailyQuote";
import CheckinCalendar from "./CheckinCalendar";
import SnakeGame from "./SnakeGame";
import algorithmProgress from "../data/algorithmProgress";

function FunZone({ language, quotes }) {
  return (
    <section
      className="container-shell py-20 md:py-24"
      data-reveal
      data-section
      id="fun-zone"
      style={{ "--reveal-delay": "0.16s" }}
    >
      <div className="mb-12">
        <p className="section-title">Fun Zone</p>
        <h2 className="section-heading">
          {language === "zh" ? "有趣但不空的交互区" : "Interactive, but not Empty"}
        </h2>
        <p className="section-copy">
          {language === "zh"
            ? "这里不只放小玩具，也放能体现学习节奏和技术兴趣的模块。除了语录、打卡和贪吃蛇，现在再加上一块算法进度可视化面板。"
            : "This area is not just for playful widgets. It also reflects learning rhythm and technical interests through quotes, check-ins, snake, and an algorithm progress panel."}
        </p>
      </div>

      <div className="space-y-8">
        <AlgorithmTracker language={language} progress={algorithmProgress} />
        <DailyQuote language={language} quotes={quotes} />
        <CheckinCalendar language={language} />
        <SnakeGame language={language} />
      </div>
    </section>
  );
}

export default FunZone;
