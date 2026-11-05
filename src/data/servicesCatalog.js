/**
 * Complete Services Catalog
 * Flagship IT, AI & Digital Engineering Services
 * Categories:
 * A. AI Development & Intelligent Automation (Flagship)
 * B. Zero to Hero – Complete Digital Product Development (Flagship)
 * C. Website Design & Development
 * D. Mobile Application Development
 * E. Custom Software & Enterprise Solutions
 * F. E-Commerce Development
 * G. Digital Marketing & Business Growth
 * H. Graphic Design & Branding
 * I. Cloud Computing & DevOps
 * J. Cybersecurity & IT Consulting
 * K. Maintenance & Technical Support
 * L. Offshore Development & Staff Augmentation
 */

export const serviceCategories = [
  {
    id: 'ai-development',
    name: 'AI Development & Intelligent Automation',
    shortName: 'AI & Intelligent Automation',
    badge: 'Flagship AI',
    iconName: 'Cpu',
    tagline: 'Supercharge your business with custom Generative AI, autonomous agents, and enterprise workflows.',
    description: 'We architect and deploy production-grade artificial intelligence solutions—from proprietary LLM fine-tuning and autonomous multi-agent systems to RAG knowledge bases and intelligent workflow automation that scales your business effortlessly.',
    subServices: [
      {
        id: 'ai-integration',
        title: 'AI Integration Services',
        shortDesc: 'Seamlessly embed state-of-the-art AI models into existing enterprise software, CRMs, and apps.',
        tech: 'OpenAI, Anthropic, Gemini, REST APIs',
        iconKey: 'ai-chip'
      },
      {
        id: 'generative-ai',
        title: 'Generative AI Development',
        shortDesc: 'Custom text, code, image, and multimodal generation pipelines tailored to your domain.',
        tech: 'LLMs, Diffusion Models, LoRA',
        iconKey: 'sparkles'
      },
      {
        id: 'ai-agent-development',
        title: 'AI Agent Development',
        shortDesc: 'Autonomous multi-agent systems with tool use, reasoning loops, memory, and automated task execution.',
        tech: 'LangChain, AutoGen, CrewAI',
        iconKey: 'bot'
      },
      {
        id: 'custom-ai-chatbots',
        title: 'Custom AI Chatbot Development',
        shortDesc: 'Context-aware, zero-hallucination intelligent conversational assistants trained on company data.',
        tech: 'Vector DBs, Webhooks, WhatsApp API',
        iconKey: 'message-square'
      },
      {
        id: 'chatgpt-integration',
        title: 'ChatGPT Integration',
        shortDesc: 'Connect GPT-4o intelligence with internal databases, customer portals, and back-office tools.',
        tech: 'OpenAI API, Assistants API, Node.js',
        iconKey: 'openai'
      },
      {
        id: 'openai-api-integration',
        title: 'OpenAI API Integration',
        shortDesc: 'High-throughput enterprise API architectures with robust rate-limiting and streaming responses.',
        tech: 'Embeddings, Function Calling, JSON Mode',
        iconKey: 'openai'
      },
      {
        id: 'claude-ai-integration',
        title: 'Claude AI Integration',
        shortDesc: 'Leverage Anthropic Claude 3.5 Sonnet for 200k+ token context reasoning and code synthesis.',
        tech: 'Anthropic SDK, Tool Use API',
        iconKey: 'claude'
      },
      {
        id: 'gemini-ai-integration',
        title: 'Gemini AI Integration',
        shortDesc: 'Harness Google Gemini 1.5 Pro multimodal processing across video, audio, PDFs, and code.',
        tech: 'Google AI Studio, Vertex AI, Python',
        iconKey: 'gemini'
      },
      {
        id: 'rag-solutions',
        title: 'RAG (Retrieval-Augmented Generation)',
        shortDesc: 'Private enterprise knowledge retrieval connecting proprietary documents directly to LLMs.',
        tech: 'Pinecone, Qdrant, ChromaDB, Milvus',
        iconKey: 'database-zap'
      },
      {
        id: 'ai-business-automation',
        title: 'AI-Powered Business Automation',
        shortDesc: 'Eliminate repetitive manual bottlenecks with autonomous multi-step decision workflows.',
        tech: 'Python, Zapier N8N, Celery',
        iconKey: 'workflow'
      },
      {
        id: 'ai-workflow-automation',
        title: 'AI Workflow Automation',
        shortDesc: 'End-to-end intelligent orchestration connecting ERP, CRM, billing, and communication streams.',
        tech: 'Airflow, LangGraph, Temporal',
        iconKey: 'git-merge'
      },
      {
        id: 'voice-ai-assistants',
        title: 'Voice AI Assistants',
        shortDesc: 'Ultra-low-latency real-time voice agents for customer dispatch, phone bookings, and support.',
        tech: 'Whisper, ElevenLabs, WebRTC',
        iconKey: 'mic'
      },
      {
        id: 'ai-customer-support',
        title: 'AI Customer Support Automation',
        shortDesc: '24/7 autonomous tier-1 resolution resolving over 80% of client tickets in under 5 seconds.',
        tech: 'Zendesk, Intercom, Freshdesk APIs',
        iconKey: 'headset'
      },
      {
        id: 'ai-crm-integration',
        title: 'AI-Powered CRM Integration',
        shortDesc: 'Automated lead scoring, intelligent email drafting, sentiment analysis, and deal intelligence.',
        tech: 'HubSpot, Salesforce, Zoho CRM',
        iconKey: 'users'
      },
      {
        id: 'ai-document-processing',
        title: 'AI Document Processing',
        shortDesc: 'Automated invoice, contract, and receipt extraction with structured tabular JSON outputs.',
        tech: 'OCR, LayoutLM, Vision LLMs',
        iconKey: 'file-text'
      },
      {
        id: 'ai-recommendations',
        title: 'AI Recommendation Systems',
        shortDesc: 'Personalized e-commerce and SaaS product discovery driving up to 35% higher cart values.',
        tech: 'Vector Similarity, Collaborative Filtering',
        iconKey: 'trending-up'
      },
      {
        id: 'predictive-analytics',
        title: 'Predictive Analytics',
        shortDesc: 'Machine learning forecasting models predicting churn, revenue trends, and inventory demands.',
        tech: 'Scikit-Learn, XGBoost, Pandas',
        iconKey: 'bar-chart-3'
      },
      {
        id: 'ml-development',
        title: 'Machine Learning Development',
        shortDesc: 'Custom neural networks, fine-tuned models, and scalable MLOps pipelines built from scratch.',
        tech: 'PyTorch, TensorFlow, HuggingFace',
        iconKey: 'brain'
      },
      {
        id: 'computer-vision',
        title: 'Computer Vision Solutions',
        shortDesc: 'Real-time object detection, facial recognition, defect inspection, and video telemetry.',
        tech: 'OpenCV, YOLOv10, MediaPipe',
        iconKey: 'eye'
      },
      {
        id: 'custom-ai-saas',
        title: 'Custom AI SaaS Products',
        shortDesc: 'Full-stack AI applications with subscriptions, token metering, auth, and multi-tenancy.',
        tech: 'Next.js, FastAPI, Stripe, Docker',
        iconKey: 'rocket'
      },
      {
        id: 'mcp-server-dev',
        title: 'MCP Server Development',
        shortDesc: 'Model Context Protocol (MCP) server creation connecting external tools directly to Claude & Gemini.',
        tech: 'Model Context Protocol, JSON-RPC, TypeScript',
        iconKey: 'server'
      },
      {
        id: 'ai-consulting',
        title: 'AI Consulting and Strategy',
        shortDesc: 'Pragmatic executive roadmaps identifying highest-ROI AI use cases before writing code.',
        tech: 'Architecture Audits, Feasibility Reports',
        iconKey: 'compass'
      }
    ]
  },

  {
    id: 'zero-to-hero',
    name: 'Zero to Hero – Complete Product Development',
    shortName: 'Zero to Hero (Incubator)',
    badge: 'Flagship Incubator',
    iconName: 'Flame',
    tagline: 'From raw napkin idea to fully launched, scalable, and profitable digital reality.',
    description: 'Our premier all-in-one venture acceleration service. We partner with ambitious founders and enterprises to validate, design, engineer, test, launch, and scale high-growth digital products from scratch.',
    isZeroToHero: true,
    processPipeline: [
      { step: '01', title: 'IDEA', desc: 'Concept clarity & validation' },
      { step: '02', title: 'STRATEGY', desc: 'Market & product roadmap' },
      { step: '03', title: 'DESIGN', desc: 'World-class UI/UX system' },
      { step: '04', title: 'DEVELOPMENT', desc: 'Scalable full-stack build' },
      { step: '05', title: 'TESTING', desc: 'Rigorous QA & security audits' },
      { step: '06', title: 'LAUNCH', desc: 'Zero-downtime production deploy' },
      { step: '07', title: 'GROWTH', desc: 'Post-launch scale & acquisition' }
    ],
    subServices: [
      {
        id: 'idea-validation',
        title: 'Business Idea Validation',
        shortDesc: 'Stress-test your concept with real user research, demand testing, and monetization viability.',
        tech: 'User Interviews, Lean Canvas',
        iconKey: 'lightbulb'
      },
      {
        id: 'product-strategy',
        title: 'Product Research & Strategy',
        shortDesc: 'Define your product value proposition, user personas, key metrics, and MVP release scopes.',
        tech: 'PRDs, Metric Frameworks',
        iconKey: 'target'
      },
      {
        id: 'competitor-research',
        title: 'Market & Competitor Research',
        shortDesc: 'Deep-dive analysis of existing players to identify market gaps and defensive moats.',
        tech: 'Competitive Matrix, SWOT Analysis',
        iconKey: 'search'
      },
      {
        id: 'ui-ux-design',
        title: 'UI/UX Design',
        shortDesc: 'Interactive high-fidelity prototypes in Figma engineered for delightful, frictionless conversions.',
        tech: 'Figma, Design Systems, Prototyping',
        iconKey: 'figma'
      },
      {
        id: 'mvp-development',
        title: 'MVP Development',
        shortDesc: 'Rapid 4-to-8 week build prioritizing core revenue-generating features for early traction.',
        tech: 'Next.js, Node.js, PostgreSQL',
        iconKey: 'fast-forward'
      },
      {
        id: 'fullstack-dev',
        title: 'Full-Stack Development',
        shortDesc: 'End-to-end web and mobile applications with resilient APIs, caching, and state management.',
        tech: 'React, Node.js, TypeScript, Tailwind',
        iconKey: 'layers'
      },
      {
        id: 'backend-architecture',
        title: 'Backend Architecture',
        shortDesc: 'Microservices or modular monoliths engineered for 99.99% uptime and high concurrency.',
        tech: 'FastAPI, Express, Go, Redis',
        iconKey: 'server'
      },
      {
        id: 'frontend-development',
        title: 'Frontend Development',
        shortDesc: 'Lightning-fast, accessible interfaces built with modern reactive component architectures.',
        tech: 'Next.js 15, React 19, Vite',
        iconKey: 'layout'
      },
      {
        id: 'database-architecture',
        title: 'Database Architecture',
        shortDesc: 'Optimized schema design, indexing, read replicas, and caching for sub-millisecond queries.',
        tech: 'PostgreSQL, MongoDB, Supabase',
        iconKey: 'database'
      },
      {
        id: 'api-development',
        title: 'API Development & Integration',
        shortDesc: 'RESTful and GraphQL APIs with complete Swagger documentation and webhook systems.',
        tech: 'GraphQL, REST, Postman, Webhooks',
        iconKey: 'code-2'
      },
      {
        id: 'ai-feature-integration',
        title: 'AI Feature Integration',
        shortDesc: 'Supercharge your MVP with smart recommendation, text parsing, and automated copilot features.',
        tech: 'OpenAI, Gemini, Embeddings',
        iconKey: 'cpu'
      },
      {
        id: 'payment-gateways',
        title: 'Payment Gateway Integration',
        shortDesc: 'Secure multi-currency transactions, recurring billing, invoices, and automated refund flows.',
        tech: 'Stripe, Razorpay, PayPal, Apple Pay',
        iconKey: 'credit-card'
      },
      {
        id: 'admin-dashboards',
        title: 'Admin Dashboard Development',
        shortDesc: 'Custom management back-offices with RBAC permissions, live analytics, and customer support tooling.',
        tech: 'Shadcn UI, Recharts, TanStack Table',
        iconKey: 'gauge'
      },
      {
        id: 'testing-qa',
        title: 'Testing and Quality Assurance',
        shortDesc: 'Automated end-to-end Cypress tests, unit testing, and cross-browser regression testing.',
        tech: 'Cypress, Jest, Playwright, SonarQube',
        iconKey: 'check-circle-2'
      },
      {
        id: 'cloud-deployment',
        title: 'Cloud Deployment',
        shortDesc: 'Zero-downtime CI/CD pipelines deploying directly to AWS, Vercel, or custom Kubernetes clusters.',
        tech: 'AWS, Vercel, Docker, Cloudflare',
        iconKey: 'cloud'
      },
      {
        id: 'production-launch',
        title: 'Production Launch',
        shortDesc: 'Stress testing, DNS orchestration, SSL hardening, and monitoring setup for seamless Day 1.',
        tech: 'DataDog, Sentry, Cloudflare Edge',
        iconKey: 'flag'
      },
      {
        id: 'post-launch-maintenance',
        title: 'Post-Launch Maintenance',
        shortDesc: 'Guaranteed 24/7 uptime monitoring, critical bug patches, database backups, and security updates.',
        tech: 'Sentry, PagerDuty, Daily Snapshots',
        iconKey: 'wrench'
      },
      {
        id: 'product-scaling',
        title: 'Product Scaling & Optimization',
        shortDesc: 'Database sharding, CDN caching, code splitting, and funnel CRO to handle millions of requests.',
        tech: 'Redis, ElasticSearch, Kafka',
        iconKey: 'trending-up'
      }
    ]
  },

  {
    id: 'web-development',
    name: 'Website Design & Development',
    shortName: 'Website Development',
    badge: 'High Performance',
    iconName: 'Globe',
    tagline: 'High-converting, ultra-fast custom websites built for brand dominance and seamless growth.',
    description: 'We build digital flagships without template bloat. Every website is engineered for sub-second load times, 95+ Core Web Vitals, intuitive content management, and maximum conversion rates.',
    subServices: [
      {
        id: 'custom-web-dev',
        title: 'Custom Website Development',
        shortDesc: 'Tailor-crafted digital experiences engineered specifically for your business logic and brand aesthetic.',
        tech: 'React, Next.js, HTML5/CSS3',
        iconKey: 'code'
      },
      {
        id: 'business-websites',
        title: 'Business Website Development',
        shortDesc: 'Professional high-converting corporate portals that establish instant trust and capture qualified leads.',
        tech: 'Next.js, Tailwind, Webhook Leads',
        iconKey: 'briefcase'
      },
      {
        id: 'corporate-web-dev',
        title: 'Corporate Website Development',
        shortDesc: 'Enterprise web systems with multi-language support, compliance readiness, and institutional scale.',
        tech: 'TypeScript, Headless CMS, AWS',
        iconKey: 'building-2'
      },
      {
        id: 'portfolio-websites',
        title: 'Portfolio Website Development',
        shortDesc: 'Immersive visual showcases for creative studios, architects, agencies, and luxury brands.',
        tech: 'GSAP, Three.js, Micro-Animations',
        iconKey: 'image'
      },
      {
        id: 'landing-page-dev',
        title: 'Landing Page Development',
        shortDesc: 'High-velocity standalone pages engineered specifically for high paid ad ROAS and conversion rates.',
        tech: 'A/B Testing, Heatmaps, Vite',
        iconKey: 'layout'
      },
      {
        id: 'wordpress-dev',
        title: 'WordPress Development',
        shortDesc: 'Clean, secure custom WordPress themes and Gutenberg blocks with zero bloated plugins.',
        tech: 'PHP 8, Gutenberg, MySQL, ACF',
        iconKey: 'wordpress'
      },
      {
        id: 'nextjs-dev',
        title: 'Next.js Development',
        shortDesc: 'Server-side rendered (SSR) and statically generated web apps for unmatched speed and Google SEO.',
        tech: 'Next.js 15, React 19, Vercel',
        iconKey: 'nextjs'
      },
      {
        id: 'react-dev',
        title: 'React.js Development',
        shortDesc: 'Interactive, reactive frontends with smooth state handling and modern component libraries.',
        tech: 'React 19, Redux, Zustand, Vite',
        iconKey: 'react'
      },
      {
        id: 'fullstack-web-dev',
        title: 'Full-Stack Web Development',
        shortDesc: 'Complete web apps combining robust backends, secure relational databases, and snappy frontends.',
        tech: 'MERN, PERN, Python Fullstack',
        iconKey: 'layers'
      },
      {
        id: 'dynamic-websites',
        title: 'Dynamic Website Development',
        shortDesc: 'Data-driven portals featuring user accounts, live filters, dashboards, and role-based views.',
        tech: 'REST APIs, WebSockets, Supabase',
        iconKey: 'refresh-cw'
      },
      {
        id: 'website-redesign',
        title: 'Website Redesign',
        shortDesc: 'Modernize outdated designs into slick, mobile-first websites that multiply your conversions.',
        tech: 'UX Audit, Brand Alignment, SEO Preservation',
        iconKey: 'palette'
      },
      {
        id: 'speed-optimization',
        title: 'Website Speed Optimization',
        shortDesc: 'Transform sluggish websites into sub-1s rockets with 95+ Google PageSpeed Core Web Vitals.',
        tech: 'Asset Minification, WebP, CDN Edge Caching',
        iconKey: 'zap'
      },
      {
        id: 'pwa-development',
        title: 'Progressive Web Applications',
        shortDesc: 'Offline-capable, installable web experiences that feel identical to native mobile apps.',
        tech: 'Service Workers, Manifest, IndexedDB',
        iconKey: 'smartphone'
      },
      {
        id: 'web-portal-dev',
        title: 'Web Portal Development',
        shortDesc: 'Secure client, vendor, and employee portals with document sharing and permission matrices.',
        tech: 'RBAC, OAuth2, Secure File Storage',
        iconKey: 'shield-check'
      },
      {
        id: 'web-api-integration',
        title: 'API Integration',
        shortDesc: 'Connect CRMs, ERPs, live payment rails, inventory engines, and shipping platforms seamlessly.',
        tech: 'Stripe, Salesforce, WhatsApp, Zapier',
        iconKey: 'network'
      },
      {
        id: 'web-security-maintenance',
        title: 'Website Security & Maintenance',
        shortDesc: 'Continuous malware screening, firewall rule updates, daily cloud snapshots, and patch updates.',
        tech: 'Cloudflare WAF, SSL, Automated Backups',
        iconKey: 'lock'
      }
    ]
  },

  {
    id: 'mobile-app-development',
    name: 'Mobile Application Development',
    shortName: 'Mobile Applications',
    badge: 'iOS & Android',
    iconName: 'Smartphone',
    tagline: 'Delightful, high-performance native and cross-platform apps that users love on every screen.',
    description: 'We develop fluid, intuitive mobile experiences engineered with modern frameworks like Flutter, React Native, Swift, and Kotlin. From consumer apps to mission-critical enterprise field tools, our apps are built to rank, engage, and retain.',
    subServices: [
      {
        id: 'android-dev',
        title: 'Android App Development',
        shortDesc: 'Native Android applications engineered with modern Kotlin and Jetpack Compose for peak device speed.',
        tech: 'Kotlin, Jetpack Compose, Material 3',
        iconKey: 'android'
      },
      {
        id: 'ios-dev',
        title: 'iOS App Development',
        shortDesc: 'Polished, fluid native iOS applications utilizing Swift and SwiftUI with seamless Apple ecosystem integration.',
        tech: 'Swift, SwiftUI, CoreData, TestFlight',
        iconKey: 'apple'
      },
      {
        id: 'flutter-dev',
        title: 'Flutter App Development',
        shortDesc: 'Google Flutter cross-platform architecture producing 60fps animations with single codebase efficiency.',
        tech: 'Flutter, Dart, Bloc, Provider',
        iconKey: 'flutter'
      },
      {
        id: 'react-native-dev',
        title: 'React Native Development',
        shortDesc: 'Cross-platform mobile apps combining native capabilities with fast React development cycles.',
        tech: 'React Native, Expo, Redux, Native Modules',
        iconKey: 'react'
      },
      {
        id: 'kotlin-dev',
        title: 'Kotlin App Development',
        shortDesc: 'High-concurrency native Android apps utilizing Kotlin coroutines and clean modular architectures.',
        tech: 'Kotlin Coroutines, Room DB, Dagger Hilt',
        iconKey: 'kotlin'
      },
      {
        id: 'swift-dev',
        title: 'Swift App Development',
        shortDesc: 'Precision native Apple iOS and iPadOS engineering targeting the latest iOS SDKs and hardware features.',
        tech: 'Swift 6, Combine, Apple HealthKit',
        iconKey: 'swift'
      },
      {
        id: 'cross-platform-dev',
        title: 'Cross-Platform App Development',
        shortDesc: 'Halve your development costs and launch simultaneously on the App Store and Google Play.',
        tech: 'Flutter, React Native, Capacitor',
        iconKey: 'tablet-smartphone'
      },
      {
        id: 'ondemand-apps',
        title: 'On-Demand Mobile Applications',
        shortDesc: 'Live geolocation, driver matching, ordering, and push notifications for delivery and service platforms.',
        tech: 'Google Maps API, Socket.io, Push Notifications',
        iconKey: 'map-pin'
      },
      {
        id: 'ecommerce-mobile-apps',
        title: 'E-Commerce Mobile Applications',
        shortDesc: '1-click checkout, biometric Apple Pay, cart recovery notifications, and real-time order tracking.',
        tech: 'Shopify Storefront API, Stripe, Firebase',
        iconKey: 'shopping-bag'
      },
      {
        id: 'enterprise-mobile-apps',
        title: 'Enterprise Mobile Applications',
        shortDesc: 'Secure internal corporate apps with offline caching, document scanners, and encrypted sync.',
        tech: 'MDM Support, Biometrics, SQLite Sync',
        iconKey: 'shield'
      },
      {
        id: 'mobile-uiux',
        title: 'Mobile App UI/UX Design',
        shortDesc: 'Intuitive thumb-friendly wireframes, interactive transitions, and Apple Human Interface guidelines.',
        tech: 'Figma, Micro-Interactions, iOS/Android UI Kits',
        iconKey: 'sparkles'
      },
      {
        id: 'mobile-maintenance',
        title: 'Mobile App Maintenance',
        shortDesc: 'OS upgrade updates, crash telemetry remediation, performance profiling, and new feature rollouts.',
        tech: 'Firebase Crashlytics, App Center',
        iconKey: 'wrench'
      },
      {
        id: 'appstore-deployment',
        title: 'App Store Deployment',
        shortDesc: 'Smooth App Store review approvals, Google Play Store compliance, screenshots, and metadata setup.',
        tech: 'App Store Connect, Google Play Console',
        iconKey: 'upload-cloud'
      },
      {
        id: 'mobile-api-integration',
        title: 'Mobile App API Integration',
        shortDesc: 'Connect mobile apps with your central databases, authorization servers, and external third parties.',
        tech: 'GraphQL, REST, JWT, OAuth 2.0',
        iconKey: 'cable'
      }
    ]
  },

  {
    id: 'custom-software',
    name: 'Custom Software & Enterprise Solutions',
    shortName: 'Enterprise Software',
    badge: 'Enterprise Core',
    iconName: 'Building',
    tagline: 'Tailored enterprise software, ERPs, and automation systems engineered to scale operations.',
    description: 'When off-the-shelf software falls short, we design custom systems engineered exactly around your unique operational rules. We eliminate licensing bloat and connect fragmented teams with cohesive software.',
    subServices: [
      {
        id: 'custom-software-dev',
        title: 'Custom Software Development',
        shortDesc: 'Bespoke business software built to handle high transactional volume and proprietary workflows.',
        tech: 'Node.js, Go, Python, PostgreSQL',
        iconKey: 'terminal'
      },
      {
        id: 'enterprise-software-dev',
        title: 'Enterprise Software Development',
        shortDesc: 'High-availability, fault-tolerant platforms with comprehensive auditing, RBAC, and data governance.',
        tech: 'Microservices, Docker, Kubernetes',
        iconKey: 'building-2'
      },
      {
        id: 'saas-development',
        title: 'SaaS Product Development',
        shortDesc: 'Multi-tenant cloud architectures with automated billing, customer provisioning, and telemetry.',
        tech: 'Next.js, FastAPI, Stripe Billing, AWS',
        iconKey: 'cloud-lightning'
      },
      {
        id: 'crm-development',
        title: 'CRM Development',
        shortDesc: 'Custom customer relationship platforms with pipeline stages, call recording, and automated lead routing.',
        tech: 'WebSockets, REST, SendGrid',
        iconKey: 'contact'
      },
      {
        id: 'erp-development',
        title: 'ERP Development',
        shortDesc: 'Integrated enterprise resource planning linking sales, procurement, production, and financials.',
        tech: 'PostgreSQL, React, Python, Celery',
        iconKey: 'briefcase'
      },
      {
        id: 'school-management',
        title: 'School Management Systems',
        shortDesc: 'Student records, attendance, fee collection, gradebooks, and parent portal applications.',
        tech: 'RBAC, SMS Alerts, Payment Gateways',
        iconKey: 'graduation-cap'
      },
      {
        id: 'college-management',
        title: 'College Management Systems',
        shortDesc: 'Comprehensive higher-ed management for university departments, exams, credits, and admissions.',
        tech: 'Multi-Branch DBs, Student Portals',
        iconKey: 'book-open'
      },
      {
        id: 'hospital-management',
        title: 'Hospital Management Systems',
        shortDesc: 'HIPAA-conscious EHR, doctor scheduling, patient intake, pharmacy inventory, and lab reports.',
        tech: 'Encrypted DBs, HL7/FHIR Readiness',
        iconKey: 'heart-pulse'
      },
      {
        id: 'pharmacy-management',
        title: 'Pharmacy Management Systems',
        shortDesc: 'Batch expiry tracking, automated re-ordering, barcode scanning, and prescription records.',
        tech: 'Barcode API, Stock Triggers, POS',
        iconKey: 'pill'
      },
      {
        id: 'inventory-management',
        title: 'Inventory Management Systems',
        shortDesc: 'Multi-warehouse stock tracking, low-stock alerts, SKU scanning, and supplier purchase orders.',
        tech: 'QR/Barcode, Redis Cache, Real-time Sync',
        iconKey: 'boxes'
      },
      {
        id: 'hr-management-software',
        title: 'HR Management Software',
        shortDesc: 'Payroll computation, biometric attendance integration, leave approvals, and employee KPIs.',
        tech: 'Payroll Tax Calculators, Biometrics',
        iconKey: 'user-check'
      },
      {
        id: 'billing-accounting',
        title: 'Billing and Accounting Software',
        shortDesc: 'Automated tax invoicing, GST compliance, ledger balancing, and PDF financial reporting.',
        tech: 'Tax Engines, PDF Generators, Stripe',
        iconKey: 'receipt'
      },
      {
        id: 'pos-software',
        title: 'POS Software Development',
        shortDesc: 'Rapid point-of-sale systems for retail counters with thermal receipt printing and barcode scanning.',
        tech: 'Electron, Offline SQLite, Hardware Bridges',
        iconKey: 'store'
      },
      {
        id: 'workflow-management',
        title: 'Workflow Management Systems',
        shortDesc: 'Visual drag-and-drop task routing, approval hierarchies, and deadline escalation alerts.',
        tech: 'React Flow, Webhooks, Cron Queues',
        iconKey: 'git-pull-request'
      },
      {
        id: 'business-automation',
        title: 'Business Process Automation',
        shortDesc: 'Automate repetitive data transfers between disjointed software tools with zero human errors.',
        tech: 'Python Daemons, Zapier N8N, Kafka',
        iconKey: 'cog'
      },
      {
        id: 'legacy-modernization',
        title: 'Legacy Software Modernization',
        shortDesc: 'Safely migrate brittle monoliths and outdated software into agile, cloud-native microservices.',
        tech: 'Strangler Fig Pattern, Cloud Migration',
        iconKey: 'refresh-ccw'
      }
    ]
  },

  {
    id: 'ecommerce-development',
    name: 'E-Commerce Development',
    shortName: 'E-Commerce Solutions',
    badge: 'Conversion Led',
    iconName: 'ShoppingBag',
    tagline: 'High-converting online store engines designed to turn casual browsers into loyal repeat customers.',
    description: 'We build storefronts engineered for fast checkouts, frictionless mobile buying, multi-currency payments, automated inventory management, and higher average order values across Shopify, WooCommerce, and custom platforms.',
    subServices: [
      {
        id: 'custom-ecommerce',
        title: 'Custom E-Commerce Development',
        shortDesc: 'Headless storefronts with custom business rules, dynamic pricing, and sub-second catalog queries.',
        tech: 'Next.js Commerce, MedusaJS, GraphQL',
        iconKey: 'code-2'
      },
      {
        id: 'shopify-development',
        title: 'Shopify Development',
        shortDesc: 'Custom Liquid themes, Shopify Plus architecture, checkout extensibility, and private app integrations.',
        tech: 'Shopify Plus, Liquid, Storefront API',
        iconKey: 'shopify'
      },
      {
        id: 'woocommerce-development',
        title: 'WooCommerce Development',
        shortDesc: 'High-speed WordPress shopping systems optimized for large catalogs, secure checkouts, and custom plugins.',
        tech: 'WooCommerce, WordPress, PHP, MySQL',
        iconKey: 'wordpress'
      },
      {
        id: 'online-store-dev',
        title: 'Custom Online Store Development',
        shortDesc: 'Distinctive brand-first storefronts with custom product customizers and seamless upsell funnels.',
        tech: 'React, Stripe Elements, Tailwind',
        iconKey: 'store'
      },
      {
        id: 'multi-vendor-marketplace',
        title: 'Multi-Vendor Marketplace',
        shortDesc: 'Amazon-style marketplaces where multiple vendors list goods with automated commission payouts.',
        tech: 'Stripe Connect, Vendor Portals, Escrow',
        iconKey: 'users-2'
      },
      {
        id: 'b2b-ecommerce',
        title: 'B2B E-Commerce Platforms',
        shortDesc: 'Wholesale portals with volume tier pricing, credit terms, quote requests, and reorder sheets.',
        tech: 'ERP Integrations, Custom Price Books',
        iconKey: 'briefcase'
      },
      {
        id: 'b2c-ecommerce',
        title: 'B2C E-Commerce Platforms',
        shortDesc: 'Direct-to-consumer storefronts optimized for Instagram traffic, mobile checkout, and social proof.',
        tech: 'Mobile-first UX, 1-Click Pay, Reviews',
        iconKey: 'shopping-cart'
      },
      {
        id: 'ecom-payment-gateways',
        title: 'Payment Gateway Integration',
        shortDesc: 'Accept global credit cards, UPI, digital wallets, and BNPL with zero friction and fraud protection.',
        tech: 'Stripe, PayPal, Razorpay, Klarna',
        iconKey: 'credit-card'
      },
      {
        id: 'shopping-cart-dev',
        title: 'Shopping Cart Development',
        shortDesc: 'Slide-out slide carts with progress free-shipping bars, cross-sells, and persistent browser storage.',
        tech: 'Zustand, LocalStorage, Webhooks',
        iconKey: 'shopping-bag'
      },
      {
        id: 'inventory-integration',
        title: 'Inventory Integration',
        shortDesc: 'Synchronize stock numbers between your physical retail stores, warehouse, and multiple online channels.',
        tech: 'TradeGecko, Katana, Custom APIs',
        iconKey: 'boxes'
      },
      {
        id: 'order-management',
        title: 'Order Management Systems',
        shortDesc: 'Automated invoice generation, courier label printing, return authorizations, and tracking SMS cascades.',
        tech: 'ShipStation, Shiprocket',
        iconKey: 'truck'
      },
      {
        id: 'ecommerce-seo',
        title: 'E-Commerce SEO',
        shortDesc: 'Category and product page search optimization capturing high-intent commercial shopper queries.',
        tech: 'Schema Markup, Faceted Nav SEO',
        iconKey: 'search'
      },
      {
        id: 'ecommerce-speed',
        title: 'E-Commerce Speed Optimization',
        shortDesc: 'Fast catalog rendering that boosts conversion rate by up to 20% on mobile 4G networks.',
        tech: 'Image CDN, Edge SSR, Critical CSS',
        iconKey: 'zap'
      }
    ]
  },

  {
    id: 'digital-marketing',
    name: 'Digital Marketing & Business Growth',
    shortName: 'Digital Marketing & SEO',
    badge: 'High ROAS',
    iconName: 'TrendingUp',
    tagline: 'High-intent search rankings, high-converting paid media, and predictable revenue engines.',
    description: 'A great product needs qualified traffic. We combine technical Google SEO dominance with high-ROAS Meta and Google ad campaigns, conversion rate testing, and marketing automation to scale customer acquisition predictably.',
    subServices: [
      {
        id: 'seo-dominance',
        title: 'Search Engine Optimization (SEO)',
        shortDesc: 'Holistic organic ranking strategies putting your business in front of buyers searching for your exact offer.',
        tech: 'Google Search Console, Ahrefs, SEMrush',
        iconKey: 'search'
      },
      {
        id: 'technical-seo',
        title: 'Technical SEO',
        shortDesc: 'Fix crawl depth errors, canonical tags, schema markup, XML sitemaps, and server header response codes.',
        tech: 'JSON-LD Schema, Core Web Vitals, Robots.txt',
        iconKey: 'code-2'
      },
      {
        id: 'onpage-seo',
        title: 'On-Page SEO',
        shortDesc: 'Topical keyword architecture, content optimization, header tag hierarchy, and internal linking networks.',
        tech: 'SurferSEO, Clearscope, Keyword Clusters',
        iconKey: 'file-text'
      },
      {
        id: 'offpage-seo',
        title: 'Off-Page SEO',
        shortDesc: 'Authoritative editorial backlinks, digital PR coverage, and high-domain referral authority campaigns.',
        tech: 'Digital PR, White-Hat Outreach, Haro',
        iconKey: 'link'
      },
      {
        id: 'local-seo',
        title: 'Local SEO',
        shortDesc: 'Dominate Google Local Map Packs, neighborhood search results, and local citation networks.',
        tech: 'Google Maps, Local Schema, Citations',
        iconKey: 'map-pin'
      },
      {
        id: 'ecommerce-seo-service',
        title: 'E-Commerce SEO',
        shortDesc: 'Optimize product collection taxonomy, faceted navigation, and Google Merchant Center feeds.',
        tech: 'Merchant Center, Structured Data',
        iconKey: 'shopping-bag'
      },
      {
        id: 'international-seo',
        title: 'International SEO',
        shortDesc: 'Hreflang tag architecture, country-code TLD optimization, and multi-regional search visibility.',
        tech: 'Hreflang, CDN Edge Routing, Geotargeting',
        iconKey: 'globe'
      },
      {
        id: 'seo-audits',
        title: 'SEO Audits',
        shortDesc: 'Comprehensive 80+ checkpoint diagnostic uncovering why your website is losing traffic to competitors.',
        tech: 'Screaming Frog, Sitebulb, Audit Reports',
        iconKey: 'check-square'
      },
      {
        id: 'gmb-optimization',
        title: 'Google Business Profile Optimization',
        shortDesc: 'Optimize your Google Profile to capture top ranking for high-value phone calls and inquiries.',
        tech: 'GBP API, Review Automation, Geotagging',
        iconKey: 'map'
      },
      {
        id: 'social-media-marketing',
        title: 'Social Media Marketing',
        shortDesc: 'Engaging content strategy, video Reels creation, and active community growth on LinkedIn & Instagram.',
        tech: 'Instagram, LinkedIn, Content Strategy',
        iconKey: 'share-2'
      },
      {
        id: 'meta-ads',
        title: 'Facebook and Instagram Ads',
        shortDesc: 'High-converting video and carousel campaigns leveraging Meta CAPI and advanced lookalike audiences.',
        tech: 'Meta Ads Manager, CAPI, Creative Testing',
        iconKey: 'target'
      },
      {
        id: 'google-ads-ppc',
        title: 'Google Ads / PPC',
        shortDesc: 'High-intent Search, Performance Max, and YouTube Ads capturing customers ready to buy immediately.',
        tech: 'Google Ads, P-Max, Negative Keywords',
        iconKey: 'mouse-pointer'
      },
      {
        id: 'youtube-marketing',
        title: 'YouTube Marketing',
        shortDesc: 'Video SEO, thumbnail design, YouTube Shorts production, and video ad acquisition funnels.',
        tech: 'YouTube Studio, VidIQ, Video Funnels',
        iconKey: 'video'
      },
      {
        id: 'content-marketing',
        title: 'Content Marketing',
        shortDesc: 'Authoritative industry whitepapers, case studies, and blog posts that convert visitors into clients.',
        tech: 'Content Roadmaps, Copywriting',
        iconKey: 'edit-3'
      },
      {
        id: 'email-marketing',
        title: 'Email Marketing',
        shortDesc: 'Automated onboarding sequences, abandoned cart triggers, and weekly newsletter revenue engines.',
        tech: 'Klaviyo, Mailchimp, Smart Flows',
        iconKey: 'mail'
      },
      {
        id: 'performance-marketing',
        title: 'Performance Marketing',
        shortDesc: 'Data-driven multichannel customer acquisition with relentless focus on Customer Acquisition Cost (CAC).',
        tech: 'Attribution Models, Blended ROAS',
        iconKey: 'award'
      },
      {
        id: 'cro-optimization',
        title: 'Conversion Rate Optimization (CRO)',
        shortDesc: 'A/B split testing, UX redesigns, and heatmap click audits to double leads from your existing traffic.',
        tech: 'Hotjar, Microsoft Clarity, VWO',
        iconKey: 'percent'
      },
      {
        id: 'lead-generation',
        title: 'Lead Generation',
        shortDesc: 'B2B and B2C automated lead capture funnels delivering pre-qualified prospects directly to your sales team.',
        tech: 'Typeform, Zapier, Webhook Routing',
        iconKey: 'user-plus'
      },
      {
        id: 'marketing-automation',
        title: 'Marketing Automation',
        shortDesc: 'Trigger automated WhatsApp, SMS, and email touchpoints based on user interactions and deal stages.',
        tech: 'ActiveCampaign, Make.com, HubSpot',
        iconKey: 'cpu'
      },
      {
        id: 'analytics-tracking',
        title: 'Analytics and Tracking',
        shortDesc: 'Server-side tracking, Google Analytics 4 event setup, and unified live executive reporting dashboards.',
        tech: 'GA4, Google Tag Manager, Looker Studio',
        iconKey: 'pie-chart'
      },
      {
        id: 'brand-awareness',
        title: 'Brand Awareness Campaigns',
        shortDesc: 'Omnichannel brand reinforcement campaigns that make your business the obvious first choice in your niche.',
        tech: 'Programmatic Ads, Digital PR, Sponsorships',
        iconKey: 'megaphone'
      }
    ]
  },

  {
    id: 'graphic-design',
    name: 'Graphic Design & Branding',
    shortName: 'Graphic Design & Brand',
    badge: 'Creative Identity',
    iconName: 'Palette',
    tagline: 'Distinctive brand identities, typography systems, and visual craft that command premium pricing.',
    description: 'We craft timeless design systems that leave lasting impressions. From iconic logos and complete brand guidelines to high-converting ad creatives, packaging, and UI/UX design, our visual craft elevates your brand authority.',
    subServices: [
      {
        id: 'logo-design',
        title: 'Logo Design',
        shortDesc: 'Iconic vector logos and glyphs crafted with mathematical precision to stay memorable for decades.',
        tech: 'Vector AI, SVG, Monograms, Wordmarks',
        iconKey: 'pen-tool'
      },
      {
        id: 'brand-identity',
        title: 'Brand Identity Design',
        shortDesc: 'Complete corporate visual systems including color science, typography hierarchy, and visual assets.',
        tech: 'Design Systems, Color Palettes, Style Guides',
        iconKey: 'palette'
      },
      {
        id: 'business-card-design',
        title: 'Business Card Design',
        shortDesc: 'Premium tactile card layouts, NFC smart digital cards, and embossed print-ready production files.',
        tech: 'CMYK 300DPI, Spot UV, NFC Setup',
        iconKey: 'credit-card'
      },
      {
        id: 'brochure-design',
        title: 'Brochure Design',
        shortDesc: 'Sleek corporate tri-folds, digital PDF lookbooks, and pitch deck collateral tailored for sales meetings.',
        tech: 'InDesign, Illustrator, Print Prep',
        iconKey: 'book'
      },
      {
        id: 'social-media-creatives',
        title: 'Social Media Creatives',
        shortDesc: 'Eye-stopping Instagram carousels, banner suites, and LinkedIn graphics engineered to drive clicks.',
        tech: 'Photoshop, Figma, Canva Templates',
        iconKey: 'image'
      },
      {
        id: 'uiux-design',
        title: 'UI/UX Design',
        shortDesc: 'Clean, user-centric wireframes and design systems optimized for intuitive mobile and web workflows.',
        tech: 'Figma, Auto-Layout, Interactive Components',
        iconKey: 'layout'
      },
      {
        id: 'website-graphics',
        title: 'Website Graphics',
        shortDesc: 'Custom vector iconography, 2D/3D illustrations, and hero banners tailored to your web aesthetic.',
        tech: 'SVG Vectors, Blender 3D, WebP',
        iconKey: 'sparkles'
      },
      {
        id: 'packaging-design',
        title: 'Product Packaging Design',
        shortDesc: 'Shelf-dominating retail box packaging, bottle labels, and 3D photorealistic mockups.',
        tech: 'Dielines, 3D Renders, Barcode Prep',
        iconKey: 'package'
      },
      {
        id: 'presentation-design',
        title: 'Presentation Design',
        shortDesc: 'High-stakes investor pitch decks and keynote presentations crafted to win funding and enterprise deals.',
        tech: 'Keynote, PowerPoint, Figma Decks',
        iconKey: 'presentation'
      },
      {
        id: 'motion-graphics',
        title: 'Motion Graphics',
        shortDesc: 'Fluid 2D/3D animated logo reveals, explainer video animations, and interface micro-interactions.',
        tech: 'After Effects, Lottie, Rive',
        iconKey: 'film'
      },
      {
        id: 'video-editing',
        title: 'Video Editing',
        shortDesc: 'High-pacing TikTok and Instagram Reels edits, podcast sound enhancements, and commercial cuts.',
        tech: 'Premiere Pro, DaVinci Resolve',
        iconKey: 'video'
      },
      {
        id: 'brand-guidelines',
        title: 'Brand Guidelines',
        shortDesc: 'Comprehensive 40+ page brand manual detailing logo clearance, font rules, photography and voice.',
        tech: 'Brand Manuals, PDF Guidelines',
        iconKey: 'file-check'
      }
    ]
  },

  {
    id: 'cloud-devops',
    name: 'Cloud Computing & DevOps',
    shortName: 'Cloud & DevOps',
    badge: '99.99% Uptime',
    iconName: 'Cloud',
    tagline: 'Rock-solid cloud infrastructure, automated CI/CD pipelines, and high-availability architecture.',
    description: 'We engineer cloud environments that never buckle under traffic spikes. From automated container deployments and serverless architectures to multi-region disaster recovery, we keep your systems fast, resilient, and secure.',
    subServices: [
      {
        id: 'aws-cloud',
        title: 'AWS Cloud Solutions',
        shortDesc: 'Enterprise Amazon Web Services architecture utilizing EC2, ECS, Lambda, S3, RDS, and CloudFront.',
        tech: 'AWS Cloud, ECS, Lambda, RDS',
        iconKey: 'aws'
      },
      {
        id: 'azure-cloud',
        title: 'Microsoft Azure Solutions',
        shortDesc: 'Azure cloud environments with Active Directory federation, App Services, and enterprise data lakes.',
        tech: 'Azure App Services, Entra ID, Blob',
        iconKey: 'cloud'
      },
      {
        id: 'gcp-solutions',
        title: 'Google Cloud Solutions',
        shortDesc: 'High-speed GCP setups utilizing Google Kubernetes Engine (GKE), Cloud Run, and BigQuery data pipelines.',
        tech: 'Google Cloud, GKE, Cloud Run, BigQuery',
        iconKey: 'google'
      },
      {
        id: 'cloud-migration',
        title: 'Cloud Migration',
        shortDesc: 'Zero-downtime database and server migration from on-premise hardware or legacy hosting to the cloud.',
        tech: 'Database Replication, Zero Downtime',
        iconKey: 'arrow-up-circle'
      },
      {
        id: 'infra-management',
        title: 'Cloud Infrastructure Management',
        shortDesc: '24/7 proactive cloud resource optimization, cost auditing, and auto-scaling rule configurations.',
        tech: 'Terraform, CloudFormation, AWS Cost Explorer',
        iconKey: 'settings'
      },
      {
        id: 'docker-containerization',
        title: 'Docker Containerization',
        shortDesc: 'Standardize your application environments into immutable, lightweight, easily deployable Docker images.',
        tech: 'Docker, Docker Compose, Multi-stage Builds',
        iconKey: 'box'
      },
      {
        id: 'kubernetes-deployment',
        title: 'Kubernetes Deployment',
        shortDesc: 'Enterprise container orchestration with automated horizontal pod autoscaling and self-healing pods.',
        tech: 'Kubernetes, Helm, K9s, Ingress',
        iconKey: 'ship'
      },
      {
        id: 'cicd-pipelines',
        title: 'CI/CD Pipeline Development',
        shortDesc: 'Automated GitHub Actions or GitLab pipelines testing, building, and deploying releases in under 2 minutes.',
        tech: 'GitHub Actions, GitLab CI, ArgoCD',
        iconKey: 'git-commit'
      },
      {
        id: 'server-configuration',
        title: 'Server Configuration',
        shortDesc: 'Hardened NGINX, Apache, and Caddy reverse proxy setups with custom caching and Brotli compression.',
        tech: 'NGINX, Caddy, SSL/TLS, Linux',
        iconKey: 'server'
      },
      {
        id: 'linux-administration',
        title: 'Linux Server Administration',
        shortDesc: 'Ubuntu and Debian system hardening, kernel tuning, cron job automation, and SSH key management.',
        tech: 'Ubuntu, Bash Scripting, Systemd',
        iconKey: 'terminal'
      },
      {
        id: 'cloud-database-management',
        title: 'Database Management',
        shortDesc: 'Automated point-in-time recovery, connection pooling with PgBouncer, and read-replica distribution.',
        tech: 'PostgreSQL, Redis, MongoDB Atlas',
        iconKey: 'database'
      },
      {
        id: 'cloud-security-service',
        title: 'Cloud Security',
        shortDesc: 'VPC private subnet isolation, AWS IAM least-privilege policies, and automated security group auditing.',
        tech: 'WAF, IAM, Security Groups, GuardDuty',
        iconKey: 'shield-check'
      },
      {
        id: 'infra-monitoring',
        title: 'Infrastructure Monitoring',
        shortDesc: 'Real-time telemetry alerts catching CPU spikes, memory leaks, and latency degradation before users do.',
        tech: 'Prometheus, Grafana, Datadog',
        iconKey: 'activity'
      },
      {
        id: 'disaster-recovery',
        title: 'Backup & Disaster Recovery',
        shortDesc: 'Automated geographically distributed daily snapshots with sub-15 minute recovery point objectives (RPO).',
        tech: 'S3 Glacier, Automated Failover',
        iconKey: 'archive'
      },
      {
        id: 'scalability-optimization',
        title: 'Performance & Scalability Optimization',
        shortDesc: 'Eliminate database bottlenecks and cache dynamic assets at edge nodes to handle 100k+ concurrent users.',
        tech: 'Cloudflare Edge, Redis Cache, Load Balancers',
        iconKey: 'gauge'
      }
    ]
  },

  {
    id: 'cybersecurity-consulting',
    name: 'Cybersecurity & IT Consulting',
    shortName: 'Cybersecurity & Consulting',
    badge: 'Security First',
    iconName: 'ShieldAlert',
    tagline: 'Comprehensive vulnerability assessments, penetration testing, and IT strategy.',
    description: 'Protect your brand reputation, client trust, and intellectual property. We conduct thorough vulnerability assessments, ethical penetration testing, API auditing, and deliver strategic technology advisory.',
    subServices: [
      {
        id: 'security-audits',
        title: 'Website Security Audits',
        shortDesc: 'Comprehensive code review identifying SQL injections, Cross-Site Scripting (XSS), and exposed keys.',
        tech: 'OWASP Top 10, Static Code Analysis',
        iconKey: 'search'
      },
      {
        id: 'application-security',
        title: 'Application Security',
        shortDesc: 'Harden web and mobile codebases with zero-trust architectures, payload sanitization, and rate limits.',
        tech: 'Sanitization, CSP Headers, JWT',
        iconKey: 'shield'
      },
      {
        id: 'api-security',
        title: 'API Security',
        shortDesc: 'Prevent unauthorized scraping and broken object-level authorization (BOLA) across public endpoints.',
        tech: 'OAuth 2.0, Rate Limiting, API Keys',
        iconKey: 'lock'
      },
      {
        id: 'cloud-security-audit',
        title: 'Cloud Security',
        shortDesc: 'Audit AWS/GCP permissions to eliminate public bucket exposures and insecure IAM roles.',
        tech: 'IAM Least Privilege, CloudTrail',
        iconKey: 'cloud-rain'
      },
      {
        id: 'vulnerability-assessment',
        title: 'Vulnerability Assessment',
        shortDesc: 'Continuous scanning of network infrastructure and dependencies for known CVE vulnerabilities.',
        tech: 'Nessus, Snyk, Dependabot',
        iconKey: 'alert-triangle'
      },
      {
        id: 'penetration-testing',
        title: 'Penetration Testing',
        shortDesc: 'Ethical hacker red-team simulations to safely discover and patch security vulnerabilities before criminals do.',
        tech: 'Burp Suite, Metasploit, Red Teaming',
        iconKey: 'bug'
      },
      {
        id: 'security-monitoring',
        title: 'Security Monitoring',
        shortDesc: 'Real-time intrusion detection and instant alerts upon suspicious login attempts or payload surges.',
        tech: 'SIEM, Fail2ban, Cloudflare Bot Management',
        iconKey: 'eye'
      },
      {
        id: 'data-protection',
        title: 'Data Protection & Compliance',
        shortDesc: 'Implement end-to-end encryption at rest and in transit, ensuring readiness for GDPR and local compliance.',
        tech: 'AES-256 Encryption, GDPR Readiness',
        iconKey: 'file-lock'
      },
      {
        id: 'it-infrastructure-consulting',
        title: 'IT Infrastructure Consulting',
        shortDesc: 'Strategic guidance on modernizing legacy on-premise hardware, networking, and office workstations.',
        tech: 'Network Architecture, VPNs, SSO',
        iconKey: 'server'
      },
      {
        id: 'technology-consulting',
        title: 'Technology Consulting',
        shortDesc: 'Independent technological advisory evaluating build vs. buy decisions and software vendor contracts.',
        tech: 'Stack Audits, ROI Feasibility',
        iconKey: 'lightbulb'
      },
      {
        id: 'software-architecture-consulting',
        title: 'Software Architecture Consulting',
        shortDesc: 'Blueprints for high-concurrency systems, preventing costly technical debt before writing a line of code.',
        tech: 'Domain-Driven Design, Event Sourcing',
        iconKey: 'compass'
      },
      {
        id: 'digital-transformation',
        title: 'Digital Transformation Consulting',
        shortDesc: 'Transition traditional brick-and-mortar operations into agile, automated, cloud-connected businesses.',
        tech: 'Process Mapping, Change Management',
        iconKey: 'sparkles'
      }
    ]
  },

  {
    id: 'maintenance-support',
    name: 'Maintenance & Technical Support',
    shortName: 'Maintenance & Support',
    badge: '24/7 Reliability',
    iconName: 'Wrench',
    tagline: 'Continuous monitoring, instant emergency troubleshooting, and ongoing enhancements.',
    description: 'Software is a living asset. We keep your websites, mobile apps, and enterprise systems secure, updated, and lightning fast with dedicated SLA support, automated backups, and proactive monitoring.',
    subServices: [
      {
        id: 'website-maintenance',
        title: 'Website Maintenance',
        shortDesc: 'Regular CMS updates, plugin security patches, broken link audits, and scheduled database cleanups.',
        tech: 'WordPress, Next.js, Daily Checkups',
        iconKey: 'globe'
      },
      {
        id: 'mobile-app-maintenance-service',
        title: 'Mobile App Maintenance',
        shortDesc: 'Annual iOS and Android SDK version upgrades, App Store compliance updates, and crash diagnostics.',
        tech: 'Crashlytics, App Store Updates',
        iconKey: 'smartphone'
      },
      {
        id: 'software-maintenance',
        title: 'Software Maintenance',
        shortDesc: 'Proactive dependency audits, API deprecation fixes, and regular performance tuning.',
        tech: 'Node.js, Python, Security Patches',
        iconKey: 'cpu'
      },
      {
        id: 'bug-fixing',
        title: 'Bug Fixing',
        shortDesc: 'Rapid turnaround on critical functional bugs, responsive layout flaws, and checkout errors.',
        tech: 'Emergency SLA, Root-Cause Fixes',
        iconKey: 'bug'
      },
      {
        id: 'perf-optimization',
        title: 'Performance Optimization',
        shortDesc: 'Routine speed profiling, image compression, query optimization, and memory leak resolution.',
        tech: 'Lighthouse, Profilers, Cache Tuning',
        iconKey: 'zap'
      },
      {
        id: 'database-optimization',
        title: 'Database Optimization',
        shortDesc: 'Index analysis, slow query plan optimization, table vacuuming, and connection pool tuning.',
        tech: 'EXPLAIN ANALYZE, Indexing, PgBouncer',
        iconKey: 'database'
      },
      {
        id: 'security-updates',
        title: 'Security Updates',
        shortDesc: 'Prompt application of zero-day vulnerability patches and firewall rule updates.',
        tech: 'WAF Rules, CVE Patches, SSL Renewal',
        iconKey: 'shield-check'
      },
      {
        id: 'server-monitoring',
        title: 'Server Monitoring',
        shortDesc: '24/7 server health tracking alerting our on-call engineers within 60 seconds of any anomaly.',
        tech: 'UptimeRobot, Datadog, PagerDuty',
        iconKey: 'activity'
      },
      {
        id: 'technical-support-service',
        title: 'Technical Support',
        shortDesc: 'Dedicated Slack or WhatsApp team channel with direct access to senior engineers who know your codebase.',
        tech: 'Dedicated Slack, Guaranteed SLA',
        iconKey: 'headset'
      },
      {
        id: 'feature-enhancements',
        title: 'Feature Enhancements',
        shortDesc: 'Continuous monthly implementation of new client requested features, filters, and integrations.',
        tech: 'Agile Sprints, Roadmap Delivery',
        iconKey: 'plus-circle'
      },
      {
        id: 'backup-management',
        title: 'Backup Management',
        shortDesc: 'Automated off-site database and asset snapshots with quarterly manual restore drill tests.',
        tech: 'AWS S3, Encrypted Off-Site Storage',
        iconKey: 'archive'
      },
      {
        id: 'emergency-troubleshooting',
        title: 'Emergency Troubleshooting',
        shortDesc: 'Immediate crisis response team resolving server crashes, payment failures, or database locks.',
        tech: 'Hotline Support, Rapid Rollback',
        iconKey: 'alert-octagon'
      }
    ]
  },

  {
    id: 'offshore-development',
    name: 'Offshore Development & Staff Augmentation',
    shortName: 'Staff Augmentation',
    badge: 'Top 1% Talent',
    iconName: 'Users',
    tagline: 'Scale your engineering velocity with dedicated senior developers, QA engineers, and agile pods.',
    description: 'Overcome local talent shortages and scale your engineering capacity effortlessly. We provide thoroughly vetted senior full-stack, AI, and mobile developers who seamlessly integrate into your daily workflow.',
    subServices: [
      {
        id: 'dedicated-teams',
        title: 'Dedicated Development Teams',
        shortDesc: 'Autonomous engineering pods consisting of tech leads, developers, and QA managing your roadmap.',
        tech: 'Scrum, Jira, GitHub, Slack',
        iconKey: 'users'
      },
      {
        id: 'offshore-software-dev',
        title: 'Offshore Software Development',
        shortDesc: 'Cost-effective high-velocity engineering with clean communication and overlapping working hours.',
        tech: 'Direct Collaboration, Code Reviews',
        iconKey: 'globe'
      },
      {
        id: 'hire-fullstack',
        title: 'Hire Full-Stack Developers',
        shortDesc: 'Senior engineers proficient across modern React, Next.js, Node.js, Python, and SQL databases.',
        tech: 'MERN, PERN, TypeScript',
        iconKey: 'code-2'
      },
      {
        id: 'hire-react',
        title: 'Hire React Developers',
        shortDesc: 'Specialists in high-complexity component state, responsive design systems, and fast web applications.',
        tech: 'React 19, Redux, Zustand, Tailwind',
        iconKey: 'react'
      },
      {
        id: 'hire-nextjs',
        title: 'Hire Next.js Developers',
        shortDesc: 'Experts in App Router, Server Components, SSR optimization, and Vercel edge deployment.',
        tech: 'Next.js 15, SSR, Tailwind CSS',
        iconKey: 'nextjs'
      },
      {
        id: 'hire-nodejs',
        title: 'Hire Node.js Developers',
        shortDesc: 'Backend architects building high-concurrency microservices, REST APIs, and WebSocket servers.',
        tech: 'Node.js, Express, Nest.js, Redis',
        iconKey: 'server'
      },
      {
        id: 'hire-python',
        title: 'Hire Python Developers',
        shortDesc: 'Engineers specializing in FastAPI, Django, automation scripts, and machine learning pipelines.',
        tech: 'Python 3.12, FastAPI, Pandas, Celery',
        iconKey: 'terminal'
      },
      {
        id: 'hire-ai-developers',
        title: 'Hire AI Developers',
        shortDesc: 'Practitioners with real-world experience fine-tuning LLMs, building RAG systems, and AI workflows.',
        tech: 'LangChain, OpenAI API, HuggingFace',
        iconKey: 'cpu'
      },
      {
        id: 'hire-mobile-developers',
        title: 'Hire Mobile App Developers',
        shortDesc: 'Senior Flutter and React Native engineers who have deployed dozens of production apps.',
        tech: 'Flutter, React Native, Swift, Kotlin',
        iconKey: 'smartphone'
      },
      {
        id: 'dedicated-qa',
        title: 'Dedicated QA Engineers',
        shortDesc: 'Manual and automated testing specialists ensuring zero critical defects hit production.',
        tech: 'Playwright, Cypress, Postman, Jest',
        iconKey: 'check-circle'
      },
      {
        id: 'remote-dev-teams',
        title: 'Remote Development Teams',
        shortDesc: 'Pre-assembled, battle-tested teams ready to kick off within 48 hours without lengthy hiring delays.',
        tech: 'Timezone Overlap, Daily Standups',
        iconKey: 'laptop'
      },
      {
        id: 'it-staff-augmentation',
        title: 'IT Staff Augmentation',
        shortDesc: 'Plug individual senior engineers directly into your in-house engineering team on flexible terms.',
        tech: 'Zero Overhead, Flexible Sprints',
        iconKey: 'user-plus'
      },
      {
        id: 'white-label-dev',
        title: 'White-Label Development',
        shortDesc: 'We build exceptional code behind the scenes for other agencies under complete NDA protection.',
        tech: '100% Confidentiality, Agency NDA',
        iconKey: 'shield'
      },
      {
        id: 'longterm-partnerships',
        title: 'Long-Term Development Partnerships',
        shortDesc: 'Strategic technology partners who care about your balance sheet and long-term business equity.',
        tech: 'Executive Roadmap, Shared Vision',
        iconKey: 'handshake'
      }
    ]
  }
];


