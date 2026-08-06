import React, { useEffect, useRef, useState, useCallback } from "react";
import "./potfolio.css";

/**
 * Portfolio
 * A single-page, monochrome-glassmorphism developer portfolio.
 * Sections: Nav, Home (intro + about + contact bar), Technology Stack,
 * Projects, Footer.
 *
 * The Home section is a single cohesive landing area: hero introduction,
 * a compact About card, and a prominent contact bar, so a visitor never
 * has to scroll to find a way to reach out.
 */

const NAV_LINKS = [
  { id: "home", label: "Home" },
  { id: "stack", label: "Tech Stack" },
  { id: "projects", label: "Projects" },
  { id: "contact-bar", label: "Contact" },
];

const STACK = [
  { name: "React", desc: "Building fast, component-driven interfaces." },
  { name: "Node.js", desc: "Server-side JavaScript & REST APIs." },
  { name: "Python", desc: "Scripting, automation & backend logic." },
  { name: "JavaScript", desc: "Modern ES6+ for the browser and beyond." },
  { name: "HTML5", desc: "Semantic, accessible markup." },
  { name: "CSS3", desc: "Responsive layouts & motion design." },
  { name: "Flask", desc: "Lightweight Python web services." },
  { name: "SQL", desc: "Data modelling, queries & reporting." },
];

const PROJECTS = [
  {
    title: "Chatbot Application",
    description:
      "An intelligent chatbot built using modern web technologies to provide interactive conversations and automated assistance.",
    tech: ["React", "Node.js", "JavaScript"],
    link: "#",
    github: "#",
  },
  {
    title: "Business Advertisement Website",
    description:
      "A responsive business website designed to advertise services, increase customer engagement, and improve online visibility.",
    tech: ["React", "CSS3", "HTML5"],
    link: "#",
    github: "#",
  },
  {
    title: "Portfolio Website",
    description:
      "A personal portfolio showcasing projects, technical skills, and professional experience using a clean modern interface.",
    tech: ["React", "CSS3", "JavaScript"],
    link: "#",
    github: "#",
  },
];

const CONTACT_LINKS = [
  {
    label: "GitHub",
    href: "https://github.com/yourusername",
    external: true,
    icon: (
      <path d="M12 2C6.48 2 2 6.58 2 12.17c0 4.49 2.87 8.3 6.84 9.64.5.1.68-.22.68-.49 0-.24-.01-1.04-.01-1.89-2.78.62-3.37-1.21-3.37-1.21-.46-1.19-1.11-1.51-1.11-1.51-.9-.63.07-.62.07-.62 1 .07 1.53 1.05 1.53 1.05.89 1.55 2.34 1.1 2.91.84.09-.66.35-1.1.63-1.35-2.22-.26-4.56-1.14-4.56-5.07 0-1.12.39-2.03 1.03-2.75-.1-.26-.45-1.31.1-2.72 0 0 .84-.27 2.75 1.05a9.3 9.3 0 0 1 5 0c1.91-1.32 2.75-1.05 2.75-1.05.55 1.41.2 2.46.1 2.72.64.72 1.03 1.63 1.03 2.75 0 3.94-2.34 4.8-4.57 5.06.36.32.68.94.68 1.9 0 1.37-.01 2.47-.01 2.81 0 .27.18.6.69.49A10.18 10.18 0 0 0 22 12.17C22 6.58 17.52 2 12 2Z" />
    ),
  },
  {
    label: "LinkedIn",
    href: "https://linkedin.com/in/yourusername",
    external: true,
    icon: (
      <path d="M6.94 8.5H3.56V20h3.38V8.5ZM5.25 3.5a1.96 1.96 0 1 0 0 3.92 1.96 1.96 0 0 0 0-3.92ZM20.44 20h-3.37v-5.9c0-1.41-.03-3.22-1.96-3.22-1.97 0-2.27 1.54-2.27 3.12V20H9.47V8.5h3.24v1.57h.05c.45-.85 1.55-1.75 3.2-1.75 3.42 0 4.05 2.25 4.05 5.18V20Z" />
    ),
  },
  {
    label: "Email",
    href: "mailto:your.email@example.com",
    external: false,
    icon: (
      <path d="M3 5.5A1.5 1.5 0 0 1 4.5 4h15A1.5 1.5 0 0 1 21 5.5v13a1.5 1.5 0 0 1-1.5 1.5h-15A1.5 1.5 0 0 1 3 18.5v-13Zm2.2.5 6.8 5.6L18.8 6H5.2Zm13.8 1.4-6.4 5.28a1 1 0 0 1-1.2 0L4.99 7.4V18h14V7.4Z" />
    ),
  },
  {
    label: "Download CV",
    href: "#",
    external: false,
    icon: (
      <path d="M12 3a1 1 0 0 1 1 1v9.09l2.79-2.8a1 1 0 1 1 1.42 1.42l-4.5 4.5a1 1 0 0 1-1.42 0l-4.5-4.5a1 1 0 1 1 1.42-1.42L11 13.09V4a1 1 0 0 1 1-1ZM5 19a1 1 0 0 1 1-1h12a1 1 0 1 1 0 2H6a1 1 0 0 1-1-1Z" />
    ),
  },
];

