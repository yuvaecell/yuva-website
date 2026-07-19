import { Link } from 'react-router-dom'
import logo from '../../assets/logos/YuvaSSCBS_Logo_3.png'
import './Footer.css'

export default function Footer() {
  return (
    <footer className="footer" id="site-footer">
      <div className="container">
        <div className="footer__top">
          <div className="footer__brand">
            <img src={logo} alt="Yuva logo" className="footer__logo" />
            <p className="footer__tagline">
              Entrepreneurship Cell<br />
              Shaheed Sukhdev College of Business Studies
            </p>
          </div>

          <div className="footer__contact">
            <h2 className="footer__heading">Get in touch</h2>

            <a
              href="mailto:yuva.ecell@sscbs.du.ac.in"
              className="footer__contact-row"
            >
              <span className="footer__contact-icon" aria-hidden="true">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M2 4h12v8H2z" stroke="currentColor" strokeWidth="1.25" strokeLinejoin="round"/>
                  <path d="M2 4l6 5 6-5" stroke="currentColor" strokeWidth="1.25" strokeLinejoin="round"/>
                </svg>
              </span>
              yuva.ecell@sscbs.du.ac.in
            </a>

            <div className="footer__contact-row">
              <span className="footer__contact-icon" aria-hidden="true">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M3 2h2.5l1 3-1.5 1.5a9 9 0 0 0 4.5 4.5L11 9.5l3 1V13a1 1 0 0 1-1 1C5.373 14 2 8.627 2 3a1 1 0 0 1 1-1z" stroke="currentColor" strokeWidth="1.25" strokeLinejoin="round"/>
                </svg>
              </span>
              Aashree Jain: +91 92057 62615
            </div>

            <div className="footer__contact-row">
              <span className="footer__contact-icon" aria-hidden="true">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M3 2h2.5l1 3-1.5 1.5a9 9 0 0 0 4.5 4.5L11 9.5l3 1V13a1 1 0 0 1-1 1C5.373 14 2 8.627 2 3a1 1 0 0 1 1-1z" stroke="currentColor" strokeWidth="1.25" strokeLinejoin="round"/>
                </svg>
              </span>
              Yohan Kaul: +91 93700 95931
            </div>

            <div className="footer__contact-row footer__contact-row--addr">
              <span className="footer__contact-icon" aria-hidden="true">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M8 1.5C5.515 1.5 3.5 3.515 3.5 6c0 3.75 4.5 8.5 4.5 8.5S12.5 9.75 12.5 6c0-2.485-2.015-4.5-4.5-4.5z" stroke="currentColor" strokeWidth="1.25"/>
                  <circle cx="8" cy="6" r="1.5" stroke="currentColor" strokeWidth="1.25"/>
                </svg>
              </span>
              <span>
                Room 168, Shaheed Sukhdev College of Business Studies,<br />
                University of Delhi, Sector 16, Rohini – New Delhi
              </span>
            </div>
          </div>

          <div className="footer__social">
            <h3 className="footer__social-heading">Follow us</h3>
            <a
              href="https://in.linkedin.com/company/yuva-entrepreneurship-cell-cbs"
              className="footer__social-link"
              aria-label="LinkedIn — Yuva E Cell"
              target="_blank"
              rel="noopener noreferrer"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z"/>
                <circle cx="4" cy="4" r="2"/>
              </svg>
              <span>Yuva E Cell</span>
            </a>
            <a
              href="https://www.instagram.com/yuva.sscbs/"
              className="footer__social-link"
              aria-label="Instagram — @yuva.sscbs"
              target="_blank"
              rel="noopener noreferrer"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
              </svg>
              <span>@yuva.sscbs</span>
            </a>
          </div>
        </div>

        <div className="footer__mid">
          <nav className="footer__nav" aria-label="Footer navigation">
            <Link to="/" className="footer__nav-link">Home</Link>
            <Link to="/about" className="footer__nav-link">About</Link>
            <Link to="/events" className="footer__nav-link">Events</Link>
            <Link to="/join" className="footer__nav-link">Join</Link>
          </nav>
        </div>

        <div className="footer__bottom">
          <p>© 2026 Yuva, E-Cell of SSCBS. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
