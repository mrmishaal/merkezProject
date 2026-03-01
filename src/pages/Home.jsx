import Button from '../components/Button';
import Card from '../components/Card';
import Seo from '../components/Seo';
import { photos, stats, telegramUrl, testimonials, trustHighlights } from '../assets/siteData';
import { useLanguage } from '../context/LanguageContext';

function Home() {
  const { t } = useLanguage();
  const translatedStats = t('stats', []);
  const translatedOutcomes = t('home.outcomes', []);

  const pages = [
    { title: t('nav.about'), text: 'Mission, values, and school profile.', to: '/about' },
    { title: t('nav.academics'), text: 'Programs from kindergarten to secondary.', to: '/academics' },
    { title: t('nav.facilities'), text: 'Labs, library, transportation, and more.', to: '/facilities' },
    { title: t('nav.events'), text: 'Upcoming and past school events.', to: '/events' },
    { title: t('nav.news'), text: 'Latest updates from school life.', to: '/news' },
    { title: t('nav.gallery'), text: 'Categorized campus photo collections.', to: '/gallery' },
  ];

  return (
    <>
      <Seo
        title={t('nav.home')}
        description="Merkezel Burhan School in Dessie delivers quality education with strong academic guidance, discipline, and innovation."
        path="/"
      />

      <section className="relative isolate overflow-hidden">
        <img src={photos.hero} alt={t('school.name')} className="absolute inset-0 h-full w-full object-cover" loading="eager" fetchPriority="high" />
        <div className="absolute inset-0 bg-primary/75" aria-hidden="true" />
        <div className="container-shell relative py-24 sm:py-32 lg:py-40">
          <div className="max-w-3xl text-white">
            <p className="mb-4 text-sm font-semibold uppercase tracking-[0.18em] text-amber-300">{t('school.name')}</p>
            <h1 className="text-4xl font-extrabold leading-tight text-white sm:text-5xl lg:text-6xl">{t('home.heroTitle')}</h1>
            <p className="mt-6 text-lg text-blue-100">{t('school.motto')}</p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Button to="/about" variant="accent">{t('home.learnMore')}</Button>
              <Button href={telegramUrl} variant="outline" className="border-white text-white hover:bg-white hover:text-primary">
                {t('nav.joinTelegram')}
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container-shell grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((item, index) => (
            <Card key={item.label} className="text-center hover:-translate-y-1">
              <h2 className="text-3xl font-extrabold text-primary">{item.value}</h2>
              <p className="mt-2 text-slate-600">{translatedStats[index] || item.label}</p>
            </Card>
          ))}
        </div>
      </section>

      <section className="pb-8">
        <div className="container-shell grid gap-6 lg:grid-cols-2">
          <Card>
            <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-primary">{t('home.aboutEyebrow')}</p>
            <h2 className="text-3xl font-bold">{t('home.aboutTitle')}</h2>
            <p className="mt-4 text-slate-600">{t('home.aboutText')}</p>
            <Button to="/about" className="mt-6">{t('home.learnMore')}</Button>
          </Card>
          <Card>
            <h2 className="text-3xl font-bold text-primary">{t('home.principalTitle')}</h2>
            <p className="mt-4 text-slate-600">{t('home.principalText')}</p>
          </Card>
        </div>
      </section>

      <section className="py-14">
        <div className="container-shell">
          <div className="mb-8 text-center">
            <h2 className="text-3xl font-bold text-slate-900 sm:text-4xl">Multi-page Information Center</h2>
            <p className="mx-auto mt-3 max-w-2xl text-slate-600">
              Browse dedicated pages for academics, events, facilities, downloads, and parent communication.
            </p>
          </div>
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {pages.map((page) => (
              <Card key={page.to} className="group hover:-translate-y-1 hover:shadow-xl">
                <h3 className="text-xl font-semibold text-primary">{page.title}</h3>
                <p className="mt-3 text-slate-600">{page.text}</p>
                <Button to={page.to} variant="outline" className="mt-5">Open {page.title}</Button>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-14">
        <div className="container-shell grid gap-6 lg:grid-cols-2">
          <Card>
            <h2 className="text-2xl font-bold text-primary">{t('home.trustTitle')}</h2>
            <ul className="mt-4 space-y-3 text-slate-700">
              {trustHighlights.map((item) => (
                <li key={item} className="rounded-lg bg-slate-50 px-4 py-3">{item}</li>
              ))}
            </ul>
          </Card>
          <Card>
            <h2 className="text-2xl font-bold text-primary">{t('home.outcomesTitle')}</h2>
            <ul className="mt-4 space-y-3 text-slate-700">
              {translatedOutcomes.map((item) => (
                <li key={item} className="rounded-lg bg-slate-50 px-4 py-3">{item}</li>
              ))}
            </ul>
          </Card>
        </div>
      </section>

      <section className="py-12">
        <div className="container-shell">
          <h2 className="mb-6 text-3xl font-bold text-slate-900">{t('home.testimonialsTitle')}</h2>
          <div className="grid gap-5 md:grid-cols-3">
            {testimonials.map((item) => (
              <Card key={item.author}>
                <p className="text-slate-700">"{item.quote}"</p>
                <p className="mt-4 text-sm font-semibold text-primary">{item.author}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="container-shell">
          <div className="rounded-xl2 bg-primary px-6 py-16 text-center text-white shadow-soft sm:px-10">
            <h2 className="text-3xl font-bold text-white sm:text-4xl">{t('home.ctaTitle')}</h2>
            <p className="mx-auto mt-4 max-w-2xl text-blue-100">{t('home.ctaText')}</p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <Button href={telegramUrl} variant="accent">{t('nav.joinTelegram')}</Button>
              <Button to="/contact" variant="outline" className="border-white text-white hover:bg-white hover:text-primary">
                {t('home.contactUs')}
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Home;