/** Small hook: fades an element in once it enters the viewport. */
function useReveal() {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return undefined;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisible(true);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return [ref, visible];
}

function Reveal({ as: Tag = "div", className = "", children, ...rest }) {
  const [ref, visible] = useReveal();
  return (
    <Tag
      ref={ref}
      className={`reveal ${visible ? "reveal--visible" : ""} ${className}`.trim()}
      {...rest}
    >
      {children}
    </Tag>
  );
}

export default function Portfolio() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  // Nav bar gains a stronger glass background once the page scrolls.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Track which section is in view to highlight the matching nav link.
  useEffect(() => {
    const sections = NAV_LINKS.map((link) => document.getElementById(link.id)).filter(
      Boolean
    );

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: "-40% 0px -50% 0px", threshold: 0 }
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  const handleNavClick = useCallback((e, id) => {
    e.preventDefault();
    const target = document.getElementById(id);
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
    setMenuOpen(false);
  }, []);

  return (
    <div className="portfolio">
      {/* ================= BACKGROUND ================= */}
      <div className="bg-glow bg-glow--one" aria-hidden="true" />
      <div className="bg-glow bg-glow--two" aria-hidden="true" />
      <div className="bg-grain" aria-hidden="true" />

      {/* ================= NAVIGATION ================= */}
      <header className={`nav ${scrolled ? "nav--scrolled" : ""}`}>
        <nav className="nav__inner" aria-label="Primary">
          <a
            href="#home"
            className="nav__brand"
            onClick={(e) => handleNavClick(e, "home")}
          >
            Frank<span className="nav__brand-dot">.</span>
          </a>

          <ul className={`nav__links ${menuOpen ? "nav__links--open" : ""}`}>
            {NAV_LINKS.map((link) => (
              <li key={link.id}>
                <a
                  href={`#${link.id}`}
                  className={`nav__link ${
                    activeSection === link.id ? "nav__link--active" : ""
                  }`}
                  onClick={(e) => handleNavClick(e, link.id)}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          <button
            type="button"
            className={`nav__toggle ${menuOpen ? "nav__toggle--open" : ""}`}
            aria-label="Toggle navigation menu"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((open) => !open)}
          >
            <span />
            <span />
            <span />
          </button>
        </nav>
      </header>

      <main>
        {/* ================= HOME (Hero + About + Contact) ================= */}
        <section id="home" className="section home">
          <div className="home__top">
            <div className="home__intro">
              <p className="hero__eyebrow">Full-Stack Web Developer</p>
              <h1 className="hero__title">
                Hi, I&rsquo;m <span className="hero__title-accent">Frank</span>
              </h1>
              <p className="hero__subtitle">
                Full Stack Web Developer &amp; Data-Focused Engineer
              </p>
              <p className="hero__paragraph">
                I build responsive, user-friendly web applications and enjoy
                turning complex problems into clean, working software &mdash;
                from interactive front ends to the data pipelines that power
                them behind the scenes.
              </p>
              <div className="hero__actions">
                <a
                  href="#projects"
                  className="btn btn--primary"
                  onClick={(e) => handleNavClick(e, "projects")}
                >
                  View Projects
                </a>
                <a
                  href="#contact-bar"
                  className="btn btn--ghost"
                  onClick={(e) => handleNavClick(e, "contact-bar")}
                >
                  Contact Me
                </a>
              </div>
            </div>

            <div className="home__visual" aria-hidden="true">
              <div className="avatar-ring">
                <div className="avatar-placeholder">FN</div>
              </div>

              {/* Signature element: animated data-pipeline graphic */}
              <svg
                className="pipeline"
                viewBox="0 0 320 320"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g className="pipeline__lines" stroke="url(#pipelineGradient)" strokeWidth="1.5" fill="none">
                  <path className="pipeline__path pipeline__path--1" d="M40,60 C120,60 100,150 180,150 S260,60 300,90" />
                  <path className="pipeline__path pipeline__path--2" d="M30,180 C100,220 140,150 200,210 S280,180 300,240" />
                  <path className="pipeline__path pipeline__path--3" d="M50,260 C110,260 150,200 210,240 S270,300 300,280" />
                </g>
                <g className="pipeline__nodes" fill="#e5e5ea">
                  <circle className="pipeline__node" cx="40" cy="60" r="5" />
                  <circle className="pipeline__node" cx="180" cy="150" r="5" />
                  <circle className="pipeline__node" cx="300" cy="90" r="5" />
                  <circle className="pipeline__node" cx="30" cy="180" r="5" />
                  <circle className="pipeline__node" cx="200" cy="210" r="5" />
                  <circle className="pipeline__node" cx="300" cy="240" r="5" />
                  <circle className="pipeline__node" cx="50" cy="260" r="5" />
                  <circle className="pipeline__node" cx="210" cy="240" r="5" />
                  <circle className="pipeline__node" cx="300" cy="280" r="5" />
                </g>
                <defs>
                  <linearGradient id="pipelineGradient" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="#ffffff" />
                    <stop offset="100%" stopColor="#8e8e93" />
                  </linearGradient>
                </defs>
              </svg>
            </div>
          </div>

          {/* ---- About, folded into Home ---- */}
          <Reveal as="div" className="glass-card home__about">
            <p className="section__eyebrow">About</p>
            <h2 className="home__about-title">
              A developer who likes both ends of the stack
            </h2>
            <p className="home__about-text">
              I&rsquo;m a full-stack web developer with a background in
              computer science and hands-on IT support experience. I
              specialize in building responsive, user-friendly web
              applications with React on the front end and Python-based
              services underneath &mdash; and lately that curiosity has
              pulled me toward the data side of engineering too: modelling,
              pipelines, and the systems that keep information moving
              cleanly from one place to another.
            </p>
          </Reveal>

          {/* ---- Contact bar, folded into Home ---- */}
          <Reveal
            as="div"
            id="contact-bar"
            className="contact-bar"
            aria-label="Contact links"
          >
            {CONTACT_LINKS.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="contact-bar__btn"
                target={item.external ? "_blank" : undefined}
                rel={item.external ? "noreferrer" : undefined}
              >
                <svg
                  className="contact-bar__icon"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  {item.icon}
                </svg>
                <span>{item.label}</span>
              </a>
            ))}
          </Reveal>
        </section>

        {/* ================= TECHNOLOGY STACK SECTION ================= */}
        <section id="stack" className="section stack">
          <div className="section__inner">
            <Reveal as="p" className="section__eyebrow">Technology Stack</Reveal>
            <Reveal as="h2" className="section__title">
              Powered by My Technology Stack
            </Reveal>

            <div className="stack__grid">
              {STACK.map((item, index) => (
                <Reveal
                  as="article"
                  key={item.name}
                  className="glass-card stack-card"
                  style={{ transitionDelay: `${index * 60}ms` }}
                >
                  <div className="stack-card__icon" aria-hidden="true">
                    {item.name.slice(0, 2).toUpperCase()}
                  </div>
                  <h3 className="stack-card__name">{item.name}</h3>
                  <p className="stack-card__desc">{item.desc}</p>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ================= PROJECTS SECTION ================= */}
        <section id="projects" className="section projects">
          <div className="section__inner">
            <Reveal as="p" className="section__eyebrow">Projects</Reveal>
            <Reveal as="h2" className="section__title">Selected Work</Reveal>

            <div className="projects__grid">
              {PROJECTS.map((project, index) => (
                <Reveal
                  as="article"
                  key={project.title}
                  className="glass-card project-card"
                  style={{ transitionDelay: `${index * 90}ms` }}
                >
                  <div className="project-card__logo" aria-hidden="true">
                    <svg viewBox="0 0 24 24">
                      <path d="M4 5.5A1.5 1.5 0 0 1 5.5 4h13A1.5 1.5 0 0 1 20 5.5v13a1.5 1.5 0 0 1-1.5 1.5h-13A1.5 1.5 0 0 1 4 18.5v-13Zm2 11.6 3.3-3.6a1 1 0 0 1 1.42-.06L12 14.7l3.6-4.3a1 1 0 0 1 1.55.02L18 12.6V6H6v11.1Z" />
                    </svg>
                    <span>Logo</span>
                  </div>
                  <h3 className="project-card__title">{project.title}</h3>
                  <p className="project-card__desc">{project.description}</p>
                  <ul className="project-card__tech">
                    {project.tech.map((tech) => (
                      <li key={tech}>{tech}</li>
                    ))}
                  </ul>
                  <div className="project-card__actions">
                    <a href={project.link} className="btn btn--small btn--primary">
                      View Project
                    </a>
                    <a
                      href={project.github}
                      className="btn btn--small btn--ghost"
                      aria-label={`${project.title} on GitHub`}
                    >
                      GitHub
                    </a>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      </main>

      {/* ================= FOOTER ================= */}
      <footer className="footer">
        <p>
          &copy; {new Date().getFullYear()} Frank. Built with React.
        </p>
      </footer>
    </div>
  );
}