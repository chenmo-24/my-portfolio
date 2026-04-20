import { RefreshCcw, Quote } from "lucide-react";
import { useState } from "react";

function DailyQuote({ language, quotes }) {
  const initialIndex = (new Date().getDate() - 1) % quotes.length;
  const [quoteIndex, setQuoteIndex] = useState(initialIndex);
  const [isSwitching, setIsSwitching] = useState(false);

  const handleShuffle = () => {
    if (quotes.length <= 1) {
      return;
    }

    let nextIndex = quoteIndex;
    while (nextIndex === quoteIndex) {
      nextIndex = Math.floor(Math.random() * quotes.length);
    }

    setIsSwitching(true);
    window.setTimeout(() => {
      setQuoteIndex(nextIndex);
      setIsSwitching(false);
    }, 180);
  };

  const quote = quotes[quoteIndex];
  const quoteText = quote.text[language];
  const quoteAuthor = typeof quote.author === "string" ? quote.author : quote.author[language];

  return (
    <div className="panel-card mx-auto max-w-4xl overflow-hidden p-8 md:p-10">
      <div className="mb-6 flex items-center justify-between gap-4">
        <div>
          <p className="section-title mb-2">Module A</p>
          <h3 className="text-2xl font-semibold text-slate-900 dark:text-white">
            {language === "zh" ? "每日箴言 / 语录" : "Daily Quote"}
          </h3>
        </div>
        <button className="secondary-button px-4 py-2" onClick={handleShuffle} type="button">
          <RefreshCcw size={16} />
          {language === "zh" ? "换一句" : "Shuffle"}
        </button>
      </div>

      <div className="glass-panel px-6 py-10 text-center">
        <Quote className="mx-auto mb-4 text-cyan-400" size={34} />
        <div className={`quote-transition ${isSwitching ? "is-hidden" : ""}`}>
          <p className="mx-auto max-w-2xl text-xl font-medium leading-10 text-slate-900 dark:text-white md:text-2xl">
            “{quoteText}”
          </p>
          <p className="mt-5 text-sm uppercase tracking-[0.28em] text-slate-500 dark:text-slate-400">
            {quoteAuthor}
          </p>
        </div>
      </div>
    </div>
  );
}

export default DailyQuote;
