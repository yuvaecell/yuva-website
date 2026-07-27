import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import buildingPhoto from '../../assets/photos/buildings.jpg'
import teamPhoto from '../../assets/photos/teamphoto.png'
import aboutPhoto from '../../assets/photos/about-us-cropped.jpg'
import photoYuvaRoom from '../../assets/photos/yuvaroom.png'
import yAccelLogo from '../../assets/logos/y-accel-logo-new.png'
import siifLogo from '../../assets/logos/siif-logo-new.png'
import alumniAditya from '../../assets/photos/alumni/aditya-arora.jpg'
import alumniApeksha from '../../assets/photos/alumni/apeksha-gupta.jpg'
import alumniBala from '../../assets/photos/alumni/bala-sarda.jpg'
import alumniNikita from '../../assets/photos/alumni/nikita-khanna.jpg'
import alumniPranav from '../../assets/photos/alumni/pranav-bajaj.jpg'
import alumniSrishti from '../../assets/photos/alumni/shrishti-jain-kwatra.jpeg'
import alumniShivansh from '../../assets/photos/alumni/shivansh-jindal.jpeg'
import alumniAnmol from '../../assets/photos/alumni/anmol-ahlawat.jpeg'
import brandFaad from '../../assets/logos/alumni-brands/FAAD.png'
import brandFeedingIndia from '../../assets/logos/alumni-brands/FEEDINGINDIA.png'
import brandJohnJacobs from '../../assets/logos/alumni-brands/JOHNJACOBS.png'
import brandMoxie from '../../assets/logos/alumni-brands/MOXIEBEAUTY.png'
import brandMerchantRecords from '../../assets/logos/alumni-brands/MERCHANTRECORDS.png'
import brandVahdam from '../../assets/logos/alumni-brands/VAHDAM.png'
import iconProjects from '../../assets/logos/what-we-do/projects.png'
import iconEvent from '../../assets/logos/what-we-do/event.png'
import iconStartups from '../../assets/logos/what-we-do/startups.png'
import partnerAmex from '../../assets/logos/partners/AMEX.png'
import partnerItc from '../../assets/logos/partners/ITC.png'
import partnerPepsico from '../../assets/logos/partners/PEPSICO.png'
import partnerSuprajit from '../../assets/logos/partners/SUPRAJIT.png'
import partnerIndigo from '../../assets/logos/partners/INDIGO.png'
import partnerCnbc from '../../assets/logos/partners/CNBC.png'
import partnerCocaCola from '../../assets/logos/partners/COCACOLA.png'
import partnerCornitos from '../../assets/logos/partners/CORNITOS.png'
import partnerGoev from '../../assets/logos/partners/GOEV.png'
import partnerHyatt from '../../assets/logos/partners/HYATT.png'
import partnerIndiaAccelerator from '../../assets/logos/partners/INDIANACCELERATOR.png'
import partnerIndianAngel from '../../assets/logos/partners/INDIANANGELINVESTOR.png'
import partnerLufthansa from '../../assets/logos/partners/LUFTHANSA.png'
import partnerMccain from '../../assets/logos/partners/MCAIN.png'
import partnerNdtv from '../../assets/logos/partners/NDTV.png'
import partnerNus from '../../assets/logos/partners/NUS.png'
import partnerPaytm from '../../assets/logos/partners/PAYTM.png'
import partnerPeesafe from '../../assets/logos/partners/PEESAFE.png'
import partnerZomato from '../../assets/logos/partners/ZOMATO.png'
import Marquee from '../../components/Marquee/Marquee'
import StatBlock from '../../components/StatBlock/StatBlock'
import LogoCarousel from '../../components/LogoCarousel/LogoCarousel'
import BgBuildingsLayer from '../../components/BgBuildingsLayer/BgBuildingsLayer'
import './Home.css'

