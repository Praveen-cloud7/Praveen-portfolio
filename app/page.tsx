"use client";

import { useEffect, useRef, useState } from "react";

const words = ["Liquidity", "Risk", "Markets", "Growth"];

const capabilities = [
  { number: "01", title: "Treasury & Liquidity", text: "Monitoring funding positions, P&L, currency exposure and risk metrics to support disciplined treasury decisions.", tags: ["Liquidity risk", "FX exposure", "P&L monitoring"] },
  { number: "02", title: "Financial Analysis", text: "Turning commercial and financial records into useful forecasts, valuation inputs and decision-ready insights.", tags: ["Forecasting", "Corporate valuation", "Reconciliation"] },
  { number: "03", title: "Risk & Controls", text: "A practical grounding in SOC 1 & 2, ITGC, ITAC and control thinking across finance and technology workflows.", tags: ["SOC 1 & 2", "ITGC & ITAC", "Risk controls"] },
  { number: "04", title: "Business Intelligence", text: "Structured analysis and visualization using Excel, VBA, Python, Power BI and Tableau for clearer business reporting.", tags: ["Excel + VBA", "Python", "Power BI + Tableau"] },
];

function Arrow({ diagonal = false }: { diagonal?: boolean }) {
  return <span aria-hidden="true">{diagonal ? "↗" : "→"}</span>;
}

