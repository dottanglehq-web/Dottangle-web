import React, { useRef, useState } from 'react';
import useViewportActivity from '../hooks/useViewportActivity';
import { Link } from 'react-router-dom';
import './CodeBrewHero.css';

/**
 * Modern High-Impact Hero Section inspired by Code Brew Labs (https://www.code-brew.com/)
 * 
 * Features:
 * - Architectural 6-column vertical grid line backdrop
 * - Giant display brand typography banner ("Dottangle" or "Code Brew Labs")
 * - Floating interactive team role badges & embedded letter avatars
 * - 2-Column Split: High-impact H1 headline on left, checklist + CTAs on right
 * - Signature vibrant lime (#B4FD83) primary CTA with continuous sweeping shine
 * - Secondary action button with subtle micro-interactions
 * - Social proof stats and enterprise industry recognition badges
 */
export default function CodeBrewHero({
  brandName = "Dottangle",
  headline = "AI-Driven Digital Transformation Company",
  subheadline = "We empower businesses to Innovate, Optimize, and Scale.",
  primaryCtaText = "Build Your Success Story",
  primaryCtaLink = "/contact",
  secondaryCtaText = "Explore Live Demos",
  secondaryCtaLink = "/work"
}) {
  const sectionRef = useRef(null);
  const active = useViewportActivity(sectionRef);
  const [activeTooltip, setActiveTooltip] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);

  React.useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 40);
    return () => clearTimeout(timer);
  }, []);

  // Team roles with avatars & specializations (matches Code Brew's floating indicators)
  const roleBadges = [
    {
      id: 'strategist',
      role: 'Strategist',
      positionClass: 'cb-role-strategist',
      arrowClass: 'cb-arrow-down',
      avatarClass: 'cb-avatar-c',
      avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80',
      tooltip: 'GTM Strategy & Product ROI'
    },
    {
      id: 'manager',
      role: 'Manager',
      positionClass: 'cb-role-manager',
      arrowClass: 'cb-arrow-down',
      avatarClass: 'cb-avatar-d',
      avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&q=80',
      tooltip: 'Agile Delivery & 99.4% On-Time Sprints'
    },
    {
      id: 'designer',
      role: 'Designer',
      positionClass: 'cb-role-designer',
      arrowClass: 'cb-arrow-up',
      avatarClass: 'cb-avatar-b',
      avatarUrl: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=120&q=80',
      tooltip: 'Award-Winning UI/UX & Design Systems'
    },
    {
      id: 'developer',
      role: 'Developer',
      positionClass: 'cb-role-developer',
      arrowClass: 'cb-arrow-down',
      avatarClass: 'cb-avatar-e',
      avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=120&q=80',
      tooltip: 'Full-Stack, Next-Gen Mobile & AI Cloud'
    },
    {
      id: 'marketer',
      role: 'Marketer',
      positionClass: 'cb-role-marketer',
      arrowClass: 'cb-arrow-up',
      avatarClass: 'cb-avatar-l',
      avatarUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=120&q=80',
      tooltip: 'Performance Marketing & SEO Dominance'
    },
    {
      id: 'investor',
      role: 'Investor / AI',
      positionClass: 'cb-role-investor',
      arrowClass: 'cb-arrow-down',
      avatarClass: 'cb-avatar-a',
      avatarUrl: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=120&q=80',
      tooltip: 'Venture Scale & Intelligent Automation'
    }
  ];

  return (
    <section ref={sectionRef} data-active={active} className={`cb-hero-section ${isLoaded ? 'cb-hero-animated' : ''}`} id="hero">
      {/* Daylight Ambient Pastel Floating Orbs */}
      <div className="cb-ambient-pastel-backdrop" aria-hidden="true">
        <div className="cb-pastel-orb cb-orb-peach" />
        <div className="cb-pastel-orb cb-orb-lavender" />
        <div className="cb-pastel-orb cb-orb-mint" />
      </div>

      {/* Signature Code Brew 6-Column Vertical Grid Lines Backdrop */}
      <div className="cb-grid-backdrop" aria-hidden="true">
        <div className="cb-grid-line" />
        <div className="cb-grid-line" />
        <div className="cb-grid-line" />
        <div className="cb-grid-line" />
        <div className="cb-grid-line" />
        <div className="cb-grid-line" />
      </div>

      <div className="cb-hero-container">
        {/* ====================================================================
            1. Giant Brand Typography Banner with Floating Indicators & Avatars
            ==================================================================== */}
        <div className="cb-banner-wrapper">
          <div className="cb-giant-title" aria-label={brandName}>
            {/* Split brand into individual words/spans for natural typography flow */}
            {brandName === "Code Brew Labs" ? (
              <>
                <span className="cb-brand-word">
                  <span className="cb-char-box">
                    C
                    <img
                      src={roleBadges[0].avatarUrl}
                      alt="Strategist"
                      className={`cb-letter-avatar ${roleBadges[0].avatarClass}`}
                    />
                    <div
                      className={`cb-role-tag ${roleBadges[0].positionClass}`}
                      onMouseEnter={() => setActiveTooltip(roleBadges[0].id)}
                      onMouseLeave={() => setActiveTooltip(null)}
                      title={roleBadges[0].tooltip}
                    >
                      <span className="cb-role-pill">{roleBadges[0].role}</span>
                      <span className={`cb-role-arrow ${roleBadges[0].arrowClass}`} />
                    </div>
                  </span>
                  ode
                </span>

                <span className="cb-brand-word">
                  <span className="cb-char-box">
                    B
                    <img
                      src={roleBadges[2].avatarUrl}
                      alt="Designer"
                      className={`cb-letter-avatar ${roleBadges[2].avatarClass}`}
                    />
                    <div
                      className={`cb-role-tag ${roleBadges[2].positionClass}`}
                      onMouseEnter={() => setActiveTooltip(roleBadges[2].id)}
                      onMouseLeave={() => setActiveTooltip(null)}
                      title={roleBadges[2].tooltip}
                    >
                      <span className={`cb-role-arrow ${roleBadges[2].arrowClass}`} />
                      <span className="cb-role-pill">{roleBadges[2].role}</span>
                    </div>
                  </span>
                  r
                  <span className="cb-char-box">
                    e
                    <img
                      src={roleBadges[3].avatarUrl}
                      alt="Developer"
                      className={`cb-letter-avatar ${roleBadges[3].avatarClass}`}
                    />
                    <div
                      className={`cb-role-tag ${roleBadges[3].positionClass}`}
                      onMouseEnter={() => setActiveTooltip(roleBadges[3].id)}
                      onMouseLeave={() => setActiveTooltip(null)}
                      title={roleBadges[3].tooltip}
                    >
                      <span className="cb-role-pill">{roleBadges[3].role}</span>
                      <span className={`cb-role-arrow ${roleBadges[3].arrowClass}`} />
                    </div>
                  </span>
                  w
                </span>

                <span className="cb-brand-word">
                  <span className="cb-char-box">
                    L
                    <img
                      src={roleBadges[4].avatarUrl}
                      alt="Marketer"
                      className={`cb-letter-avatar ${roleBadges[4].avatarClass}`}
                    />
                    <div
                      className={`cb-role-tag ${roleBadges[4].positionClass}`}
                      onMouseEnter={() => setActiveTooltip(roleBadges[4].id)}
                      onMouseLeave={() => setActiveTooltip(null)}
                      title={roleBadges[4].tooltip}
                    >
                      <span className={`cb-role-arrow ${roleBadges[4].arrowClass}`} />
                      <span className="cb-role-pill">{roleBadges[4].role}</span>
                    </div>
                  </span>
                  <span className="cb-char-box">
                    a
                    <img
                      src={roleBadges[5].avatarUrl}
                      alt="Investor"
                      className={`cb-letter-avatar ${roleBadges[5].avatarClass}`}
                    />
                    <div
                      className={`cb-role-tag ${roleBadges[5].positionClass}`}
                      onMouseEnter={() => setActiveTooltip(roleBadges[5].id)}
                      onMouseLeave={() => setActiveTooltip(null)}
                      title={roleBadges[5].tooltip}
                    >
                      <span className="cb-role-pill">{roleBadges[5].role}</span>
                      <span className={`cb-role-arrow ${roleBadges[5].arrowClass}`} />
                    </div>
                  </span>
                  bs
                </span>
              </>
            ) : (
              /* Dottangle / Custom Brand Display */
              <>
                <span className="cb-brand-word">
                  <span className="cb-char-box">
                    D
                    <img
                      src={roleBadges[0].avatarUrl}
                      alt="Strategist"
                      className="cb-letter-avatar cb-avatar-c"
                    />
                    <div className="cb-role-tag cb-role-strategist" title={roleBadges[0].tooltip}>
                      <span className="cb-role-arrow cb-arrow-up" />
                      <span className="cb-role-pill">Strategist</span>
                    </div>
                  </span>
                  <span className="cb-char-box cb-logo-o" aria-label="o">
                    <span className="cb-sr-only">o</span>
                  </span>
                  t
                  <span className="cb-char-box">
                    t
                    <img
                      src={roleBadges[2].avatarUrl}
                      alt="Designer"
                      className="cb-letter-avatar cb-avatar-b"
                    />
                    <div className="cb-role-tag cb-role-designer" title={roleBadges[2].tooltip}>
                      <span className="cb-role-arrow cb-arrow-up" />
                      <span className="cb-role-pill">Designer</span>
                    </div>
                  </span>
                  <span className="cb-char-box">
                    a
                    <img
                      src={roleBadges[3].avatarUrl}
                      alt="Developer"
                      className="cb-letter-avatar cb-avatar-e"
                    />
                    <div className="cb-role-tag cb-role-developer" title={roleBadges[3].tooltip}>
                      <span className="cb-role-pill">Developer</span>
                      <span className="cb-role-arrow cb-arrow-down" />
                    </div>
                  </span>
                  <span className="cb-char-box">
                    n
                    <img
                      src={roleBadges[1].avatarUrl}
                      alt="Manager"
                      className="cb-letter-avatar cb-avatar-d"
                    />
                    <div className="cb-role-tag cb-role-manager" title={roleBadges[1].tooltip}>
                      <span className="cb-role-pill">Manager</span>
                      <span className="cb-role-arrow cb-arrow-down" />
                    </div>
                  </span>
                  <span className="cb-char-box">
                    g
                    <img
                      src={roleBadges[4].avatarUrl}
                      alt="Marketer"
                      className="cb-letter-avatar cb-avatar-l"
                    />
                    <div className="cb-role-tag cb-role-marketer" title={roleBadges[4].tooltip}>
                      <span className="cb-role-arrow cb-arrow-up" />
                      <span className="cb-role-pill">Marketer</span>
                    </div>
                  </span>
                  l
                  <span className="cb-char-box">
                    e
                    <img
                      src={roleBadges[5].avatarUrl}
                      alt="AI Specialist"
                      className="cb-letter-avatar cb-avatar-a"
                    />
                    <div className="cb-role-tag cb-role-investor" title={roleBadges[5].tooltip}>
                      <span className="cb-role-pill">AI Specialist</span>
                      <span className="cb-role-arrow cb-arrow-down" />
                    </div>
                  </span>
                </span>
              </>
            )}
          </div>
        </div>

        {/* ====================================================================
            2. Core 2-Column Split: Punchy H1 (Left) + Value & CTAs (Right)
            ==================================================================== */}
        <div className="cb-hero-split">
          {/* Left Column: Bold Headline & Indicators */}
          <div className="cb-hero-left">
            <div className="cb-badge-indicator">
              <span className="cb-pulse-dot" />
              <span>AI-Driven Capabilities · 2026</span>
            </div>

            <h1 className="cb-hero-heading">
              AI-Driven Digital <br />
              <span className="cb-highlight-gradient">Transformation</span> <br />
              Company
            </h1>

          </div>

          {/* Right Column: Value Narrative, Checklist, and High-Converting CTAs */}
          <div className="cb-hero-right">
            <p className="cb-hero-subhead">
              We empower businesses to{' '}
              <span className="cb-subhead-highlight">Innovate</span>,{' '}
              <span className="cb-subhead-highlight">Optimize</span>, and{' '}
              <span className="cb-subhead-highlight">Scale</span>.
            </p>

            {/* Core Capability Checklist with Circular Checkmarks */}
            <ul className="cb-check-list">
              <li className="cb-check-item">
                <span className="cb-check-icon-circle">
                  <svg viewBox="0 0 24 24" fill="none">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </span>
                <span>
                  Custom app & web development with <strong>advanced AI capabilities</strong>.
                </span>
              </li>

              <li className="cb-check-item">
                <span className="cb-check-icon-circle">
                  <svg viewBox="0 0 24 24" fill="none">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </span>
                <span>
                  Generative AI solutions <strong>fueling business innovation & automation</strong>.
                </span>
              </li>

              <li className="cb-check-item">
                <span className="cb-check-icon-circle">
                  <svg viewBox="0 0 24 24" fill="none">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </span>
                <span>
                  Top-tier enterprise data encryption with <strong>modern cloud architecture</strong>.
                </span>
              </li>
            </ul>

            {/* High-Visibility Dual CTA Group */}
            <div className="cb-cta-bar">
              {/* Primary High-Impact Solid CTA Button */}
              <Link to={primaryCtaLink} className="cb-btn-primary" id="cbHeroPrimaryBtn">
                <span className="cb-btn-text">{primaryCtaText}</span>
                <span className="cb-btn-arrow-box" aria-hidden="true">
                  <svg viewBox="0 0 16 16" fill="none">
                    <line x1="3" y1="8" x2="13" y2="8" />
                    <polyline points="9 4 13 8 9 12" />
                  </svg>
                </span>
              </Link>

              {/* Secondary Clean Action Button */}
              <Link to={secondaryCtaLink} className="cb-btn-secondary" id="cbHeroSecondaryBtn">
                <span>{secondaryCtaText}</span>
                <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="4" y1="12" x2="12" y2="4" />
                  <polyline points="5 4 12 4 12 11" />
                </svg>
              </Link>
            </div>

            {/* Social Proof Rating Strip */}
            <div className="cb-rating-strip">
              <div className="cb-avatar-stack">
                <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=64&q=80" alt="Client" className="cb-stack-img" />
                <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=64&q=80" alt="Client" className="cb-stack-img" />
                <img src="https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=64&q=80" alt="Client" className="cb-stack-img" />
                <img src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=64&q=80" alt="Client" className="cb-stack-img" />
              </div>
              <div className="cb-rating-copy">
                <strong>4.9 / 5.0 Rating</strong> on Clutch & G2 from <strong>350+ enterprises</strong>.
              </div>
            </div>
          </div>
        </div>

        {/* ====================================================================
            3. Industry Recognition & Authority Badges (Bottom of Hero)
            ==================================================================== */}
        <div className="cb-trust-bar">
          <span className="cb-trust-label">Industry Accreditations</span>
          <div className="cb-badges-flex">
            <div className="cb-badge-card">
              <span className="cb-badge-card-stars">★★★★★</span>
              <div>
                <span className="cb-badge-title">Clutch Global Leader</span>
                <span className="cb-badge-sub">Top B2B Agency 2026</span>
              </div>
            </div>

            <div className="cb-badge-card">
              <span className="cb-badge-card-stars">★★★★★</span>
              <div>
                <span className="cb-badge-title">GoodFirms Top AI</span>
                <span className="cb-badge-sub">Top Development Company</span>
              </div>
            </div>

            <div className="cb-badge-card">
              <span className="cb-badge-card-stars">★★★★★</span>
              <div>
                <span className="cb-badge-title">MobileAppDaily</span>
                <span className="cb-badge-sub">Fastest-Growing Agency</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