// Focused category views share existing overview records to avoid duplicate services.
const focusedCategories = [
  { id: 'seo-optimization', name: 'SEO Optimization', iconName: 'TrendingUp', existingId: 'seo-dominance',
    description: 'Improve website visibility, organic traffic, Google rankings, and search engine performance through comprehensive SEO strategies.',
    keywords: ['SEO', 'SCO', 'Search Engine Optimization', 'Google Ranking', 'Technical SEO', 'On-Page SEO', 'Off-Page SEO'],
    deliverables: ['Technical SEO', 'On-page SEO', 'Off-page SEO', 'Keyword research', 'Website audits', 'Core Web Vitals optimization', 'Local SEO', 'SEO analytics and reporting'], tech: 'Google Search Console, Analytics, Core Web Vitals' },
  { id: 'whatsapp-integration', name: 'WhatsApp Integration', iconName: 'MessageCircle',
    description: 'Integrate WhatsApp Business messaging into websites and applications to automate customer communication, notifications, and support workflows.',
    keywords: ['WhatsApp', 'WhatsApp API', 'Business Messaging', 'Chat Automation', 'WhatsApp Integration'],
    deliverables: ['WhatsApp Business API integration', 'Automated notifications', 'Contact form notifications', 'Customer support automation', 'Chatbot integration', 'Lead management', 'Message templates', 'CRM integration'], tech: 'WhatsApp Business API, Webhooks, CRM' },
  { id: 'ai-integration', name: 'AI Integration', iconName: 'Cpu', existingId: 'ai-integration',
    description: 'Transform business operations using AI-powered automation, intelligent assistants, machine learning, and advanced AI integrations.',
    keywords: ['AI', 'Artificial Intelligence', 'AI Automation', 'AI Chatbot', 'Machine Learning', 'LLM'],
    deliverables: ['AI chatbot development', 'OpenAI API integration', 'AI agents and automation', 'Machine learning integration', 'AI-powered customer support', 'Document processing', 'Workflow automation', 'Custom AI solutions'], tech: 'OpenAI API, LLMs, Machine Learning, REST APIs' },
  { id: 'custom-software-development', name: 'Custom Software Development', iconName: 'Code2', existingId: 'custom-software-dev',
    description: 'Build scalable, secure, and customized software solutions tailored to specific business requirements and workflows.',
    keywords: ['Custom Software', 'Software Development', 'Web Applications', 'Enterprise Software', 'SaaS', 'Backend Development'],
    deliverables: ['Custom web application development', 'Enterprise software development', 'SaaS platform development', 'Backend and API development', 'Database architecture', 'Business management systems', 'ERP and CRM solutions', 'Software maintenance and support'], tech: 'React, Node.js, Databases, APIs, SaaS' }
];
for (const spec of focusedCategories) {
  const existing = spec.existingId && serviceCategories.flatMap(cat => cat.subServices).find(sub => sub.id === spec.existingId);
  if (spec.existingId && !existing) throw new Error('Missing existing service: ' + spec.existingId);
  const overview = existing || { id: spec.id + '-overview' };
  Object.assign(overview, { title: spec.name, shortDesc: spec.description, tech: spec.tech, iconKey: spec.iconName, keywords: spec.keywords, deliverables: spec.deliverables });
  serviceCategories.push({ id: spec.id, name: spec.name, shortName: spec.name, iconName: spec.iconName, description: spec.description, tagline: spec.description, keywords: spec.keywords, subServices: [overview] });
}

