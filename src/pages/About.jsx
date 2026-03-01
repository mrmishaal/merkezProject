import Button from '../components/Button';
import Card from '../components/Card';
import SectionHeading from '../components/SectionHeading';
import Seo from '../components/Seo';
import { academicsGallery, facilities, photos, programsList } from '../assets/siteData';
import { useLanguage } from '../context/LanguageContext';

function About() {
  const { t } = useLanguage();
  const translatedPrograms = t('academics.programs', []);
  const activePrograms = translatedPrograms.length ? translatedPrograms : programsList;

  return (
    <section className="py-16">
      <Seo
        title={t('nav.about')}
        description="Learn about Merkezel Burhan School's mission, values, academics, and facilities in Dessie."
        path="/about"
      />

      <div className="container-shell space-y-16">
        <div className="grid items-center gap-10 lg:grid-cols-2">
          <img src={photos.about} alt={t('about.title')} className="rounded-xl2 shadow-soft" loading="lazy" decoding="async" />
          <div>
            <SectionHeading eyebrow={t('about.eyebrow')} title={t('about.title')} description={t('about.desc')} />
            <p className="text-slate-600">{t('about.p1')}</p>
            <p className="mt-4 text-slate-600">{t('about.p2')}</p>
            <Button to="/contact" className="mt-6">{t('about.button')}</Button>
          </div>
        </div>

        <div id="academics" className="scroll-mt-28">
          <SectionHeading eyebrow={t('academics.eyebrow')} title={t('academics.title')} description={t('academics.desc')} />
          <img
            src={photos.programs}
            alt={t('academics.imageAlt')}
            className="mb-8 h-[300px] w-full rounded-xl2 object-cover shadow-soft sm:h-[380px]"
            loading="lazy"
            decoding="async"
          />

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {activePrograms.map((program) => (
              <Card key={program.title} className="hover:-translate-y-1 hover:shadow-xl">
                <h3 className="text-2xl font-semibold text-primary">{program.title}</h3>
                <p className="mt-3 text-slate-600">{program.description}</p>
              </Card>
            ))}
          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-2">
            {academicsGallery.map((item) => (
              <Card key={item.title} className="overflow-hidden p-0">
                <img
                  src={item.image}
                  alt={item.title}
                  className="h-52 w-full object-cover transition duration-500 hover:scale-[1.03]"
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

        <div id="facilities" className="scroll-mt-28">
          <SectionHeading eyebrow={t('facilities.eyebrow')} title={t('facilities.title')} description={t('facilities.desc')} />
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {facilities.map((item) => (
              <Card key={item.name} className="hover:-translate-y-1 hover:shadow-xl">
                <h3 className="text-xl font-semibold text-primary">{item.name}</h3>
                <p className="mt-3 text-slate-600">{item.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default About;
