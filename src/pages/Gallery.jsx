import { useState } from "react";
import { Link } from "react-router-dom";
import SEO from "../components/SEO";
import "./Gallery.css";

const projects = [
  {
    title: "CUSTOM WRAP",
    category: "Vinyl Wrap",
    description: "A custom color and finish that gives the car a whole new look.",
    image:
      "https://kcstanceshop.com/wp-content/uploads/2025/07/unnamed_4_900x-768x1024.webp",
    alt: "Custom vehicle wrap",
  },
  {
    title: "STREET SPEC",
    category: "Suspension",
    description: "A low, balanced stance with fitment tuned for the street.",
    image:
      "gallery/GTR.jpg",
    alt: "Modified street car",
    position: "center 65%",
  },
  {
    title: "DARK FINISH",
    category: "Window Tinting",
    description: "Clean window tint for added privacy and a sharper profile.",
    image:
      "gallery/must.jpg",
    alt: "Vehicle window tinting",
    position: "center 80%",
  },
  {
    title: "DETAIL WORK",
    category: "Exterior",
    description: "Small exterior upgrades that bring the full build together.",
    image:
      "gallery/MurfGTR.jpg",
    alt: "Custom exterior modifications",
    position: "center 65%",
  },
  {
    title: "LOW PROFILE",
    category: "Suspension",
    description: "Dialed-in ride height and wheel fitment for a planted look.",
    image:
      "gallery/z.jpg",
    alt: "Lowered vehicle",
    position: "center 65%",
  },
  {
    title: "FINAL TOUCH",
    category: "Exterior",
    description: "Finishing details that make this custom setup stand out.",
    image:
      "gallery/240.jpg",
    alt: "Automotive customization details",
    position: "center 80%",
  },
];

const filters = ["All", "Vinyl Wrap", "Window Tinting", "Suspension", "Exterior"];

export default function Gallery() {
  const [activeFilter, setActiveFilter] = useState("All");
  const [selectedProject, setSelectedProject] = useState(null);

  const filteredProjects =
    activeFilter === "All"
      ? projects
      : projects.filter((project) => project.category === activeFilter);

  return (
    <main className="gallery-page">
      <SEO
        title="Custom Vehicle Wraps & Stance Gallery | KCSTANCESHOP"
        description="See custom wraps, window tint, suspension, and exterior projects completed by KCSTANCESHOP in Olathe, Kansas. Browse our vehicle restyling gallery."
      />
      <header className="gallery-header container">
        <span className="section-label">KC STANCE SHOP / OUR WORK</span>

        <h1>
          THE <span>GALLERY.</span>
        </h1>

        <p>
          Take a look at the details, the fitment, and the transformations.
          Every build has its own character.
        </p>
      </header>

      <section className="gallery-content container">
        <div className="gallery-toolbar">
          <span className="gallery-count">
            SHOWING {String(filteredProjects.length).padStart(2, "0")} PROJECTS
          </span>

          <div className="gallery-filters">
            {filters.map((filter) => (
              <button
                key={filter}
                type="button"
                className={`gallery-filter ${
                  activeFilter === filter ? "active" : ""
                }`}
                onClick={() => setActiveFilter(filter)}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>

        <div className="gallery-grid">
          {filteredProjects.map((project, index) => (
            <button
              type="button"
              className="gallery-project"
              key={project.title}
              onClick={() => setSelectedProject(project)}
            >
              <div className="gallery-project-image">
                <img
                  src={project.image}
                  alt={project.alt}
                  loading="lazy"
                  decoding="async"
                  style={{ objectPosition: project.position || "center" }}
                />

                <span className="gallery-project-number">
                  {String(projects.indexOf(project) + 1).padStart(2, "0")}
                </span>

                <div className="gallery-project-overlay" aria-hidden="true">
                  <span className="gallery-project-category">
                    {project.category}
                  </span>
                  <h3>{project.title}</h3>
                  <p>{project.description}</p>
                  <span className="gallery-project-open">VIEW ↗</span>
                </div>
              </div>

              <div className="gallery-project-info">
                <div>
                  <span className="gallery-project-category">
                    {project.category}
                  </span>
                  <h2>{project.title}</h2>
                </div>

                <span className="gallery-project-arrow">↗</span>
              </div>
            </button>
          ))}
        </div>
      </section>

      <section className="gallery-cta">
        <span className="section-label">YOUR CAR. YOUR VISION.</span>

        <h2>
          READY TO BUILD
          <br />
          <span>YOUR OWN?</span>
        </h2>

        <p>Let's talk about the next step for your vehicle.</p>

        <Link to="/quote" className="btn btn-primary">
          GET A QUOTE <span>↗</span>
        </Link>
      </section>

      {selectedProject && (
        <div
          className="gallery-lightbox"
          role="dialog"
          aria-modal="true"
          aria-label={selectedProject.title}
          onClick={() => setSelectedProject(null)}
        >
          <button
            type="button"
            className="gallery-lightbox-close"
            aria-label="Close image"
            onClick={() => setSelectedProject(null)}
          >
            ×
          </button>

          <div
            className="gallery-lightbox-content"
            onClick={(event) => event.stopPropagation()}
          >
            <img
              src={selectedProject.image}
              alt={selectedProject.alt}
              decoding="async"
            />

            <div className="gallery-lightbox-caption">
              <span>{selectedProject.category}</span>
              <h2>{selectedProject.title}</h2>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
