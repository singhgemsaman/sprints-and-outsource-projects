import { useDocumentTitle } from '../hooks/useDocumentTitle';
import { useArtists } from '../hooks/useArtists';
import { useArtworks } from '../hooks/useArtworks';
import { exhibitions } from '../data/exhibitions';
import ArtworkCard from '../components/ArtworkCard';
import { SkeletonGrid, SkeletonHero } from '../components/SkeletonLoader';
import { Link } from 'react-router-dom';
import './ExhibitionHall.css';

export default function ExhibitionHall() {
  useDocumentTitle('Exhibitions | Veridian Gallery');
  const { artists } = useArtists();
  const { artworks, loading } = useArtworks(artists);

  return (
    <div className="exhibition-hall">
      <section className="hero-section">
        <div className="hero-particles">
          {Array.from({ length: 20 }, (_, i) => (
            <div
              key={i}
              className="particle"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 5}s`,
                animationDuration: `${3 + Math.random() * 4}s`
              }}
            />
          ))}
        </div>
        <div className="hero-content">
          <p className="hero-label">Welcome to</p>
          <h1 className="hero-title">
            Veridian <span>Gallery</span> Collective
          </h1>
          <p className="hero-subtitle">
            Discover extraordinary contemporary art from visionary artists around the world.
            Explore curated exhibitions that challenge perspectives and inspire wonder.
          </p>
          <Link to="/artists" className="hero-cta">Explore Artists</Link>
        </div>
      </section>

      <div className="section">
        <div className="section-header">
          <p className="section-label">Current Season</p>
          <h2 className="section-title">Featured Exhibitions</h2>
          <p className="section-description">
            Immerse yourself in our carefully curated collections, each telling a unique story.
          </p>
        </div>

        {loading ? (
          <SkeletonGrid count={6} />
        ) : (
          exhibitions.map(exhibition => {
            const exhibitionArtworks = artworks.filter(a =>
              exhibition.artworkIds.includes(a.id)
            );
            return (
              <div key={exhibition.id} className="exhibition-block">
                <h3 className="exhibition-block-title">{exhibition.title}</h3>
                <p className="exhibition-block-desc">{exhibition.description}</p>
                <div className="artworks-grid">
                  {exhibitionArtworks.map(artwork => (
                    <ArtworkCard key={artwork.id} artwork={artwork} />
                  ))}
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
