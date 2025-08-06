import { useTranslation } from 'react-i18next';
import { useEffect, useState } from 'react';

function HomeSection() {
  const { t } = useTranslation();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  
  // Sample garden images (replace with your actual image paths)
  const gardenImages = [
    '/home/home.jpg',
    '/home/home2.jpg',
    '/home/home3.jpg',
    '/home/home4.jpg'
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => 
        prevIndex === gardenImages.length - 1 ? 0 : prevIndex + 1
      );
    }, 3000); // Change image every 10 seconds

    return () => clearInterval(interval);
  }, [gardenImages.length]);

  return (
    <section 
      id="home" 
      className="relative min-h-screen flex items-center justify-center text-center px-6 overflow-hidden"
    >
      {/* Auto-scrolling background images */}
      <div className="absolute inset-0 z-0 transition-opacity duration-1000">
        {gardenImages.map((image, index) => (
          <div 
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ${index === currentImageIndex ? 'opacity-100' : 'opacity-0'}`}
          >
            <img 
              src={image}
              alt={`Garden ${index + 1}`}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black bg-opacity-30"></div>
          </div>
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto">
        <h2 className="text-4xl md:text-6xl font-bold text-white mb-6 drop-shadow-lg">
          {t('home.title')}
        </h2>
        <p className="text-xl md:text-2xl font-medium text-green-100 mb-8 drop-shadow-md">
          {t('home.subtitle')}
        </p>
        <a 
          href="#services" 
          className="inline-flex items-center px-8 py-4 bg-green-600 hover:bg-green-700 text-white text-lg font-semibold rounded-full transition-all duration-300 shadow-lg hover:shadow-xl"
        >
          {t('home.cta')}
          <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </a>
      </div>

      {/* Image indicator dots */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10 flex space-x-2">
        {gardenImages.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentImageIndex(index)}
            className={`w-3 h-3 rounded-full ${index === currentImageIndex ? 'bg-white' : 'bg-white bg-opacity-50'}`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
}

export default HomeSection;