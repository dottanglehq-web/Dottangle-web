import React from 'react';
import CodeBrewHero from './CodeBrewHero';

export default function HeroSection() {
  return (
    <CodeBrewHero 
      brandName="Dottangle"
      headline="Your Complete Business Growth Partner"
      subheadline="From business registration and legal compliance to eCommerce, technology and digital marketing — everything your business needs under one roof."
      primaryCtaText="Explore Our Services"
      primaryCtaLink="/services"
      secondaryCtaText="Get Free Consultation"
      secondaryCtaLink="/contact"
    />
  );
}
