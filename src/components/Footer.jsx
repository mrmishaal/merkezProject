import { NavLink } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { telegramUrl } from '../assets/siteData';

function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="border-t border-slate-200 bg-white py-12 pb-24 md:pb-12">
      <div className="container-shell grid gap-8 md:grid-cols-2 lg:grid-cols-4">
        <div>
          <h3 className="text-xl font-bold text-primary">{t('school.name')}</h3>
          <p className="mt-2 text-slate-600">{t('school.location')}</p>
          <p className="mt-2 text-slate-600">{t('footer.commitment')}</p>
        </div>
        <div>
          <h4 className="font-heading text-base font-semibold text-slate-900">{t('footer.contact')}</h4>
          <p className="mt-2 text-slate-600">{t('contact.phone')}</p>
          <p className="mt-1 text-slate-600">{t('contact.email')}</p>
        </div>
        <div>
          <h4 className="font-heading text-base font-semibold text-slate-900">{t('footer.quickLinks')}</h4>
          <ul className="mt-2 space-y-2 text-slate-600">
            <li><NavLink to="/about" className="hover:text-primary">{t('footer.about')}</NavLink></li>
            <li><NavLink to="/about#academics" className="hover:text-primary">{t('footer.programs')}</NavLink></li>
            <li><NavLink to="/downloads" className="hover:text-primary">{t('nav.downloads')}</NavLink></li>
            <li><NavLink to="/events" className="hover:text-primary">{t('nav.events')}</NavLink></li>
          </ul>
        </div>
        <div>
          <h4 className="font-heading text-base font-semibold text-slate-900">{t('footer.follow')}</h4>
          <p className="mt-2 text-slate-600">Get school announcements and updates on Telegram.</p>
          <a
            href={telegramUrl}
            target="_blank"
            rel="noreferrer noopener"
            className="mt-4 inline-flex items-center gap-2 rounded-xl border border-primary px-4 py-2 text-sm font-semibold text-primary transition hover:bg-primary hover:text-white"
            aria-label="Join school Telegram channel"
          >
            <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M20.12 3.31a1.2 1.2 0 0 0-1.23-.16L3.15 9.17a1.2 1.2 0 0 0 .06 2.26l3.9 1.35 1.47 4.67a1.2 1.2 0 0 0 2.17.25l2.16-3.01 3.74 2.73a1.2 1.2 0 0 0 1.89-.74L21.3 4.46a1.2 1.2 0 0 0-1.18-1.15Zm-9.41 11.23-.58 1.6-.8-2.55 7.2-6.62-5.82 7.57Z" />
            </svg>
            {t('nav.joinTelegram')}
          </a>
          <p className="mt-2 text-sm text-slate-500">t.me/merkezelburhanschool</p>
        </div>
      </div>
      <div className="container-shell mt-10 border-t border-slate-200 pt-5 text-sm text-slate-500">
        Copyright {new Date().getFullYear()} {t('school.name')}. {t('footer.rights')}
      </div>
    </footer>
  );
}

export default Footer;
