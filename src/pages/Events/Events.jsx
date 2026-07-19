import { useEffect, useRef } from 'react'
import buildingPhoto from '../../assets/photos/buildings.png'
import esummitLogo from '../../assets/logos/events/ESUMMIT.png'
import forgeLogo from '../../assets/logos/events/FOUNDERSFORGE.png'
import photoSpeakerSession from '../../assets/photos/events/SPEAKERSESSION.png'
import photoFoundersVault from '../../assets/photos/events/FOUNDERSVAULT.png'
import photoUdhyami5 from '../../assets/photos/events/UDHYAMI5.png'
import photoEmpathyGauntlet from '../../assets/photos/events/EMPATHYGAUNTLET.png'
import photoAdMad from '../../assets/photos/events/ADMAD.png'
import photoABTesting from '../../assets/photos/events/ABTESTING.png'
import photoReverseSharkTank from '../../assets/photos/events/REVERSESHARKTANK.png'
import photoAIMS from '../../assets/photos/events/AIMS.png'
import photoICICC from '../../assets/photos/events/ICICC.png'
import photoGlobalProgramme from '../../assets/photos/events/GLOBALPROGRAMME.png'
import photoNDTV from '../../assets/photos/events/NDTVYUVA.png'
import './Events.css'

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

function useCardReveal(count) {
  const refs = useRef([])
  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const observers = []
    refs.current.forEach((el) => {
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
  }, [count])
  return refs
}

const esummitCards = [
  {
    photo: photoSpeakerSession,
    title: 'Speaker Session',
    desc: 'An international panel exposing students to global startup ecosystems, bringing together experts from Japan, Australia, Vietnam, and India to deep-dive into go-to-market frameworks, global compliance, and navigating foreign startup funding.',
  },
  {
    photo: photoFoundersVault,
    title: "Founder's Vault",
    desc: 'Our Business Plan Competition gave student founders a platform to present ideas before an international jury, receiving feedback on startup validation, scalability, and investor expectations.',
  },
  {
    photo: photoUdhyami5,
    title: 'Udyami 5.0',
    desc: "Yuva's flagship startup pitching competition, run in a Shark Tank-inspired format, enabled early-stage founders to pitch before investors and venture capitalists.",
  },
]

const forgeCards = [
  {
    photo: photoEmpathyGauntlet,
    title: 'Empathy Gauntlet',
    desc: "A design-thinking exercise focused on user behavior and pain points — participants mapped a persona's 'day in the life,' then adapted their solutions when an external disruption was introduced midway through.",
  },
  {
    photo: photoAdMad,
    title: 'Ad-Mad',
    desc: 'Participants conceptualized and presented creative advertising campaigns, exploring brand positioning, messaging, and audience engagement in a high-energy environment.',
  },
  {
    photo: photoABTesting,
    title: 'A/B Testing',
    desc: 'An introduction to data-driven decision-making — teams tested variations of an idea and evaluated outcomes based on peer feedback.',
  },
  {
    photo: photoReverseSharkTank,
    title: 'Reverse Shark Tank',
    desc: 'Participants shifted from founders to investors, evaluating startup ideas before engaging in competitive bidding — sharpening their understanding of investor perspectives and financial evaluation.',
  },
]

const otherCards = [
  {
    photo: photoAIMS,
    title: 'AIM Launch',
    desc: 'Yuva co-anchored the launch of the Mentor India Academy under the Atal Innovation Mission, NITI Aayog — inaugurated by Mr. Deepak Bagla, Former MD & CEO of Invest India — bridging grassroots school innovators with ecosystem mentors.',
  },
  {
    photo: photoICICC,
    title: 'ICICC Conference',
    desc: 'Yuva partnered with NIT Patna and the University of Valladolid, Spain to anchor the International Conference on Innovative Computing and Communication, featuring participation from 50+ countries.',
  },
  {
    photo: photoGlobalProgramme,
    title: 'Kobe Venture Makers Program',
    desc: 'Sponsored by MEXT, Government of Japan, Yuva members were selected for a fully-funded 15-day international exchange, partnering with cohorts from Japan, Australia, and the UK on cross-border venture creation.',
  },
  {
    photo: photoNDTV,
    title: 'NDTV Yuva 2026',
    desc: 'Yuva participated in the NDTV Yuva Conclave 2026, presenting startup ideas on a premier national leadership stage alongside prominent changemakers.',
  },
]

