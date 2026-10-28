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
      "https://scontent-ord5-2.xx.fbcdn.net/v/t39.30808-6/500050720_1292537992875893_2101578564119359374_n.jpg?stp=dst-jpg_tt6&cstp=mx1152x2048&ctp=s1152x2048&_nc_cat=107&ccb=1-7&_nc_sid=833d8c&_nc_ohc=D2uELjeq8skQ7kNvwE1kL-I&_nc_oc=Adoy_-WqSeoBI4p2tGtaWQcvzt9d2hlEVPSA-dSLOR_zvlLlr4JLH66eluszEziC6AA&_nc_zt=23&_nc_ht=scontent-ord5-2.xx&_nc_gid=wY965gQP4kfgNnvJxy9QLg&_nc_ss=7b2a8&oh=00_AQNegBSirZPviyqLzcTkDoys4ln9SVj8gXlAfgvQFKahaA&oe=6AE1A6E4",
    alt: "Modified street car",
    position: "center 65%",
  },
  {
    title: "DARK FINISH",
    category: "Window Tinting",
    image:
      "https://scontent-ord5-1.xx.fbcdn.net/v/t39.30808-6/488574715_1244019511061075_6087674480922141109_n.jpg?stp=dst-jpg_tt6&cstp=mx1440x1800&ctp=s1440x1800&_nc_cat=101&ccb=1-7&_nc_sid=127cfc&_nc_ohc=MSIA-x7lW4oQ7kNvwH_h5S9&_nc_oc=AdoKvjwlNYajV51kH9IQJBDgjfsKt0EG5V6yfqvTMxrMnMvWr_DX4jL8bn61SOF_4bM&_nc_zt=23&_nc_ht=scontent-ord5-1.xx&_nc_gid=nx8AIy4vMV-36oyM3JXTPw&_nc_ss=7b2a8&oh=00_AQO4PsDq8Nx4w8So2iJwV5wHGeaarvSwBDrEzxduqpBnvw&oe=6AE17B08",
    alt: "Vehicle window tinting",
    position: "center 80%",
  },
  {
    title: "DETAIL WORK",
    category: "Exterior",
    image:
      "https://scontent-ord5-1.cdninstagram.com/v/t51.82787-15/530437366_18077316019944645_7462737907215755590_n.jpg?stp=dst-jpg_e35_tt6&_nc_cat=111&ig_cache_key=MzY5ODQ3NDEyODE0ODcwMjQ1Nw%3D%3D.3-ccb7-5&ccb=7-5&_nc_sid=58cdad&efg=eyJ2ZW5jb2RlX3RhZyI6IkNBUk9VU0VMX0lURU0ueHBpZHMuMTQ0MC5zZHIucmVndWxhcl9waG90by5DMyJ9&_nc_ohc=CqCLpkHVJsgQ7kNvwFe_Sh6&_nc_oc=AdqivwOxcZB6xIIPuKXjgRUdNcUluAUIbkjAu6YkQ42WOYtxibqmcXjmSh4m6aLoP98&_nc_zt=23&_nc_ht=scontent-ord5-1.cdninstagram.com&_nc_gid=-GYXnm9ZQbWaa08nfU0GYQ&_nc_ss=7b6a8&oh=00_AQOVRlSrpn_yobDWDX_4oHrinGmfLzeDJ7M-DPKM0_nd_A&oe=6AE17C63",
    alt: "Custom exterior modifications",
    position: "center 65%",
  },
  {
    title: "LOW PROFILE",
    category: "Suspension",
    image:
      "https://scontent-ord5-1.cdninstagram.com/v/t51.75761-15/489375616_18065968567944645_9070758191125657383_n.jpg?stp=dst-jpegr_e35_tt6&_nc_cat=101&ig_cache_key=MzYwODAxODc5NDY0OTQ4MTE0Mw%3D%3D.3-ccb7-5&ccb=7-5&_nc_sid=58cdad&efg=eyJ2ZW5jb2RlX3RhZyI6IkNBUk9VU0VMX0lURU0ueHBpZHMuMTIxNS5oZHIucmVndWxhcl9waG90by5DMyJ9&_nc_ohc=WUR9BqvjGQYQ7kNvwFbXA-D&_nc_oc=Adoox8Q_3yODu0d5ZhlK1l2FGDb-MJFcItqkzG5VRAqUd3rHQY4WoC88uqB2FbA3ThE&_nc_zt=23&_nc_ht=scontent-ord5-1.cdninstagram.com&_nc_gid=3fftPYMEihrNgGQZEsvT_w&_nc_ss=7b6a8&oh=00_AQNfoqum_Od2AZBrA6X7v5Kl9PSnvFwOb4IaajSExfd0Ww&oe=6AE18A89",
    alt: "Lowered vehicle",
    position: "center 65%",
  },
  {
    title: "FINAL TOUCH",
    category: "Exterior",
    image:
      "https://kcstanceshop.com/wp-content/uploads/2025/07/IMG_20230719_163059-1024x768.jpg",
    alt: "Automotive customization details",
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