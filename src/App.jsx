import { useState, useEffect } from 'react'

const PHONE = "8849646002"
const EMAIL = "thegreenindiabms@gmail.com"
const BRAND = "The Green India Biomass Suppliers"
const WHATSAPP = `https://wa.me/91${PHONE}?text=${encodeURIComponent("Hello, I have a requirement for wet cow dung. I would like to discuss quantity, location and supply.")}`

const industries = [
  ["CBG & Biogas Plants", "For anaerobic digestion and biogas/CBG production."],
  ["Organic Manure & Fertilizer", "For businesses producing organic manure, soil inputs and fertilizer products."],
  ["Vermicompost Units", "For commercial vermicomposting operations using cow dung as a feedstock."],
  ["Cow-Dung Product Manufacturers", "For businesses producing cow-dung-based products such as cakes, powder and other applications."],
  ["Biomass & Bioenergy Applications", "For businesses exploring cow dung and biomass as feedstock for energy-related applications."],
  ["Other Industrial Applications", "For businesses with specific bulk cow-dung requirements."],
]

const industryIcons = [
  <><path d="M12 22c4 0 7-3 7-7 0-3-2-5-5-8 0 3-1 4-2 5-1-3-3-5-3-5 0 4-4 6-4 10a7 7 0 0 0 7 5Z" /><path d="M12 22V10" /><path d="M12 14c-4 0-6-2-6-5 4 0 6 2 6 5Z" /><path d="M12 11c0-4 2-6 6-6 0 4-2 6-6 6Z" /><path d="M5 22h14" /></>,
  <><path d="M7 7H3l3-3" /><path d="M3 7a9 9 0 0 1 15-3l2 2" /><path d="M17 17h4l-3 3" /><path d="M21 17a9 9 0 0 1-15 3l-2-2" /><path d="m9 12 2 2 4-5" /></>,
  <><path d="M3 21V8l6 3V7l6 4V4h6v17Z" /><path d="M7 16v1M12 16v1M17 16v1" /></>,
  <><path d="M20 4c-8 0-14 3-14 10a6 6 0 0 0 6 6c7 0 8-8 8-16Z" /><path d="M4 21c3-5 7-8 12-11" /></>,
  <><path d="m12 3 9 5-9 5-9-5 9-5Z" /><path d="M3 8v9l9 5 9-5V8" /><path d="M12 13v9M7.5 5.5l9 5" /></>,
]

const whyIcons = [
  <><path d="M12 3v18M5 7h14M7 7l-4 7h8L7 7ZM17 7l-4 7h8l-4-7Z" /><path d="M5 21h14" /></>,
  <><path d="M7 7h10a3 3 0 1 0-3-3" /><path d="M17 17H7a3 3 0 1 0 3 3" /><circle cx="6" cy="7" r="2" /><circle cx="18" cy="17" r="2" /></>,
  <><path d="M20 10c0 5-8 12-8 12S4 15 4 10a8 8 0 1 1 16 0Z" /><circle cx="12" cy="10" r="2.5" /></>,
  <><rect x="3" y="7" width="13" height="12" rx="2" /><path d="M16 11h3l3 3v5h-6M7 19a2 2 0 1 0 4 0M17 19a2 2 0 1 0 4 0" /></>,
  <><circle cx="9" cy="8" r="3" /><path d="M3 20v-1a6 6 0 0 1 12 0v1M16 5a3 3 0 0 1 0 6M18 14a5 5 0 0 1 3 5v1" /></>,
]

const why = [
  ["Bulk Sourcing", "Access to bulk wet cow dung through our sourcing network."],
  ["Requirement-Based Supply", "We discuss quantity, location and frequency before arranging supply."],
  ["Gujarat-Based Network", "Our current sourcing activity is centred around Vadodara and Gujarat."],
  ["Flexible Logistics", "Transportation is arranged according to the destination and order requirement."],
  ["Direct B2B Communication", "Speak directly with us regarding your raw-material requirement."],
]

