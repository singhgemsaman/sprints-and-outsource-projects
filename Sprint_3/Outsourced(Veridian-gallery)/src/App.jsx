import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { PatronWishlistProvider } from './context/PatronWishlistContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ExhibitionHall from './pages/ExhibitionHall';
import ArtistDirectory from './pages/ArtistDirectory';
import ArtistPortfolio from './pages/ArtistPortfolio';
import Wishlist from './pages/Wishlist';
import Contact from './pages/Contact';
import NotFound from './pages/NotFound';
import './App.css';

export default function App() {
  return (
    <BrowserRouter>
      <PatronWishlistProvider>
        <Navbar />
        <main className="app-main">
          <Routes>
            <Route path="/" element={<ExhibitionHall />} />
            <Route path="/artists" element={<ArtistDirectory />} />
            <Route path="/artists/:artistId" element={<ArtistPortfolio />} />
            <Route path="/wishlist" element={<Wishlist />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <Footer />
      </PatronWishlistProvider>
    </BrowserRouter>
  );
}
