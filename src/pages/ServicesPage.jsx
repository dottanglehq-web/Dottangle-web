import React, { useMemo, useRef, useState } from 'react';
import { Link, Navigate, useSearchParams } from 'react-router-dom';
import { Search, ArrowRight } from 'lucide-react';
import { serviceCategories } from '../data/servicesCatalog';
import { searchServices } from '../data/serviceSearch';
import { categoryAliases } from '../data/serviceMetadata';
import { CategoryIcon } from '../components/services/ServiceIcons';
import ServiceSeo from '../components/services/ServiceSeo';
import './ServiceRoutes.css';

export default function ServicesPage() {
  const [params] = useSearchParams();
  const [query, setQuery] = useState('');
  const inputRef = useRef(null);
  const categories = useMemo(() => {
    const results = searchServices(serviceCategories, query);
    return results === null ? serviceCategories : serviceCategories.filter(cat => results.some(sub => sub.categoryIds.includes(cat.id)));
  }, [query]);
  const requested = categoryAliases[params.get('category')] || params.get('category');
  if (requested && serviceCategories.some(cat => cat.id === requested)) return <Navigate replace to={`/services/${requested}`} />;
  return <div className="svc-page svc-directory">
    <ServiceSeo />
    <div className="svc-shell">
      <header className="svc-directory-heading">
        <span className="svc-eyebrow">The Dottangle studio</span>
        <h1>Explore Our Services</h1>
        <p>Find the expertise your next project needs. Explore our capabilities in product engineering, design, infrastructure, and business growth.</p>
      </header>
      <section aria-labelledby="category-heading">
        <div className="svc-directory-toolbar">
          <h2 id="category-heading">Service Categories <span className="svc-counter">{serviceCategories.length} Categories</span></h2>
          <div className="svc-search"><Search size={19} aria-hidden="true" />
            <input ref={inputRef} value={query} onChange={event => setQuery(event.target.value)} type="search" aria-label="Search services" placeholder="Search services or capabilities…" />
            {query && <button type="button" aria-label="Clear search" onClick={() => {setQuery(''); inputRef.current?.focus();}}>×</button>}
          </div>
        </div>
        {query && <p role="status" className="svc-result-count">{categories.length ? `${categories.length} categories matching “${query}”` : `No services found for “${query}”. Try AI, web, SEO, or cloud.`}</p>}
        <nav className="svc-directory-grid" aria-label="Service categories">
          {categories.map((category, index) => <Link key={category.id} className="svc-category-card" to={`/services/${category.id}`}>
            <div className="svc-category-top"><span className="svc-icon"><CategoryIcon name={category.iconName} size={26} /></span><span className="svc-category-index">{String(index + 1).padStart(2, '0')}</span></div>
            {category.badge && <span className="svc-badge">{category.badge}</span>}
            <h3>{category.name}</h3><p>{category.tagline}</p>
            <span className="svc-text-link">Explore service <ArrowRight size={17} /></span>
          </Link>)}
        </nav>
      </section>
    </div>
  </div>;
}
