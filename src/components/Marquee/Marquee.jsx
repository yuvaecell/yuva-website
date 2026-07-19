import marqueePhotos from './marqueePhotos'
import './Marquee.css'

export default function Marquee() {
  // Duplicate for seamless loop
  const items = [...marqueePhotos, ...marqueePhotos]

  return (
    <section className="marquee-strip" aria-hidden="true">
      <div className="marquee-track">
        {items.map((item, i) => (
          <div key={i} className="marquee-item">
            {item.src ? (
              <img src={item.src} alt={item.alt} className="marquee-img" />
            ) : (
              <div
                className="marquee-placeholder"
                style={{ backgroundColor: item.color }}
              >
                <span className="marquee-placeholder-label">{item.alt}</span>
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  )
}
