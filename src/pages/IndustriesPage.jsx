import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Cpu, 
  ShoppingBag, 
  Store, 
  Factory, 
  UtensilsCrossed, 
  Briefcase, 
  ArrowRight, 
  CheckCircle2, 
  ShieldCheck 
} from 'lucide-react';

export default function IndustriesPage() {
  const industries = [
    {
      id: 'startups',
      title: 'Tech Startups & High-Growth Ventures',
      icon: <Cpu size={28} />,
      tagline: 'Incorporation, Startup India DPIIT, ESOPs & Cloud Engineering',
      desc: 'We help tech founders set up compliant corporate structures ready for angel and venture capital, claim 80-IAC tax holidays, draft Shareholder Agreements (SHA), and architect custom React applications.',
      services: [
        'Private Limited Incorporation (SPICe+)',
        'Startup India DPIIT Recognition & Tax Benefits',
        'Founder Vesting & ESOP Pool Architecture',
        'Custom Web & Mobile App Development'
      ],
      link: '/services/business-registration'
    },
    {
      id: 'd2c',
      title: 'D2C Brands & Consumer Goods',
      icon: <ShoppingBag size={28} />,
      tagline: 'Brand Identity, Trademark Class 3/5/25, Shopify & Meta Ads',
      desc: 'From protecting your brand trademark and packaging design to deploying high-converting custom Shopify stores with razor-sharp checkout funnels and scaled performance marketing.',
      services: [
        'Trademark Search & Class 3/5/25 Registration',
        'Bespoke Shopify / WooCommerce Store Design',
        'Payment Gateway & Multi-Carrier Shipping Integration',
        'High-ROAS Meta & Google Shopping Ads'
      ],
      link: '/services/ecommerce-management'
    },
    {
      id: 'ecommerce',
      title: 'Marketplace Sellers (Amazon & Flipkart)',
      icon: <Store size={28} />,
      tagline: 'Datics-Inspired Full-Service Account & Catalog Management',
      desc: 'Scale GMV across Amazon India, Flipkart Seller Hub, Meesho, and Myntra. We optimize titles, bullets, Enhanced Brand Content (A+), Sponsored Products PPC, and monitor seller health 24/7.',
      services: [
        'Amazon & Flipkart Seller Central Setup',
        'Catalog Management & 3D Lifestyle Infographics',
        'Sponsored Products & Sponsored Brands PPC Ads',
        'Account Health & Listing Reinstatement'
      ],
      link: '/services/ecommerce-management'
    },
    {
      id: 'manufacturing',
      title: 'Manufacturing & Export Houses',
      icon: <Factory size={28} />,
      tagline: 'DGFT Import Export Code, GST Refunds & Factory Licences',
      desc: 'Complete industrial compliance for producers and exporters: securing DGFT IEC codes, claiming LUT/GST export refunds, Shop & Establishment certifications, and trade compliance.',
      services: [
        'DGFT Import Export Code (IEC) Registration',
        'GST Export Refund (LUT) & Inverted Duty Claims',
        'Factory Act & Labour Licence Assistance',
        'Pollution Board & Trade NOC Coordination'
      ],
      link: '/services/licences-certifications'
    },
    {
      id: 'food',
      title: 'Food, Restaurants & Cloud Kitchens',
      icon: <UtensilsCrossed size={28} />,
      tagline: 'FSSAI Basic, State & Central Licences, Swiggy/Zomato Onboarding',
      desc: 'Accelerating food ventures with rapid FSSAI licensing, municipal health trade permits, packaged goods labeling compliance, and food delivery platform partner onboarding.',
      services: [
        'FSSAI State & Central Food Licences',
        'Municipal Health Trade Licence Assistance',
        'Packaged Food Nutritional Labeling Review',
        'Swiggy / Zomato Restaurant Partner Compliance'
      ],
      link: '/services/licences-certifications'
    },
    {
      id: 'professional',
      title: 'Professional Practices & Healthcare Clinics',
      icon: <Briefcase size={28} />,
      tagline: 'LLP Formations, Practice Bookkeeping & Tax Exemption Structuring',
      desc: 'Specialized corporate structuring for doctors, corporate lawyers, architects, and financial advisors seeking limited liability protection, tax planning, and payroll execution.',
      services: [
        'LLP (Limited Liability Partnership) Incorporation',
        'Professional Tax (PT) Registration & Filings',
        'Monthly Bookkeeping, TDS & Payroll Retainers',
        'Clinic & Practice Local Shop Act Licences'
      ],
      link: '/services/accounting-financial'
    }
  ];

  return (
    <div className="industries-page" style={{ paddingTop: 'calc(var(--header-height) + 40px)', paddingBottom: '100px' }}>
      <div className="container">
        {/* Hero */}
        <div style={{ textAlign: 'center', maxWidth: '820px', margin: '0 auto 60px' }}>
          <div className="hb-badge-tag">
            <ShieldCheck size={14} /> Domain-Specific Specialization
          </div>
          <h1 className="blog-title">
            Tailored Industry Solutions for <br />
            <span className="serif-italic gradient-coral-text">High-Performing Businesses.</span>
          </h1>
          <p className="blog-subtitle">
            Every sector faces distinct statutory requirements, marketplace dynamics, and operational constraints. Explore our dedicated playbooks tailored to your industry.
          </p>
        </div>

        {/* Industries Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', gap: '32px', marginBottom: '70px' }}>
          {industries.map(ind => (
            <div key={ind.id} className="glass-card" style={{ padding: '36px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div>
                <div className="hb-card-icon-wrap" style={{ width: '56px', height: '56px' }}>
                  {ind.icon}
                </div>
                <h3 style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: '8px' }}>
                  {ind.title}
                </h3>
                <div style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--coral-400)', marginBottom: '14px' }}>
                  {ind.tagline}
                </div>
                <p style={{ color: 'var(--text-body)', fontSize: '0.92rem', lineHeight: 1.6, marginBottom: '20px' }}>
                  {ind.desc}
                </p>

                <div style={{ marginBottom: '24px' }}>
                  <div style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '10px' }}>
                    Key Solutions Included:
                  </div>
                  <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    {ind.services.map((svc, sidx) => (
                      <li key={sidx} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.85rem', color: 'var(--text-body)' }}>
                        <CheckCircle2 size={14} color="#10B981" />
                        <span>{svc}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <Link to={ind.link} className="btn btn-primary" style={{ justifyContent: 'center' }}>
                <span>Explore {ind.title.split(' ')[0]} Solutions</span>
                <ArrowRight size={16} />
              </Link>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="glass-card" style={{ padding: '48px', textAlign: 'center' }}>
          <h2 style={{ fontSize: '1.9rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: '12px' }}>
            Don't see your specific sector listed?
          </h2>
          <p style={{ color: 'var(--text-body)', maxWidth: '600px', margin: '0 auto 24px' }}>
            We customize registration, compliance, marketplace scaling, and digital software solutions for unique specialized verticals across India and abroad.
          </p>
          <Link to="/contact" className="btn btn-primary">
            <span>Schedule Vertical Strategy Call</span>
            <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </div>
  );
}

