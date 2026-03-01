import { Helmet } from 'react-helmet-async';

function Seo({ title, description, path = '', image = '/og-default.jpg' }) {
  const siteName = 'Merkezel Burhan School';
  const fullTitle = title ? `${title} | ${siteName}` : siteName;
  const canonical = `https://merkezelburhanschool.edu.et${path}`;

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={canonical} />

      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={canonical} />
      <meta property="og:image" content={image} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
    </Helmet>
  );
}

export default Seo;