// IntersectionObserver hook for fade-up reveals
function useFadeUp() {
  const ref = useRef(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) {
      el.classList.add('visible')
      return
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add('visible')
          observer.disconnect()
        }
      },
      { threshold: 0.15 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])
  return ref
}

// Observe each .alum-row within the container as it scrolls into view
function useAlumniReveal() {
  const containerRef = useRef(null)
  useEffect(() => {
    const container = containerRef.current
    if (!container) return
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const rows = container.querySelectorAll('.alum-row')
    if (prefersReduced) {
      rows.forEach(r => r.classList.add('visible'))
      return
    }
    const observers = []
    rows.forEach(row => {
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) { row.classList.add('visible'); obs.disconnect() }
        },
        { threshold: 0.1 }
      )
      obs.observe(row)
      observers.push(obs)
    })
    return () => observers.forEach(o => o.disconnect())
  }, [])
  return containerRef
}

// Alumni timeline data — Bala Sarda leads, Moxie founders share one entry
const alumniTimeline = [
  {
    names: 'Bala Sarda',
    title: 'Founder & CEO, Vahdam Teas',
    photos: [alumniBala],
    brandLogo: brandVahdam,
    brandName: 'Vahdam',
  },
  {
    names: 'Aditya Arora',
    title: 'CEO, FAAD Capital & Angel Investor',
    photos: [alumniAditya],
    brandLogo: brandFaad,
    brandName: 'FAAD Capital',
  },
  {
    names: 'Apeksha Gupta',
    title: 'CEO & Co-Founder, John Jacobs',
    photos: [alumniApeksha],
    brandLogo: brandJohnJacobs,
    brandName: 'John Jacobs',
  },
  {
    names: 'Nikita Khanna & Anmol Ahlawat',
    title: 'Co-Founders, Moxie Beauty',
    photos: [alumniNikita, alumniAnmol],
    brandLogo: brandMoxie,
    brandName: 'Moxie Beauty',
  },
  {
    names: 'Pranav Bajaj',
    title: 'Co-Founder, Medulance (Forbes 30U30)',
    photos: [alumniPranav],
    brandLogo: null,
    brandName: null,
  },
  {
    names: 'Srishti Jain Kawatra',
    title: 'Co-Founder, Zomato Feeding India',
    photos: [alumniSrishti],
    brandLogo: brandFeedingIndia,
    brandName: 'Feeding India',
  },
  {
    names: 'Shivansh Jindal',
    title: 'Founder, Merchant Records',
    photos: [alumniShivansh],
    brandLogo: brandMerchantRecords,
    brandName: 'Merchant Records',
  },
]

const partners = [
  { name: 'American Express',       src: partnerAmex },
  { name: 'PepsiCo',                src: partnerPepsico },
  { name: 'ITC',                    src: partnerItc },
  { name: 'Suprajit Engineering',   src: partnerSuprajit },
  { name: 'IndiGo',                 src: partnerIndigo },
  { name: 'McCain Foods',           src: partnerMccain },
  { name: 'Pee Safe',               src: partnerPeesafe },
  { name: 'Hyatt',                  src: partnerHyatt },
  { name: 'India Accelerator',      src: partnerIndiaAccelerator },
  { name: 'Indian Angel Network',   src: partnerIndianAngel },
  { name: 'NDTV',                   src: partnerNdtv },
  { name: 'GoEV Mobility',          src: partnerGoev },
  { name: 'Coca-Cola',              src: partnerCocaCola },
  { name: 'Lufthansa',              src: partnerLufthansa },
  { name: 'Cornitos',               src: partnerCornitos },
  { name: 'Zomato',                 src: partnerZomato },
  { name: 'Paytm',                  src: partnerPaytm },
  { name: 'CNBC',                   src: partnerCnbc },
  { name: 'NUS',                    src: partnerNus },
]

const whatWeDo = [
  { title: 'Startup Support',    desc: "Direct line to SIIF's incubation resources.",   icon: iconStartups,  to: '/siif' },
  { title: 'Flagship Events',    desc: "Founder's Forge, E-Summit, and more.",          icon: iconEvent,     to: '/events' },
  { title: 'Live Projects',      desc: 'Real consulting work with real companies.',     icon: iconProjects,  to: '/what-we-do#projects' },
]

