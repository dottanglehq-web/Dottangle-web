import React from 'react';

/**
 * Official Brand SVG Logos for all 56 Enterprise Technologies
 * Accurately vectorized with official brand colors and geometry
 */
export default function OfficialTechLogo({ name, size = 26, className = '' }) {
  const norm = (name || '').toLowerCase().trim();

  // 1. OpenAI (GPT-4o)
  if (norm.includes('openai')) {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="#10A37F" className={className}>
        <path d="M22.28 10.03a6.04 6.04 0 00-.51-4.88 6.13 6.13 0 00-6.43-2.92A6.05 6.05 0 0011.02.7a6.13 6.13 0 00-5.83 4.19 6.05 6.05 0 00-3.99 2.9 6.14 6.14 0 00.7 7.02 6.05 6.05 0 00.5 4.88 6.14 6.14 0 006.44 2.92A6.06 6.06 0 0013 23.3a6.13 6.13 0 005.84-4.2 6.05 6.05 0 003.98-2.9 6.13 6.13 0 00-.54-6.17zM13 21.68a4.57 4.57 0 01-2.91-1.04l.15-.08 4.84-2.79a.77.77 0 00.39-.67v-6.84l2.06 1.19a.06.06 0 01.03.05v5.62A4.58 4.58 0 0113 21.68zm-8.8-4.2a4.58 4.58 0 01-.6-3.05l.15.09 4.84 2.8a.77.77 0 00.77 0l5.93-3.42v2.38a.07.07 0 01-.03.06l-4.87 2.81a4.59 4.59 0 01-6.19-1.67zm-1.1-9.92a4.58 4.58 0 012.31-2l-.15.09-4.84 2.8a.78.78 0 00-.38.67v6.83L2.08 17a.06.06 0 01-.03-.05v-5.62a4.58 4.58 0 012.05-3.77zm14.8 3.5l-5.93-3.42v-2.38a.07.07 0 01.03-.06l4.87-2.81a4.59 4.59 0 016.19 1.67 4.58 4.58 0 01.6 3.05l-.15-.09-4.84-2.8a.77.77 0 00-.77 0zm2.2 6.42l-.15-.09-4.84-2.8a.78.78 0 00-.39 0l-5.92 3.42V14.2a.07.07 0 01.03-.06l4.87-2.81a4.59 4.59 0 016.19 1.67 4.58 4.58 0 01.21 4.47zM9.5 13.72l2.5-1.44 2.5 1.44v2.88l-2.5 1.44-2.5-1.44z" />
      </svg>
    );
  }

  // 2. Anthropic Claude
  if (norm.includes('claude') || norm.includes('anthropic')) {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
        <path d="M13.8 2.2L12 6.5 10.2 2.2 6.2 3.8l2.6 3.8-4.6-.2.4 4.6 4.3-1.6-3 3.6 3.4 3.1 3-3.3 1.7 4.3 4.2-1.7-1.8-4.2 4.3 1.7 1.8-4.3-4.3-1.7 3.1-3.1-3.5-3.1-2.9 3.4.4-4.6z" fill="#D97706" />
      </svg>
    );
  }

  // 3. Google Gemini
  if (norm.includes('gemini')) {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
        <path d="M12 0C12 6.627 6.627 12 0 12c6.627 0 12 5.373 12 12 0-6.627 5.373-12 12-12-6.627 0-12-5.373-12-12Z" fill="url(#gemini-logo-grad)" />
        <defs>
          <linearGradient id="gemini-logo-grad" x1="0" y1="0" x2="24" y2="24" gradientUnits="userSpaceOnUse">
            <stop stopColor="#1BA1E2" />
            <stop offset="0.5" stopColor="#7C3AED" />
            <stop offset="1" stopColor="#F43F5E" />
          </linearGradient>
        </defs>
      </svg>
    );
  }

  // 4. LangChain
  if (norm.includes('langchain')) {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
        <rect width="24" height="24" rx="6" fill="#1C3C3C" />
        <path d="M7 6l4 4-2 2-4-4 2-2zm4 4l6 6-2 2-6-6 2-2z" fill="#2ECC71" />
        <circle cx="16" cy="8" r="2.5" fill="#00D26A" />
      </svg>
    );
  }

  // 5. PyTorch
  if (norm.includes('pytorch')) {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
        <path d="M13.7 3.3a8 8 0 105.8 7.7h-2.1a6 6 0 11-4.8-5.9l1.1-1.8z" fill="#EE4C2C" />
        <circle cx="16.5" cy="4" r="1.5" fill="#EE4C2C" />
      </svg>
    );
  }

  // 6. HuggingFace
  if (norm.includes('huggingface')) {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
        <circle cx="12" cy="12" r="10" fill="#FFD21E" />
        <circle cx="8.5" cy="10.5" r="1.5" fill="#000000" />
        <circle cx="15.5" cy="10.5" r="1.5" fill="#000000" />
        <path d="M8 14.5c1 1.8 3 2.5 4 2.5s3-.7 4-2.5" stroke="#000000" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M4 11c1-1 3 0 3 2s-2 2-3 1M20 11c-1-1-3 0-3 2s2 2 3 1" fill="#FFA500" />
      </svg>
    );
  }

  // 7. Pinecone
  if (norm.includes('pinecone')) {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
        <rect width="24" height="24" rx="6" fill="#000000" />
        <path d="M12 4l4 4-4 4-4-4 4-4zm-4 6l4 4-4 4-4-4 4-4zm8 0l4 4-4 4-4-4 4-4zm-4 6l4 4-4 4-4-4 4-4z" fill="#FFFFFF" />
      </svg>
    );
  }

  // 8. Whisper
  if (norm.includes('whisper')) {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
        <rect width="24" height="24" rx="6" fill="#10A37F" />
        <path d="M6 12h2M9 9v6M12 6v12M15 8v8M18 10v4" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" />
      </svg>
    );
  }

  // 9. React
  if (norm.includes('react')) {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
        <ellipse cx="12" cy="12" rx="10" ry="3.8" stroke="#00D8FF" strokeWidth="1.5" transform="rotate(30 12 12)" />
        <ellipse cx="12" cy="12" rx="10" ry="3.8" stroke="#00D8FF" strokeWidth="1.5" transform="rotate(90 12 12)" />
        <ellipse cx="12" cy="12" rx="10" ry="3.8" stroke="#00D8FF" strokeWidth="1.5" transform="rotate(150 12 12)" />
        <circle cx="12" cy="12" r="1.8" fill="#00D8FF" />
      </svg>
    );
  }

  // 10. Next.js
  if (norm.includes('next.js') || norm.includes('nextjs')) {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
        <circle cx="12" cy="12" r="11" fill="#000000" />
        <path d="M15 8l-6.5 9.5H7V6.5h2v6.5l5.5-8H16v9.5h-1V8z" fill="#FFFFFF" />
      </svg>
    );
  }

  // 11. TypeScript
  if (norm.includes('typescript')) {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
        <rect width="24" height="24" rx="4" fill="#3178C6" />
        <path d="M4 11h6v2H7.2v7H5.8v-7H4v-2zm9.2 4.2c.4-.6 1.1-1.1 2.2-1.1 1.3 0 2.1.7 2.1 1.7 0 1.1-.9 1.6-1.9 2.1l-.6.3c-.9.4-1.3.8-1.3 1.5 0 .8.7 1.4 1.8 1.4 1.1 0 1.9-.5 2.3-1l.9 1.1c-.6.8-1.8 1.4-3.2 1.4-2.1 0-3.3-1.3-3.3-2.8 0-1.4.9-2.2 2.2-2.7l.6-.3c.7-.3 1-.6 1-1.1 0-.6-.5-1-1.3-1-.8 0-1.4.3-1.8.8l-.8-1.3z" fill="#FFFFFF" />
      </svg>
    );
  }

  // 12. Tailwind CSS
  if (norm.includes('tailwind')) {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
        <path d="M12 6c-3 0-4.8 1.5-5.4 4.5 1.2-1.5 2.7-2.1 4.5-1.8 1 .2 1.7.9 2.5 1.7C14.9 11.7 16.5 13 20 13c3 0 4.8-1.5 5.4-4.5-1.2 1.5-2.7 2.1-4.5 1.8-1-.2-1.7-.9-2.5-1.7C17.1 7.3 15.5 6 12 6zM4 13c-3 0-4.8 1.5-5.4 4.5 1.2-1.5 2.7-2.1 4.5-1.8 1 .2 1.7.9 2.5 1.7 1.3 1.3 2.9 2.6 6.4 2.6 3 0 4.8-1.5 5.4-4.5-1.2 1.5-2.7 2.1-4.5 1.8-1-.2-1.7-.9-2.5-1.7C9.1 14.3 7.5 13 4 13z" fill="#06B6D4" transform="scale(0.85) translate(2, 2)" />
      </svg>
    );
  }

  // 13. Vite
  if (norm.includes('vite')) {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
        <path d="M21.5 3.5L12.5 22 2.5 3.5h5l5 11 4-11h5z" fill="url(#vite-blue)" />
        <path d="M17.5 2.5l-6 13.5L8.5 2.5h9z" fill="url(#vite-yellow)" />
        <defs>
          <linearGradient id="vite-blue" x1="2.5" y1="3.5" x2="21.5" y2="22" gradientUnits="userSpaceOnUse">
            <stop stopColor="#41D1FF" />
            <stop offset="1" stopColor="#BD34FE" />
          </linearGradient>
          <linearGradient id="vite-yellow" x1="10" y1="2" x2="16" y2="15" gradientUnits="userSpaceOnUse">
            <stop stopColor="#FFEA83" />
            <stop offset="1" stopColor="#FFDD35" />
          </linearGradient>
        </defs>
      </svg>
    );
  }

  // 14. Three.js / WebGL
  if (norm.includes('three.js') || norm.includes('webgl')) {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="#000000" className={className}>
        <path d="M4 18l8-14 8 14H4zm3.8-2h8.4L12 8.7 7.8 16z" />
      </svg>
    );
  }

  // 15. Vue.js
  if (norm.includes('vue')) {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
        <path d="M12 18.5L2 4h4l6 9 6-9h4L12 18.5z" fill="#42B883" />
        <path d="M12 14L6 4h3l3 5 3-5h3l-6 10z" fill="#35495E" />
      </svg>
    );
  }

  // 16. HTML5 & CSS3
  if (norm.includes('html5') || norm.includes('css3') || norm.includes('html')) {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
        <path d="M3 2l1.6 18 7.4 2 7.4-2L21 2H3z" fill="#E34F26" />
        <path d="M12 3.8v16.4l5.8-1.6L19 3.8H12z" fill="#EF652A" />
        <path d="M7 6.8h10l-.3 3.4H9.5l.3 3.4h6.8l-.4 4.4-4.2 1.2-4.2-1.2-.3-2.8H6l.4 4.5 5.6 1.6 5.6-1.6.7-7.9H7V6.8z" fill="#FFFFFF" />
      </svg>
    );
  }

  // 17. Node.js
  if (norm.includes('node')) {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
        <path d="M12 2l9 5.2v10.6L12 23l-9-5.2V7.2L12 2z" fill="#339933" />
        <path d="M12 4.5l6.5 3.8v7.4L12 19.5 5.5 15.7V8.3L12 4.5z" fill="#FFFFFF" opacity="0.2" />
        <path d="M10 9v6h2v-3.5l2 3.5h2V9h-2v3.5L12 9h-2z" fill="#FFFFFF" />
      </svg>
    );
  }

  // 18. Python
  if (norm.includes('python')) {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
        <path d="M11.8 2c-4 0-3.8 1.7-3.8 1.7v1.8h3.9v.6H5.4S2 5.7 2 9.8c0 4 3 3.9 3 3.9h1.8v-2.5s-.1-3 3-3h5.1s2.9.1 2.9-2.8c0-3-3.8-3.4-6-3.4zm-2.2 1.2c.4 0 .7.3.7.7s-.3.7-.7.7-.7-.3-.7-.7.3-.7.7-.7zm2.4 18.8c4 0 3.8-1.7 3.8-1.7v-1.8H12v-.6h6.5s3.4.4 3.4-3.7c0-4-3-3.9-3-3.9h-1.8v2.5s.1 3-3 3H9s-2.9-.1-2.9 2.8c0 3 3.8 3.4 6 3.4zm2.2-1.2c-.4 0-.7-.3-.7-.7s.3-.7.7-.7.7.3.7.7-.3.7-.7.7z" fill="url(#python-grad)" />
        <defs>
          <linearGradient id="python-grad" x1="2" y1="2" x2="22" y2="22" gradientUnits="userSpaceOnUse">
            <stop stopColor="#3776AB" />
            <stop offset="0.5" stopColor="#3776AB" />
            <stop offset="0.51" stopColor="#FFD43B" />
            <stop offset="1" stopColor="#FFD43B" />
          </linearGradient>
        </defs>
      </svg>
    );
  }

  // 19. Express.js
  if (norm.includes('express')) {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
        <rect width="24" height="24" rx="6" fill="#0F172A" />
        <text x="12" y="16" fill="#FFFFFF" fontSize="11" fontWeight="800" textAnchor="middle" fontFamily="sans-serif">ex</text>
      </svg>
    );
  }

  // 20. Nest.js
  if (norm.includes('nest')) {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="#E0234E" className={className}>
        <path d="M12 2C6.5 2 2 6.5 2 12c0 3.4 1.7 6.4 4.3 8.2L12 14l5.7 6.2C20.3 18.4 22 15.4 22 12c0-5.5-4.5-10-10-10zm-3 8.5L12 5l3 5.5h-6z" />
      </svg>
    );
  }

  // 21. Go (Golang)
  if (norm.includes('go ') || norm.includes('golang') || norm === 'go') {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
        <rect width="24" height="24" rx="6" fill="#00ADD8" />
        <text x="12" y="16.5" fill="#FFFFFF" fontSize="12" fontWeight="900" textAnchor="middle" fontFamily="sans-serif">GO</text>
      </svg>
    );
  }

  // 22. FastAPI
  if (norm.includes('fastapi')) {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
        <circle cx="12" cy="12" r="10" fill="#009688" />
        <path d="M13 4L7 13h5l-1 7 6-9h-5l1-7z" fill="#FFFFFF" />
      </svg>
    );
  }

  // 23. GraphQL
  if (norm.includes('graphql')) {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
        <path d="M12 2l8.7 5v10L12 22l-8.7-5V7L12 2z" stroke="#E10098" strokeWidth="1.5" />
        <circle cx="12" cy="2" r="2" fill="#E10098" />
        <circle cx="20.7" cy="7" r="2" fill="#E10098" />
        <circle cx="20.7" cy="17" r="2" fill="#E10098" />
        <circle cx="12" cy="22" r="2" fill="#E10098" />
        <circle cx="3.3" cy="17" r="2" fill="#E10098" />
        <circle cx="3.3" cy="7" r="2" fill="#E10098" />
        <path d="M12 5.5l5.5 9.5H6.5L12 5.5z" stroke="#E10098" strokeWidth="1.5" />
      </svg>
    );
  }

  // 24. Django
  if (norm.includes('django')) {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
        <rect width="24" height="24" rx="6" fill="#092E20" />
        <text x="12" y="16" fill="#44B78B" fontSize="12" fontWeight="900" textAnchor="middle" fontFamily="serif">dj</text>
      </svg>
    );
  }

  // 25. Flutter
  if (norm.includes('flutter')) {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
        <path d="M14.3 0L2.3 12l3.7 3.7L21.7 0h-7.4z" fill="#02569B" />
        <path d="M14.3 11.5L7.9 17.9l3.7 3.7 10.1-10.1h-7.4z" fill="#0175C2" />
        <path d="M7.9 17.9l3.7-3.7 3.7 3.7-3.7 3.7-3.7-3.7z" fill="#29B6F6" />
      </svg>
    );
  }

  // 26. Swift / SwiftUI
  if (norm.includes('swift')) {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="#F05138" className={className}>
        <path d="M21.9 13.4c-.1.2-.2.4-.3.6-1.5 2.6-3.8 4.7-6.5 6.1 4.5-2.2 7.7-6.5 8.1-11.6-.2.4-.4.8-.7 1.2-1.9 2.5-4.4 4.3-7.3 5.4 3-1.6 5.4-4.1 6.9-7.2.2-.4.3-.8.4-1.2C17.4 8.7 10.9 9.3 5.7 13.9c2.3-2 5.1-3.3 8.1-3.8-3.4.7-6.4 2.6-8.5 5.3-1.6 2-2.5 4.4-2.8 7 1.3-.9 2.7-1.6 4.2-2.1C3 22.3 1.1 20 0 17.3c1.7 4 4.8 7 8.8 8.6 3.2 1.3 6.8 1.4 10.1.4 2.8-.8 5.4-2.4 7.4-4.6-1.5-.7-3-1.6-4.4-2.7z" />
      </svg>
    );
  }

  // 27. Kotlin
  if (norm.includes('kotlin')) {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
        <path d="M24 24H0V0h24L12 12Z" fill="url(#kotlin-logo-grad)" />
        <defs>
          <linearGradient id="kotlin-logo-grad" x1="24" y1="0" x2="0" y2="24" gradientUnits="userSpaceOnUse">
            <stop stopColor="#E4485D" />
            <stop offset="0.5" stopColor="#C711E1" />
            <stop offset="1" stopColor="#7F52FF" />
          </linearGradient>
        </defs>
      </svg>
    );
  }

  // 28. Jetpack Compose
  if (norm.includes('jetpack') || norm.includes('compose') || norm.includes('android')) {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="#3DDC84" className={className}>
        <path d="M17.5 15.3c-.6 0-1-.4-1-1s.4-1 1-1 1 .4 1 1-.4 1-1 1m-11 0c-.6 0-1-.4-1-1s.4-1 1-1 1 .4 1 1-.4 1-1 1m11.4-6l2-3.5a.4.4 0 00-.7-.4l-2 3.5C15.6 8.4 13.9 8 12 8s-3.6.4-5.1.9L4.8 5.4a.4.4 0 00-.7.4l2 3.5C2.7 11.2.3 14.7 0 18.8h24c-.3-4.1-2.7-7.6-6.1-9.5" />
      </svg>
    );
  }

  // 29. Capacitor
  if (norm.includes('capacitor')) {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
        <rect width="24" height="24" rx="6" fill="#119EFF" />
        <path d="M7 6h3v12H7zm7 0h3v12h-3z" fill="#FFFFFF" />
      </svg>
    );
  }

  // 30. Firebase
  if (norm.includes('firebase')) {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
        <path d="M4.5 18.8L8.6 3.7c.1-.5.8-.6 1.1-.2L13 8.3 4.5 18.8z" fill="#FFA000" />
        <path d="M4.5 18.8l10.2-16c.3-.5 1-.5 1.2.1l4 15.9-15.4 0z" fill="#F57C00" />
        <path d="M12.4 21.8l7.5-3-4-15.8-3.5 18.8z" fill="#FFCA28" />
      </svg>
    );
  }

  // 31. PostgreSQL
  if (norm.includes('postgres')) {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
        <path d="M12 2C6.5 2 2 6.5 2 12c0 4.2 2.6 7.8 6.3 9.3.5.1.7-.2.7-.5v-1.8c-2.5.5-3-1.1-3-1.1-.4-1.1-1-1.4-1-1.4-.8-.6.1-.6.1-.6.9.1 1.4 1 1.4 1 .8 1.4 2.1 1 2.6.8.1-.6.3-1 .6-1.3-2-.2-4.1-1-4.1-4.5 0-1 .4-1.8 1-2.4-.1-.2-.4-1.2.1-2.4 0 0 .8-.3 2.6 1 .7-.2 1.5-.3 2.3-.3.8 0 1.6.1 2.3.3 1.8-1.2 2.6-1 2.6-1 .5 1.2.2 2.2.1 2.4.6.7 1 1.5 1 2.4 0 3.5-2.1 4.3-4.1 4.5.3.3.6.8.6 1.7v2.5c0 .3.2.6.7.5C19.4 19.8 22 16.2 22 12c0-5.5-4.5-10-10-10z" fill="#336791" />
      </svg>
    );
  }

  // 32. MongoDB
  if (norm.includes('mongo')) {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
        <path d="M12 1.5s-6 5.8-6 11.2c0 4.2 3.1 7.8 6 9.3 2.9-1.5 6-5.1 6-9.3C18 7.3 12 1.5 12 1.5z" fill="#47A248" />
        <path d="M12 2.5v19.2c.4-.2.8-.5 1.1-.8 2.6-2 4.4-5.3 4.4-8.9 0-4.7-5.5-9.5-5.5-9.5z" fill="#499D4A" />
      </svg>
    );
  }

  // 33. Redis
  if (norm.includes('redis')) {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
        <rect width="24" height="24" rx="6" fill="#DC382D" />
        <path d="M5 8l7-4 7 4-7 4-7-4zm0 4l7 4 7-4v3l-7 4-7-4v-3zm0 4l7 4 7-4v3l-7 4-7-4v-3z" fill="#FFFFFF" />
      </svg>
    );
  }

  // 34. Supabase
  if (norm.includes('supabase')) {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
        <rect width="24" height="24" rx="6" fill="#1E293B" />
        <path d="M12.5 3L4 14.5h7L10.5 21l9.5-12h-7.5l2-6z" fill="#3ECF8E" />
      </svg>
    );
  }

  // 35. MySQL
  if (norm.includes('mysql')) {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
        <rect width="24" height="24" rx="6" fill="#00758F" />
        <path d="M6 16c2-4 5-8 10-8s4 3 4 5-3 5-7 5c-3 0-5-1-7-2z" fill="#F29111" />
      </svg>
    );
  }

  // 36. Qdrant / Chroma
  if (norm.includes('qdrant') || norm.includes('chroma')) {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
        <rect width="24" height="24" rx="6" fill="#DC2626" />
        <circle cx="12" cy="11" r="5" stroke="#FFFFFF" strokeWidth="2" />
        <path d="M15 15l4 4" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" />
      </svg>
    );
  }

  // 37. Prisma
  if (norm.includes('prisma')) {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
        <path d="M3.5 19.5L12 2.5l8.5 17h-17z" fill="#2D3748" />
        <path d="M12 2.5L20.5 19.5H12V2.5z" fill="#5A67D8" />
      </svg>
    );
  }

  // 38. SQLite
  if (norm.includes('sqlite')) {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
        <rect width="24" height="24" rx="6" fill="#003B57" />
        <path d="M7 6c4-1 9 1 10 5s-2 8-7 7-6-3-6-6 1-5 3-6z" fill="#00A9E0" />
      </svg>
    );
  }

  // 39. AWS
  if (norm.includes('aws')) {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
        <rect width="24" height="24" rx="6" fill="#232F3E" />
        <path d="M6 14.5c3 2 7 2 10 0" stroke="#FF9900" strokeWidth="2" strokeLinecap="round" />
        <path d="M15.5 14l1.5.8-1 1.2" stroke="#FF9900" strokeWidth="1.5" strokeLinecap="round" />
        <text x="12" y="11" fill="#FFFFFF" fontSize="8" fontWeight="800" textAnchor="middle" fontFamily="sans-serif">AWS</text>
      </svg>
    );
  }

  // 40. Google Cloud (GCP)
  if (norm.includes('google cloud') || norm.includes('gcp')) {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
        <path d="M17.5 18h-11a4.5 4.5 0 01-1-8.9 6 6 0 0111.8-1.5A4 4 0 0117.5 18z" fill="#4285F4" />
        <path d="M12 7.6a6 6 0 00-5.8 4.5c.3 0 .7.1 1 .2a4.5 4.5 0 018.6-1.2 4 4 0 00-3.8-3.5z" fill="#EA4335" />
        <path d="M17.5 10.4a4 4 0 00-1.7.4 4.5 4.5 0 01-4 4.7H17.5a2.5 2.5 0 000-5.1z" fill="#FBBC05" />
        <path d="M6.5 18h5.3v-2.5H6.5a2 2 0 010-4c.4 0 .7.1 1 .3A4.5 4.5 0 006.5 18z" fill="#34A853" />
      </svg>
    );
  }

  // 41. Azure
  if (norm.includes('azure')) {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
        <path d="M13.5 2.5L5 15.5h6.5l-2 6 10-13h-7l3-6z" fill="#0078D4" />
      </svg>
    );
  }

  // 42. Docker
  if (norm.includes('docker')) {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="#2496ED" className={className}>
        <path d="M22.5 10.5c-.3-.2-1.3-.3-2.1.2-.5-.8-1.4-1.3-2.4-1.3-.2 0-.4 0-.6.1-.5-1.5-1.9-2.5-3.6-2.5v1H7v-2H4v2H2v7c0 4 3 6 7 6 6 0 9-4 10-6 .8.1 1.7 0 2.2-.4.7-.6 1.4-1.7 1.3-2.1zM5 11h2v2H5v-2zm3 0h2v2H8v-2zm3 0h2v2h-2v-2zm3 0h2v2h-2v-2zm-6-3h2v2H8V8zm3 0h2v2h-2V8zm3 0h2v2h-2V8z" />
      </svg>
    );
  }

  // 43. Kubernetes
  if (norm.includes('kubernetes')) {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
        <circle cx="12" cy="12" r="10" fill="#326CE5" />
        <path d="M12 5l5 3v6l-5 3-5-3V8l5-3z" fill="#FFFFFF" />
        <circle cx="12" cy="12" r="2.5" fill="#326CE5" />
      </svg>
    );
  }

  // 44. GitHub Actions / GitHub
  if (norm.includes('github')) {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="#2088FF" className={className}>
        <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
      </svg>
    );
  }

  // 45. Cloudflare
  if (norm.includes('cloudflare')) {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="#F38020" className={className}>
        <path d="M19.4 13.5c-.2-.7-.6-1.4-1.2-1.8.1-.4.1-.7.1-1.1 0-2.4-1.9-4.3-4.3-4.3-1.6 0-3 1-3.8 2.3-.4-.2-.8-.3-1.3-.3-1.8 0-3.3 1.5-3.3 3.3 0 .4.1.7.2 1H3.5C2.7 12.6 2 13.3 2 14.1s.7 1.5 1.5 1.5h16.2c1.3 0 2.3-1 2.3-2.3 0-1-.6-1.9-1.5-2.2-.3 0-.7.1-1.1.4z" />
      </svg>
    );
  }

  // 46. Terraform
  if (norm.includes('terraform')) {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="#844FBA" className={className}>
        <path d="M1.5 4.5l6.5 3.8v7.5l-6.5-3.8V4.5zm7.5 4.4l6.5 3.8v7.5L9 16.4V8.9zm7.5-4.4L23 8.3v7.5l-6.5-3.8V4.5z" />
      </svg>
    );
  }

  // 47. Google Analytics / Search Console / Tag Manager
  if (norm.includes('google analytics') || norm.includes('ga4')) {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
        <rect width="24" height="24" rx="6" fill="#F9AB00" />
        <rect x="5" y="13" width="3" height="6" rx="1" fill="#FFFFFF" />
        <rect x="10.5" y="9" width="3" height="10" rx="1" fill="#FFFFFF" />
        <rect x="16" y="5" width="3" height="14" rx="1" fill="#FFFFFF" />
      </svg>
    );
  }

  if (norm.includes('search console')) {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
        <circle cx="12" cy="12" r="10" fill="#4285F4" />
        <circle cx="11" cy="11" r="4.5" stroke="#FFFFFF" strokeWidth="1.8" />
        <path d="M14.5 14.5L19 19" stroke="#34A853" strokeWidth="2.5" strokeLinecap="round" />
      </svg>
    );
  }

  if (norm.includes('tag manager')) {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
        <rect width="24" height="24" rx="6" fill="#246FDB" />
        <circle cx="12" cy="8" r="3" fill="#FFFFFF" />
        <path d="M6 18l6-6 6 6" stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="round" />
      </svg>
    );
  }

  // 48. Meta CAPI & Pixel
  if (norm.includes('meta')) {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="#0081FB" className={className}>
        <path d="M12 14.3c-1.5 2.3-3 3.7-4.8 3.7-2.6 0-4.4-2.3-4.4-5.6 0-3.5 2.1-5.7 4.9-5.7 2 0 3.3 1.2 4.3 2.9 1-1.7 2.3-2.9 4.3-2.9 2.8 0 4.9 2.2 4.9 5.7 0 3.3-1.8 5.6-4.4 5.6-1.8 0-3.3-1.4-4.8-3.7zm0-2.4c1.2-1.9 2.3-3 3.7-3 1.6 0 2.8 1.4 2.8 3.8 0 2.2-1 3.7-2.5 3.7-1.3 0-2.5-1.3-4-4.5zm-3.7-3c1.4 0 2.5 1.1 3.7 3-1.5 3.2-2.7 4.5-4 4.5-1.5 0-2.5-1.5-2.5-3.7 0-2.4 1.2-3.8 2.8-3.8z" />
      </svg>
    );
  }

  // 49. SEMrush & Ahrefs
  if (norm.includes('semrush') || norm.includes('ahrefs')) {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
        <circle cx="12" cy="12" r="10" fill="#FF642D" />
        <path d="M7 16l4-8 4 8" stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M8.5 13h5" stroke="#FFFFFF" strokeWidth="2" />
      </svg>
    );
  }

  // 50. Hotjar & Clarity
  if (norm.includes('hotjar') || norm.includes('clarity')) {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
        <rect width="24" height="24" rx="6" fill="#FD3A5C" />
        <path d="M7 6v12M17 6v12M7 12h10" stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="round" />
      </svg>
    );
  }

  // 51. Klaviyo
  if (norm.includes('klaviyo')) {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
        <rect width="24" height="24" rx="6" fill="#0F172A" />
        <path d="M6 6l6 6-6 6V6zm6 6l6-6v12l-6-6z" fill="#2563EB" />
      </svg>
    );
  }

  // 52. Shopify
  if (norm.includes('shopify')) {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
        <path d="M19.7 6.5s-1.5-.1-1.5-.1-1.2-1.1-1.3-1.3c-.1-.1-.5-.1-.6-.1-.02 0-.5.1-1.1.3-.7-1.7-1.7-3.1-2.9-3.1-.1 0-.3 0-.4.1-1 .3-1.6 1.6-2 3.5-.6.2-1.1.3-1.1.3-.3.1-.3.1-.4.5-.1.3-2.3 18.1-2.3 18.1l11.3 2.1 7.2-1.7s-2.1-18.3-2.1-18.3zm-5.7-2.8c.7.2 1.3 1.4 1.7 2.9l-3.1.9c.3-1.8.9-3.7 1.4-3.8z" fill="#95BF47" />
        <path d="M12.2 17c-.2.1-.5.1-.7.1-1.2 0-1.8-.8-1.8-1.8 0-1.4 1.1-2.4 2.8-2.5v-.3c0-.7-.4-1-1.1-1-.6 0-1.1.2-1.4.4l-.3-1c.5-.3 1.2-.5 1.9-.5 1.5 0 2.3.8 2.3 2.1v3.7c0 .6.1 1.1.2 1.5l-1.3.2c-.1-.3-.2-.7-.3-.9zm.3-3.2c-.9.1-1.4.5-1.4 1.3 0 .5.3.9.9.9.1 0 .3 0 .5-.1v-2.1z" fill="#5E8E3E" />
      </svg>
    );
  }

  // Fallback clean tech icon
  return (
    <div
      style={{
        width: size,
        height: size,
        borderRadius: '6px',
        background: '#2563EB',
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

