import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Clock, Calendar, User, Share2, ArrowRight, ShieldCheck, CheckCircle2 } from 'lucide-react';
import './Blog.css';

const ARTICLE_FALLBACKS = {
  'pvt-ltd-vs-llp-guide-2026': {
    title: 'Private Limited vs LLP: Complete Incorporation Guide for Indian Founders in 2026',
    category: 'Business Registration',
    readTime: '6 min read',
    publishedAt: 'February 15, 2026',
    author: 'CA Rohit Sharma (Senior Corporate Advisor)',
    relatedService: {
      name: 'Private Limited Company Registration',
      link: '/service/pvt-ltd-registration',
      desc: 'Complete digital incorporation, MCA name approval, 2 DIN/DSC, PAN/TAN, and MSME registration.'
    },
    sections: [
      {
        heading: 'Executive Summary',
        body: 'Choosing the right business structure is the single most consequential legal decision an Indian entrepreneur makes at the inception stage. While both a Private Limited Company (Pvt Ltd) and a Limited Liability Partnership (LLP) offer limited liability protection to their promoters, their structural differences in fundraising, statutory compliance burden, taxation, and operational flexibility are vast.'
      },
      {
        heading: 'Core Differences at a Glance',
        body: 'A Private Limited Company is governed under the Companies Act, 2013, requiring a minimum of two directors and two shareholders. An LLP is governed by the Limited Liability Partnership Act, 2008. The key operational distinction lies in ownership vs management: in a company, equity can be seamlessly diluted and issued to angel investors and venture capital firms. In an LLP, new partners must be admitted via partnership deed amendments, making equity financing impractical.'
      },
      {
        heading: 'Taxation & Profit Repatriation in 2026',
        body: 'Both entities are subject to corporate tax structures. Domestic companies incorporated on or after October 1, 2019 may avail the concessional tax rate under Section 115BAB (15% base tax + surcharge and cess, subject to conditions) or the standard 22% rate under Section 115BAA. LLPs, on the other hand, are taxed at a flat rate of 30% plus applicable surcharge and cess. However, profits distributed to partners in an LLP are exempt from dividend distribution tax in the hands of the partners, unlike company dividends which are taxable at marginal rates.'
      },
      {
        heading: 'Statutory Annual Compliance Comparison',
        body: 'LLPs enjoy significantly lower annual compliance overhead if their turnover is under ₹40 Lakhs or capital contribution is under ₹25 Lakhs (statutory audit is exempt). Companies must undergo mandatory statutory audit irrespective of turnover, appoint a statutory auditor (Form ADT-1), hold Annual General Meetings (AGM), and file annual financial statements (AOC-4) and annual returns (MGT-7).'
      },
      {
        heading: 'The Final Verdict: Which One Should You Choose?',
        body: 'Choose a Private Limited Company if: you plan to raise institutional angel or VC capital, offer ESOPs to key talent, or build a scalable technology/D2C brand. Choose an LLP if: you are running a consulting firm, professional service agency, boot-strapped enterprise, or family-owned venture where external equity dilution is not required.'
      }
    ]
  },
  'amazon-seller-growth-playbook': {
    title: 'The 2026 Amazon India Seller Playbook: Scale GMV with Catalog & PPC Mastery',
    category: 'eCommerce Management',
    readTime: '8 min read',
    publishedAt: 'February 18, 2026',
    author: 'Dottangel eCommerce Growth Team',
    relatedService: {
      name: 'Complete eCommerce & Marketplace Management',
      link: '/services/ecommerce-management',
      desc: 'End-to-end account launch, cataloging, A+ Content (EBC), multi-channel inventory sync, and low-ACOS PPC.'
    },
    sections: [
      {
        heading: 'Introduction: The Shifting Amazon Algorithm in 2026',
        body: 'Amazon India is no longer an open catalog where merely listing a product guarantees organic sales. The A10 algorithm places unprecedented weight on conversion velocity, seller account health rating (AHR), review quality velocity, and fulfillment speed (FBA vs Easy Ship).'
      },
      {
        heading: 'Step 1: Catalog Optimization & High-Converting A+ Content',
        body: 'Your product listing is your digital storefront. High-ranking products maintain 150-180 character search-term-rich titles, 5 benefit-driven bullet points addressing buyer friction, and 7 high-resolution imagery assets including lifestyle shots and dimensional infographics. Brand Registry unlocks A+ Content (Enhanced Brand Content), which increases page conversion rates by an average of 14% to 22%.'
      },
      {
        heading: 'Step 2: Structuring High-ROAS Sponsored Ads (PPC)',
        body: 'To scale sustainably without burning capital, segment PPC campaigns into 3 distinct funnels: 1) Auto Discovery campaigns for continuous keyword harvesting; 2) Manual Exact-Match campaigns targeting proven high-converting keywords; and 3) Competitor ASIN targeting to capture market share on relevant rival product detail pages. Monitor Target ACOS daily.'
      },
      {
        heading: 'Step 3: Maintaining Account Health & Buy Box Ownership',
        body: 'Never let your Order Defect Rate (ODR) cross 1%, or Late Shipment Rate cross 4%. Maintaining FBA (Fulfillment by Amazon) guarantees Prime eligibility, immediate Buy Box priority, and shield against transit-related negative reviews.'
      }
    ]
  }
};

