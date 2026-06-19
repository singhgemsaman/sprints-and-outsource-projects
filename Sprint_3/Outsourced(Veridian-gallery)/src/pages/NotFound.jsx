import { Link } from 'react-router-dom';
import { useDocumentTitle } from '../hooks/useDocumentTitle';
import './NotFound.css';

export default function NotFound() {
  useDocumentTitle('Page Not Found | Veridian Gallery');

  return (
    <div className="not-found">
      <div className="not-found-code">404</div>
      <h2>Gallery Not Found</h2>
      <p>
        The gallery space you're looking for doesn't exist or may have been
        relocated. Let us guide you back to our collections.
      </p>
      <div className="not-found-links">
        <Link to="/" className="not-found-link primary">Return to Exhibitions</Link>
        <Link to="/artists" className="not-found-link secondary">Browse Artists</Link>
        <Link to="/contact" className="not-found-link secondary">Contact Us</Link>
      </div>
    </div>
  );
}
