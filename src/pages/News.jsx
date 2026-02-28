import Button from '../components/Button';
import Card from '../components/Card';
import SectionHeading from '../components/SectionHeading';
import { newsItems } from '../assets/siteData';
import { useLanguage } from '../context/LanguageContext';

function News() {
  const { t } = useLanguage();
  const translatedNews = t('news.items', []);

  return (
    <section className="py-16">
      <div className="container-shell">
        <SectionHeading eyebrow={t('news.eyebrow')} title={t('news.title')} description={t('news.desc')} />
        <div className="grid gap-7 md:grid-cols-2 lg:grid-cols-3">
          {newsItems.map((item, index) => {
            const translated = translatedNews[index] || item;
            return (
              <Card key={item.title} className="overflow-hidden p-0 hover:-translate-y-1 hover:shadow-xl">
                <img src={item.image} alt={translated.title} className="h-56 w-full object-cover" loading="lazy" />
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