const steps = [
  ["Share Your Requirement", "Tell us the quantity, application, delivery location and frequency."],
  ["Requirement Evaluation", "We check material availability and the logistics involved."],
  ["Commercial Discussion", "We discuss pricing, quantity, delivery terms and other requirements."],
  ["Dispatch", "Once the order is confirmed, the material is arranged and dispatched according to the agreed terms."],
]

const navLinks = [["Home", "home"], ["About", "about"], ["Our Supply", "supply"], ["Industries", "industries"], ["How We Work", "process"], ["Contact", "contact"]]

const quoteFields = [
  { n: "Full Name", l: "Full Name", req: true },
  { n: "Company Name", l: "Company Name", req: true },
  { n: "Phone", l: "Phone Number", t: "tel", req: true },
  { n: "Email", l: "Email", t: "email", req: true },
  { n: "City / State", l: "City / State" },
  { n: "Required Quantity", l: "Required Quantity (e.g. 10 tonnes)", req: true },
  { n: "Frequency", l: "Requirement Frequency", t: "select", opts: ["One-time", "Daily", "Weekly", "Monthly", "Other"] },
  { n: "Application", l: "Application / Intended Use" },
  { n: "Delivery Location", l: "Delivery Location", req: true },
  { n: "Additional Requirements", l: "Additional Requirements", t: "area" },
]

const queryFields = [
  { n: "Name", l: "Name", req: true },
  { n: "Phone", l: "Phone Number", t: "tel", req: true },
  { n: "Email", l: "Email", t: "email" },
  { n: "Company Name", l: "Company Name" },
  { n: "Query", l: "Your Query", t: "area", req: true },
]

function MailForm({ subject, fields, button, wide }) {
  const [status, setStatus] = useState("idle")

  const submit = async (e) => {
    e.preventDefault()
    const form = e.currentTarget
    const data = Object.fromEntries(new FormData(form).entries())
    if (data.botcheck) return // honeypot

    setStatus("sending")
    try {
      const res = await fetch(`https://formsubmit.co/ajax/${EMAIL}`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({ _subject: subject, ...data }),
      })
      if (!res.ok) throw new Error("failed")
      setStatus("done")
      form.reset()
    } catch {
      setStatus("error")
    }
  }

  if (status === "done") {
    return <div className="thanks" role="status">Thank you. Your requirement has been received. Our team will contact you shortly.</div>
  }

  return (
    <form onSubmit={submit} className={wide ? "form wide" : "form"}>
      <input type="text" name="botcheck" className="hp" tabIndex={-1} autoComplete="off" />
      {fields.map((f) => (
        <label key={f.n} className={f.t === "area" ? "full" : ""}>
          <span>{f.l}{f.req && " *"}</span>
          {f.t === "area" ? (
            <textarea name={f.n} rows={4} required={f.req} />
          ) : f.t === "select" ? (
            <select name={f.n}>{f.opts.map((o) => <option key={o}>{o}</option>)}</select>
          ) : (
            <input name={f.n} type={f.t ?? "text"} required={f.req} />
          )}
        </label>
      ))}
      <button className="btn primary full" disabled={status === "sending"}>
        {status === "sending" ? "Sending…" : button}
      </button>
      {status === "error" && (
        <p className="err full">Could not send. Please email {EMAIL} or use WhatsApp.</p>
      )}
    </form>
  )
}

function useScrollReveal() {
  useEffect(() => {
    if (!("IntersectionObserver" in window)) return
    const els = document.querySelectorAll(".hero .wrap, .sec > .wrap, .card, .why-card, .steps li, .stats > div, .product, .qbox, footer .foot, footer .copy")
    els.forEach((el) => el.classList.add("scroll-reveal"))
    document.body.classList.add("reveal-ready")
    const io = new IntersectionObserver(
      (entries, obs) => entries.forEach((en) => {
        if (en.isIntersecting) { en.target.classList.add("is-visible"); obs.unobserve(en.target) }
      }),
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    )
    els.forEach((el) => io.observe(el))
    return () => { io.disconnect(); document.body.classList.remove("reveal-ready") }
  }, [])
}

