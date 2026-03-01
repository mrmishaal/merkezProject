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

function toCaption(relativePath) {
  const fileName = relativePath.split('/').pop() || 'photo';
  return fileName
    .replace(/photo_/g, 'photo ')
    .replace(/unnamed/g, 'campus moment')
    .replace(/[_-]/g, ' ')
    .replace(/\.[a-zA-Z]+$/, '')
    .trim();
}

function Gallery() {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const { categorySlug } = useParams();
  const [activeIndex, setActiveIndex] = useState(null);
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
        return { src, category, relative, caption: toCaption(relative) };
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

  const activeCategory = useMemo(() => {
    if (!categorySlug) return 'all';
    const matched = categories.find((category) => category.slug === categorySlug);
    return matched ? matched.key : 'all';
  }, [categories, categorySlug]);

  const visiblePhotos = useMemo(() => {
    if (activeCategory === 'all') return photos;
    return grouped[activeCategory] || [];
  }, [activeCategory, grouped, photos]);

  const quickPickCategories = useMemo(() => {
    return categories
      .filter((category) => category.key !== 'all')
      .sort((a, b) => b.count - a.count)
      .slice(0, 6);
  }, [categories]);

  useEffect(() => {
    if (!categorySlug) return;
    const exists = categories.some((category) => category.slug === categorySlug);
    if (!exists) navigate('/gallery', { replace: true });
  }, [categories, categorySlug, navigate]);

  useEffect(() => {
    setActiveIndex(null);
    setZoom(1);
    setIsFullscreen(false);
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

        <div className="mb-8 rounded-xl2 border border-slate-200 bg-white p-4 shadow-soft">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">Gallery Filter</p>
              <p className="mt-1 text-sm text-slate-600">
                Showing <span className="font-semibold text-slate-900">{visiblePhotos.length}</span> photos
                {activeCategory !== 'all' ? (
                  <>
                    {' '}in <span className="font-semibold text-slate-900">{formatCategoryLabel(activeCategory)}</span>
                  </>
                ) : null}
              </p>
            </div>
            <label className="block">
              <span className="sr-only">Choose gallery category</span>
              <select
                className="w-full min-w-[240px] rounded-xl border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 outline-none transition focus:border-primary sm:w-auto"
                value={categorySlug || 'all'}
                onChange={(event) => {
                  const selectedSlug = event.target.value;
                  navigate(selectedSlug === 'all' ? '/gallery' : `/gallery/${selectedSlug}`);
                }}
              >
                {categories.map((category) => (
                  <option key={category.key} value={category.slug}>
                    {category.label} ({category.count})
                  </option>
                ))}
              </select>
            </label>
          </div>

          <div className="mt-4 flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => navigate('/gallery')}
              className={`rounded-full px-3 py-1.5 text-xs font-semibold transition ${
                activeCategory === 'all'
                  ? 'bg-primary text-white'
                  : 'border border-slate-300 bg-white text-slate-700 hover:border-primary hover:text-primary'
              }`}
            >
              {t('gallery.all')}
            </button>
            {quickPickCategories.map((category) => (
              <button
                key={category.key}
                type="button"
                onClick={() => navigate(`/gallery/${category.slug}`)}
                className={`rounded-full px-3 py-1.5 text-xs font-semibold transition ${
                  activeCategory === category.key
                    ? 'bg-primary text-white'
                    : 'border border-slate-300 bg-white text-slate-700 hover:border-primary hover:text-primary'
                }`}
              >
                {category.label}
              </button>
            ))}
          </div>
        </div>

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
                <div className="px-3 py-2">
                  <p className="truncate text-xs text-slate-500">{formatCategoryLabel(item.category)}</p>
                  <p className="truncate text-sm font-medium text-slate-700">{item.caption}</p>
                </div>
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

          <div className="absolute right-4 top-4 z-[103] flex flex-wrap justify-end gap-2">
            <button type="button" className="rounded-lg bg-white/90 px-3 py-2 text-sm font-semibold text-slate-900" onClick={zoomOut} aria-label={t('gallery.zoomOut')}>
              -
            </button>
            <button type="button" className="rounded-lg bg-white/90 px-3 py-2 text-sm font-semibold text-slate-900" onClick={zoomIn} aria-label={t('gallery.zoomIn')}>
              +
            </button>
            <button type="button" className="rounded-lg bg-white/90 px-3 py-2 text-sm font-semibold text-slate-900" onClick={resetZoom} aria-label={t('gallery.resetZoom')}>
              100%
            </button>
            <button
              type="button"
              className="rounded-lg bg-white/90 px-3 py-2 text-sm font-semibold text-slate-900"
              onClick={toggleFullscreen}
              aria-label={isFullscreen ? t('gallery.exitFullscreen') : t('gallery.fullscreen')}
            >
              {isFullscreen ? t('gallery.exitFullscreen') : t('gallery.fullscreen')}
            </button>
            <button type="button" className="rounded-lg bg-white/90 px-3 py-2 text-sm font-semibold text-slate-900" onClick={closeImage}>
              {t('gallery.close')}
            </button>
          </div>

          <button
            type="button"
            className={`absolute left-3 top-1/2 z-[103] -translate-y-1/2 rounded-full p-3 text-slate-900 shadow-soft transition md:left-6 md:p-4 ${
              hasPrev ? 'bg-white/95 hover:scale-105 hover:bg-white' : 'cursor-not-allowed bg-white/60 opacity-55'
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
            className={`absolute right-3 top-1/2 z-[103] -translate-y-1/2 rounded-full p-3 text-slate-900 shadow-soft transition md:right-6 md:p-4 ${
              hasNext ? 'bg-white/95 hover:scale-105 hover:bg-white' : 'cursor-not-allowed bg-white/60 opacity-55'
            }`}
            onClick={showNext}
            aria-label={t('gallery.next')}
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
            {t('gallery.swipeHint')}
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
            <div className="mt-3 text-center text-sm text-white/90">{activePhoto.caption}</div>
          </div>
        </div>
      )}
    </section>
  );
}

export default Gallery;
