import Button from '../components/Button';
import Seo from '../components/Seo';
import { useLanguage } from '../context/LanguageContext';

function NotFound() {
  const { t } = useLanguage();

  return (
    <section className="py-20">
      <Seo
        title="404"
        description="The page you requested could not be found on Merkezel Burhan School website."
        path="/404"
      />
      <div className="container-shell max-w-3xl text-center">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">404</p>
        <h1 className="mt-3 text-4xl font-bold text-slate-900">{t('notFound.title')}</h1>
        <p className="mx-auto mt-4 max-w-xl text-slate-600">{t('notFound.desc')}</p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Button to="/">{t('notFound.home')}</Button>
          <Button to="/gallery" variant="outline">{t('notFound.gallery')}</Button>
          <Button to="/contact" variant="outline">{t('notFound.contact')}</Button>
        </div>
      </div>
    </section>
  );
}

export default NotFound;
