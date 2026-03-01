import { useEffect, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { photos, telegramUrl } from '../assets/siteData';

function linkClass({ isActive }) {
  return `transition hover:text-primary focus-visible:text-primary ${isActive ? 'text-primary' : 'text-slate-700'}`;
}

function Navbar() {
  const [open, setOpen] = useState(false);
  const { lang, toggleLanguage, t } = useLanguage();

  const links = [
    { label: t('nav.home'), to: '/' },
    { label: t('nav.about'), to: '/about' },
    { label: t('nav.academics'), to: '/academics' },
    { label: t('nav.facilities'), to: '/facilities' },
    { label: t('nav.events'), to: '/events' },
    { label: t('nav.news'), to: '/news' },
    { label: t('nav.gallery'), to: '/gallery' },
    { label: t('nav.downloads'), to: '/downloads' },
    { label: t('nav.contact'), to: '/contact' },
  ];

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  return (
    <header className="relative sticky top-0 z-50 border-b border-slate-200/70 bg-white/95 backdrop-blur">
      <nav className="container-shell flex h-20 items-center justify-between gap-6" aria-label="Main navigation">
        <Link to="/" className="flex min-w-0 items-center gap-3" aria-label="Merkezel Burhan School home" onClick={() => setOpen(false)}>
          <img src={photos.logo} alt="Merkezel Burhan School logo" className="h-11 w-11 rounded-xl object-cover shadow-soft" loading="lazy" decoding="async" />
          <div className="min-w-0">
            <p className="truncate font-heading text-base font-semibold text-slate-900">{t('school.name')}</p>
            <p className="truncate text-xs text-slate-500">{t('school.location')}</p>
          </div>
        </Link>

        <ul className="hidden items-center gap-5 text-sm font-medium xl:flex">
          {links.map((link) => (
            <li key={link.label}>
              <NavLink to={link.to} className={linkClass}>
                {link.label}
              </NavLink>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2 md:gap-3">
          <a
            href={telegramUrl}
            target="_blank"
            rel="noreferrer noopener"
            className="hidden rounded-xl bg-accent px-3 py-2 text-xs font-semibold text-slate-900 transition hover:-translate-y-0.5 hover:bg-amber-500 md:inline-flex"
          >
            {t('nav.joinTelegram')}
          </a>

          <button
            type="button"
            className="hidden rounded-xl border border-slate-300 px-3 py-2 text-xs font-semibold text-slate-700 transition hover:border-primary hover:text-primary md:inline-flex"
            onClick={toggleLanguage}
            aria-label={t('nav.language')}
          >
            {lang === 'en' ? 'አማ' : 'EN'}
          </button>

          <button
            type="button"
            className={`relative inline-flex h-11 w-11 items-center justify-center rounded-xl border transition-all duration-300 md:hidden ${
              open
                ? 'border-primary bg-primary text-white shadow-soft'
                : 'border-slate-300 bg-white text-slate-700 hover:border-primary hover:text-primary'
            }`}
            onClick={() => setOpen((prev) => !prev)}
            aria-label={open ? t('nav.closeMenu') : t('nav.openMenu')}
            aria-expanded={open}
            aria-controls="mobile-menu"
          >
            <span className="sr-only">{open ? t('nav.closeMenu') : t('nav.openMenu')}</span>
            <svg className={`h-5 w-5 transition-all duration-300 ${open ? 'rotate-90 scale-95' : ''}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              {open ? (
                <path d="M6 6l12 12M18 6l-12 12" strokeLinecap="round" />
              ) : (
                <path d="M4 7h16M4 12h16M4 17h16" strokeLinecap="round" />
              )}
            </svg>
          </button>
        </div>
      </nav>

      <button
        type="button"
        aria-label="Close mobile menu backdrop"
        tabIndex={open ? 0 : -1}
        onClick={() => setOpen(false)}
        className={`fixed inset-0 z-40 bg-slate-900/30 backdrop-blur-sm transition-opacity duration-300 md:hidden ${
          open ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0'
        }`}
      />

      <div
        id="mobile-menu"
        className={`absolute left-0 right-0 top-full z-50 border-b border-slate-200 bg-white/95 shadow-soft backdrop-blur-md transition-all duration-300 md:hidden ${
          open ? 'pointer-events-auto translate-y-0 opacity-100' : 'pointer-events-none -translate-y-3 opacity-0'
        }`}
      >
        <ul className="container-shell max-h-[75vh] overflow-y-auto py-4">
          <li className="mb-3 flex items-center justify-between gap-3 px-1">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">{t('nav.openMenu')}</p>
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="inline-flex h-9 items-center gap-2 rounded-lg border border-slate-300 px-3 text-xs font-semibold text-slate-600 transition hover:border-primary hover:text-primary"
              aria-label={t('nav.closeMenu')}
            >
              <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M6 6l12 12M18 6l-12 12" strokeLinecap="round" />
              </svg>
              {t('nav.closeMenu')}
            </button>
          </li>
          <li className="mb-2">
            <a
              href={telegramUrl}
              target="_blank"
              rel="noreferrer noopener"
              className="block w-full rounded-xl bg-accent px-4 py-3 text-left text-sm font-semibold text-slate-900 transition hover:bg-amber-500"
            >
              {t('nav.joinTelegram')}
            </a>
          </li>
          <li className="mb-2">
            <button
              type="button"
              onClick={toggleLanguage}
              className="w-full rounded-xl border border-slate-300 px-4 py-3 text-left text-sm font-semibold text-slate-700 transition hover:border-primary hover:text-primary"
            >
              {t('nav.language')}: {lang === 'en' ? 'አማ' : 'EN'}
            </button>
          </li>
          {links.map((link, index) => (
            <li key={link.label}>
              <NavLink
                to={link.to}
                className={({ isActive }) =>
                  `block rounded-xl px-4 py-3 text-sm font-semibold transition ${
                    isActive ? 'bg-blue-50 text-primary' : 'text-slate-700 hover:bg-slate-100'
                  }`
                }
                style={{
                  transitionDelay: open ? `${index * 40}ms` : '0ms',
                  transform: open ? 'translateY(0)' : 'translateY(-8px)',
                  opacity: open ? 1 : 0,
                }}
                onClick={() => setOpen(false)}
              >
                {link.label}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
    </header>
  );
}

export default Navbar;
