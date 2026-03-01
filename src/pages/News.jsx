import Button from '../components/Button';
import Card from '../components/Card';
import SectionHeading from '../components/SectionHeading';
import Seo from '../components/Seo';
import { newsItems, pageBackgrounds } from '../assets/siteData';
import { useLanguage } from '../context/LanguageContext';

function News() {
  const { t } = useLanguage();
  const translatedNews = t('news.items', []);

  return (
    <section className="relative isolate py-16">
      <Seo
        title={t('nav.news')}
        description="Read the latest school news, events, and student achievements from Merkezel Burhan School."
        path="/news"
      />
      <img src={pageBackgrounds.news} alt="" aria-hidden="true" className="pointer-events-none absolute inset-0 z-0 h-full w-full object-cover opacity-60" />
      <div className="pointer-events-none absolute inset-0 z-0 bg-gradient-to-b from-white/35 via-white/45 to-white/60" />
      <div className="relative z-10 container-shell">
        <SectionHeading eyebrow={t('news.eyebrow')} title={t('news.title')} description={t('news.desc')} />
        <div className="grid gap-7 md:grid-cols-2 lg:grid-cols-3">
          {newsItems.map((item, index) => {
            const translated = translatedNews[index] || item;
            return (
              <Card key={item.title} className="overflow-hidden p-0 hover:-translate-y-1 hover:shadow-xl">
                <img
                  src={item.image}
                  alt={translated.title}
                  className="h-56 w-full object-cover"
                  loading="lazy"
                  decoding="async"
                />
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-slate-900">{translated.title}</h3>
                  <p className="mt-3 text-slate-600">{translated.text}</p>
                  <Button to="/contact" variant="outline" className="mt-5">{t('news.button')}</Button>
                </div>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default News;