export default function App() {
  const [open, setOpen] = useState(false)
  useScrollReveal()

  useEffect(() => {
    const nav = document.querySelector(".nav")
    if (!nav) return
    const onScroll = () => nav.classList.toggle("scrolled", window.scrollY > 10)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <>
      <header className="nav">
        <a href="#home" className="logo" aria-label={`${BRAND} home`}>
          <img src="/logo-mark.png" alt="" />
          <span><b>The Green India</b><small>Biomass Suppliers</small></span>
        </a>
        <nav className={open ? "open" : ""}>
          {navLinks.map(([label, id]) => (
            <a key={id} href={`#${id}`} onClick={() => setOpen(false)}>{label}</a>
          ))}
          <a className="btn ghost sm" href={WHATSAPP} target="_blank" rel="noreferrer">WhatsApp Us</a>
          <a className="btn primary sm" href="#quote" onClick={() => setOpen(false)}>Send Requirement</a>
        </nav>
        <button className="burger" aria-label="Menu" onClick={() => setOpen(!open)}>{open ? "✕" : "☰"}</button>
      </header>

      <section id="home" className="hero bg1">
        <div className="wrap">
          <h1>Bulk Wet Cow Dung Supply for Industrial Applications</h1>
          <p className="lead">{BRAND} connects businesses with bulk wet cow dung sourced from Gujarat for use as an industrial and commercial raw material.</p>
          <ul className="strip">
            <li>Vadodara, Gujarat</li>
            <li>Bulk Availability</li>
            <li>B2B Supply</li>
            <li>Requirement-Based Dispatch</li>
          </ul>
        </div>
      </section>

      <section id="about" className="sec">
        <div className="wrap two">
          <div><h2>About {BRAND}</h2></div>
          <div className="prose">
            <p>{BRAND} is a Vadodara-based B2B raw-material supply business focused on the sourcing and supply of wet cow dung for commercial and industrial applications.</p>
            <p>We work with supply sources and arrange bulk quantities based on buyer requirements, location and logistics.</p>
            <p className="pull">Connect reliable raw-material availability with businesses that require cow dung for their operations.</p>
            <p>We aim to build long-term B2B relationships by understanding the buyer's quantity, specification, delivery location and frequency before arranging supply.</p>
          </div>
        </div>
      </section>

      <section id="supply" className="sec alt">
        <div className="wrap">
          <h2>Our Primary Supply</h2>
          <div className="product">
            <div>
              <h3>Wet Cow Dung</h3>
              <p>Fresh wet cow dung supplied in bulk for businesses and processing units that use cattle dung as a raw material.</p>
              <p className="note">Actual quantity, availability and delivery schedule are confirmed based on individual requirements.</p>
            </div>
            <dl>
              {[["Material", "Wet cow dung"], ["Form", "Bulk"], ["Origin", "Gujarat"], ["Current sourcing access", "Approximately 15 tonnes/day"], ["Supply model", "Requirement-based"], ["Delivery", "Arranged according to destination and order quantity"]].map(([k, v]) => (
                <div key={k}><dt>{k}</dt><dd>{v}</dd></div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      <section className="sec dark bg2">
        <div className="wrap">
          <h2>Built for Bulk Requirements</h2>
          <p className="lead">Our current sourcing network gives us access to approximately 15 tonnes/day of wet cow dung, allowing us to cater to bulk requirements depending on availability, order size and destination.</p>
          <div className="stats">
            <div><b>~15 T/day</b><span>Current sourcing access</span></div>
            <div><b>Bulk Orders</b><span>Requirement-based supply</span></div>
            <div><b>Vadodara, Gujarat</b><span>Primary sourcing region</span></div>
          </div>
          <p className="hl">Need a different quantity? Tell us your requirement. We will evaluate availability and logistics for your location.</p>
          <p className="small">Quantities are subject to availability, order requirements and logistics.</p>
        </div>
      </section>

      <section id="industries" className="sec">
        <div className="wrap">
          <h2>Who We Supply To</h2>
          <p className="lead dk">Wet cow dung can serve as a raw material across multiple biological, agricultural and biomass-related applications. Potential applications include the areas below. We evaluate requirements based on the buyer's application and specifications.</p>
          <div className="grid">
            {industries.map(([title, desc], i) => (
              <article className="card" key={title}>
                <span className="industry-icon" aria-hidden="true">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">{industryIcons[i % industryIcons.length]}</svg>
                </span>
                <h3>{title}</h3>
                <p>{desc}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="sec alt">
        <div className="wrap">
          <p className="eyebrow">Why Choose Us</p>
          <h2>Why Work With Us?</h2>
          <div className="why-grid">
            {why.map(([title, desc], i) => (
              <article className="why-card" key={title}>
                <span className="why-icon" aria-hidden="true">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">{whyIcons[i % whyIcons.length]}</svg>
                </span>
                <h3>{title}</h3>
                <p>{desc}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="process" className="sec">
        <div className="wrap">
          <h2>How We Work</h2>
          <ol className="steps">
            {steps.map(([title, desc], i) => (
              <li key={title}><i>0{i + 1}</i><h3>{title}</h3><p>{desc}</p></li>
            ))}
          </ol>
        </div>
      </section>

      <section className="sec alt bg3">
        <div className="wrap two">
          <div>
            <h2>Supply & Logistics</h2>
            <p className="prose">Our primary sourcing region is Vadodara, Gujarat. Transportation is arranged according to the destination, quantity and order requirements.</p>
            <p className="note">Transportation cost and delivery timelines vary by destination, quantity and vehicle availability and are confirmed before dispatch.</p>
          </div>
          <dl className="info">
            {[["Current material", "Wet cow dung"], ["Primary sourcing region", "Vadodara, Gujarat"], ["Supply format", "Bulk"], ["Transport", "Requirement-based"], ["Order size", "Discuss with our team"]].map(([k, v]) => (
              <div key={k}><dt>{k}</dt><dd>{v}</dd></div>
            ))}
          </dl>
        </div>
      </section>

      <section id="quote" className="sec">
        <div className="wrap narrow">
          <h2>Have a Bulk Cow Dung Requirement?</h2>
          <p className="lead dk">Tell us what you need. We'll check availability and get back to you.</p>
          <MailForm subject="New Bulk Requirement" fields={quoteFields} button="Submit Requirement" wide />
        </div>
      </section>

      <section className="sec final bg1">
        <div className="wrap">
          <h2>Looking for wet cow dung in bulk?</h2>
          <p className="lead">Tell us your quantity and delivery location. We'll check availability and get back to you.</p>
          <a className="btn primary" href="#quote">Send Your Requirement</a>
        </div>
      </section>

      <section id="contact" className="sec">
        <div className="wrap two">
          <div>
            <h2>Let's Discuss Your Requirement</h2>
            <address>
              <strong>{BRAND}</strong><br />
              📍 Vadodara, Gujarat, India<br />
              📞 <a href={`tel:+91${PHONE}`}>{PHONE}</a><br />
              ✉️ <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
            </address>
            <div className="ctas">
              <a className="btn primary" href={`tel:+91${PHONE}`}>Call Us</a>
              <a className="btn ghost" href={WHATSAPP} target="_blank" rel="noreferrer">WhatsApp Us</a>
              <a className="btn ghost" href={`mailto:${EMAIL}`}>Send Email</a>
            </div>
          </div>
          <div className="qbox">
            <h3>Have a Question or Specific Requirement?</h3>
            <p>Whether you are looking for wet cow dung, want to discuss a bulk requirement, or simply want to understand our supply capabilities, send us your query.</p>
            <MailForm subject="New Query" fields={queryFields} button="Send Query" />
          </div>
        </div>
      </section>

      <footer>
        <div className="wrap foot">
          <div><b>{BRAND}</b><p>Bulk Wet Cow Dung Supply | Vadodara, Gujarat</p></div>
          <div className="fl">
            {navLinks.filter(([n]) => n !== "How We Work").map(([n, id]) => (
              <a key={id} href={`#${id}`}>{n}</a>
            ))}
          </div>
          <div><p>{PHONE}</p><p>{EMAIL}</p></div>
        </div>
        <p className="copy">© 2026 {BRAND}. All rights reserved.<br />Supply quantities and availability are subject to sourcing availability, buyer requirements and logistics.</p>
      </footer>
    </>
  )
}
