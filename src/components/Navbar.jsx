import { useEffect, useState } from "react";
import { Globe2, Menu, Moon, Sun, X } from "lucide-react";

function Navbar({
  activeSection,
  sections,
  language,
  theme,
  toggleLanguage,
  toggleTheme,
}) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 24);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [activeSection, language]);

  return (
    <header className="sticky top-0 z-50 px-4 pt-4 md:px-6">
      <div
        className={`container-shell rounded-full border transition duration-300 ${
          isScrolled
            ? "border-white/10 bg-slate-950/70 shadow-glow backdrop-blur-2xl dark:bg-slate-950/70"
            : "border-transparent bg-transparent"
        }`}
      >
        <div className="flex items-center justify-between gap-4 px-2 py-3 md:px-4">
          <a className="text-lg font-bold tracking-[0.2em] text-cyan-400" href="#home">
            chenmo-24
          </a>

          <nav className="hidden items-center gap-1 md:flex">
            {sections.map((section) => {
              const isActive = activeSection === section.id;
              return (
                <a
                  key={section.id}
                  className={`nav-pill rounded-full px-4 py-2 text-sm ${
                    isActive
                      ? "bg-cyan-400/15 text-cyan-300"
                      : "text-slate-600 hover:bg-white/10 hover:text-slate-950 dark:text-slate-300 dark:hover:text-white"
                  }`}
                  href={`#${section.id}`}
                >
                  {section.label}
                </a>
              );
            })}
          </nav>

          <div className="flex items-center gap-2">
            <div className="segmented-control hidden sm:inline-flex">
              <button
                aria-label={language === "zh" ? "切换为中文" : "Switch to Chinese"}
                className={`segmented-option ${language === "zh" ? "is-active" : ""}`}
                onClick={() => language !== "zh" && toggleLanguage()}
                type="button"
              >
                中
              </button>
              <button
                aria-label={language === "zh" ? "切换为英文" : "Switch to English"}
                className={`segmented-option ${language === "en" ? "is-active" : ""}`}
                onClick={() => language !== "en" && toggleLanguage()}
                type="button"
              >
                EN
              </button>
            </div>

            <button
              aria-label={language === "zh" ? "切换语言" : "Switch language"}
              className="secondary-button px-3 py-2 sm:hidden"
              onClick={toggleLanguage}
              type="button"
            >
              <Globe2 size={16} />
              <span className="text-xs font-semibold uppercase tracking-[0.2em]">
                {language === "zh" ? "EN" : "中"}
              </span>
            </button>

            <button
              aria-label={language === "zh" ? "切换主题" : "Switch theme"}
              className="secondary-button px-3 py-2"
              onClick={toggleTheme}
              type="button"
            >
              {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
              <span className="text-xs font-semibold uppercase tracking-[0.2em]">
                {language === "zh" ? (theme === "dark" ? "浅色" : "深色") : theme === "dark" ? "Light" : "Dark"}
              </span>
            </button>

            <button
              aria-expanded={isMenuOpen}
              aria-label={language === "zh" ? "打开导航菜单" : "Open navigation menu"}
              className="secondary-button px-4 py-2 md:hidden"
              onClick={() => setIsMenuOpen((open) => !open)}
              type="button"
            >
              {isMenuOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>

        {isMenuOpen ? (
          <nav className="border-t border-white/10 px-3 pb-4 pt-2 md:hidden">
            <div className="flex flex-col gap-2">
              {sections.map((section) => {
                const isActive = activeSection === section.id;
                return (
                  <a
                    key={section.id}
                    className={`nav-pill rounded-2xl px-4 py-3 text-sm ${
                      isActive
                        ? "bg-cyan-400/15 text-cyan-300"
                        : "text-slate-700 hover:bg-white/10 dark:text-slate-300"
                    }`}
                    href={`#${section.id}`}
                  >
                    {section.label}
                  </a>
                );
              })}
            </div>
          </nav>
        ) : null}
      </div>
    </header>
  );
}

export default Navbar;
