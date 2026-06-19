import { createContext, useState, useEffect, useContext } from 'react';

export const PatronWishlistContext = createContext();

export const useWishlist = () => useContext(PatronWishlistContext);

const STORAGE_KEY = 'veridianGalleryPatronWishlist';

export function PatronWishlistProvider({ children }) {
  const [curatedArtworks, setCuratedArtworks] = useState(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(curatedArtworks));
    } catch (e) {
      console.error('Failed to save wishlist', e);
    }
  }, [curatedArtworks]);

  const addArtworkToWishlist = (artworkObject) => {
    setCuratedArtworks(prev => {
      if (prev.some(a => a.id === artworkObject.id)) return prev;
      return [...prev, artworkObject];
    });
  };

  const removeArtworkFromWishlist = (artworkId) => {
    setCuratedArtworks(prev => prev.filter(a => a.id !== artworkId));
  };

  const isArtworkInWishlist = (artworkId) => {
    return curatedArtworks.some(a => a.id === artworkId);
  };

  return (
    <PatronWishlistContext.Provider value={{
      curatedArtworks,
      addArtworkToWishlist,
      removeArtworkFromWishlist,
      isArtworkInWishlist
    }}>
      {children}
    </PatronWishlistContext.Provider>
  );
}