export default function Home() {
  const [wordIndex, setWordIndex] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const heroRef = useRef<HTMLElement>(null);
  const pointerFrameRef = useRef<number | null>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const timer = window.setInterval(() => setWordIndex((current) => (current + 1) % words.length), 2200);
    return () => window.clearInterval(timer);
  }, []);

  useEffect(() => {
    const reveal = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        reveal.unobserve(entry.target);
      });
    }, { threshold: 0.08, rootMargin: "0px 0px -7% 0px" });
    document.querySelectorAll("[data-reveal]").forEach((element) => reveal.observe(element));
    return () => reveal.disconnect();
  }, []);

  useEffect(() => () => {
    if (pointerFrameRef.current !== null) window.cancelAnimationFrame(pointerFrameRef.current);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    if (menuOpen) closeButtonRef.current?.focus();
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  const closeMenu = () => {
    setMenuOpen(false);
    window.setTimeout(() => menuButtonRef.current?.focus(), 40);
  };

  return (
    <main>
      <section className="hero" id="top" ref={heroRef}
        onPointerMove={(event) => {
          const rect = heroRef.current?.getBoundingClientRect();
          if (!rect) return;
          const x = ((event.clientX - rect.left) / rect.width) * 100;
          const y = ((event.clientY - rect.top) / rect.height) * 100;
          if (pointerFrameRef.current !== null) window.cancelAnimationFrame(pointerFrameRef.current);
          pointerFrameRef.current = window.requestAnimationFrame(() => {
            heroRef.current?.style.setProperty("--mx", `${x}%`);
            heroRef.current?.style.setProperty("--my", `${y}%`);
          });
        }}
        onPointerLeave={() => {
          heroRef.current?.style.setProperty("--mx", "58%");
          heroRef.current?.style.setProperty("--my", "54%");
        }}>
        <div className="noise" />
        <header className="site-header">
          <a className="brand" href="#top" aria-label="Praveen Babu home">Praveen Babu <sup>®</sup></a>
          <button ref={menuButtonRef} className="menu-button" onClick={() => setMenuOpen(true)} aria-label="Open menu" aria-expanded={menuOpen}><span />menu<span /></button>
        </header>
        <div className="hero-copy">
          <div className="hero-line hero-line-one">Finance</div>
          <div className="hero-line hero-line-two">
            <span className="muted">for</span>
            <span className="word-window" aria-live="polite"><span key={words[wordIndex]} className="rotating-word">{words[wordIndex]}</span></span>
          </div>
        </div>
        <div className="hero-meta"><p>Finance professional<br />Coimbatore, India</p><a href="#about">Scroll to explore <span>↓</span></a></div>
      </section>

      <div className={`menu-overlay ${menuOpen ? "is-open" : ""}`} aria-hidden={!menuOpen} role="dialog" aria-modal="true" aria-label="Site navigation">
        <div className="menu-top"><span>Praveen Babu</span><button ref={closeButtonRef} onClick={closeMenu} aria-label="Close menu" tabIndex={menuOpen ? 0 : -1}>close ×</button></div>
        <nav>
          {[["01", "About", "#about"], ["02", "Experience", "#experience"], ["03", "Project", "#project"], ["04", "Capabilities", "#capabilities"], ["05", "Contact", "#contact"]].map(([number, label, href]) => (
            <a key={href} href={href} onClick={closeMenu} tabIndex={menuOpen ? 0 : -1}><small>{number}</small>{label}<Arrow diagonal /></a>
          ))}
        </nav>
      </div>

      <section className="intro section-pad" id="about">
        <p className="eyebrow" data-reveal>01 / Profile</p>
        <p className="statement" data-reveal>I connect <span>financial detail</span> with commercial context—building reliable analysis, clear reporting and the risk awareness needed for better treasury decisions.</p>
        <div className="intro-grid">
          <div className="orbit-link" data-reveal><a href="mailto:praveenbabu5346@gmail.com"><span>Let&apos;s talk</span><Arrow diagonal /></a></div>
          <p data-reveal>MBA Finance professional with hands-on experience in AP/AR reconciliation, SAP HANA, commercial account management and revenue analysis. Now focused on Treasury and Liquidity Risk Management, with a keen interest in funding risk, currency exposure and controls.</p>
        </div>
      </section>

      <section className="metrics section-pad" aria-label="Career highlights">
        {[["500+", "B2B accounts supported"], ["10%", "Cost visibility improvement"], ["5 yrs", "Daily market data analyzed"]].map(([value, label]) => (
          <div className="metric" key={label} data-reveal><strong>{value}</strong><span>{label}</span></div>
        ))}
      </section>

      <section className="experience section-pad" id="experience">
        <div className="section-heading" data-reveal><p className="eyebrow">02 / Experience</p><h2>Commercial perspective.<br /><span>Financial discipline.</span></h2></div>
        <div className="timeline">
          <article data-reveal>
            <div className="timeline-date">May 2026 — Present</div>
            <div className="timeline-role"><p>Jeevan Infotech India Private Limited</p><h3>Business Growth Executive</h3></div>
            <div className="timeline-copy"><p>Managed financial and commercial records for a 500+ account B2B portfolio, coordinating client follow-ups and payment resolution.</p><p>Analyzed client and market data for revenue forecasting, pricing, sales planning and revenue opportunity identification.</p></div>
          </article>
          <article data-reveal>
            <div className="timeline-date">May 2025 — July 2025</div>
            <div className="timeline-role"><p>ELGI Rubber Company Ltd, Coimbatore</p><h3>Finance Intern</h3></div>
            <div className="timeline-copy"><p>Handled AP/AR, invoice and GST/credit memo reconciliation in SAP HANA, supporting accurate subledger and compliance reporting.</p><p>Processed HDFC Bank fund transfers and built Excel/Power BI reports that improved cost optimization visibility by 10%.</p></div>
          </article>
        </div>
      </section>

      <section className="project-section" id="project">
        <div className="section-pad project-intro" data-reveal><p className="eyebrow">03 / Featured research</p><h2>Foreign exchange<br />& Indian markets</h2><p>Five years of daily data, tested for long-run relationships and short-run causality.</p></div>
        <article className="project-card section-pad" data-reveal>
          <div className="project-visual">
            <img className="market-art" src="/finance-market-ribbons.png" alt="Abstract foreign exchange and market data visualization" />
            <div className="chart-top"><span>FX / INDEX RELATIONSHIP</span><span>2020—2024</span></div>
            <svg viewBox="0 0 900 480" role="img" aria-label="Abstract chart representing foreign exchange and stock index analysis">
              <defs><linearGradient id="lineA" x1="0" x2="1"><stop stopColor="#ff5a3d"/><stop offset="1" stopColor="#ff2da4"/></linearGradient><linearGradient id="lineB" x1="0" x2="1"><stop stopColor="#ffe65b"/><stop offset="1" stopColor="#ff6b2d"/></linearGradient></defs>
              {Array.from({ length: 9 }).map((_, index) => <line key={`h${index}`} x1="0" x2="900" y1={index * 60} y2={index * 60} className="grid-line" />)}
              {Array.from({ length: 16 }).map((_, index) => <line key={`v${index}`} y1="0" y2="480" x1={index * 60} x2={index * 60} className="grid-line" />)}
              <path pathLength="1" d="M0 354 C92 345 120 271 194 294 S323 395 404 282 S526 194 584 235 S711 321 900 92" className="data-line line-a" />
              <path pathLength="1" d="M0 305 C120 255 170 366 265 321 S390 156 472 221 S608 366 690 244 S805 165 900 192" className="data-line line-b" />
              <circle cx="900" cy="92" r="7" fill="#ff2da4"/><circle cx="900" cy="192" r="7" fill="#ffe65b"/>
            </svg>
            <div className="chart-legend"><span><i className="pink" />USD/INR</span><span><i className="yellow" />Market indices</span></div>
          </div>
          <div className="project-details">
            <p className="project-type">MBA Final Year Research / Excel + EViews</p>
            <h3>Impact of Foreign Exchange Rate Fluctuation on the Indian Stock Market</h3>
            <p>Analyzed USD/INR, EUR/INR, GBP/INR and JPY/INR against Nifty 50 and BSE Sensex using ADF, Johansen Cointegration and Granger Causality tests.</p>
            <div className="finding"><span>Key finding</span><p>A significant long-run relationship exists between USD/INR and Indian stock indices, with no significant short-run causality found.</p></div>
          </div>
        </article>
      </section>

      <section className="capabilities section-pad" id="capabilities">
        <div className="section-heading compact" data-reveal><p className="eyebrow">04 / Capabilities</p><h2>Built for informed<br /><span>financial decisions.</span></h2></div>
        <div className="capability-list">
          {capabilities.map((item) => (
            <article key={item.number} data-reveal><span className="cap-number">{item.number}</span><h3>{item.title}</h3><div className="cap-copy"><p>{item.text}</p><div>{item.tags.map((tag) => <span key={tag}># {tag}</span>)}</div></div><span className="cap-arrow">↘</span></article>
          ))}
        </div>
      </section>

      <section className="credentials section-pad">
        <div className="credential-column" data-reveal><p className="eyebrow">05 / Education</p><article><span>2024—2026</span><h3>MBA in Finance</h3><p>PSG Institute of Management · Anna University</p><strong>7.3 CGPA</strong></article><article><span>2021—2024</span><h3>B.Com in Retail Marketing</h3><p>PSG College of Arts and Science · Bharathiar University</p><strong>7.5 CGPA</strong></article></div>
        <div className="credential-column" data-reveal><p className="eyebrow">06 / Certifications</p><article><span>Valid to 2030</span><h3>Risk Job Simulation</h3><p>Goldman Sachs</p></article><article><span>Valid to 2028</span><h3>Equity Derivatives</h3><p>NISM</p></article></div>
      </section>

      <section className="more section-pad">
        <div className="more-block" data-reveal><p className="eyebrow">Learning</p><div className="pill-cloud">{["Risk & Finance — MIT / Columbia", "Risk Management — Coursera", "IT Audit — Udemy", "Business Intelligence — Coursera", "Learning GitHub — LinkedIn"].map(item => <span key={item}>{item}</span>)}</div></div>
        <div className="more-block highlight" data-reveal><p className="eyebrow">Achievement</p><h3>4th prize · AIMA Business Simulation</h3><p>National business simulation competition organized by the All India Management Association.</p></div>
        <div className="more-block" data-reveal><p className="eyebrow">Beyond finance</p><p>Interview Committee member at IMPACT 60. Community awareness collaboration with People4Good and ITC.</p><div className="micro-list"><span>Kannada</span><span>English</span><span>Tamil</span><span>Football</span><span>Badminton</span><span>Fitness</span></div></div>
      </section>

      <footer id="contact">
        <div className="footer-glow" />
        <div className="footer-top section-pad" data-reveal><p>Open to Treasury / Liquidity Risk opportunities</p><h2>Let&apos;s turn financial<br />data into <span>direction.</span></h2><a className="contact-button" href="mailto:praveenbabu5346@gmail.com">Start a conversation <Arrow diagonal /></a></div>
        <div className="footer-bottom"><div><strong>Praveen Babu S</strong><span>Finance Professional</span></div><div className="footer-links"><a href="mailto:praveenbabu5346@gmail.com">Email <Arrow diagonal /></a><a href="tel:+919344631774">Phone <Arrow diagonal /></a><a href="https://www.linkedin.com/in/praveenbabu-siddhappan" target="_blank" rel="noreferrer">LinkedIn <Arrow diagonal /></a></div><p>© 2026 Praveen Babu S</p></div>
      </footer>
    </main>
  );
}
