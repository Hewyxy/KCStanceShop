import { Link } from "react-router-dom";
import "./Navbar.css";

export default function Navbar() {
  return (
    <header className="header">
      <nav className="navbar">
        <Link to="/" className="logo-link">
          <img
            src="https://kcstanceshop.com/wp-content/uploads/2025/07/b010e7a5-1aa0-4482-ba5b-ecf2824e0f7c-1024x531.png"
            alt="KCSTANCESHOP"
            className="logo"
          />
        </Link>
        <ul>
          <li>
            <Link className="nav-link" to="/">
              Home
            </Link>
          </li>
          <li>
            <Link className="nav-link" to="/services">
              Services
            </Link>
          </li>
          <li>
            <Link className="nav-link" id="senter" to="/gallery">
              Past Projects
            </Link>
          </li>
          <li>
            <Link className="nav-link" to="/about">
              About
            </Link>
          </li>
          <li>
            <Link className="nav-link" to="/quote">
              Book Now!
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
