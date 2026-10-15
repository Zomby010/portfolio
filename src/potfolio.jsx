import { useEffect, useRef, useState, useCallback } from "react";
import {
  siReact,
  siJavascript,
  siHtml5,
  siCss,
  siNodedotjs,
  siExpress,
  siPython,
  siFlask,
  siGit,
  siGithub,
  siVite,
  siVercel,
} from "simple-icons";
import "./potfolio.css";

/**
 * Portfolio
 * A single-page developer portfolio.
 * Sections: Nav, Hero, Featured work, Other projects, Tech stack,
 * Experience, Contact, Footer.
 */

const EMAIL = "franklineo549@gmail.com";
const GITHUB_URL = "https://github.com/Zomby010";
const LINKEDIN_URL = "https://www.linkedin.com/in/frankline-otieno-b84290216/";

const NAV_LINKS = [
  { id: "work", label: "Work" },
  { id: "stack", label: "Stack" },
  { id: "experience", label: "Experience" },
  { id: "contact", label: "Contact" },
];

/** Featured case study: a website and a business system for one client. */
const FEATURED = {
  client: "Spears Resilience Systems",
  title: "Website & business management system for a security company",
  summary:
    "Spears Resilience Systems needed a public face and a way to run day-to-day operations. I built both: a marketing website that presents their security services, and a separate business management system the team uses internally.",
  parts: [
    {
      name: "Company website",
      desc: "Responsive marketing site presenting the company's services and making it easy for clients to get in touch.",
      tech: ["React", "JavaScript", "CSS"],
      live: "https://spearsesiliencesystems.vercel.app",
      github: "https://github.com/Zomby010/Resilience",
    },
    {
      name: "Business management system",
      desc: "Internal web app for managing the company's operations, with a Python back end.",
      tech: ["Python", "SQL", "Web app"],
      live: "https://resilience-bms.vercel.app",
      github: null, // private repository
    },
  ],
};

const PROJECTS = [
  {
    title: "Chat",
    description:
      "A real-time chat application for sending and receiving messages in the browser.",
    tech: ["JavaScript", "Node.js"],
    github: "https://github.com/Zomby010/Chat",
    accent: "teal",
  },
  {
    title: "Personal Reminder",
    description:
      "Watches a timetable CSV and, when a scheduled time arrives, sounds an alarm and shows the task on screen.",
    tech: ["JavaScript", "CSV", "Automation"],
    github: "https://github.com/Zomby010/Personal-Reminder",
    accent: "amber",
  },
  {
    title: "Signup & Login Auth",
    description:
      "A user authentication flow with sign-up and login, the groundwork for any app that needs accounts.",
    tech: ["JavaScript", "Node.js", "Auth"],
    github: "https://github.com/Zomby010/Signup-and-Login-AUTH",
    accent: "violet",
  },
  {
    title: "Chungu",
    description: "A gallery website for browsing and showcasing a collection of images.",
    tech: ["JavaScript", "HTML", "CSS"],
    github: "https://github.com/Zomby010/chungu",
    accent: "rose",
  },
  {
    title: "Basic APIs",
    description: "A set of small REST API endpoints exploring routing, requests and JSON responses.",
    tech: ["JavaScript", "REST"],
    github: "https://github.com/Zomby010/basic-APIs",
    accent: "sky",
  },
];

/** Hand-drawn icon for SQL, which has no brand logo. */
const DATABASE_ICON = {
  path: "M12 2C7.03 2 3 3.57 3 5.5v13C3 20.43 7.03 22 12 22s9-1.57 9-3.5v-13C21 3.57 16.97 2 12 2Zm0 2c4.42 0 7 1.3 7 1.5S16.42 7 12 7 5 5.7 5 5.5 7.58 4 12 4ZM5 8.13C6.6 8.68 9.13 9 12 9s5.4-.32 7-.87V12c0 .2-2.58 1.5-7 1.5S5 12.2 5 12V8.13Zm0 6.5c1.6.55 4.13.87 7 .87s5.4-.32 7-.87v3.87c0 .2-2.58 1.5-7 1.5s-7-1.3-7-1.5v-3.87Z",
};

