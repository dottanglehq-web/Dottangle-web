import React, { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * Universal Scroll Reveal & Scroll Interaction Engine
 * Observes components across all pages as user scrolls and slides them smoothly into view.
 * Also powers subtle ambient parallax scrolling for background shapes.
 */
export default function ScrollReveal() {
  const location = useLocation();
  const prevPathRef = useRef(location.pathname);

  useEffect(() => {
    // If navigation happens internally within /services, skip re-running reveal engine
    // to prevent service cards/headers from blinking and resetting animation
    const isServiceInternal =
      location.pathname.startsWith('/services') && prevPathRef.current.startsWith('/services');
    prevPathRef.current = location.pathname;

    if (isServiceInternal) {
      return;
    }

    // Add js-scroll-reveal to html tag to activate CSS transitions safely
    document.documentElement.classList.add('js-scroll-reveal');

    // Selectors to automatically apply scroll reveal animations
    const targetSelectors = [
      '.reveal-on-scroll',
      '.reveal-up',
      '.reveal-left',
      '.reveal-right',
      '.reveal-scale',
      '.ps-header',
      '.ps-card',
      '.section-header',
      '.studio-visual-mosaic',
      '.studio-growth-content',
      '.faq-item',
      '.cta-banner-card',
      '.trust-marquee-showcase',
      '.case-study-item',
      '.case-study-card',
      '.pricing-card',
      '.process-step',
      '.process-step-card',
      '.process-card',
      '.service-detail-card',
      '.service-card',
      '.contact-form-card',
      '.contact-info-card',
      '.contact-method-card',
      '.studio-stat-card',
      '.scope-calculator-wrapper',
      '.wheel-stage-container',
      '.wheel-info-card',
      '.matrix-card',
      '.sla-card'
    ];

    const observerCallback = (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-revealed');
          // Once revealed, unobserve to keep DOM performant and steady
          observer.unobserve(entry.target);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, {
      root: null,
      rootMargin: '0px 0px -50px 0px',
      threshold: 0.1
    });

    // Timeout ensures DOM nodes are mounted after React render
    const timer = setTimeout(() => {
      const elements = document.querySelectorAll(targetSelectors.join(', '));
      
      elements.forEach((el, index) => {
        // Apply reveal-up if no specific directional class exists
        if (!el.classList.contains('reveal-left') && 
            !el.classList.contains('reveal-right') && 
            !el.classList.contains('reveal-scale') &&
            !el.classList.contains('reveal-up')) {
          el.classList.add('reveal-up');
        }

        // Apply stagger delay for list/grid items inside common containers
        const parentGrid = el.closest('.ps-cards-grid, .studio-growth-grid, .faq-section, .pricing-grid, .services-grid, .case-studies-list, .contact-methods-grid');
        if (parentGrid && !el.style.transitionDelay) {
          const siblings = Array.from(parentGrid.querySelectorAll(targetSelectors.join(', ')));
          const siblingIndex = siblings.indexOf(el);
          if (siblingIndex > 0) {
            el.style.transitionDelay = `${Math.min(siblingIndex * 0.12, 0.48)}s`;
          }
        }

        // Check if element is already in viewport on initial load
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight - 40 && rect.bottom > 0) {
          setTimeout(() => {
            el.classList.add('is-revealed');
          }, Math.min(index * 50, 350));
        } else {
          observer.observe(el);
        }
      });
    }, 60);

    // Subtle Parallax Scroll for Ambient Background Shapes
    let ticking = false;
    let scrollFrame;
    const shapes = document.querySelectorAll('.ps-glow-shape, .glow-orb');
    const handleScrollParallax = () => {
      if (!ticking) {
        scrollFrame = requestAnimationFrame(() => {
          const scrollY = window.scrollY;
          shapes.forEach((shape, i) => {
            const speed = (i % 2 === 0) ? 0.05 : -0.04;
            shape.style.transform = `translate3d(0, ${scrollY * speed}px, 0)`;
          });
          ticking = false;
        });
        ticking = true;
      }
    };

    const isMobile = window.matchMedia('(max-width: 767px), (pointer: coarse), (prefers-reduced-motion: reduce)').matches;
    if (!isMobile) {
      window.addEventListener('scroll', handleScrollParallax, { passive: true });
    }

    return () => {
      clearTimeout(timer);
      cancelAnimationFrame(scrollFrame);
      observer.disconnect();
      if (!isMobile) {
        window.removeEventListener('scroll', handleScrollParallax);
      }
    };
  }, [location.pathname]);

  return null;
}
