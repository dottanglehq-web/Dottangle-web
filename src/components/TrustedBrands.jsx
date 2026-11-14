import React from 'react';

/**
 * Authentic Client & Featured Portfolio Brands
 * Verified logos from live website audits across key agency client verticals.
 */
const CLIENT_BRANDS_ROW_1 = [
  {
    id: 'apex-vouchers',
    name: 'Apex Vouchers',
    src: '/brands/apex-vouchers.png',
    className: 'tb-logo-apex',
  },
  {
    id: 'eternal-sips',
    name: 'Eternal Sips',
    src: '/brands/eternal-sips.png',
    className: 'tb-logo-eternal-sips',
  },
  {
    id: 'rangrezz-boutique',
    name: 'Rangrezz Boutique',
    src: '/brands/rangrezz-boutique.png',
    className: 'tb-logo-rangrezz',
  },
  {
    id: 'balaji-nar-singh-herbals',
    name: 'Balaji Nar Singh Herbals',
    src: '/brands/balaji-nar-singh-herbals.png',
    className: 'tb-logo-balaji',
  },
  {
    id: 'helybely',
    name: 'HelyBely',
    src: '/brands/helybely.png',
    className: 'tb-logo-helybely',
  },
  {
    id: 'techverse',
    name: 'TechVerse CT University',
    src: '/brands/techverse.png',
    className: 'tb-logo-techverse',
  },
  {
    id: 'toscaninis',
    name: "Toscanini's",
    src: '/brands/toscaninis.png',
    className: 'tb-logo-toscaninis',
  },
  {
    id: 'waadiya',
    name: 'Waadiya',
    src: '/brands/waadiya.png',
    className: 'tb-logo-waadiya',
  },
];

const CLIENT_BRANDS_ROW_2 = [
  {
    id: 'apex-vouchers-r2',
    name: 'Apex Vouchers',
    src: '/brands/apex-vouchers.png',
    className: 'tb-logo-apex',
  },
  {
    id: 'waadiya-r2',
    name: 'Waadiya',
    src: '/brands/waadiya.png',
    className: 'tb-logo-waadiya',
  },
  {
    id: 'toscaninis-r2',
    name: "Toscanini's",
    src: '/brands/toscaninis.png',
    className: 'tb-logo-toscaninis',
  },
  {
    id: 'ct-university-r2',
    name: 'CT University',
    src: '/brands/ct-university-horizontal.png',
    className: 'tb-logo-ct-univ',
  },
  {
    id: 'helybely-r2',
    name: 'HelyBely',
    src: '/brands/helybely.png',
    className: 'tb-logo-helybely',
  },
  {
    id: 'eternal-sips-r2',
    name: 'Eternal Sips',
    src: '/brands/eternal-sips.png',
    className: 'tb-logo-eternal-sips',
  },
  {
    id: 'rangrezz-boutique-r2',
    name: 'Rangrezz Boutique',
    src: '/brands/rangrezz-boutique.png',
    className: 'tb-logo-rangrezz',
  },
  {
    id: 'balaji-herbals-r2',
    name: 'Balaji Nar Singh Herbals',
    src: '/brands/balaji-nar-singh-herbals.png',
    className: 'tb-logo-balaji',
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
        alt={`${name} Official Logo`}
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
    <section className="tb-section" id="trusted-brands" aria-label="Selected Projects & Digital Experiences">
      <div className="tb-header">
        <p className="tb-eyebrow">Portfolio & Client Work</p>
        <h2 className="tb-heading">Selected Projects & Digital Experiences</h2>
        <p className="tb-subheading">
          Explore the digital platforms and experiences we've created across different industries.
        </p>
      </div>

      {/* Dual Row Marquee for Client Brands */}
      <div className="tb-marquee-showcase">
        <MarqueeRow brands={CLIENT_BRANDS_ROW_1} direction="ltr" speed={30} />
        <MarqueeRow brands={CLIENT_BRANDS_ROW_2} direction="rtl" speed={34} />
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
