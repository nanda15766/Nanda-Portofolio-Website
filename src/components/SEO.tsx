import { Helmet } from 'react-helmet-async';
import { data } from '../data';
import { useLanguage } from '../context/LanguageContext';

export default function SEO({ caseStudyId }: { caseStudyId?: string }) {
  const { language } = useLanguage();
  const t = data[language as keyof typeof data];
  
  const siteTitle = `${t.bio.name} - Portfolio`;
  const defaultDesc = t.ui.brandsSubtitle;

  const baseUrl = typeof window !== 'undefined' ? window.location.origin : 'https://portfolio.com';

  let title = siteTitle;
  let description = defaultDesc;
  let url = baseUrl;
  let image = `${baseUrl}/brands-banner.png`;

  if (caseStudyId) {
    const study = t.caseStudies.find(s => 
      s.brand.toLowerCase().replace(/\s+/g, '-') === caseStudyId
    );
    if (study) {
      title = `${study.brand} - Case Study | ${t.bio.name}`;
      description = study.subtitle;
      url = `${baseUrl}/?case=${caseStudyId}`;
      image = `${baseUrl}/brands-banner.png`;
    }
  }

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="title" content={title} />
      <meta name="description" content={description} />

      <meta property="og:type" content="article" />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />

      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={url} />
      <meta property="twitter:title" content={title} />
      <meta property="twitter:description" content={description} />
      <meta property="twitter:image" content={image} />
    </Helmet>
  );
}
