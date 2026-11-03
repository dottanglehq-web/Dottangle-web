import React from 'react';

/**
 * Premium Brand Logos & Visual Service Illustrations
 * Inspired by Image 1 (WhatsApp, Shopify, WordPress, AI Integration, Support Agent, UGC Video, Growth Chart, Chatbots)
 */

export function WhatsAppLogo({ size = 32 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 36 36" fill="none">
      <circle cx="18" cy="18" r="16" fill="#25D366" />
      <path
        d="M26.2 19.8c-.4-.2-2.35-1.16-2.71-1.3-.36-.14-.62-.2-.88.2-.26.4-1.02 1.3-1.25 1.56-.23.26-.46.3-.85.1-.4-.2-1.68-.62-3.2-1.98-1.18-1.06-1.98-2.36-2.21-2.76-.23-.4-.02-.62.17-.81.18-.18.4-.46.59-.69.2-.23.26-.4.4-.66.13-.26.07-.5-.03-.7-.1-.2-.88-2.14-1.22-2.93-.32-.76-.65-.66-.88-.67-.23-.01-.5-.01-.76-.01-.26 0-.69.1-1.05.5-.36.4-1.39 1.36-1.39 3.31s1.42 3.84 1.62 4.1c.2.26 2.78 4.25 6.75 5.97.94.41 1.68.65 2.25.83.94.3 1.8.26 2.48.16.76-.11 2.35-.96 2.68-1.89.33-.93.33-1.73.23-.89-.1-.17-.36-.27-.76-.47z"
        fill="#FFFFFF"
      />
    </svg>
  );
}

export function ShopifyLogo({ size = 32 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 36 36" fill="none">
      {/* Shopping Bag Outer Frame */}
      <path
        d="M29.5 9.8c-.1-.4-.4-.6-.7-.6-.3 0-2.2-.1-2.2-.1s-1.8-1.7-2-1.9c-.2-.2-.7-.1-.9-.1-.03 0-.7.2-1.7.5-1-2.6-2.5-4.7-4.3-4.7-.2 0-.4 0-.6.1-1.5.4-2.4 2.4-3 5.3-.9.3-1.6.5-1.7.5-.5.2-.5.2-.6.7-.1.4-3.5 27.2-3.5 27.2l16.9 3.2 10.8-2.5s-3.1-27.4-3.1-27.4zm-8.6-4.2c1 .3 1.9 2.1 2.5 4.4l-4.7 1.4c.5-2.7 1.3-5.6 2.2-5.8zm-3.2 20c-.3.1-.7.2-1.1.2-1.8 0-2.7-1.2-2.7-2.7 0-2.1 1.7-3.6 4.2-3.8v-.4c0-1-.6-1.5-1.7-1.5-.9 0-1.6.3-2.1.6l-.5-1.5c.7-.5 1.8-.8 2.9-.8 2.2 0 3.4 1.2 3.4 3.2v5.6c0 .9.1 1.6.3 2.2l-1.9.3c-.2-.4-.3-1-.4-1.4zm.5-4.8c-1.4.2-2.1.8-2.1 1.9 0 .8.5 1.3 1.3 1.3.2 0 .5-.1.8-.1v-3.1z"
        fill="#95BF47"
      />
      {/* Dark Fold Accents */}
      <path
        d="M20.8 4.5c-.2 0-.4 0-.6.1-1.5.4-2.4 2.4-3 5.3l5-1.5c-.4-2-1.1-3.6-1.4-3.9z"
        fill="#5E8E3E"
      />
    </svg>
  );
}

export function WordPressLogo({ size = 32 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 36 36" fill="none">
      <circle cx="18" cy="18" r="16" fill="#0073AA" />
      <path
        d="M6 18c0 5.1 3.2 9.5 7.8 11.2L7.7 13.2C6.6 14.6 6 16.2 6 18zm17.4-.6c0-1.5-.6-2.5-1-3.3-.7-1-1.3-1.9-1.3-3 0-1.1.9-2.3 2.2-2.3.1 0 .2 0 .3.02C21.9 7.5 20 6.9 18 6.9c-3.8 0-7.1 1.8-9.1 4.7l6.3 17.3c.3.1.7.1 1.1.1 1.3 0 2.3-.1 2.3-.1l-.3-1.4s-.7.1-1.5.1l2.9-8.5 2.5 7.4c.7-.2 1.4-.5 2.1-.8L23.4 17.4zm5.5-4.8c.6 1.6.9 3.4.9 5.4 0 3.8-1.7 7.1-4.3 9.3l4-11.7c.2-1 .3-2 .3-3h-.9zM18 30c-.8 0-1.5-.1-2.2-.3l-5.1-14.5c-.3-1-.7-1.9-1.1-2.7 2.3-2.4 5.6-3.9 9.3-3.9 3.4 0 6.5 1.4 8.8 3.5l-7.4 17.9h-2.3z"
        fill="#FFFFFF"
      />
    </svg>
  );
}

