import React, { useState, useMemo, useEffect, useRef } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import {
  Search,
  ChevronDown,
  ArrowRight,
  Sparkles,
  CheckCircle2,
  ShieldCheck,
  Zap,
  Layers,
  Flame
} from 'lucide-react';
import {
  serviceCategories,
  technologiesData,
  industriesData
} from '../data/servicesCatalog';
import { TechLogo, CategoryIcon } from '../components/services/ServiceIcons';
import OfficialTechLogo from '../components/services/OfficialTechLogos';
import ServiceDetailModal from '../components/services/ServiceDetailModal';
import './ServicesPage.css';
import { searchServices } from '../data/serviceSearch';

/**
 * Robust path parser for /services, /services/:categorySlug, and /services/:categorySlug/:serviceSlug
 */
function parseServicesPath() {
  if (typeof window === 'undefined') return { catSlug: null, subSlug: null };
  const pathname = window.location.pathname;
  const clean = pathname.replace(/^\/services\/?/, '');
  const parts = clean.split('/').filter(Boolean);
  const catSlug = parts[0] || null;
  const subSlug = parts[1] || null;
  return { catSlug, subSlug };
}

export default function ServicesPage() {
  const [searchParams] = useSearchParams();

  // Instant initial category resolution from URL or query without flash
  const [activeCategoryId, setActiveCategoryId] = useState(() => {
    const { catSlug } = parseServicesPath();
    const queryCat = searchParams.get('category');
    const target = catSlug || queryCat || 'ai-development';
    return serviceCategories.some((c) => c.id === target) ? target : 'ai-development';
  });

  // Instant initial sub-service modal resolution from URL
  const [selectedSubService, setSelectedSubService] = useState(() => {
    const { subSlug } = parseServicesPath();
    if (subSlug) {
      for (const cat of serviceCategories) {
        const found = cat.subServices.find((s) => s.id === subSlug);
        if (found) return found;
      }
    }
    return null;
  });

  const [searchQuery, setSearchQuery] = useState('');
  const [categoriesOpen, setCategoriesOpen] = useState(false);
  const categoryToggleRef = useRef(null);
  const searchInputRef = useRef(null);
  const clearSearch = () => { setSearchQuery(''); searchInputRef.current?.focus(); };
  const [activeTechTab, setActiveTechTab] = useState('AI & Machine Learning');

  // Synchronize browser history and deep links smoothly without unmounting or reloading
  useEffect(() => {
    const handlePopState = () => {
      const { catSlug, subSlug } = parseServicesPath();
      const targetCat = catSlug || 'ai-development';
      if (serviceCategories.some((c) => c.id === targetCat)) {
        setActiveCategoryId(targetCat);
      }
      if (subSlug) {
        for (const cat of serviceCategories) {
          const found = cat.subServices.find((s) => s.id === subSlug);
          if (found) {
            setSelectedSubService(found);
            return;
          }
        }
      }
      setSelectedSubService(null);
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Current active category object
  const activeCategory = useMemo(() => {
    return serviceCategories.find((c) => c.id === activeCategoryId) || serviceCategories[0];
  }, [activeCategoryId]);

  // Smooth category select without page reload or jump
  const handleCategorySelect = (catId, shouldScroll = false) => {
    setCategoriesOpen(false);
    if (categoriesOpen) categoryToggleRef.current?.focus();
    if (catId === activeCategoryId && !searchQuery) {
      if (shouldScroll) {
        document.getElementById('service-explorer')?.scrollIntoView({ behavior: 'smooth' });
      }
      return;
    }
    setActiveCategoryId(catId);
    setSearchQuery('');
    setSelectedSubService(null);
    window.history.pushState({ categoryId: catId }, '', `/services/${catId}`);
    if (shouldScroll) {
      setTimeout(() => {
        document.getElementById('service-explorer')?.scrollIntoView({ behavior: 'smooth' });
      }, 50);
    }
  };

  // Open detail modal with deep-linked URL update
  const handleSubServiceSelect = (sub, parentCatId = activeCategoryId) => {
    setActiveCategoryId(parentCatId);
    setSelectedSubService(sub);
    window.history.pushState({ serviceId: sub.id }, '', `/services/${parentCatId}/${sub.id}`);
  };

  // Close detail modal without jumping or route unmount
  const handleModalClose = () => {
    setSelectedSubService(null);
    window.history.pushState({ categoryId: activeCategoryId }, '', `/services/${activeCategoryId}`);
  };

  const searchResults = useMemo(() => searchServices(serviceCategories, searchQuery), [searchQuery]);
  const visibleCategories = searchResults === null ? serviceCategories : serviceCategories.filter(cat => searchResults.some(sub => sub.categoryIds.includes(cat.id)));

  return (
    <div className="sp-page">
      {/* Main Two-Column Service Explorer */}
      <section className="sp-explorer-section" id="service-explorer">
        <div className="container">
          <div className="sp-explorer-layout">
              <aside className="sp-sidebar">
                <div className="sp-sidebar-header">
                  <span className="sp-sidebar-title">Service Categories</span>
                  <span className="sp-cat-counter">{serviceCategories.length} Categories</span>
                </div>

                {/* Compact Search Box in Sidebar */}
                <div className="sp-sidebar-search">
                  <Search size={14} className="sp-sidebar-search-icon" />
                  <input
                    type="text"
                    placeholder="Search capabilities..."
                    ref={searchInputRef}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    aria-label="Search services"
                  />
                  {searchQuery && (
                    <button
                      className="sp-sidebar-search-clear"
                      onClick={clearSearch}
                      aria-label="Clear search"
                    >
                      &times;
                    </button>
                  )}
                </div>

                <button
                  ref={categoryToggleRef}
                  type="button"
                  className="sp-category-toggle"
                  aria-expanded={categoriesOpen}
                  aria-controls="service-category-list"
                  onClick={() => setCategoriesOpen(open => !open)}
                >
                  <CategoryIcon name={activeCategory.iconName} size={20} />
                  <span>{activeCategory.name}</span>
                  <ChevronDown size={20} className="sp-category-chevron" />
                </button>
                <div className={`sp-category-list ${categoriesOpen ? 'is-open' : ''}`}
                  onKeyDown={event => {
                    if (event.key === 'Escape') {
                      setCategoriesOpen(false);
                      categoryToggleRef.current?.focus();
                    }
                  }}>
                <nav id="service-category-list" className="sp-sidebar-nav" aria-label="Service categories navigation">
                  {serviceCategories.map((cat) => {
                    const isActive = activeCategoryId === cat.id;
                    return (
                      <button
                        key={cat.id}
                        className={`sp-nav-item ${isActive ? 'is-active' : ''}`}
                        onClick={() => handleCategorySelect(cat.id)}
                        type="button"
                        aria-current={isActive ? 'true' : undefined}
                        data-search-match={visibleCategories.includes(cat)}
                      >
                        <div className="sp-nav-icon">
                          <CategoryIcon name={cat.iconName} size={18} />
                        </div>
                        <span className="sp-nav-text">{cat.name}</span>
                        {cat.badge && (
                          <span className={`sp-nav-badge ${isActive ? 'badge-active' : ''}`}>
                            {cat.badge}
                          </span>
                        )}
                      </button>
                    );
                  })}
                </nav>
                </div>
              </aside>
            {searchResults !== null ? (
            <div className="sp-search-results-view">
              <div className="sp-search-header">
                <h3>
                  Search Results for &ldquo;{searchQuery}&rdquo;
                  <span className="sp-results-count">({searchResults.length} matches found)</span>
                </h3>
                <button className="btn btn-glass" onClick={clearSearch}>
                  Clear Search
                </button>
              </div>

              {searchResults.length === 0 ? (
                <div className="sp-no-results">
                  <p>No services found for &ldquo;{searchQuery}&rdquo;.</p>
                  <p className="sp-text-muted">Try searching for &quot;AI&quot;, &quot;Mobile&quot;, &quot;SEO&quot;, &quot;React&quot;, &quot;Cloud&quot;, or &quot;ERP&quot;.</p>
                </div>
              ) : (
                <div className="sp-cards-grid">
                  {searchResults.map((sub, idx) => (
                    <div
                      key={sub.id}
                      className="sp-service-card"
                      style={{ '--card-delay': `${Math.min(idx * 30, 240)}ms` }}
                      onClick={() => handleSubServiceSelect(sub, sub.categoryId)}
                      onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); handleSubServiceSelect(sub, sub.categoryId); } }}
                      role="button"
                      tabIndex={0}
                    >
                      <div className="sp-card-icon-box">
                        <TechLogo iconKey={sub.iconKey} size={28} />
                      </div>
                      <div className="sp-card-content">
                        <div className="sp-card-parent-tag">{sub.categoryName}</div>
                        <h4 className="sp-card-title">{sub.title}</h4>
                        <p className="sp-card-desc">{sub.shortDesc}</p>
                        <div className="sp-card-tech-meta">{sub.tech}</div>
                      </div>
                      <div className="sp-card-cta-action">
                        <span>Explore Capabilities</span>
                        <ArrowRight size={15} />
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
            ) : (
              <main className="sp-content-area" key={activeCategory.id}>
                {/* Selected Category Header Banner */}
                <div className="sp-category-header">
                  <div className="sp-cat-meta-row">
                    <span className="sp-header-tag">{activeCategory.badge || 'Enterprise Solutions'}</span>
                    <span className="sp-count-pill">{activeCategory.subServices.length} Sub-Services</span>
                  </div>
                  <h2 className="sp-category-title">{activeCategory.name}</h2>
                  <p className="sp-category-desc">{activeCategory.description}</p>
                </div>

                {/* SPECIAL FLAGSHIP: Zero to Hero Interactive Visual Step Pipeline */}
                {activeCategory.isZeroToHero && (
                  <div className="sp-pipeline-card">
                    <div className="sp-pipeline-header">
                      <div className="sp-pipeline-badge">
                        <Flame size={16} />
                        <span>Incubation Lifecycle</span>
                      </div>
                      <h3 className="sp-pipeline-title">From Napkin Concept to Market Dominance</h3>
                      <p className="sp-pipeline-sub">A proven step-by-step roadmap taking early-stage ventures from zero to full-scale profitability.</p>
                    </div>

                    <div className="sp-timeline-track">
                      {activeCategory.processPipeline.map((p, idx) => (
                        <div key={idx} className="sp-timeline-node">
                          <div className="sp-node-circle">
                            <span className="sp-node-step">{p.step}</span>
                          </div>
                          <div className="sp-node-title">{p.title}</div>
                          <div className="sp-node-desc">{p.desc}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Two-Column Sub-Service Grid with Staggered Fluid Cascade */}
                <div className="sp-cards-grid">
                  {activeCategory.subServices.map((sub, idx) => (
                    <div
                      key={sub.id}
                      className="sp-service-card"
                      style={{ '--card-delay': `${Math.min(idx * 30, 240)}ms` }}
                      onClick={() => handleSubServiceSelect(sub)}
                      role="button"
                      tabIndex={0}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          handleSubServiceSelect(sub);
                        }
                      }}
                    >
                      <div className="sp-card-icon-box">
                        <TechLogo iconKey={sub.iconKey} size={30} />
                      </div>
                      <div className="sp-card-content">
                        <h4 className="sp-card-title">{sub.title}</h4>
                        <p className="sp-card-desc">{sub.shortDesc}</p>
                        <div className="sp-card-tech-meta">
                          <span className="sp-tech-dot" />
                          <span>{sub.tech}</span>
                        </div>
                      </div>
                      <div className="sp-card-cta-action">
                        <span>Explore Capabilities</span>
                        <ArrowRight size={15} />
                      </div>
                    </div>
                  ))}
                </div>
              </main>
            )}
          </div>
        </div>
      </section>

      {/* 3. Section: Why Choose Us? */}
      <section className="sp-why-section">
        <div className="container">
          <div className="section-header text-center">
            <span className="section-tag">ENGINEERING ADVANTAGE</span>
            <h2 className="section-title">
              Why High-Growth Brands &amp; Enterprises <br />
              <span className="serif-italic gradient-coral-text">Trust Our Technology Studio.</span>
            </h2>
            <p className="section-subtitle mx-auto">
              We combine senior engineering depth with business accountability. Zero junior handoffs, zero boilerplate code.
            </p>
          </div>

          <div className="sp-why-grid">
            <div className="sp-why-card">
              <div className="sp-why-icon-box">
                <Layers size={24} />
              </div>
              <h4>End-to-End Delivery</h4>
              <p>From initial market validation and UI/UX to cloud deployment and ongoing performance marketing, we handle the complete lifecycle.</p>
            </div>

            <div className="sp-why-card">
              <div className="sp-why-icon-box">
                <Zap size={24} />
              </div>
              <h4>Modern High-Performance Stack</h4>
              <p>We build with Next.js 15, React 19, Python, Flutter, and serverless edge runtimes, guaranteeing 95+ Core Web Vitals speed scores.</p>
            </div>

            <div className="sp-why-card">
              <div className="sp-why-icon-box">
                <Sparkles size={24} />
              </div>
              <h4>Flagship AI Integration</h4>
              <p>We deploy autonomous multi-agent workflows, custom LLM fine-tuning, and RAG architectures that automate complex operations.</p>
            </div>

            <div className="sp-why-card">
              <div className="sp-why-icon-box">
                <ShieldCheck size={24} />
              </div>
              <h4>100% IP &amp; Code Ownership</h4>
              <p>You own every line of source code, database architecture, and design system under strict mutual Non-Disclosure Agreements.</p>
            </div>

            <div className="sp-why-card">
              <div className="sp-why-icon-box">
                <CheckCircle2 size={24} />
              </div>
              <h4>Zero Junior Handoffs</h4>
              <p>Work directly with senior tech leads and growth architects on Slack with bi-weekly live staging sprints.</p>
            </div>

            <div className="sp-why-card">
              <div className="sp-why-icon-box">
                <ShieldCheck size={24} />
              </div>
              <h4>Enterprise SLA &amp; Support</h4>
              <p>Guaranteed 24/7 server monitoring, proactive security updates, automated daily cloud snapshots, and instant incident response.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Section: Our Development Process */}
      <section className="sp-process-section">
        <div className="container">
          <div className="section-header text-center">
            <span className="section-tag">AGILE EXECUTION</span>
            <h2 className="section-title">
              Our 7-Stage Engineering <span className="serif-italic gradient-coral-text">Roadmap.</span>
            </h2>
            <p className="section-subtitle mx-auto">
              A transparent, battle-tested framework engineered to eliminate risks and deliver on schedule.
            </p>
          </div>

          <div className="sp-process-steps-row">
            {[
              { step: '01', title: 'Discovery', desc: 'Scope, feasibility & architectural alignment' },
              { step: '02', title: 'Planning', desc: 'PRD definition & sprint milestones' },
              { step: '03', title: 'UI/UX Design', desc: 'High-fidelity Figma prototypes' },
              { step: '04', title: 'Development', desc: 'Clean, modular full-stack code' },
              { step: '05', title: 'Testing', desc: 'Automated Cypress & security audits' },
              { step: '06', title: 'Deployment', desc: 'Zero-downtime production launch' },
              { step: '07', title: 'Support', desc: '24/7 telemetry & feature scaling' }
            ].map((p, idx) => (
              <div key={idx} className="sp-process-step-item">
                <div className="sp-step-circle">{p.step}</div>
                <h5 className="sp-step-name">{p.title}</h5>
                <p className="sp-step-brief">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Section: Technologies We Work With */}
      <section className="sp-tech-section">
        <div className="container">
          <div className="section-header text-center">
            <span className="section-tag">GLOBAL TECH STACK</span>
            <h2 className="section-title">
              Technologies We Work <span className="serif-italic gradient-coral-text">With.</span>
            </h2>
            <p className="section-subtitle mx-auto">
              We leverage modern, industry-standard languages, frameworks, and cloud systems to guarantee reliability and long-term maintainability.
            </p>
          </div>

          {/* Interactive Technology Tabs */}
          <div className="sp-tech-tabs-bar">
            {technologiesData.map((t) => (
              <button
                key={t.category}
                className={`sp-tech-tab-btn ${activeTechTab === t.category ? 'is-active' : ''}`}
                onClick={() => setActiveTechTab(t.category)}
              >
                {t.category}
              </button>
            ))}
          </div>

          {/* Technology Cards Grid */}
          <div className="sp-tech-cards-grid">
            {technologiesData
              .find((t) => t.category === activeTechTab)
              ?.techs.map((tech, idx) => (
                <div key={idx} className="sp-tech-card">
                  <div className="sp-tech-logo-box">
                    <OfficialTechLogo name={tech.name} size={26} />
                  </div>
                  <div className="sp-tech-info">
                    <span className="sp-tech-name">{tech.name}</span>
                    <span className="sp-tech-role">{tech.role}</span>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </section>

      {/* 6. Section: Industries We Serve */}
      <section className="sp-industries-section">
        <div className="container">
          <div className="section-header text-center">
            <span className="section-tag">INDUSTRY DOMAIN EXPERTISE</span>
            <h2 className="section-title">
              Specialized Solutions for <span className="serif-italic gradient-coral-text">High-Impact Sectors.</span>
            </h2>
            <p className="section-subtitle mx-auto">
              Our engineering solutions are customized to address the unique compliance, operational, and speed requirements of each vertical.
            </p>
          </div>

          <div className="sp-industries-grid">
            {industriesData.map((ind) => (
              <div key={ind.id} className="sp-industry-card">
                <div className="sp-industry-header">
                  <div className="sp-industry-icon">
                    <CategoryIcon name={ind.icon} size={22} />
                  </div>
                  <h4>{ind.name}</h4>
                </div>
                <p>{ind.desc}</p>
                <Link to={`/contact?industry=${ind.id}`} className="sp-industry-link">
                  <span>Explore vertical solutions</span>
                  <ArrowRight size={14} />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Interactive Service Detail Modal / Drawer */}
      {selectedSubService && (
        <ServiceDetailModal
          service={selectedSubService}
          category={activeCategory}
          onClose={handleModalClose}
        />
      )}
    </div>
  );
}
