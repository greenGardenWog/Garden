import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import HomeSection from './Pages/HomeSection';
import ServicesSection from './Pages/ServicesSection';
import GallerySection from './Pages/GallerySection';
import ContactSection from './Pages/ContactSection';
import Shop from './Pages/PlantList';
import PlantDetail from './Pages/PlantDetail';

function App() {
  return (
    <Router>
      <div className="font-sans">
        <Navbar />
        <Routes>
          <Route path="/" element={
            <main>
              <HomeSection />
              <ServicesSection />
              <GallerySection />
              <ContactSection />
            </main>
          } />
          <Route path="/shop" element={<Shop />} />
          <Route path="/shop/:id" element={<PlantDetail />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
