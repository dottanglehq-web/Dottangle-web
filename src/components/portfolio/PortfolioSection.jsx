import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ExternalLink, ArrowRight, Sparkles, Layers, Globe } from 'lucide-react';
import { PORTFOLIO_PROJECTS, PORTFOLIO_CATEGORIES, filterPortfolioProjects } from '../../data/portfolioData';
import './PortfolioSection.css';

export default function PortfolioSection({ limit = 0, showHeader = true, title, subtitle }) {
  const [activeCategory, setActiveCategory] = useState('All Projects');

  const filteredProjects = filterPortfolioProjects(activeCategory);
  const displayProjects = limit > 0 ? filteredProjects.slice(0, limit) : filteredProjects;

  return (
    <section className="portfolio-section" id="portfolio-showcase" aria-label="Portfolio Showcase">
      <div className="container">
        {showHeader && (
          <div className="portfolio-header">
            <div className="portfolio-badge">
              <Sparkles size={14} className="portfolio-badge-icon" />
              <span>Verified Client Work</span>
            </div>
            <h2 className="portfolio-title">
              {title || (
                <>
                  Our Work Speaks for <span className="gradient-coral-text serif-italic">Itself.</span>
                </>
              )}
            </h2>
            <p className="portfolio-subtitle">
              {subtitle || 'Explore the websites and digital experiences we\'ve built for businesses across different industries.'}
            </p>
          </div>
        )}

        {/* Dynamic Category Filter Pills */}
        <div className="portfolio-filters" role="tablist" aria-label="Portfolio categories">
          {PORTFOLIO_CATEGORIES.map((cat) => (
            <button
              key={cat}
              type="button"
              role="tab"
              aria-selected={activeCategory === cat}
              className={`portfolio-filter-btn ${activeCategory === cat ? 'active' : ''}`}
              onClick={() => setActiveCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* 3-Column Responsive Grid */}
        <div className="portfolio-grid">
          {displayProjects.map((project) => (
            <article
              key={project.id}
              className={`portfolio-card ${project.isTopFeatured ? 'portfolio-card-featured' : ''}`}
              id={`project-${project.id}`}
            >
              {/* Card Media Header */}
              <div className="portfolio-card-media">
                <Link to={`/portfolio/${project.slug}`} className="portfolio-img-link" title={`View ${project.title} Case Study`}>
                  <img
                    src={project.screenshot}
                    alt={`${project.title} Live Website Screenshot`}
                    className="portfolio-screenshot"
                    loading="lazy"
                    width="600"
                    height="375"
                  />
                  <div className="portfolio-card-overlay">
                    <span className="portfolio-overlay-btn">
                      <span>Explore Case Study</span>
                      <ArrowRight size={15} />
                    </span>
                  </div>
                </Link>

                {/* Top Featured Ribbon */}
                {project.isTopFeatured && (
                  <div className="portfolio-featured-ribbon">
                    <Sparkles size={12} className="portfolio-featured-sparkle" />
                    <span>FEATURED PROJECT</span>
                  </div>
                )}

                {/* Floating Brand Badge */}
                <div className="portfolio-brand-badge" title={project.title}>
                  <img
                    src={project.logo}
                    alt={`${project.title} Official Logo`}
                    className="portfolio-brand-logo"
                    loading="lazy"
                  />
                </div>
              </div>

              {/* Card Content */}
              <div className="portfolio-card-body">
                <div className="portfolio-meta-row">
                  <span className="portfolio-category-tag">{project.category}</span>
                  <span className="portfolio-location-tag">{project.location}</span>
                </div>

                <h3 className="portfolio-card-title">
                  <Link to={`/portfolio/${project.slug}`}>{project.title}</Link>
                </h3>

                <p className="portfolio-card-desc">{project.shortDescription}</p>

                {/* Verified Tech Badges */}
                <div className="portfolio-tech-list">
                  {project.technologies.slice(0, 3).map((tech) => (
                    <span key={tech} className="portfolio-tech-pill">
                      {tech}
                    </span>
                  ))}
                  {project.technologies.length > 3 && (
                    <span className="portfolio-tech-pill more">
                      +{project.technologies.length - 3}
                    </span>
                  )}
                </div>

                {/* Action CTA Buttons */}
                <div className="portfolio-card-actions">
                  <a
                    href={project.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-portfolio-live"
                    aria-label={`Open live website for ${project.title} in new tab`}
                  >
                    <span>View Live Website</span>
                    <ExternalLink size={14} />
                  </a>

                  <Link
                    to={`/portfolio/${project.slug}`}
                    className="btn-portfolio-details"
                    aria-label={`Read full project details for ${project.title}`}
                  >
                    <span>View Project Details</span>
                    <ArrowRight size={14} />
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Global Consultation Callout */}
        <div className="portfolio-footer-cta">
          <div className="portfolio-cta-box">
            <div className="portfolio-cta-content">
              <h3>Have a Project in Mind?</h3>
              <p>Let's build a fast, high-converting digital platform tailored to your business goals.</p>
            </div>
            <div className="portfolio-cta-actions">
              <Link to="/contact" className="btn btn-primary">
                <span>Start Your Project</span>
                <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

