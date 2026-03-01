import { useEffect, useMemo, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import SectionHeading from '../components/SectionHeading';
import Seo from '../components/Seo';
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

function toSlug(value) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '') || 'category';
}

function Gallery() {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const { categorySlug } = useParams();
  const [activeIndex, setActiveIndex] = useState(null);
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  const [zoom, setZoom] = useState(1);
  const [isFullscreen, setIsFullscreen] = useState(false);
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

    const usedSlugs = new Set();
    const folderCategories = folderKeys.map((key) => {
      let slug = toSlug(key);
      let counter = 2;
      while (usedSlugs.has(slug)) {
        slug = `${toSlug(key)}-${counter}`;
        counter += 1;
      }
      usedSlugs.add(slug);

      return {
        key,
        slug,
        label: formatCategoryLabel(key),
        count: grouped[key].length,
      };
    });

    return [{ key: 'all', slug: 'all', label: t('gallery.all'), count: photos.length }].concat(folderCategories);
  }, [grouped, photos.length, t]);

  const filterCategories = useMemo(() => {
    return categories.filter((category) => category.key !== 'root');
  }, [categories]);

  const activeCategory = useMemo(() => {
    if (!categorySlug) return 'all';
    const matched = filterCategories.find((category) => category.slug === categorySlug);
    return matched ? matched.key : 'all';
  }, [filterCategories, categorySlug]);

  const activeCategoryMeta = useMemo(() => {
    return filterCategories.find((category) => category.key === activeCategory) || filterCategories[0];
  }, [filterCategories, activeCategory]);

  const visiblePhotos = useMemo(() => {
    if (activeCategory === 'all') return photos;
    return grouped[activeCategory] || [];
  }, [activeCategory, grouped, photos]);

  useEffect(() => {
    if (!categorySlug) return;
    const exists = filterCategories.some((category) => category.slug === categorySlug);
    if (!exists) navigate('/gallery', { replace: true });
  }, [filterCategories, categorySlug, navigate]);

  useEffect(() => {
    setActiveIndex(null);
    setZoom(1);
    setIsFullscreen(false);
  }, [activeCategory]);

  useEffect(() => {
    setIsMobileFilterOpen(false);
  }, [activeCategory]);

  useEffect(() => {
    function onFsChange() {
      setIsFullscreen(Boolean(document.fullscreenElement));
    }

    document.addEventListener('fullscreenchange', onFsChange);
    return () => document.removeEventListener('fullscreenchange', onFsChange);
  }, []);

  function openImage(index) {
    setActiveIndex(index);
    setZoom(1);
  }

  async function toggleFullscreen() {
    if (!document.fullscreenElement) {
      await document.documentElement.requestFullscreen();
      return;
    }
    await document.exitFullscreen();
  }

  async function closeImage() {
    setActiveIndex(null);
    setZoom(1);
    if (document.fullscreenElement) {
      await document.exitFullscreen();
    }
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

  function onWheelZoom(event) {
    if (activeIndex === null) return;
    event.preventDefault();
    if (event.deltaY < 0) {
      setZoom((prev) => Math.min(prev + 0.1, 3));
    } else {
      setZoom((prev) => Math.max(prev - 0.1, 1));
    }
  }

  function onDoubleClickZoom() {
    setZoom((prev) => (prev > 1 ? 1 : 2));
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
      if (event.key.toLowerCase() === 'f') toggleFullscreen();
    }

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [activeIndex, visiblePhotos.length]);

  const activePhoto = activeIndex !== null ? visiblePhotos[activeIndex] : null;
  const hasPrev = activeIndex !== null && activeIndex > 0;
  const hasNext = activeIndex !== null && activeIndex < visiblePhotos.length - 1;

  return (
    <section className="py-16">
      <Seo
        title={t('nav.gallery')}
        description="Explore categorized photos of Merkezel Burhan School activities, campus life, and student achievements."
        path={categorySlug ? `/gallery/${categorySlug}` : '/gallery'}
      />

      <div className="container-shell">
        <SectionHeading eyebrow={t('gallery.eyebrow')} title={t('gallery.title')} description={t('gallery.desc')} />

        <div className="mb-4 hidden sm:block">
          <div className="rounded-xl2 border border-slate-200/90 bg-white/95 p-3 shadow-soft backdrop-blur">
            <div className="mb-3 flex items-start justify-between gap-3">
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-500">Gallery Filter</p>
                <p className="text-sm font-semibold text-slate-900">
                  {activeCategoryMeta?.label || t('gallery.all')}
                  <span className="ml-2 text-xs font-medium text-slate-500">{visiblePhotos.length} photos</span>
                </p>
              </div>

              {activeCategory !== 'all' ? (
                <button
                  type="button"
                  onClick={() => navigate('/gallery')}
                  className="rounded-full border border-slate-300 bg-white px-3 py-1 text-xs font-semibold text-slate-700 transition hover:border-primary hover:text-primary"
                >
                  Show All
                </button>
              ) : null}
            </div>

            <div className="-mx-1 overflow-x-auto px-1 pb-1">
              <div className="flex min-w-max items-center gap-2">
                {filterCategories.map((category) => {
                  const isActive = activeCategory === category.key;
                  return (
                    <button
                      key={category.key}
                      type="button"
                      onClick={() => navigate(category.slug === 'all' ? '/gallery' : `/gallery/${category.slug}`)}
                      className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-semibold transition ${
                        isActive
                          ? 'border-primary bg-primary text-white shadow-soft'
                          : 'border-slate-300 bg-white text-slate-700 hover:-translate-y-0.5 hover:border-primary hover:text-primary'
                      }`}
                      aria-pressed={isActive}
                    >
                      <span>{category.label}</span>
                      <span
                        className={`rounded-full px-2 py-0.5 text-[11px] ${
                          isActive ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-600'
                        }`}
                      >
                        {category.count}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        <button
          type="button"
          onClick={() => setIsMobileFilterOpen(true)}
          className="fixed bottom-6 left-4 z-40 inline-flex max-w-[82vw] items-center gap-2 rounded-full border border-primary/25 bg-white px-3.5 py-2 text-sm font-semibold text-primary shadow-[0_14px_26px_rgba(15,23,42,0.22)] transition hover:-translate-y-0.5 hover:border-primary sm:hidden"
          aria-haspopup="dialog"
          aria-label="Open gallery category filter"
        >
          <svg className="h-4 w-4 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
            <path d="M4 6h16M7 12h10M10 18h4" strokeLinecap="round" />
          </svg>
          <span className="truncate">{activeCategoryMeta?.label || 'Filter'}</span>
          <span className="rounded-full bg-primary px-2 py-0.5 text-[11px] text-white">
            {visiblePhotos.length}
          </span>
        </button>

        {isMobileFilterOpen ? (
          <div className="fixed inset-0 z-[110] sm:hidden">
            <button
              type="button"
              className="absolute inset-0 bg-slate-900/55"
              aria-label={t('gallery.close')}
              onClick={() => setIsMobileFilterOpen(false)}
            />
            <div
              role="dialog"
              aria-modal="true"
              aria-label="Select gallery category"
              className="absolute inset-x-0 bottom-0 max-h-[72vh] overflow-y-auto rounded-t-2xl bg-white px-4 pb-4 pt-3 shadow-soft"
            >
              <div className="mx-auto mb-3 h-1.5 w-12 rounded-full bg-slate-300" />
              <div className="mb-3 flex items-center justify-between">
                <p className="text-sm font-semibold text-slate-900">Choose Category</p>
                <button
                  type="button"
                  className="rounded-md px-2 py-1 text-xs font-semibold text-slate-600 hover:bg-slate-100"
                  onClick={() => setIsMobileFilterOpen(false)}
                >
                  {t('gallery.close')}
                </button>
              </div>

              <div className="grid grid-cols-1 gap-2 xs:grid-cols-2">
                {filterCategories.map((category) => {
                  const isActive = activeCategory === category.key;
                  return (
                    <button
                      key={category.key}
                      type="button"
                      onClick={() => {
                        navigate(category.slug === 'all' ? '/gallery' : `/gallery/${category.slug}`);
                        setIsMobileFilterOpen(false);
                      }}
                      className={`flex w-full items-center justify-between rounded-lg border px-3 py-2 text-sm font-medium transition ${
                        isActive
                          ? 'border-primary bg-primary text-white'
                          : 'border-slate-200 bg-white text-slate-700'
                      }`}
                      aria-pressed={isActive}
                    >
                      <span>{category.label}</span>
                      <span
                        className={`rounded-full px-2 py-0.5 text-xs ${
                          isActive ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-600'
                        }`}
                      >
                        {category.count}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        ) : null}

        {visiblePhotos.length > 0 ? (
          <div className="columns-1 gap-4 sm:columns-2 lg:columns-3">
            {visiblePhotos.map((item, index) => (
              <button
                key={item.src}
                type="button"
                className="group mb-4 block w-full break-inside-avoid overflow-hidden rounded-xl2 bg-white text-left shadow-soft"
                onClick={() => openImage(index)}
                aria-label={`${t('gallery.image')} ${index + 1}`}
              >
                <img
                  src={item.src}
                  alt={`${t('gallery.image')} ${index + 1}`}
                  className="w-full object-cover transition duration-500 group-hover:scale-105"
                  loading="lazy"
                  decoding="async"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
              </button>
            ))}
          </div>
        ) : (
          <p className="rounded-xl2 border border-dashed border-slate-300 bg-white px-4 py-10 text-center text-slate-500">
            {t('gallery.noPhotos')}
          </p>
        )}
      </div>

      {activePhoto && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/92 p-4">
          <button type="button" className="absolute inset-0" aria-label={t('gallery.close')} onClick={closeImage} />

          <button
            type="button"
            className="absolute right-3 top-3 z-[105] inline-flex h-10 min-w-10 items-center justify-center rounded-full bg-red-500/95 px-3 text-sm font-semibold text-white shadow-soft transition hover:bg-red-500"
            onClick={closeImage}
            aria-label={t('gallery.close')}
          >
            <span aria-hidden="true">×</span>
          </button>

          <div className="absolute left-1/2 top-3 z-[104] hidden -translate-x-1/2 items-center gap-2 rounded-full border border-white/20 bg-slate-900/55 p-1.5 backdrop-blur md:flex">
            <button type="button" className="rounded-lg bg-primary px-3 py-2 text-sm font-semibold text-white" onClick={zoomOut} aria-label={t('gallery.zoomOut')}>
              -
            </button>
            <button type="button" className="rounded-lg bg-primary px-3 py-2 text-sm font-semibold text-white" onClick={zoomIn} aria-label={t('gallery.zoomIn')}>
              +
            </button>
            <button type="button" className="rounded-lg bg-slate-200 px-3 py-2 text-sm font-semibold text-slate-900" onClick={resetZoom} aria-label={t('gallery.resetZoom')}>
              100%
            </button>
            <button
              type="button"
              className="rounded-lg bg-accent px-3 py-2 text-sm font-semibold text-slate-900"
              onClick={toggleFullscreen}
              aria-label={isFullscreen ? t('gallery.exitFullscreen') : t('gallery.fullscreen')}
            >
              {isFullscreen ? t('gallery.exitFullscreen') : t('gallery.fullscreen')}
            </button>
          </div>

          <div className="absolute bottom-20 left-1/2 z-[104] flex -translate-x-1/2 items-center gap-2 rounded-full border border-white/20 bg-slate-900/65 p-1.5 backdrop-blur md:hidden">
            <button type="button" className="rounded-lg bg-primary px-3 py-2 text-sm font-semibold text-white" onClick={zoomOut} aria-label={t('gallery.zoomOut')}>
              -
            </button>
            <button type="button" className="rounded-lg bg-primary px-3 py-2 text-sm font-semibold text-white" onClick={zoomIn} aria-label={t('gallery.zoomIn')}>
              +
            </button>
            <button type="button" className="rounded-lg bg-slate-200 px-3 py-2 text-xs font-semibold text-slate-900" onClick={resetZoom} aria-label={t('gallery.resetZoom')}>
              100%
            </button>
            <button
              type="button"
              className="rounded-lg bg-accent px-2.5 py-2 text-xs font-semibold text-slate-900"
              onClick={toggleFullscreen}
              aria-label={isFullscreen ? t('gallery.exitFullscreen') : t('gallery.fullscreen')}
            >
              F
            </button>
          </div>

          <button
            type="button"
            className={`absolute left-3 top-1/2 z-[103] -translate-y-1/2 rounded-full p-3 text-white shadow-soft transition md:left-6 md:p-4 ${
              hasPrev ? 'bg-primary/95 hover:scale-105 hover:bg-primary' : 'cursor-not-allowed bg-slate-500/70 opacity-55'
            }`}
            onClick={showPrev}
            aria-label={t('gallery.previous')}
            disabled={!hasPrev}
          >
            <svg className="h-6 w-6 md:h-7 md:w-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M15 18l-6-6 6-6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>

          <button
            type="button"
            className={`absolute right-3 top-1/2 z-[103] -translate-y-1/2 rounded-full p-3 text-white shadow-soft transition md:right-6 md:p-4 ${
              hasNext ? 'bg-primary/95 hover:scale-105 hover:bg-primary' : 'cursor-not-allowed bg-slate-500/70 opacity-55'
            }`}
            onClick={showNext}
            aria-label={t('gallery.next')}
            disabled={!hasNext}
          >
            <svg className="h-6 w-6 md:h-7 md:w-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M9 18l6-6-6-6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>

          <div className="absolute bottom-6 left-1/2 z-[103] -translate-x-1/2 rounded-full bg-white/92 px-4 py-2 text-sm font-semibold text-slate-800 shadow-soft">
            {activeIndex + 1} / {visiblePhotos.length}
          </div>

          <div className="relative z-[101] max-h-[90vh] max-w-full overflow-auto rounded-xl2 md:px-16" onTouchStart={onTouchStart} onTouchEnd={onTouchEnd} onWheel={onWheelZoom}>
            <img
              src={activePhoto.src}
              alt={`${t('gallery.image')} ${activeIndex + 1}`}
              className={`rounded-xl2 shadow-soft transition-all duration-200 ${zoom > 1 ? 'cursor-zoom-out' : 'cursor-zoom-in'}`}
              style={{
                width: `${zoom * 100}%`,
                maxWidth: 'none',
                height: 'auto',
              }}
              onDoubleClick={onDoubleClickZoom}
            />
          </div>
        </div>
      )}
    </section>
  );
}

export default Gallery;