export const technologiesData = [
  {
    category: 'AI & Machine Learning',
    techs: [
      { name: 'OpenAI (GPT-4o)', role: 'LLMs & Vision', color: '#10A37F' },
      { name: 'Anthropic Claude', role: 'Reasoning & Coding', color: '#D97706' },
      { name: 'Google Gemini', role: 'Multimodal AI', color: '#1A73E8' },
      { name: 'LangChain', role: 'AI Agent Frameworks', color: '#2563EB' },
      { name: 'PyTorch', role: 'Deep Learning', color: '#EE4C2C' },
      { name: 'HuggingFace', role: 'Model Repositories', color: '#FFD21E' },
      { name: 'Pinecone', role: 'Vector Search DB', color: '#000000' },
      { name: 'Whisper', role: 'Voice AI & Speech', color: '#10A37F' }
    ]
  },
  {
    category: 'Frontend',
    techs: [
      { name: 'React 19', role: 'Reactive UI Engine', color: '#61DAFB' },
      { name: 'Next.js 15', role: 'SSR & App Router', color: '#000000' },
      { name: 'TypeScript', role: 'Type-Safe Architecture', color: '#3178C6' },
      { name: 'Tailwind CSS', role: 'Utility Styling', color: '#06B6D4' },
      { name: 'Vite', role: 'Modern Bundler', color: '#646CFF' },
      { name: 'Three.js / WebGL', role: '3D Graphics', color: '#049EF4' },
      { name: 'Vue.js', role: 'Progressive Framework', color: '#4FC08D' },
      { name: 'HTML5 & CSS3', role: 'Modern Web Standards', color: '#E34F26' }
    ]
  },
  {
    category: 'Backend',
    techs: [
      { name: 'Node.js', role: 'High-Concurrency Runtime', color: '#5FA04E' },
      { name: 'Python', role: 'FastAPI & Data Science', color: '#3776AB' },
      { name: 'Express.js', role: 'RESTful API Services', color: '#000000' },
      { name: 'Nest.js', role: 'Enterprise TS Backend', color: '#E0234E' },
      { name: 'Go (Golang)', role: 'Microservice Performance', color: '#00ADD8' },
      { name: 'FastAPI', role: 'Async Python APIs', color: '#009688' },
      { name: 'GraphQL', role: 'Declarative Data Fetching', color: '#E10098' },
      { name: 'Django', role: 'Secure Python Framework', color: '#092E20' }
    ]
  },
  {
    category: 'Mobile',
    techs: [
      { name: 'Flutter', role: 'Google Multiplatform UI', color: '#02569B' },
      { name: 'React Native', role: 'Native JS Apps', color: '#61DAFB' },
      { name: 'Swift', role: 'Apple Native iOS', color: '#F05138' },
      { name: 'Kotlin', role: 'Native Android', color: '#7F52FF' },
      { name: 'Jetpack Compose', role: 'Modern Android UI', color: '#4285F4' },
      { name: 'SwiftUI', role: 'Declarative Apple UI', color: '#0071E3' },
      { name: 'Capacitor', role: 'Hybrid Mobile Shells', color: '#119EFF' },
      { name: 'Firebase', role: 'Mobile Push & Auth', color: '#FFCA28' }
    ]
  },
  {
    category: 'Database',
    techs: [
      { name: 'PostgreSQL', role: 'Relational ACID Core', color: '#4169E1' },
      { name: 'MongoDB', role: 'Document NoSQL', color: '#47A248' },
      { name: 'Redis', role: 'In-Memory Cache & Queues', color: '#DC382D' },
      { name: 'Supabase', role: 'Open Source Firebase', color: '#3ECF8E' },
      { name: 'MySQL', role: 'Relational Workhorse', color: '#4479A1' },
      { name: 'Qdrant / Chroma', role: 'Vector Embeddings', color: '#DC2626' },
      { name: 'Prisma ORM', role: 'Next-Gen Data Layer', color: '#2D3748' },
      { name: 'SQLite', role: 'Embedded Device Storage', color: '#003B57' }
    ]
  },
  {
    category: 'Cloud & DevOps',
    techs: [
      { name: 'AWS Cloud', role: 'Enterprise Cloud Infra', color: '#FF9900' },
      { name: 'Google Cloud (GCP)', role: 'Kubernetes & AI Cloud', color: '#4285F4' },
      { name: 'Microsoft Azure', role: 'Enterprise Hybrid Cloud', color: '#0078D4' },
      { name: 'Docker', role: 'Immutable Containers', color: '#2496ED' },
      { name: 'Kubernetes', role: 'Container Orchestration', color: '#326CE5' },
      { name: 'GitHub Actions', role: 'Automated CI/CD', color: '#2088FF' },
      { name: 'Cloudflare', role: 'Global Edge Security & CDN', color: '#F38020' },
      { name: 'Terraform', role: 'Infrastructure as Code', color: '#844FBA' }
    ]
  },
  {
    category: 'Marketing & Analytics',
    techs: [
      { name: 'Google Analytics 4', role: 'User Behavioral Data', color: '#F9AB00' },
      { name: 'Meta CAPI & Pixel', role: 'Server-Side Attribution', color: '#0081FB' },
      { name: 'SEMrush & Ahrefs', role: 'Search Competitor Intel', color: '#FF642D' },
      { name: 'Google Search Console', role: 'Organic Indexing', color: '#4285F4' },
      { name: 'Google Tag Manager', role: 'Event Tracking Systems', color: '#246FDB' },
      { name: 'Hotjar & Clarity', role: 'UX Heatmaps & Funnels', color: '#FD3A5C' },
      { name: 'Klaviyo', role: 'Automated Ecom Marketing', color: '#2563EB' },
      { name: 'Shopify Plus', role: 'High-Volume Commerce', color: '#95BF47' }
    ]
  }
];

