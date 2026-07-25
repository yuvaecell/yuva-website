import { useRef, useEffect } from 'react'
import buildingPhoto from '../../assets/photos/buildings.png'

// Major achievement logos
import logoKansai      from '../../assets/logos/case-comps/KANSAI.png'
import logoIsb         from '../../assets/logos/case-comps/ISB.png'
import logoIimc        from '../../assets/logos/case-comps/IIMC.png'
import logoHsbc        from '../../assets/logos/case-comps/HSBC.png'
import logoEy          from '../../assets/logos/case-comps/EY.png'
import logoCornell     from '../../assets/logos/case-comps/CORNELL.png'
import logoMelbourne   from '../../assets/logos/case-comps/MELBOURNE.png'
import logoBain        from '../../assets/logos/case-comps/BAIN.png'
import logoHighbridge  from '../../assets/logos/case-comps/HIGHBRIDGE.png'

// "More competitions" logos
import logoAdg   from '../../assets/logos/case-comps/ADG.png'
import logoIima  from '../../assets/logos/case-comps/IIMA.png'
import logoIimb  from '../../assets/logos/case-comps/IIMB.png'
import logoIimi  from '../../assets/logos/case-comps/IIMI.png'
import logoIiml  from '../../assets/logos/case-comps/IIML.png'
import logoIitd  from '../../assets/logos/case-comps/IITD.png'
import logoIitm  from '../../assets/logos/case-comps/IITM.png'
import logoSrcc  from '../../assets/logos/case-comps/SRCC.png'

import './Achievements.css'

// ─── Fade-up hook (single element — matches site-wide pattern) ───
function useFadeUp() {
  const ref = useRef(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) { el.classList.add('visible'); return }
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { el.classList.add('visible'); obs.disconnect() } },
      { threshold: 0.12 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])
  return ref
}

// ─── Fade-up hook (multiple elements via ref callbacks) ─────────
function useFadeUpItems() {
  const itemRefs = useRef([])
  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const observers = []
    itemRefs.current.forEach(el => {
      if (!el) return
      if (prefersReduced) { el.classList.add('visible'); return }
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) { el.classList.add('visible'); obs.disconnect() } },
        { threshold: 0.1 }
      )
      obs.observe(el)
      observers.push(obs)
    })
    return () => observers.forEach(obs => obs.disconnect())
  }, [])
  return (i) => (el) => { itemRefs.current[i] = el }
}

// ─── Static data ─────────────────────────────────────────────────

const achievements = [
  {
    logo: logoKansai,
    alt: 'Kansai University / MEXT',
    title: 'MEXT Global Venture Makers Programme',
    badge: 'Global Rank 1',
    desc: 'Yuva members were awarded the prestigious MEXT Scholarship by the Japan Government to participate in the fully funded 15-day Global Entrepreneurship Program. The program brought together students from Japan and Australia for cross-cultural startup ecosystem immersion. During the programme, Yuva secured 1st place internationally, showing entrepreneurial excellence on the global stage.',
  },
  {
    logo: logoIsb,
    alt: 'ISB',
    title: 'Marketing Mayhem ADVAITA — ISB',
    badge: 'National Rank 1',
    desc: "Yuva members emerged as National Winners at Marketing Mayhem, the flagship marketing competition of ISB. One of India's largest case competitions, it brought together top MBA schools and premier institutions from across the country. Yuva members made history as the only undergraduate team to secure first place, demonstrating strategic thinking and marketing acumen.",
  },
  {
    logo: logoIimc,
    alt: 'IIM Calcutta',
    title: 'IIM Calcutta Startup Blitz',
    badge: 'National Rank 1',
    desc: "Yuva members emerged as National Champions at Startup Blitz, hosted by the Entrepreneurship Cell of IIM Calcutta. The competition brought together aspiring entrepreneurs from leading institutions across India to tackle real-world startup challenges, validate business ideas, and develop scalable ventures. Yuva's solution showcased innovation, entrepreneurial thinking, and strategic execution.",
  },
  {
    logo: logoHsbc,
    alt: 'HSBC',
    title: 'HSBC / HKU Asia Pacific Case Competition',
    badge: 'National Winners',
    desc: "We emerged as the National Winners at the prestigious HSBC/HKU Asia Pacific Business Case Competition, one of the world's largest undergraduate case competitions with 8,000+ participants. The victory earned the team the opportunity to represent India at the Global Finals in Hong Kong. The following year, we built on this success by once again qualifying for the National Finals.",
  },
  {
    logo: null, // Harvard logo not found — text placeholder used (flagged in summary)
    alt: 'Harvard University',
    title: 'Harvard Global Case Competition',
    badge: 'Global Rank 3',
    desc: "We ranked 3rd globally at the Harvard Global Case Competition, standing out as the only Indian team in the Top 3 and winning a $2,000 cash prize. Hosted by Harvard University, this is one of the world's most prestigious student-led case competitions, bringing together 250+ international teams to solve real-world challenges. The competition included institutions like Cambridge, NYU, and Wharton.",
  },
  {
    logo: logoEy,
    alt: 'EY',
    title: 'EY CAFTA Case Championship',
    badge: 'National Rank 2',
    desc: 'Yuva members secured National Rank 2 at the prestigious EY CAFTA Case Championship, competing against 2,500+ participants from leading institutions across India. Focused on finance, the competition tested strategic and analytical decision-making. The team\'s exceptional performance earned them internship opportunities with EY, recognizing excellence in problem-solving and leadership.',
  },
  {
    logo: logoCornell,
    alt: 'Cornell University',
    title: 'Cornell Corning EMI Case Competition',
    badge: 'Global Rank 4',
    desc: 'Yuva members secured Global Rank 4 at the prestigious Cornell Corning EMI Case Competition, hosted by Cornell University. Bringing together participants from 79 universities across 21 countries — including Oxford, Cambridge, the National University of Singapore, and Harvard — the competition challenged teams to solve real-world challenges through strategic analysis and data-driven decision-making.',
  },
  {
    logo: logoMelbourne,
    alt: 'University of Melbourne',
    title: 'Global Microfinance Case Competition',
    badge: 'Global Rank 8',
    desc: 'Yuva members secured Global Rank 8 at the prestigious Global Microfinance Case Competition, competing against over 1,000 participants from 48 universities worldwide. The team developed innovative solutions to real-world financial inclusion challenges, demonstrating excellence in analytical thinking, strategic problem-solving, and consulting on the global stage.',
  },
  {
    logo: logoBain,
    alt: 'Bain & Company',
    title: 'BrainWars — Bain & Company',
    badge: 'National Rank 6',
    desc: "Yuva members secured National Rank 6 at BrainWars, Bain & Company's flagship strategy case competition. The competition brought together participants from India's leading institutions, including the IITs, IIMs, BITS Pilani, and top business schools, to solve complex challenges. Our performance showcased our analytical thinking, structured problem-solving, and consulting excellence.",
  },
  {
    logo: logoHighbridge,
    alt: 'High Bridge',
    title: 'High Bridge Global Case Competition',
    badge: 'National Rank 6',
    desc: 'Yuva members secured National Rank 6 at the High Bridge Global Case Competition, a premier international strategy and consulting competition. Bringing together top university teams from across the globe, participants solved comprehensive business cases and complex real-world problems, while receiving mentorship from professionals at Deloitte, BCG, and HSBC.',
  },
]

