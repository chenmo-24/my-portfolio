/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        accent: {
          50: "#ecfeff",
          100: "#cffafe",
          200: "#a5f3fc",
          300: "#67e8f9",
          400: "#22d3ee",
          500: "#06b6d4",
          600: "#0891b2",
          700: "#0e7490",
          800: "#155e75",
          900: "#164e63",
        },
        violetGlow: "#8b5cf6",
        deep: "#0a0a0f",
        surface: "#111827",
      },
      fontFamily: {
        sans: ['"PingFang SC"', '"Microsoft YaHei"', "sans-serif"],
        mono: ['"JetBrains Mono"', '"Fira Code"', "monospace"],
      },
      boxShadow: {
        soft: "0 24px 80px rgba(8, 145, 178, 0.18)",
        glow: "0 0 0 1px rgba(34, 211, 238, 0.15), 0 24px 80px rgba(59, 130, 246, 0.2)",
      },
      backgroundImage: {
        "grid-fade":
          "linear-gradient(rgba(6, 182, 212, 0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(6, 182, 212, 0.08) 1px, transparent 1px)",
      },
    },
  },
  plugins: [],
};
