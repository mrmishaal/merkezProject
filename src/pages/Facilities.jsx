import Card from '../components/Card';
import SectionHeading from '../components/SectionHeading';
import Seo from '../components/Seo';
import { facilities } from '../assets/siteData';
import { useLanguage } from '../context/LanguageContext';

function Facilities() {
  const { t } = useLanguage();

  return (
    <section className="py-16">
      <Seo
        title={t('nav.facilities')}
        description="Explore Merkezel Burhan School facilities including labs, library, ICT, transport, and activity spaces."
        path="/facilities"
      />
      <div className="container-shell">
        <SectionHeading eyebrow={t('facilities.eyebrow')} title={t('facilities.title')} description={t('facilities.desc')} />
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {facilities.map((item) => (
            <Card key={item.name} className="hover:-translate-y-1 hover:shadow-xl">
              <h2 className="text-xl font-semibold text-primary">{item.name}</h2>
              <p className="mt-3 text-slate-600">{item.description}</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Facilities;
