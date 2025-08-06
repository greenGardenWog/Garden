import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { plants } from '../data/plants';
import { FaFacebook, FaTelegram, FaPhone, FaLeaf, FaTint, FaSun, FaRulerVertical, FaSeedling } from 'react-icons/fa';
import { IoIosArrowForward } from 'react-icons/io';
import { GiPlantWatering } from 'react-icons/gi';
import { useTranslation } from 'react-i18next';

export default function PlantDetail() {
  const { id } = useParams();
  const { t, i18n } = useTranslation();
  const currentLanguage = i18n.language;
  const plant = plants.find(p => p.id == id);

  // Helper function to get plant text in current language
  const getPlantText = (plant, field) => {
    if (typeof plant[field] === 'object' && plant[field] !== null) {
      return plant[field][currentLanguage] || plant[field].en;
    }
    return plant[field];
  };

  // State for main image and sub images
const [mainImage, setMainImage] = useState(plant?.mainImage);
const [subImages, setSubImages] = useState(plant?.images || []);
  const [activeTab, setActiveTab] = useState('description');

  if (!plant) return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-green-50 to-white">
      <div className="text-center p-8 bg-white rounded-xl shadow-lg max-w-md border border-green-100">
        <div className="w-20 h-20 mx-auto mb-4 flex items-center justify-center bg-red-100 rounded-full">
          <svg className="w-10 h-10 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </div>
        <h2 className="text-2xl font-bold text-gray-800 mb-4">{t('plantDetail.notFoundTitle')}</h2>
        <p className="text-gray-600 mb-6">{t('plantDetail.notFoundMessage')}</p>
        <Link 
          to="/" 
          className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-lg hover:from-green-600 hover:to-green-700 transition-all duration-300 shadow-md hover:shadow-lg"
        >
          {t('plantDetail.browseGarden')}
          <IoIosArrowForward className={`ml-2 transition-transform group-hover:translate-x-1`} />
        </Link>
      </div>
    </div>
  );

