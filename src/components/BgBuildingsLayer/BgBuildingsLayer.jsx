import { useRef, useEffect } from 'react'
import buildingImg from '../../assets/photos/buildings.jpg'
import { registerParallaxLayer } from './parallaxManager'
import './BgBuildingsLayer.css'

export default function BgBuildingsLayer() {
  const layerRef = useRef(null)

  useEffect(() => {
    const layer = layerRef.current
    if (!layer) return
    if (window.innerWidth > 767) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const section = layer.parentElement
    // Returns the unregister cleanup function
    return registerParallaxLayer(layer, section)
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
