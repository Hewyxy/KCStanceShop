import { Link } from "react-router-dom";
import SEO from "../components/SEO";
import "./Services.css";

const services = [
  {
    title: "Vinyl Wrap",
    description:
      "Protect your paint and customize your ride with durable, precision-cut vinyl wraps designed for a flawless finish.",
    duration: "2–5 days",
    image:
      "https://kcstanceshop.com/wp-content/uploads/2025/07/unnamed_4_900x-768x1024.webp",
    alt: "Custom vinyl wrap installation",
  },
  {
    title: "Window Tinting",
    description:
      "Enhance privacy, reduce glare, and protect your interior with professional window tinting.",
    duration: "2–4 hours",
    image:
      "https://kcstanceshop.com/wp-content/uploads/2025/07/IMG-3994_2_900x.webp",
    alt: "Automotive window tinting",
  },
  {
    title: "Suspension Work",
    description:
      "Upgrade your ride’s stance, handling, and comfort with custom suspension solutions — from lowering kits to performance setups.",
    duration: "4–10 hours",
    image:
      "https://kcstanceshop.com/wp-content/uploads/2025/07/09E81722-6EA1-4800-B7D1-59384DF7C3F4_db4c8ac4-c47d-416c-875f-1fab5f6f749e_1728x-1024x521.webp",
    alt: "Vehicle suspension upgrade",
  },
  {
    title: "Exterior Installation",
    description:
      "Enhance your vehicle's look with expert installation of lips, spoilers, side skirts, lighting upgrades, and more.",
    duration: "2–6 hours",
    image:
      "https://kcstanceshop.com/wp-content/uploads/2025/07/unnamed_10_900x.webp",
    alt: "Automotive exterior upgrades",
  },
];

export default function Services() {
  return (
    <main className="services-page">
      <SEO
        title="Vehicle Wrap, Window Tint & Suspension Services | KCSTANCESHOP"
        description="Explore vehicle wraps, window tint, suspension installations, and exterior upgrades at KCSTANCESHOP in Olathe, KS, serving the Kansas City area."
      />
      <header className="services-header container">
        <span className="section-label">KC STANCE SHOP</span>

        <h1>
          OUR SERVICES<span>.</span>
        </h1>

        <p>
          Explore our automotive services and find the right upgrades for your
          build.
        </p>
      </header>

      <section className="services-content container">
        {services.map((service, index) => (
          <article
            className={`service-item ${index % 2 === 1 ? "reverse" : ""}`}
            key={service.title}
          >
            <div className="service-image">
              <img
                src={service.image}
                alt={service.alt}
                loading="lazy"
                decoding="async"
              />
              <span className="service-index">
                {String(index + 1).padStart(2, "0")}
              </span>
            </div>

            <div className="service-text">
              <span className="service-number">
                SERVICE / {String(index + 1).padStart(2, "0")}
              </span>

              <h2>{service.title}</h2>

              <p>{service.description}</p>

              <div className="service-duration">
                <span className="duration-label">ESTIMATED TIME</span>
                <span className="duration-value">{service.duration}</span>
              </div>

              <Link to="/quote" className="service-link">
                DISCUSS YOUR BUILD <span>↗</span>
              </Link>
            </div>
          </article>
        ))}
      </section>

    </main>
  );
}
