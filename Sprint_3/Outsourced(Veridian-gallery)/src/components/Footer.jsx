import { Link } from 'react-router-dom';
import './Footer.css';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <div>
          <div className="footer-brand">
            VERIDIAN <span>GALLERY</span>
          </div>
          <p className="footer-tagline">Curating extraordinary art since 1987</p>
        </div>
        <div className="footer-links">
          <Link to="/" className="footer-link">Exhibitions</Link>
          <Link to="/artists" className="footer-link">Artists</Link>
          <Link to="/contact" className="footer-link">Contact</Link>
          <Link to="/wishlist" className="footer-link">Wishlist</Link>
        </div>
        <p className="footer-copy">
          &copy; {new Date().getFullYear()} Veridian Gallery Collective. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
