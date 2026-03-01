import Button from '../components/Button';
import Card from '../components/Card';
import SectionHeading from '../components/SectionHeading';
import Seo from '../components/Seo';
import { useLanguage } from '../context/LanguageContext';
import { telegramUrl } from '../assets/siteData';

function Contact() {
  const { t } = useLanguage();

  return (
    <section className="py-16">
      <Seo
        title={t('nav.contact')}
        description="Contact Merkezel Burhan School in Dessie for inquiries, visits, and student support."
        path="/contact"
      />
      <div className="container-shell">
        <SectionHeading eyebrow={t('contact.eyebrow')} title={t('contact.title')} description={t('contact.desc')} />
        <div className="grid gap-6 lg:grid-cols-2">
          <Card>
            <h2 className="text-xl font-semibold text-primary">{t('contact.details')}</h2>
            <p className="mt-4 text-slate-600">{t('contact.location')}</p>
            <p className="mt-2 text-slate-600">{t('contact.phone')}</p>
            <p className="mt-2 text-slate-600">{t('contact.email')}</p>
            <p className="mt-4 text-slate-600">{t('contact.hours')}</p>
          </Card>
          <Card>
            <h2 className="text-xl font-semibold text-primary">{t('contact.cardTitle')}</h2>
            <p className="mt-4 text-slate-600">{t('contact.cardText')}</p>
            <Button href={telegramUrl} className="mt-6">{t('contact.button')}</Button>
          </Card>
        </div>
      </div>
    </section>
  );
}

export default Contact;
