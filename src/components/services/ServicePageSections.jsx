import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { subServiceBenefit } from '../../data/serviceCardContent';
import { CategoryIcon, TechLogo } from './ServiceIcons';

export function InquiryActions({ category, final = false }) {
  const destination = `/contact?service=${encodeURIComponent(category.name)}`;
  return <div className="svc-actions">
    <Link className="svc-button" to={destination}>{final ? 'Get a Free Quote' : 'Start Your Project'}<ArrowRight size={17} /></Link>
    <Link className="svc-button svc-button-secondary" to={destination}>{final ? 'Contact Our Team' : 'Get a Free Consultation'}</Link>
  </div>;
}
export function ServiceHero({ category }) {
  return <header className="svc-hero">
    <div className="svc-hero-copy">
      <span className="svc-eyebrow">{category.badge || 'Dottangle Services'}</span>
      <h1>{category.name}</h1>
      <p className="svc-intro">{category.description}</p>
      <p className="svc-value">{category.tagline}</p>
      <InquiryActions category={category} />
    </div>
    <div className="svc-hero-visual" aria-hidden="true">
      <CategoryIcon name={category.iconName} size={84} />
      <span>{String(category.subServices.length).padStart(2, '0')}</span>
      <p>Connected capabilities.<br />One delivery partner.</p>
    </div>
  </header>;
}
export function SubServiceCard({ service, category }) {
  return <article className="svc-sub-card">
    <div className="svc-icon"><TechLogo iconKey={service.iconKey} size={27} /></div>
    <h3>{service.title}</h3>
    <p>{service.shortDesc}</p>
    {service.deliverables?.length ? <ul>{service.deliverables.map(item => <li key={item}>{item}</li>)}</ul> :
      <p className="svc-capability"><strong>Capabilities & tools</strong><br />{service.tech}</p>}
    <p className="svc-card-benefit"><strong>Business application</strong><br />{subServiceBenefit(service)}</p>
    <Link className="svc-text-link" to={`/services/${category.id}/${service.id}`}>Learn More <ArrowRight size={16} /></Link>
  </article>;
}
export function DeliveryProcess({ steps }) {
  const labels = ['Discovery', 'Strategy', 'Design', 'Implementation', 'Validation', 'Launch & support'];
  return <section className="svc-section" aria-labelledby="delivery-heading">
    <span className="svc-eyebrow">From brief to delivery</span><h2 id="delivery-heading">Our development process</h2>
    <ol className="svc-process">{steps.map((step, index) => <li key={step}>
      <span className="svc-step-number">0{index + 1}</span><h3>{labels[index]}</h3><p>{step}.</p>
    </li>)}</ol>
  </section>;
}
export function ServiceFaqs({ faqs }) {
  return <section className="svc-section svc-faqs" aria-labelledby="faq-heading">
    <span className="svc-eyebrow">Before we begin</span><h2 id="faq-heading">Frequently asked questions</h2>
    {faqs.map(([question, answer]) => <details key={question}><summary><h3>{question}</h3></summary><p>{answer}</p></details>)}
  </section>;
}
export function ServiceCta({ category }) {
  return <section className="svc-final-cta"><span className="svc-eyebrow">Your next step</span>
    <h2>Have a project in mind?</h2><p>Tell us what you want to achieve with {category.shortName.toLowerCase()}. We’ll help define the scope, dependencies, and next steps.</p>
    <InquiryActions category={category} final />
  </section>;
}
