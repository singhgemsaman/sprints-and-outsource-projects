import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useDocumentTitle } from '../hooks/useDocumentTitle';
import { useArtists } from '../hooks/useArtists';
import { SkeletonGrid } from '../components/SkeletonLoader';
import './ArtistDirectory.css';

export default function ArtistDirectory() {
  useDocumentTitle('Artists | Veridian Gallery');
  const { artists, loading, error } = useArtists();
  const [search, setSearch] = useState('');

  const filtered = useMemo(() => {
    if (!search.trim()) return artists;
    return artists.filter(a =>
      a.artistName.toLowerCase().includes(search.toLowerCase())
    );
  }, [artists, search]);

  return (
    <div className="artist-directory">
      <div className="page-header">
        <h1 className="page-title">Our <span>Artists</span></h1>
        <p className="page-subtitle">Discover the visionary creators behind our collections</p>
      </div>

      <div className="search-bar">
        <div className="search-wrap">
          <span className="search-icon" aria-hidden="true">⌕</span>
          <input
            type="text"
            className="search-input"
            placeholder="Search artists by name..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            aria-label="Search artists"
          />
        </div>
      </div>

      {loading ? (
        <SkeletonGrid count={6} type="artist" />
      ) : error ? (
        <div className="no-results">
          <p>Unable to load artists. Please try again later.</p>
        </div>
      ) : filtered.length === 0 ? (
        <div className="no-results">
          <p>No artists found matching "{search}"</p>
        </div>
      ) : (
        <div className="artists-grid">
          {filtered.map(artist => (
            <Link
              key={artist.artistId}
              to={`/artists/${artist.artistId}`}
              className="artist-card"
            >
              <img
                src={artist.profileImageUrl}
                alt={artist.artistName}
                className="artist-card-avatar"
                loading="lazy"
              />
              <div className="artist-card-info">
                <h3>{artist.artistName}</h3>
                <p>{artist.bio}</p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
