import { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Projects from "./components/Projects";
import FunZone from "./components/FunZone";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import CommandPalette from "./components/CommandPalette";
import KonamiEasterEgg from "./components/KonamiEasterEgg";
import { personalInfo } from "./data/personalInfo";
import projects from "./data/projects";
import quotes from "./data/quotes";
import { useTheme } from "./hooks/useTheme";
import { useLanguage } from "./hooks/useLanguage";

function App() {
  const { theme, toggleTheme } = useTheme();
  const { language, toggleLanguage } = useLanguage();
  const [activeSection, setActiveSection] = useState("home");

  const sections =
    language === "zh"
      ? [
          { id: "home", label: "首页" },
          { id: "about", label: "关于" },
          { id: "projects", label: "项目" },
          { id: "fun-zone", label: "Fun Zone" },
          { id: "contact", label: "联系" },
        ]
      : [
          { id: "home", label: "Home" },
          { id: "about", label: "About" },
          { id: "projects", label: "Projects" },
          { id: "fun-zone", label: "Fun Zone" },
          { id: "contact", label: "Contact" },
        ];

  useEffect(() => {
    document.title = language === "zh" ? "chenmo-24 | 个人主页" : "chenmo-24 | Portfolio";
  }, [language]);

  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const revealElements = Array.from(document.querySelectorAll("[data-reveal]"));
    const trackedSections = Array.from(document.querySelectorAll("[data-section]"));

    if (reduceMotion) {
      revealElements.forEach((element) => element.classList.add("is-visible"));
    }

    const revealObserver = reduceMotion
      ? null
      : new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              if (entry.isIntersecting) {
                entry.target.classList.add("is-visible");
                revealObserver?.unobserve(entry.target);
              }
            });
          },
          { threshold: 0.05, rootMargin: "0px 0px -32px 0px" }
        );

    revealElements.forEach((element) => revealObserver?.observe(element));

    const sectionObserver = new IntersectionObserver(
      (entries) => {
        const visibleEntry = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (visibleEntry?.target?.id) {
          setActiveSection(visibleEntry.target.id);
        }
      },
      { threshold: [0.25, 0.4, 0.6], rootMargin: "-20% 0px -50% 0px" }
    );

    revealElements.forEach((element) => element.classList.remove("is-visible"));
    trackedSections.forEach((section) => sectionObserver.observe(section));

    return () => {
      revealObserver?.disconnect();
      sectionObserver.disconnect();
    };
  }, [language]);

  return (
    <div className="site-shell relative min-h-screen overflow-x-hidden bg-[var(--bg-primary)] text-[var(--text-primary)] transition-colors duration-300">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="glow-orb left-[-8rem] top-20 h-72 w-72 bg-cyan-500/20" />
        <div className="glow-orb right-[-6rem] top-[28rem] h-80 w-80 bg-violet-500/20 [animation-delay:-3s]" />
        <div className="glow-orb bottom-10 left-1/3 h-64 w-64 bg-sky-500/15 [animation-delay:-6s]" />
        <div className="absolute inset-0 bg-grid-fade bg-[size:38px_38px] opacity-25 [mask-image:radial-gradient(circle_at_center,black,transparent_78%)]" />
      </div>

      <Navbar
        activeSection={activeSection}
        sections={sections}
        language={language}
        theme={theme}
        toggleLanguage={toggleLanguage}
        toggleTheme={toggleTheme}
      />

      <main className="relative z-10">
        <Hero info={personalInfo} language={language} />
        <About info={personalInfo} language={language} />
        <Projects items={projects} language={language} />
        <FunZone language={language} quotes={quotes} />
        <Contact info={personalInfo} language={language} />
      </main>

      <Footer language={language} tagline={personalInfo.footerTagline[language]} />

      <CommandPalette
        language={language}
        theme={theme}
        toggleTheme={toggleTheme}
        toggleLanguage={toggleLanguage}
      />

      <KonamiEasterEgg language={language} />
    </div>
  );
}

export default App;
