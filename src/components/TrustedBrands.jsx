import React from 'react';

/**
 * Client Brands — authentic logos from verified client work & institutions.
 * Staggered across two rows so circular emblems and wide wordmarks balance each other.
 */
const CLIENT_BRANDS_ROW_1 = [
  {
    id: 'ct-university',
    name: 'CT University',
    src: '/brands/ct-university-horizontal.png',
    className: 'tb-logo-ct-univ',
  },
  {
    id: 'apex-vouchers',
    name: 'Apex Vouchers',
    src: '/brands/apex-vouchers-wordmark.png',
    className: 'tb-logo-apex',
  },
  {
    id: 'g3b-education',
    name: 'G3B Education',
    src: '/brands/g3b-logo.png',
    className: 'tb-logo-g3b',
  },
  {
    id: 'toscaninis',
    name: 'Toscaninis',
    src: '/brands/toscaninis.png',
    className: 'tb-logo-toscaninis',
  },
  {
    id: 'janetrade',
    name: 'JaneTrade',
    src: '/brands/janetrade-wordmark.png',
    className: 'tb-logo-janetrade',
  },
  {
    id: 'techverse',
    name: 'TechVerse Club',
    src: '/brands/techverse.png',
    className: 'tb-logo-techverse',
  },
];

const CLIENT_BRANDS_ROW_2 = [
  {
    id: 'janetrade-r2',
    name: 'JaneTrade',
    src: '/brands/janetrade-wordmark.png',
    className: 'tb-logo-janetrade',
  },
  {
    id: 'techverse-r2',
    name: 'TechVerse Club',
    src: '/brands/techverse.png',
    className: 'tb-logo-techverse',
  },
  {
    id: 'ct-university-r2',
    name: 'CT University',
    src: '/brands/ct-university-horizontal.png',
    className: 'tb-logo-ct-univ',
  },
  {
    id: 'toscaninis-r2',
    name: 'Toscaninis',
    src: '/brands/toscaninis.png',
    className: 'tb-logo-toscaninis',
  },
  {
    id: 'apex-vouchers-r2',
    name: 'Apex Vouchers',
    src: '/brands/apex-vouchers-wordmark.png',
    className: 'tb-logo-apex',
  },
  {
    id: 'g3b-education-r2',
    name: 'G3B Education',
    src: '/brands/g3b-logo.png',
    className: 'tb-logo-g3b',
  },
];

/**
 * Freelancing Platforms — Official verified platform brand assets
 */
const FREELANCE_PLATFORMS = [
  {
    id: 'upwork',
    name: 'Upwork',
    src: '/brands/upwork.svg',
    url: 'https://www.upwork.com/',
  },
  {
    id: 'fiverr',
    name: 'Fiverr',
    src: '/brands/fiverr.svg',
    url: 'https://www.fiverr.com/',
  },
  {
    id: 'freelancer',
    name: 'Freelancer',
    src: '/brands/freelancer.svg',
    url: 'https://www.freelancer.com/',
  },
  {
    id: 'peopleperhour',
    name: 'PeoplePerHour',
    src: '/brands/peopleperhour.svg',
    url: 'https://www.peopleperhour.com/',
  },
  {
    id: 'toptal',
    name: 'Toptal',
    src: '/brands/toptal.svg',
    url: 'https://www.toptal.com/',
  },
];

function BrandLogo({ src, name, className = '' }) {
  return (
    <div className={`tb-logo-item ${className}`}>
      <img
        src={src}
        alt={name}
        className="tb-logo-img"
        loading="lazy"
        draggable="false"
      />
    </div>
  );
}

function MarqueeRow({ brands, direction = 'ltr', speed = 36 }) {
  // Repeat 4x so loop seam is completely invisible even on ultrawide displays
  const repeated = [...brands, ...brands, ...brands, ...brands];

  return (
    <div
      className="tb-marquee-wrapper"
      onMouseEnter={e => {
        const track = e.currentTarget.querySelector('.tb-marquee-track');
        if (track) track.style.animationPlayState = 'paused';
      }}
      onMouseLeave={e => {
        const track = e.currentTarget.querySelector('.tb-marquee-track');
        if (track) track.style.animationPlayState = 'running';
      }}
    >
      <div
        className={`tb-marquee-track tb-marquee-${direction}`}
        style={{ animationDuration: `${speed}s` }}
        aria-hidden="false"
      >
        {repeated.map((brand, idx) => (
          <BrandLogo
            key={`${brand.id}-${idx}`}
            src={brand.src}
            name={brand.name}
            className={brand.className}
          />
        ))}
      </div>
    </div>
  );
}

export default function TrustedBrands() {
  return (
    <section className="tb-section" id="trusted-brands" aria-label="Trusted Brands & Platforms">
      <div className="tb-header">
        <p className="tb-eyebrow">Selected Clients & Partners</p>
        <h2 className="tb-heading">Brands we've worked with</h2>
        <p className="tb-subheading">
          Empowering forward-thinking companies, universities, and ventures with high-impact digital solutions.
        </p>
      </div>

      {/* Dual Row Marquee for Client Brands */}
      <div className="tb-marquee-showcase">
        <MarqueeRow brands={CLIENT_BRANDS_ROW_1} direction="ltr" speed={32} />
        <MarqueeRow brands={CLIENT_BRANDS_ROW_2} direction="rtl" speed={36} />
      </div>

      {/* Clearly Separated Freelancing Platforms Section */}
      <div className="tb-platforms-section">
        <div className="tb-platforms-divider">
          <span className="tb-divider-line"></span>
          <div className="tb-platforms-badge">
            <span className="tb-badge-pulse"></span>
            <span>Hire Us Via Global Freelance Platforms</span>
          </div>
          <span className="tb-divider-line"></span>
        </div>

        <div className="tb-platforms-container">
          <p className="tb-platforms-caption">
            Top-rated & verified agency profile available on leading talent marketplaces
          </p>

          <div className="tb-platforms-grid">
            {FREELANCE_PLATFORMS.map((platform) => (
              <a
                key={platform.id}
                href={platform.url}
                target="_blank"
                rel="noopener noreferrer"
                className="tb-platform-card"
                aria-label={`Visit Dottangle on ${platform.name}`}
              >
                <div className="tb-platform-logo-box">
                  <img
                    src={platform.src}
                    alt={platform.name}
                    className={`tb-platform-img tb-platform-img-${platform.id}`}
                    loading="lazy"
                  />
                </div>
                <span className="tb-platform-label">{platform.name}</span>
                <span className="tb-platform-arrow" aria-hidden="true">↗</span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
