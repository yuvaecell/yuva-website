import { useState } from 'react'
import teamPhoto from '../../assets/photos/teamphoto.png'
import BgBuildingsLayer from '../../components/BgBuildingsLayer/BgBuildingsLayer'
import './Join.css'

// Flip this to true to reopen the recruitment form.
const REGISTRATIONS_OPEN = false

// Recruitment cycle Apps Script endpoint — swap this when a new intake
// starts writing to a different Sheet.
const RECRUITMENT_FORM_ENDPOINT =
  'https://script.google.com/macros/s/AKfycbw_IK7AOWig1jhh41qyUcCQawwSSA6G0mAAF2kxn_T3dnqvaYNPRbYJ-bvXeGgD2UWR/exec'

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const EMAIL_DOMAIN = '@sscbs.du.ac.in'
const ROLL_PATTERN = /^\d{5}$/
const CONTACT_PATTERN = /^\d{10}$/

const COURSE_OPTIONS = ['BMS', 'BBA(FIA)', 'Bsc (H) CS']

const CLASS_OPTIONS_BY_COURSE = {
  'BMS': ['BMS1A', 'BMS1B', 'BMS1C', 'BMS1D'],
  'BBA(FIA)': ['BFIA1A', 'BFIA1B'],
  'Bsc (H) CS': ['BSC1'],
}

const EMPTY_FORM = {
  name: '',
  roll: '',
  email: '',
  course: '',
  class: '',
  contact: '',
}

export default function Join() {
  const [form, setForm] = useState(EMPTY_FORM)
  const [honeypot, setHoneypot] = useState('')
  const [errors, setErrors] = useState({})
  const [submitError, setSubmitError] = useState('')
  const [submitSuccess, setSubmitSuccess] = useState(false)
  const [submitting, setSubmitting] = useState(false)

  const bgStyle = { backgroundImage: `url(${teamPhoto})` }
  const classOptions = CLASS_OPTIONS_BY_COURSE[form.course] || []

  function handleChange(e) {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
    setSubmitSuccess(false)
  }

  function handleCourseChange(e) {
    const course = e.target.value
    const options = CLASS_OPTIONS_BY_COURSE[course] || []
    const nextClass = options.length === 1 ? options[0] : ''
    setForm((prev) => ({ ...prev, course, class: nextClass }))
    setSubmitSuccess(false)
  }

  function validate() {
    const next = {}
    if (!form.name.trim()) next.name = 'Please enter your name.'
    if (!form.roll.trim()) next.roll = 'Please enter your roll number.'
    else if (!ROLL_PATTERN.test(form.roll.trim())) next.roll = 'Roll number must be 5 digits.'
    if (!form.email.trim()) next.email = 'Please enter your email.'
    else if (!EMAIL_PATTERN.test(form.email.trim())) next.email = 'Enter a valid email address.'
    else if (!form.email.trim().toLowerCase().endsWith(EMAIL_DOMAIN)) next.email = 'Use your SSCBS email address (@sscbs.du.ac.in).'
    if (!form.course.trim()) next.course = 'Please select your course.'
    if (!form.class.trim()) next.class = 'Please select your class.'
    if (!form.contact.trim()) next.contact = 'Please enter your contact number.'
    else if (!CONTACT_PATTERN.test(form.contact.trim())) next.contact = 'Enter a valid 10-digit phone number.'
    return next
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setSubmitError('')
    setSubmitSuccess(false)

    if (honeypot) return

    const validationErrors = validate()
    setErrors(validationErrors)
    if (Object.keys(validationErrors).length > 0) return

    setSubmitting(true)
    try {
      await fetch(RECRUITMENT_FORM_ENDPOINT, {
        method: 'POST',
        mode: 'no-cors',
        body: new URLSearchParams(form),
      })
      setForm(EMPTY_FORM)
      setErrors({})
      setSubmitSuccess(true)
    } catch {
      setSubmitError('Something went wrong, please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="join-page">
      <section className="join-hero bg-buildings" style={bgStyle}>
        <BgBuildingsLayer image={teamPhoto} />
        <div className="container join-hero__inner">
          <div className="join-hero__intro">
            <span className="eyebrow">Join Us</span>
            <h1 className="join-hero__heading">Apply to Yuva</h1>
            <p className="join-hero__body">
              Fill out the form below, and we'll be in touch.
            </p>
          </div>

          <div className="join-form-card">
            {!REGISTRATIONS_OPEN ? (
              <p className="join-form__closed">
                Recruitments are over.
              </p>
            ) : (
            <form className="join-form" onSubmit={handleSubmit} noValidate>
              <div
                className="join-form__honeypot"
                aria-hidden="true"
              >
                <label htmlFor="company">Company</label>
                <input
                  type="text"
                  id="company"
                  name="company"
                  tabIndex="-1"
                  autoComplete="off"
                  value={honeypot}
                  onChange={(e) => setHoneypot(e.target.value)}
                />
              </div>

              <div className="join-form__field">
                <label htmlFor="name">Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  aria-invalid={Boolean(errors.name)}
                />
                {errors.name && <span className="join-form__error">{errors.name}</span>}
              </div>

              <div className="join-form__field">
                <label htmlFor="roll">Roll Number</label>
                <input
                  type="text"
                  id="roll"
                  name="roll"
                  inputMode="numeric"
                  maxLength={5}
                  value={form.roll}
                  onChange={handleChange}
                  aria-invalid={Boolean(errors.roll)}
                />
                {errors.roll && <span className="join-form__error">{errors.roll}</span>}
              </div>

              <div className="join-form__field">
                <label htmlFor="contact">Contact Number</label>
                <input
                  type="tel"
                  id="contact"
                  name="contact"
                  inputMode="numeric"
                  maxLength={10}
                  value={form.contact}
                  onChange={handleChange}
                  aria-invalid={Boolean(errors.contact)}
                />
                {errors.contact && <span className="join-form__error">{errors.contact}</span>}
              </div>

              <div className="join-form__field">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  aria-invalid={Boolean(errors.email)}
                />
                {errors.email && <span className="join-form__error">{errors.email}</span>}
              </div>

              <div className="join-form__field">
                <label htmlFor="course">Course</label>
                <select
                  id="course"
                  name="course"
                  value={form.course}
                  onChange={handleCourseChange}
                  aria-invalid={Boolean(errors.course)}
                >
                  <option value="" disabled>Select course</option>
                  {COURSE_OPTIONS.map((course) => (
                    <option key={course} value={course}>{course}</option>
                  ))}
                </select>
                {errors.course && <span className="join-form__error">{errors.course}</span>}
              </div>

              <div className="join-form__field">
                <label htmlFor="class">Class</label>
                <select
                  id="class"
                  name="class"
                  value={form.class}
                  onChange={handleChange}
                  disabled={!form.course}
                  aria-invalid={Boolean(errors.class)}
                >
                  <option value="" disabled>
                    {form.course ? 'Select class' : 'Select course first'}
                  </option>
                  {classOptions.map((cls) => (
                    <option key={cls} value={cls}>{cls}</option>
                  ))}
                </select>
                {errors.class && <span className="join-form__error">{errors.class}</span>}
              </div>

              <div className="join-form__submit-row">
                <button type="submit" className="btn btn--primary" disabled={submitting}>
                  {submitting ? 'Submitting…' : 'Submit application'}
                </button>
                {submitError && <span className="join-form__error">{submitError}</span>}
                {submitSuccess && <span className="join-form__success">Submitted successfully.</span>}
              </div>
            </form>
            )}
          </div>
        </div>
      </section>
    </div>
  )
}
