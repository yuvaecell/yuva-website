import { useState } from 'react'
import './Join.css'

// Recruitment cycle Apps Script endpoint — swap this when a new intake
// starts writing to a different Sheet.
const RECRUITMENT_FORM_ENDPOINT =
  'https://script.google.com/macros/s/AKfycbw_IK7AOWig1jhh41qyUcCQawwSSA6G0mAAF2kxn_T3dnqvaYNPRbYJ-bvXeGgD2UWR/exec'

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const PHONE_PATTERN = /^\d{7,15}$/

const EMPTY_FORM = {
  name: '',
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
  const [submitting, setSubmitting] = useState(false)

  function handleChange(e) {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  function validate() {
    const next = {}
    if (!form.name.trim()) next.name = 'Please enter your name.'
    if (!form.email.trim()) next.email = 'Please enter your email.'
    else if (!EMAIL_PATTERN.test(form.email.trim())) next.email = 'Enter a valid email address.'
    if (!form.course.trim()) next.course = 'Please enter your course.'
    if (!form.class.trim()) next.class = 'Please enter your class.'
    if (!form.contact.trim()) next.contact = 'Please enter your contact number.'
    else if (!PHONE_PATTERN.test(form.contact.trim())) next.contact = 'Enter a valid contact number.'
    return next
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setSubmitError('')

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
    } catch {
      setSubmitError('Something went wrong, please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="join-page">
      <section className="join-hero">
        <div className="container join-hero__inner">
          <span className="eyebrow">Join Us</span>
          <h1 className="join-hero__heading">Apply to Yuva</h1>
          <p className="join-hero__body">
            Applications are open. Fill out the form below and we'll be in touch.
          </p>

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
              <input
                type="text"
                id="course"
                name="course"
                value={form.course}
                onChange={handleChange}
                aria-invalid={Boolean(errors.course)}
              />
              {errors.course && <span className="join-form__error">{errors.course}</span>}
            </div>

            <div className="join-form__field">
              <label htmlFor="class">Class</label>
              <input
                type="text"
                id="class"
                name="class"
                value={form.class}
                onChange={handleChange}
                aria-invalid={Boolean(errors.class)}
              />
              {errors.class && <span className="join-form__error">{errors.class}</span>}
            </div>

            <div className="join-form__field">
              <label htmlFor="contact">Contact Number</label>
              <input
                type="tel"
                id="contact"
                name="contact"
                value={form.contact}
                onChange={handleChange}
                aria-invalid={Boolean(errors.contact)}
              />
              {errors.contact && <span className="join-form__error">{errors.contact}</span>}
            </div>

            <div className="join-form__submit-row">
              <button type="submit" className="btn btn--primary" disabled={submitting}>
                {submitting ? 'Submitting…' : 'Submit application'}
              </button>
              {submitError && <span className="join-form__error">{submitError}</span>}
            </div>
          </form>
        </div>
      </section>
    </div>
  )
}
