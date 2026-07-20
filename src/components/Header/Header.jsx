import { useState, useEffect, useRef } from 'react'
import { Link, NavLink } from 'react-router-dom'
import logo from '../../assets/logos/YuvaSSCBS_Logo_3.png'
import './Header.css'

const navLinks = [
  { label: 'Home', to: '/' },
  { label: 'About', to: '/about' },
  { label: 'What We Do', to: '/what-we-do' },
  { label: 'Events', to: '/events' },
  { label: 'SIIF', to: '/siif' },
  { label: 'Join Us', to: '/join' },
]

export default function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const drawerRef = useRef(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  // Focus trap + Escape key when drawer is open
  useEffect(() => {
    if (!menuOpen) return

    const drawer = drawerRef.current
    if (!drawer) return

    // Focus first element in drawer
    const focusable = drawer.querySelectorAll('a, button, [tabindex]:not([tabindex="-1"])')
    if (focusable[0]) focusable[0].focus()

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setMenuOpen(false)
        return
      }
      if (e.key !== 'Tab') return
      const first = focusable[0]
      const last = focusable[focusable.length - 1]
      if (e.shiftKey) {
        if (document.activeElement === first) {
          e.preventDefault()
          last.focus()
        }
      } else {
        if (document.activeElement === last) {
          e.preventDefault()
          first.focus()
        }
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [menuOpen])

  const closeMenu = () => setMenuOpen(false)

  return (
    <header className={`header${scrolled ? ' header--scrolled' : ''}`}>
      <div className="header__inner container">
        <Link to="/" className="header__brand" onClick={closeMenu}>
          <img src={logo} alt="Yuva logo" className="header__logo" />
          <span className="header__wordmark">
            <span className="header__yuva">YUVA</span>
            <span className="header__sscbs">SSCBS</span>
          </span>
        </Link>

        <nav className="header__nav" aria-label="Main navigation">
          {navLinks.map(({ label, to }) => (
            <NavLink
              key={to}
              to={to}
              end={to === '/'}
              className={({ isActive }) =>
                `header__nav-link${isActive ? ' header__nav-link--active' : ''}`
              }
            >
              {label}
            </NavLink>
          ))}
        </nav>

        <button
          className={`header__hamburger${menuOpen ? ' header__hamburger--open' : ''}`}
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((o) => !o)}
        >
          <span />
          <span />
          <span />
        </button>
      </div>

      {/* Backdrop */}
      <div
        className={`header__backdrop${menuOpen ? ' header__backdrop--open' : ''}`}
        onClick={closeMenu}
        aria-hidden="true"
      />

      {/* Slide-in drawer */}
      <div
        className={`header__drawer${menuOpen ? ' header__drawer--open' : ''}`}
        role="dialog"
        aria-modal="true"
        aria-label="Navigation"
        aria-hidden={!menuOpen}
        ref={drawerRef}
      >
        <div className="header__drawer-header">
          <button
            className="header__drawer-close"
            onClick={closeMenu}
            aria-label="Close menu"
          >
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <line x1="2" y1="2" x2="16" y2="16" />
              <line x1="16" y1="2" x2="2" y2="16" />
            </svg>
          </button>
        </div>

        <nav className="header__drawer-nav" aria-label="Mobile navigation">
          {navLinks.map(({ label, to }) => (
            <NavLink
              key={to}
              to={to}
              end={to === '/'}
              className={({ isActive }) =>
                `header__drawer-link${isActive ? ' header__drawer-link--active' : ''}`
              }
              onClick={closeMenu}
            >
              {label}
            </NavLink>
          ))}
        </nav>

        <div className="header__drawer-social">
          <a
            href="https://in.linkedin.com/company/yuva-entrepreneurship-cell-cbs"
            className="header__drawer-social-link"
            aria-label="LinkedIn — Yuva E Cell"
            target="_blank"
            rel="noopener noreferrer"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z"/>
              <circle cx="4" cy="4" r="2"/>
            </svg>
            <span>LinkedIn</span>
          </a>
          <a
            href="https://www.instagram.com/yuva.sscbs/"
            className="header__drawer-social-link"
            aria-label="Instagram — @yuva.sscbs"
            target="_blank"
            rel="noopener noreferrer"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
              <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
              <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
            </svg>
            <span>Instagram</span>
          </a>
        </div>
      </div>
    </header>
  )
}