const STACK_GROUPS = [
  {
    label: "Frontend",
    items: [
      { name: "React", icon: siReact },
      { name: "JavaScript", icon: siJavascript },
      { name: "HTML5", icon: siHtml5 },
      { name: "CSS", icon: siCss },
    ],
  },
  {
    label: "Backend & data",
    items: [
      { name: "Node.js", icon: siNodedotjs },
      { name: "Express", icon: siExpress },
      { name: "Python", icon: siPython },
      { name: "Flask", icon: siFlask },
      { name: "SQL", icon: DATABASE_ICON },
    ],
  },
  {
    label: "Tools",
    items: [
      { name: "Git", icon: siGit },
      { name: "GitHub", icon: siGithub },
      { name: "Vite", icon: siVite },
      { name: "Vercel", icon: siVercel },
    ],
  },
];

const EXPERIENCE = [
  {
    role: "Full-Stack Developer (freelance)",
    org: "Spears Resilience Systems",
    period: "2026",
    points: [
      "Built and deployed the company website on Vercel.",
      "Built an internal business management system with a Python back end.",
    ],
  },
  {
    role: "IT Support",
    org: "Hands-on support experience",
    period: null,
    points: [
      "Troubleshot hardware, software and network issues for end users.",
      "Learned to explain technical problems clearly to non-technical people.",
    ],
  },
  {
    role: "Computer Science",
    org: "Education",
    period: null,
    points: [
      "Foundation in programming, data structures, databases and web development.",
    ],
  },
];

const LINKEDIN_PATH =
  "M6.94 8.5H3.56V20h3.38V8.5ZM5.25 3.5a1.96 1.96 0 1 0 0 3.92 1.96 1.96 0 0 0 0-3.92ZM20.44 20h-3.37v-5.9c0-1.41-.03-3.22-1.96-3.22-1.97 0-2.27 1.54-2.27 3.12V20H9.47V8.5h3.24v1.57h.05c.45-.85 1.55-1.75 3.2-1.75 3.42 0 4.05 2.25 4.05 5.18V20Z";
const MAIL_PATH =
  "M3 5.5A1.5 1.5 0 0 1 4.5 4h15A1.5 1.5 0 0 1 21 5.5v13a1.5 1.5 0 0 1-1.5 1.5h-15A1.5 1.5 0 0 1 3 18.5v-13Zm2.2.5 6.8 5.6L18.8 6H5.2Zm13.8 1.4-6.4 5.28a1 1 0 0 1-1.2 0L4.99 7.4V18h14V7.4Z";
const ARROW_PATH =
  "M7 17 17 7M9 7h8v8";

function Icon({ path, className = "icon" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden="true">
      <path d={path} />
    </svg>
  );
}

function ArrowIcon() {
  return (
    <svg className="icon icon--stroke" viewBox="0 0 24 24" aria-hidden="true">
      <path d={ARROW_PATH} />
    </svg>
  );
}

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
      { threshold: 0.1 }
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

function SectionHeading({ eyebrow, title, children }) {
  return (
    <Reveal className="section__head">
      <p className="section__eyebrow">{eyebrow}</p>
      <h2 className="section__title">{title}</h2>
      {children && <p className="section__lead">{children}</p>}
    </Reveal>
  );
}

function TechList({ tech }) {
  return (
    <ul className="tags" aria-label="Technologies">
      {tech.map((t) => (
        <li key={t}>{t}</li>
      ))}
    </ul>
  );
}

/** Copies the email address and briefly confirms it. */
function CopyEmailButton() {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      window.location.href = `mailto:${EMAIL}`;
    }
  };

  return (
    <button type="button" className="btn btn--ghost" onClick={copy}>
      <span aria-live="polite">{copied ? "Copied!" : "Copy email"}</span>
    </button>
  );
}

