const translations = {
  en: {
    languageLabel: 'English',
    searchPlaceholderDesktop: 'Search for restaurants, foods, beverages...',
    searchPlaceholderMobile: 'Search food or restaurant',
    searchButton: 'Search',
    enterAddress: 'Enter delivery address',
    locationComingSoon: 'We will provide location feature soon😊',
    profile: 'Profile',
    signUp: 'Sign Up',
    restaurants: 'Restaurants',
    products: 'Products',
    back: 'Back',
    nothingFound: 'Nothing was found',
    goToRestaurant: 'Go to restaurant'
  },
  ru: {
    languageLabel: 'Русский',
    searchPlaceholderDesktop: 'Найдите рестораны, блюда, напитки...',
    searchPlaceholderMobile: 'Поиск ресторана или блюда',
    searchButton: 'Поиск',
    enterAddress: 'Введите адрес доставки',
    locationComingSoon: 'Мы скоро добавим функцию определения локации 😊',
    profile: 'Профиль',
    signUp: 'Регистрация',
    restaurants: 'Рестораны',
    products: 'Продукты',
    back: 'Назад',
    nothingFound: 'Ничего не найдено',
    goToRestaurant: 'Перейти в ресторан'
  },
  uz: {
    languageLabel: "O'zbekcha",
    searchPlaceholderDesktop: "Restoranlar, taomlar, ichimliklarni qidiring...",
    searchPlaceholderMobile: "Taom yoki restoran qidiring",
    searchButton: 'Qidirish',
    enterAddress: 'Yetkazib berish manzilini kiriting',
    locationComingSoon: "Joylashuv funksiyasi tez orada qo'shiladi 😊",
    profile: 'Profil',
    signUp: "Roʻyxatdan o‘tish",
    restaurants: 'Restoranlar',
    products: 'Mahsulotlar',
    back: 'Orqaga',
    nothingFound: 'Hech narsa topilmadi',
    goToRestaurant: 'Restoranga o‘tish'
  },
  kk: {
    languageLabel: 'Қазақша',
    searchPlaceholderDesktop: 'Мейрамханалар, тағамдар, сусындарды іздеңіз...',
    searchPlaceholderMobile: 'Тағам немесе мейрамхана іздеу',
    searchButton: 'Іздеу',
    enterAddress: 'Жеткізу мекенжайын енгізіңіз',
    locationComingSoon: 'Орналасуды анықтау мүмкіндігі жақында қосылады 😊',
    profile: 'Профиль',
    signUp: 'Тіркелу',
    restaurants: 'Мейрамханалар',
    products: 'Өнімдер',
    back: 'Артқа',
    nothingFound: 'Ештеңе табылмады',
    goToRestaurant: 'Мейрамханаға өту'
  }
};

export const supportedLanguages = [
  { code: 'en', label: translations.en.languageLabel },
  { code: 'ru', label: translations.ru.languageLabel },
  { code: 'uz', label: translations.uz.languageLabel },
  { code: 'kk', label: translations.kk.languageLabel }
];

export default translations;
