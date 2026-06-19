import './SkeletonLoader.css';

export function SkeletonCard() {
  return (
    <div className="skeleton-card">
      <div className="skeleton skeleton-image" />
      <div className="skeleton skeleton-text" style={{ marginTop: '0.75rem' }} />
      <div className="skeleton skeleton-text short" />
    </div>
  );
}

export function SkeletonArtistCard() {
  return (
    <div className="skeleton-artist-card">
      <div className="skeleton skeleton-avatar-small" />
      <div style={{ flex: 1 }}>
        <div className="skeleton skeleton-text" style={{ width: '70%' }} />
        <div className="skeleton skeleton-text" style={{ width: '90%', marginTop: '0.5rem' }} />
      </div>
    </div>
  );
}

export function SkeletonGrid({ count = 6, type = 'card' }) {
  const Component = type === 'artist' ? SkeletonArtistCard : SkeletonCard;
  return (
    <div className={type === 'artist' ? 'skeleton-artists-grid' : 'skeleton-grid'}>
      {Array.from({ length: count }, (_, i) => (
        <Component key={i} />
      ))}
    </div>
  );
}

export function SkeletonHero() {
  return <div className="skeleton skeleton-hero" />;
}
