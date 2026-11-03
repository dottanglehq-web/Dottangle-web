import React, { useState } from 'react';
import { reviewsData } from './reviewsData';
import './CustomerReviewsSection.css';

/**
 * ReviewCard Component
 * Recreates the Google Reviews-style card from Reference Image 1:
 * - Customer profile image on the left (circular avatar)
 * - Customer name in bold
 * - Five orange/golden stars below name
 * - Review description below
 * - White card background, light grey border, rounded corners, soft shadow
 */
function ReviewCard({ review }) {
  return (
    <article className="cr-card">
      <div className="cr-card-header">
        <img
          src={review.avatar}
          alt={`${review.name} profile`}
          className="cr-card-avatar"
          loading="lazy"
          width="46"
          height="46"
          draggable="false"
        />
        <div className="cr-card-user">
          <h4 className="cr-card-name">{review.name}</h4>
          <div className="cr-card-stars" aria-label={`${review.stars} out of 5 stars`}>
            {'★'.repeat(review.stars)}
          </div>
        </div>
        {review.date && (
          <span className="cr-card-date">{review.date}</span>
        )}
      </div>
      <p className="cr-card-text">{review.text}</p>
    </article>
  );
}

/**
 * CustomerReviewsSection Component
 * Two-Column Layout based on Reference Image 1:
 * - Left side: Large bold heading & supporting copy
 * - Right side: Large rounded lavender/grey container displaying vertically stacked white review cards
 * - Continuous automatic vertical top-to-bottom infinite scrolling marquee
 * - Seamless loop, pauses on hover and touch
 */
export default function CustomerReviewsSection() {
  const [isPaused, setIsPaused] = useState(false);

  // Duplicated array for seamless infinite looping (A -> B -> A with zero jump)
  const duplicatedReviews = [...reviewsData, ...reviewsData];

  return (
    <section className="cr-section" id="reviews" aria-label="Customer Reviews & Testimonials">
      {/* Soft ambient daylight depth glow */}
      <div className="cr-ambient-glow" aria-hidden="true" />

      <div className="cr-container">
        {/* LEFT SIDE: Large, bold heading with clean typography */}
        <div className="cr-left-col reveal-left">
          <div className="cr-section-tag">
            <span className="cr-tag-dot" aria-hidden="true" />
            <span>CLIENT TESTIMONIALS</span>
          </div>

          <h2 className="cr-heading">
            Trusted by Businesses.<br />
            <span className="cr-heading-italic">Loved by Clients.</span>
          </h2>

          <p className="cr-lead-text">
            Real experiences from businesses that trust us to build, grow, and transform their digital presence.
          </p>

          <div className="cr-trust-pills">
            <div className="cr-trust-pill">
              <span className="cr-check-icon">✓</span>
              <span>100% Verified Customer Feedback</span>
            </div>
            <div className="cr-trust-pill">
              <span className="cr-check-icon">✓</span>
              <span>Senior Engineering &amp; Direct Founder Collaboration</span>
            </div>
            <div className="cr-trust-pill">
              <span className="cr-check-icon">✓</span>
              <span>Proven Results Across Web, AI &amp; Paid Growth</span>
            </div>
          </div>
        </div>

        {/* RIGHT SIDE: Large, rounded review container with very light lavender/grey background */}
        <div className="cr-right-col reveal-right">
          <div
            className="cr-reviews-box"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
            onTouchStart={() => setIsPaused(true)}
            onTouchEnd={() => setIsPaused(false)}
          >
            {/* Box Header (Matching Google Reviews Style from Reference 1) */}
            <div className="cr-box-header">
              <div className="cr-header-left">
                <span className="cr-live-status-dot" aria-hidden="true" />
                <span className="cr-header-title">Client Reviews · Live</span>
              </div>
              <div className="cr-header-right">
                <span className="cr-header-score">5.0</span>
                <span className="cr-header-stars" aria-hidden="true">★★★★★</span>
                <span className="cr-header-badge-text">(Verified)</span>
              </div>
            </div>

            {/* Vertical Infinite Scrolling Viewport: Shows ~4 review cards at a time */}
            <div className="cr-reviews-window">
              <div
                className={`cr-reviews-track ${isPaused ? 'is-paused' : ''}`}
                aria-live="polite"
              >
                {duplicatedReviews.map((review, idx) => (
                  <ReviewCard
                    key={`${review.id}-${idx}`}
                    review={review}
                  />
                ))}
              </div>
            </div>

            {/* Box Footer: Subtle verified review indicator */}
            <div className="cr-box-footer">
              <span className="cr-footer-link">
                Verified client reviews &bull; Hover to pause
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

