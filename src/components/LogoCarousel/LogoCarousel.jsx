import { useRef, useState, useEffect, useCallback } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import './LogoCarousel.css'

export default function LogoCarousel({ items, renderItem, perPage = 5, className = '' }) {
  const trackRef = useRef(null)
  const [atStart, setAtStart] = useState(true)
  const [atEnd, setAtEnd] = useState(false)

  const sync = useCallback(() => {
    const t = trackRef.current
    if (!t) return
    setAtStart(t.scrollLeft <= 1)
    setAtEnd(t.scrollLeft + t.clientWidth >= t.scrollWidth - 2)
  }, [])

  useEffect(() => {
    const t = trackRef.current
    if (!t) return
    sync()
    t.addEventListener('scroll', sync, { passive: true })
    const ro = new ResizeObserver(sync)
    ro.observe(t)
    return () => {
      t.removeEventListener('scroll', sync)
      ro.disconnect()
    }
  }, [sync])

  const go = (dir) => {
    const t = trackRef.current
    if (!t) return
    t.scrollBy({ left: t.clientWidth * dir, behavior: 'smooth' })
  }

  return (
    <div className={`logo-carousel ${className}`.trim()}>
      <button
        className="logo-carousel__arrow logo-carousel__arrow--prev"
        onClick={() => go(-1)}
        disabled={atStart}
        aria-label="Scroll to previous logos"
      >
        <ChevronLeft size={18} strokeWidth={2.5} />
      </button>

      <div
        className="logo-carousel__track"
        ref={trackRef}
        style={{ '--lc-per': perPage }}
      >
        {items.map((item, i) => (
          <div key={item.name ?? i} className="logo-carousel__snap-item">
            {renderItem(item, i)}
          </div>
        ))}
      </div>

      <button
        className="logo-carousel__arrow logo-carousel__arrow--next"
        onClick={() => go(1)}
        disabled={atEnd}
        aria-label="Scroll to next logos"
      >
        <ChevronRight size={18} strokeWidth={2.5} />
      </button>
    </div>
  )
}
