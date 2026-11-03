import React from 'react';
import CodeBrewHero from './CodeBrewHero';

export default function HeroSection() {
  return (
    <CodeBrewHero 
      brandName="Dottangle"
      headline="AI-Driven Digital Transformation Company"
      subheadline="We empower businesses to Innovate, Optimize, and Scale."
      primaryCtaText="Build Your Success Story"
      primaryCtaLink="/contact"
      secondaryCtaText="Explore Live Demos"
      secondaryCtaLink="/work"
    />
  );
}
