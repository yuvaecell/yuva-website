import { useEffect, useMemo, useRef } from 'react'
import { useLocation } from 'react-router-dom'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import {
  Search, FlaskConical, BarChart3, Users, Coins,
  Briefcase, LineChart, Sparkles, ShieldCheck, Presentation,
} from 'lucide-react'
import buildingPhoto from '../../assets/photos/buildings.png'
import photoThinkspace from '../../assets/photos/thinkspace.png'
import photoYuvaRoom from '../../assets/photos/yuvaroom.png'
import yuvaIcon from '../../assets/logos/yuva-icon-only.png'
import logoAmex from '../../assets/logos/projects/AMEX.png'
import logoPepsico from '../../assets/logos/projects/PEPSICO.png'
import logoItc from '../../assets/logos/projects/ITC.png'
import logoSuprajit from '../../assets/logos/projects/SUPRAJIT.png'
import logoIndigo from '../../assets/logos/projects/INDIGO.png'
import logoMccain from '../../assets/logos/projects/MCCAIN.png'
import logoPeesafe from '../../assets/logos/projects/PEESAFE.png'
import pastHyatt from '../../assets/logos/partners/HYATT.png'
import pastIndiaAccelerator from '../../assets/logos/partners/INDIANACCELERATOR.png'
import pastIndianAngel from '../../assets/logos/partners/INDIANANGELINVESTOR.png'
import pastNdtv from '../../assets/logos/partners/NDTV.png'
import pastGoev from '../../assets/logos/partners/GOEV.png'
import pastCocaCola from '../../assets/logos/partners/COCACOLA.png'
import pastLufthansa from '../../assets/logos/partners/LUFTHANSA.png'
import pastCornitos from '../../assets/logos/partners/CORNITOS.png'
import pastZomato from '../../assets/logos/partners/ZOMATO.png'
import pastPaytm from '../../assets/logos/partners/PAYTM.png'
import pastCnbc from '../../assets/logos/partners/CNBC.png'
import pastNus from '../../assets/logos/partners/NUS.png'
import './WhatWeDo.css'

gsap.registerPlugin(ScrollTrigger)

// ─── Feature flag ────────────────────────────────────────────────
// Set to false to disable pinned scroll-jacking and fall back to a
// plain fade-up reveal stack — useful if you see jank on a device.
const ENABLE_SCROLL_PIN = true

// ─── Static data ─────────────────────────────────────────────────

// Center (290,290), radius 185, SVG viewBox 0 0 580 580
// Angle = -π/2 + i*(2π/5)
const SATELLITES = [
  { svgX: 290, svgY: 105, cssLeft: '50.0%', cssTop: '18.1%' },
  { svgX: 466, svgY: 233, cssLeft: '80.3%', cssTop: '40.2%' },
  { svgX: 399, svgY: 440, cssLeft: '68.8%', cssTop: '75.9%' },
  { svgX: 181, svgY: 440, cssLeft: '31.2%', cssTop: '75.9%' },
  { svgX: 114, svgY: 233, cssLeft: '19.7%', cssTop: '40.2%' },
]

const services = [
  {
    Icon: Search,
    title: 'Market Research & Consulting Services',
    desc: 'We specialize in detailed market research to uncover untapped opportunities and craft tailored strategies, bringing a fresh, Gen Z-powered perspective to the table.',
  },
  {
    Icon: FlaskConical,
    title: 'GTM Strategy – Expansion to New Markets',
    desc: "Whether it's launching new products or entering international territories, we craft tailored, data-driven strategies backed by in-depth market analysis.",
  },
  {
    Icon: BarChart3,
    title: 'Financial Analysis & Profit Maximization',
    desc: "We analyze your financial data, cost structures, and revenue streams to optimize profitability and strengthen your business's financial health.",
  },
  {
    Icon: Users,
    title: 'Investor Outreach & Deck Making',
    desc: 'We design compelling investor decks and facilitate connections with a network of 100+ angel investors and VC funds.',
  },
  {
    Icon: Coins,
    title: 'Due Diligence Services & Feasibility Analysis',
    desc: 'We perform comprehensive business assessments to evaluate commercial viability, identify risks, and provide strategic insights.',
  },
]

