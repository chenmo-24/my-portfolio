function Footer({ language, tagline }) {
  return (
    <footer className="relative z-10 mt-8 border-t border-white/10 bg-slate-950/70">
      <div className="container-shell py-8 text-center">
        <p className="text-sm text-slate-300">
          © {new Date().getFullYear()} chenmo-24.{" "}
          {language === "zh" ? "All rights reserved." : "All rights reserved."}
        </p>
        <p className="mt-2 text-sm text-slate-400">{tagline}</p>
      </div>
    </footer>
  );
}

export default Footer;
