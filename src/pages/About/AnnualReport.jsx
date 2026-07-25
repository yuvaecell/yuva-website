import AnnualReportViewer from '../../components/AnnualReportViewer/AnnualReportViewer'
import pdf2526 from '../../assets/documents/annual-report-25-26.pdf'
import pdf2425 from '../../assets/documents/annual-report-24-25.pdf'
import buildingPhoto from '../../assets/photos/buildings.png'
import './AnnualReport.css'

export default function AnnualReport() {
  const bgStyle = { backgroundImage: `url(${buildingPhoto})` }

  return (
    <div className="ar-page">

      {/* ── Page header — dark building bg ───────────────────────── */}
      <section className="ar-section ar-header bg-buildings" style={bgStyle}>
        <div className="container">
          <span className="eyebrow">Annual Report</span>
          <h1 className="ar-header__heading">Our Year in Review</h1>
          <p className="ar-header__sub">
            Read through what Yuva built, launched, and accomplished — year by year.
          </p>
        </div>
      </section>

      {/* ── 2025-26 viewer ───────────────────────────────────────── */}
      <section className="ar-section ar-viewer-section">
        <div className="container">
          <p className="ar-year-label eyebrow">2025–26</p>
          <AnnualReportViewer
            file={pdf2526}
            downloadName="YUVA-Annual-Report-2025-26.pdf"
          />
        </div>
      </section>

      {/* ── 2024-25 viewer ───────────────────────────────────────── */}
      <section className="ar-section ar-viewer-section">
        <div className="container">
          <p className="ar-year-label eyebrow">2024–25</p>
          <AnnualReportViewer
            file={pdf2425}
            downloadName="YUVA-Annual-Report-2024-25.pdf"
          />
        </div>
      </section>

    </div>
  )
}
