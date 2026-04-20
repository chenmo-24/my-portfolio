import { Github, Mail } from "lucide-react";

function Contact({ info, language }) {
  return (
    <section
      className="container-shell py-20 md:py-24"
      data-reveal
      data-section
      id="contact"
      style={{ "--reveal-delay": "0.2s" }}
    >
      <div className="glass-panel px-6 py-14 text-center md:px-12">
        <p className="section-title justify-center">Contact</p>
        <h2 className="section-heading">{language === "zh" ? "联系我" : "Contact Me"}</h2>
        <p className="mx-auto mt-5 max-w-2xl text-base leading-8 text-slate-600 dark:text-slate-300">
          {language === "zh"
            ? "如果你对我的项目感兴趣，或者想一起交流技术、讨论实现细节，欢迎通过下面的方式联系我。"
            : "If you are interested in my projects or want to talk about implementation details and technology, feel free to reach out through the channels below."}
        </p>

        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <a className="primary-button min-w-44" href={info.github} rel="noreferrer" target="_blank">
            <Github size={18} />
            GitHub
          </a>
          <a className="secondary-button min-w-44" href={`mailto:${info.email}`}>
            <Mail size={18} />
            Email
          </a>
        </div>
      </div>
    </section>
  );
}

export default Contact;
