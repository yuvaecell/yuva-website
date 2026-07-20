import { useEffect, useRef } from 'react'
import { useLocation } from 'react-router-dom'
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
import photoSpringboard from '../../assets/photos/events/springboard-photo.png'
import logoSpringboard from '../../assets/logos/events/springboard-logo.png'
import photoImpactWeek from '../../assets/photos/events/impactweek-photo.png'
import logoImpactWeek from '../../assets/logos/events/impactweek-logo.png'
import photoInvestorsDay from '../../assets/photos/events/investorsday-photo.png'
import photoStartupFood from '../../assets/photos/events/startupfood-photo.png'
import photoMilen from '../../assets/photos/events/milen-photo.png'
import logoMilen from '../../assets/logos/events/milen-logo.png'
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
  {
    photo: photoSpringboard,
    logo: logoSpringboard,
    title: 'Springboard',
    desc: 'Springboard was a first-of-its-kind global collaboration — a joint initiative between Yuva, SSCBS, and the E-Cell of the National University of Singapore. This global startup ideation challenge was open to all college students, giving them a chance to solve real-life industry challenges. With judges ranging from CEOs to startup founders, the event drew 500+ participants from across the globe.',
  },
  {
    photo: photoImpactWeek,
    logo: logoImpactWeek,
    title: 'Impact Week',
    desc: 'A design thinking workshop organised by Lufthansa in collaboration with SIIF, Yuva, DPSRU, and Ambedkar University — bringing together students to promote innovation and turn ideas into reality.',
  },
  {
    photo: photoInvestorsDay,
    title: "Investors' Pitch Day",
    desc: "Organised by SIIF and Yuva, Investors' Pitch Day gave early-stage startups a platform to showcase their ideas and garner investment support from real investors, including Mr. Ravi Kant, Ms. Tanya Kapur (StartupEd), Mr. Karanbir Bhatia (Windrose Capital), Mr. Shivam Ahuja (Angel Investor), Mr. Raghav Sayal (Huddle), and Mr. Vikash Sharma (IC1101). Guest of honour Mr. Saurabh Jain (VP, PayTM) encouraged student entrepreneurs to see entrepreneurship as a state of mind.",
  },
  {
    photo: photoMilen,
    logo: logoMilen,
    title: 'MilEn',
    desc: "Held on National Entrepreneurship Day, Mil-En brought together the brightest minds from E-Cells across Delhi — including E-Cell LSR, E-Cell SRCC, and E-Cell IIITD — to network and connect. The day opened with a speaker session by Mr. Himanshu Wardhan, founder of Thevasa and a CBS alum, featured activities like 'Stack-It Startup,' and closed with a musical performance by Dhwani, SSCBS's music society.",
  },
  {
    photo: photoStartupFood,
    title: 'Startup Food Fest',
    // TODO Aarav: replace with real Startup Food Fest copy — placeholder text below.
    desc: 'A Yuva and SIIF initiative bringing together student-run food startups and ventures in a festival format — details to be added.',
  },
]

function PhotoCard({ photo, logo, title, desc, cardRef }) {
  return (
    <article className="ev-card fade-up" ref={cardRef}>
      <div className="ev-card__img-wrap">
        <img src={photo} alt={title} className="ev-card__img" />
      </div>
      <div className="ev-card__body">
        {logo && (
          <div className="ev-card__badge-wrap">
            <img src={logo} alt={`${title} logo`} className="ev-card__badge" />
          </div>
        )}
        <h3 className="ev-card__title">{title}</h3>
        <p className="ev-card__desc">{desc}</p>
      </div>
    </article>
  )
}

export default function Events() {
  const bgStyle = { backgroundImage: `url(${buildingPhoto})` }
  const location = useLocation()

  // Scroll to anchored section when navigating with a hash
  useEffect(() => {
    if (!location.hash) return
    const id = location.hash.slice(1)
    requestAnimationFrame(() => {
      const el = document.getElementById(id)
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    })
  }, [location.hash])

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
      <section id="e-summit" className="ev-section bg-buildings" style={bgStyle}>
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
      <section id="founders-forge" className="ev-section ev-section--light">
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
      <section id="other-events" className="ev-section bg-buildings" style={bgStyle}>
        <div className="container">
          <div className="fade-up" ref={otherRef}>
            <span className="eyebrow">Beyond the Campus</span>
            <h2 className="ev-section__heading">Representing SSCBS on the national stage</h2>
            <p className="ev-section__intro">
              Beyond our flagship programs, Yuva represented SSCBS on national
              and international stages throughout the year.
            </p>
          </div>
          <div className="ev-grid ev-grid--3">
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
