import { telegramUrl } from '../assets/siteData';
import { useLanguage } from '../context/LanguageContext';

function QuickActions() {
  const { t } = useLanguage();

  return (
    <div className="fixed inset-x-0 bottom-0 z-[65] border-t border-slate-200 bg-white/95 backdrop-blur md:hidden">
      <div className="grid grid-cols-3">
        <a
          href="tel:+251913456789"
          className="inline-flex items-center justify-center gap-2 py-3 text-sm font-semibold text-slate-700"
          aria-label={t('quickActions.call')}
        >
          <span>{t('quickActions.call')}</span>
        </a>
        <a
          href={telegramUrl}
          target="_blank"
          rel="noreferrer noopener"
          className="inline-flex items-center justify-center gap-2 border-x border-slate-200 py-3 text-sm font-semibold text-primary"
          aria-label={t('quickActions.telegram')}
        >
          <span>{t('quickActions.telegram')}</span>
        </a>
        <a
          href="https://maps.google.com/?q=Dessie+Ethiopia"
          target="_blank"
          rel="noreferrer noopener"
          className="inline-flex items-center justify-center gap-2 py-3 text-sm font-semibold text-slate-700"
          aria-label={t('quickActions.map')}
        >
          <span>{t('quickActions.map')}</span>
        </a>
      </div>
    </div>
  );
}

export default QuickActions;
