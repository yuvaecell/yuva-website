import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import buildingPhoto from '../../assets/photos/buildings.png'
import teamPhoto from '../../assets/photos/teamphoto.png'
import aboutPhoto from '../../assets/photos/about-us-cropped.jpg'
import yAccelLogo from '../../assets/logos/y-accel-logo.png'
import siifLogo from '../../assets/logos/siif-logo.png'
import esummitLogo from '../../assets/logos/events/ESUMMIT.png'
import foundersLogo from '../../assets/logos/events/FOUNDERSFORGE.png'
import alumniAditya from '../../assets/photos/alumni/aditya-arora.jpg'
import alumniApeksha from '../../assets/photos/alumni/apeksha-gupta.jpg'
import alumniBala from '../../assets/photos/alumni/bala-sarda.jpg'
import alumniNikita from '../../assets/photos/alumni/nikita-khanna.jpg'
import alumniPranav from '../../assets/photos/alumni/pranav-bajaj.jpg'
import brandAdda247 from '../../assets/logos/alumni-brands/adda247.png'
import brandFeedingIndia from '../../assets/logos/alumni-brands/feedingindia.png'
import brandJohnJacobs from '../../assets/logos/alumni-brands/johnjacobs.png'
import brandKhaad from '../../assets/logos/alumni-brands/khaad.png'
import brandMedulance from '../../assets/logos/alumni-brands/medulance.png'
import brandMoxie from '../../assets/logos/alumni-brands/moxiebeauty.jpeg'
import brandVahdam from '../../assets/logos/alumni-brands/vahdam.png'
import iconProjects from '../../assets/logos/what-we-do/projects.png'
import iconEvent from '../../assets/logos/what-we-do/event.png'
import iconStartups from '../../assets/logos/what-we-do/startups.png'
import iconCommunity from '../../assets/logos/what-we-do/community.png'
import Marquee from '../../components/Marquee/Marquee'
import StatBlock from '../../components/StatBlock/StatBlock'
import EventCard from '../../components/EventCard/EventCard'
import AlumniCard from '../../components/AlumniCard/AlumniCard'
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

const alumni = [
  { name: 'Aditya Arora', title: 'CEO, FAAD Capital & Angel Investor', photo: alumniAditya },
  { name: 'Apeksha Gupta', title: 'CEO & Co-Founder, John Jacobs', photo: alumniApeksha },
  { name: 'Bala Sarda', title: 'Founder & CEO, Vahdam Teas', photo: alumniBala },
  { name: 'Nikita Khanna', title: 'Co-Founder, Moxie Beauty', photo: alumniNikita },
  { name: 'Pranav Bajaj', title: 'Co-Founder, Medulance (Forbes 30U30)', photo: alumniPranav },
]

const alumniStartups = [
  { name: 'Feeding India', src: brandFeedingIndia },
  { name: 'Vahdam',        src: brandVahdam },
  { name: 'Adda247',       src: brandAdda247 },
  { name: 'Medulance',     src: brandMedulance },
  { name: 'Moxie Beauty',  src: brandMoxie },
  { name: 'Khaad',         src: brandKhaad },
  { name: 'John Jacobs',   src: brandJohnJacobs },
]

const events = [
  {
    tag: "Annual Event",
    title: "E-Summit '26",
    description:
      "Our annual celebration of innovation — featuring Udyami 5.0, a Shark Tank-style pitch competition, and global speaker panels.",
    logo: esummitLogo,
    logoAlt: "E-Summit logo",
    to: "/events#e-summit",
  },
  {
    tag: "Bootcamp",
    title: "Founder's Forge 2.0",
    description:
      "A hands-on bootcamp in design thinking, pitching, and startup fundamentals, run in association with SIIF.",
    logo: foundersLogo,
    logoAlt: "Founder's Forge logo",
    to: "/events#founders-forge",
  },
  {
    tag: "International",
    title: "Global Perspectives on Entrepreneurship",
    description:
      "An international panel bringing together founders and experts from Japan, Australia, Vietnam, and India.",
    to: "/events#e-summit",
  },
]

const whatWeDo = [
  { title: 'Live Projects',      desc: 'Real consulting work with real companies.',     icon: iconProjects },
  { title: 'Flagship Events',    desc: "Founder's Forge, E-Summit, and more.",          icon: iconEvent },
  { title: 'Startup Support',    desc: "Direct line to SIIF's incubation resources.",   icon: iconStartups },
  { title: 'Founder Community',  desc: 'A network of 3,800+ student entrepreneurs.',    icon: iconCommunity },
]