const moreCompetitions = [
  { name: 'ADG',                logo: logoAdg },
  { name: 'IIM Ahmedabad',      logo: logoIima },
  { name: 'IIM Bangalore',      logo: logoIimb },
  { name: 'IIM Indore',         logo: logoIimi },
  { name: 'IIM Lucknow',        logo: logoIiml },
  { name: 'IIT Delhi',          logo: logoIitd },
  { name: 'IIT Madras',         logo: logoIitm },
  { name: 'SRCC',               logo: logoSrcc },
]

// ─── Component ───────────────────────────────────────────────────

export default function Achievements() {
  const bgStyle      = { backgroundImage: `url(${buildingPhoto})` }
  const heroRef      = useFadeUp()
  const sectionRef   = useFadeUp()
  const moreRef      = useFadeUp()
  const setCardRef   = useFadeUpItems()
  const setMoreRef   = useFadeUpItems()

  return (
    <div className="ach-page">

      {/* ── 1. HERO ─────────────────────────────────────────────── */}
      <section className="ach-hero bg-buildings" style={bgStyle}>
        <div className="container">
          <div className="fade-up" ref={heroRef}>
            <span className="eyebrow">Achievements</span>
            <h1 className="ach-hero__heading">Wins that define us</h1>
            <p className="ach-hero__sub">
              From national stages to global finals — the competitions where Yuva stood out.
            </p>
          </div>
        </div>
      </section>

      {/* ── 2. MAJOR ACHIEVEMENTS — alternating timeline ─────────── */}
      <section className="ach-section ach-major">
        <div className="container">
          <div className="fade-up" ref={sectionRef}>
            <h2 className="ach-section__heading">Major achievements</h2>
            <p className="ach-section__sub">
              Podium finishes at some of the world's most competitive case and entrepreneurship contests.
            </p>
          </div>

          <div className="ach-timeline">
            {achievements.map((item, i) => (
              <div
                key={i}
                className={`ach-row ${i % 2 === 0 ? 'ach-row--left' : 'ach-row--right'}`}
              >
                {/* Card */}
                <div className="ach-card fade-up" ref={setCardRef(i)}>
                  <div className="ach-card__logo-wrap">
                    {item.logo ? (
                      <img
                        src={item.logo}
                        alt={item.alt}
                        className="ach-card__logo"
                      />
                    ) : (
                      <div className="ach-logo-placeholder" aria-label={item.alt}>
                        <span>Harvard</span>
                        <span>University</span>
                      </div>
                    )}
                  </div>
                  <span className="ach-card__badge">{item.badge}</span>
                  <h3 className="ach-card__title">{item.title}</h3>
                  <p className="ach-card__desc">{item.desc}</p>
                </div>

                {/* Center line dot */}
                <div className="ach-row__center" aria-hidden="true">
                  <span className="ach-row__dot" />
                </div>

                {/* Ghost numeral */}
                <div className="ach-ghost" aria-hidden="true">
                  {String(i + 1).padStart(2, '0')}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 3. MORE COMPETITIONS ─────────────────────────────────── */}
      <section className="ach-section ach-more">
        <div className="container">
          <div className="fade-up" ref={moreRef}>
            <h2 className="ach-section__heading">More competitions</h2>
            <p className="ach-section__sub">
              Other institutions and competitions where Yuva members have competed.
            </p>
          </div>
          <div className="ach-more-grid">
            {moreCompetitions.map(({ name, logo }, i) => (
              <div key={name} className="ach-more-box fade-up" ref={setMoreRef(i)}>
                <img src={logo} alt={name} className="ach-more-logo" />
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  )
}
