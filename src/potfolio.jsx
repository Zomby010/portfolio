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
  siDjango,
  siPostgresql,
  siFirebase,
  siArduino,
} from "simple-icons";
import "./potfolio.css";
import spearsSiteHero from "./assets/projects/spears-site-hero.webp";
import spearsSiteServices from "./assets/projects/spears-site-services.webp";
import spearsSiteTracker from "./assets/projects/spears-site-tracker.webp";
import spearsSiteClients from "./assets/projects/spears-site-clients.webp";
import bmsTodo from "./assets/projects/bms-todo.webp";
import bmsManagerMobile from "./assets/projects/bms-manager-mobile.webp";
import bmsSuppliers from "./assets/projects/bms-suppliers.webp";
import bmsClientPortal from "./assets/projects/bms-client-portal.webp";
import posSell from "./assets/projects/pos-sell.webp";
import posPayment from "./assets/projects/pos-payment.webp";
import posReceipt from "./assets/projects/pos-receipt.webp";
import posProducts from "./assets/projects/pos-products.webp";
import mindmateHome from "./assets/projects/mindmate-home.webp";
import mindmateFeatures from "./assets/projects/mindmate-features.webp";
import mindmateSupport from "./assets/projects/mindmate-support.webp";
import poolTitle from "./assets/projects/pool-title.webp";
import poolHow from "./assets/projects/pool-how.webp";
import poolWiring from "./assets/projects/pool-wiring.webp";
import poolDriver from "./assets/projects/pool-driver.webp";


/**
 * Portfolio
 * A single-page developer portfolio.
 * Sections: Nav, Hero, Production projects, Tech stack,
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

/** Intro for the production work section. */
const WORK_INTRO =
  "Software and hardware that real businesses and people use every day. Click any project to open it.";

/**
 * Production projects only: each one is live and used by a real client.
 * Every project links to its live site (or, for hardware, its build guide);
 * screenshots are of the real product.
 */
