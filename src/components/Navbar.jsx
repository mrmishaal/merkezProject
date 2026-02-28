import { useEffect, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import schoolLogo from '../assets/photos/generalPhotos/photo_53_2026-02-28_04-10-57.jpg';

function linkClass({ isActive }) {
  return `transition hover:text-primary ${isActive ? 'text-primary' : 'text-slate-700'}`;
}

function Navbar() {
  const [open, setOpen] = useState(false);
  const { lang, toggleLanguage, t } = useLanguage();

  const links = [
    { label: t('nav.home'), to: '/' },
    { label: t('nav.about'), to: '/about' },
    { label: t('nav.academics'), to: '/academics' },
    { label: t('nav.news'), to: '/news' },
    { label: t('nav.gallery'), to: '/gallery' },
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
      <nav className="container-shell flex h-20 items-center justify-between" aria-label="Main navigation">
        <Link to="/" className="flex items-center gap-3" aria-label="Merkezel Burhan School home" onClick={() => setOpen(false)}>
          <img src={schoolLogo} alt="Merkezel Burhan School logo" className="h-11 w-11 rounded-xl object-cover shadow-soft" />
          <div>
            <p className="font-heading text-base font-semibold text-slate-900">{t('school.name')}</p>
            <p className="text-xs text-slate-500">{t('school.location')}</p>
          </div>
        </Link>

        <div className="flex items-center gap-2 md:gap-3">
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
            className={`inline-flex h-11 w-11 items-center justify-center rounded-xl border text-slate-700 transition-all duration-300 md:hidden ${
              open
                ? 'border-primary bg-primary text-white shadow-soft'
                : 'border-slate-300 bg-white hover:border-primary hover:text-primary'
            }`}
            onClick={() => setOpen((prev) => !prev)}
            aria-label={open ? t('nav.closeMenu') : t('nav.openMenu')}
            aria-expanded={open}
            aria-controls="mobile-menu"
          >
            <span className="sr-only">{open ? t('nav.closeMenu') : t('nav.openMenu')}</span>
            {open ? (
              <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M6 6l12 12M18 6l-12 12" strokeLinecap="round" />
              </svg>
            ) : (
              <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M4 7h16M4 12h16M4 17h16" strokeLinecap="round" />
              </svg>
            )}
          </button>
        </div>

        <ul className="hidden items-center gap-6 text-sm font-medium md:flex">
          {links.map((link) => (
            <li key={link.label}>
              <NavLink to={link.to} className={linkClass}>
                {link.label}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      <button
        type="button"
        aria-label="Close mobile menu backdrop"
        tabIndex={open ? 0 : -1}
        onClick={() => setOpen(false)}
        className={`fixed inset-0 z-40 bg-slate-900/25 backdrop-blur-sm transition-opacity duration-300 md:hidden ${
          open ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0'
        }`}
      />

      <div
        id="mobile-menu"
        className={`absolute left-0 right-0 top-full z-50 border-b border-slate-200 bg-white/95 shadow-soft backdrop-blur-md transition-all duration-300 md:hidden ${
          open ? 'pointer-events-auto translate-y-0 opacity-100' : 'pointer-events-none -translate-y-3 opacity-0'
        }`}
      >
        <ul className="container-shell py-4">
          <li className="mb-3 flex items-center justify-between px-1">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">{t('nav.openMenu')}</p>
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-slate-300 text-slate-600 transition hover:border-primary hover:text-primary"
              aria-label={t('nav.closeMenu')}
            >
              <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M6 6l12 12M18 6l-12 12" strokeLinecap="round" />
              </svg>
            </button>
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
                  transitionDelay: open ? `${index * 55}ms` : '0ms',
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
