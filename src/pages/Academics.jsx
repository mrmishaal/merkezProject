import Card from '../components/Card';
import SectionHeading from '../components/SectionHeading';
import Seo from '../components/Seo';
import { academicsGallery, photos, programsList } from '../assets/siteData';
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

        <img
          src={photos.programs}
          alt={t('academics.imageAlt')}
          className="mb-10 h-[420px] w-full rounded-xl2 object-cover shadow-soft"
          loading="lazy"
          decoding="async"
        />

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {(translatedPrograms.length ? translatedPrograms : programsList).map((program) => (
            <Card key={program.title} className="hover:-translate-y-1 hover:shadow-xl">
              <h3 className="text-2xl font-semibold text-primary">{program.title}</h3>
              <p className="mt-3 text-slate-600">{program.description}</p>
            </Card>
          ))}
        </div>

        <div className="mt-14">
          <h3 className="text-2xl font-bold text-slate-900 sm:text-3xl">Academic Life in Photos</h3>
          <p className="mt-2 max-w-2xl text-slate-600">
            A quick look at daily teaching, practical sessions, reading support, and exam preparation.
          </p>

          <div className="mt-6 grid gap-6 md:grid-cols-2">
            {academicsGallery.map((item) => (
              <Card key={item.title} className="overflow-hidden p-0">
                <img
                  src={item.image}
                  alt={item.title}
                  className="h-56 w-full object-cover transition duration-500 hover:scale-[1.03]"
                  loading="lazy"
                  decoding="async"
                />
                <div className="p-5">
                  <h4 className="text-lg font-semibold text-primary">{item.title}</h4>
                  <p className="mt-2 text-sm text-slate-600">{item.description}</p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Academics;
