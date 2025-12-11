import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import translations from '../locales/translations';

const DEFAULT_LANGUAGE = 'en';

export const useTranslation = () => {
  const current = useSelector((state) => state.language.current);

  const dictionary = useMemo(() => {
    return translations[current] || translations[DEFAULT_LANGUAGE];
  }, [current]);

  const t = (key) => {
    return dictionary[key] ?? translations[DEFAULT_LANGUAGE][key] ?? key;
  };

  return { t, currentLanguage: current };
};

export default useTranslation;