const competencies = [
  { Icon: Briefcase,    label: 'Live Project & Consultancy' },
  { Icon: Search,       label: 'Market Research' },
  { Icon: LineChart,    label: 'Data Driven Analysis' },
  { Icon: Sparkles,     label: 'Gen-Z Perspective' },
  { Icon: ShieldCheck,  label: 'Due Diligence Services' },
  { Icon: Presentation, label: 'Deck Designing' },
]

const currentProjects = [
  {
    logo: logoAmex,
    alt: 'American Express',
    title: 'Driving Long-Term Growth Strategy for American Express',
    desc: 'Yuva partnered with Amex GBT to counter price-driven competition and shrinking supply-side revenue. The team benchmarked pricing across 6+ platforms, evaluated 3 revenue models, and assessed AI-automation potential — shaping 10+ recommendations projected to improve enterprise retention by 14%.',
    link: 'https://drive.google.com/file/d/1Il_dBUrvVTWyGWZIb7fN0oyI9i-RHe7M/view',
    linkLabel: 'View sample deliverable →',
  },
  {
    logo: logoPepsico,
    alt: 'PepsiCo',
    title: "Elevating Youth Engagement for PepsiCo's Mountain Dew",
    desc: "Yuva collaborated with PepsiCo India to strengthen Mountain Dew's appeal among Gen Z consumers. The team benchmarked 10+ competing brands and mapped engagement gaps, shaping 2 integrated campaign platforms projected to increase youth engagement by 15%.",
  },
  {
    logo: logoItc,
    alt: 'ITC',
    title: 'Strengthening Premium Positioning for ITC Aashirvaad Ghee',
    desc: "Yuva partnered with ITC Limited to strengthen Aashirvaad Ghee's premium positioning through focused market research. The team surveyed 200+ consumers and identified 5+ strategic growth opportunities, culminating in a premiumisation roadmap.",
  },
  {
    logo: logoSuprajit,
    alt: 'Suprajit Engineering',
    title: 'Driving Market Expansion for Suprajit Engineering',
    desc: "The team analyzed India's automotive cable market amid rising EV demand — benchmarking 200+ cities and 8+ competing suppliers, resulting in 10 strategic recommendations and identifying a ₹400 Cr Serviceable Obtainable Market.",
  },
]

const pastBrands = [
  { name: 'IndiGo',                logo: logoIndigo },
  { name: 'McCain Foods India',    logo: logoMccain },
  { name: 'PeeSafe',               logo: logoPeesafe },
  { name: 'Hyatt',                 logo: pastHyatt },
  { name: 'India Accelerator',     logo: pastIndiaAccelerator },
  { name: 'Indian Angel Network',  logo: pastIndianAngel },
  { name: 'NDTV',                  logo: pastNdtv },
  { name: 'GoEV Mobility',         logo: pastGoev },
  { name: 'Coca-Cola',             logo: pastCocaCola },
  { name: 'Lufthansa',             logo: pastLufthansa },
  { name: 'Cornitos',              logo: pastCornitos },
  { name: 'Zomato',                logo: pastZomato },
  { name: 'Paytm',                 logo: pastPaytm },
  { name: 'CNBC',                  logo: pastCnbc },
  { name: 'NUS',                   logo: pastNus },
]

// ─── Hooks ───────────────────────────────────────────────────────

function useFadeUp() {
  const ref = useRef(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) { el.classList.add('visible'); return }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) { el.classList.add('visible'); observer.disconnect() }
      },
      { threshold: 0.12 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])
  return ref
}

function useOrbitReveal() {
  const wrapRef = useRef(null)
  const centerRef = useRef(null)
  const nodeRefsArr = useRef([])

  useEffect(() => {
    const wrap = wrapRef.current
    const center = centerRef.current
    if (!wrap || !center) return
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) {
      center.classList.add('orbit-visible')
      nodeRefsArr.current.forEach(n => n && n.classList.add('orbit-visible'))
      return
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return
        center.classList.add('orbit-visible')
        nodeRefsArr.current.forEach((n, i) => {
          setTimeout(() => n && n.classList.add('orbit-visible'), 150 + i * 100)
        })
        observer.disconnect()
      },
      { threshold: 0.2 }
    )
    observer.observe(wrap)
    return () => observer.disconnect()
  }, [])

  return { wrapRef, centerRef, nodeRefsArr }
}