const handleSubImageClick = (clickedImg) => {
  // If clicked image is already the main image, do nothing
  if (clickedImg === mainImage) return;
  
  // Otherwise, swap the clicked image with the main image
  setMainImage(clickedImg);
  
  // Update sub images by replacing the clicked image with the previous main image
  setSubImages(prevSubs => 
    prevSubs.map(img => img === clickedImg ? mainImage : img)
  );
};

  const shareOnFacebook = () => {
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`, '_blank');
  };

  const shareOnTelegram = () => {
    window.open(`https://t.me/share/url?url=${encodeURIComponent(window.location.href)}&text=${encodeURIComponent(t('plantDetail.shareMessage', { name: getPlantText(plant, 'names') }))}`, '_blank');
  };

 const handlePhoneClick = () => {
  const phoneNumber = '0943220560'; 
  if (/Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
    window.location.href = `tel:${phoneNumber.replace(/\s/g, '')}`;
  } else {
    alert(t('plantDetail.callUs', { phone: phoneNumber }));
  }
};

  return (
    <div className="px-4 py-12 max-w-7xl mx-auto bg-gradient-to-b from-green-50 to-white">
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

      {/* Breadcrumb Navigation */}
      <div className={`flex items-center text-sm text-gray-500 mt-8 mb-8 `}>
        <Link to="/" className="hover:text-green-600 transition-colors flex items-center">
          <svg className={`w-4 h-4 mr-1`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
          </svg>
          {t('breadcrumbs.home')}
        </Link>
        <IoIosArrowForward className={`mx-2 text-xs text-gray-400 `} />
        <Link to="/shop" className="hover:text-green-600 transition-colors flex items-center">
          <FaLeaf className={`w-3 h-3 mr-1`} />
          {t('breadcrumbs.plants')}
        </Link>
        <IoIosArrowForward className={`mx-2 text-xs text-gray-400 `} />
        <span className="text-green-600 font-medium">{getPlantText(plant, 'names')}</span>
      </div>

      {/* Title and Category Section */}
      <div className="mb-12 text-center relative">
        {plant.category && (
          <span className="inline-flex items-center px-4 py-1.5 mb-4 text-xs font-semibold tracking-wider text-green-600 bg-green-100 rounded-full uppercase shadow-inner">
            <FaSeedling className={`mr-1`} />
            {getPlantText(plant, 'category')}
          </span>
        )}
        <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-3 relative inline-block">
          {getPlantText(plant, 'names')}
          <span className="absolute bottom-0 left-0 w-full h-1.5 bg-gradient-to-r from-green-400 via-green-500 to-green-400 rounded-full"></span>
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          {getPlantText(plant, 'shortDescriptions')}
        </p>
      </div>

      {/* Main Content Area */}
      <div className={`flex flex-col lg:flex-row gap-8 mb-16 `}>
        {/* Image Gallery Section */}
        <div className="lg:w-1/2">
          <div className="mb-6 overflow-hidden rounded-3xl shadow-xl relative group border-4 border-white">
            <div className="absolute inset-0 bg-gradient-to-br from-green-100/30 to-green-200/20 z-10 pointer-events-none"></div>
            <img 
              src={mainImage} 
              alt={getPlantText(plant, 'names')} 
              className="w-full h-96 md:h-[500px] object-cover transition duration-500 group-hover:scale-105" 
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
              <span className="text-white font-medium text-lg">{getPlantText(plant, 'names')}</span>
            </div>
          </div>
          <div className="grid grid-cols-4 gap-3">
            {subImages.map((img, idx) => (
              <div 
                key={idx}
                className="overflow-hidden rounded-xl cursor-pointer transition-all duration-300 hover:shadow-lg hover:opacity-90 relative group border-2 border-white"
                onClick={() => handleSubImageClick(img)}
              >
                <img
                  src={img}
                  alt={`${getPlantText(plant, 'names')} ${idx}`}
                  className="h-24 w-full object-cover"
                />
                <div className={`absolute inset-0 ${mainImage === img ? 'bg-green-500/20' : 'bg-black/0'} transition-all duration-200`}></div>
              </div>
            ))}
          </div>
        </div>

        {/* Details Section */}
        <div className="lg:w-1/2">
          {/* Price and Quick Info */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-green-100 mb-8 bg-gradient-to-b from-white to-green-50">
            <div className="flex justify-between items-start mb-4">
              <div>
                <p className="text-3xl font-bold text-green-700">{plant.price}</p>
                {plant.originalPrice && (
                  <p className="text-lg text-gray-400 line-through">{plant.originalPrice}</p>
                )}
              </div>
              {plant.isPopular && (
                <span className="px-3 py-1 bg-gradient-to-r from-amber-100 to-amber-200 text-amber-800 text-xs font-medium rounded-full shadow-inner">
                  {t('plantDetail.popularChoice')}
                </span>
              )}
            </div>

            <button 
              onClick={handlePhoneClick}
              className="w-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white px-6 py-4 rounded-xl font-medium transition-all duration-300 transform hover:scale-[1.02] shadow-md hover:shadow-lg mb-6 flex items-center justify-center group"
            >
              <FaPhone className={`mr-3 transition-transform group-hover:scale-110`} />
              {t('plantDetail.contactExperts')}
            </button>

            {/* Plant Attributes */}
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="flex items-center p-3 bg-green-50 rounded-lg border border-green-100">
                <div className="p-2 bg-green-100 rounded-full shadow-inner" style={{ 'marginRight': '0.75rem' }}>
                  <FaSun className="text-green-600" />
                </div>
                <div>
                  <p className="text-xs text-gray-500">{t('plantDetail.lightNeeds')}</p>
                  <p className="font-medium text-gray-800">{getPlantText(plant, 'light') || t('plantDetail.mediumLight')}</p>
                </div>
              </div>
              <div className="flex items-center p-3 bg-blue-50 rounded-lg border border-blue-100">
                <div className="p-2 bg-blue-100 rounded-full shadow-inner" style={{ 'marginRight': '0.75rem' }}>
                  <GiPlantWatering className="text-blue-600 text-lg" />
                </div>
                <div>
                  <p className="text-xs text-gray-500">{t('plantDetail.waterFrequency')}</p>
                  <p className="font-medium text-gray-800">{getPlantText(plant, 'water') || t('plantDetail.weekly')}</p>
                </div>
              </div>
              {plant.size && (
                <div className="flex items-center p-3 bg-amber-50 rounded-lg border border-amber-100">
                  <div className="p-2 bg-amber-100 rounded-full shadow-inner" style={{ 'marginRight': '0.75rem' }}>
                    <FaRulerVertical className="text-amber-600" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">{t('plantDetail.matureSize')}</p>
                    <p className="font-medium text-gray-800">{plant.size}</p>
                  </div>
                </div>
              )}
              <div className="flex items-center p-3 bg-purple-50 rounded-lg border border-purple-100">
                <div className="p-2 bg-purple-100 rounded-full shadow-inner" style={{ 'marginRight': '0.75rem' }}>
                  <FaLeaf className="text-purple-600" />
                </div>
                <div>
                  <p className="text-xs text-gray-500">{t('plantDetail.careLevel')}</p>
                  <p className="font-medium text-gray-800">{getPlantText(plant, 'difficulty') || t('plantDetail.easy')}</p>
                </div>
              </div>
            </div>

            {/* Social Sharing */}
            <div className="border-t border-green-100 pt-4">
              <h4 className="text-sm font-medium text-gray-500 mb-3 flex items-center">
                <svg className="w-4 h-4 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                </svg>
                {t('plantDetail.sharePlant')}
              </h4>
              <div className="flex space-x-3">
                <button 
                  onClick={shareOnFacebook}
                  className="flex items-center justify-center p-3 bg-blue-50 hover:bg-blue-100 text-blue-600 rounded-lg transition-all duration-200 border border-blue-100 shadow-sm hover:shadow-md"
                >
                  <FaFacebook className="text-lg" />
                </button>
                <button 
                  onClick={shareOnTelegram}
                  className="flex items-center justify-center p-3 bg-blue-50 hover:bg-blue-100 text-blue-500 rounded-lg transition-all duration-200 border border-blue-100 shadow-sm hover:shadow-md"
                >
                  <FaTelegram className="text-lg" />
                </button>
                <button 
                  onClick={handlePhoneClick}
                  className="flex items-center justify-center p-3 bg-green-50 hover:bg-green-100 text-green-600 rounded-lg transition-all duration-200 border border-green-100 shadow-sm hover:shadow-md"
                >
                  <FaPhone className="text-lg" />
                </button>
              </div>
            </div>
          </div>

          {/* Tabs Navigation */}
          <div className="flex border-b border-green-100 mb-6">
            <button
              className={`px-4 py-3 font-medium text-sm flex items-center ${activeTab === 'description' ? 'text-green-600 border-b-2 border-green-600' : 'text-gray-500 hover:text-gray-700'}`}
              onClick={() => setActiveTab('description')}
            >
              <FaLeaf className={`${'mr-2'} ${activeTab === 'description' ? 'text-green-500' : 'text-gray-400'}`} />
              {t('plantDetail.description')}
            </button>
            <button
              className={`px-4 py-3 font-medium text-sm flex items-center ${activeTab === 'care' ? 'text-green-600 border-b-2 border-green-600' : 'text-gray-500 hover:text-gray-700'}`}
              onClick={() => setActiveTab('care')}
            >
              <FaTint className={`${'mr-2'} ${activeTab === 'care' ? 'text-blue-500' : 'text-gray-400'}`} />
              {t('plantDetail.careGuide')}
            </button>
            <button
              className={`px-4 py-3 font-medium text-sm flex items-center ${activeTab === 'shipping' ? 'text-green-600 border-b-2 border-green-600' : 'text-gray-500 hover:text-gray-700'}`}
              onClick={() => setActiveTab('shipping')}
            >
              <svg className={`w-4 h-4 ${'mr-2'} ${activeTab === 'shipping' ? 'text-amber-500' : 'text-gray-400'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
              {t('plantDetail.shippingInfo')}
            </button>
          </div>

          {/* Tab Content */}
          <div className="mb-8">
            {activeTab === 'description' && (
              <div className="bg-green-50/50 p-6 rounded-xl border border-green-100">
                <p className="text-gray-700 leading-relaxed mb-6">{getPlantText(plant, 'descriptions')}</p>
                {plant.features && (
                  <ul className="space-y-3">
                    {plant.features.map((feature, index) => (
                      <li key={index} className="flex items-start">
                        <span className="inline-flex items-center justify-center w-5 h-5 mr-2 bg-green-100 rounded-full flex-shrink-0">
                          <svg className="w-3 h-3 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                        </span>
                        <span className="text-gray-700">{getPlantText(plant, 'features')[index]}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            )}
            
            {activeTab === 'care' && (
              <div className="space-y-4">
                {plant.careTips ? (
                  plant.careTips.split('\n').map((tip, index) => (
                    <div key={index} className="flex items-start bg-white p-4 rounded-lg border border-green-100 shadow-sm">
                      <div className="flex-shrink-0 mt-1">
                        <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center shadow-inner">
                          <span className="text-green-600 text-xs font-bold">{index + 1}</span>
                        </div>
                      </div>
                      <p className="ml-3 text-gray-700">{getPlantText(plant, 'careTips').split('\n')[index]}</p>
                    </div>
                  ))
                ) : (
                  <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-100 text-yellow-700">
                    {t('plantDetail.noCareInfo')}
                  </div>
                )}
              </div>
            )}
            
            {activeTab === 'shipping' && (
              <div className="space-y-4">
                <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
                  <h5 className="font-medium text-blue-800 mb-2 flex items-center">
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                    {t('plantDetail.shippingPolicy')}
                  </h5>
                  <p className="text-blue-700 text-sm">{t('plantDetail.shippingPolicyText')}</p>
                </div>
                <div className="bg-amber-50 p-4 rounded-lg border border-amber-100">
                  <h5 className="font-medium text-amber-800 mb-2 flex items-center">
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    {t('plantDetail.deliveryInstructions')}
                  </h5>
                  <p className="text-amber-700 text-sm">{t('plantDetail.deliveryInstructionsText')}</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Related Plants Section */}
      <div className="mb-16">
        <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
          <svg className="w-6 h-6 mr-2 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
          </svg>
          {t('plantDetail.moreFromGarden')}
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {plants.filter(p => p.id !== plant.id).slice(0, 4).map(relatedPlant => (
            <Link 
              key={relatedPlant.id} 
              to={`/plant/${relatedPlant.id}`}
              className="group block overflow-hidden rounded-xl shadow-sm hover:shadow-md transition-all duration-300 border border-green-100 hover:border-green-200 bg-white"
            >
              <div className="relative overflow-hidden h-40">
                <img 
                  src={relatedPlant.images[0]} 
                  alt={getPlantText(relatedPlant, 'names')} 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                  <span className="text-white font-medium">{getPlantText(relatedPlant, 'names')}</span>
                </div>
              </div>
              <div className="p-4">
                <h4 className="font-medium text-gray-800 group-hover:text-green-600 transition-colors">
                  {getPlantText(relatedPlant, 'names')}
                </h4>
                <p className="text-green-600 font-medium">{relatedPlant.price}</p>
                <div className="mt-2 flex items-center text-xs text-gray-500">
                  <FaLeaf className={`w-3 h-3 mr-1 text-green-500`} />
                  {getPlantText(relatedPlant, 'category')}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}