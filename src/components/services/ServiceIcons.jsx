import React from 'react';
import {
  Cpu,
  Flame,
  Globe,
  Smartphone,
  Building,
  Building2,
  ShoppingBag,
  TrendingUp,
  Palette,
  Cloud,
  ShieldAlert,
  Wrench,
  Users,
  Activity,
  CreditCard,
  GraduationCap,
  Truck,
  Rocket,
  Cog,
  Compass,
  MessageCircle,
  Code2,
  Receipt,
  ShieldCheck,
  Scale,
  FileText,
  Award,
  Coins,
  Store,
  Briefcase,
  FileSpreadsheet,
  Layers,
  Shield,
  Search,
  Sparkles,
  Bot,
  Zap,
  CheckCircle2,
  Check,
  Send,
  Lock
} from 'lucide-react';

export const iconMap = {
  Cpu,
  Flame,
  Globe,
  Smartphone,
  Building,
  Building2,
  ShoppingBag,
  TrendingUp,
  Palette,
  Cloud,
  ShieldAlert,
  Wrench,
  Users,
  Activity,
  CreditCard,
  GraduationCap,
  Truck,
  Rocket,
  Cog,
  Compass,
  MessageCircle,
  Code2,
  Receipt,
  ShieldCheck,
  Scale,
  FileText,
  Award,
  Coins,
  Store,
  Briefcase,
  FileSpreadsheet,
  Layers,
  Shield,
  Search,
  Sparkles,
  Bot,
  Zap,
  Lock
};

/**
 * Consistent, Vibrant Category Color Palettes & Glow Systems
 */
