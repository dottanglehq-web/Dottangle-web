// Editorial content supplements the shared catalog; service names and relationships stay there.
export const categoryPageContent = {
  'ai-development': {
    overview: 'AI development connects models, business data, and operational tools into systems that can be evaluated and monitored. We start with a defined decision or task, establish an accuracy baseline, and keep people in control of sensitive actions.',
    audience: 'Operations teams processing documents, support teams answering repeat questions, and product teams adding intelligent features.',
    outcomes: ['Retrieve answers from approved internal documents with source references.', 'Route incoming requests and extract document fields for human review.', 'Recommend relevant products using customer and catalog signals.'],
    process: ['Audit data access and map the task', 'Define evaluation cases and acceptance thresholds', 'Design retrieval, permissions, and model boundaries', 'Build model integrations and tool workflows', 'Test accuracy, unsafe outputs, latency, and cost', 'Deploy with monitoring and human escalation'],
    tools: ['Python', 'PyTorch', 'TensorFlow', 'LangChain', 'OpenAI APIs', 'Vector databases'],
    faqs: [
      ['Do we need to train a model from scratch?', 'Usually not. We compare existing models, retrieval over your data, and fine-tuning against the task before committing to a training investment.'],
      ['Can AI use our private documents?', 'Yes, with approved data sources and access controls. We define ingestion, retention, provider handling, and user permissions before connecting documents.'],
      ['How do you measure answer quality?', 'We build a representative evaluation set and test factual accuracy, retrieval relevance, refusal behavior, response time, and cost per completed task.'],
      ['Can a person approve automated actions?', 'Yes. Workflows can require review before sending messages, changing records, or taking other sensitive actions.']
    ]
  },
  'zero-to-hero': {
    overview: 'A new digital product needs evidence before it needs a large feature list. We bring research, product design, engineering, and launch planning into one delivery stream, with a usable MVP as the first investment milestone.',
    audience: 'Founders validating a new venture and established teams launching a new digital product.',
    outcomes: ['Test a product assumption with a working prototype before a full build.', 'Launch a focused MVP with payments, onboarding, and a measurable activation path.', 'Use early customer feedback to prioritize the next release.'],
    process: ['Interview target users and validate the problem', 'Prioritize the MVP and define commercial assumptions', 'Prototype onboarding and core user journeys', 'Build the product, APIs, and administration tools', 'Run usability, security, and release testing', 'Launch, measure activation, and plan the next iteration'],
    tools: ['Figma', 'React', 'Node.js', 'PostgreSQL', 'Cloud hosting', 'Product analytics'],
    faqs: [
      ['What belongs in the first MVP?', 'The smallest complete workflow that lets a real customer experience the product value. We separate that from features that can wait for evidence.'],
      ['Can you help before we have a specification?', 'Yes. Discovery turns the problem, target audience, and constraints into a prototype, prioritized scope, and delivery plan.'],
      ['Do you support the product after launch?', 'We can plan a stabilization period and ongoing releases around observed usage, support requests, and agreed business priorities.'],
      ['Who owns the product assets?', 'The handover includes the agreed source code, design files, infrastructure documentation, and account access under the project agreement.']
    ]
  },
  'web-development': {
    overview: 'A business website must make information easy to find and give visitors a clear next step. We connect content structure, responsive design, accessible interfaces, and technical implementation so the site can serve customers and the team maintaining it.',
    audience: 'Businesses replacing a slow or dated site, launching a new brand, or building a customer portal.',
    outcomes: ['Guide visitors from a service page to a qualified inquiry.', 'Let editors publish pages without changing application code.', 'Reduce friction in slow pages, forms, and mobile navigation.'],
    process: ['Audit the current site and conversion paths', 'Map content, URLs, and measurement goals', 'Design responsive layouts and accessible components', 'Build the frontend, CMS, and integrations', 'Test forms, redirects, accessibility, and performance', 'Launch with analytics and an editor handover'],
    tools: ['React', 'Next.js', 'Node.js', 'TypeScript', 'Tailwind CSS', 'WordPress'],
    faqs: [
      ['Can you preserve our existing search traffic during a redesign?', 'We inventory important URLs, plan redirects, preserve relevant content, and check indexing signals. Rankings also depend on search engines and competing sites.'],
      ['Will our team be able to edit content?', 'We select an editing workflow around the pages your team needs to maintain and provide a handover for the agreed CMS.'],
      ['Can you connect a CRM or booking system?', 'Yes. We define the data flow, validation, and failure behavior for each integration rather than relying only on a visual embed.'],
      ['How do you check mobile quality?', 'We test layout widths, keyboard access, forms, touch targets, and page performance on representative devices and browsers.']
    ]
  },
  'mobile-app-development': {
    overview: 'Mobile applications need to work around device constraints, unreliable networks, and platform permissions. We design the core journey first, then choose native or cross-platform development based on hardware needs, release plans, and maintenance cost.',
    audience: 'Consumer businesses building repeat engagement and enterprises equipping field teams with mobile workflows.',
    outcomes: ['Capture field work offline and synchronize when connectivity returns.', 'Support repeat purchases with an app designed around returning customers.', 'Deliver timely, permission-based notifications tied to useful actions.'],
    process: ['Map device needs and mobile user journeys', 'Choose native or cross-platform delivery', 'Prototype navigation, permissions, and offline states', 'Build app screens, APIs, and device integrations', 'Test on devices and prepare store submissions', 'Release gradually and monitor crashes and adoption'],
    tools: ['React Native', 'Flutter', 'Kotlin', 'Swift', 'Firebase', 'App Store Connect'],
    faqs: [
      ['Should we choose Flutter, React Native, or native development?', 'We compare hardware integrations, team skills, performance needs, and platform differences before recommending an approach.'],
      ['Can the app work offline?', 'Selected workflows can. We define what is stored on the device, how conflicts are resolved, and which actions still require a connection.'],
      ['Do you handle app store submission?', 'We can prepare builds, store assets, and submission details in your developer accounts. Approval remains subject to each store review.'],
      ['What happens after an OS update?', 'An ongoing maintenance scope can include dependency updates, compatibility testing, and fixes for supported operating system versions.']
    ]
  },
  'custom-software': {
    overview: 'Enterprise software should reflect how your teams actually work. We map business rules and ownership across departments, then build connected systems that reduce duplicate entry and make operational decisions traceable.',
    audience: 'Organizations whose ERP, CRM, inventory, finance, or departmental tools no longer match their processes.',
    outcomes: ['Connect sales, inventory, and billing around a consistent record.', 'Replace spreadsheet approvals with permissions and an audit trail.', 'Give managers operational reports without manual data consolidation.'],
    process: ['Map departmental workflows and system constraints', 'Define business rules and migration scope', 'Design data models, permissions, and integrations', 'Implement modules and automated workflows', 'Validate migrated data and run user acceptance tests', 'Roll out in phases with training and support'],
    tools: ['Node.js', 'Python', 'React', 'PostgreSQL', 'REST APIs', 'Docker'],
    faqs: [
      ['Can you replace only one part of our existing system?', 'Yes. A phased approach can introduce a module or integration while other systems continue operating.'],
      ['How do you move historical data?', 'We agree mappings and quality rules, rehearse the migration, reconcile totals, and define a rollback plan before cutover.'],
      ['Can different teams have different access?', 'Role-based permissions can separate viewing, editing, approvals, and administrative actions at the required level.'],
      ['How are business rules validated?', 'We document examples and exceptions with process owners and use them in automated checks and user acceptance testing.']
    ]
  },
  'ecommerce-development': {
    overview: 'Commerce development connects the storefront to the systems behind every order. We work on product discovery, checkout, payments, inventory, and fulfillment as one journey so customers and operations teams see consistent information.',
    audience: 'Retailers launching online, brands improving checkout, and businesses connecting multiple selling channels.',
    outcomes: ['Reduce avoidable checkout steps and clarify delivery costs.', 'Synchronize catalog and stock information across connected systems.', 'Support repeat orders, subscriptions, or wholesale purchasing where needed.'],
    process: ['Audit the catalog, checkout, and order operations', 'Choose the platform and integration boundaries', 'Design product discovery and purchase flows', 'Build storefront, payments, and fulfillment connections', 'Test tax, stock, refunds, and failed payments', 'Launch with order monitoring and conversion measurement'],
    tools: ['Shopify', 'WooCommerce', 'React', 'Next.js', 'Stripe', 'Payment APIs'],
    faqs: [
      ['Should we use Shopify or a custom storefront?', 'We weigh catalog complexity, checkout constraints, integrations, editor needs, and the cost of maintaining a custom experience.'],
      ['Can you connect our inventory system?', 'Yes, where the source system supports suitable access. We define stock ownership, synchronization timing, and handling for failures.'],
      ['Can we migrate an existing store?', 'We plan the transfer of products, customers, content, and redirects. Order history and passwords depend on platform capabilities.'],
      ['How do you test checkout?', 'We cover successful and failed payments, shipping options, taxes, discounts, stock changes, and refund workflows in a safe test environment.']
    ]
  },
  'digital-marketing': {
    overview: 'Marketing works best when acquisition activity is connected to qualified leads and sales. We establish tracking, identify the audience and offer, and test channels against the business economics rather than reporting clicks alone.',
    audience: 'Businesses investing in search, paid campaigns, content, and lifecycle marketing with a need for clearer attribution.',
    outcomes: ['Connect campaign activity to lead quality and pipeline stages.', 'Test landing pages and creative against a defined conversion goal.', 'Build repeat engagement through segmented email and remarketing journeys.'],
    process: ['Review the audience, offer, and acquisition baseline', 'Set channel budgets and conversion definitions', 'Prepare tracking, landing pages, and creative', 'Launch search, social, and content campaigns', 'Analyze lead quality and experiment results', 'Reallocate spend and report commercial outcomes'],
    tools: ['Google Ads', 'Meta Ads', 'Google Analytics 4', 'Google Tag Manager', 'Search Console', 'Klaviyo'],
    faqs: [
      ['How do you decide which channels to use?', 'We consider buying intent, audience reach, sales cycle, creative capacity, and the budget available for a meaningful test.'],
      ['Will you report leads or just traffic?', 'We agree conversion definitions and connect CRM stages where possible so reporting can distinguish visits, inquiries, and qualified opportunities.'],
      ['Can you guarantee a return on ad spend?', 'No. Results depend on the offer, market, margins, attribution, and execution. We use controlled tests and clear stop or scale criteria.'],
      ['Do you work with our existing marketing team?', 'Yes. We can own a channel, measurement setup, or campaign stream with explicit responsibilities and a shared reporting cadence.']
    ]
  },
  'graphic-design': {
    overview: 'Brand design makes a business recognizable across the places customers encounter it. We turn positioning into a visual system, then document how that system should be applied in digital, print, and campaign materials.',
    audience: 'New ventures establishing an identity and existing businesses whose visual materials have become inconsistent.',
    outcomes: ['Create a consistent identity across website, packaging, and social channels.', 'Give internal teams reusable assets and clear usage rules.', 'Explain a product or offer with purposeful presentation and campaign design.'],
    process: ['Review positioning, competitors, and existing assets', 'Define creative direction and design requirements', 'Explore identity concepts and typography', 'Develop approved assets and application layouts', 'Check legibility, formats, and production specifications', 'Deliver source files and brand usage guidance'],
    tools: ['Figma', 'Adobe Illustrator', 'Adobe Photoshop', 'Adobe InDesign', 'After Effects'],
    faqs: [
      ['Do we need a new logo or a broader identity?', 'A logo is one part of recognition. We review whether typography, color, layout, and imagery also need a consistent system.'],
      ['What files will we receive?', 'The agreed handover can include editable source files, vector exports, digital assets, print-ready files, and usage guidelines.'],
      ['Can you work within our existing brand?', 'Yes. We can extend an established system into campaigns, presentations, packaging, or digital interfaces.'],
      ['How are design revisions managed?', 'We agree review stages and decision owners, then consolidate feedback against the creative brief before the next revision.']
    ]
  },
  'cloud-devops': {
    overview: 'Cloud and DevOps work makes software releases repeatable and production behavior visible. We assess deployment paths, infrastructure, recovery, and operating cost, then automate the parts that create avoidable risk or delay.',
    audience: 'Teams moving to cloud infrastructure, stabilizing production, or replacing manual deployments.',
    outcomes: ['Release through repeatable pipelines with checks and rollback steps.', 'Recover services using tested backups and documented procedures.', 'Identify capacity bottlenecks and unused infrastructure spend.'],
    process: ['Assess infrastructure, release history, and costs', 'Set reliability targets and migration boundaries', 'Design environments, networking, and access controls', 'Implement infrastructure code and delivery pipelines', 'Rehearse recovery, rollback, and load scenarios', 'Hand over monitoring, runbooks, and cost reviews'],
    tools: ['AWS', 'Azure', 'Google Cloud', 'Docker', 'Kubernetes', 'Terraform', 'GitHub Actions'],
    faqs: [
      ['Can we migrate without interrupting users?', 'We assess dependencies and plan replication, cutover, and rollback. Some systems still require a maintenance window, which is agreed in advance.'],
      ['Do we need Kubernetes?', 'Not always. Managed application platforms or simpler containers may meet the reliability and scaling needs with less operational overhead.'],
      ['How do you control cloud costs?', 'We review utilization, storage, data transfer, and service choices, then establish budgets and alerts alongside performance requirements.'],
      ['Are backups enough for disaster recovery?', 'No. Recovery also needs tested restoration steps, access, dependency knowledge, and agreed recovery time and data-loss objectives.']
    ]
  },
  'cybersecurity-consulting': {
    overview: 'Security consulting identifies exposure and turns findings into practical remediation. We define an authorized scope, inspect architecture and controls, and help teams prioritize fixes by business impact and likelihood.',
    audience: 'Organizations preparing a release, investigating security gaps, or planning improvements to their IT controls.',
    outcomes: ['Find and prioritize exploitable application weaknesses.', 'Reduce excessive permissions and improve access review practices.', 'Translate technical findings into an actionable remediation roadmap.'],
    process: ['Agree authorization, assets, and testing boundaries', 'Model threats and review existing controls', 'Plan safe testing and evidence collection', 'Assess applications, infrastructure, and access paths', 'Validate findings and retest agreed fixes', 'Deliver remediation priorities and operational guidance'],
    tools: ['OWASP ZAP', 'Burp Suite', 'Nmap', 'Dependency scanners', 'Cloud security tooling'],
    faqs: [
      ['Do you need permission before testing?', 'Yes. Assessment requires written authorization, a defined asset scope, approved methods, and escalation contacts.'],
      ['Will testing disrupt production?', 'We agree limits and safe testing windows. Higher-risk checks can be run in a representative staging environment.'],
      ['Does an assessment guarantee compliance?', 'No. An assessment provides evidence and remediation guidance; certification or legal compliance requires the applicable audit and organizational controls.'],
      ['What happens after vulnerabilities are reported?', 'Findings include impact and practical remediation guidance. Retesting can confirm whether the agreed fixes address the observed issue.']
    ]
  },
  'maintenance-support': {
    overview: 'Maintenance keeps an existing product usable as dependencies, workloads, and business needs change. We establish a support baseline, triage incidents, and schedule updates around the risks and release constraints of your application.',
    audience: 'Businesses running websites, apps, or backend systems that need ongoing care and a defined technical point of contact.',
    outcomes: ['Detect service degradation through actionable monitoring.', 'Keep dependencies and security patches on a managed schedule.', 'Resolve recurring incidents through root-cause fixes and runbooks.'],
    process: ['Inventory applications, access, and known issues', 'Agree support hours and incident priorities', 'Set up monitoring, backups, and escalation paths', 'Triage incidents and deliver scheduled fixes', 'Verify patches and rehearse restoration', 'Review recurring problems and the maintenance backlog'],
    tools: ['Sentry', 'Grafana', 'Uptime monitoring', 'Dependency scanners', 'Backup tooling', 'Issue trackers'],
    faqs: [
      ['Can you maintain software built by another team?', 'Yes, subject to a technical review of the source code, deployment process, dependencies, and access available.'],
      ['Is support available around the clock?', 'Support hours, response targets, severity definitions, and escalation coverage are agreed in the support plan.'],
      ['Are new features included in maintenance?', 'Bug fixes, updates, and feature work are scoped separately so incident response is not displaced by an undefined feature backlog.'],
      ['How do you avoid an update breaking production?', 'We use staging checks, backups, release notes, and a rollback path appropriate to the application and change.']
    ]
  },
  'offshore-development': {
    overview: 'Staff augmentation adds delivery capacity while keeping product direction with your team. We align skills, ownership, communication hours, and review practices before engineers join an existing roadmap.',
    audience: 'Product and engineering leaders filling a specialist gap or adding a dedicated delivery pod.',
    outcomes: ['Add engineering capacity without redistributing ownership of the roadmap.', 'Bring specialist skills into a defined product workstream.', 'Maintain review and delivery standards across distributed teams.'],
    process: ['Define role expectations and roadmap needs', 'Match skills and agree working-hour overlap', 'Onboard engineers into tools and architecture', 'Deliver through your sprint and review workflow', 'Review quality, collaboration, and delivery signals', 'Adjust capacity and document knowledge transfer'],
    tools: ['GitHub', 'GitLab', 'Jira', 'Linear', 'Slack', 'Microsoft Teams'],
    faqs: [
      ['Will developers work in our repositories?', 'They can work in your repositories and delivery tools with access granted according to your security policies.'],
      ['Can we hire a single specialist?', 'Yes. The engagement can cover an individual role or a coordinated team, depending on the delivery responsibilities required.'],
      ['How is timezone overlap arranged?', 'We agree collaboration hours, meeting expectations, and asynchronous handover practices before onboarding.'],
      ['How do you prevent knowledge loss?', 'We use reviewed code, documented decisions, shared runbooks, and a planned handover rather than relying on a single engineer.']
    ]
  },
  'seo-optimization': {
    overview: 'SEO makes a website easier to crawl, understand, and match to relevant searches. We separate technical blockers from content and authority gaps, then prioritize work around the pages that support your business.',
    audience: 'Businesses with limited organic discovery, indexing problems, or important pages that do not attract qualified visitors.',
    outcomes: ['Resolve indexing and internal linking problems on important pages.', 'Align service content with the questions prospective customers ask.', 'Track organic inquiries alongside impressions and search clicks.'],
    process: ['Audit crawlability, indexing, and organic traffic', 'Map search intent to priority pages', 'Plan content structure and technical fixes', 'Implement metadata, links, and page improvements', 'Validate indexing signals and tracking accuracy', 'Monitor search trends and refine the content roadmap'],
    tools: ['Google Search Console', 'Google Analytics 4', 'Screaming Frog', 'Ahrefs', 'PageSpeed Insights'],
    faqs: [
      ['How soon can SEO changes produce results?', 'Crawl fixes may be noticed sooner than competitive ranking changes. Timing depends on crawl frequency, site history, competition, and content quality.'],
      ['Can you guarantee a first-page ranking?', 'No. Search engines control rankings. We focus on measurable technical improvements, relevant content, and qualified organic traffic.'],
      ['Does a redesign need an SEO migration plan?', 'Yes. URL mapping, redirects, metadata, canonical signals, and tracking should be reviewed before the old site is replaced.'],
      ['How will we know organic traffic is useful?', 'We connect search landing pages to meaningful events such as qualified inquiries, purchases, or demo requests where tracking permits.']
    ]
  },
  'whatsapp-integration': {
    overview: 'WhatsApp integration connects customer messaging to your existing website and operational tools. We define consent, message templates, event triggers, and handover rules so communication stays useful and support teams retain context.',
    audience: 'Businesses coordinating order updates, customer inquiries, appointments, and support through WhatsApp Business.',
    outcomes: ['Send order and appointment updates from existing business events.', 'Route website inquiries to a team with customer context.', 'Escalate automated conversations to an available support agent.'],
    process: ['Map messaging events and customer consent', 'Review Business account and provider requirements', 'Design templates, routing, and human handover', 'Connect messaging APIs, webhooks, and business systems', 'Test delivery failures, retries, and opt-outs', 'Launch with delivery monitoring and support training'],
    tools: ['WhatsApp Business Platform', 'Meta Graph API', 'Webhooks', 'Node.js', 'CRM APIs'],
    faqs: [
      ['Do we need a WhatsApp Business account?', 'The integration requires an eligible business setup and provider access. We review your current account and number before planning migration or onboarding.'],
      ['Can we send any message at any time?', 'Messaging is subject to the platform rules, consent requirements, and applicable template approvals. We design flows around those constraints.'],
      ['Can an agent take over from automation?', 'Yes. We can define escalation rules, assignment, and conversation context for a human support queue.'],
      ['How are messaging costs handled?', 'Platform and provider charges are separate from implementation. We identify the expected message types and volumes during planning.']
    ]
  },
  'ai-integration': {
    overview: 'AI integration adds a bounded intelligent capability to software you already use. We focus on the connection between your application, the model, and its data, including permissions, output validation, and a fallback when the model cannot complete the task.',
    audience: 'Teams adding assistants, document extraction, recommendations, or workflow automation to an established product.',
    outcomes: ['Add an assistant inside an existing customer or employee interface.', 'Turn incoming documents into reviewable structured records.', 'Connect AI output to a workflow without bypassing business rules.'],
    process: ['Identify the existing workflow and integration points', 'Choose model access and data handling boundaries', 'Design API contracts, prompts, and fallback states', 'Implement retrieval, validation, and application hooks', 'Evaluate outputs, permissions, and failure behavior', 'Release behind controls and monitor usage and cost'],
    tools: ['OpenAI APIs', 'Python', 'Node.js', 'REST APIs', 'Vector databases', 'Application webhooks'],
    faqs: [
      ['Can this work with our current CRM?', 'If the CRM provides suitable APIs or extension points, we can connect a scoped capability without replacing the whole system.'],
      ['How do you stop invalid output entering our database?', 'We validate response schemas and business rules, and can require human approval before committing changes.'],
      ['What happens when the model is unavailable?', 'We plan timeouts, retry limits, fallback messaging, and a manual path for tasks that cannot safely wait.'],
      ['Can we compare different model providers?', 'Yes. We can compare representative tasks for quality, latency, cost, and data handling before selecting an integration.']
    ]
  },
  'custom-software-development': {
    overview: 'A focused custom application can replace a specific manual workflow without becoming a broad enterprise transformation. We define the users, business rules, integrations, and maintenance responsibilities before building a solution around that workflow.',
    audience: 'Businesses that need a purpose-built internal tool, customer portal, or operational application.',
    outcomes: ['Replace repeated spreadsheet work with a validated application flow.', 'Give customers a secure portal for requests and status updates.', 'Connect a specific business process to existing accounting or CRM tools.'],
    process: ['Observe the workflow and document exceptions', 'Agree application scope and acceptance examples', 'Design screens, data structures, and access rules', 'Build the application and required integrations', 'Test edge cases and review with real users', 'Deploy with documentation and an ownership handover'],
    tools: ['React', 'Node.js', 'Python', 'PostgreSQL', 'REST APIs', 'Git'],
    faqs: [
      ['How is this different from buying an off-the-shelf tool?', 'Custom development is useful when a defined workflow, integration, or access requirement cannot be met economically by an existing product.'],
      ['Can we start with a small scope?', 'Yes. We can deliver one complete workflow first and use real feedback to decide whether additional modules are worthwhile.'],
      ['Can it connect to our existing database?', 'We review the schema, ownership, performance, and access controls before deciding whether direct access or a separate API is appropriate.'],
      ['Who maintains the application after handover?', 'We document deployment and operational responsibilities. Your team can take ownership, or an ongoing support scope can be agreed.']
    ]
  }
};
