import React, { useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ExternalLink, ArrowRight, ArrowLeft, CheckCircle2, Globe, Sparkles, Building, Layers, ShieldCheck, ChevronRight } from 'lucide-react';
import { getPortfolioProject, PORTFOLIO_PROJECTS } from '../data/portfolioData';
import './PortfolioDetailPage.css';

export default function PortfolioDetailPage() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const project = getPortfolioProject(slug);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
    if (project) {
      document.title = `${project.title} — Portfolio & Case Study | Dottangel`;
    }
  }, [slug, project]);

  if (!project) {
    return (
      <main className="portfolio-detail-page not-found">
        <div className="container" style={{ padding: '120px 24px', textAlign: 'center' }}>
          <h2>Project Not Found</h2>
          <p>The requested portfolio project could not be located.</p>
          <Link to="/" className="btn btn-primary" style={{ marginTop: '20px' }}>
            <ArrowLeft size={16} /> Return to Homepage
          </Link>
        </div>
      </main>
    );
  }

  // Related projects (excluding current)
  const relatedProjects = PORTFOLIO_PROJECTS.filter(p => p.id !== project.id).slice(0, 3);

  return (
    <main className="portfolio-detail-page">
      {/* Breadcrumb Navigation */}
      <nav className="portfolio-breadcrumb-wrap" aria-label="Breadcrumb">
        <div className="container">
          <ol className="portfolio-breadcrumb">
            <li><Link to="/">Home</Link></li>
            <li><ChevronRight size={14} /></li>
            <li><a href="/#portfolio-showcase">Portfolio</a></li>
            <li><ChevronRight size={14} /></li>
            <li className="active" aria-current="page">{project.title}</li>
          </ol>
        </div>
      </nav>

      {/* Project Hero Header */}
      <header className="pdetail-hero">
        <div className="container">
          <div className="pdetail-hero-grid">
            <div className="pdetail-hero-content">
              <div className="pdetail-meta-pill">
                <span className="pdetail-category">{project.category}</span>
                <span className="pdetail-sep">•</span>
                <span className="pdetail-location">{project.location}</span>
              </div>

              <h1 className="pdetail-title">{project.title}</h1>
              <p className="pdetail-tagline">{project.tagline}</p>
              <p className="pdetail-desc">{project.overview}</p>

              <div className="pdetail-hero-actions">
                <a
                  href={project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-primary btn-pdetail-live"
                >
                  <span>Visit Live Website</span>
                  <ExternalLink size={16} />
                </a>

                <Link to="/contact" className="btn btn-glass">
                  <span>Start Similar Project</span>
                  <ArrowRight size={16} />
                </Link>
              </div>

              {/* Quick Spec Matrix */}
              <div className="pdetail-specs-grid">
                <div className="pdetail-spec-item">
                  <span className="spec-label">Client / Brand</span>
                  <span className="spec-val">{project.clientName}</span>
                </div>
                <div className="pdetail-spec-item">
                  <span className="spec-label">Industry</span>
                  <span className="spec-val">{project.industry}</span>
                </div>
                <div className="pdetail-spec-item">
                  <span className="spec-label">Scope</span>
                  <span className="spec-val">Design, Engineering & Launch</span>
                </div>
              </div>
            </div>

            {/* Brand Logo & Hero Screenshot Visual */}
            <div className="pdetail-hero-visual">
              <div className="pdetail-mockup-frame">
                <div className="mockup-header-bar">
                  <span className="mockup-dot red"></span>
                  <span className="mockup-dot yellow"></span>
                  <span className="mockup-dot green"></span>
                  <span className="mockup-url-pill">
                    <Globe size={12} /> {project.url}
                  </span>
                </div>
                <img
                  src={project.screenshot}
                  alt={`${project.title} Live Storefront Screenshot`}
                  className="pdetail-main-screenshot"
                  loading="eager"
                  width="1200"
                  height="750"
                />
              </div>

              {/* Verified Brand Identity Emblem */}
              <div className="pdetail-brand-badge-float">
                <img
                  src={project.logo}
                  alt={`${project.title} Authentic Brand Logo`}
                  className="pdetail-brand-img"
                />
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content Deep-Dive */}
      <section className="pdetail-body-section">
        <div className="container">
          <div className="pdetail-two-col">
            {/* Left Column: Objectives & Features */}
            <div className="pdetail-main-col">
              {/* Objectives */}
              <div className="pdetail-card-block">
                <div className="block-header">
                  <Sparkles size={20} className="block-icon" />
                  <h2>Project Objectives & Goals</h2>
                </div>
                <ul className="pdetail-checklist">
                  {project.objectives.map((obj, i) => (
                    <li key={i}>
                      <CheckCircle2 size={18} className="check-icon" />
                      <span>{obj}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Website Features & Systems */}
              <div className="pdetail-card-block">
                <div className="block-header">
                  <Layers size={20} className="block-icon" />
                  <h2>Key Website Features & Capabilities</h2>
                </div>
                <div className="pdetail-features-grid">
                  {project.features.map((feat, i) => (
                    <div key={i} className="pdetail-feat-card">
                      <div className="feat-number">0{i + 1}</div>
                      <p>{feat}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Design & UX Highlights */}
              <div className="pdetail-card-block">
                <div className="block-header">
                  <Building size={20} className="block-icon" />
                  <h2>Design Highlights & Aesthetic Direction</h2>
                </div>
                <div className="pdetail-design-box">
                  {project.designHighlights.map((hl, i) => (
                    <div key={i} className="design-bullet">
                      <span className="design-bullet-dot"></span>
                      <span>{hl}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column: Verified Tech Stack & Client Card */}
            <aside className="pdetail-side-col">
              <div className="pdetail-side-card">
                <h3>Verified Technologies</h3>
                <p className="side-card-intro">Production frameworks, libraries and services powering this website:</p>
                <div className="pdetail-tech-cloud">
                  {project.technologies.map(t => (
                    <span key={t} className="tech-badge">{t}</span>
                  ))}
                </div>
              </div>

              {project.metrics && project.metrics.length > 0 && (
                <div className="pdetail-side-card metrics-card">
                  <h3>Project Highlights</h3>
                  <div className="pdetail-metrics-list">
                    {project.metrics.map((m, i) => (
                      <div key={i} className="metric-row">
                        <span className="metric-num">{m.value}</span>
                        <span className="metric-lbl">{m.label}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="pdetail-side-card cta-side-card">
                <h3>Need a Website Like This?</h3>
                <p>We craft high-performance digital experiences tailored to your commercial requirements.</p>
                <Link to="/contact" className="btn btn-primary" style={{ width: '100%', justifyContent: 'center' }}>
                  <span>Request Free Consultation</span>
                  <ArrowRight size={15} />
                </Link>
                <a
                  href={project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="side-live-link"
                >
                  Open {project.title} in new tab ↗
                </a>
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* Related Projects Section */}
      <section className="pdetail-related-section">
        <div className="container">
          <div className="related-header">
            <h2>Explore More Selected Works</h2>
            <Link to="/#portfolio-showcase" className="related-all-link">
              <span>View All Projects</span>
              <ArrowRight size={16} />
            </Link>
          </div>

          <div className="related-grid">
            {relatedProjects.map(rel => (
              <article key={rel.id} className="related-card">
                <Link to={`/portfolio/${rel.slug}`} className="related-img-wrap">
                  <img src={rel.screenshot} alt={rel.title} loading="lazy" />
                </Link>
                <div className="related-body">
                  <span className="related-cat">{rel.category}</span>
                  <h4><Link to={`/portfolio/${rel.slug}`}>{rel.title}</Link></h4>
                  <p>{rel.tagline}</p>
                  <Link to={`/portfolio/${rel.slug}`} className="related-btn">
                    <span>View Project</span>
                    <ArrowRight size={14} />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Final Conversion Banner */}
      <section className="pdetail-final-cta">
        <div className="container">
          <div className="pdetail-cta-banner">
            <h2>Ready to Elevate Your Digital Presence?</h2>
            <p>From custom web platforms and eCommerce systems to legal compliance and growth marketing, Dottangel is your complete business growth partner.</p>
            <div className="banner-actions">
              <Link to="/contact" className="btn btn-primary">
                <span>Start Your Project</span>
                <ArrowRight size={16} />
              </Link>
              <Link to="/services" className="btn btn-glass">
                <span>Explore All Services</span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