export const CATEGORY_COLOR_THEMES = {
  'ai-development': {
    primary: '#8B5CF6',
    secondary: '#06B6D4',
    bg: 'linear-gradient(135deg, rgba(139, 92, 246, 0.16), rgba(6, 182, 212, 0.14))',
    border: 'rgba(139, 92, 246, 0.35)',
    glow: '0 8px 24px -4px rgba(139, 92, 246, 0.35)',
    label: 'Flagship AI'
  },
  'business-registration': {
    primary: '#2563EB',
    secondary: '#4F46E5',
    bg: 'linear-gradient(135deg, rgba(37, 99, 235, 0.16), rgba(79, 70, 229, 0.14))',
    border: 'rgba(37, 99, 235, 0.35)',
    glow: '0 8px 24px -4px rgba(37, 99, 235, 0.35)',
    label: 'Govt Certified'
  },
  'gst-taxation': {
    primary: '#059669',
    secondary: '#10B981',
    bg: 'linear-gradient(135deg, rgba(5, 150, 105, 0.16), rgba(16, 185, 129, 0.14))',
    border: 'rgba(5, 150, 105, 0.35)',
    glow: '0 8px 24px -4px rgba(5, 150, 105, 0.35)',
    label: 'Tax Compliance'
  },
  'accounting-financial': {
    primary: '#D97706',
    secondary: '#F59E0B',
    bg: 'linear-gradient(135deg, rgba(217, 119, 6, 0.16), rgba(245, 158, 11, 0.14))',
    border: 'rgba(217, 119, 6, 0.35)',
    glow: '0 8px 24px -4px rgba(217, 119, 6, 0.35)',
    label: 'Financial Health'
  },
  'ecommerce-management': {
    primary: '#E11D48',
    secondary: '#F43F5E',
    bg: 'linear-gradient(135deg, rgba(225, 29, 72, 0.16), rgba(244, 63, 94, 0.14))',
    border: 'rgba(225, 29, 72, 0.35)',
    glow: '0 8px 24px -4px rgba(225, 29, 72, 0.35)',
    label: 'Marketplaces & D2C'
  },
  'zero-to-hero': {
    primary: '#EA580C',
    secondary: '#F97316',
    bg: 'linear-gradient(135deg, rgba(234, 88, 12, 0.16), rgba(249, 115, 22, 0.14))',
    border: 'rgba(234, 88, 12, 0.35)',
    glow: '0 8px 24px -4px rgba(234, 88, 12, 0.35)',
    label: 'Complete MVP'
  },
  'web-development': {
    primary: '#0284C7',
    secondary: '#0EA5E9',
    bg: 'linear-gradient(135deg, rgba(2, 132, 199, 0.16), rgba(14, 165, 233, 0.14))',
    border: 'rgba(2, 132, 199, 0.35)',
    glow: '0 8px 24px -4px rgba(2, 132, 199, 0.35)',
    label: 'Web & Cloud Apps'
  },
  'mobile-app-development': {
    primary: '#6366F1',
    secondary: '#818CF8',
    bg: 'linear-gradient(135deg, rgba(99, 102, 241, 0.16), rgba(129, 140, 248, 0.14))',
    border: 'rgba(99, 102, 241, 0.35)',
    glow: '0 8px 24px -4px rgba(99, 102, 241, 0.35)',
    label: 'iOS & Android'
  },
  'custom-software': {
    primary: '#0D9488',
    secondary: '#14B8A6',
    bg: 'linear-gradient(135deg, rgba(13, 148, 136, 0.16), rgba(20, 184, 166, 0.14))',
    border: 'rgba(13, 148, 136, 0.35)',
    glow: '0 8px 24px -4px rgba(13, 148, 136, 0.35)',
    label: 'Enterprise SaaS'
  },
  'ecommerce-development': {
    primary: '#9333EA',
    secondary: '#A855F7',
    bg: 'linear-gradient(135deg, rgba(147, 51, 234, 0.16), rgba(168, 85, 247, 0.14))',
    border: 'rgba(147, 51, 234, 0.35)',
    glow: '0 8px 24px -4px rgba(147, 51, 234, 0.35)',
    label: 'Shopify & Headless'
  },
  'digital-marketing': {
    primary: '#C026D3',
    secondary: '#E879F9',
    bg: 'linear-gradient(135deg, rgba(192, 38, 211, 0.16), rgba(232, 121, 249, 0.14))',
    border: 'rgba(192, 38, 211, 0.35)',
    glow: '0 8px 24px -4px rgba(192, 38, 211, 0.35)',
    label: 'Performance Ads'
  },
  'graphic-design': {
    primary: '#DB2777',
    secondary: '#F472B6',
    bg: 'linear-gradient(135deg, rgba(219, 39, 119, 0.16), rgba(244, 114, 182, 0.14))',
    border: 'rgba(219, 39, 119, 0.35)',
    glow: '0 8px 24px -4px rgba(219, 39, 119, 0.35)',
    label: 'Luxury Identity'
  },
  'cloud-devops': {
    primary: '#3B82F6',
    secondary: '#60A5FA',
    bg: 'linear-gradient(135deg, rgba(59, 130, 246, 0.16), rgba(96, 165, 250, 0.14))',
    border: 'rgba(59, 130, 246, 0.35)',
    glow: '0 8px 24px -4px rgba(59, 130, 246, 0.35)',
    label: 'AWS & GCP Ops'
  },
  'cybersecurity-consulting': {
    primary: '#DC2626',
    secondary: '#EF4444',
    bg: 'linear-gradient(135deg, rgba(220, 38, 38, 0.16), rgba(239, 68, 68, 0.14))',
    border: 'rgba(220, 38, 38, 0.35)',
    glow: '0 8px 24px -4px rgba(220, 38, 38, 0.35)',
    label: 'Security & Audit'
  },
  'maintenance-support': {
    primary: '#65A30D',
    secondary: '#84CC16',
    bg: 'linear-gradient(135deg, rgba(101, 163, 13, 0.16), rgba(132, 204, 22, 0.14))',
    border: 'rgba(101, 163, 13, 0.35)',
    glow: '0 8px 24px -4px rgba(101, 163, 13, 0.35)',
    label: '24/7 SLA Support'
  },
  'offshore-development': {
    primary: '#0891B2',
    secondary: '#06B6D4',
    bg: 'linear-gradient(135deg, rgba(8, 145, 178, 0.16), rgba(6, 182, 212, 0.14))',
    border: 'rgba(8, 145, 178, 0.35)',
    glow: '0 8px 24px -4px rgba(8, 145, 178, 0.35)',
    label: 'Dedicated Squads'
  },
  'seo-optimization': {
    primary: '#16A34A',
    secondary: '#22C55E',
    bg: 'linear-gradient(135deg, rgba(22, 163, 74, 0.16), rgba(34, 197, 94, 0.14))',
    border: 'rgba(22, 163, 74, 0.35)',
    glow: '0 8px 24px -4px rgba(22, 163, 74, 0.35)',
    label: 'Page 1 Rankings'
  },
  'whatsapp-integration': {
    primary: '#25D366',
    secondary: '#128C7E',
    bg: 'linear-gradient(135deg, rgba(37, 211, 102, 0.18), rgba(18, 140, 126, 0.15))',
    border: 'rgba(37, 211, 102, 0.4)',
    glow: '0 8px 24px -4px rgba(37, 211, 102, 0.4)',
    label: 'WhatsApp API'
  },
  'ai-integration': {
    primary: '#8B5CF6',
    secondary: '#3B82F6',
    bg: 'linear-gradient(135deg, rgba(139, 92, 246, 0.16), rgba(59, 130, 246, 0.14))',
    border: 'rgba(139, 92, 246, 0.35)',
    glow: '0 8px 24px -4px rgba(139, 92, 246, 0.35)',
    label: 'Smart APIs'
  },
  'custom-software-development': {
    primary: '#0D9488',
    secondary: '#0284C7',
    bg: 'linear-gradient(135deg, rgba(13, 148, 136, 0.16), rgba(2, 132, 199, 0.14))',
    border: 'rgba(13, 148, 136, 0.35)',
    glow: '0 8px 24px -4px rgba(13, 148, 136, 0.35)',
    label: 'Bespoke Code'
  }
};

