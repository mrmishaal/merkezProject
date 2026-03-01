import Card from '../components/Card';
import SectionHeading from '../components/SectionHeading';
import Seo from '../components/Seo';
import { eventsItems, pageBackgrounds } from '../assets/siteData';
import { useLanguage } from '../context/LanguageContext';

function Events() {
  const { t } = useLanguage();
  const upcoming = eventsItems.filter((event) => event.type === 'upcoming');
  const past = eventsItems.filter((event) => event.type === 'past');

  return (
    <section className="relative isolate py-16">
      <Seo
        title={t('nav.events')}
        description="View upcoming and past events from Merkezel Burhan School's academic and community calendar."
        path="/events"
      />
      <img src={pageBackgrounds.events} alt="" aria-hidden="true" className="pointer-events-none absolute inset-0 z-0 h-full w-full object-cover opacity-60" />
      <div className="pointer-events-none absolute inset-0 z-0 bg-gradient-to-b from-white/35 via-white/45 to-white/60" />
      <div className="relative z-10 container-shell">
        <SectionHeading eyebrow={t('events.eyebrow')} title={t('events.title')} description={t('events.desc')} />

        <h2 className="mb-5 text-2xl font-bold text-primary">{t('events.upcoming')}</h2>
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {upcoming.map((item) => (
            <Card key={item.title}>
              <p className="text-sm font-semibold text-accent">{item.date}</p>
              <h3 className="mt-2 text-xl font-semibold text-slate-900">{item.title}</h3>
              <p className="mt-3 text-slate-600">{item.description}</p>
            </Card>
          ))}
        </div>

        <h2 className="mb-5 mt-12 text-2xl font-bold text-primary">{t('events.past')}</h2>
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {past.map((item) => (
            <Card key={item.title} className="bg-slate-50">
              <p className="text-sm font-semibold text-slate-500">{item.date}</p>
              <h3 className="mt-2 text-xl font-semibold text-slate-900">{item.title}</h3>
              <p className="mt-3 text-slate-600">{item.description}</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Events;


