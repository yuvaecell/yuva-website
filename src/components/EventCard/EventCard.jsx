import { Link } from 'react-router-dom'
import './EventCard.css'

export default function EventCard({ tag, title, description, to, logo, logoAlt }) {
  return (
    <article className="event-card">
      <div className="event-card__header">
        <span className="event-card__tag">{tag}</span>
        {logo && (
          <img src={logo} alt={logoAlt || ''} className="event-card__logo" />
        )}
      </div>
      <h3 className="event-card__title">{title}</h3>
      <p className="event-card__desc">{description}</p>
      <Link to={to || '/events'} className="event-card__link">
        Learn more →
      </Link>
    </article>
  )
}
