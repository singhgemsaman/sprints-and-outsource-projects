import { useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useDocumentTitle } from '../hooks/useDocumentTitle';
import { useArtists } from '../hooks/useArtists';
import { useArtworks } from '../hooks/useArtworks';
import ArtworkCard from '../components/ArtworkCard';
import { SkeletonGrid } from '../components/SkeletonLoader';
import './ArtistPortfolio.css';

export default function ArtistPortfolio() {
  const { artistId } = useParams();
  const { artists, loading: artistsLoading } = useArtists();
  const { artworks, loading: artworksLoading } = useArtworks(artists);

  const artist = useMemo(
    () => artists.find(a => a.artistId === Number(artistId)),
    [artists, artistId]
  );

  const artistWorks = useMemo(
    () => artworks.filter(a => a.artistId === Number(artistId)),
    [artworks, artistId]
  );

  useDocumentTitle(
    artist ? `Artist: ${artist.artistName} | Veridian Gallery` : 'Artist | Veridian Gallery'
  );

  const loading = artistsLoading || artworksLoading;

  if (loading) {
    return (
      <div className="artist-portfolio">
        <div className="artist-hero">
          <div className="skeleton skeleton-avatar" style={{ width: 180, height: 180 }} />
          <div style={{ flex: 1 }}>
            <div className="skeleton skeleton-text" style={{ width: '50%', height: 28 }} />
            <div className="skeleton skeleton-text" style={{ width: '30%', height: 14, marginTop: '1rem' }} />
            <div className="skeleton skeleton-text" style={{ width: '100%', height: 14, marginTop: '1rem' }} />
            <div className="skeleton skeleton-text" style={{ width: '80%', height: 14, marginTop: '0.5rem' }} />
          </div>
        </div>
        <SkeletonGrid count={6} />
      </div>
    );
  }

  if (!artist) {
    return (
      <div className="artist-portfolio">
        <div className="error-state">
          <h2>Artist Not Found</h2>
          <p>We couldn't find an artist with that identifier in our collection.</p>
          <Link to="/artists" className="back-link">← Back to Artist Directory</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="artist-portfolio">
      <Link to="/artists" className="back-link">← Back to Artists</Link>

      <div className="artist-hero">
        <img
          src={artist.profileImageUrl}
          alt={artist.artistName}
          className="artist-hero-image"
        />
        <div className="artist-hero-info">
          <p className="artist-label">Featured Artist</p>
          <h1>{artist.artistName}</h1>
          <p className="artist-bio">{artist.bio}</p>
        </div>
      </div>

      <div className="artist-works-section">
        <h2>Artworks by {artist.artistName}</h2>
        {artistWorks.length === 0 ? (
          <p style={{ color: 'var(--text-muted)' }}>No artworks currently on display for this artist.</p>
        ) : (
          <div className="artworks-grid">
            {artistWorks.map(artwork => (
              <ArtworkCard key={artwork.id} artwork={artwork} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
