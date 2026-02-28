import Button from '../components/Button';
import Card from '../components/Card';
import SectionHeading from '../components/SectionHeading';
import { useLanguage } from '../context/LanguageContext';

function Contact() {
  const { t } = useLanguage();

  return (
    <section className="py-16">
      <div className="container-shell">
        <SectionHeading eyebrow={t('contact.eyebrow')} title={t('contact.title')} description={t('contact.desc')} />
        <div className="grid gap-6 lg:grid-cols-2">
          <Card>
            <h3 className="text-xl font-semibold text-primary">{t('contact.details')}</h3>
            <p className="mt-4 text-slate-600">{t('contact.location')}</p>
            <p className="mt-2 text-slate-600">{t('contact.phone')}</p>
            <p className="mt-2 text-slate-600">{t('contact.email')}</p>
            <p className="mt-4 text-slate-600">{t('contact.hours')}</p>
          </Card>
          <Card>
            <h3 className="text-xl font-semibold text-primary">{t('contact.cardTitle')}</h3>
            <p className="mt-4 text-slate-600">{t('contact.cardText')}</p>
            <Button to="/contact" className="mt-6">{t('contact.button')}</Button>
          </Card>
        </div>
      </div>
    </section>
  );
}

export default Contact;
