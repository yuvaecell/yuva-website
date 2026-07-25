import { useState, useRef, useEffect, useCallback } from 'react'
import { Document, Page, pdfjs } from 'react-pdf'
import 'react-pdf/dist/Page/AnnotationLayer.css'
import 'react-pdf/dist/Page/TextLayer.css'
import workerSrc from 'pdfjs-dist/build/pdf.worker.min.mjs?url'
import { ChevronLeft, ChevronRight, ZoomIn, ZoomOut, Download } from 'lucide-react'
import './AnnualReportViewer.css'

pdfjs.GlobalWorkerOptions.workerSrc = workerSrc

const SCALE_STEP          = 0.15
const SCALE_MIN           = 0.25
const SCALE_MAX           = 3.0
const RESIZE_DEBOUNCE_MS  = 150

// file         — imported PDF asset URL (pass via Vite import)
// downloadName — filename used for the browser download prompt
export default function AnnualReportViewer({ file, downloadName }) {
  const [numPages, setNumPages]           = useState(null)
  const [pageNumber, setPageNumber]       = useState(1)
  const [scale, setScale]                 = useState(1.0)
  const [nativePageWidth, setNativePageWidth] = useState(null)
  const [loading, setLoading]             = useState(true)
  const [pageLoading, setPageLoading]     = useState(false)
  const [error, setError]                 = useState(false)
  const [containerWidth, setContainerWidth] = useState(null)

  const containerRef = useRef(null)
  const debounceRef  = useRef(null)

  // Measure container width; debounce so resize doesn't fire every frame
  useEffect(() => {
    const el = containerRef.current
    if (!el) return
    const observer = new ResizeObserver(([entry]) => {
      const w = entry.contentRect.width
      if (w <= 0) return
      clearTimeout(debounceRef.current)
      debounceRef.current = setTimeout(() => setContainerWidth(w), RESIZE_DEBOUNCE_MS)
    })
    observer.observe(el)
    return () => {
      observer.disconnect()
      clearTimeout(debounceRef.current)
    }
  }, [])

  // Recompute fit-to-width scale whenever container width or native page width changes.
  // This snaps back to fit after a window resize, giving a consistent baseline.
  useEffect(() => {
    if (!containerWidth || !nativePageWidth) return
    const availableWidth = containerWidth - 48 // subtract canvas left+right padding
    const computed = Math.min(
      Math.max(availableWidth / nativePageWidth, SCALE_MIN),
      SCALE_MAX
    )
    setScale(computed)
  }, [containerWidth, nativePageWidth])

  const onDocumentLoadSuccess = useCallback((pdf) => {
    setNumPages(pdf.numPages)
    // Fetch the first page to determine its native pixel dimensions at scale 1,
    // so we can compute a true fit-to-width scale before showing the page.
    pdf.getPage(1).then((page) => {
      const viewport = page.getViewport({ scale: 1 })
      setNativePageWidth(viewport.width)
      setLoading(false) // show the page only after native width is known
    })
  }, [])

  const onDocumentLoadError = useCallback(() => {
    setError(true)
    setLoading(false)
  }, [])

  const goToPrev = () => setPageNumber(p => Math.max(1, p - 1))
  const goToNext = () => setPageNumber(p => Math.min(numPages ?? 1, p + 1))
  const zoomIn   = () => setScale(s => Math.min(SCALE_MAX, parseFloat((s + SCALE_STEP).toFixed(3))))
  const zoomOut  = () => setScale(s => Math.max(SCALE_MIN, parseFloat((s - SCALE_STEP).toFixed(3))))

  // Rendered page width in CSS pixels.
  // If native width isn't known yet, fall back to filling the container.
  const pageWidth = nativePageWidth
    ? nativePageWidth * scale
    : (containerWidth ? containerWidth - 48 : 700)

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
            {/* Skeleton shown until document + native dimensions are known, or while a page renders */}
            {(loading || pageLoading) && (
              <div className="arv__skeleton" aria-hidden="true">
                <div className="arv__skeleton-page" />
              </div>
            )}
            {!loading && (
              <Page
                key={pageNumber}
                pageNumber={pageNumber}
                width={pageWidth}
                onLoadSuccess={() => setPageLoading(true)}
                onRenderSuccess={() => setPageLoading(false)}
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
