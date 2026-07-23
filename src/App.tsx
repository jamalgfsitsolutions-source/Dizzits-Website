import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import { Home } from './pages/Home';
import { ServiceDetails } from './pages/ServiceDetails';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { ScrollToTop } from './components/ScrollToTop';
import { ContactModal } from './components/ContactModal';

export default function App() {
  const [isContactOpen, setIsContactOpen] = useState(false);

  return (
    <Router>
      <ScrollToTop />
      <div className="bg-black min-h-screen text-white selection:bg-white/30 flex flex-col">
        <Navbar onOpenContact={() => setIsContactOpen(true)} />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home onOpenContact={() => setIsContactOpen(true)} />} />
            <Route path="/services/:slug" element={<ServiceDetails />} />
          </Routes>
        </main>
        <Footer />
        <ContactModal open={isContactOpen} onClose={() => setIsContactOpen(false)} />
      </div>
    </Router>
  );
}
