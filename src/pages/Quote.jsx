import { useState, useRef, useEffect } from "react";
import BookingModal from "../components/BookingModal";
import SEO from "../components/SEO";
import "./Quote.css";

const API_URL = (
  import.meta.env.VITE_API_URL ||
  (import.meta.env.DEV ? "http://localhost:5000" : "")
).replace(/\/$/, "");

const services = [
  "Vinyl Wrap",
  "Window Tinting(Sedan/Coupe)",
  "Window Tinting(SUV/Truck)",
  "Suspension Work",
  "Exterior Installation",
  "Other",
];
const estimates = {
  "Vinyl Wrap": {
    min: 1500,
    max: 3500,
    note: "Depends on vehicle size, vinyl, and coverage.",
  },
  "Window Tinting(Sedan/Coupe)": {
    min: 300,
    max: 500,
    note: "Depends on windows being tinted.",
  },
  "Window Tinting(SUV/Truck)": {
    min: 350,
    max: 550,
    note: "Depends on windows being tinted.",
  },
  "Suspension Work": {
    min: 300,
    max: 1500,
    note: "Parts and labor can significantly affect the total.",
  },
  "Exterior Installation": {
    min: 100,
    max: 800,
    note: "Depends on the parts and installation complexity.",
  },
  Other: null,
};