/**
 * Returns theme colors for a category id or default fallback
 */
export function getCategoryTheme(categoryId) {
  return CATEGORY_COLOR_THEMES[categoryId] || {
    primary: '#2563EB',
    secondary: '#4F46E5',
    bg: 'linear-gradient(135deg, rgba(37, 99, 235, 0.15), rgba(79, 70, 229, 0.12))',
    border: 'rgba(37, 99, 235, 0.3)',
    glow: '0 8px 24px -4px rgba(37, 99, 235, 0.35)',
    label: 'Specialized'
  };
}

/**
 * Modern, Interactive Colourful Category Icon Badge
 */
export function ColorfulCategoryBadge({ categoryId, iconName, size = 26, containerSize = 52, className = '' }) {
  const theme = getCategoryTheme(categoryId);
  const IconComponent = iconMap[iconName] || Cpu;

  return (
    <div
      className={`colorful-icon-container ${className}`}
      style={{
        width: `${containerSize}px`,
        height: `${containerSize}px`,
        borderRadius: '16px',
        background: theme.bg,
        border: `1.5px solid ${theme.border}`,
        boxShadow: theme.glow,
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: theme.primary,
        transition: 'all 0.28s cubic-bezier(0.16, 1, 0.3, 1)',
        position: 'relative',
        flexShrink: 0
      }}
    >
      <IconComponent size={size} strokeWidth={2.2} />
    </div>
  );
}

/**
 * Standard Category Icon Resolver for legacy compatibility
 */
export function CategoryIcon({ name, categoryId, size = 24, className = '' }) {
  const IconComponent = iconMap[name] || Cpu;
  const theme = getCategoryTheme(categoryId);
  return <IconComponent size={size} className={className} style={{ color: theme.primary }} />;
}

/**
 * Authentic Social Media & Platform SVG Icons
 * Using exact brand colors, gradients, and accessible vectors.
 */
