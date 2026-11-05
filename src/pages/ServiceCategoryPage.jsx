import React from 'react';
import { Link, Navigate, useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, ArrowRight, CheckCircle2 } from 'lucide-react';
import { serviceCategories } from '../data/servicesCatalog';
import { categoryPageContent } from '../data/categoryPageContent';
import { categoryAliases } from '../data/serviceMetadata';
import ServiceSeo from '../components/services/ServiceSeo';
import ServiceDetailModal from '../components/services/ServiceDetailModal';
import { ServiceHero, SubServiceCard, DeliveryProcess, ServiceFaqs, ServiceCta } from '../components/services/ServicePageSections';
import './ServiceRoutes.css';

export default function ServiceCategoryPage() {
  const { categorySlug, serviceSlug } = useParams();
  const navigate = useNavigate();
  const resolved = categoryAliases[categorySlug] || categorySlug;
  const category = serviceCategories.find(cat => cat.id === resolved);
  const service = serviceSlug && category?.subServices.find(sub => sub.id === serviceSlug);
  if (resolved !== categorySlug) return <Navigate replace to={`/services/${resolved}${serviceSlug ? `/${serviceSlug}` : ''}`} />;
  if (!category || (serviceSlug && !service)) return <div className="svc-page"><ServiceSeo notFound /><div className="svc-shell svc-not-found"><span className="svc-eyebrow">404 · Service not found</span><h1>We couldn’t find that service.</h1><p>Explore the directory to find the right category for your project.</p><Link className="svc-button" to="/services">Back to All Services</Link></div></div>;
  const content = categoryPageContent[category.id];
  const related = serviceCategories.filter(cat => cat.id !== category.id).filter(cat => {
    const groups = [['ai-development','ai-integration','custom-software'], ['zero-to-hero','web-development','mobile-app-development','custom-software-development'], ['ecommerce-development','digital-marketing','seo-optimization','whatsapp-integration','graphic-design'], ['cloud-devops','cybersecurity-consulting','maintenance-support','offshore-development']];
    return groups.some(group => group.includes(cat.id) && group.includes(category.id));
  }).slice(0,3);
  return <div className="svc-page svc-category-page" key={category.id}>
    <ServiceSeo category={category} />
    <div className="svc-shell">
      <Link className="svc-back" to="/services"><ArrowLeft size={17} /> Back to All Services</Link>
      <ServiceHero category={category} />
      <section className="svc-section svc-overview" aria-labelledby="overview-heading">
        <div><span className="svc-eyebrow">The complete picture</span><h2 id="overview-heading">Built around your business</h2><p>{content.overview}</p></div>
        <div className="svc-overview-note"><h3>Who this is for</h3><p>{content.audience}</p><h3>Why work with Dottangle?</h3><p>We connect the planning and implementation work in one delivery team. For {category.shortName.toLowerCase()}, the project starts with {content.process[0].toLowerCase()} and ends with a documented handover, so your team can operate what we deliver.</p></div>
      </section>
      <section className="svc-section" aria-labelledby="capabilities-heading">
        <div className="svc-section-heading"><div><span className="svc-eyebrow">Scope your project</span><h2 id="capabilities-heading">Related sub-services</h2></div><span className="svc-counter">{category.subServices.length} Sub-Services</span></div>
        <p className="svc-section-lead">Explore the capabilities within {category.shortName}. Each can be scoped individually or combined into a connected delivery plan.</p>
        <div className="svc-sub-grid">{category.subServices.map(sub => <SubServiceCard key={sub.id} service={sub} category={category} />)}</div>
      </section>
      {category.processPipeline && <section className="svc-section svc-lifecycle"><span className="svc-eyebrow">Incubation lifecycle</span><h2>From concept to a growing product</h2><ol>{category.processPipeline.map(step => <li key={step.step}><strong>{step.step} · {step.title}</strong><p>{step.desc}</p></li>)}</ol></section>}
      <DeliveryProcess steps={content.process} />
      <section className="svc-section svc-tools" aria-labelledby="tools-heading"><span className="svc-eyebrow">A stack that fits the work</span><h2 id="tools-heading">Technologies and tools</h2><p>We choose from these tools according to your existing systems, team skills, and project constraints.</p><ul>{content.tools.map(tool => <li key={tool}>{tool}</li>)}</ul></section>
      <section className="svc-section" aria-labelledby="benefits-heading"><span className="svc-eyebrow">Practical applications</span><h2 id="benefits-heading">Benefits and use cases</h2><div className="svc-benefit-grid">{content.outcomes.map(outcome => <article key={outcome}><CheckCircle2 size={23} /><h3>{outcome}</h3></article>)}</div></section>
      <ServiceFaqs faqs={content.faqs} />
      <section className="svc-section" aria-labelledby="related-heading"><h2 id="related-heading">Related services</h2><nav className="svc-related" aria-label="Related services">{related.map(cat => <Link key={cat.id} to={`/services/${cat.id}`}>{cat.name}<ArrowRight size={18} /></Link>)}</nav></section>
      <ServiceCta category={category} />
    </div>
    {service && <ServiceDetailModal service={service} category={category} onClose={() => navigate(`/services/${category.id}`, { replace: true })} />}
  </div>;
}
