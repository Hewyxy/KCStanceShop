import { useState } from "react";
import { Link } from "react-router-dom";
import "./Gallery.css";

const projects = [
  {
    title: "CUSTOM WRAP",
    category: "Vinyl Wrap",
    image:
      "https://kcstanceshop.com/wp-content/uploads/2025/07/unnamed_4_900x-768x1024.webp",
    alt: "Custom vehicle wrap",
  },
  {
    title: "STREET SPEC",
    category: "Suspension",
    image:
      "gallery/GTR.jpg",
    alt: "Modified street car",
    position: "center 65%",
  },
  {
    title: "DARK FINISH",
    category: "Window Tinting",
    image:
      "gallery/must.jpg",
    alt: "Vehicle window tinting",
    position: "center 80%",
  },
  {
    title: "DETAIL WORK",
    category: "Exterior",
    image:
      "gallery/MurfGTR.jpg",
    alt: "Custom exterior modifications",
    position: "center 65%",
  },
  {
    title: "LOW PROFILE",
    category: "Suspension",
    image:
      "gallery/z.jpg",
    alt: "Lowered vehicle",
    position: "center 65%",
  },
  {
    title: "FINAL TOUCH",
    category: "Exterior",
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
                  style={{ objectPosition: project.position || "center" }}
                />

                <span className="gallery-project-number">
                  {String(projects.indexOf(project) + 1).padStart(2, "0")}
                </span>

                <span className="gallery-project-open">VIEW ↗</span>
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
            <img src={selectedProject.image} alt={selectedProject.alt} />

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