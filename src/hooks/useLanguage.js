import { useEffect, useState } from "react";

const STORAGE_KEY = "portfolio-language";

function getInitialLanguage() {
  if (typeof window === "undefined") {
    return "zh";
  }

  const storedLanguage = window.localStorage.getItem(STORAGE_KEY);
  if (storedLanguage === "zh" || storedLanguage === "en") {
    return storedLanguage;
  }

  return "zh";
}

export function useLanguage() {
  const [language, setLanguage] = useState(getInitialLanguage);

  useEffect(() => {
    document.documentElement.lang = language === "zh" ? "zh-CN" : "en";
    window.localStorage.setItem(STORAGE_KEY, language);
  }, [language]);

  const toggleLanguage = () => {
    setLanguage((currentLanguage) => (currentLanguage === "zh" ? "en" : "zh"));
  };

  return { language, toggleLanguage };
}
