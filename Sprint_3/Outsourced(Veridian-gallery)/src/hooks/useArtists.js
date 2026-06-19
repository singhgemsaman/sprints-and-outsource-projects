import { useState, useEffect } from 'react';

const bios = [
  'A visionary artist exploring the intersection of light and form, creating transcendent pieces that challenge conventional perspectives.',
  'Known for bold compositions and fearless color palettes, this artist\'s work has been exhibited in galleries across three continents.',
  'Drawing inspiration from urban landscapes and organic textures, crafting intimate narratives through mixed media installations.',
  'A contemporary sculptor whose monumental works explore themes of identity, memory, and the human condition.',
  'Pioneering digital artist blending traditional techniques with cutting-edge technology to create immersive visual experiences.',
  'Celebrated for ethereal watercolors that capture fleeting moments of natural beauty with extraordinary precision.',
  'An abstract expressionist whose dynamic canvases pulse with raw emotion and kinetic energy.',
  'Multidisciplinary creator working across photography, video, and performance to interrogate social narratives.',
  'Master printmaker whose intricate works reveal hidden patterns in the natural world through meticulous craftsmanship.',
  'Emerging talent whose provocative installations have garnered critical acclaim at international biennales.'
];

export function useArtists() {
  const [artists, setArtists] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    fetch('https://jsonplaceholder.typicode.com/users')
      .then(res => {
        if (!res.ok) throw new Error('Failed to fetch artists');
        return res.json();
      })
      .then(data => {
        if (cancelled) return;
        const mapped = data.map((user, i) => ({
          artistId: user.id,
          artistName: user.name,
          profileImageUrl: `https://picsum.photos/seed/artist${user.id}/400/400`,
          bio: bios[i % bios.length]
        }));
        setArtists(mapped);
        setLoading(false);
      })
      .catch(err => {
        if (cancelled) return;
        setError(err.message);
        setLoading(false);
      });
    return () => { cancelled = true; };
  }, []);

  return { artists, loading, error };
}
