import Button from '../components/Button';
import SectionHeading from '../components/SectionHeading';
import { photos } from '../assets/siteData';
import { useLanguage } from '../context/LanguageContext';

function About() {
  const { t } = useLanguage();

  return (
    <section className="py-16">
      <div className="container-shell grid items-center gap-10 lg:grid-cols-2">
        <img src={photos.about} alt={t('about.title')} className="rounded-xl2 shadow-soft" />
        <div>
          <SectionHeading eyebrow={t('about.eyebrow')} title={t('about.title')} description={t('about.desc')} />
          <p className="text-slate-600">{t('about.p1')}</p>
          <p className="mt-4 text-slate-600">{t('about.p2')}</p>
          <Button to="/contact" className="mt-6">{t('about.button')}</Button>
        </div>
      </div>
    </section>
  );
}

export default About;
