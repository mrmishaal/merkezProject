import { telegramUrl } from '../assets/siteData';

function TelegramFloatButton() {
  return (
    <a
      href={telegramUrl}
      target="_blank"
      rel="noreferrer noopener"
      className="fixed bottom-5 right-5 z-[60] inline-flex items-center gap-2 rounded-full bg-[#229ED9] px-4 py-3 text-sm font-semibold text-white shadow-soft transition hover:-translate-y-0.5 hover:bg-[#1c8abd] sm:px-5 sm:py-4 sm:text-base"
      aria-label="Join Merkezel Burhan School Telegram channel"
    >
      <svg className="h-5 w-5 sm:h-6 sm:w-6" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M20.12 3.31a1.2 1.2 0 0 0-1.23-.16L3.15 9.17a1.2 1.2 0 0 0 .06 2.26l3.9 1.35 1.47 4.67a1.2 1.2 0 0 0 2.17.25l2.16-3.01 3.74 2.73a1.2 1.2 0 0 0 1.89-.74L21.3 4.46a1.2 1.2 0 0 0-1.18-1.15Zm-9.41 11.23-.58 1.6-.8-2.55 7.2-6.62-5.82 7.57Z" />
      </svg>
      <span>Join Telegram</span>
    </a>
  );
}

export default TelegramFloatButton;
