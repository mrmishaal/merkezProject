import { NavLink } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';

function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="border-t border-slate-200 bg-white py-12">
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
            <li><NavLink to="/academics" className="hover:text-primary">{t('footer.programs')}</NavLink></li>
            <li><NavLink to="/contact" className="hover:text-primary">{t('footer.contact')}</NavLink></li>
          </ul>
        </div>
        <div>
          <h4 className="font-heading text-base font-semibold text-slate-900">{t('footer.follow')}</h4>
          <div className="mt-3 flex gap-3">
            <a href="#" className="rounded-full border border-slate-300 p-2 text-slate-600 transition hover:border-primary hover:text-primary" aria-label="Facebook">Fb</a>
            <a href="#" className="rounded-full border border-slate-300 p-2 text-slate-600 transition hover:border-primary hover:text-primary" aria-label="Twitter">X</a>
            <a href="#" className="rounded-full border border-slate-300 p-2 text-slate-600 transition hover:border-primary hover:text-primary" aria-label="Instagram">Ig</a>
          </div>
        </div>
      </div>
      <div className="container-shell mt-10 border-t border-slate-200 pt-5 text-sm text-slate-500">
        Copyright {new Date().getFullYear()} {t('school.name')}. {t('footer.rights')}
      </div>
    </footer>
  );
}

export default Footer;
