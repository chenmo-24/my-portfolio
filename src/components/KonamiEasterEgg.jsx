import { useEffect, useRef, useState } from "react";

const SEQUENCE = [
  "ArrowUp",
  "ArrowUp",
  "ArrowDown",
  "ArrowDown",
  "ArrowLeft",
  "ArrowRight",
  "ArrowLeft",
  "ArrowRight",
  "b",
  "a",
];

function normalizeKey(event) {
  if (event.key.length === 1) return event.key.toLowerCase();
  return event.key;
}

function KonamiEasterEgg({ language }) {
  const [active, setActive] = useState(false);
  const progress = useRef(0);
  const canvasRef = useRef(null);
  const rafRef = useRef(null);

  useEffect(() => {
    const onKey = (event) => {
      if (
        document.activeElement &&
        /input|textarea/i.test(document.activeElement.tagName)
      ) {
        return;
      }

      const key = normalizeKey(event);
      const expected = SEQUENCE[progress.current];

      if (key === expected) {
        progress.current += 1;
        if (progress.current === SEQUENCE.length) {
          progress.current = 0;
          setActive(true);
        }
      } else {
        progress.current = key === SEQUENCE[0] ? 1 : 0;
      }
    };

    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    if (!active) return undefined;
    const onKey = (event) => {
      if (event.key === "Escape") {
        event.preventDefault();
        setActive(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [active]);

  useEffect(() => {
    if (!active || !canvasRef.current) return undefined;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let width = window.innerWidth;
    let height = window.innerHeight;
    const dpr = window.devicePixelRatio || 1;

    const applySize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    applySize();

    const fontSize = 18;
    const columns = Math.ceil(width / fontSize);
    const drops = new Array(columns)
      .fill(0)
      .map(() => Math.floor((Math.random() * height) / fontSize));
    const chars =
      "0123456789ABCDEFアイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモ<>/\\{}[]()=+-*";

    const draw = () => {
      ctx.fillStyle = "rgba(2, 6, 23, 0.18)";
      ctx.fillRect(0, 0, width, height);
      ctx.font = `${fontSize}px "Fira Code", "JetBrains Mono", monospace`;

      for (let i = 0; i < drops.length; i += 1) {
        const text = chars.charAt(Math.floor(Math.random() * chars.length));
        const x = i * fontSize;
        const y = drops[i] * fontSize;

        ctx.fillStyle = "rgba(190, 242, 213, 0.95)";
        ctx.fillText(text, x, y);

        ctx.fillStyle = "rgba(34, 211, 238, 0.75)";
        ctx.fillText(text, x, y - fontSize);

        if (y > height && Math.random() > 0.975) drops[i] = 0;
        drops[i] += 1;
      }

      rafRef.current = requestAnimationFrame(draw);
    };

    rafRef.current = requestAnimationFrame(draw);

    const onResize = () => applySize();
    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", onResize);
    };
  }, [active]);

  if (!active) return null;

  return (
    <div
      className="fixed inset-0 z-[200] flex items-center justify-center"
      onClick={() => setActive(false)}
      role="presentation"
    >
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />
      <div className="absolute inset-0 bg-slate-950/60" />
      <div className="relative z-10 max-w-md px-6 text-center font-mono text-white">
        <p className="text-xs uppercase tracking-[0.42em] text-emerald-300">
          ↑ ↑ ↓ ↓ ← → ← → B A
        </p>
        <p className="mt-5 text-3xl font-bold sm:text-4xl">
          {language === "zh" ? "彩蛋已解锁" : "CHEAT ACTIVATED"}
        </p>
        <p className="mt-4 text-sm leading-7 text-emerald-200/80">
          {language === "zh"
            ? "欢迎找到这个 Konami Code 彩蛋 — 老玩家的接头暗号。"
            : "You found the Konami Code — a veteran's secret handshake."}
        </p>
        <p className="mt-8 text-[11px] uppercase tracking-[0.32em] text-slate-300/70">
          {language === "zh"
            ? "按 ESC 或点击任意处返回"
            : "Press ESC or click anywhere to return"}
        </p>
      </div>
    </div>
  );
}

export default KonamiEasterEgg;
