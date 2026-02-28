import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { translations } from '../i18n/translations';

const LanguageContext = createContext(null);

function getByPath(obj, path) {
  return path.split('.').reduce((acc, key) => (acc && acc[key] !== undefined ? acc[key] : undefined), obj);
}

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState(() => localStorage.getItem('lang') || 'en');

  useEffect(() => {
    localStorage.setItem('lang', lang);
    document.documentElement.lang = lang === 'am' ? 'am' : 'en';
  }, [lang]);

  const value = useMemo(() => {
    const t = (path, fallback = '') => {
      const res = getByPath(translations[lang], path);
      return res === undefined ? fallback : res;
    };

    return {
      lang,
      setLang,
      toggleLanguage: () => setLang((prev) => (prev === 'en' ? 'am' : 'en')),
      t,
    };
  }, [lang]);

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within LanguageProvider');
  }
  return context;
}
