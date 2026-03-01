import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import TelegramFloatButton from '../components/TelegramFloatButton';
import { useLanguage } from '../context/LanguageContext';

function MainLayout() {
  const { t } = useLanguage();

  return (
    <>
      <a
        href="#main-content"
        className="skip-link absolute left-4 top-2 z-[90] -translate-y-20 rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-white focus:translate-y-0"
      >
        {t('nav.skipToMain')}
      </a>
      <Navbar />
      <main id="main-content" tabIndex="-1">
        <Outlet />
      </main>
      <TelegramFloatButton />
      <Footer />
    </>
  );
}

export default MainLayout;
