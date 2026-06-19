import { useState, useEffect } from 'react';

export function useArtworks(artists) {
  const [artworks, setArtworks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!artists || artists.length === 0) return;
    let cancelled = false;
    setLoading(true);
    fetch('https://jsonplaceholder.typicode.com/photos?_limit=50')
      .then(res => {
        if (!res.ok) throw new Error('Failed to fetch artworks');
        return res.json();
      })
      .then(data => {
        if (cancelled) return;
        const mapped = data.map(photo => {
          const assignedArtist = artists[Math.floor(Math.random() * artists.length)];
          return {
            id: photo.id,
            title: photo.title.charAt(0).toUpperCase() + photo.title.slice(1),
            thumbnailUrl: `https://picsum.photos/seed/art${photo.id}/400/400`,
            fullImageUrl: `https://picsum.photos/seed/art${photo.id}/800/800`,
            artistId: assignedArtist.artistId,
            artistName: assignedArtist.artistName
          };
        });
        setArtworks(mapped);
        setLoading(false);
      })
      .catch(err => {
        if (cancelled) return;
        setError(err.message);
        setLoading(false);
      });
    return () => { cancelled = true; };
  }, [artists]);

  return { artworks, loading, error };
}