export default function BlogPostPage() {
  const { slug } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/blogs/${slug}`)
      .then(res => res.ok ? res.json() : null)
      .then(data => {
        if (data && data.article) {
          setPost(data.article);
        } else {
          setPost(ARTICLE_FALLBACKS[slug] || {
            title: slug.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' '),
            category: 'Business Knowledge',
            readTime: '5 min read',
            publishedAt: '2026',
            author: 'Dottangel Compliance Team',
            relatedService: {
              name: 'Explore Related Business Services',
              link: '/services',
              desc: 'Get expert consultation and end-to-end execution support from certified professionals.'
            },
            sections: [
              {
                heading: 'Overview & Regulatory Context',
                body: 'In modern corporate operations, staying aligned with statutory authorities (MCA, GSTN, IP India, DGFT) is critical to avoiding heavy fiscal penalties, director disqualification, and frozen accounts.'
              },
              {
                heading: 'Key Implementation Steps',
                body: 'Ensure all primary KYC documents (PAN, Aadhaar, utility bills) are kept up to date and verified. Consult qualified professionals before executing structural changes to your company or product line.'
              }
            ]
          });
        }
      })
      .catch(() => {
        setPost(ARTICLE_FALLBACKS[slug] || ARTICLE_FALLBACKS['pvt-ltd-vs-llp-guide-2026']);
      })
      .finally(() => setLoading(false));
  }, [slug]);

  if (loading) {
    return (
      <div className="post-page">
        <div className="container" style={{ textAlign: 'center', padding: '100px 0' }}>
          <p style={{ color: 'var(--text-muted)' }}>Loading article...</p>
        </div>
      </div>
    );
  }

  const related = post.relatedService || {
    name: 'Business Incorporation & Legal Services',
    link: '/services/business-registration',
    desc: 'Speak directly with our qualified corporate advisors to execute your business setup.'
  };

  return (
    <article className="post-page">
      <div className="post-container">
        {/* Breadcrumb */}
        <nav className="post-breadcrumbs" aria-label="Breadcrumb">
          <Link to="/">Home</Link>
          <span>/</span>
          <Link to="/blog">Blog & Guides</Link>
          <span>/</span>
          <span style={{ color: 'var(--text-main)' }}>{post.category}</span>
        </nav>

        {/* Header */}
        <header className="post-header">
          <span className="blog-cat-badge" style={{ marginBottom: '16px', display: 'inline-block' }}>
            {post.category}
          </span>
          <h1 className="post-title">{post.title}</h1>
          <div className="post-meta-bar">
            <div className="post-author-box">
              <div className="post-author-avatar">
                {post.author ? post.author.charAt(0) : 'D'}
              </div>
              <div>
                <strong style={{ color: 'var(--text-main)' }}>{post.author || 'Dottangel Advisory'}</strong>
                <div style={{ fontSize: '0.78rem' }}>Verified Professional Review</div>
              </div>
            </div>
            <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              <Clock size={15} /> {post.readTime || '6 min read'}
            </span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              <Calendar size={15} /> {post.publishedAt || '2026'}
            </span>
          </div>
        </header>

        {/* Content Body */}
        <div className="post-content">
          {post.sections ? (
            post.sections.map((sec, idx) => (
              <section key={idx}>
                <h2>{sec.heading}</h2>
                <p>{sec.body}</p>
              </section>
            ))
          ) : (
            <div>
              <p>{post.content || post.excerpt}</p>
            </div>
          )}

          {/* Expert Callout Box */}
          <div className="post-callout">
            <h4>
              <ShieldCheck size={18} style={{ display: 'inline', verticalAlign: 'middle', marginRight: '6px' }} />
              Dottangel Advisory Note
            </h4>
            <p style={{ margin: 0, fontSize: '0.92rem' }}>
              Statutory regulations are subject to periodic circulars issued by the Ministry of Corporate Affairs (MCA), Central Board of Indirect Taxes and Customs (CBIC), and Controller General of Patents, Designs and Trade Marks (CGPDTM). Consult our advisory desk for the latest compliance thresholds.
            </p>
          </div>
        </div>

        {/* Related Service Action Card */}
        <div className="post-related-cta">
          <span className="hb-badge-tag" style={{ marginBottom: '12px' }}>
            Recommended Solution
          </span>
          <h3>{related.name}</h3>
          <p>{related.desc}</p>
          <div style={{ display: 'flex', gap: '14px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to={related.link} className="btn btn-primary">
              <span>View Service Details & Fees</span>
              <ArrowRight size={16} />
            </Link>
            <Link to="/contact" className="btn btn-glass">
              <span>Book Expert Consultation</span>
            </Link>
          </div>
        </div>

        {/* Back Link */}
        <div style={{ paddingTop: '20px', borderTop: '1px solid var(--border-subtle)', display: 'flex', justifyContent: 'space-between' }}>
          <Link to="/blog" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', color: 'var(--coral-400)', textDecoration: 'none', fontWeight: 600 }}>
            <ArrowLeft size={16} />
            <span>Back to All Guides</span>
          </Link>
          <Link to="/tools/cost-calculator" style={{ color: 'var(--text-muted)', textDecoration: 'none', fontSize: '0.9rem' }}>
            Calculate Incorporation Fees &rarr;
          </Link>
        </div>
      </div>
    </article>
  );
}