export function AIIntegrationLogo({ size = 32 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 36 36" fill="none">
      <defs>
        <radialGradient id="aiGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#8B5CF6" />
          <stop offset="60%" stopColor="#EC4899" />
          <stop offset="100%" stopColor="#3B82F6" />
        </radialGradient>
      </defs>
      {/* Colorful Gradient Petals / Starburst */}
      <circle cx="18" cy="18" r="15" fill="url(#aiGlow)" />
      {/* Overlapping Neural Orbs */}
      <circle cx="18" cy="5" r="4.5" fill="#38BDF8" opacity="0.9" />
      <circle cx="27" cy="10" r="4.5" fill="#818CF8" opacity="0.9" />
      <circle cx="31" cy="18" r="4.5" fill="#C084FC" opacity="0.9" />
      <circle cx="27" cy="26" r="4.5" fill="#F472B6" opacity="0.9" />
      <circle cx="18" cy="31" r="4.5" fill="#FB7185" opacity="0.9" />
      <circle cx="9" cy="26" r="4.5" fill="#FBBF24" opacity="0.9" />
      <circle cx="5" cy="18" r="4.5" fill="#34D399" opacity="0.9" />
      <circle cx="9" cy="10" r="4.5" fill="#2DD4BF" opacity="0.9" />
      {/* Center White Core Badge with "AI" */}
      <circle cx="18" cy="18" r="8.5" fill="#FFFFFF" />
      <text
        x="18"
        y="21.5"
        textAnchor="middle"
        fontSize="8.5"
        fontWeight="900"
        fill="#7C3AED"
        fontFamily="sans-serif"
        letterSpacing="-0.5px"
      >
        AI
      </text>
    </svg>
  );
}

export function CustomerSupportAvatar({ size = 32 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 36 36" fill="none">
      <circle cx="18" cy="18" r="16" fill="#F8FAFC" />
      {/* Neck & Suit */}
      <path d="M12 32c0-4 2.5-6 6-6s6 2 6 6" fill="#1E293B" />
      <polygon points="18,26 15,32 21,32" fill="#FFFFFF" />
      <polygon points="18,27 17,32 19,32" fill="#E11D48" />
      {/* Face & Head */}
      <circle cx="18" cy="17" r="6.5" fill="#FCD34D" />
      {/* Hair */}
      <path d="M11.5 16c0-4 2.5-7 6.5-7s6.5 3 6.5 7c0 0-2-2-6.5-2s-6.5 2-6.5 2z" fill="#92400E" />
      {/* Headset Yellow Band & Ear Cushions */}
      <path d="M11 17c0-4.5 3-7.5 7-7.5s7 3 7 7.5" stroke="#F59E0B" strokeWidth="2.5" strokeLinecap="round" />
      <circle cx="11.5" cy="17.5" r="2.2" fill="#F59E0B" />
      <circle cx="24.5" cy="17.5" r="2.2" fill="#F59E0B" />
      {/* Headset Mic */}
      <path d="M11.5 19.5c0 2 2 3.5 4.5 3.5" stroke="#F59E0B" strokeWidth="1.8" strokeLinecap="round" />
      <circle cx="16.5" cy="23" r="1.3" fill="#1E293B" />
    </svg>
  );
}

export function UGCVideoLogo({ size = 32 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 36 36" fill="none">
      <circle cx="18" cy="18" r="16" fill="#FFF1F2" />
      {/* Clapperboard Body */}
      <rect x="7" y="14" width="22" height="15" rx="3" fill="#1E293B" />
      {/* Red Play Button */}
      <polygon points="16,19 23,21.5 16,24" fill="#F43F5E" />
      {/* Angled Clapper Top */}
      <g transform="rotate(-6 7 13)">
        <rect x="7" y="9.5" width="22" height="5" rx="2" fill="#0F172A" />
        {/* Striped Chevrons */}
        <polygon points="10,9.5 12,9.5 9,14.5 7,14.5" fill="#FFFFFF" />
        <polygon points="15,9.5 17,9.5 14,14.5 12,14.5" fill="#FFFFFF" />
        <polygon points="20,9.5 22,9.5 19,14.5 17,14.5" fill="#FFFFFF" />
        <polygon points="25,9.5 27,9.5 24,14.5 22,14.5" fill="#FFFFFF" />
      </g>
    </svg>
  );
}

export function BusinessGrowthLogo({ size = 32 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 36 36" fill="none">
      <circle cx="18" cy="18" r="16" fill="#F0FDF4" />
      {/* Bar 1 (Yellow) */}
      <rect x="9" y="21" width="4.5" height="9" rx="2" fill="#FBBF24" />
      {/* Bar 2 (Orange) */}
      <rect x="15.5" y="16" width="4.5" height="14" rx="2" fill="#F97316" />
      {/* Bar 3 (Blue) */}
      <rect x="22" y="11" width="4.5" height="19" rx="2" fill="#0284C7" />
      {/* Ascending Growth Arrow */}
      <path
        d="M8 17.5L14 12.5L19 16L27 7.5"
        stroke="#10B981"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <polygon points="27.5,6.5 28,11.5 23.5,9.5" fill="#10B981" />
    </svg>
  );
}

