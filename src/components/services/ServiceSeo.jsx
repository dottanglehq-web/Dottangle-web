import { useEffect } from 'react';
import { serviceMetadata } from '../../data/serviceMetadata';
export default function ServiceSeo({ category, notFound = false }) {
  useEffect(() => {
    const metadata = serviceMetadata(category);
    const previousTitle = document.title;
    const changed = [];
    const set = (selector, tag, attributes) => {
      let node = document.head.querySelector(selector);
      const previous = node?.outerHTML;
      if (!node) { node = document.createElement(tag); document.head.append(node); }
      for (const [key, value] of Object.entries(attributes)) node.setAttribute(key, value);
      changed.push(() => {
        if (previous) node.outerHTML = previous;
        else node.remove();
      });
    };
    document.title = notFound ? 'Service Not Found | Dottangle' : metadata.title;
    set('meta[name="description"]', 'meta', { name: 'description', content: metadata.description });
    set('meta[property="og:title"]', 'meta', { property: 'og:title', content: metadata.title });
    set('meta[property="og:description"]', 'meta', { property: 'og:description', content: metadata.description });
    set('meta[property="og:url"]', 'meta', { property: 'og:url', content: metadata.url });
    set('link[rel="canonical"]', 'link', {rel: 'canonical', href: metadata.url});
    if (notFound) set('meta[name="robots"]', 'meta', {name: 'robots', content: 'noindex, follow'});
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.dataset.servicesSchema = '';
    script.textContent = JSON.stringify(metadata.schema);
    if (!notFound) document.head.append(script);
    // Prerendered metadata is replaced by the live route's metadata.
    const prerendered = document.head.querySelector('script[data-prerender-schema]');
    prerendered?.remove();
    return () => { document.title = previousTitle; changed.reverse().forEach(restore => restore()); script.remove(); };
  }, [category, notFound]);
  return null;
}
