import { useWishlist } from '../context/PatronWishlistContext';
import './ArtworkCard.css';

export default function ArtworkCard({ artwork }) {
  const { addArtworkToWishlist, removeArtworkFromWishlist, isArtworkInWishlist } = useWishlist();
  const inWishlist = isArtworkInWishlist(artwork.id);

  const toggleWishlist = (e) => {
    e.stopPropagation();
    if (inWishlist) {
      removeArtworkFromWishlist(artwork.id);
    } else {
      addArtworkToWishlist(artwork);
    }
  };

  return (
    <div className="artwork-card">
      <div className="artwork-card-image-wrap">
        <img
          src={artwork.thumbnailUrl}
          alt={artwork.title}
          loading="lazy"
        />
        <div className="artwork-card-overlay" />
        <button
          className={`wishlist-btn ${inWishlist ? 'active' : ''}`}
          onClick={toggleWishlist}
          aria-label={inWishlist ? `Remove ${artwork.title} from wishlist` : `Add ${artwork.title} to wishlist`}
        >
          {inWishlist ? '♥' : '♡'}
        </button>
      </div>
      <div className="artwork-card-info">
        <h3 className="artwork-card-title">{artwork.title}</h3>
        <p className="artwork-card-artist">{artwork.artistName}</p>
      </div>
    </div>
  );
}
