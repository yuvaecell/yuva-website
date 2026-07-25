import AnnualReportViewer from '../../components/AnnualReportViewer/AnnualReportViewer'
import './About.css'

export default function About() {
  return (
    <div className="about-page">

      {/* ── Annual Report section — additional sections slot above/below here ── */}
      <section className="about-section about-report">
        <div className="container">
          <span className="eyebrow">Annual Report</span>
          <h2 className="about-section__heading">A Year in Review</h2>
          <p className="about-section__sub">
            Explore what Yuva accomplished this year — events, projects, and the community we built.
          </p>
          <AnnualReportViewer />
        </div>
      </section>

    </div>
  )
}