export const industriesData = [
  {
    id: 'healthcare',
    name: 'Healthcare & MedTech',
    desc: 'HIPAA-compliant EHR portals, telemedicine apps, AI diagnostic assistants, and pharmacy inventory.',
    icon: 'Activity'
  },
  {
    id: 'ecommerce-retail',
    name: 'E-Commerce & Retail',
    desc: 'High-converting omnichannel stores, multi-vendor marketplaces, POS software, and personalized AI shopping.',
    icon: 'ShoppingBag'
  },
  {
    id: 'fintech',
    name: 'FinTech & Banking',
    desc: 'Secure payment gateways, credit underwriting algorithms, wealth management portals, and automated billing.',
    icon: 'CreditCard'
  },
  {
    id: 'education',
    name: 'Education & EdTech',
    desc: 'School & university management systems, virtual classrooms, automated grading, and student web portals.',
    icon: 'GraduationCap'
  },
  {
    id: 'real-estate',
    name: 'Real Estate & PropTech',
    desc: 'Property listing portals, 3D virtual tour integrations, agent lead management, and automated booking systems.',
    icon: 'Building'
  },
  {
    id: 'logistics',
    name: 'Logistics & Supply Chain',
    desc: 'Live fleet GPS telemetry, multi-warehouse inventory sync, route optimization, and delivery apps.',
    icon: 'Truck'
  },
  {
    id: 'startups',
    name: 'Startups & Scaleups',
    desc: 'Zero-to-Hero incubator acceleration, rapid MVP builds, fundraising pitch prototypes, and scalable SaaS.',
    icon: 'Rocket'
  },
  {
    id: 'manufacturing',
    name: 'Manufacturing & Industrial',
    desc: 'IoT telemetry dashboards, automated defect detection, supply chain ERPs, and equipment maintenance tracking.',
    icon: 'Cog'
  },
  {
    id: 'hospitality',
    name: 'Hospitality & Travel',
    desc: 'Direct booking engines, room availability sync, food ordering mobile apps, and guest loyalty portals.',
    icon: 'Compass'
  },
  {
    id: 'enterprise',
    name: 'Enterprise & IT Services',
    desc: 'Legacy modernization, internal employee portals, single sign-on (SSO), and dedicated development pods.',
    icon: 'Building2'
  }
];