// ─── Component ───────────────────────────────────────────────────

export default function WhatWeDo() {
  const { wrapRef, centerRef, nodeRefsArr } = useOrbitReveal()
  const location = useLocation()

  const servicesRef    = useFadeUp()
  const compHeaderRef  = useFadeUp()
  const thinkspaceRef  = useFadeUp()
  const pastHeaderRef  = useFadeUp()
  const ctaRef         = useFadeUp()

  // Scroll to anchored section when navigating with a hash
  useEffect(() => {
    if (!location.hash) return
    const id = location.hash.slice(1)
    requestAnimationFrame(() => {
      const el = document.getElementById(id)
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    })
  }, [location.hash])

  // GSAP pinned-scroll refs
  const pinOuterRef  = useRef(null)
  const slideRefs    = useRef([])
  const logoRefs     = useRef([])
  const dotRefs      = useRef([])
  const fallbackRefs = useRef([])

  // photo bg inline style (Vite resolves the import to the hashed URL)
  const bgStyle = { backgroundImage: `url(${buildingPhoto})` }

  // ── Pinned scroll setup ─────────────────────────────────────────
  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (!ENABLE_SCROLL_PIN || prefersReduced) {
      // Fallback: simple IntersectionObserver fade-up on each card
      const observers = []
      fallbackRefs.current.forEach(el => {
        if (!el) return
        if (prefersReduced) { el.classList.add('visible'); return }
        const obs = new IntersectionObserver(
          ([entry]) => { if (entry.isIntersecting) { el.classList.add('visible'); obs.disconnect() } },
          { threshold: 0.1 }
        )
        obs.observe(el)
        observers.push(obs)
      })
      return () => observers.forEach(o => o.disconnect())
    }

    const pinOuter = pinOuterRef.current
    const slides   = slideRefs.current.filter(Boolean)
    const logos    = logoRefs.current.filter(Boolean)
    const dots     = dotRefs.current.filter(Boolean)
    if (!pinOuter || slides.length < 2) return

    // Stack all slides; only the first is visible initially
    slides.forEach((slide, i) => {
      gsap.set(slide, {
        position: 'absolute',
        inset: 0,
        opacity: i === 0 ? 1 : 0,
        y: i === 0 ? 0 : 32,
      })
    })

    // Logo entrance initial states
    logos.forEach((logo, i) => {
      gsap.set(logo, { scale: i === 0 ? 1 : 0.88, opacity: i === 0 ? 1 : 0 })
    })

    // Progress dot initial states — first dot active
    dots.forEach((dot, i) => {
      gsap.set(dot, {
        backgroundColor: i === 0 ? '#1D5B96' : '#6B7684',
        opacity: i === 0 ? 1 : 0.3,
      })
    })

    // Build a sequential crossfade timeline
    const tl = gsap.timeline()
    slides.forEach((slide, i) => {
      if (i === 0) return
      // Fade out previous slide + logo, deactivate its dot
      tl.to(slides[i - 1], { opacity: 0, y: -24, duration: 0.4, ease: 'power2.inOut' })
      if (logos[i - 1]) tl.to(logos[i - 1], { scale: 0.88, opacity: 0, duration: 0.3, ease: 'power2.in' }, '<')
      if (dots[i - 1])  tl.to(dots[i - 1],  { backgroundColor: '#6B7684', opacity: 0.3, duration: 0.2 }, '<')
      // Fade in current slide + logo, activate its dot
      tl.to(slide, { opacity: 1, y: 0, duration: 0.4, ease: 'power2.inOut' }, '<0.05')
      if (logos[i]) tl.to(logos[i], { scale: 1, opacity: 1, duration: 0.4, ease: 'power2.out' }, '<0.1')
      if (dots[i])  tl.to(dots[i],  { backgroundColor: '#1D5B96', opacity: 1, duration: 0.2 }, '<0.1')
    })

    // Pin while scrolling through the timeline; 1.6 vh per project gives comfortable pacing
    const st = ScrollTrigger.create({
      trigger: pinOuter,
      pin:     true,
      start:   'top top',
      end:     `+=${window.innerHeight * (slides.length - 1) * 1.6}`,
      scrub:   0.9,
      animation: tl,
      anticipatePin: 1,
    })

    return () => {
      st.kill()
      gsap.killTweensOf(slides)
      gsap.killTweensOf(logos)
      gsap.killTweensOf(dots)
      slides.forEach(s => gsap.set(s, { clearProps: 'all' }))
      logos.forEach(l => gsap.set(l, { clearProps: 'all' }))
      dots.forEach(d => gsap.set(d, { clearProps: 'all' }))
    }
  }, [])

  // Computed once on mount — stable across re-renders
  const isPinned = useMemo(() => (
    typeof window !== 'undefined' &&
    ENABLE_SCROLL_PIN &&
    !window.matchMedia('(prefers-reduced-motion: reduce)').matches
  ), [])

  return (
    <div className="wwd-page">

      {/* ── 1. PAGE HEADER — building bg ──────────────────────── */}
      <section className="wwd-header bg-buildings" style={bgStyle}>
        <div className="container">
          <span className="eyebrow">What We Do</span>
          <h1 className="wwd-header__heading">How we build founders</h1>
          <p className="wwd-header__sub">
            From flagship events to real consulting work — here's the full picture.
          </p>
        </div>
      </section>

      {/* ── 2. OUR SERVICES — plain white, enlarged orbit ─────── */}
      <section className="wwd-section wwd-services">
        <div className="container">
          <div className="fade-up" ref={servicesRef}>
            <span className="eyebrow">Our Services</span>
            <h2 className="wwd-section__heading">What Y-Accel does</h2>
          </div>
          <div className="wwd-services__layout">

            {/* Radial orbit diagram */}
            <div className="orbit-diagram-wrap" ref={wrapRef} aria-hidden="true">
              <svg className="orbit-svg" viewBox="0 0 580 580">
                {SATELLITES.map((s, i) => (
                  <line
                    key={i}
                    x1="290" y1="290"
                    x2={s.svgX} y2={s.svgY}
                    stroke="rgba(29,91,150,0.18)"
                    strokeWidth="1.5"
                    strokeDasharray="5 5"
                  />
                ))}
              </svg>

              {/* Center hub — YUVA icon */}
              <div className="orbit-center" ref={centerRef}>
                <img src={yuvaIcon} alt="" className="orbit-center-icon" />
              </div>

              {/* Satellite nodes */}
              {services.map(({ Icon }, i) => (
                <div
                  key={i}
                  className="orbit-node"
                  style={{ left: SATELLITES[i].cssLeft, top: SATELLITES[i].cssTop }}
                  ref={el => { nodeRefsArr.current[i] = el }}
                >
                  <Icon className="orbit-node-icon" />
                  <span className="orbit-badge">{i + 1}</span>
                </div>
              ))}
            </div>

            {/* Service numbered list */}
            <ol className="orbit-list">
              {services.map(({ Icon, title, desc }, i) => (
                <li key={i} className="orbit-list-item">
                  <span className="orbit-list-num" aria-hidden="true">0{i + 1}</span>
                  <div className="orbit-list-content">
                    <div className="orbit-list-icon-mobile" aria-hidden="true">
                      <Icon size={16} />
                    </div>
                    <h3 className="orbit-list-title">{title}</h3>
                    <p className="orbit-list-desc">{desc}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* ── 3. CORE COMPETENCIES — building bg ────────────────── */}
      <section className="wwd-section wwd-competencies bg-buildings" style={bgStyle}>
        <div className="container">
          <div className="fade-up" ref={compHeaderRef}>
            <span className="eyebrow">Core Competencies</span>
            <h2 className="wwd-section__heading">What we bring to the table</h2>
          </div>
          <div className="comp-grid">
            {competencies.map(({ Icon, label }) => (
              <div key={label} className="comp-card">
                <div className="comp-icon">
                  <Icon size={22} aria-hidden="true" />
                </div>
                <span className="comp-label">{label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 4. PROJECTS 2025-26 — plain bg, GSAP pinned ──────── */}
      <section id="projects" className="wwd-section wwd-projects">
        <div className="container">
          <span className="eyebrow">Projects &amp; Engagements 2025-26</span>
          <h2 className="wwd-section__heading">Real work, real clients</h2>
        </div>

        {isPinned ? (
          /* ── Pinned slide sequence ──────────────────────────── */
          <div className="proj-pin-outer" ref={pinOuterRef}>
            {currentProjects.map(({ logo, alt, title, desc, link, linkLabel }, i) => (
              <div
                key={i}
                className="proj-slide"
                ref={el => { slideRefs.current[i] = el }}
              >
                <span className="proj-slide__bg-num" aria-hidden="true">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <div className="container proj-slide__inner">
                  <div className="proj-slide__left">
                    <div className="proj-logo-wrap">
                      <img
                        src={logo}
                        alt={alt}
                        className="proj-logo"
                        ref={el => { logoRefs.current[i] = el }}
                      />
                    </div>
                    <span className="proj-slide__counter">
                      {String(i + 1).padStart(2, '0')} / {String(currentProjects.length).padStart(2, '0')}
                    </span>
                  </div>
                  <div className="proj-slide__right">
                    <h3 className="proj-slide__title">{title}</h3>
                    <p className="proj-slide__desc">{desc}</p>
                    {link && (
                      <a
                        href={link}
                        className="proj-card__link"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {linkLabel}
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
            <div className="proj-progress" aria-hidden="true">
              {currentProjects.map((_, i) => (
                <div
                  key={i}
                  className="proj-progress__dot"
                  ref={el => { dotRefs.current[i] = el }}
                />
              ))}
            </div>
          </div>
        ) : (
          /* ── Fallback: vertical fade-up stack ──────────────── */
          <div className="container proj-fallback-stack">
            {currentProjects.map(({ logo, alt, title, desc, link, linkLabel }, i) => (
              <div
                key={i}
                className="proj-card fade-up"
                ref={el => { fallbackRefs.current[i] = el }}
              >
                <div className="proj-logo-wrap">
                  <img src={logo} alt={alt} className="proj-logo" />
                </div>
                <h3 className="proj-card__title">{title}</h3>
                <p className="proj-card__desc">{desc}</p>
                {link && (
                  <a
                    href={link}
                    className="proj-card__link"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {linkLabel}
                  </a>
                )}
              </div>
            ))}
          </div>
        )}
      </section>

      {/* ── 5. THINKSPACE — building bg ──────────────────────── */}
      <section id="thinkspace" className="wwd-section wwd-thinkspace bg-buildings" style={bgStyle}>
        <div className="container">
          <div className="fade-up" ref={thinkspaceRef}>
            <span className="eyebrow">Our Space</span>
            <h2 className="wwd-section__heading">ThinkSpace — Room 168</h2>
            <p className="wwd-thinkspace__sub">
              Room 168 — where Yuvaites gather, brainstorm, and build. A safe,
              fun space for every entrepreneurial mind on campus.
            </p>
          </div>
          <div className="wwd-thinkspace__photos">
            <img src={photoThinkspace} alt="ThinkSpace — Room 168" className="wwd-thinkspace__img" />
            <img src={photoYuvaRoom} alt="Yuva Room" className="wwd-thinkspace__img" />
          </div>
        </div>
      </section>

      {/* ── 6. PAST PROJECTS LOGO GRID — plain bg ────────────── */}
      <section className="wwd-section wwd-past">
        <div className="container">
          <div className="fade-up" ref={pastHeaderRef}>
            <span className="eyebrow">Past Projects &amp; Engagements</span>
            <h2 className="wwd-section__heading">A longer track record</h2>
          </div>
          <div className="past-grid">
            {pastBrands.map(({ name, logo }) => (
              <div key={name} className="past-logo-box">
                {logo ? (
                  <img src={logo} alt={name} className="past-logo-img" />
                ) : (
                  <span className="past-logo-placeholder">{name}</span>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 7. CLOSING CTA ───────────────────────────────────── */}
      <section className="wwd-cta">
        <div className="container">
          <div className="wwd-cta__inner fade-up" ref={ctaRef}>
            <h2 className="wwd-cta__heading">Want to work with us?</h2>
            <p className="wwd-cta__sub">
              Let's build something together — whether you're a brand, a startup, or an investor.
            </p>
            <a href="#site-footer" className="wwd-btn wwd-btn--primary">Get in touch</a>
          </div>
        </div>
      </section>

    </div>
  )
}
