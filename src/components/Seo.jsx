import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';
import { seoConfig } from '../config/seo';

function Seo({ title, description, path, image, noindex = false, structuredData = [] }) {
  const location = useLocation();
  const resolvedPath = path ?? `${location.pathname}${location.search}`;
  const canonical = new URL(resolvedPath || '/', seoConfig.siteUrl).toString();
  const resolvedImage = new URL(image || seoConfig.defaultImage, seoConfig.siteUrl).toString();
  const fullTitle = title ? `${title} | ${seoConfig.siteName}` : seoConfig.defaultTitle;
  const resolvedDescription = description || seoConfig.defaultDescription;
  const robots = noindex ? 'noindex,nofollow,max-snippet:-1,max-image-preview:none' : 'index,follow,max-snippet:-1,max-image-preview:large,max-video-preview:-1';

  const baseStructuredData = [
    {
      '@context': 'https://schema.org',
      '@type': 'EducationalOrganization',
      name: seoConfig.siteName,
      url: seoConfig.siteUrl,
      logo: new URL('/site-icon-circle.png', seoConfig.siteUrl).toString(),
      image: resolvedImage,
      telephone: seoConfig.contact.phone,
      email: seoConfig.contact.email,
      address: {
        '@type': 'PostalAddress',
        addressLocality: seoConfig.contact.addressLocality,
        addressCountry: seoConfig.contact.addressCountry,
      },
      sameAs: seoConfig.sameAs,
    },
    {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      name: seoConfig.siteName,
      url: seoConfig.siteUrl,
      inLanguage: ['en', 'am'],
    },
  ].concat(Array.isArray(structuredData) ? structuredData : [structuredData]);

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={resolvedDescription} />
      <meta name="robots" content={robots} />
      <meta name="theme-color" content={seoConfig.themeColor} />
      <link rel="canonical" href={canonical} />

      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={resolvedDescription} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={canonical} />
      <meta property="og:image" content={resolvedImage} />
      <meta property="og:site_name" content={seoConfig.siteName} />
      <meta property="og:locale" content={seoConfig.locale} />
      {seoConfig.alternateLocales.map((locale) => (
        <meta key={locale} property="og:locale:alternate" content={locale} />
      ))}

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={resolvedDescription} />
      <meta name="twitter:image" content={resolvedImage} />

      {baseStructuredData.map((schema, index) => (
        <script key={`schema-${index}`} type="application/ld+json">
          {JSON.stringify(schema)}
        </script>
      ))}
    </Helmet>
  );
}

export default Seo;