export function SocialIcon({ platform, size = 20, className = '' }) {
  switch (platform?.toLowerCase()) {
    case 'whatsapp':
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
          <circle cx="12" cy="12" r="11" fill="#25D366" />
          <path
            d="M17.5 14.3c-.2-.1-1.3-.6-1.5-.7-.2-.1-.4-.1-.5.1-.2.2-.6.7-.7.9-.1.1-.3.2-.5.1-.2-.1-.9-.3-1.8-1.1-.7-.6-1.1-1.4-1.3-1.6-.1-.2 0-.4.1-.5.1-.1.2-.2.3-.4.1-.1.1-.2.2-.3 0-.1 0-.3-.1-.4s-.5-1.3-.7-1.8c-.2-.5-.4-.4-.5-.4h-.5c-.2 0-.5.1-.7.3-.2.3-.9.9-.9 2.1s.9 2.4 1 2.6c.1.2 1.8 2.8 4.4 3.9 2.6 1.1 2.6.7 3.1.7.5 0 1.5-.6 1.7-1.2.2-.6.2-1.1.1-1.2-.1-.2-.3-.2-.5-.3z"
            fill="#FFFFFF"
          />
        </svg>
      );

    case 'instagram':
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
          <defs>
            <linearGradient id="igGradient" x1="0%" y1="100%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#FD1D1D" />
              <stop offset="30%" stopColor="#E1306C" />
              <stop offset="60%" stopColor="#833AB4" />
              <stop offset="100%" stopColor="#405DE6" />
            </linearGradient>
          </defs>
          <rect x="2" y="2" width="20" height="20" rx="6" fill="url(#igGradient)" />
          <rect x="5.5" y="5.5" width="13" height="13" rx="3.5" stroke="#FFFFFF" strokeWidth="1.8" fill="none" />
          <circle cx="12" cy="12" r="3.2" stroke="#FFFFFF" strokeWidth="1.8" fill="none" />
          <circle cx="15.8" cy="8.2" r="1" fill="#FFFFFF" />
        </svg>
      );

    case 'facebook':
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
          <circle cx="12" cy="12" r="11" fill="#1877F2" />
          <path
            d="M13.5 19v-6.2h2.1l.3-2.4h-2.4V8.9c0-.7.2-1.2 1.2-1.2h1.3V5.5c-.2 0-1-.1-2-.1-2 0-3.3 1.2-3.3 3.4v1.6H8.6v2.4h2.1V19h2.8z"
            fill="#FFFFFF"
          />
        </svg>
      );

    case 'linkedin':
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
          <rect x="2" y="2" width="20" height="20" rx="4.5" fill="#0A66C2" />
          <path
            d="M7.5 10v7H5.2v-7h2.3zm.1-2.5c0 .7-.5 1.3-1.3 1.3s-1.3-.6-1.3-1.3c0-.7.5-1.3 1.3-1.3.8 0 1.3.6 1.3 1.3zM18.8 17h-2.3v-3.7c0-.9-.3-1.5-1.1-1.5-.6 0-1 .4-1.2.8v4.4H11.9v-7h2.2v1c.3-.5.9-1.2 2.1-1.2 1.5 0 2.6 1 2.6 3.1V17z"
            fill="#FFFFFF"
          />
        </svg>
      );

    case 'youtube':
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
          <rect x="2" y="4" width="20" height="16" rx="5" fill="#FF0000" />
          <path d="M10 8.5l5.5 3.5-5.5 3.5V8.5z" fill="#FFFFFF" />
        </svg>
      );

    case 'google':
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
          <path
            d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
            fill="#4285F4"
          />
          <path
            d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            fill="#34A853"
          />
          <path
            d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
            fill="#FBBC05"
          />
          <path
            d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
            fill="#EA4335"
          />
        </svg>
      );

    case 'shopify':
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
          <rect x="2" y="2" width="20" height="20" rx="4.5" fill="#95BF47" />
          <path
            d="M15.4 7.2l-.7-.2c-.3 0-.5.2-.6.4l-1.5 5.3c-.1.2-.3.3-.5.3s-.4-.1-.5-.3L10.3 8c-.1-.2-.3-.3-.5-.3-.2 0-.4.1-.5.3l-1.3 4.3-.8-2.6c-.1-.3-.3-.5-.6-.5h-.9c-.2 0-.3.2-.3.4l1.6 5.8c.2.6.7 1 1.3 1h5.8c.6 0 1.1-.4 1.3-1l1.7-6.5c.1-.4-.2-.7-.5-.7z"
            fill="#FFFFFF"
          />
        </svg>
      );

    default:
      return null;
  }
}

/**
 * Recognizable Tech Brand SVG Logos & Dynamic Lucide Icon Resolver
 */