export default function Quote() {
  const [selectedService, setSelectedService] = useState("");
  const [sending, setSending] = useState(false);
  const [status, setStatus] = useState("");
  const [windshieldTint, setWindshieldTint] = useState(false);

  const [bookingOpen, setBookingOpen] = useState(false);
  const [bookingVehicleType, setBookingVehicleType] = useState("sedan");

  const submittingRef = useRef(false);

  const confirmationRef = useRef(null);

  useEffect(() => {
    if (status === "success") {
      confirmationRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
  }, [status]);

  async function handleSubmit(event) {
    event.preventDefault();

    if (
      selectedService === "Window Tinting(Sedan/Coupe)" ||
      selectedService === "Window Tinting(SUV/Truck)"
    ) {
      setBookingVehicleType(
        selectedService === "Window Tinting(SUV/Truck)" ? "suv" : "sedan",
      );
      setBookingOpen(true);
      return;
    }

    if (submittingRef.current) return;

    const form = event.currentTarget;
    const data = new FormData(form);

    const estimate = estimates[selectedService];

    const payload = {
      name: data.get("name"),
      email: data.get("email"),
      phone: data.get("phone"),
      year: data.get("year"),
      make: data.get("make"),
      model: data.get("model"),
      service: selectedService,
      budget: data.get("budget"),
      contact: data.get("contact"),
      details: data.get("details"),
      estimatedQuote: estimate
        ? `$${estimate.min.toLocaleString("en-US")} – $${estimate.max.toLocaleString("en-US")}`
        : "Custom estimate required",
    };

    submittingRef.current = true;
    setSending(true);
    setStatus("");

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 20000);

    try {
      const response = await fetch(
        `${API_URL}/api/quote`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
          signal: controller.signal,
        },
      );

      const result = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(
          result.message || "Failed to send your request. Please try again.",
        );
      }

      setStatus("success");
      form.reset();
      setSelectedService("");
    } catch (error) {
      console.error("Quote submission error:", error);

      if (error.name === "AbortError") {
        setStatus(
          "The request timed out. Please check your connection before trying again.",
        );
      } else {
        setStatus(
          error.message || "Something went wrong. Please try again later.",
        );
      }
    } finally {
      clearTimeout(timeoutId);
      submittingRef.current = false;
      setSending(false);
    }
  }
  return (
    <main className="quote-page">
      <SEO
        title="Request a Vehicle Restyling Quote | KCSTANCESHOP"
        description="Request a quote for vehicle wraps, window tint, suspension, or exterior upgrades from KCSTANCESHOP in Olathe, KS. Tell us about your vehicle and project."
      />
      <header className="quote-header container">
        <span className="section-label">KC STANCE SHOP / LET'S TALK</span>

        <h1>
          START YOUR
          <br />
          <span>BUILD.</span>
        </h1>

        <p>
          Tell us about your vehicle and what you have in mind. Share a few
          details below so we can get a better understanding of your project.
        </p>
      </header>

      <section className="quote-content container">
        <aside className="quote-sidebar">
          <span className="quote-sidebar-label">YOUR PROJECT STARTS HERE</span>

          <h2>
            GOOD BUILDS
            <br />
            START WITH
            <br />
            <span>A PLAN.</span>
          </h2>

          <p>
            Whether you have a complete vision or just an idea, tell us about
            it. We'll have a better starting point for discussing your project.
          </p>

          <div className="quote-steps">
            <div className="quote-step">
              <span>01</span>
              <p>Tell us about your vehicle</p>
            </div>

            <div className="quote-step">
              <span>02</span>
              <p>Describe the work you want</p>
            </div>

            <div className="quote-step">
              <span>03</span>
              <p>We'll discuss the next steps</p>
            </div>
          </div>
        </aside>

        <div className="quote-form-wrapper">
          <div className="quote-form-heading">
            <span className="section-label">PROJECT DETAILS / 01</span>
            <h2>REQUEST A QUOTE</h2>
            <p>Fields marked with * are required.</p>
          </div>

          {status === "success" && (
            <p
              ref={confirmationRef}
              className="quote-notice success"
              role="status"
              tabIndex={-1}
            >
              Your quote request has been sent successfully! A confirmation
              email has been sent to your inbox. We'll review your project and
              get back to you.
            </p>
          )}

          {status && status !== "success" && (
            <p className="quote-notice error" role="alert">
              {status}
            </p>
          )}

          <form className="quote-form" onSubmit={handleSubmit}>
            <div className="quote-field">
              <label htmlFor="service">WHAT SERVICE DO YOU NEED? *</label>
              <select
                id="service"
                name="service"
                value={selectedService}
                onChange={(event) => setSelectedService(event.target.value)}
                required
              >
                <option value="" disabled>
                  Select a service
                </option>

                {services.map((service) => (
                  <option value={service} key={service}>
                    {service}
                  </option>
                ))}
              </select>
            </div>

            <div className="quote-field">
              <label>YOUR VEHICLE</label>

              <div className="quote-vehicle-grid">
                <div>
                  <label htmlFor="year" className="quote-sub-label">
                    YEAR
                  </label>
                  <input
                    id="year"
                    name="year"
                    placeholder="e.g. 2020"
                    maxLength={4}
                    inputMode="numeric"
                  />
                </div>

                <div>
                  <label htmlFor="make" className="quote-sub-label">
                    MAKE
                  </label>
                  <input id="make" name="make" placeholder="e.g. Honda" />
                </div>

                <div>
                  <label htmlFor="model" className="quote-sub-label">
                    MODEL
                  </label>
                  <input id="model" name="model" placeholder="e.g. Civic" />
                </div>
              </div>
            </div>
            {selectedService && (
              <div className="estimate-box" aria-live="polite">
                <span className="estimate-label">ESTIMATED QUOTE</span>

                {estimates[selectedService] ? (
                  <>
                    <strong>
                      ${estimates[selectedService].min.toLocaleString("en-US")}
                      {" – "}$
                      {estimates[selectedService].max.toLocaleString("en-US")}
                    </strong>

                    <p>{estimates[selectedService].note}</p>
                  </>
                ) : (
                  <>
                    <strong>Custom Estimate</strong>
                    <p>
                      We'll review your project and determine the estimated
                      cost.
                    </p>
                  </>
                )}

                <small>
                  This is an initial estimate, not a final quote. Final pricing
                  depends on your vehicle, parts, and project requirements.
                </small>
              </div>
            )}

            <div className="quote-field">
              <label htmlFor="details">TELL US WHAT YOU NEED*</label>
              <textarea
                id="details"
                name="details"
                rows={5}
                placeholder="What would you like done? Include any ideas, parts, colors, or other details..."
                required
              />
            </div>

            <div className="quote-form-divider">
              <span className="section-label">
                YOUR CONTACT INFORMATION / 02
              </span>
            </div>

            <div className="quote-field">
              <label htmlFor="name">FULL NAME *</label>
              <input
                id="name"
                name="name"
                placeholder="Your name"
                autoComplete="name"
                required
              />
            </div>

            <div className="quote-field">
              <label htmlFor="email">EMAIL ADDRESS *</label>
              <input
                id="email"
                name="email"
                type="email"
                placeholder="you@example.com"
                autoComplete="email"
                required
              />
            </div>

            <div className="quote-field">
              <label htmlFor="phone">PHONE NUMBER</label>
              <input
                id="phone"
                name="phone"
                type="tel"
                placeholder="(555) 123-4567"
                autoComplete="tel"
              />
            </div>

            <div className="quote-field">
              <label htmlFor="contact">PREFERRED CONTACT METHOD *</label>
              <select id="contact" name="contact" defaultValue="Email" required>
                <option value="Email">Email</option>
                <option value="Phone">Phone</option>
                <option value="Text">Text message</option>
              </select>
            </div>

            <button
              type="submit"
              className="btn btn-primary quote-submit"
              disabled={sending}
            >
              {sending ? "SENDING REQUEST..." : "SEND QUOTE REQUEST"}
              {!sending && <span>↗︎</span>}
            </button>
          </form>
        </div>
      </section>
    </main>
  );
}
