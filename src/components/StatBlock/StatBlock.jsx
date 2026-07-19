import buildingPhoto from '../../assets/photos/buildings.png'
import './StatBlock.css'

const stats = [
  { value: '1,00,000+', label: 'Student Impressions', initial: 'SI' },
  { value: '70,000+', label: 'Social Media Reach', initial: 'SM' },
  { value: '100+', label: 'Partner Organisations', initial: 'PO' },
  { value: '30+', label: 'Startup Ventures', initial: 'SV' },
]

export default function StatBlock() {
  return (
    <section
      className="statblock bg-buildings"
      style={{ backgroundImage: `url(${buildingPhoto})` }}
    >
      <div className="container">
        <div className="statblock__grid">
          {stats.map(({ value, label, initial }) => (
            <div key={label} className="statblock__item">
              <div className="statblock__icon" aria-hidden="true">
                {initial}
              </div>
              <p className="statblock__value">{value}</p>
              <p className="statblock__label">{label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