export default function Home() {
  const bgStyle = { backgroundImage: `url(${buildingPhoto})` }

  const aboutRef = useFadeUp()
  const whatWeDoRef = useFadeUp()
  const eventsRef = useFadeUp()
  const alumniRef = useFadeUp()
  const partnersRef = useFadeUp()

  return (
    <div className="home">
      {/* ─── 1. HERO ─────────────────────────────────────────── */}
      <section className="hero bg-buildings" style={bgStyle}>
        <div className="container hero__inner">
          <div className="hero__content">
            <span className="eyebrow">Entrepreneurship Cell, SSCBS — Est. 2009</span>
            <h1 className="hero__headline">
              We build the people<br />
              who build the next companies.
            </h1>
            <p className="hero__sub">
              Yuva turns SSCBS students into founders — through live industry
              projects, flagship events, and direct access to SIIF's incubation
              ecosystem.
            </p>
            <div className="hero__actions">
              <a href="#site-footer" className="btn btn--primary">Contact us</a>
              <Link to="/what-we-do" className="btn btn--outline">What we do</Link>
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
                <span>Building</span>
                <span>Founders</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── 2. MARQUEE ─────────────────────────────────────── */}
      <Marquee />

      {/* ─── 3. ABOUT US ─────────────────────────────────────── */}
      <section className="section about bg-buildings" id="about" style={bgStyle}>
        <div className="container">
          <div className="about__inner fade-up" ref={aboutRef}>
            <div className="about__photo-col">
              <img
                src={aboutPhoto}
                alt="Yuva members at a college event"
                className="about__photo"
              />
            </div>

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

              <div className="about__stats">
                <div className="about__stat">
                  <p className="about__stat-value">3,800+</p>
                  <p className="about__stat-label">Student Network</p>
                </div>
                <div className="about__stat">
                  <p className="about__stat-value">50+</p>
                  <p className="about__stat-label">Brand Collaborations</p>
                </div>
                <div className="about__stat">
                  <p className="about__stat-value">130+</p>
                  <p className="about__stat-label">Investor Network</p>
                </div>
              </div>

              <div className="about__boxes">
                <div className="about__box">
                  <img src={yAccelLogo} alt="Y-Accel logo" className="about__box-logo" />
                  <div className="about__box-content">
                    <h4 className="about__box-title">Y-ACCEL</h4>
                    <p className="about__box-text">
                      Yuva's startup accelerator and consulting wing — market
                      research, GTM strategy, marketing support, and access to
                      mentors and investors.
                    </p>
                  </div>
                </div>
                <div className="about__box">
                  <img src={siifLogo} alt="SIIF logo" className="about__box-logo" />
                  <div className="about__box-content">
                    <h4 className="about__box-title">Connected to SIIF</h4>
                    <p className="about__box-text">
                      SSCBS Innovation and Incubation Foundation empowers startups
                      through funding, mentorship, and incubation — having backed
                      80+ ventures with over ₹2.65 crore disbursed.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── 4. WHAT WE DO ───────────────────────────────────── */}
      <section className="section what-we-do" id="what-we-do">
        <div className="container">
          <div className="fade-up" ref={whatWeDoRef}>
            <span className="eyebrow">What We Do</span>
            <h2 className="section__heading">Four ways we build founders</h2>
          </div>
          <div className="what-we-do__grid">
            {whatWeDo.map(({ title, desc, icon }) => (
              <div key={title} className="what-we-do__card">
                <div className="what-we-do__icon">
                  <img src={icon} alt="" className="what-we-do__icon-img" aria-hidden="true" />
                </div>
                <h3 className="what-we-do__title">{title}</h3>
                <p className="what-we-do__desc">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── 5. STATS BAND ───────────────────────────────────── */}
      <StatBlock />

      {/* ─── 6. EVENTS PREVIEW ───────────────────────────────── */}
      <section className="section events-preview" id="events">
        <div className="container">
          <div className="fade-up" ref={eventsRef}>
            <span className="eyebrow">What's Happening</span>
            <h2 className="section__heading">Our flagship events</h2>
          </div>
          <div className="events-preview__grid">
            {events.map((e) => (
              <EventCard key={e.title} {...e} />
            ))}
          </div>
          <div className="events-preview__footer">
            <Link to="/events" className="text-link">View all events →</Link>
          </div>
        </div>
      </section>

      {/* ─── 7. NOTABLE ALUMNI ───────────────────────────────── */}
      <section className="section alumni bg-buildings" id="alumni" style={bgStyle}>
        <div className="container">
          <div className="fade-up" ref={alumniRef}>
            <span className="eyebrow">Alumni</span>
            <h2 className="section__heading">Founders who started here</h2>
          </div>
          <div className="alumni__grid">
            {alumni.map((a) => (
              <AlumniCard key={a.name} {...a} />
            ))}
          </div>

          {/* Alumni startup logo strip */}
          <div className="alumni__startups">
            <p className="alumni__startups-label eyebrow">Startups built by our alumni</p>
            <div className="alumni__logo-strip">
              {alumniStartups.map(({ name, src }) => (
                <div key={name} className="alumni__logo-box">
                  <img src={src} alt={name} className="alumni__brand-logo" />
                </div>
              ))}
            </div>
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
          {/* Aarav: drop partner logos here once you have them (Amex, PepsiCo, ITC, HSBC, etc.) */}
          <div className="partners__grid">
            {Array.from({ length: 9 }).map((_, i) => (
              <div key={i} className="partners__logo-box" aria-hidden="true" />
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