const PROJECTS = [
  {
    name: "Spears Resilience Systems website",
    kind: "Company website · Spears Resilience Systems",
    desc: "Responsive marketing site for the company's guarding, alarm, CCTV, canine and VIP protection services, built to turn visitors into quote requests by phone, WhatsApp or the contact form.",
    highlights: [
      "Explains GPS-verified guarding and the live tracker to prospective clients",
      "Free site assessment, call and WhatsApp calls to action on every screen",
      "Fast, mobile-first build deployed on Vercel with a custom domain",
    ],
    tech: ["React", "JavaScript", "CSS", "Vercel"],
    live: "https://www.spearsresiliencesystems.com",
    github: "https://github.com/Zomby010/Resilience",
    ratio: "1366 / 585",
    shots: [
      { src: spearsSiteHero, alt: "Spears Resilience Systems home page hero: Protecting what matters" },
      { src: spearsSiteServices, alt: "Services section of the Spears Resilience Systems website" },
      { src: spearsSiteTracker, alt: "Website section showing GPS-verified guards and the live tracker" },
      { src: spearsSiteClients, alt: "Who we protect section of the Spears Resilience Systems website" },
    ],
  },
  {
    name: "Resilience Business Management System",
    kind: "Business management system · Spears Resilience Systems",
    desc: "The web platform the company runs on, replacing paper records with one secure system for the Director, Manager, Accountant, Secretary, Supervisors and Guards, plus a portal for clients.",
    highlights: [
      "GPS attendance: guards sign in on site and the Manager sees everyone on a live map",
      "Invoices, receipts, statements, payroll, supplier bills and month-end close",
      "Role-based home pages, approvals, incidents, digital occurrence book and a client portal",
    ],
    tech: ["Python", "Django", "PostgreSQL", "Vercel"],
    live: "https://bms.spearsresiliencesystems.com",
    github: null, // private client repository
    ratio: "16 / 9",
    shots: [
      { src: bmsTodo, alt: "Manager's home page in the business management system listing things that need approval" },
      { src: bmsManagerMobile, alt: "The Manager's phone view of the business management system" },
      { src: bmsSuppliers, alt: "Supplier bills page in the business management system" },
      { src: bmsClientPortal, alt: "Client portal on a phone, showing feedback and the company's answers" },
    ],
  },
  {
    name: "Shop POS",
    kind: "Point of sale · Minimart",
    desc: "A point of sale for a Kenyan minimart that runs on the shop laptop with no internet, with an online copy for checking sales and reports from anywhere.",
    highlights: [
      "Barcode scanning plus quick-sale buttons for loose goods sold by the kg or litre",
      "Cash, M-Pesa, split and deni (credit) payments with thermal receipt printing",
      "Stock, suppliers, stock takes, expenses, daily profit reports and automatic backups",
    ],
    tech: ["Python", "Django", "PostgreSQL", "HTMX", "Vercel"],
    live: "https://shop-pos-pi.vercel.app",
    github: null, // private client repository
    ratio: "16 / 9",
    shots: [
      { src: posSell, alt: "Shop POS sell screen with items in the cart and quick-sale buttons" },
      { src: posPayment, alt: "Shop POS payment dialog with cash, M-Pesa, split and deni options" },
      { src: posReceipt, alt: "Shop POS sale complete page showing the printed receipt" },
      { src: posProducts, alt: "Shop POS product list with prices, stock levels and low-stock badge" },
    ],
  },
  {
    name: "MindMate",
    kind: "Wellbeing web app",
    desc: "A calm, private web app for looking after your mental wellbeing: daily mood check-ins, evidence-based self-help tools, and an AI companion designed around safety first.",
    highlights: [
      "Mood check-ins with trends, plus breathing, mindfulness, movement, sleep and planning tools",
      "AI companion with crisis detection on the server before the AI is called",
      "Region-aware crisis lines on every screen, data export and full account deletion",
    ],
    tech: ["React", "Vite", "Node.js", "Express", "Firebase"],
    live: "https://chat-five-drab-88.vercel.app",
    github: "https://github.com/Zomby010/Chat",
    ratio: "16 / 9",
    shots: [
      { src: mindmateHome, alt: "MindMate landing page: A calm place to look after your mind" },
      { src: mindmateFeatures, alt: "MindMate features: check-ins, AI companion, breathing, movement, sleep and plans" },
      { src: mindmateSupport, alt: "MindMate support page with crisis lines for the visitor's country" },
    ],
  },
  {
    name: "Pay-to-Unlock Pool Gate",
    kind: "Hardware · IoT payment lock",
    desc: "Lets a pool table run pay-per-game with no staff present: an M-Pesa payment of exactly KSh 20 unlocks the solenoid lock, which re-locks itself a few seconds later.",
    highlights: [
      "ESP32 reads M-Pesa confirmation SMS from a SIM900 GSM module over UART",
      "Validates the exact amount and sender, and ignores repeated messages",
      "Drives a 12 V solenoid through a relay or MOSFET, with wiring and a printed build guide",
    ],
    tech: ["ESP32", "C++", "Arduino", "SIM900 GSM", "M-Pesa"],
    live: "/docs/pay-to-unlock-pool-gate-build-guide.pdf",
    linkLabel: "Build guide",
    github: null,
    sourceNote: "Hardware project",
    ratio: "16 / 9",
    shots: [
      { src: poolTitle, alt: "Pay-to-Unlock Pool Gate build guide cover" },
      { src: poolHow, alt: "How the pool gate works: customer pays, SIM900, ESP32, relay, solenoid" },
      { src: poolWiring, alt: "Wiring diagram for the ESP32, SIM900, buck converter, relay and solenoid" },
      { src: poolDriver, alt: "Solenoid driver wiring with relay and MOSFET options" },
    ],
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
      { name: "Django", icon: siDjango },
      { name: "Flask", icon: siFlask },
      { name: "PostgreSQL", icon: siPostgresql },
      { name: "Firebase", icon: siFirebase },
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
      { name: "Arduino / ESP32", icon: siArduino },
    ],
  },
];