export function TechLogo({ iconKey, size = 32, className = '' }) {
  if (iconMap[iconKey]) {
    const Icon = iconMap[iconKey];
    return <Icon size={size} className={className} />;
  }

  // Check social/platform icons
  const social = SocialIcon({ platform: iconKey, size, className });
  if (social) return social;

  switch (iconKey) {
    case 'apple':
      return (
        <svg width={size} height={size} viewBox="0 0 170 170" fill="currentColor" className={className}>
          <path d="M150.37 130.25c-2.45 5.66-5.35 10.87-8.71 15.66-4.58 6.53-8.33 11.05-11.22 13.56-4.48 4.12-9.28 6.23-14.42 6.35-3.69 0-8.14-1.05-13.32-3.18-5.19-2.12-9.97-3.17-14.34-3.17-4.58 0-9.49 1.05-14.75 3.17-5.26 2.13-9.5 3.24-12.74 3.35-4.35.13-9.16-1.9-14.42-6.08-3.69-3.04-7.67-7.85-11.96-14.43-5.77-8.81-10.37-18.9-13.8-30.27-3.44-11.37-5.16-22.18-5.16-32.42 0-14.24 3.73-26.06 11.19-35.48 7.46-9.42 16.79-14.28 27.99-14.59 4.35 0 9.29 1.15 14.81 3.44 5.53 2.29 9.38 3.51 11.57 3.65 1.95-.14 5.92-1.42 11.91-3.85 5.99-2.43 11.04-3.51 15.16-3.25 11.63.63 21.14 4.88 28.53 12.76-10.22 6.18-15.22 14.73-15 25.64.21 8.5 3.43 15.65 9.66 21.46 6.22 5.8 13.56 9.09 22.01 9.87-2.13 6.39-4.8 12.65-8.01 18.78zm-30.82-108.97c0 6.64-2.43 12.98-7.3 18.01-4.87 5.03-10.89 8.16-18.05 9.38-.21-1.04-.32-1.97-.32-2.79 0-6.66 2.76-13.34 8.27-20.03 5.51-6.69 11.98-10.42 19.41-11.19.1 1.05.15 2.11.15 3.18z" />
        </svg>
      );

    case 'android':
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="#3DDC84" className={className}>
          <path d="M17.523 15.3414c-.5511 0-.9993-.4486-.9993-.9997s.4482-.9993.9993-.9993c.551 0 .9993.4482.9993.9993.0001.5511-.4483.9997-.9993.9997m-11.046 0c-.5511 0-.9993-.4486-.9993-.9997s.4482-.9993.9993-.9993c.5511 0 .9993.4482.9993.9993 0 .5511-.4482.9997-.9993.9997m11.4045-6.02l1.9973-3.4592a.416.416 0 00-.1521-.5676.416.416 0 00-.5676.1521l-2.0223 3.503C15.5902 8.4116 13.8533 8.082 12 8.082s-3.5902.3296-5.1367.8677L4.841 5.4467a.4161.4161 0 00-.5677-.1521.4157.4157 0 00-.1521.5676l1.9973 3.4592C2.6889 11.1867.3432 14.6589 0 18.761h24c-.3432-4.1021-2.6889-7.5743-6.1185-9.4396" />
        </svg>
      );

    case 'flutter':
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
          <path d="M14.314 0L2.3 12 6 15.7 21.714 0h-7.4z" fill="#02569B" />
          <path d="M14.286 11.486L7.9 17.871l3.7 3.7 10.114-10.085h-7.428z" fill="#0175C2" />
          <path d="M7.9 17.871l3.686-3.685 3.7 3.7-3.686 3.686-3.7-3.7z" fill="#29B6F6" />
        </svg>
      );

    case 'react':
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
          <ellipse cx="12" cy="12" rx="10" ry="4.5" stroke="#61DAFB" strokeWidth="1.5" />
          <ellipse cx="12" cy="12" rx="10" ry="4.5" stroke="#61DAFB" strokeWidth="1.5" transform="rotate(60 12 12)" />
          <ellipse cx="12" cy="12" rx="10" ry="4.5" stroke="#61DAFB" strokeWidth="1.5" transform="rotate(120 12 12)" />
          <circle cx="12" cy="12" r="2" fill="#61DAFB" />
        </svg>
      );

    case 'figma':
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
          <path d="M8 24c2.2 0 4-1.8 4-4v-4H8c-2.2 0-4 1.8-4 4s1.8 4 4 4z" fill="#0ACF83" />
          <path d="M4 12c0-2.2 1.8-4 4-4h4v8H8c-2.2 0-4-1.8-4-4z" fill="#A259FF" />
          <path d="M4 4c0-2.2 1.8-4 4-4h4v8H8C5.8 8 4 6.2 4 4z" fill="#F24E1E" />
          <path d="M12 0h4c2.2 0 4 1.8 4 4s-1.8 4-4 4h-4V0z" fill="#FF7262" />
          <circle cx="16" cy="12" r="4" fill="#1ABCFE" />
        </svg>
      );

    default:
      return (
        <div
          style={{
            width: size,
            height: size,
            borderRadius: '10px',
            background: 'linear-gradient(135deg, #0A2540 0%, #2563EB 100%)',
            display: 'grid',
            placeItems: 'center',
            color: '#FFFFFF',
            fontSize: size * 0.45,
            fontWeight: 'bold'
          }}
          className={className}
        >
          ✦
        </div>
      );
  }
}