export const servicesFaqs = [
  {
    q: 'How does your Zero to Hero product development process work?',
    a: 'Our Zero to Hero service takes you from a raw napkin concept to a production-ready, revenue-generating digital product in 4 to 12 weeks. We handle validation, product strategy, high-fidelity UI/UX design, full-stack web/mobile development, cloud architecture, security audits, and production launch with continuous scaling.'
  },
  {
    q: 'Can you integrate custom AI models into our existing software?',
    a: 'Yes. We specialize in non-disruptive AI integration. We build private APIs, custom RAG (Retrieval-Augmented Generation) pipelines on your proprietary documents, and autonomous AI agents that plug directly into your current CRM, ERP, mobile app, or web portal.'
  },
  {
    q: 'Who owns the intellectual property (IP) and source code?',
    a: 'You own 100% of all intellectual property, source code, designs, and database assets from Day 1. We operate under strict mutual Non-Disclosure Agreements (NDAs), and transfer all repository access directly to your accounts upon completion.'
  },
  {
    q: 'What is your typical project timeline and delivery speed?',
    a: 'Custom websites and focused MVPs typically launch within 3 to 6 weeks. Comprehensive enterprise software, cross-platform mobile apps, and multi-agent AI ecosystems generally range from 6 to 14 weeks depending on feature scope. We run bi-weekly agile sprints with live staging links.'
  },
  {
    q: 'How does your Offshore Development & Staff Augmentation model operate?',
    a: 'You can hire dedicated senior engineers (React, Next.js, Node.js, Python, Flutter, AI) or complete agile pods that work exclusively on your roadmap. Developers communicate in real time on your Slack/Teams, attend your daily standups, and provide guaranteed timezone overlap.'
  },
  {
    q: 'Do you provide ongoing maintenance and post-launch technical support?',
    a: 'Absolutely. Every production launch includes a warranty stabilization period, after which you can continue with our proactive Maintenance & Evolution Retainers for 24/7 server monitoring, security updates, feature enhancements, and instant SLA emergency support.'
  }
];

