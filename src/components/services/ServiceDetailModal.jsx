import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { X, CheckCircle, ArrowRight, ShieldCheck, Zap, Sparkles, Layers, Clock } from 'lucide-react';
import './ServiceDetailModal.css';

export default function ServiceDetailModal({ service, category, onClose }) {
  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  if (!service) return null;

  return (
    <div className="sd-modal-backdrop" onClick={onClose} role="dialog" aria-modal="true" aria-labelledby="modal-service-title">
      <div className="sd-modal-dialog" onClick={(e) => e.stopPropagation()}>
        {/* Header Bar */}
        <div className="sd-modal-header">
          <div className="sd-modal-badges">
            <span className="sd-cat-badge">{category?.name || 'Digital IT Solutions'}</span>
            <span className="sd-live-badge">
              <span className="sd-pulse-dot" /> Available for New Projects
            </span>
          </div>
          <button className="sd-close-btn" onClick={onClose} aria-label="Close modal">
            <X size={20} />
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="sd-modal-body">
          {/* Main Title & Subtitle */}
          <div className="sd-hero">
            <h2 id="modal-service-title" className="sd-title">{service.title}</h2>
            <p className="sd-lead">{service.shortDesc}</p>
            <div className="sd-tech-tags">
              <span className="sd-tech-label">Primary Stack:</span>
              {service.tech.split(',').map((t, idx) => (
                <span key={idx} className="sd-tag">{t.trim()}</span>
              ))}
            </div>
          </div>

          {/* Section 1: Comprehensive Scope */}
          <div className="sd-section">
            <h3 className="sd-section-heading">
              <Sparkles size={18} className="sd-icon-accent" />
              What We Deliver
            </h3>
            <p className="sd-text">
              We design, architect, and deploy production-grade {service.title.toLowerCase()} tailored to your precise operational specifications. We guarantee seamless integration, high security standards, and comprehensive post-launch documentation.
            </p>
            <div className="sd-deliverables-grid">
              <div className="sd-deliverable-item">
                <CheckCircle size={18} className="sd-check" />
                <div>
                  <strong>Architectural Blueprint:</strong> Enterprise-grade schema, API contracts, and security models.
                </div>
              </div>
              <div className="sd-deliverable-item">
                <CheckCircle size={18} className="sd-check" />
                <div>
                  <strong>Clean Maintainable Code:</strong> Modular, thoroughly commented code adhering to strict linting.
                </div>
              </div>
              <div className="sd-deliverable-item">
                <CheckCircle size={18} className="sd-check" />
                <div>
                  <strong>Automated Testing:</strong> Unit tests and integration workflows for zero production regressions.
                </div>
              </div>
              <div className="sd-deliverable-item">
                <CheckCircle size={18} className="sd-check" />
                <div>
                  <strong>100% IP Ownership:</strong> Complete source code and repository access handed over to your team.
                </div>
              </div>
            </div>
          </div>

          {/* Section 2: Key Business Benefits */}
          <div className="sd-section">
            <h3 className="sd-section-heading">
              <Zap size={18} className="sd-icon-accent" />
              Tangible Business Benefits
            </h3>
            <div className="sd-benefits-row">
              <div className="sd-benefit-card">
                <div className="sd-benefit-stat">99.9%</div>
                <div className="sd-benefit-title">Operational Uptime</div>
                <p>Engineered on resilient cloud native foundations with zero-downtime deployment pipelines.</p>
              </div>
              <div className="sd-benefit-card">
                <div className="sd-benefit-stat">3-5x</div>
                <div className="sd-benefit-title">Speed to Market</div>
                <p>Pre-built modular design components and agile two-week sprints accelerate your timeline.</p>
              </div>
              <div className="sd-benefit-card">
                <div className="sd-benefit-stat">100%</div>
                <div className="sd-benefit-title">Scalability Ready</div>
                <p>Built from Day 1 to comfortably handle surges from 1,000 to 1,000,000+ active users.</p>
              </div>
            </div>
          </div>

          {/* Section 3: 4-Stage Development Process */}
          <div className="sd-section">
            <h3 className="sd-section-heading">
              <Layers size={18} className="sd-icon-accent" />
              Our Execution Roadmap
            </h3>
            <div className="sd-process-steps">
              <div className="sd-step">
                <div className="sd-step-num">01</div>
                <div className="sd-step-info">
                  <strong>Deep Discovery & Scope</strong>
                  <p>Requirements gathering, tech feasibility, and KPI definition.</p>
                </div>
              </div>
              <div className="sd-step">
                <div className="sd-step-num">02</div>
                <div className="sd-step-info">
                  <strong>Architecture & Prototyping</strong>
                  <p>Figma UI/UX systems and database schemas approved by you.</p>
                </div>
              </div>
              <div className="sd-step">
                <div className="sd-step-num">03</div>
                <div className="sd-step-info">
                  <strong>Agile Sprint Engineering</strong>
                  <p>Bi-weekly live staging demos with continuous team feedback.</p>
                </div>
              </div>
              <div className="sd-step">
                <div className="sd-step-num">04</div>
                <div className="sd-step-info">
                  <strong>QA, Security & Launch</strong>
                  <p>Stress testing, security audit, DNS migration, and monitoring.</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Modal Sticky Bottom CTA */}
        <div className="sd-modal-footer">
          <div className="sd-footer-info">
            <Clock size={16} />
            <span>Average turnaround: <strong>3 to 6 weeks</strong> &bull; Direct Senior Engineer Support</span>
          </div>
          <div className="sd-footer-actions">
            <button className="btn btn-glass" onClick={onClose}>
              Close
            </button>
            <Link
              to={`/contact?service=${service.id}`}
              className="btn btn-primary sd-cta-btn"
              onClick={onClose}
            >
              <span>Discuss {service.title}</span>
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

