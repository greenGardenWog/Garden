import React, { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';

const imageCount = 12;
const images = Array.from({ length: imageCount }, (_, i) => 
  `${import.meta.env.BASE_URL}gallery/image${i + 1}.jpg`
);
const IMAGES_PER_PAGE = 8;
const AUTO_SCROLL_INTERVAL = 5000;

export default function GallerySection() {
  const { t } = useTranslation();
  const [page, setPage] = useState(0);
  const [direction, setDirection] = useState(1);
  const [isActive, setIsActive] = useState(false);
  const timeoutRef = useRef(null);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const galleryRef = useRef(null);

  const totalPages = Math.ceil(images.length / IMAGES_PER_PAGE);
  const startIndex = page * IMAGES_PER_PAGE;
  const visibleImages = images.slice(startIndex, startIndex + IMAGES_PER_PAGE);

  const canPrev = page > 0;
  const canNext = page < totalPages - 1;

  const nextPage = () => {
    if (!isActive) return;
    setDirection(1);
    setPage((prev) => (canNext ? prev + 1 : 0));
  };

  const prevPage = () => {
    if (!isActive) return;
    setDirection(-1);
    setPage((prev) => (canPrev ? prev - 1 : totalPages - 1));
  };

  // Handle auto-scroll only when section is visible
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsActive(entry.isIntersecting);
        if (entry.isIntersecting) {
          startTimer();
        } else {
          clearTimer();
        }
      },
      { threshold: 0.5 }
    );

    if (galleryRef.current) {
      observer.observe(galleryRef.current);
    }

    return () => {
      observer.disconnect();
      clearTimer();
    };
  }, []);

  const startTimer = () => {
    clearTimer();
    timeoutRef.current = setTimeout(() => {
      nextPage();
    }, AUTO_SCROLL_INTERVAL);
  };

  const clearTimer = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  };

  // Restart timer when page changes
  useEffect(() => {
    if (isActive) {
      startTimer();
    }
    return () => clearTimer();
  }, [page, isActive]);

  const variants = {
    enter: (direction) => ({
      x: direction > 0 ? 100 : -100,
      opacity: 0,
      scale: 0.95
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1
    },
    exit: (direction) => ({
      x: direction < 0 ? 100 : -100,
      opacity: 0,
      scale: 0.95
    })
  };

  return (
    <section 
      id="gallery" 
      ref={galleryRef}
      className="py-20 bg-gradient-to-b from-green-50 to-white px-4 snap-start"
    >
      <div className="max-w-7xl mx-auto">
        <motion.h3 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-4xl font-bold text-gray-800 mb-12 text-center relative"
        >
          {t('gallery.title')}
          <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-20 h-1 bg-primary mt-2"></span>
        </motion.h3>

        <div className="relative group">
          {/* Navigation Buttons */}
          <button
            onClick={() => {
              prevPage();
              clearTimer();
            }}
            disabled={!canPrev || !isActive}
            className={`absolute left-0 top-1/2 -translate-y-1/2 -translate-x-12 z-10 p-3 rounded-full bg-white shadow-lg hover:bg-primary hover:text-white transition-all duration-300 ${
              !canPrev || !isActive ? 'opacity-50 cursor-not-allowed' : 'opacity-0 group-hover:opacity-100'
            }`}
          >
            <FiChevronLeft size={24} />
          </button>

          <button
            onClick={() => {
              nextPage();
              clearTimer();
            }}
            disabled={!canNext || !isActive}
            className={`absolute right-0 top-1/2 -translate-y-1/2 translate-x-12 z-10 p-3 rounded-full bg-white shadow-lg hover:bg-primary hover:text-white transition-all duration-300 ${
              !canNext || !isActive ? 'opacity-50 cursor-not-allowed' : 'opacity-0 group-hover:opacity-100'
            }`}
          >
            <FiChevronRight size={24} />
          </button>

          {/* Gallery Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            <AnimatePresence custom={direction} initial={false}>
              {visibleImages.map((src, index) => (
                <motion.div
                  key={`${page}-${index}`}
                  custom={direction}
                  variants={variants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ 
                    duration: 0.5,
                    ease: [0.2, 0, 0, 1] 
                  }}
                  className="relative overflow-hidden rounded-xl shadow-lg aspect-square"
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(null)}
                >
                  <img
                    src={src}
                    alt={`${t('gallery.image')} ${startIndex + index + 1}`}
                    className="object-cover w-full h-full transition-transform duration-500 hover:scale-105"
                    loading="lazy"
                  />
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ 
                      opacity: hoveredIndex === index ? 1 : 0,
                      transition: { duration: 0.3 }
                    }}
                    className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent flex items-end p-4"
                  >
                    <span className="text-white font-medium">
                      {t('gallery.image')} {startIndex + index + 1}
                    </span>
                  </motion.div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>

        {/* Pagination Dots */}
        <div className="flex justify-center mt-12 space-x-2">
          {Array.from({ length: totalPages }).map((_, i) => (
            <button
              key={i}
              onClick={() => {
                setDirection(i > page ? 1 : -1);
                setPage(i);
                clearTimer();
              }}
              className={`w-3 h-3 rounded-full transition-all ${
                i === page ? 'bg-primary w-6' : 'bg-gray-300'
              }`}
              aria-label={`Go to page ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}