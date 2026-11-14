import { serviceCategories } from './servicesCatalog';
export const serviceOrigin = 'https://dottangle.vercel.app';
export const categoryAliases = {
  'website-development': 'web-development',
  'company-registration': 'business-registration',
  'incorporation': 'business-registration',
  'gst': 'gst-taxation',
  'taxation': 'gst-taxation',
  'accounting': 'accounting-financial',
  'bookkeeping': 'accounting-financial',
  'ecommerce': 'ecommerce-management',
  'amazon-management': 'ecommerce-management'
};
export function serviceMetadata(category) {
  const path = category ? `/services/${category.id}` : '/services';
  const title = category ? `${category.name} | Dottangle` : 'Explore Our Services | Dottangle';
  const description = category ? category.tagline : 'Explore comprehensive business services at Dottangle: company registration, GST compliance, accounting, eCommerce marketplace management, web engineering, and digital growth.';
  const url = serviceOrigin + path;
  const schema = category ? {
    '@context': 'https://schema.org', '@type': 'Service', name: category.name,
    description, url, provider: { '@type': 'Organization', name: 'Dottangle', url: serviceOrigin },
    hasOfferCatalog: { '@type': 'OfferCatalog', name: category.name, itemListElement: category.subServices.map(sub => ({
      '@type': 'Offer', itemOffered: { '@type': 'Service', name: sub.title, description: sub.shortDesc, url: `${url}/${sub.id}` }
    })) }
  } : {
    '@context': 'https://schema.org', '@type': 'ItemList', name: 'Dottangle Services',
    itemListElement: serviceCategories.map((cat, index) => ({ '@type': 'ListItem', position: index + 1, name: cat.name, url: `${serviceOrigin}/services/${cat.id}` }))
  };
  return {title, description, url, schema};
}
