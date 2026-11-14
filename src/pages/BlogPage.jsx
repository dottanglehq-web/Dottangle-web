import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Search, BookOpen, Clock, Calendar, ArrowRight, User, Sparkles } from 'lucide-react';
import './Blog.css';

const DEFAULT_ARTICLES = [
  {
    slug: 'pvt-ltd-vs-llp-guide-2026',
    title: 'Private Limited vs LLP: Complete Incorporation Guide for Indian Founders in 2026',
    excerpt: 'Detailed comparison of compliance overhead, tax implications, fundraising viability, and registration costs between Pvt Ltd and LLP structures in India.',
    category: 'Business Registration',
    readTime: '6 min read',
    publishedAt: '2026-02-15',
    author: 'CA Rohit Sharma'
  },
  {
    slug: 'amazon-seller-growth-playbook',
    title: 'The 2026 Amazon India Seller Playbook: Scale GMV with Catalog & PPC Mastery',
    excerpt: 'Comprehensive roadmap for marketplace sellers to win the Buy Box, optimize A+ Content, drive low-ACOS Sponsored Products, and safeguard account health.',
    category: 'eCommerce Management',
    readTime: '8 min read',
    publishedAt: '2026-02-18',
    author: 'Dottangel eCommerce Team'
  },
  {
    slug: 'trademark-registration-guide-india',
    title: 'Trademark Registration in India: Step-by-Step Process, Classes & Objection Replies',
    excerpt: 'How to protect your brand name, logo and tagline under IP India. Understand class selection (Classes 1–45) and how to respond to Section 9/11 objections.',
    category: 'Trademark & Legal',
    readTime: '7 min read',
    publishedAt: '2026-02-22',
    author: 'Adv. Meera Sen'
  },
  {
    slug: 'gst-compliance-checklist-smes',
    title: 'The Essential GST Compliance Checklist for Startups & Small Businesses',
    excerpt: 'Stay 100% penalty-free with our practical monthly calendar for GSTR-1, GSTR-3B, e-Invoicing thresholds, and automated GSTR-2B input tax credit reconciliation.',
    category: 'GST & Taxation',
    readTime: '5 min read',
    publishedAt: '2026-02-25',
    author: 'CA Ananya Verma'
  },
  {
    slug: 'fssai-license-requirements-food-business',
    title: 'FSSAI License Requirements: Basic Registration vs State vs Central License',
    excerpt: 'Everything cloud kitchens, food manufacturers, packaged goods brands, and restaurants need to know about food safety licensing, labeling norms, and penalties.',
    category: 'Licences & Certifications',
    readTime: '6 min read',
    publishedAt: '2026-03-01',
    author: 'Dottangel Compliance Team'
  },
  {
    slug: 'shopify-vs-custom-ecommerce-2026',
    title: 'Shopify vs Custom React eCommerce: Making the Right Architecture Decision',
    excerpt: 'An engineering and financial breakdown for D2C founders: evaluating transaction fees, developer costs, mobile performance, and checkout customization.',
    category: 'Technology & AI',
    readTime: '9 min read',
    publishedAt: '2026-03-05',
    author: 'Dottangel Engineering'
  }
];

export default function BlogPage() {
  const [articles, setArticles] = useState(DEFAULT_ARTICLES);
  const [selectedCat, setSelectedCat] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/blogs')
      .then(res => res.ok ? res.json() : null)
      .then(data => {
        if (data && data.articles && data.articles.length > 0) {
          setArticles(data.articles);
        }
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const categories = [
    'All',
    'Business Registration',
    'GST & Taxation',
    'Trademark & Legal',
    'eCommerce Management',
    'Licences & Certifications',
    'Technology & AI'
  ];

  const filtered = articles.filter(post => {
    const matchesCat = selectedCat === 'All' || post.category === selectedCat;
    const matchesSearch = !searchQuery || 
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  const featured = articles[0];

  return (
    <div className="blog-page">
      <div className="container">
        {/* Hero Header */}
        <div className="blog-hero">
          <div className="blog-hero-tag">
            <BookOpen size={14} /> Knowledge Centre & Insights
          </div>
          <h1 className="blog-title">
            Compliance, Strategy & <br />
            <span className="serif-italic gradient-coral-text">Growth Playbooks.</span>
          </h1>
          <p className="blog-subtitle">
            Authoritative, practical guides curated by our in-house Chartered Accountants, corporate legal advisors, eCommerce strategists, and software engineers.
          </p>
        </div>

        {/* Toolbar: Search & Categories */}
        <div className="blog-toolbar">
          <div className="blog-search-box">
            <Search className="blog-search-icon" size={18} />
            <input
              type="search"
              className="blog-search-input"
              placeholder="Search by topic, keyword, or compliance term..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="blog-cats-nav">
            {categories.map(cat => (
              <button
                key={cat}
                className={`blog-cat-btn ${selectedCat === cat ? 'active' : ''}`}
                onClick={() => setSelectedCat(cat)}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Featured Post (only when not searching) */}
        {!searchQuery && selectedCat === 'All' && featured && (
          <div className="blog-featured-card">
            <div className="blog-featured-body">
              <div>
                <div className="blog-meta-row">
                  <span className="blog-cat-badge">{featured.category}</span>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <Clock size={14} /> {featured.readTime || '6 min read'}
                  </span>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <Calendar size={14} /> {featured.publishedAt || 'Feb 2026'}
                  </span>
                </div>
                <h2 className="blog-featured-title">
                  <Link to={`/blog/${featured.slug}`} style={{ color: 'inherit', textDecoration: 'none' }}>
                    {featured.title}
                  </Link>
                </h2>
                <p className="blog-featured-excerpt">{featured.excerpt}</p>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '20px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.88rem', color: 'var(--text-muted)' }}>
                  <User size={16} />
                  <span>By {featured.author || 'Dottangel Advisory Team'}</span>
                </div>
                <Link to={`/blog/${featured.slug}`} className="btn btn-primary">
                  <span>Read Full Guide</span>
                  <ArrowRight size={16} />
                </Link>
              </div>
            </div>
          </div>
        )}

        {/* Articles Grid */}
        <div className="blog-grid">
          {filtered.map(post => (
            <Link key={post.slug} to={`/blog/${post.slug}`} className="blog-card">
              <div>
                <div className="blog-meta-row">
                  <span className="blog-cat-badge">{post.category}</span>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <Clock size={14} /> {post.readTime || '5 min read'}
                  </span>
                </div>
                <h3>{post.title}</h3>
                <p>{post.excerpt}</p>
              </div>
              <div className="blog-card-footer">
                <span>Read Full Article &rarr;</span>
                <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{post.publishedAt || '2026'}</span>
              </div>
            </Link>
          ))}
        </div>

        {filtered.length === 0 && (
          <div style={{ textAlign: 'center', padding: '60px 20px', color: 'var(--text-muted)' }}>
            <p style={{ fontSize: '1.2rem', marginBottom: '14px' }}>No articles found matching "{searchQuery}".</p>
            <button className="btn btn-glass" onClick={() => { setSearchQuery(''); setSelectedCat('All'); }}>
              Reset Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

