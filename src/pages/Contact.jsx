import Button from '../components/Button';
import Card from '../components/Card';
import SectionHeading from '../components/SectionHeading';
import Seo from '../components/Seo';
import { useLanguage } from '../context/LanguageContext';
import { pageBackgrounds, telegramUrl } from '../assets/siteData';

function Contact() {
  const { t } = useLanguage();
  const phoneNumber = '+251913456789';
  const emailAddress = 'info@merkezelburhan.edu.et';
  const mapQuery = 'Merkezel Burhan School, Dessie, Ethiopia';
  const mapEmbedSrc = `https://www.google.com/maps?q=${encodeURIComponent(mapQuery)}&output=embed`;
  const mapDirectionsLink = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(mapQuery)}`;
  const faqItems = t('contact.faqItems', []);
  const directions = t('contact.directions', []);

  return (
    <section className="relative isolate py-16">
      <Seo
        title={t('nav.contact')}
        description="Contact Merkezel Burhan School in Dessie for inquiries, visits, and student support."
        path="/contact"
      />
      <img src={pageBackgrounds.contact} alt="" aria-hidden="true" className="pointer-events-none absolute inset-0 z-0 h-full w-full object-cover opacity-60" />
      <div className="pointer-events-none absolute inset-0 z-0 bg-gradient-to-b from-white/35 via-white/45 to-white/60" />
      <div className="relative z-10 container-shell">
        <SectionHeading eyebrow={t('contact.eyebrow')} title={t('contact.title')} description={t('contact.desc')} />
        <div className="grid gap-6 lg:grid-cols-3">
          <Card className="lg:col-span-1">
            <h2 className="text-xl font-semibold text-primary">{t('contact.details')}</h2>
            <p className="mt-4 text-slate-600">{t('contact.location')}</p>
            <p className="mt-2 text-slate-600">{t('contact.phone')}</p>
            <p className="mt-2 text-slate-600">{t('contact.email')}</p>
            <p className="mt-4 text-slate-600">{t('contact.hours')}</p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Button href={`tel:${phoneNumber}`}>{t('contact.callNow')}</Button>
              <Button href={`mailto:${emailAddress}`} variant="outline">
                {t('contact.emailNow')}
              </Button>
            </div>
          </Card>

          <Card className="lg:col-span-2">
            <h2 className="text-xl font-semibold text-primary">{t('contact.mapTitle')}</h2>
            <div className="mt-4 overflow-hidden rounded-xl border border-slate-200">
              <iframe
                title={t('contact.mapFrameTitle')}
                src={mapEmbedSrc}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="h-72 w-full md:h-80"
              />
            </div>
            <div className="mt-4">
              <Button href={mapDirectionsLink} variant="outline">
                {t('contact.openMap')}
              </Button>
            </div>
          </Card>
        </div>

        <div className="mt-6 grid gap-6 lg:grid-cols-2">
          <Card>
            <h2 className="text-xl font-semibold text-primary">{t('contact.faqTitle')}</h2>
            <div className="mt-4 space-y-3">
              {faqItems.map((item) => (
                <details key={item.q} className="group rounded-lg border border-slate-200 bg-white/90 p-4">
                  <summary className="cursor-pointer list-none font-semibold text-slate-800">
                    {item.q}
                    <span className="float-right text-primary transition group-open:rotate-45">+</span>
                  </summary>
                  <p className="mt-3 text-slate-600">{item.a}</p>
                </details>
              ))}
            </div>
          </Card>

          <Card>
            <h2 className="text-xl font-semibold text-primary">{t('contact.directionsTitle')}</h2>
            <p className="mt-4 text-slate-600">{t('contact.directionsText')}</p>
            <ul className="mt-4 list-disc space-y-2 pl-5 text-slate-600">
              {directions.map((point) => (
                <li key={point}>{point}</li>
              ))}
            </ul>
          </Card>

          <Card className="lg:col-span-2">
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



