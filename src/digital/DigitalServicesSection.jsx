import React, { memo, useCallback, useState } from 'react';
import Smartphone from './Smartphone';
import { services } from './servicesData';
import BrandLogo from './BrandLogos';
import './digital.css';

/**
 * ServiceCard Component with Large Circular White Brand Logo Container
 * Follows Reference Image 1:
 * - Large circular white background
 * - Beautiful soft drop shadows
 * - Recognizable brand logo / illustration in the center
 * - Daylight theme soft pastel cards
 * - Smooth hover scale and elevation
 */
const ServiceCard = memo(function ServiceCard({ service, side, index, onSelect }) {
  return (
    <button
      className={`dp-service-card dp-from-${side}`}
      style={{
        '--delay': `${index * 80}ms`,
        '--service-color': service.color,
        '--service-soft': service.colorSoft
      }}
      onClick={() => onSelect(service.id)}
      type="button"
      aria-label={`Explore ${service.title}`}
    >
      <span className="dp-logo-circle" aria-hidden="true">
        <BrandLogo name={service.id} size={30} />
      </span>
      <span className="dp-card-info">
        <b>{service.title}</b>
        <small>{service.description}</small>
      </span>
      <i className="dp-card-arrow" aria-hidden="true">→</i>
    </button>
  );
});

export default function DigitalServicesSection() {
  const [requested, setRequested] = useState(null);
  const handled = useCallback(() => setRequested(null), []);

  return (
    <section className="dp-section" id="capabilities">
      {/* Decorative ambient daylight glow */}
      <div className="dp-ambient-glow" aria-hidden="true" />

      {/* Graph Paper Grid Minimal Decorative Elements (Reference Match) */}
      <div className="dp-grid-decorations" aria-hidden="true">
        <span className="dp-decor-dot dp-decor-dot-1" />
        <span className="dp-decor-circle dp-decor-circle-1" />
        <span className="dp-decor-dot dp-decor-dot-2" />
        <span className="dp-decor-circle dp-decor-circle-2" />
        <span className="dp-decor-circle dp-decor-circle-3" />
        <span className="dp-decor-dot dp-decor-dot-3" />
      </div>

      <div className="dp-heading text-center reveal-up">
        <span className="dp-section-tag">INTELLIGENT BUSINESS ARCHITECTURE</span>
        <h2>
          Everything your brand needs,<br />
          <em>inside one creative studio.</em>
        </h2>
        <p>
          Explore our capabilities—or tap any brand logo to experience live interactive demos on the smartphone.
        </p>
      </div>

      <div className="dp-layout">
        {/* Left Column Service Cards */}
        <div className="dp-service-column dp-col-left">
          {services.slice(0, 4).map((s, i) => (
            <ServiceCard
              key={s.id}
              service={s}
              side="left"
              index={i}
              onSelect={setRequested}
            />
          ))}
        </div>

        {/* Central Smartphone Stage */}
        <div className="dp-phone-stage">
          <div className="dp-phone-glow" />

          {/* Interactive Central Smartphone Component */}
          <Smartphone requestedService={requested} onRequestHandled={handled} />
          <span className="dp-phone-hint">Drag to unlock · Tap every app</span>
        </div>

        {/* Right Column Service Cards */}
        <div className="dp-service-column dp-col-right">
          {services.slice(4).map((s, i) => (
            <ServiceCard
              key={s.id}
              service={s}
              side="right"
              index={i}
              onSelect={setRequested}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