export default function Home() {
  const bgStyle = { backgroundImage: `url(${buildingPhoto})` }

  const aboutRef = useFadeUp()
  const whatWeDoRef = useFadeUp()
  const room168Ref = useFadeUp()
  const alumniHeaderRef = useFadeUp()
  const partnersRef = useFadeUp()
  const alumniTimelineRef = useAlumniReveal()

  return (
    <div className="home">
      {/* ─── 1. HERO ─────────────────────────────────────────── */}
      <section className="hero bg-buildings" style={bgStyle}>
        <BgBuildingsLayer />
        <div className="container hero__inner">
          <div className="hero__content">
            <span className="eyebrow">Entrepreneurship Cell, SSCBS, Est. 2009</span>
            <h1 className="hero__headline">
              We build the people<br />
              who build the next companies.
            </h1>
            <p className="hero__sub">
              Yuva turns SSCBS students into founders through live industry
              projects, flagship events, and direct access to SIIF's incubation
              ecosystem.
            </p>
            <div className="hero__actions">
              <a href="#site-footer" className="btn btn--primary">Contact us</a>
            </div>
          </div>

          <div className="hero__photo-wrap">
            <div className="hero__photo-overlay-wrap">
              <img
                src={teamPhoto}
                alt="Yuva team at E-Cell"
                className="hero__photo"
              />
              <div className="hero__photo-scrim" aria-hidden="true" />
              <div className="hero__photo-text" aria-hidden="true">
                <span className="hero__photo-text--caps">THE</span>
                <span className="hero__photo-text--script">Misfits</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── 2. MARQUEE ─────────────────────────────────────── */}
      <Marquee />

      {/* ─── 3. ABOUT US ─────────────────────────────────────── */}
      <section className="section about bg-buildings" id="about" style={bgStyle}>
        <BgBuildingsLayer />
        <div className="container">
          <div className="about__inner fade-up" ref={aboutRef}>
            <div className="about__text-col">
              <span className="eyebrow">About Yuva</span>
              <h2 className="section__heading">More than an E-Cell</h2>
              <p className="about__body">
                Yuva, the Entrepreneurship Cell of Shaheed Sukhdev College of
                Business Studies, is committed to fostering an entrepreneurial
                mindset by empowering students to transform innovative ideas into
                impactful ventures.
              </p>
              <p className="about__body">
                Celebrating 17 years of excellence in 2026, Yuva has nurtured
                several successful startups, including Medulance, Vahdam Teas,
                InstaGo, JohnJacobs, CarKhana.com, Moxie Beauty, and more.
                Through mentorship, opportunities, and a collaborative ecosystem,
                we inspire aspiring entrepreneurs to innovate, build, and create
                lasting impact.
              </p>

              <div className="about__boxes">
                <Link to="/what-we-do#projects" className="about__box">
                  <img src={yAccelLogo} alt="Y-Accel logo" className="about__box-logo" />
                  <h4 className="about__box-title">Y-ACCEL</h4>
                  <p className="about__box-text">
                    Yuva's startup accelerator and consulting wing, offering market
                    research, GTM strategy, marketing support, and access to
                    mentors and investors.
                  </p>
                </Link>
                <Link to="/siif" className="about__box">
                  <img src={siifLogo} alt="SIIF logo" className="about__box-logo" />
                  <h4 className="about__box-title">Connected to SIIF</h4>
                  <p className="about__box-text">
                    The SSCBS Innovation and Incubation Foundation (SIIF), supported
                    by the Delhi Government's Incubation Policy, is the official
                    incubation centre of SSCBS and DU. It empowers student
                    entrepreneurs with guidance, resources, mentorship, and financial
                    aid, helping them turn ideas into impactful ventures.
                  </p>
                </Link>
              </div>
            </div>

            <div className="about__photo-col">
              <img
                src={aboutPhoto}
                alt="Yuva members at a college event"
                className="about__photo"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ─── 4. WHAT WE DO ───────────────────────────────────── */}
      <section className="section what-we-do" id="what-we-do">
        <div className="container">
          <div className="fade-up" ref={whatWeDoRef}>
            <span className="eyebrow">What We Do</span>
            <h2 className="section__heading">How we build founders.</h2>
          </div>
          <div className="what-we-do__grid">
            {whatWeDo.map(({ title, desc, icon, to }) => (
              <Link key={title} to={to} className="what-we-do__card">
                <div className="what-we-do__icon">
                  <img src={icon} alt="" className="what-we-do__icon-img" aria-hidden="true" />
                </div>
                <h3 className="what-we-do__title">{title}</h3>
                <p className="what-we-do__desc">{desc}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ─── 5. STATS BAND ───────────────────────────────────── */}
      <StatBlock />

      {/* ─── 6. ROOM 168 ─────────────────────────────────────── */}
      <section className="section room-168">
        <div className="container">
          <div className="room168__inner fade-up" ref={room168Ref}>
            <div className="room168__photo-col">
              <img
                src={photoYuvaRoom}
                alt="Room 168 at SSCBS"
                className="room168__photo"
              />
            </div>
            <div className="room168__text-col">
              <span className="eyebrow">Our Space</span>
              <h2 className="section__heading">Room 168</h2>
              <p className="room168__body">
                Room 168 is where ideas get loud before they get real: bean bags
                in one corner, a whiteboard covered in half-formed pitches in
                another. It's less an office and more a hangout that happens to
                run on caffeine and stubbornness. Pitch decks get roasted here,
                plans get rebuilt on the spot, and somewhere between the chaos, an
                ordinary Tuesday afternoon has a way of turning into a first
                prototype.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ─── 7. NOTABLE ALUMNI ───────────────────────────────── */}
      <section className="section alumni bg-buildings" id="alumni" style={bgStyle}>
        <BgBuildingsLayer />
        <div className="container">
          <div className="fade-up" ref={alumniHeaderRef}>
            <span className="eyebrow">Alumni</span>
            <h2 className="section__heading">Founders who started here</h2>
          </div>

          <div className="alum-timeline" ref={alumniTimelineRef}>
            {alumniTimeline.map(({ names, title, photos, brandLogo, brandName }, i) => (
              <div
                key={names}
                className={`alum-row fade-up${i % 2 === 1 ? ' alum-row--flip' : ''}`}
              >
                {/* Person side */}
                <div className="alum-person">
                  <div className="alum-person__photos">
                    {photos.map((src, j) => (
                      <img
                        key={j}
                        src={src}
                        alt={photos.length > 1 ? names.split(' & ')[j] || names : names}
                        className="alum-photo"
                      />
                    ))}
                  </div>
                  <p className="alum-name">{names}</p>
                  <p className="alum-title">{title}</p>
                </div>

                {/* Center line + dot */}
                <div className="alum-center">
                  <span className="alum-dot" />
                </div>

                {/* Brand logo side */}
                <div className="alum-logo-wrap">
                  {brandLogo && (
                    <img
                      src={brandLogo}
                      alt={brandName}
                      className="alum-brand-logo"
                    />
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── 8. PARTNERS ─────────────────────────────────────── */}
      <section className="section partners" id="partners">
        <div className="container">
          <div className="fade-up" ref={partnersRef}>
            <span className="eyebrow">Our Partners</span>
            <h2 className="section__heading">Who we've worked with</h2>
          </div>
          <LogoCarousel
            items={partners}
            perPage={5}
            renderItem={({ name, src }) => (
              <div className="partners__logo-box">
                <img src={src} alt={name} className="partners__logo-img" />
              </div>
            )}
          />
        </div>
      </section>
    </div>
  )
}
