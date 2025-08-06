import React from 'react';
import { plants } from '../data/plants';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { FaLeaf, FaSeedling, FaSearch } from 'react-icons/fa';

export default function PlantList() {
  const { t, i18n } = useTranslation();
  const currentLanguage = i18n.language;

  // Helper function to get plant text in current language
  const getPlantText = (plant, field) => {
    // If the field is an object (multi-language), get current language version
    if (typeof plant[field] === 'object' && plant[field] !== null) {
      return plant[field][currentLanguage] || plant[field].en;
    }
    // If it's a string (legacy), just return it
    return plant[field];
  };

  return (
    <div className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto bg-gradient-to-b from-green-50 to-white" >
      {/* Decorative garden elements */}
      <div className="fixed inset-0 -z-10 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 left-10 w-32 h-32 opacity-10">
          <svg viewBox="0 0 100 100" className="text-green-300">
            <path d="M50 0C60 20 80 30 80 50C80 70 60 80 50 100C40 80 20 70 20 50C20 30 40 20 50 0Z" fill="currentColor"/>
          </svg>
        </div>
        <div className="absolute bottom-1/3 right-20 w-24 h-24 opacity-15">
          <svg viewBox="0 0 100 100" className="text-green-400">
            <path d="M10 50Q30 10 50 30Q70 10 90 50Q70 90 50 70Q30 90 10 50Z" fill="currentColor"/>
          </svg>
        </div>
      </div>

      {/* Header Section with garden styling */}
      <div className="text-center mt-6 mb-16 relative">
        <div className="inline-flex items-center justify-center w-16 h-16 mb-6 rounded-full bg-green-100 text-green-600">
          <FaLeaf className="text-2xl" />
        </div>
        <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
          <span className="relative">
            {t('shop.plantsForSale')}
            <span className="absolute bottom-0 left-0 w-full h-1.5 bg-gradient-to-r from-green-400 to-green-500 rounded-full"></span>
          </span>
        </h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          {t('shop.plantsDescription')}
        </p>
      </div>

      {/* Plants Grid with garden cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {plants.map((plant) => (
          <Link 
            to={`/shop/${plant.id}`} 
            key={plant.id} 
            className="group relative bg-white rounded-2xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-2 border border-green-100"
          >
            {/* Image Container with garden frame */}
            <div className="relative h-72 overflow-hidden">
              <img
                src={plant.mainImage}
                alt={getPlantText(plant, 'names')}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              {/* Category Badge with leaf icon */}
              {plant.category && (
                <span className="absolute top-4 left-4 px-3 py-1.5 text-xs font-semibold text-white bg-gradient-to-r from-green-500 to-green-600 rounded-full shadow-sm flex items-center">
                  <FaSeedling className= 'mr-1' />
                  {getPlantText(plant, 'category')}
                </span>
              )}
              {/* Price Tag */}
              <span className="absolute bottom-4 right-4 px-3 py-1.5 text-sm font-bold text-white bg-black/70 rounded-full backdrop-blur-sm">
                {plant.price}
              </span>
              {/* Hover Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                <span className="text-white font-medium text-lg">{getPlantText(plant, 'names')}</span>
              </div>
            </div>

            {/* Plant Info */}
            <div className="p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-green-600 transition-colors">
                {getPlantText(plant, 'names')}
              </h3>
              <p className="text-gray-500 text-sm line-clamp-2 mb-4">
                {getPlantText(plant, 'shortDescriptions')}
              </p>
              
              <div className="flex justify-between items-center pt-3 border-t border-green-100">
                <div className="flex items-center text-xs text-gray-500">
                  <FaLeaf className={`w-3 h-3 mr-1 text-green-500`} />
                  {getPlantText(plant, 'difficulty') || t('shop.easyCare')}
                </div>
                <button className="text-sm font-medium text-green-600 hover:text-green-800 transition-colors flex items-center">
                  {t('shop.viewDetails')}
                  <svg className={`w-4 h-4 ml-1 transition-transform group-hover:translate-x-1`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* View More Button with garden styling */}
      <div className="text-center mt-16">
        <button className="relative inline-flex items-center px-8 py-4 bg-gradient-to-r from-green-500 to-green-600 text-white font-medium rounded-full hover:from-green-600 hover:to-green-700 transition-all duration-300 shadow-lg hover:shadow-xl overflow-hidden group">
          <span className="relative z-10 flex items-center">
            {t('shop.viewAllPlants')}
            <svg className={`w-4 h-4 ml-2 transition-transform group-hover:translate-x-1`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </span>
          <span className="absolute inset-0 bg-gradient-to-r from-green-400 to-green-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
        </button>
      </div>
    </div>
  );
}