import { useState, useRef, useEffect, useCallback } from 'react'
import { Document, Page, pdfjs } from 'react-pdf'
import 'react-pdf/dist/Page/AnnotationLayer.css'
import 'react-pdf/dist/Page/TextLayer.css'
import workerSrc from 'pdfjs-dist/build/pdf.worker.min.mjs?url'
import { ChevronLeft, ChevronRight, ZoomIn, ZoomOut, Download } from 'lucide-react'
import './AnnualReportViewer.css'

pdfjs.GlobalWorkerOptions.workerSrc = workerSrc

const SCALE_MIN = 0.6
const SCALE_MAX = 2.0
const SCALE_STEP = 0.2

// file       — imported PDF asset URL (pass via Vite import)
// downloadName — filename used for the browser download prompt
export default function AnnualReportViewer({ file, downloadName }) {
  const [numPages, setNumPages]       = useState(null)
  const [pageNumber, setPageNumber]   = useState(1)
  const [scale, setScale]             = useState(1.0)
  const [loading, setLoading]         = useState(true)
  const [pageLoading, setPageLoading] = useState(false)
  const [error, setError]             = useState(false)
  const [containerWidth, setContainerWidth] = useState(700)

  const containerRef = useRef(null)

  // Track container width for responsive page scaling
  useEffect(() => {
    const el = containerRef.current
    if (!el) return
    const observer = new ResizeObserver(([entry]) => {
      const w = entry.contentRect.width
      if (w > 0) setContainerWidth(w)
    })
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  const onDocumentLoadSuccess = useCallback(({ numPages }) => {
    setNumPages(numPages)
    setLoading(false)
  }, [])

  const onDocumentLoadError = useCallback(() => {
    setError(true)
    setLoading(false)
  }, [])

  const goToPrev = () => setPageNumber(p => Math.max(1, p - 1))
  const goToNext = () => setPageNumber(p => Math.min(numPages ?? 1, p + 1))
  const zoomIn   = () => setScale(s => Math.min(SCALE_MAX, +(s + SCALE_STEP).toFixed(1)))
  const zoomOut  = () => setScale(s => Math.max(SCALE_MIN, +(s - SCALE_STEP).toFixed(1)))

  // Effective page width = container minus padding, capped at 900px
  const pageWidth = Math.min(containerWidth - 48, 900) * scale

  return (
    <div className="arv">
      {/* ── Controls ── */}
      <div className="arv__controls" aria-label="PDF viewer controls">
        <div className="arv__controls-group">
          <button
            className="arv__btn"
            onClick={goToPrev}
            disabled={pageNumber <= 1}
            aria-label="Previous page"
          >
            <ChevronLeft size={18} />
          </button>
          <span className="arv__page-counter" aria-live="polite">
            {numPages ? `${pageNumber} / ${numPages}` : '— / —'}
          </span>
          <button
            className="arv__btn"
            onClick={goToNext}
            disabled={!numPages || pageNumber >= numPages}
            aria-label="Next page"
          >
            <ChevronRight size={18} />
          </button>
        </div>

        <div className="arv__controls-group">
          <button
            className="arv__btn"
            onClick={zoomOut}
            disabled={scale <= SCALE_MIN}
            aria-label="Zoom out"
          >
            <ZoomOut size={18} />
          </button>
          <span className="arv__zoom-label">{Math.round(scale * 100)}%</span>
          <button
            className="arv__btn"
            onClick={zoomIn}
            disabled={scale >= SCALE_MAX}
            aria-label="Zoom in"
          >
            <ZoomIn size={18} />
          </button>
        </div>
      </div>

      {/* ── Document canvas ── */}
      <div className="arv__canvas-wrap" ref={containerRef}>
        {error ? (
          <div className="arv__error">
            <p>Unable to load the PDF. Please try the download link below.</p>
          </div>
        ) : (
          <Document
            file={file}
            onLoadSuccess={onDocumentLoadSuccess}
            onLoadError={onDocumentLoadError}
            loading={null}
          >
            {/* Loading skeleton while document or page renders */}
            {(loading || pageLoading) && (
              <div className="arv__skeleton" aria-hidden="true">
                <div className="arv__skeleton-page" />
              </div>
            )}
            {!loading && (
              <Page
                key={`${pageNumber}-${scale}`}
                pageNumber={pageNumber}
                width={pageWidth}
                onRenderSuccess={() => setPageLoading(false)}
                onLoadSuccess={() => setPageLoading(true)}
                loading={null}
                renderAnnotationLayer={false}
                renderTextLayer={false}
              />
            )}
          </Document>
        )}
      </div>

      {/* ── Download link ── */}
      <div className="arv__footer">
        <a
          href={file}
          download={downloadName}
          className="arv__download"
          aria-label={`Download ${downloadName}`}
        >
          <Download size={15} />
          Download PDF
        </a>
      </div>
    </div>
  )
}
