import { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { useWishlist } from '../context/PatronWishlistContext';
import './Navbar.css';

export default function Navbar() {
  const { curatedArtworks } = useWishlist();
  const [mobileOpen, setMobileOpen] = useState(false);
  const wishlistCount = curatedArtworks.length;

  const closeMobile = () => setMobileOpen(false);

  return (
    <>
      <nav className="navbar" role="navigation" aria-label="Main navigation">
        <div className="navbar-inner">
          <Link to="/" className="navbar-logo" aria-label="Veridian Gallery Home" onClick={closeMobile}>
            VERIDIAN <span>GALLERY</span>
          </Link>

          <button
            className="hamburger-btn"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? '✕' : '☰'}
          </button>

          <ul className={`navbar-links ${mobileOpen ? 'open' : ''}`}>
            <li>
              <NavLink
                to="/"
                end
                className={({ isActive }) => `navbar-link ${isActive ? 'active' : ''}`}
                onClick={closeMobile}
              >
                Exhibitions
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/artists"
                className={({ isActive }) => `navbar-link ${isActive ? 'active' : ''}`}
                onClick={closeMobile}
              >
                Artists
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/wishlist"
                className={({ isActive }) => `navbar-link wishlist-indicator ${isActive ? 'active' : ''}`}
                onClick={closeMobile}
              >
                Wishlist
                {wishlistCount > 0 && (
                  <span className="wishlist-badge" aria-label={`${wishlistCount} items in wishlist`}>
                    {wishlistCount}
                  </span>
                )}
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/contact"
                className={({ isActive }) => `navbar-link ${isActive ? 'active' : ''}`}
                onClick={closeMobile}
              >
                Contact
              </NavLink>
            </li>
          </ul>
        </div>
      </nav>
      {mobileOpen && (
        <div className={`mobile-overlay ${mobileOpen ? 'active' : ''}`} onClick={closeMobile} aria-hidden="true" />
      )}
    </>
  );
}
