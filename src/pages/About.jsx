import { Link } from "react-router-dom";
import Location from "../components/Location";
import "./About.css";

const values = [
  {
    number: "01",
    title: "YOUR VISION",
    description:
      "Every vehicle is different. We focus on your goals and the look you want to achieve.",
  },
  {
    number: "02",
    title: "ATTENTION TO DETAIL",
    description:
      "The small details matter. Fitment, finish, and the final look all contribute to the build.",
  },
  {
    number: "03",
    title: "MADE PERSONAL",
    description:
      "Your car should reflect your personality, not follow someone else's formula.",
  },
];

export default function About() {
  return (
    <main className="about-page">
      <header className="about-header container">
        <span className="section-label">KC STANCE SHOP / ABOUT US</span>

        <h1>
          MORE THAN
          <br />
          <span>JUST CARS.</span>
        </h1>

        <p>
          We’re here for the people who see their vehicles as more than a way
          to get from A to B. It’s about personal style, creativity, and making
          every detail count.
        </p>
      </header>

      <section className="about-intro container">
        <div className="about-intro-image">
          <img
            src="https://scontent-ord5-2.xx.fbcdn.net/v/t39.30808-6/500050720_1292537992875893_2101578564119359374_n.jpg?stp=dst-jpg_tt6&cstp=mx1152x2048&ctp=s1152x2048&_nc_cat=107&ccb=1-7&_nc_sid=833d8c&_nc_ohc=D2uELjeq8skQ7kNvwE1kL-I&_nc_oc=Adoy_-WqSeoBI4p2tGtaWQcvzt9d2hlEVPSA-dSLOR_zvlLlr4JLH66eluszEziC6AA&_nc_zt=23&_nc_ht=scontent-ord5-2.xx&_nc_gid=wY965gQP4kfgNnvJxy9QLg&_nc_ss=7b2a8&oh=00_AQNegBSirZPviyqLzcTkDoys4ln9SVj8gXlAfgvQFKahaA&oe=6AE1A6E4"
            alt="Automotive customization at KC Stance Shop"
            loading="lazy"
          />
          <span className="about-image-label">KC / AUTOMOTIVE CULTURE</span>
        </div>

        <div className="about-intro-text">
          <span className="section-label">OUR APPROACH</span>

          <h2>
            YOUR RIDE.
            <br />
            <span>YOUR RULES.</span>
          </h2>

          <p>
            At KC Stance Shop, automotive customization is about bringing your
            ideas to life. Whether you're looking for a cleaner look, a more
            aggressive stance, or exterior upgrades, the goal is to help you
            create a vehicle that feels like yours.
          </p>

          <p>
            From the first idea to the finishing details, every build starts
            with your vision.
          </p>

          <Link to="/services" className="service-link">
            EXPLORE OUR SERVICES <span>↗</span>
          </Link>
        </div>
      </section>

      <section className="about-values container">
        <div className="about-values-heading">
          <span className="section-label">WHAT MATTERS TO US</span>
          <h2>
            BUILT AROUND
            <br />
            <span>YOUR IDEAS.</span>
          </h2>
        </div>

        <div className="about-values-list">
          {values.map((value) => (
            <article className="about-value" key={value.number}>
              <span className="about-value-number">{value.number}</span>

              <div>
                <h3>{value.title}</h3>
                <p>{value.description}</p>
              </div>

              <span className="about-value-arrow">↗</span>
            </article>
          ))}
        </div>
      </section>
      <section className="Location">
            <Location/>
      </section>
 


      <section className="about-cta">
        <span className="section-label">YOUR BUILD STARTS WITH AN IDEA</span>

        <h2>
          LET'S MAKE
          <br />
          <span>IT HAPPEN.</span>
        </h2>

        <p>Tell us what you have in mind. Let's talk about your next build.</p>

        <Link to="/quote" className="btn btn-primary">
          GET A QUOTE <span>↗</span>
        </Link>
      </section>
    </main>
  );
}