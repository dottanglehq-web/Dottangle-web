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
  Compass
} from 'lucide-react';

const iconMap = {
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
  Compass
};

/**
 * Recognizable Tech Brand SVG Logos & Dynamic Lucide Icon Resolver
 */
export function TechLogo({ iconKey, size = 32, className = '' }) {
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
          <ellipse cx="12" cy="12" rx="11" ry="4.2" stroke="#00D8FF" strokeWidth="1.5" transform="rotate(30 12 12)" />
          <ellipse cx="12" cy="12" rx="11" ry="4.2" stroke="#00D8FF" strokeWidth="1.5" transform="rotate(90 12 12)" />
          <ellipse cx="12" cy="12" rx="11" ry="4.2" stroke="#00D8FF" strokeWidth="1.5" transform="rotate(150 12 12)" />
          <circle cx="12" cy="12" r="2" fill="#00D8FF" />
        </svg>
      );

    case 'kotlin':
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
          <path d="M24 24H0V0h24L12 12Z" fill="url(#kotlin-grad)" />
          <defs>
            <linearGradient id="kotlin-grad" x1="24" y1="0" x2="0" y2="24" gradientUnits="userSpaceOnUse">
              <stop stopColor="#E4485D" />
              <stop offset="0.5" stopColor="#C711E1" />
              <stop offset="1" stopColor="#7F52FF" />
            </linearGradient>
          </defs>
        </svg>
      );

    case 'swift':
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="#F05138" className={className}>
          <path d="M21.9 13.4c-.1.2-.2.4-.3.6-1.5 2.6-3.8 4.7-6.5 6.1 4.5-2.2 7.7-6.5 8.1-11.6-.2.4-.4.8-.7 1.2-1.9 2.5-4.4 4.3-7.3 5.4 3-1.6 5.4-4.1 6.9-7.2.2-.4.3-.8.4-1.2C17.4 8.7 10.9 9.3 5.7 13.9c2.3-2 5.1-3.3 8.1-3.8-3.4.7-6.4 2.6-8.5 5.3-1.6 2-2.5 4.4-2.8 7 1.3-.9 2.7-1.6 4.2-2.1C3 22.3 1.1 20 0 17.3c1.7 4 4.8 7 8.8 8.6 3.2 1.3 6.8 1.4 10.1.4 2.8-.8 5.4-2.4 7.4-4.6-1.5-.7-3-1.6-4.4-2.7 0 0 0 0 0 0 .1-.2.2-.4.3-.6.1-.2.2-.4.3-.6z" />
        </svg>
      );

    case 'openai':
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="#10A37F" className={className}>
          <path d="M22.28 10.03a6.04 6.04 0 00-.51-4.88 6.13 6.13 0 00-6.43-2.92A6.05 6.05 0 0011.02.7a6.13 6.13 0 00-5.83 4.19 6.05 6.05 0 00-3.99 2.9 6.14 6.14 0 00.7 7.02 6.05 6.05 0 00.5 4.88 6.14 6.14 0 006.44 2.92A6.06 6.06 0 0013 23.3a6.13 6.13 0 005.84-4.2 6.05 6.05 0 003.98-2.9 6.13 6.13 0 00-.54-6.17zM13 21.68a4.57 4.57 0 01-2.91-1.04l.15-.08 4.84-2.79a.77.77 0 00.39-.67v-6.84l2.06 1.19a.06.06 0 01.03.05v5.62A4.58 4.58 0 0113 21.68zm-8.8-4.2a4.58 4.58 0 01-.6-3.05l.15.09 4.84 2.8a.77.77 0 00.77 0l5.93-3.42v2.38a.07.07 0 01-.03.06l-4.87 2.81a4.59 4.59 0 01-6.19-1.67zm-1.1-9.92a4.58 4.58 0 012.31-2l-.15.09-4.84 2.8a.78.78 0 00-.38.67v6.83L2.08 17a.06.06 0 01-.03-.05v-5.62a4.58 4.58 0 012.05-3.77zm14.8 3.5l-5.93-3.42v-2.38a.07.07 0 01.03-.06l4.87-2.81a4.59 4.59 0 016.19 1.67 4.58 4.58 0 01.6 3.05l-.15-.09-4.84-2.8a.77.77 0 00-.77 0zm2.2 6.42l-.15-.09-4.84-2.8a.78.78 0 00-.39 0l-5.92 3.42V14.2a.07.07 0 01.03-.06l4.87-2.81a4.59 4.59 0 016.19 1.67 4.58 4.58 0 01.21 4.47zM9.5 13.72l2.5-1.44 2.5 1.44v2.88l-2.5 1.44-2.5-1.44z" />
        </svg>
      );

    case 'claude':
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="#D97706" className={className}>
          <circle cx="12" cy="12" r="10" fill="#F59E0B" opacity="0.2" />
          <path d="M12 4L13.8 9.5H19.5L14.9 12.9L16.6 18.4L12 15L7.4 18.4L9.1 12.9L4.5 9.5H10.2L12 4Z" fill="#D97706" />
        </svg>
      );

    case 'gemini':
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
          <path d="M12 0C12 6.627 6.627 12 0 12c6.627 0 12 5.373 12 12 0-6.627 5.373-12 12-12-6.627 0-12-5.373-12-12Z" fill="url(#gemini-grad)" />
          <defs>
            <linearGradient id="gemini-grad" x1="0" y1="0" x2="24" y2="24" gradientUnits="userSpaceOnUse">
              <stop stopColor="#1BA1E2" />
              <stop offset="0.5" stopColor="#7C3AED" />
              <stop offset="1" stopColor="#F43F5E" />
            </linearGradient>
          </defs>
        </svg>
      );

    case 'nextjs':
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="#000000" className={className}>
          <circle cx="12" cy="12" r="11" fill="#000000" />
          <path d="M14.5 7.5L8.5 16.5H10.5L12 14.2L15.5 16.5H17.5L14.5 7.5Z" fill="#FFFFFF" />
        </svg>
      );

    case 'shopify':
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
          <path d="M19.7 6.5s-1.5-.1-1.5-.1-1.2-1.1-1.3-1.3c-.1-.1-.5-.1-.6-.1-.02 0-.5.1-1.1.3-.7-1.7-1.7-3.1-2.9-3.1-.1 0-.3 0-.4.1-1 .3-1.6 1.6-2 3.5-.6.2-1.1.3-1.1.3-.3.1-.3.1-.4.5-.1.3-2.3 18.1-2.3 18.1l11.3 2.1 7.2-1.7s-2.1-18.3-2.1-18.3zm-5.7-2.8c.7.2 1.3 1.4 1.7 2.9l-3.1.9c.3-1.8.9-3.7 1.4-3.8zm-2.1 13.3c-.2.1-.5.1-.7.1-1.2 0-1.8-.8-1.8-1.8 0-1.4 1.1-2.4 2.8-2.5v-.3c0-.7-.4-1-1.1-1-.6 0-1.1.2-1.4.4l-.3-1c.5-.3 1.2-.5 1.9-.5 1.5 0 2.3.8 2.3 2.1v3.7c0 .6.1 1.1.2 1.5l-1.3.2c-.1-.3-.2-.7-.3-.9zm.3-3.2c-.9.1-1.4.5-1.4 1.3 0 .5.3.9.9.9.1 0 .3 0 .5-.1v-2.1z" fill="#95BF47" />
        </svg>
      );

    case 'wordpress':
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="#0073AA" className={className}>
          <circle cx="12" cy="12" r="11" fill="#0073AA" />
          <path d="M4 12c0 3.4 2.1 6.3 5.2 7.5L5.1 8.8C4.4 9.7 4 10.8 4 12zm11.6-.4c0-1-.4-1.7-.7-2.2-.5-.7-.9-1.3-.9-2 0-.7.6-1.5 1.5-1.5.1 0 .1 0 .2.01-1.2-.9-2.5-1.3-3.8-1.3-2.5 0-4.7 1.2-6.1 3.1l4.2 11.5c.2.1.5.1.7.1.9 0 1.5-.1 1.5-.1l-.2-.9s-.5.1-1 .1l1.9-5.7 1.7 4.9c.5-.1.9-.3 1.4-.5l-2.4-6.8zm3.7-3.2c.4 1.1.6 2.3.6 3.6 0 2.5-1.1 4.7-2.9 6.2l2.7-7.8c.1-.7.2-1.3.2-2h-.6zM12 20c-.5 0-1-.1-1.5-.2l-3.4-9.7c-.2-.7-.5-1.3-.7-1.8 1.5-1.6 3.7-2.6 6.2-2.6 2.3 0 4.3.9 5.9 2.3l-4.9 11.9h-1.6z" fill="#FFFFFF" />
        </svg>
      );

    case 'aws':
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="#FF9900" className={className}>
          <path d="M6.3 12.3c0-1.8 1.1-2.8 2.9-2.8 1.1 0 2.1.4 2.7.9V8c0-1.7-.9-2.6-2.7-2.6-1 0-2.1.4-2.8.9L5.8 5C6.9 4.3 8.3 4 9.6 4c2.6 0 4.3 1.4 4.3 4.2v6.6h-1.4l-.2-1c-.6.6-1.6 1.2-2.8 1.2-1.9 0-3.2-1.2-3.2-2.7zm5.5-.3v-1.1c-.5-.4-1.2-.6-2-.6-1.1 0-1.7.5-1.7 1.4 0 .9.6 1.4 1.7 1.4.9 0 1.5-.4 2-1.1zM18.8 14.8l-1.3-4.9h-.1l-1.3 4.9h-1.6L12.7 6.4h1.7l1.1 5.3h.1l1.3-5.3h1.3l1.3 5.3h.1l1.1-5.3h1.7l-1.8 8.4h-1.7z" />
          <path d="M21.7 18.2C18.9 20.3 15.3 21.4 11.7 21.4c-4.9 0-9.6-1.9-13.1-5.2-.2-.2-.2-.4 0-.6.2-.2.5-.1.7.1 3.2 3 7.6 4.7 12.3 4.7 3.4 0 6.7-1 9.4-2.8.3-.2.6-.1.8.1.1.2 0 .5-.1.7zM22.6 16.9l-2.1-.6c-.2-.1-.3-.2-.2-.4.1-.2.2-.2.4-.2l1.6.4.5-1.5c.1-.2.2-.3.4-.2.2.1.3.2.2.4l-.7 2.1c-.1.1-.1.2-.2.2z" fill="#FF9900" />
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
      // Fallback clean gradient generic badge
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

/**
 * Category Icon Resolver using Lucide components
 */
export function CategoryIcon({ name, size = 20, className = '' }) {
  const IconComponent = iconMap[name] || Cpu;
  return <IconComponent size={size} className={className} />;
}
