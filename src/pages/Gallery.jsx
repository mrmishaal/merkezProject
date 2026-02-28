import { useEffect, useMemo, useRef, useState } from 'react';
import SectionHeading from '../components/SectionHeading';
import { useLanguage } from '../context/LanguageContext';

const allPhotoModules = import.meta.glob('../assets/photos/**/*.{jpg,jpeg,png,JPG,JPEG,PNG}', {
  eager: true,
  import: 'default',
});

function formatCategoryLabel(key) {
  if (key === 'root') return 'general';
  return key
    .replace(/[-_]/g, ' ')
    .replace(/([a-z])([A-Z])/g, '$1 $2')
    .toLowerCase();
}

function Gallery() {
  const { t } = useLanguage();
  const [activeCategory, setActiveCategory] = useState('all');
  const [activeIndex, setActiveIndex] = useState(null);
  const [zoom, setZoom] = useState(1);
  const touchStartX = useRef(null);
  const touchStartY = useRef(null);

  const photos = useMemo(() => {
    return Object.entries(allPhotoModules)
      .map(([fullPath, src]) => {
        const relative = fullPath.replace('../assets/photos/', '');
        const parts = relative.split('/');
        const category = parts.length > 1 ? parts[0] : 'root';
        return { src, category, relative };
      })
      .sort((a, b) => a.relative.localeCompare(b.relative));
  }, []);

  const grouped = useMemo(() => {
    return photos.reduce((acc, item) => {
      if (!acc[item.category]) acc[item.category] = [];
      acc[item.category].push(item);
      return acc;
    }, {});
  }, [photos]);

  const categories = useMemo(() => {
    const folderKeys = Object.keys(grouped).sort((a, b) => {
      if (a === 'root') return -1;
      if (b === 'root') return 1;
      return a.localeCompare(b);
    });

    return [{ key: 'all', label: 'all', count: photos.length }].concat(
      folderKeys.map((key) => ({
        key,
        label: formatCategoryLabel(key),
        count: grouped[key].length,
      }))
    );
  }, [grouped, photos.length]);

  const visiblePhotos = useMemo(() => {
    if (activeCategory === 'all') return photos;
    return grouped[activeCategory] || [];
  }, [activeCategory, grouped, photos]);

  useEffect(() => {
    setActiveIndex(null);
    setZoom(1);
  }, [activeCategory]);

  function openImage(index) {
    setActiveIndex(index);
    setZoom(1);
  }

  function closeImage() {
    setActiveIndex(null);
    setZoom(1);
  }

  function showPrev() {
    if (activeIndex === null || !visiblePhotos.length) return;
    setActiveIndex((prev) => Math.max(prev - 1, 0));
    setZoom(1);
  }

  function showNext() {
    if (activeIndex === null || !visiblePhotos.length) return;
    setActiveIndex((prev) => Math.min(prev + 1, visiblePhotos.length - 1));
    setZoom(1);
  }

  function zoomIn() {
    setZoom((prev) => Math.min(prev + 0.25, 3));
  }

  function zoomOut() {
    setZoom((prev) => Math.max(prev - 0.25, 1));
  }

  function resetZoom() {
    setZoom(1);
  }

  function onTouchStart(event) {
    const touch = event.touches?.[0];
    if (!touch) return;
    touchStartX.current = touch.clientX;
    touchStartY.current = touch.clientY;
  }

  function onTouchEnd(event) {
    const touch = event.changedTouches?.[0];
    if (!touch || touchStartX.current === null || touchStartY.current === null) return;

    const dx = touch.clientX - touchStartX.current;
    const dy = touch.clientY - touchStartY.current;

    touchStartX.current = null;
    touchStartY.current = null;

    if (Math.abs(dx) < 50 || Math.abs(dx) < Math.abs(dy)) return;
    if (dx > 0) showPrev();
    if (dx < 0) showNext();
  }

  useEffect(() => {
    function onKeyDown(event) {
      if (activeIndex === null) return;
      if (event.key === 'Escape') closeImage();
      if (event.key === 'ArrowLeft') showPrev();
      if (event.key === 'ArrowRight') showNext();
      if (event.key === '+' || event.key === '=') zoomIn();
      if (event.key === '-') zoomOut();
      if (event.key === '0') resetZoom();
    }

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [activeIndex, visiblePhotos.length]);

  const activePhoto = activeIndex !== null ? visiblePhotos[activeIndex] : null;
  const hasPrev = activeIndex !== null && activeIndex > 0;
  const hasNext = activeIndex !== null && activeIndex < visiblePhotos.length - 1;

  return (
    <section className="py-16">
      <div className="container-shell">
        <SectionHeading eyebrow={t('gallery.eyebrow')} title={t('gallery.title')} description={t('gallery.desc')} />

        <div className="mb-8 flex flex-wrap gap-2">
          {categories.map((category) => (
            <button
              key={category.key}
              type="button"
              onClick={() => setActiveCategory(category.key)}
              className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                activeCategory === category.key
                  ? 'bg-primary text-white'
                  : 'border border-slate-300 bg-white text-slate-700 hover:border-primary hover:text-primary'
              }`}
            >
              {category.label} ({category.count})
            </button>
          ))}
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {visiblePhotos.map((item, index) => (
            <button
              key={item.src}
              type="button"
              className="group overflow-hidden rounded-xl2 shadow-soft"
              onClick={() => openImage(index)}
              aria-label={`${t('gallery.image')} ${index + 1}`}
            >
              <img
                src={item.src}
                alt={`${t('gallery.image')} ${index + 1}`}
                className="h-72 w-full object-cover transition duration-500 group-hover:scale-110"
                loading="lazy"
              />
            </button>
          ))}
        </div>
      </div>

      {activePhoto && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/90 p-4">
          <button type="button" className="absolute inset-0" aria-label="Close image preview" onClick={closeImage} />

          <div className="absolute right-4 top-4 z-[103] flex gap-2">
            <button type="button" className="rounded-lg bg-white/90 px-3 py-2 text-sm font-semibold text-slate-900" onClick={zoomOut}>
              -
            </button>
            <button type="button" className="rounded-lg bg-white/90 px-3 py-2 text-sm font-semibold text-slate-900" onClick={zoomIn}>
              +
            </button>
            <button type="button" className="rounded-lg bg-white/90 px-3 py-2 text-sm font-semibold text-slate-900" onClick={resetZoom}>
              100%
            </button>
            <button type="button" className="rounded-lg bg-white/90 px-3 py-2 text-sm font-semibold text-slate-900" onClick={closeImage}>
              Close
            </button>
          </div>

          <button
            type="button"
            className={`absolute left-3 top-1/2 z-[103] -translate-y-1/2 rounded-full p-3 text-slate-900 shadow-soft transition md:left-6 md:p-4 ${
              hasPrev ? 'bg-white/95 hover:scale-105 hover:bg-white' : 'cursor-not-allowed bg-white/60 opacity-55'
            }`}
            onClick={showPrev}
            aria-label="Previous image"
            disabled={!hasPrev}
          >
            <svg className="h-6 w-6 md:h-7 md:w-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M15 18l-6-6 6-6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>

          <button
            type="button"
            className={`absolute right-3 top-1/2 z-[103] -translate-y-1/2 rounded-full p-3 text-slate-900 shadow-soft transition md:right-6 md:p-4 ${
              hasNext ? 'bg-white/95 hover:scale-105 hover:bg-white' : 'cursor-not-allowed bg-white/60 opacity-55'
            }`}
            onClick={showNext}
            aria-label="Next image"
            disabled={!hasNext}
          >
            <svg className="h-6 w-6 md:h-7 md:w-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M9 18l6-6-6-6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>

          <div className="absolute bottom-4 left-1/2 z-[103] -translate-x-1/2 rounded-full bg-white/92 px-4 py-2 text-sm font-semibold text-slate-800 shadow-soft">
            {activeIndex + 1} / {visiblePhotos.length}
          </div>

          <div className="pointer-events-none absolute bottom-16 left-1/2 z-[103] -translate-x-1/2 rounded-full bg-slate-900/55 px-3 py-1 text-xs font-medium text-white md:hidden">
            Swipe left or right
          </div>

          <div
            className="relative z-[101] max-h-[90vh] max-w-full overflow-auto rounded-xl2 md:px-16"
            onTouchStart={onTouchStart}
            onTouchEnd={onTouchEnd}
          >
            <img
              src={activePhoto.src}
              alt={`${t('gallery.image')} ${activeIndex + 1}`}
              className="max-h-[90vh] w-auto max-w-full rounded-xl2 shadow-soft transition-transform duration-200"
              style={{ transform: `scale(${zoom})`, transformOrigin: 'center center' }}
            />
          </div>
        </div>
      )}
    </section>
  );
}

export default Gallery;
