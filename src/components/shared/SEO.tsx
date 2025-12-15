import { Helmet } from "react-helmet-async";

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  url?: string;
  type?: string;
}

const defaultMeta = {
  siteName: "Jambushrusti",
  title: "Jambushrusti | Jain Knowledge & Research Ecosystem",
  description: "Explore the profound teachings of Gurudev Muni Jambuvijayji Maharaj Saheb. Discover sacred texts, research tools, and a community dedicated to preserving Jain philosophy.",
  keywords: "Jain, Jainism, Gurudev Muni Jambuvijayji Maharaj Saheb, Guruvani, research, manuscripts, philosophy, spirituality, Jain Agamas",
  image: "https://siddhijambuparivar.com/wp-content/uploads/2022/11/MicrosoftTeams-image-29-778x1024.png",
  url: "https://jambushrusti.org",
  type: "website",
};

export function SEO({
  title,
  description = defaultMeta.description,
  keywords = defaultMeta.keywords,
  image = defaultMeta.image,
  url = defaultMeta.url,
  type = defaultMeta.type,
}: SEOProps) {
  const pageTitle = title 
    ? `${title} | ${defaultMeta.siteName}` 
    : defaultMeta.title;

  return (
    <Helmet>
      <title>{pageTitle}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      
      {/* Open Graph */}
      <meta property="og:title" content={pageTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:url" content={url} />
      <meta property="og:type" content={type} />
      <meta property="og:site_name" content={defaultMeta.siteName} />
      
      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={pageTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      
      {/* Canonical */}
      <link rel="canonical" href={url} />
    </Helmet>
  );
}
