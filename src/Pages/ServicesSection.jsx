import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { FaHeart, FaBirthdayCake, FaBuilding } from 'react-icons/fa';
import { GiBigDiamondRing, GiPartyPopper, GiGraduateCap } from 'react-icons/gi';

function ServicesSection() {
  const { t } = useTranslation();

  const services = [
    {
      id: 1,
      type: 'wedding',
      icon: <GiBigDiamondRing size={28} />,
      bgColor: 'bg-green-50',
      accentColor: 'from-green-100 to-green-50',
      textColor: 'text-green-600',
      borderColor: 'border-green-200',
      floralColor: 'text-green-300'
    },
    {
      id: 2,
      type: 'birthday',
      icon: <GiPartyPopper size={28} />,
      bgColor: 'bg-emerald-50',
      accentColor: 'from-emerald-100 to-emerald-50',
      textColor: 'text-emerald-600',
      borderColor: 'border-emerald-200',
      floralColor: 'text-emerald-300'
    },
    {
      id: 3,
      type: 'corporate',
      icon: <GiGraduateCap size={28} />,
      bgColor: 'bg-teal-50',
      accentColor: 'from-teal-100 to-teal-50',
      textColor: 'text-teal-600',
      borderColor: 'border-teal-200',
      floralColor: 'text-teal-300'
    }
  ];

  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const item = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5
      }
    }
  };

  return (
    <section id="services" className="py-20 px-4 relative overflow-hidden bg-gradient-to-b from-green-50 to-white">
      {/* Decorative garden elements */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        {/* Floral cluster - top left */}
        <div className="absolute top-10 left-10 w-24 h-24 opacity-20">
          <svg viewBox="0 0 100 100" className="text-green-300">
            <path d="M50 0C60 20 80 30 80 50C80 70 60 80 50 100C40 80 20 70 20 50C20 30 40 20 50 0Z" fill="currentColor"/>
          </svg>
        </div>
        
        {/* Leaf spray - bottom right */}
        <div className="absolute bottom-20 right-20 w-32 h-32 opacity-15">
          <svg viewBox="0 0 100 100" className="text-green-400">
            <path d="M10 50Q30 10 50 30Q70 10 90 50Q70 90 50 70Q30 90 10 50Z" fill="currentColor"/>
          </svg>
        </div>
        
        {/* Vine pattern - sides */}
        <div className="absolute left-0 top-1/3 w-16 h-64 opacity-10">
          <svg viewBox="0 0 50 200" className="text-green-500">
            <path d="M25 0Q0 30 25 60Q50 90 25 120Q0 150 25 180Q50 210 25 200" fill="none" stroke="currentColor" strokeWidth="8"/>
          </svg>
        </div>
        <div className="absolute right-0 bottom-1/4 w-16 h-64 opacity-10">
          <svg viewBox="0 0 50 200" className="text-green-500">
            <path d="M25 0Q50 30 25 60Q0 90 25 120Q50 150 25 180Q0 210 25 200" fill="none" stroke="currentColor" strokeWidth="8"/>
          </svg>
        </div>
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Section header with garden-inspired styling */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h3 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4 relative inline-block">
            <span className="relative z-10">
              {t('services.title')}
              <span className="absolute bottom-0 left-0 w-full h-2 bg-gradient-to-r from-green-300 to-emerald-400 rounded-full"></span>
            </span>
          </h3>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            {t('services.subtitle')}
          </p>
        </motion.div>

        {/* Services grid with garden-themed cards */}
        <motion.div 
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {services.map((service) => (
            <motion.div 
              key={service.id}
              variants={item}
              whileHover={{ y: -8, scale: 1.02 }}
              className={`group relative rounded-xl shadow-lg p-8 transition-all duration-300 hover:shadow-xl border ${service.borderColor} overflow-hidden ${service.bgColor}`}
            >
              {/* Floral decorative element */}
              <div className={`absolute -top-10 -right-10 w-32 h-32 opacity-20 ${service.floralColor}`}>
                <svg viewBox="0 0 100 100">
                  <path d="M50 0C60 20 80 30 80 50C80 70 60 80 50 100C40 80 20 70 20 50C20 30 40 20 50 0Z" fill="currentColor"/>
                </svg>
              </div>
              
              {/* Service icon in a floral-inspired container */}
              <div className={`w-20 h-20 bg-gradient-to-br ${service.accentColor} rounded-2xl flex items-center justify-center mb-6 mx-auto border ${service.borderColor} shadow-inner`}>
                <div className={`${service.textColor} text-3xl`}>
                  {service.icon}
                </div>
              </div>
              
              <h4 className={`text-xl font-bold text-gray-800 mb-3 group-hover:${service.textColor} transition-colors`}>
                {t(`services.item${service.id}.title`)}
              </h4>
              <p className="text-gray-600 mb-4">
                {t(`services.item${service.id}.desc`)}
              </p>
              
              {/* Learn more link styled like a growing vine */}
              <div className="mt-6 pt-4 border-t border-gray-100 relative">
                <div className="absolute top-0 left-0 w-8 h-px bg-gradient-to-r from-green-400 to-transparent"></div>
                <a 
                  href="#contact" 
                  className={`inline-flex items-center ${service.textColor} font-medium group-hover:underline`}
                >
                  {t('contact.title')}
                  <svg className={`w-4 h-4 ml-2 transition-transform group-hover:translate-x-1 ${service.textColor}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </a>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA styled as a garden path */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center mt-20"
        >
          <div className="relative inline-block">
            <div className="absolute -inset-1 bg-gradient-to-r from-green-400 to-emerald-600 rounded-full blur opacity-20 group-hover:opacity-30 transition"></div>
            <a 
              href="#gallery" 
              className="relative inline-block px-8 py-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-full font-semibold shadow-lg hover:shadow-xl transition-all hover:brightness-110"
            >
              {t('services.cta')}
              <span className="absolute bottom-0 left-1/2 w-4/5 h-1 bg-white/50 rounded-full -translate-x-1/2 translate-y-1"></span>
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default ServicesSection;