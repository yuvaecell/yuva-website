import './AlumniCard.css'

function getInitials(name) {
  return name
    .split(' ')
    .slice(0, 2)
    .map((n) => n[0])
    .join('')
    .toUpperCase()
}

export default function AlumniCard({ name, title, photo }) {
  return (
    <div className="alumni-card">
      {photo ? (
        <img
          src={photo}
          alt={name}
          className="alumni-card__photo"
        />
      ) : (
        <div className="alumni-card__avatar" aria-hidden="true">
          {getInitials(name)}
        </div>
      )}
      <p className="alumni-card__name">{name}</p>
      <p className="alumni-card__title">{title}</p>
    </div>
  )
}
