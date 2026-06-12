import { Helmet } from 'react-helmet-async';

const SITE_NAME   = 'Nalini Jaggery';
const SITE_URL    = 'https://www.nalinijaggery.com';
const DEFAULT_IMG = 'https://www.nalinijaggery.com/images/og-image.jpg';
const TWITTER_HANDLE = '@nalinijaggery';

export default function SEO({ title, description, keywords, image, url, type = 'website', schema }) {
  // Don't append site name if title already contains it (e.g. home page)
  const fullTitle = title
    ? `${title} | ${SITE_NAME}`
    : `${SITE_NAME} – Organic Jaggery Manufacturer & Supplier India`;
  const metaImg   = image || DEFAULT_IMG;
  const canonical = url ? `${SITE_URL}${url}` : SITE_URL;

  return (
    <Helmet>
      {/* Primary */}
      <title>{fullTitle}</title>
      {description && <meta name="description" content={description} />}
      {keywords    && <meta name="keywords"    content={keywords} />}
      <link rel="canonical" href={canonical} />

      {/* Open Graph */}
      <meta property="og:title"        content={fullTitle} />
      <meta property="og:description"  content={description || ''} />
      <meta property="og:image"        content={metaImg} />
      <meta property="og:image:width"  content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:url"          content={canonical} />
      <meta property="og:type"         content={type} />
      <meta property="og:site_name"    content={SITE_NAME} />
      <meta property="og:locale"       content="en_IN" />

      {/* Twitter */}
      <meta name="twitter:card"        content="summary_large_image" />
      <meta name="twitter:site"        content={TWITTER_HANDLE} />
      <meta name="twitter:title"       content={fullTitle} />
      <meta name="twitter:description" content={description || ''} />
      <meta name="twitter:image"       content={metaImg} />

      {/* JSON-LD schema (optional per-page) */}
      {schema && (
        <script type="application/ld+json">{JSON.stringify(schema)}</script>
      )}
    </Helmet>
  );
}