export function AIChatbotLogo({ size = 32 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 36 36" fill="none">
      <circle cx="18" cy="18" r="16" fill="#EFF6FF" />
      {/* Antenna */}
      <line x1="18" y1="10" x2="18" y2="7" stroke="#3B82F6" strokeWidth="2" strokeLinecap="round" />
      <circle cx="18" cy="6" r="2" fill="#EF4444" />
      {/* Head Box */}
      <rect x="9" y="10" width="18" height="16" rx="6" fill="#3B82F6" />
      {/* Screen Visor */}
      <rect x="11.5" y="12.5" width="13" height="10" rx="3.5" fill="#FFFFFF" />
      {/* Eyes */}
      <circle cx="15" cy="16.5" r="1.8" fill="#3B82F6" />
      <circle cx="21" cy="16.5" r="1.8" fill="#3B82F6" />
      {/* Happy Smile */}
      <path d="M15 19.5c.8 1 2.2 1 3 0" stroke="#3B82F6" strokeWidth="1.4" strokeLinecap="round" />
      {/* Ears / Headset */}
      <rect x="7" y="14" width="2.5" height="7" rx="1.2" fill="#F59E0B" />
      <rect x="26.5" y="14" width="2.5" height="7" rx="1.2" fill="#F59E0B" />
    </svg>
  );
}

export function WebDevLogo({ size = 32 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 36 36" fill="none">
      <circle cx="18" cy="18" r="16" fill="#EFF6FF" />
      <rect x="8" y="10" width="20" height="16" rx="4" fill="#0F172A" />
      {/* Code Brackets */}
      <path
        d="M13.5 15.5L11 18L13.5 20.5M22.5 15.5L25 18L22.5 20.5M19 14.5L17 21.5"
        stroke="#38BDF8"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function SEOLogo({ size = 32 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 36 36" fill="none">
      <circle cx="18" cy="18" r="16" fill="#F0F9FF" />
      <circle cx="16" cy="16" r="7" stroke="#0284C7" strokeWidth="2.5" />
      <line x1="21.5" y1="21.5" x2="27" y2="27" stroke="#0284C7" strokeWidth="3" strokeLinecap="round" />
      <polyline points="13 17 15 14 17 16 19 13" stroke="#F59E0B" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    </svg>
  );
}

export function MobileAppLogo({ size = 32 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 36 36" fill="none">
      <circle cx="18" cy="18" r="16" fill="#F5EEFD" />
      <rect x="11.5" y="8" width="13" height="20" rx="3.5" fill="#1E293B" />
      <rect x="13" y="10" width="10" height="15" rx="1.5" fill="url(#mobileGlow)" />
      <circle cx="18" cy="26" r="0.9" fill="#94A3B8" />
      <defs>
        <linearGradient id="mobileGlow" x1="13" y1="10" x2="23" y2="25">
          <stop stopColor="#8B5CF6" />
          <stop offset="1" stopColor="#EC4899" />
        </linearGradient>
      </defs>
    </svg>
  );
}

export function LogoDesignLogo({ size = 32 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 36 36" fill="none">
      <circle cx="18" cy="18" r="16" fill="#FFF7ED" />
      {/* Fountain Pen Nib */}
      <path
        d="M24 10L26 12L17 21L14 22L15 19L24 10Z"
        fill="#F97316"
      />
      <circle cx="14" cy="22" r="1.5" fill="#EA580C" />
      <path d="M10 26C12 25 13 24 14 22" stroke="#F97316" strokeWidth="2" strokeLinecap="round" />
      <path d="M22 8L24 6L26 8" stroke="#FBBF24" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

/**
 * Universal BrandLogo Resolver Component
 */
export default function BrandLogo({ name, size = 32, className = '' }) {
  let content = null;
  switch (name) {
    case 'whatsapp':
    case 'ai-whatsapp':
      content = <WhatsAppLogo size={size} />;
      break;
    case 'shopify':
    case 'ecommerce':
    case 'bag':
      content = <ShopifyLogo size={size} />;
      break;
    case 'wordpress':
    case 'branding':
      content = <WordPressLogo size={size} />;
      break;
    case 'ai-integration':
    case 'ai':
      content = <AIIntegrationLogo size={size} />;
      break;
    case 'ai-support':
    case 'consulting':
    case 'users':
      content = <CustomerSupportAvatar size={size} />;
      break;
    case 'ugc-video':
    case 'photography':
    case 'camera':
      content = <UGCVideoLogo size={size} />;
      break;
    case 'business-growth':
    case 'seo':
    case 'search':
      content = <BusinessGrowthLogo size={size} />;
      break;
    case 'ai-chatbot':
    case 'bot':
      content = <AIChatbotLogo size={size} />;
      break;
    case 'web':
    case 'code':
      content = <WebDevLogo size={size} />;
      break;
    case 'mobile':
    case 'phone':
      content = <MobileAppLogo size={size} />;
      break;
    case 'logo':
    case 'pen':
      content = <LogoDesignLogo size={size} />;
      break;
    default:
      content = <AIIntegrationLogo size={size} />;
  }

  return (
    <div className={`brand-logo-wrapper ${className}`} style={{ width: size, height: size, display: 'grid', placeItems: 'center' }}>
      {content}
    </div>
  );
}

