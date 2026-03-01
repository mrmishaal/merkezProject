import Button from '../components/Button';
import Card from '../components/Card';
import SectionHeading from '../components/SectionHeading';
import Seo from '../components/Seo';
import { downloadItems } from '../assets/siteData';
import { useLanguage } from '../context/LanguageContext';

function Downloads() {
  const { t } = useLanguage();

  return (
    <section className="py-16">
      <Seo
        title={t('nav.downloads')}
        description="Download school resources including calendar, uniform guide, and parent handbook."
        path="/downloads"
      />
      <div className="container-shell">
        <SectionHeading eyebrow={t('downloads.eyebrow')} title={t('downloads.title')} description={t('downloads.desc')} />
        <div className="grid gap-6 lg:grid-cols-3">
          {downloadItems.map((item) => (
            <Card key={item.title} className="flex h-full flex-col">
              <h2 className="text-xl font-semibold text-primary">{item.title}</h2>
              <p className="mt-3 flex-1 text-slate-600">{item.description}</p>
              <Button href={item.file} target="_blank" rel="noreferrer" className="mt-6" variant="outline">
                {t('downloads.button')}
              </Button>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Downloads;
