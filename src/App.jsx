import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import ScrollToTop from './components/ScrollToTop';
import ScrollReveal from './components/ScrollReveal';
import CustomCursor from './components/CustomCursor';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

import HomePage from './pages/HomePage';
import ServicesPage from './pages/ServicesPage';
import ServiceDetailPage from './pages/ServiceDetailPage';
import ProcessPage from './pages/ProcessPage';
import PricingPage from './pages/PricingPage';
import ContactPage from './pages/ContactPage';
import ThankYouPage from './pages/ThankYouPage';
import BlogPage from './pages/BlogPage';
import BlogPostPage from './pages/BlogPostPage';
import AdminPage from './pages/AdminPage';
import PortalPage from './pages/PortalPage';
import ToolsPage from './pages/ToolsPage';
import AboutPage from './pages/AboutPage';
import IndustriesPage from './pages/IndustriesPage';
import LegalPage from './pages/LegalPage';
import PortfolioPage from './pages/PortfolioPage';
import PortfolioDetailPage from './pages/PortfolioDetailPage';

export default function App() {
  return (
    <div className="agency-app">
      {/* Scroll restoration on route changes */}
      <ScrollToTop />

      {/* Universal Scroll-Triggered Slide-In Engine */}
      <ScrollReveal />
      <CustomCursor />

      {/* Luxury Ambient Lighting Glow */}
      <div className="ambient-glow-wrapper" aria-hidden="true">
        <div className="glow-orb orb-primary"></div>
        <div className="glow-orb orb-secondary"></div>
        <div className="grid-overlay-mesh"></div>
      </div>

      {/* Main Luxury Header with Full Mega-Menu */}
      <Navbar />

      {/* Multi-Page Client-Side Routes */}
      <main id="main-content">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/services/*" element={<ServicesPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/industries" element={<IndustriesPage />} />

          {/* Dedicated Individual Service Detail Pages */}
          <Route path="/service/:serviceSlug" element={<ServiceDetailPage />} />
          <Route path="/services/detail/:serviceSlug" element={<ServiceDetailPage />} />
          <Route path="/company-registration" element={<ServiceDetailPage serviceSlugOverride="pvt-ltd-registration" />} />
          <Route path="/gst-registration" element={<ServiceDetailPage serviceSlugOverride="gst-registration" />} />
          <Route path="/trademark-registration" element={<Navigate to="/services" replace />} />
          <Route path="/fssai-registration" element={<Navigate to="/services" replace />} />
          <Route path="/amazon-seller-management" element={<ServiceDetailPage serviceSlugOverride="amazon-seller-management" />} />
          <Route path="/shopify-store-development" element={<ServiceDetailPage serviceSlugOverride="shopify-store-development" />} />

          {/* Knowledge Centre & Guides */}
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/blog/:slug" element={<BlogPostPage />} />
          <Route path="/resources" element={<BlogPage />} />

          {/* Business Tools Suite */}
          <Route path="/tools" element={<ToolsPage />} />
          <Route path="/tools/:toolName" element={<ToolsPage />} />

          {/* Customer Portal */}
          <Route path="/portal" element={<PortalPage />} />
          <Route path="/portal/*" element={<PortalPage />} />
          <Route path="/client" element={<PortalPage />} />

          {/* Admin Control CMS & CRM */}
          <Route path="/admin" element={<AdminPage />} />
          <Route path="/admin/*" element={<AdminPage />} />

          {/* Portfolio & Case Studies */}
          <Route path="/portfolio" element={<PortfolioPage />} />
          <Route path="/portfolio/:slug" element={<PortfolioDetailPage />} />
          <Route path="/work" element={<PortfolioPage />} />
          <Route path="/case-studies" element={<PortfolioPage />} />
          <Route path="/process" element={<ProcessPage />} />
          <Route path="/pricing" element={<PricingPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/thank-you" element={<ThankYouPage />} />

          {/* Compliance & Legal Policies */}
          <Route path="/privacy" element={<LegalPage forcedType="privacy" />} />
          <Route path="/terms" element={<LegalPage forcedType="terms" />} />
          <Route path="/refund-policy" element={<LegalPage forcedType="refund" />} />

          {/* Fallback */}
          <Route path="*" element={<HomePage />} />
        </Routes>
      </main>

      {/* Main Global Footer */}
      <Footer />
    </div>
  );
}
