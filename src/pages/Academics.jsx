import Card from '../components/Card';
import SectionHeading from '../components/SectionHeading';
import Seo from '../components/Seo';
import { photos, programsList } from '../assets/siteData';
import { useLanguage } from '../context/LanguageContext';

function Academics() {
  const { t } = useLanguage();
  const translatedPrograms = t('academics.programs', []);

  return (
    <section className="py-16">
      <Seo
        title={t('nav.academics')}
        description="Explore kindergarten, primary, and secondary academic programs at Merkezel Burhan School."
        path="/academics"
      />
      <div className="container-shell">
        <SectionHeading eyebrow={t('academics.eyebrow')} title={t('academics.title')} description={t('academics.desc')} />
        <img src={photos.programs} alt={t('academics.imageAlt')} className="mb-10 h-[420px] w-full rounded-xl2 object-cover shadow-soft" loading="lazy" decoding="async" />
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {(translatedPrograms.length ? translatedPrograms : programsList).map((program) => (
            <Card key={program.title} className="hover:-translate-y-1 hover:shadow-xl">
              <h3 className="text-2xl font-semibold text-primary">{program.title}</h3>
              <p className="mt-3 text-slate-600">{program.description}</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Academics;
