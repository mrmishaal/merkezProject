import Button from '../components/Button';
import Card from '../components/Card';
import SectionHeading from '../components/SectionHeading';
import { newsItems, photos, programsList, stats } from '../assets/siteData';
import { useLanguage } from '../context/LanguageContext';

function Home() {
  const { t } = useLanguage();
  const translatedNews = t('news.items', []);
  const translatedPrograms = t('academics.programs', []);
  const translatedStats = t('stats', []);

  return (
    <>
      <section className="relative isolate overflow-hidden">
        <img src={photos.hero} alt={t('school.name')} className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-primary/75" aria-hidden="true" />
        <div className="container-shell relative py-24 sm:py-32 lg:py-40">
          <div className="max-w-3xl text-white">
            <p className="mb-4 text-sm font-semibold uppercase tracking-[0.18em] text-amber-300">{t('school.name')}</p>
            <h1 className="text-4xl font-extrabold leading-tight text-white sm:text-5xl lg:text-6xl">{t('home.heroTitle')}</h1>
            <p className="mt-6 text-lg text-blue-100">{t('school.motto')}</p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Button to="/about" variant="accent">{t('home.learnMore')}</Button>
              <Button to="/contact" variant="outline" className="border-white text-white hover:bg-white hover:text-primary">{t('home.contactUs')}</Button>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="container-shell grid items-center gap-10 lg:grid-cols-2">
          <img src={photos.about} alt={t('about.title')} className="rounded-xl2 shadow-soft" />
          <Card>
            <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-primary">{t('home.aboutEyebrow')}</p>
            <h2 className="text-3xl font-bold">{t('home.aboutTitle')}</h2>
            <p className="mt-4 text-slate-600">{t('home.aboutText')}</p>
            <Button to="/about" className="mt-6">{t('home.learnMore')}</Button>
          </Card>
        </div>
      </section>

      <section className="pb-16">
        <div className="container-shell grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((item, index) => (
            <Card key={item.label} className="text-center hover:-translate-y-1">
              <h3 className="text-3xl font-extrabold text-primary">{item.value}</h3>
              <p className="mt-2 text-slate-600">{translatedStats[index] || item.label}</p>
            </Card>
          ))}
        </div>
      </section>

      <section className="py-20">
        <div className="container-shell">
          <SectionHeading eyebrow={t('home.academicsEyebrow')} title={t('home.academicsTitle')} description={t('home.academicsDesc')} />
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {(translatedPrograms.length ? translatedPrograms : programsList).map((program) => (
              <Card key={program.title} className="group hover:-translate-y-1 hover:shadow-xl">
                <h3 className="text-2xl font-semibold text-primary">{program.title}</h3>
                <p className="mt-3 text-slate-600">{program.description}</p>
                <div className="mt-6 h-1 w-16 rounded-full bg-accent transition-all duration-300 group-hover:w-24" />
              </Card>
            ))}
          </div>
          <div className="mt-8 text-center"><Button to="/academics" variant="outline">{t('home.viewAcademics')}</Button></div>
        </div>
      </section>

      <section className="py-20">
        <div className="container-shell">
          <SectionHeading eyebrow={t('home.newsEyebrow')} title={t('home.newsTitle')} description={t('home.newsDesc')} />
          <div className="grid gap-7 md:grid-cols-2 lg:grid-cols-3">
            {newsItems.map((item, index) => {
              const translated = translatedNews[index] || item;
              return (
                <Card key={item.title} className="overflow-hidden p-0 hover:-translate-y-1 hover:shadow-xl">
                  <img src={item.image} alt={translated.title} className="h-52 w-full object-cover" loading="lazy" />
                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-slate-900">{translated.title}</h3>
                    <p className="mt-3 text-slate-600">{translated.text}</p>
                    <Button to="/news" variant="outline" className="mt-5">{t('home.readMore')}</Button>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="container-shell">
          <SectionHeading eyebrow={t('home.galleryEyebrow')} title={t('home.galleryTitle')} description={t('home.galleryDesc')} />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {photos.gallery.map((src, i) => (
              <div key={src} className="group overflow-hidden rounded-xl2 shadow-soft">
                <img src={src} alt={`${t('gallery.image')} ${i + 1}`} className="h-64 w-full object-cover transition duration-500 group-hover:scale-110" loading="lazy" />
              </div>
            ))}
          </div>
          <div className="mt-8 text-center"><Button to="/gallery" variant="outline">{t('home.openGallery')}</Button></div>
        </div>
      </section>

      <section className="py-20">
        <div className="container-shell">
          <div className="rounded-xl2 bg-primary px-6 py-16 text-center text-white shadow-soft sm:px-10">
            <h2 className="text-3xl font-bold text-white sm:text-4xl">{t('home.ctaTitle')}</h2>
            <p className="mx-auto mt-4 max-w-2xl text-blue-100">{t('home.ctaText')}</p>
            <Button to="/contact" variant="accent" className="mt-8">{t('home.ctaButton')}</Button>
          </div>
        </div>
      </section>
    </>
  );
}

export default Home;
