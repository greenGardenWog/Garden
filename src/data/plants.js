// src/data/plants.js
export const plants = [
  {
    id: 'aloe',
    names: {
      en: 'Aloe Vera',
      am: 'አሎ ቬራ'
    },
    //`${import.meta.env.BASE_URL}home/home.jpg`,
    mainImage: `${import.meta.env.BASE_URL}plants/aloe/main.jpg`,
    //'/plants/aloe/main.jpg',
    images: [
      `${import.meta.env.BASE_URL}plants/aloe/1.jpg`,
      `${import.meta.env.BASE_URL}plants/aloe/2.jpg`,
      `${import.meta.env.BASE_URL}plants/aloe/3.jpg`,
      `${import.meta.env.BASE_URL}plants/aloe/4.jpg`,
    ],
    descriptions: {
      en: 'Aloe Vera is a succulent plant species great for skincare and health.',
      am: 'አሎ ቬራ ለቆዳ እና ለጤና ጠቃሚ የሆነ succulent ተክል ነው።'
    },
    shortDescriptions: {
      en: 'Great for skincare and health',
      am: 'ለቆዳ እና ጤና ጠቃሚ'
    },
    price: '159 ETB', // Or you could make this object { en: '159 ETB', am: '159 ብር' }
    category: {
      en: 'Succulent',
      am: 'Succulent' // Or translation if available
    },
    light: {
      en: 'Bright indirect light',
      am: 'ገላጭ ብርሃን'
    },
    water: {
      en: 'Every 2 weeks',
      am: 'በየ 2 ሳምንቱ'
    },
    difficulty: {
      en: 'Easy',
      am: 'ቀላል'
    }
  },
  {
    id: 'cactus',
    names: {
      en: 'Cactus',
      am: 'ካክተስ'
    },
    // mainImage: '/plants/cactus/main.jpg',
    // images: [
    //   '/plants/cactus/1.jpg',
    //   '/plants/cactus/2.jpg',
    //   '/plants/cactus/3.jpg',
    //   '/plants/cactus/4.jpg'
    // ],

    mainImage: `${import.meta.env.BASE_URL}plants/cactus/main.jpg`,
    //'/plants/aloe/main.jpg',
    images: [
      `${import.meta.env.BASE_URL}plants/cactus/1.jpg`,
      `${import.meta.env.BASE_URL}plants/cactus/2.jpg`,
      `${import.meta.env.BASE_URL}plants/cactus/3.jpg`,
      `${import.meta.env.BASE_URL}plants/cactus/4.jpg`,
    ],
    descriptions: {
      en: 'Cactus is a low-maintenance plant, perfect for indoor decor.',
      am: 'ካክተስ ትንሽ እንክብካቤ የሚጠይቅ ተክል ሲሆን በቤት ውስጥ ለጌጣጌጥ ተስማሚ ነው።'
    },
    shortDescriptions: {
      en: 'Low-maintenance indoor plant',
      am: 'ትንሽ እንክብካቤ የሚጠይቅ የቤት ውስጥ ተክል'
    },
    price: '200 ETB',
    category: {
      en: 'Succulent',
      am: 'Succulent'
    },
    light: {
      en: 'Direct sunlight',
      am: 'ቀጥተኛ የፀሐይ ብርሃን'
    },
    water: {
      en: 'Every 3 weeks',
      am: 'በየ 3 ሳምንቱ'
    },
    difficulty: {
      en: 'Easy',
      am: 'ቀላል'
    },
  }
];
