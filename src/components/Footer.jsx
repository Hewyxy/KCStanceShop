import "./footer.css";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-brand">
          <img src="https://kcstanceshop.com/wp-content/uploads/2025/07/b010e7a5-1aa0-4482-ba5b-ecf2824e0f7c-1024x531.png" alt="kcstanceshop Logo" />
          <p>
            Industry Leading Customization Experts Bring your dreams to reality
          </p>
        </div>

        <div className="footer-section">
          <h3>Navigation</h3>
          <a href="/">Home</a>
          <a href="/gallery">Gallery</a>
          <a href="/services">Services</a>
          <a href="/quote">Get a Quote</a>
        </div>

        <div className="footer-section">
          <h3>Social</h3>
          <a href="https://www.instagram.com/kcstanceshop/" target="_blank" rel="noopener noreferrer">Instagram</a>
          <a href="https://www.facebook.com/kcstanceshop/" target="_blank" rel="noopener noreferrer">Facebook</a>
          <a href="https://www.tiktok.com/@kcstanceshop" target="_blank" rel="noopener noreferrer">TikTok</a>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© 2026 kcstanceshop LLC. All rights reserved.</p>

        <div className="footer-bottom-links">
          <a href="#">Call: +1 (913)-111-1111</a>
          <a href="#">Email: KCSTANCESHOP@EXPAMLE.com</a>
          <a href="#">Privacy Policy</a>
          <a href="#">Terms of Service</a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
