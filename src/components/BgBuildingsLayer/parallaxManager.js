// Singleton scroll manager — one passive listener drives all registered
// parallax layers in a single rAF, batching all reads before all writes
// to avoid interleaved getBoundingClientRect/transform layout thrashing.

const instances = new Set()
let rafId = null
let listenerActive = false

function tick() {
  rafId = null

  // Read phase: gather all rects before touching any styles
  const updates = []
  const vh = window.innerHeight
  instances.forEach(({ layer, section }) => {
    if (!layer || !section || !layer.isConnected) return
    const rect = section.getBoundingClientRect()
    if (rect.bottom >= 0 && rect.top <= vh) {
      updates.push({ layer, offset: -rect.top * 0.15 })
    }
  })

  // Write phase: apply all transforms after reading is done
  updates.forEach(({ layer, offset }) => {
    layer.style.transform = `translate3d(0, ${offset}px, 0)`
  })
}

function onScroll() {
  if (rafId === null) rafId = requestAnimationFrame(tick)
}

export function registerParallaxLayer(layer, section) {
  const entry = { layer, section }
  instances.add(entry)

  if (!listenerActive) {
    window.addEventListener('scroll', onScroll, { passive: true })
    listenerActive = true
  }

  // Set initial position before any scroll event fires
  requestAnimationFrame(tick)

  return function unregister() {
    instances.delete(entry)
    if (instances.size === 0 && listenerActive) {
      window.removeEventListener('scroll', onScroll)
      if (rafId) cancelAnimationFrame(rafId)
      rafId = null
      listenerActive = false
    }
  }
}
