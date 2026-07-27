import { useRef, useEffect } from 'react'
import buildingImg from '../../assets/photos/buildings.jpg'
import './BgBuildingsLayer.css'

export default function BgBuildingsLayer() {
  const layerRef = useRef(null)

  useEffect(() => {
    const layer = layerRef.current
    if (!layer) return
    if (window.innerWidth > 767) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const section = layer.parentElement
    let rafId = null

    const tick = () => {
      rafId = null
      if (!section || !layer) return
      const rect = section.getBoundingClientRect()
      const vh = window.innerHeight
      if (rect.bottom >= 0 && rect.top <= vh) {
        // background moves at 85% of scroll speed → 15% parallax lag
        const offset = -rect.top * 0.15
        layer.style.transform = `translateY(${offset}px)`
      }
    }

    const onScroll = () => {
      if (rafId === null) rafId = requestAnimationFrame(tick)
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    tick()

    return () => {
      window.removeEventListener('scroll', onScroll)
      if (rafId) cancelAnimationFrame(rafId)
    }
  }, [])

  return (
    <div
      ref={layerRef}
      className="bg-buildings-layer"
      aria-hidden="true"
      style={{ backgroundImage: `url(${buildingImg})` }}
    />
  )
}
