import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { FiSend, FiUser, FiMail, FiMessageSquare, FiPhone, FiExternalLink } from 'react-icons/fi';
import { FaTelegram, FaWhatsapp } from 'react-icons/fa';
import emailjs from 'emailjs-com';
import Swal from 'sweetalert2';

function ContactSection() {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Contact information (replace with your actual details)
  const phoneNumber = '0943220560';
  const telegramUsername = 'Addisgashaw';
  const whatsappNumber = '251943220560';
  const emailAddress = 'your.email@example.com';

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = t('contact.errors.name');
    if (!formData.email.trim()) {
      newErrors.email = t('contact.errors.emailRequired');
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = t('contact.errors.emailInvalid');
    }
    if (!formData.message.trim()) newErrors.message = t('contact.errors.message');
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const showSuccessAlert = () => {
    Swal.fire({
      title: t('contact.success.title'),
      text: t('contact.success.message'),
      icon: 'success',
      confirmButtonColor: '#4CAF50',
      confirmButtonText: 'OK',
      customClass: {
        popup: 'bg-green-50 border border-green-200',
        title: 'text-gray-800',
        confirmButton: 'bg-green-600 hover:bg-green-700'
      }
    });
  };

  const showErrorAlert = (error) => {
    Swal.fire({
      title: t('contact.errors.submit'),
      text: error.text || t('contact.errors.generic'),
      icon: 'error',
      confirmButtonColor: '#EF4444',
      confirmButtonText: 'Try Again'
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);

    emailjs.send(
      'service_qhnxx6j',
      'template_7pzpe0a',
      {
        to_email: emailAddress,
        from_name: formData.name,
        from_email: formData.email,
        reply_to: formData.email,
        message: formData.message,
        subject: 'New Contact Form Submission'
      },
      'PKnby5Rq-ahdXKORU'
    )
    .then(() => {
      showSuccessAlert();
      setFormData({ name: '', email: '', message: '' });
    })
    .catch((error) => {
      showErrorAlert(error);
    })
    .finally(() => {
      setIsSubmitting(false);
    });
  };

  const handlePhoneClick = () => {
    if (/Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
      window.location.href = `tel:${phoneNumber}`;
    } else {
      Swal.fire({
        title: t('contact.callMe'),
        text: phoneNumber,
        icon: 'info',
        confirmButtonText: 'OK'
      });
    }
  };

  const handleTelegramClick = () => {
    window.open(`https://t.me/${telegramUsername}`, '_blank');
  };

  const handleWhatsAppClick = () => {
    window.open(`https://wa.me/${whatsappNumber}`, '_blank');
  };

  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: [0.2, 0, 0, 1]
      }
    }
  };

  return (
    <section id="contact" className="py-20 px-4 relative overflow-hidden bg-green-50">
      {/* Nature-inspired background elements */}
      <div className="absolute inset-0 z-0">
        {/* Gradient sky */}
        <div className="absolute inset-0 bg-gradient-to-b from-green-50 to-green-100"></div>
        
        {/* Ground effect */}
        <div className="absolute bottom-0 left-0 w-full h-1/3 bg-green-700 opacity-10"></div>
        
        {/* Leaf patterns */}
        <div className="absolute top-10 left-10 w-20 h-20 opacity-20">
          <svg viewBox="0 0 100 100" className="text-green-600">
            <path fill="currentColor" d="M50,0 C60,20 80,30 80,50 C80,70 60,80 50,100 C40,80 20,70 20,50 C20,30 40,20 50,0 Z" />
          </svg>
        </div>
        <div className="absolute top-1/4 right-20 w-16 h-16 opacity-15">
          <svg viewBox="0 0 100 100" className="text-green-700">
            <path fill="currentColor" d="M50,0 C60,20 80,30 80,50 C80,70 60,80 50,100 C40,80 20,70 20,50 C20,30 40,20 50,0 Z" />
          </svg>
        </div>
        <div className="absolute bottom-20 left-1/3 w-24 h-24 opacity-10">
          <svg viewBox="0 0 100 100" className="text-green-800">
            <path fill="currentColor" d="M50,0 C60,20 80,30 80,50 C80,70 60,80 50,100 C40,80 20,70 20,50 C20,30 40,20 50,0 Z" />
          </svg>
        </div>
        <div className="absolute bottom-1/3 right-10 w-12 h-12 opacity-15">
          <svg viewBox="0 0 100 100" className="text-green-600">
            <path fill="currentColor" d="M50,0 C60,20 80,30 80,50 C80,70 60,80 50,100 C40,80 20,70 20,50 C20,30 40,20 50,0 Z" />
          </svg>
        </div>
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h3 className="text-4xl font-bold text-gray-800 mb-4 relative inline-block">
            {t('contact.title')}
            <span className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-green-500 to-transparent"></span>
          </h3>
          <p className="text-lg text-gray-700 max-w-2xl mx-auto">
            {t('contact.subtitle')}
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Contact Form */}
          <motion.form
            variants={container}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            onSubmit={handleSubmit}
            className="bg-white/90 backdrop-blur-sm p-8 rounded-xl shadow-lg border border-green-100"
          >
            <motion.div variants={item} className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FiUser className="text-gray-400" />
              </div>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder={t('contact.name')}
                className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all ${
                  errors.name ? 'border-red-300' : 'border-gray-200'
                }`}
              />
              {errors.name && (
                <p className="text-red-500 text-sm mt-1">{errors.name}</p>
              )}
            </motion.div>

            <motion.div variants={item} className="relative mt-6">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FiMail className="text-gray-400" />
              </div>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder={t('contact.email')}
                className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all ${
                  errors.email ? 'border-red-300' : 'border-gray-200'
                }`}
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">{errors.email}</p>
              )}
            </motion.div>

            <motion.div variants={item} className="relative mt-6">
              <div className="absolute top-3 left-3">
                <FiMessageSquare className="text-gray-400" />
              </div>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder={t('contact.message')}
                rows="5"
                className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all ${
                  errors.message ? 'border-red-300' : 'border-gray-200'
                }`}
              ></textarea>
              {errors.message && (
                <p className="text-red-500 text-sm mt-1">{errors.message}</p>
              )}
            </motion.div>

            <motion.button
              variants={item}
              type="submit"
              disabled={isSubmitting}
              className={`mt-6 flex items-center justify-center gap-2 py-3 px-6 rounded-lg transition-all duration-300 shadow-md ${
                isSubmitting
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-green-600 hover:bg-green-700 text-white'
              }`}
            >
              {isSubmitting ? (
                <span className="inline-block h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
              ) : (
                <>
                  {t('contact.send')}
                  <FiSend className="transition-transform group-hover:translate-x-1" />
                </>
              )}
            </motion.button>
          </motion.form>

          {/* Direct Contact Methods */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-white/90 backdrop-blur-sm p-8 rounded-xl shadow-lg space-y-6 border border-green-100"
          >
            <h4 className="text-2xl font-semibold text-gray-800">{t('contact.directContact')}</h4>
            <p className="text-gray-600">{t('contact.directContactDesc')}</p>
            
            {/* Phone */}
            <div 
              onClick={handlePhoneClick}
              className="flex items-center p-4 bg-blue-50 rounded-lg cursor-pointer hover:bg-blue-100 transition-colors group"
            >
              <div className="p-3 bg-blue-100 rounded-full mr-4 group-hover:bg-blue-200 transition-colors">
                <FiPhone className="text-blue-600 text-xl" />
              </div>
              <div>
                <h5 className="font-medium text-gray-800">{t('contact.callMe')}</h5>
                <p className="text-gray-600">{phoneNumber}</p>
              </div>
              <FiExternalLink className="ml-auto text-gray-400 group-hover:text-blue-500" />
            </div>

            {/* Telegram */}
            <div 
              onClick={handleTelegramClick}
              className="flex items-center p-4 bg-blue-50 rounded-lg cursor-pointer hover:bg-blue-100 transition-colors group"
            >
              <div className="p-3 bg-blue-100 rounded-full mr-4 group-hover:bg-blue-200 transition-colors">
                <FaTelegram className="text-blue-500 text-xl" />
              </div>
              <div>
                <h5 className="font-medium text-gray-800">Telegram</h5>
                <p className="text-gray-600">@{telegramUsername}</p>
              </div>
              <FiExternalLink className="ml-auto text-gray-400 group-hover:text-blue-500" />
            </div>

            {/* WhatsApp */}
            <div 
              onClick={handleWhatsAppClick}
              className="flex items-center p-4 bg-green-50 rounded-lg cursor-pointer hover:bg-green-100 transition-colors group"
            >
              <div className="p-3 bg-green-100 rounded-full mr-4 group-hover:bg-green-200 transition-colors">
                <FaWhatsapp className="text-green-600 text-xl" />
              </div>
              <div>
                <h5 className="font-medium text-gray-800">WhatsApp</h5>
                <p className="text-gray-600">+{whatsappNumber}</p>
              </div>
              <FiExternalLink className="ml-auto text-gray-400 group-hover:text-green-500" />
            </div>

            {/* Additional Info */}
            <div className="pt-4 border-t border-gray-100">
              <p className="text-sm text-gray-500">
                {t('contact.responseTime')}
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default ContactSection;