const EXPERIENCE = [
  {
    role: "Full-Stack Developer (freelance)",
    org: "Spears Resilience Systems",
    period: "2026",
    points: [
      "Built and deployed the company website (spearsresiliencesystems.com).",
      "Built the Django business management system the whole company runs on, from GPS attendance to payroll and invoicing.",
    ],
  },
  {
    role: "Full-Stack Developer (freelance)",
    org: "Retail and small business clients",
    period: "2026",
    points: [
      "Built and deployed Shop POS, an offline-first point of sale for a minimart.",
      "Designed and built an M-Pesa pay-to-unlock lock for a pool table on ESP32.",
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

/** One production project: a clickable screenshot gallery plus details. */
function ProjectShowcase({ project, flipped }) {
  const [active, setActive] = useState(0);
  const shot = project.shots[active];
  const isExternal = /^https?:\/\//.test(project.live);
  const host = isExternal
    ? project.live.replace(/^https?:\/\//, "")
    : `${project.linkLabel ?? "Live site"} (PDF)`;
  const linkLabel = project.linkLabel ?? "Live site";

  return (
    <Reveal
      as="article"
      className={`showcase ${flipped ? "showcase--flipped" : ""}`.trim()}
    >
      <div className="showcase__media">
        <a
          href={project.live}
          target="_blank"
          rel="noreferrer"
          className="browser"
          aria-label={`Open ${project.name}: ${linkLabel.toLowerCase()} (${host})`}
        >
          <div className="browser__bar" aria-hidden="true">
            <span />
            <span />
            <span />
            <em>{host}</em>
          </div>
          <div className="browser__body" style={{ aspectRatio: project.ratio }}>
            <img
              src={shot.src}
              alt={shot.alt}
              loading="lazy"
              decoding="async"
            />
            <span className="browser__cta" aria-hidden="true">
              {isExternal ? "Visit live site" : `Open ${linkLabel.toLowerCase()}`} <ArrowIcon />
            </span>
          </div>
        </a>

        {project.shots.length > 1 && (
          <div className="thumbs" role="group" aria-label={`${project.name} screenshots`}>
            {project.shots.map((s, i) => (
              <button
                key={s.src}
                type="button"
                className={`thumb ${i === active ? "thumb--active" : ""}`.trim()}
                onClick={() => setActive(i)}
                aria-label={`Show screenshot ${i + 1}: ${s.alt}`}
                aria-pressed={i === active}
              >
                <img src={s.src} alt="" loading="lazy" decoding="async" />
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="showcase__body">
        <p className="showcase__kind">{project.kind}</p>
        <h3 className="showcase__title">
          <a href={project.live} target="_blank" rel="noreferrer">
            {project.name}
          </a>
        </h3>
        <p className="showcase__desc">{project.desc}</p>
        <ul className="showcase__points">
          {project.highlights.map((point) => (
            <li key={point}>{point}</li>
          ))}
        </ul>
        <TechList tech={project.tech} />
        <div className="card-links">
          <a href={project.live} target="_blank" rel="noreferrer" className="link">
            {linkLabel} <ArrowIcon />
          </a>
          {project.github ? (
            <a
              href={project.github}
              target="_blank"
              rel="noreferrer"
              className="link link--muted"
            >
              Source <ArrowIcon />
            </a>
          ) : (
            <span className="link link--muted link--static">
              {project.sourceNote ?? "Private client code"}
            </span>
          )}
        </div>
      </div>
    </Reveal>
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

        {/* ================= PRODUCTION WORK ================= */}
        <section id="work" className="section">
          <div className="container">
            <SectionHeading eyebrow="Production work" title="Projects in real use">
              {WORK_INTRO}
            </SectionHeading>

            <div className="showcases">
              {PROJECTS.map((project, index) => (
                <ProjectShowcase
                  key={project.name}
                  project={project}
                  flipped={index % 2 === 1}
                />
              ))}
            </div>
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
