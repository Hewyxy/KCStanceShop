import { Link } from "react-router-dom";
import "./footer.css";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-brand">
          <img src="https://kcstanceshop.com/wp-content/uploads/2025/07/b010e7a5-1aa0-4482-ba5b-ecf2824e0f7c-1024x531.png" alt="KCSTANCESHOP logo" />
          <p>
            Vehicle wraps, window tint, suspension upgrades, and exterior
            restyling in Olathe, Kansas.
          </p>
        </div>

        <div className="footer-section">
          <h3>Navigation</h3>
          <Link to="/">Home</Link>
          <Link to="/gallery">Gallery</Link>
          <Link to="/services">Services</Link>
          <Link to="/quote">Get a Quote</Link>
        </div>

        <div className="footer-section">
          <h3>Social</h3>
          <a href="https://www.instagram.com/kcstanceshop/" target="_blank" rel="noopener noreferrer">Instagram</a>
          <a href="https://www.facebook.com/kcstanceshop/" target="_blank" rel="noopener noreferrer">Facebook</a>
          <a href="https://www.tiktok.com/@kcstanceshop" target="_blank" rel="noopener noreferrer">TikTok</a>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© 2026 KCSTANCESHOP LLC. All rights reserved.</p>

        <div className="footer-bottom-links">
          <a href="tel:+19132868020">Call: (913) 286-8020</a>
          <a href="mailto:kcstanceshop@gmail.com">kcstanceshop@gmail.com</a>
          <a href="#">Privacy Policy</a>
          <a href="#">Terms of Service</a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