function PhotoCard({ photo, title, desc, cardRef }) {
  return (
    <article className="ev-card fade-up" ref={cardRef}>
      <div className="ev-card__img-wrap">
        <img src={photo} alt={title} className="ev-card__img" />
      </div>
      <div className="ev-card__body">
        <h3 className="ev-card__title">{title}</h3>
        <p className="ev-card__desc">{desc}</p>
      </div>
    </article>
  )
}

export default function Events() {
  const bgStyle = { backgroundImage: `url(${buildingPhoto})` }

  const headerRef    = useFadeUp()
  const esummitRef   = useFadeUp()
  const forgeRef     = useFadeUp()
  const otherRef     = useFadeUp()
  const ctaRef       = useFadeUp()

  const esummitCardRefs = useCardReveal(esummitCards.length)
  const forgeCardRefs   = useCardReveal(forgeCards.length)
  const otherCardRefs   = useCardReveal(otherCards.length)

  return (
    <div className="events-page">

      {/* ── 1. PAGE HEADER ─────────────────────────────────────── */}
      <section className="ev-header">
        <div className="container">
          <div className="fade-up" ref={headerRef}>
            <span className="eyebrow">Events</span>
            <h1 className="ev-header__heading">What we've been building</h1>
            <p className="ev-header__sub">
              A year of flagship summits, hands-on bootcamps, and national and
              international stages — here's every event from 2025-26.
            </p>
          </div>
        </div>
      </section>

      {/* ── 2. E-SUMMIT '26 — dark building bg ─────────────────── */}
      <section className="ev-section bg-buildings" style={bgStyle}>
        <div className="container">
          <div className="fade-up" ref={esummitRef}>
            <div className="ev-section__brand">
              <img src={esummitLogo} alt="E-Summit" className="ev-section__logo" />
            </div>
            <span className="eyebrow">Annual Event · E-Summit &apos;26</span>
            <h2 className="ev-section__heading">Our annual celebration of innovation</h2>
            <p className="ev-section__intro">
              Our annual celebration of innovation and entrepreneurship — featuring
              the Business Plan Competition, Udyami 5.0, and a panel discussion
              with global experts.
            </p>
          </div>
          <div className="ev-grid ev-grid--3">
            {esummitCards.map((card, i) => (
              <PhotoCard
                key={card.title}
                {...card}
                cardRef={el => { esummitCardRefs.current[i] = el }}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ── 3. FOUNDER'S FORGE 2.0 — paper bg ─────────────────── */}
      <section className="ev-section ev-section--light">
        <div className="container">
          <div className="fade-up" ref={forgeRef}>
            <div className="ev-section__brand">
              <img src={forgeLogo} alt="Founder's Forge" className="ev-section__logo" />
            </div>
            <span className="eyebrow">Bootcamp · Founder&apos;s Forge 2.0</span>
            <h2 className="ev-section__heading">Three days that change how you think</h2>
            <p className="ev-section__intro">
              A three-day bootcamp run in association with SIIF, equipping 80+
              students with hands-on skills like design thinking, PowerPoint,
              and Excel.
            </p>
          </div>
          <div className="ev-grid ev-grid--2">
            {forgeCards.map((card, i) => (
              <PhotoCard
                key={card.title}
                {...card}
                cardRef={el => { forgeCardRefs.current[i] = el }}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ── 4. OTHER EVENTS — dark building bg ─────────────────── */}
      <section className="ev-section bg-buildings" style={bgStyle}>
        <div className="container">
          <div className="fade-up" ref={otherRef}>
            <span className="eyebrow">Beyond the Campus</span>
            <h2 className="ev-section__heading">Representing SSCBS on the national stage</h2>
            <p className="ev-section__intro">
              Beyond our flagship programs, Yuva represented SSCBS on national
              and international stages throughout the year.
            </p>
          </div>
          <div className="ev-grid ev-grid--2">
            {otherCards.map((card, i) => (
              <PhotoCard
                key={card.title}
                {...card}
                cardRef={el => { otherCardRefs.current[i] = el }}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ── 5. CLOSING CTA ─────────────────────────────────────── */}
      <section className="ev-cta">
        <div className="container">
          <div className="ev-cta__inner fade-up" ref={ctaRef}>
            <h2 className="ev-cta__heading">Want to be part of the next one?</h2>
            <p className="ev-cta__sub">
              Follow us for early access to registrations, speaker announcements,
              and opportunities to collaborate.
            </p>
            <a href="#site-footer" className="ev-btn ev-btn--primary">Get in touch</a>
          </div>
        </div>
      </section>

    </div>
  )
}
