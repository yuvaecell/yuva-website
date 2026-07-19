import { useEffect, useRef } from 'react'
import {
  Rocket, HeartHandshake, Landmark, UserCheck, Handshake, Briefcase,
  Lightbulb, Network, Users, CalendarDays, Coins,
} from 'lucide-react'
import buildingPhoto from '../../assets/photos/buildings.png'
import siifLogo from '../../assets/logos/siif-logo.png'
import siifPhoto from '../../assets/photos/siif.png'
import './Siif.css'

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

const stats = [
  { Icon: Rocket,        number: '80+',      label: 'Onboarded Startups' },
  { Icon: HeartHandshake, number: '20',      label: 'Funded Startups' },
  { Icon: Landmark,      number: '₹2.65 Cr', label: 'Fund Disbursed' },
  { Icon: UserCheck,     number: '9',        label: 'Expert Mentors' },
  { Icon: Handshake,     number: '16',       label: 'Industry Partners' },
  { Icon: Briefcase,     number: '300+',     label: 'Jobs Created' },
]

const offerings = [
  {
    Icon: Lightbulb,
    title: 'Ideation & Value Proposition',
    desc: 'We help entrepreneurs refine their ideas, define compelling value propositions, and transform innovative concepts into scalable business solutions through expert guidance and strategic support.',
  },
  {
    Icon: Network,
    title: 'Industry Networking',
    desc: 'SIIF connects founders with industry leaders, investors, mentors, and potential collaborators, enabling meaningful partnerships within the startup ecosystem.',
  },
  {
    Icon: Users,
    title: 'Mentorship Program',
    desc: 'Our mentorship program brings together entrepreneurs and experienced professionals who provide strategic insights and continuous support throughout the startup journey.',
  },
  {
    Icon: CalendarDays,
    title: 'Conferences & Events',
    desc: 'SIIF hosts and facilitates conferences, workshops, seminars, bootcamps, and networking events that promote learning and exposure to the entrepreneurial ecosystem.',
  },
  {
    Icon: Coins,
    title: 'Seed Funding Assistance',
    desc: 'We connect founders with angel investors, venture capitalists, and government-backed funding schemes — making the journey from idea to reality feel within reach.',
  },
]

export default function Siif() {
  const bgStyle = { backgroundImage: `url(${buildingPhoto})` }

  const heroRef         = useFadeUp()
  const collab1Ref      = useFadeUp()
  const collab2Ref      = useFadeUp()
  const statsHeaderRef  = useFadeUp()
  const offerHeaderRef  = useFadeUp()
  const ctaRef          = useFadeUp()

  const statRefs     = useRef([])
  const offerRefs    = useRef([])

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const allEls = [...statRefs.current, ...offerRefs.current]
    const observers = []
    allEls.forEach((el) => {
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
  }, [])

  return (
    <div className="siif-page">

      {/* ── 1. HERO — dark building bg ─────────────────────────── */}
      <section className="siif-hero bg-buildings" style={bgStyle}>
        <div className="container">
          <div className="siif-hero__inner fade-up" ref={heroRef}>
            <div className="siif-hero__text">
              <img src={siifLogo} alt="SIIF logo" className="siif-hero__badge" />
              <span className="eyebrow">SSCBS Innovation &amp; Incubation Foundation</span>
              <h1 className="siif-hero__heading">Where ideas become ventures</h1>
              <p className="siif-hero__body">
                The SSCBS Innovation &amp; Incubation Foundation (SIIF) is the
                incubation arm of Shaheed Sukhdev College of Business Studies,
                established under the Incubation Policy from the Govt. of NCT,
                Delhi to foster innovation and entrepreneurship. As one of Delhi's
                pioneering incubation centres, SIIF empowers early-stage startups
                through incubation, mentorship, funding support, and a robust
                entrepreneurial ecosystem.
              </p>
            </div>
            <div className="siif-hero__photo-col">
              <img src={siifPhoto} alt="SIIF — SSCBS Innovation & Incubation Foundation" className="siif-hero__photo" />
            </div>
          </div>
        </div>
      </section>

      {/* ── 2. STRATEGIC COLLABORATIONS — paper bg ─────────────── */}
      <section className="siif-section siif-collab">
        <div className="container">
          <div className="siif-collab__inner">
            <div className="fade-up" ref={collab1Ref}>
              <span className="eyebrow siif-collab__eyebrow">Strategic Collaborations</span>
              <h2 className="siif-section__heading">Backed by leading institutions</h2>
            </div>
            <div className="fade-up" ref={collab2Ref}>
              <p className="siif-collab__body">
                Through strategic collaborations with institutions like IIM Bangalore
                and IIT Kharagpur, alongside initiatives such as Founder's Forge and
                Hustler's Camp, SIIF continues to equip founders with the guidance,
                resources, and network needed to transform innovative ideas into
                impactful ventures.
              </p>
              <div className="siif-collab__badges">
                <span className="siif-collab__badge">IIM BANGALORE</span>
                <span className="siif-collab__badge">IIT KHARAGPUR</span>
                <span className="siif-collab__badge">FOUNDER'S FORGE</span>
                <span className="siif-collab__badge">HUSTLER'S CAMP</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 3. IMPACT STATS — dark building bg ─────────────────── */}
      <section className="siif-section siif-stats bg-buildings" style={bgStyle}>
        <div className="container">
          <div className="fade-up" ref={statsHeaderRef}>
            <span className="eyebrow">Our Impact</span>
            <h2 className="siif-section__heading siif-section__heading--light">
              Numbers that speak
            </h2>
          </div>
          <div className="siif-stats__grid">
            {stats.map(({ Icon, number, label }, i) => (
              <div
                key={label}
                className="siif-stat fade-up"
                ref={el => { statRefs.current[i] = el }}
              >
                <div className="siif-stat__icon-wrap">
                  <Icon size={22} strokeWidth={1.5} aria-hidden="true" />
                </div>
                <p className="siif-stat__number">{number}</p>
                <p className="siif-stat__label">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 4. WHAT WE OFFER — paper bg ────────────────────────── */}
      <section className="siif-section siif-offers">
        <div className="container">
          <div className="fade-up" ref={offerHeaderRef}>
            <span className="eyebrow">What We Offer</span>
            <h2 className="siif-section__heading">How we support founders</h2>
          </div>
          <div className="siif-offers__grid">
            {offerings.map(({ Icon, title, desc }, i) => (
              <div
                key={title}
                className="siif-offer-card fade-up"
                ref={el => { offerRefs.current[i] = el }}
              >
                <div className="siif-offer-card__icon">
                  <Icon size={22} strokeWidth={1.5} aria-hidden="true" />
                </div>
                <h3 className="siif-offer-card__title">{title}</h3>
                <p className="siif-offer-card__desc">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 5. CLOSING CTA — dark building bg ──────────────────── */}
      <section className="siif-cta bg-buildings" style={bgStyle}>
        <div className="container">
          <div className="siif-cta__inner fade-up" ref={ctaRef}>
            <h2 className="siif-cta__heading">Ready to transform your idea?</h2>
            <p className="siif-cta__sub">
              Take the first step towards building your startup with SIIF. Join our
              incubation programs and leverage mentorship, funding, and a strong
              entrepreneurial ecosystem to turn your vision into reality.
            </p>
            <a href="#site-footer" className="siif-btn siif-btn--primary">Get in touch</a>
          </div>
        </div>
      </section>

    </div>
  )
}
