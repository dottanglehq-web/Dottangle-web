import React, { useEffect } from 'react';
import PortfolioSection from '../components/portfolio/PortfolioSection';

export default function PortfolioPage() {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
    document.title = 'Client Portfolio & Live Websites | Dottangel';
  }, []);

  return (
    <main className="portfolio-directory-page" style={{ paddingTop: '80px', minHeight: '100vh' }}>
      <PortfolioSection
        title={
          <>
            Selected Works & <span className="gradient-coral-text serif-italic">Client Platforms.</span>
          </>
        }
        subtitle="Explore our verified live websites, eCommerce platforms, and custom digital systems across diverse commercial sectors."
      />
    </main>
  );
}