export default function Portfolio() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  // Nav bar gains a background once the page scrolls.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
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
      { rootMargin: "-40% 0px -55% 0px", threshold: 0 }
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  // Close the mobile menu with Escape.
  useEffect(() => {
    if (!menuOpen) return undefined;
    const onKey = (e) => e.key === "Escape" && setMenuOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [menuOpen]);

  const handleNavClick = useCallback((e, id) => {
    e.preventDefault();
    const target = document.getElementById(id);
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
      history.replaceState(null, "", `#${id}`);
    }
    setMenuOpen(false);
  }, []);

  return (
    <div className="portfolio">
      <a href="#main" className="skip-link">
        Skip to content
      </a>

      <div className="bg-glow" aria-hidden="true" />

      {/* ================= NAVIGATION ================= */}
      <header className={`nav ${scrolled ? "nav--scrolled" : ""}`}>
        <nav className="nav__inner" aria-label="Primary">
          <a
            href="#top"
            className="nav__brand"
            onClick={(e) => handleNavClick(e, "top")}
          >
            Frank<span className="nav__brand-dot">.</span>
          </a>

          <ul
            id="nav-menu"
            className={`nav__links ${menuOpen ? "nav__links--open" : ""}`}
          >
            {NAV_LINKS.map((link) => (
              <li key={link.id}>
                <a
                  href={`#${link.id}`}
                  className={`nav__link ${
                    activeSection === link.id ? "nav__link--active" : ""
                  }`}
                  aria-current={activeSection === link.id ? "true" : undefined}
                  onClick={(e) => handleNavClick(e, link.id)}
                >
                  {link.label}
                </a>
              </li>
            ))}
            <li className="nav__cta-item">
              <a
                href={`mailto:${EMAIL}`}
                className="btn btn--primary btn--small"
              >
                Hire me
              </a>
            </li>
          </ul>

          <button
            type="button"
            className={`nav__toggle ${menuOpen ? "nav__toggle--open" : ""}`}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-controls="nav-menu"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((open) => !open)}
          >
            <span />
            <span />
            <span />
          </button>
        </nav>
      </header>

      <main id="main">
        {/* ================= HERO ================= */}
        <section id="top" className="hero">
          <div className="container hero__inner">
            <div className="hero__text">
              <p className="badge">
                <span className="badge__dot" aria-hidden="true" />
                Available for freelance &amp; full-time work
              </p>
              <h1 className="hero__title">
                Hi, I&rsquo;m Frank.
                <span className="hero__title-sub">
                  I build web apps that businesses actually run on.
                </span>
              </h1>
              <p className="hero__paragraph">
                Full-stack developer working in React, Node.js and Python.
                Most recently I built the website and internal business
                management system for{" "}
                <a href="#work" onClick={(e) => handleNavClick(e, "work")}>
                  Spears Resilience Systems
                </a>
                , a security company.
              </p>
              <div className="hero__actions">
                <a
                  href="#work"
                  className="btn btn--primary"
                  onClick={(e) => handleNavClick(e, "work")}
                >
                  See my work
                </a>
                <a
                  href="#contact"
                  className="btn btn--ghost"
                  onClick={(e) => handleNavClick(e, "contact")}
                >
                  Get in touch
                </a>
              </div>
              <ul className="hero__social" aria-label="Profiles">
                <li>
                  <a href={GITHUB_URL} target="_blank" rel="noreferrer" aria-label="GitHub">
                    <Icon path={siGithub.path} />
                  </a>
                </li>
                <li>
                  <a href={LINKEDIN_URL} target="_blank" rel="noreferrer" aria-label="LinkedIn">
                    <Icon path={LINKEDIN_PATH} />
                  </a>
                </li>
                <li>
                  <a href={`mailto:${EMAIL}`} aria-label="Email">
                    <Icon path={MAIL_PATH} />
                  </a>
                </li>
              </ul>
            </div>

            <div className="hero__visual" aria-hidden="true">
              <div className="avatar">FN</div>
              <div className="hero__card hero__card--code">
                <span className="code-key">const</span> frank = {"{"}
                <br />
                &nbsp;&nbsp;role: <span className="code-str">&quot;full-stack&quot;</span>,
                <br />
                &nbsp;&nbsp;stack: [<span className="code-str">&quot;React&quot;</span>,{" "}
                <span className="code-str">&quot;Python&quot;</span>],
                <br />
                &nbsp;&nbsp;shipping: <span className="code-key">true</span>
                <br />
                {"}"}
              </div>
            </div>
          </div>
        </section>

        {/* ================= FEATURED WORK ================= */}
        <section id="work" className="section">
          <div className="container">
            <SectionHeading eyebrow="Featured work" title={FEATURED.client} />

            <Reveal as="article" className="featured">
              <div className="featured__intro">
                <h3 className="featured__title">{FEATURED.title}</h3>
                <p className="featured__summary">{FEATURED.summary}</p>
              </div>

              <div className="featured__parts">
                {FEATURED.parts.map((part) => (
                  <div key={part.name} className="featured__part">
                    <div className="browser" aria-hidden="true">
                      <div className="browser__bar">
                        <span />
                        <span />
                        <span />
                        <em>{part.live.replace("https://", "")}</em>
                      </div>
                      <div className="browser__body">
                        <strong>{part.name}</strong>
                      </div>
                    </div>
                    <h4 className="featured__part-name">{part.name}</h4>
                    <p className="featured__part-desc">{part.desc}</p>
                    <TechList tech={part.tech} />
                    <div className="card-links">
                      <a
                        href={part.live}
                        target="_blank"
                        rel="noreferrer"
                        className="link"
                      >
                        Live site <ArrowIcon />
                      </a>
                      {part.github ? (
                        <a
                          href={part.github}
                          target="_blank"
                          rel="noreferrer"
                          className="link link--muted"
                        >
                          Source <ArrowIcon />
                        </a>
                      ) : (
                        <span className="link link--muted link--static">
                          Private client code
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </Reveal>

            {/* ---- Other projects ---- */}
            <Reveal as="h3" className="subheading">
              More projects
            </Reveal>
            <div className="projects">
              {PROJECTS.map((project, index) => (
                <Reveal
                  as="article"
                  key={project.title}
                  className={`project project--${project.accent}`}
                  style={{ transitionDelay: `${index * 60}ms` }}
                >
                  <div className="project__cover" aria-hidden="true">
                    <span>{project.title}</span>
                  </div>
                  <div className="project__body">
                    <h4 className="project__title">
                      <a href={project.github} target="_blank" rel="noreferrer">
                        {project.title}
                        <ArrowIcon />
                      </a>
                    </h4>
                    <p className="project__desc">{project.description}</p>
                    <TechList tech={project.tech} />
                  </div>
                </Reveal>
              ))}
            </div>

            <Reveal className="more-link">
              <a href={GITHUB_URL} target="_blank" rel="noreferrer" className="link">
                Everything else is on GitHub <ArrowIcon />
              </a>
            </Reveal>
          </div>
        </section>

        {/* ================= TECH STACK ================= */}
        <section id="stack" className="section section--tinted">
          <div className="container">
            <SectionHeading eyebrow="Tech stack" title="Tools I build with" />
            <div className="stack">
              {STACK_GROUPS.map((group) => (
                <Reveal key={group.label} className="stack__group">
                  <h3 className="stack__label">{group.label}</h3>
                  <ul className="stack__items">
                    {group.items.map((item) => (
                      <li key={item.name} className="chip">
                        <Icon path={item.icon.path} className="chip__icon" />
                        {item.name}
                      </li>
                    ))}
                  </ul>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ================= EXPERIENCE ================= */}
        <section id="experience" className="section">
          <div className="container experience">
            <SectionHeading eyebrow="Experience" title="Where I've been">
              I came to development through computer science and IT support,
              so I care about software that is reliable and easy for real
              people to use.
            </SectionHeading>
            <ol className="timeline">
              {EXPERIENCE.map((item) => (
                <Reveal as="li" key={item.role} className="timeline__item">
                  <div className="timeline__head">
                    <h3 className="timeline__role">{item.role}</h3>
                    {item.period && (
                      <span className="timeline__period">{item.period}</span>
                    )}
                  </div>
                  <p className="timeline__org">{item.org}</p>
                  <ul className="timeline__points">
                    {item.points.map((point) => (
                      <li key={point}>{point}</li>
                    ))}
                  </ul>
                </Reveal>
              ))}
            </ol>
          </div>
        </section>

        {/* ================= CONTACT ================= */}
        <section id="contact" className="section">
          <div className="container">
            <Reveal className="contact">
              <p className="section__eyebrow">Contact</p>
              <h2 className="contact__title">Have a project in mind?</h2>
              <p className="contact__text">
                I&rsquo;m open to freelance projects and full-time roles. Send
                me a message and I&rsquo;ll get back to you.
              </p>
              <a href={`mailto:${EMAIL}`} className="contact__email">
                {EMAIL}
              </a>
              <div className="contact__actions">
                <a href={`mailto:${EMAIL}`} className="btn btn--primary">
                  <Icon path={MAIL_PATH} />
                  Email me
                </a>
                <CopyEmailButton />
                <a
                  href={LINKEDIN_URL}
                  target="_blank"
                  rel="noreferrer"
                  className="btn btn--ghost"
                >
                  <Icon path={LINKEDIN_PATH} />
                  LinkedIn
                </a>
              </div>
            </Reveal>
          </div>
        </section>
      </main>

      {/* ================= FOOTER ================= */}
      <footer className="footer">
        <div className="container footer__inner">
          <p>&copy; {new Date().getFullYear()} Frank. Built with React &amp; Vite.</p>
          <ul className="footer__links">
            <li>
              <a href={GITHUB_URL} target="_blank" rel="noreferrer">
                GitHub
              </a>
            </li>
            <li>
              <a href={LINKEDIN_URL} target="_blank" rel="noreferrer">
                LinkedIn
              </a>
            </li>
            <li>
              <a href={`mailto:${EMAIL}`}>Email</a>
            </li>
          </ul>
        </div>
      </footer>
    </div>
  );
}
