import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { translations } from '../i18n/translations';

const LanguageContext = createContext(null);

function getByPath(obj, path) {
  return path.split('.').reduce((acc, key) => (acc && acc[key] !== undefined ? acc[key] : undefined), obj);
}

function detectInitialLanguage() {
  const saved = localStorage.getItem('lang');
  if (saved === 'en' || saved === 'am') return saved;
  const browserLang = (navigator.language || '').toLowerCase();
  return browserLang.startsWith('am') ? 'am' : 'en';
}

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState(() => detectInitialLanguage());

  useEffect(() => {
    localStorage.setItem('lang', lang);
    document.documentElement.lang = lang;
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
