import { useEffect } from "react";
import "./Home.css";

const services = [
  {
    number: "01",
    title: "Window Tints",
    description:
      "Enhance privacy, reduce glare, and give your vehicle a cleaner look.",
  },
  {
    number: "02",
    title: "Vehicle Wraps",
    description:
      "Transform your ride with custom colors, finishes, and unique styling.",
  },
  {
    number: "03",
    title: "Suspension Work",
    description:
      "Get the stance you want with suspension setups tailored to your build.",
  },
  {
    number: "04",
    title: "Cosmetic Jobs",
    description:
      "Refine the details and bring your vehicle's exterior vision to life.",
  },
];

const galleryItems = [
  { number: "01", title: "Featured Build" },
  { number: "02", title: "Custom Wrap" },
  { number: "03", title: "Stance Setup" },
  { number: "04", title: "Shop Projects" },
];

export default function Home() {
  useEffect(() => {
    const elements = document.querySelectorAll(
      ".services-section, .gallery-section, .get-quote-section",
    );

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 },
    );

    elements.forEach((element) => observer.observe(element));

    return () => observer.disconnect();
  }, []);
  return (
    <main className="home">
      {/* Hero */}
      <section className="home-hero">
        <div className="hero-content">
          <span className="hero-label">KcStanceshop | Kansas City</span>

          <h1>
            STANCE IS A
            <br />
            <span>STATEMENT.</span>
          </h1>

          <p>
            From custom wraps to the perfect stance, we help bring your vision
            for your vehicle to life.
          </p>

          <div className="hero-actions">
            <a href="/services" className="btn btn-primary">
              Explore Services <span>↗</span>
            </a>

            <a href="/gallery" className="btn btn-secondary">
              View Our Work
            </a>
          </div>
        </div>

        <div className="hero-bottom">
          <span>YOUR BUILD. YOUR VISION.</span>
          <span>KC STANCE SHOP © 2026</span>
        </div>
      </section>

      {/* Services */}
      <section className="services-section" id="services">
        <div className="section-heading">
          <div>
            <span className="section-label">WHAT WE DO</span>
            <h2>
              OUR <span>SERVICES</span>
            </h2>
          </div>

          <p>
            Quality work. Attention to detail.
            <br />
            Built around your vision.
          </p>
        </div>

        <div className="services-list">
          {services.map((service) => (
            <article className="service-card" key={service.number}>
              <span className="service-number">{service.number}</span>

              <div className="service-info">
                <h3>{service.title}</h3>
                <p>{service.description}</p>
              </div>

              <a
                href="/quote"
                className="service-arrow"
                aria-label={`Request a quote for ${service.title}`}
              >
                ↗
              </a>
            </article>
          ))}
        </div>
      </section>

      {/* Gallery */}
      <section className="gallery-section" id="gallery">
        <div className="section-heading">
          <div>
            <span className="section-label">OUR BUILDS</span>
            <h2>
              THE <span>GALLERY</span>
            </h2>
          </div>

          <a href="/gallery" className="text-link">
            View All Projects ↗
          </a>
        </div>

        <div className="gallery-list">
          {galleryItems.map((item) => (
            <a href="/gallery" className="gallery-card" key={item.number}>
              <div className="gallery-placeholder">
                <span>{item.number}</span>
              </div>

              <div className="gallery-caption">
                <h3>{item.title}</h3>
                <span>↗</span>
              </div>
            </a>
          ))}
        </div>
      </section>

      {/* Quote CTA */}
      <section className="get-quote-section">
        <span className="section-label">LET'S BUILD SOMETHING DIFFERENT</span>

        <h2>
          YOUR NEXT BUILD
          <br />
          <span>STARTS HERE.</span>
        </h2>

        <p>
          Have a vision for your vehicle? Let's talk about making it happen.
        </p>

        <a href="/quote" className="btn btn-primary">
          Get a Quote <span>↗</span>
        </a>
      </section>
    </main>
  );
}
