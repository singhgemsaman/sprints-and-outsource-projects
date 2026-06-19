import { Link } from 'react-router-dom';
import { useWishlist } from '../context/PatronWishlistContext';
import { useDocumentTitle } from '../hooks/useDocumentTitle';
import './Wishlist.css';

export default function Wishlist() {
  useDocumentTitle('Patron Wishlist | Veridian Gallery');
  const { curatedArtworks, removeArtworkFromWishlist } = useWishlist();

  if (curatedArtworks.length === 0) {
    return (
      <div className="wishlist-page">
        <div className="page-header">
          <h1 className="page-title">Your <span>Wishlist</span></h1>
        </div>
        <div className="empty-wishlist">
          <div className="empty-wishlist-icon">♡</div>
          <h2>Your Curated Collection is Empty</h2>
          <p>
            Your curated collection is empty. Explore our exhibitions and artist
            portfolios to find artworks you love!
          </p>
          <Link to="/" className="explore-btn">Explore Exhibitions</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="wishlist-page">
      <div className="page-header">
        <h1 className="page-title">Your <span>Wishlist</span></h1>
        <p className="page-subtitle">
          {curatedArtworks.length} artwork{curatedArtworks.length !== 1 ? 's' : ''} in your curated collection
        </p>
      </div>

      <div className="wishlist-grid">
        {curatedArtworks.map(artwork => (
          <div key={artwork.id} className="wishlist-item">
            <div className="wishlist-item-image">
              <img src={artwork.thumbnailUrl} alt={artwork.title} loading="lazy" />
            </div>
            <div className="wishlist-item-info">
              <h3 className="wishlist-item-title">{artwork.title}</h3>
              <p className="wishlist-item-artist">{artwork.artistName}</p>
              <button
                className="remove-btn"
                onClick={() => removeArtworkFromWishlist(artwork.id)}
                aria-label={`Remove ${artwork.title} from wishlist`}
              >
                ✕ Remove
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
