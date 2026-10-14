import { useState } from 'react';
import { motion } from 'framer-motion';
import profilePhoto from './assets/abdul-raheem.jpg';
import {
  ArrowDownRight,
  ArrowUpRight,
  Code2,
  Github,
  Linkedin,
  Menu,
  X,
  Smartphone,
  Server,
  ShieldCheck,
  MapPin,
  Mail,
  Sparkles,
  CreditCard,
  Users,
  Award,
  ExternalLink,
  Layers,
  Globe,
  ShoppingBag,
  Truck,
  CheckCircle2
} from 'lucide-react';

const reveal = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.65, ease: 'easeOut' as const } }
};

// 1. Selected Products
const projects = [
  {
    n: '01',
    type: 'MOBILE · FINTECH',
    title: 'Field Recovery Platform',
    text: (
      <>
        A field-agent mobile application for loan recovery operations, featuring{' '}
        <strong>offline-capable task workflows</strong>, <strong>real-time GPS tracking</strong>,{' '}
        <strong>route optimization</strong>, and <strong>live recovery status synchronization</strong>.
      </>
    ),
    badges: ['GPS Route Optimization', 'Offline-First Sync', 'Live Disposition'],
    stack: ['Flutter', 'Dart', 'REST APIs', 'Spring Boot'],
    icon: Smartphone,
    orb: 'art-orb-1',
    metric: '50L+ LEADS SERVED',
    playStore: 'https://play.google.com/store/apps/details?id=com.credresolve.jatayu.jatayu&hl=en_IN'
  },
  {
    n: '02',
    type: 'FULL-STACK · ENTERPRISE',
    title: 'Loan Recovery Ecosystem',
    text: (
      <>
        End-to-end recovery infrastructure connecting <strong>field recovery agents</strong>,{' '}
        <strong>telecalling operations</strong>, managers, and communication channels in a secure,{' '}
        <strong>Kafka event-driven distributed architecture</strong>.
      </>
    ),
    badges: ['Kafka Event Streams', 'Role-Based Access (RBAC)', 'Calling Queues'],
    stack: ['Java', 'Spring Boot', 'Kafka', 'MySQL'],
    icon: Server,
    orb: 'art-orb-2',
    metric: 'REAL-TIME PIPELINE'
  },
  {
    n: '03',
    type: 'FINTECH · POINT-OF-SALE',
    title: 'Retail POS Buy-Now-Pay-Later',
    text: (
      <>
        Offline retail BNPL engine allowing customers at partner stores to complete{' '}
        <strong>instant 2-minute digital KYC</strong> via app/web. Disburses{' '}
        <strong>spot merchant payments</strong> while offering customers transparent{' '}
        <strong>3-month equal EMI plans</strong> with <strong>0% interest</strong> and{' '}
        <strong>zero processing fees</strong>.
      </>
    ),
    badges: ['2-Min Instant Digital KYC', 'Zero Interest · 3-Month EMI', 'Instant Merchant Payout'],
    stack: ['Flutter', 'Spring Boot', 'Payment Gateway', 'Instant KYC Engine'],
    icon: CreditCard,
    orb: 'art-orb-4',
    metric: '0% APR · 3x EMIS'
  },
  {
    n: '04',
    type: 'B2B SAAS · WORKFORCE',
    title: 'Enterprise HRMS & Payroll',
    text: (
      <>
        Multi-tenant B2B workforce platform with <strong>one-time corporate onboarding</strong>,{' '}
        <strong>hybrid biometric machine sync</strong>, <strong>GPS-geofenced mobile check-ins</strong>,{' '}
        <strong>dynamic employer policy configurator</strong>, and{' '}
        <strong>automated attendance-to-salary calculation</strong>.
      </>
    ),
    badges: ['Biometric & Mobile Check-in', 'GPS Geofencing Perimeter', 'Auto Salary & Deductions'],
    stack: ['Flutter', 'Java / Spring', 'Biometric APIs', 'Geofencing', 'MySQL'],
    icon: Users,
    orb: 'art-orb-5',
    metric: 'GEOFENCE & BIOMETRIC',
    playStore: 'https://play.google.com/store/apps/details?id=com.credresolve.sal360&hl=en_IN'
  },
  {
    n: '05',
    type: 'MOBILE · E-COMMERCE',
    title: 'Multi-platform Store Apps',
    text: (
      <>
        Production-ready cross-platform mobile commerce applications integrating{' '}
        <strong>dynamic product catalogs</strong>, <strong>intuitive checkout journeys</strong>,{' '}
        <strong>payment gateways</strong>, <strong>push notifications</strong>, and localized store tracking.
      </>
    ),
    badges: ['Cross-Platform Apps', 'Multi-Store Catalog', 'Payment Integrations'],
    stack: ['Flutter', 'BLoC', 'Firebase', 'REST APIs'],
    icon: Code2,
    orb: 'art-orb-3',
    metric: '150+ APPS SUPPORTED',
    playStore: 'https://play.google.com/store/apps/details?id=com.mobikul_woocommerce_marketplace&hl=en_IN',
    appStore: 'https://apps.apple.com/in/app/mobikul-magento2-multi-vendor/id1185207134'
  }
];

// 2. Published Apps on Stores
const publishedApps = [
  {
    name: 'Jatayu',
    category: 'FINTECH · LOAN RECOVERY',
    desc: 'Flagship field agent application for loan recovery operations with real-time GPS tracking, visit dispositions, route optimization, and receipt logging.',
    playStore: 'https://play.google.com/store/apps/details?id=com.credresolve.jatayu.jatayu&hl=en_IN',
    tags: ['Flutter', 'GPS Tracking', 'Offline Sync', 'CredResolve'],
    accent: 'neon'
  },
  {
    name: 'Sal360',
    category: 'B2B SAAS · HRMS & ATTENDANCE',
    desc: 'Enterprise employee workforce app supporting hybrid check-in, leave approvals, salary slips, and attendance history with office geofencing.',
    playStore: 'https://play.google.com/store/apps/details?id=com.credresolve.sal360&hl=en_IN',
    tags: ['Flutter', 'Geofencing', 'HRMS', 'Payroll Sync'],
    accent: 'cyan'
  },
  {
    name: 'Sal360 Flash',
    category: 'BIOMETRIC & IRIS ATTENDANCE',
    desc: 'High-security biometric and iris/facial recognition mobile verification system for automated workplace employee clock-ins.',
    playStore: 'https://play.google.com/store/apps/details?id=com.credresolve.sal360.iris&hl=en_IN',
    tags: ['Biometric SDK', 'Iris Auth', 'High Security'],
    accent: 'violet'
  },
  {
    name: 'Mobikul WooCommerce Multi Vendor',
    category: 'E-COMMERCE · MARKETPLACE',
    desc: 'Multi-vendor marketplace mobile experience converting WooCommerce webstores into interactive Android and iOS native mobile apps.',
    playStore: 'https://play.google.com/store/apps/details?id=com.mobikul_woocommerce_marketplace&hl=en_IN',
    appStore: 'https://apps.apple.com/in/app/mobikul-magento2-multi-vendor/id1185207134',
    tags: ['Flutter', 'WooCommerce', 'Multi-Vendor', 'Payments'],
    accent: 'amber'
  },
  {
    name: 'Mobikul WooCommerce Mobile Builder',
    category: 'STORE BUILDER · COMMERCE',
    desc: 'Mobile store builder app for WooCommerce merchants featuring dynamic banners, category carousels, and instant checkout sync.',
    playStore: 'https://play.google.com/store/apps/details?id=com.mobikul.woo_commerce&hl=en_IN',
    appStore: 'https://apps.apple.com/in/app/mobikul-app-for-woocommerce/id1321956315',
    tags: ['Flutter', 'App Builder', 'Catalog APIs'],
    accent: 'teal'
  },
  {
    name: 'Mobikul WooCommerce WMS',
    category: 'LOGISTICS · WAREHOUSE MGMT',
    desc: 'Warehouse Management System app for automated inventory count, barcode order scanning, batch picking, packing, and dispatch.',
    playStore: 'https://play.google.com/store/apps/details?id=com.webkul.mobikul.woocommerce_wms&hl=en_IN',
    appStore: 'https://apps.apple.com/in/app/wms-for-woocommerce/id1551757198',
    tags: ['Barcode Scan', 'WMS', 'Inventory', 'Orders'],
    accent: 'cyan'
  },
  {
    name: 'Mobikul WooCommerce Delivery',
    category: 'HYPERLOCAL · DELIVERY RIDER',
    desc: 'Delivery partner dispatch mobile app with live customer route mapping, order status assignment, and proof of delivery capture.',
    playStore: 'https://play.google.com/store/apps/details?id=com.mobikul.deliveryboy_wc&hl=en_IN',
    tags: ['Rider App', 'Google Maps', 'Delivery Dispatch'],
    accent: 'neon'
  },
  {
    name: 'Mobikul Hybrid Shopping App',
    category: 'CROSS-PLATFORM · COMMERCE',
    desc: 'High-speed hybrid commerce application bridging WordPress / WooCommerce stores with native mobile push notifications and caching.',
    playStore: 'https://play.google.com/store/apps/details?id=com.webkul.mobikul.hybridapplicationwp&hl=en_IN',
    appStore: 'https://apps.apple.com/in/app/woocommerce-hybrid-app/id6456410402',
    tags: ['Hybrid', 'Push Notifications', 'WordPress'],
    accent: 'violet'
  },
  {
    name: 'Mobikul Magento 2 Multi Vendor',
    category: 'ENTERPRISE · MARKETPLACE',
    desc: 'Enterprise-grade marketplace application for Magento 2 stores featuring seller micro-portals, reviews, and secure payment processing.',
    playStore: 'https://play.google.com/store/apps/details?id=com.webkul.magento2.mobikulMP&hl=en_IN',
    appStore: 'https://apps.apple.com/in/app/mobikul-magento2-multi-vendor/id1185207134',
    tags: ['Magento 2', 'Enterprise', 'Multi-Seller'],
    accent: 'amber'
  },
  {
    name: 'Mobikul PoS App for WooCommerce',
    category: 'POINT OF SALE · RETAIL POS',
    desc: 'Point-of-Sale mobile app for brick-and-mortar stores to process offline sales, cashier shifts, barcode scanning, and invoice printing.',
    playStore: 'https://play.google.com/store/apps/details?id=com.wooposapp&hl=en_IN',
    appStore: 'https://apps.apple.com/in/app/mobikul-app-for-woocommerce/id1321956315',
    tags: ['Retail POS', 'Offline Mode', 'Receipts', 'Cashier'],
    accent: 'teal'
  }
];

// 3. Technical Skills
const skillCategories = [
  {
    category: 'Mobile Development',
    tags: ['Flutter', 'Dart', 'Android', 'iOS', 'Kotlin', 'Swift']
  },
  {
    category: 'State Management',
    tags: ['BLoC', 'Cubit', 'Provider', 'GetX']
  },
  {
    category: 'Backend Development',
    tags: ['Java', 'Spring Boot', 'REST APIs', 'Microservices']
  },
  {
    category: 'Databases & Caching',
    tags: ['MySQL', 'PostgreSQL', 'Redis']
  },
  {
    category: 'Messaging & Event Streaming',
    tags: ['Apache Kafka', 'Event-Driven Architecture', 'Redis Pub/Sub']
  },
  {
    category: 'Architecture & Design',
    tags: ['System Design', 'Scalable Applications', 'Clean Architecture', 'API Integration']
  },
  {
    category: 'Cloud & DevOps',
    tags: ['Docker', 'Kubernetes', 'AWS', 'GCP', 'GitHub Actions', 'CI/CD']
  },
  {
    category: 'Security & Compliance',
    tags: ['Application Security', 'Authentication', 'Authorization', 'Encryption', 'VAPT', 'ISO Certification', 'HashiCorp Vault']
  },
  {
    category: 'Monitoring & Observability',
    tags: ['Grafana', 'Kibana', 'New Relic', 'Sentry', 'Production Logging']
  },
  {
    category: 'Mobile Deployment',
    tags: ['Google Play Console', 'Apple App Store', 'App Signing', 'Certificates & Provisioning']
  },
  {
    category: 'Firebase & Real-time Services',
    tags: ['Firebase', 'Push Notifications', 'Real-time Tracking', 'GPS Geofencing']
  },
  {
    category: 'E-commerce & POS Platforms',
    tags: ['Magento 2', 'WooCommerce', 'CS-Cart', 'Odoo', 'PrestaShop', 'Payment Gateway Integration']
  },
  {
    category: 'AI Development Tools',
    tags: ['Claude Code', 'Cursor', 'Windsurf', 'ChatGPT', 'Google AI Studio', 'Lovable', 'Antigravity']
  },
  {
    category: 'Programming & Algorithms',
    tags: ['DSA', 'C++', 'Python', 'Machine Learning Basics', 'Problem Solving']
  },
  {
    category: 'Leadership & Collaboration',
    tags: ['Team Leadership', 'Code Reviews', 'Sprint Planning', 'Agile / Scrum', 'Mentoring', 'SDLC']
  }
];

// 4. Certifications
const certifications = [
  {
    title: 'Computer System Security',
    issuer: 'Professional Security Specialization',
    link: 'https://drive.google.com/file/d/1YGHpJ3Lq0XwHXo9YKJMqpQ6t0a17z1Od/view?usp=sharing',
    category: 'SECURITY',
    accent: 'neon'
  },
  {
    title: 'Python Programming',
    issuer: 'Software & Core Scripting',
    link: 'https://drive.google.com/file/d/1YK5Lthde9LvUIcNe_ftteIu5i90VlVW2/view?usp=sharing',
    category: 'PROGRAMMING',
    accent: 'cyan'
  },
  {
    title: 'DSA With C++',
    issuer: 'Data Structures & Algorithms',
    link: 'https://drive.google.com/file/d/1XTaJp6iEJWlydvt6IfgVrcM18p5a-Np8/view?usp=sharing',
    category: 'ALGORITHMS',
    accent: 'violet'
  },
  {
    title: 'Web Development',
    issuer: 'Full-Stack Web Engineering',
    link: 'https://drive.google.com/file/d/10LHa1zXr8jChySHmrSr4kMFcJdwJox9K/view?usp=sharing',
    category: 'WEB STACK',
    accent: 'amber'
  }
];

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const closeMenu = () => setMenuOpen(false);

  return (
    <div className="site-shell">
      <div className="ambient ambient-one" />
      <div className="ambient ambient-two" />
      <div className="ambient ambient-three" />
      <div className="grid-overlay" />

      <header className="nav-wrap">
        <nav className="nav container">
          <a className="brand" href="#home" onClick={closeMenu}>
            <span className="brand-mark">AR</span>
            <span>
              ABDUL RAHEEM<span className="brand-dot">.</span>
              <small>ENGINEER / BUILDER</small>
            </span>
          </a>
          <button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu">
            {menuOpen ? <X /> : <Menu />}
          </button>
          <div className={`nav-links ${menuOpen ? 'nav-open' : ''}`}>
            {[
              ['About', '#about'],
              ['Work', '#work'],
              ['Live Apps', '#apps'],
              ['Skills', '#skills'],
              ['Certifications', '#certifications'],
              ['Experience', '#experience']
            ].map(([label, href]) => (
              <a key={label} href={href} onClick={closeMenu}>
                {label}
              </a>
            ))}
            <a className="nav-contact" href="#contact" onClick={closeMenu}>
              Let’s talk <ArrowUpRight size={15} />
            </a>
          </div>
        </nav>
      </header>

      <main>
        {/* HERO SECTION */}
        <section id="home" className="hero container">
          <div className="hero-copy">
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="eyebrow"
            >
              <span className="live-dot" /> AVAILABLE FOR THE RIGHT OPPORTUNITY
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
            >
              Building digital
              <br />
              products with <span className="gradient-text">purpose.</span>
            </motion.h1>
            <motion.p
              className="hero-description"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.25 }}
            >
              I’m Abdul Raheem — a <strong>Senior Flutter &amp; Full-Stack Engineer</strong> focused on{' '}
              <strong>mobile experiences</strong>, <strong>scalable backend systems</strong>, and turning complex workflows into{' '}
              <strong>high-impact products</strong>.
            </motion.p>
            <motion.div
              className="hero-actions"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35 }}
            >
              <a className="button button-primary" href="#work">
                Explore my work <ArrowUpRight size={17} />
              </a>
              <a className="button button-ghost" href="#apps">
                View Published Apps ({publishedApps.length}) <Smartphone size={16} />
              </a>
              <a
                className="button button-ghost"
                href="https://www.linkedin.com/in/abdul-raheem-b44457235/"
                target="_blank"
                rel="noreferrer"
              >
                Connect on LinkedIn <ArrowUpRight size={16} />
              </a>
            </motion.div>
            <div className="hero-meta">
              <span>
                <MapPin size={14} /> <strong>India &amp; Worldwide</strong> · Open to Relocation &amp; Remote
              </span>
              <span className="meta-divider" />
              <span>
                <Sparkles size={14} /> 4+ years building software
              </span>
            </div>
          </div>

          <motion.div
            className="hero-visual"
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="orbit orbit-a" />
            <div className="orbit orbit-b" />
            <div className="orbit orbit-c" />
            <div className="profile-card">
              <div className="photo-frame">
                <img src={profilePhoto} alt="Abdul Raheem" />
                <div className="photo-overlay" />
                <span className="photo-label">FLUTTER · FULL-STACK</span>
              </div>
              <div className="profile-footer">
                <div>
                  <strong>Abdul Raheem</strong>
                  <span>Engineer &amp; Team Lead</span>
                </div>
                <span className="profile-status">
                  <i /> BUILDING
                </span>
              </div>
            </div>
            <div className="float-chip chip-mobile">
              <Smartphone size={17} />
              <span>Mobile apps</span>
            </div>
            <div className="float-chip chip-backend">
              <Server size={17} />
              <span>Backend systems</span>
            </div>
            <div className="float-chip chip-ai">
              <Sparkles size={16} />
              <span>AI-assisted dev</span>
            </div>
            <div className="visual-index">
              FIG. 01 <span>— PROFILE</span>
            </div>
          </motion.div>
        </section>

        {/* STATS STRIP */}
        <section className="stats-strip">
          <div className="container stats-grid">
            <div>
              <strong>
                4<span>+</span>
              </strong>
              <span>Years in software</span>
            </div>
            <div>
              <strong>
                150<span>+</span>
              </strong>
              <span>Apps published / supported</span>
            </div>
            <div>
              <strong>
                50L<span>+</span>
              </strong>
              <span>Recovery leads supported</span>
            </div>
            <div>
              <strong>2</strong>
              <span>Times recognized as team lead</span>
            </div>
          </div>
        </section>

        {/* 01 / ABOUT */}
        <section id="about" className="section container">
          <motion.div
            variants={reveal}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            className="section-heading"
          >
            <span className="section-index">01 / ABOUT</span>
            <h2>
              Engineering that connects
              <br />
              <span className="gradient-text">people, systems &amp; outcomes.</span>
            </h2>
          </motion.div>
          <div className="about-grid">
            <motion.p variants={reveal} initial="hidden" whileInView="show" viewport={{ once: true }} className="about-lead">
              I work across the full product lifecycle — from understanding real user problems and shaping architecture to
              shipping mobile apps, integrating backend services, and scaling products after launch.
            </motion.p>
            <motion.div variants={reveal} initial="hidden" whileInView="show" viewport={{ once: true }} className="about-details">
              <p>
                Over the past 4+ years, I have architected and built impactful software across <strong>Fintech</strong>,{' '}
                <strong>enterprise B2B SaaS</strong>, and <strong>consumer applications</strong> — including loan recovery platforms,
                offline retail Buy-Now-Pay-Later (BNPL) credit solutions, automated HRMS &amp; payroll systems, and production commerce apps.
              </p>
              <p>
                At <strong>CredResolve</strong>, I led mobile delivery and contributed to platform architecture for high-volume loan recovery operations.
                Earlier at <strong>Webkul</strong>, I engineered and published Flutter commerce applications. I am actively open to engineering opportunities in <strong>India and Worldwide (Relocation &amp; Remote)</strong>.
              </p>
              <div className="about-links">
                <a href="https://github.com/abdul7860924928" target="_blank" rel="noreferrer">
                  <Github size={16} /> GitHub <ArrowUpRight size={14} />
                </a>
                <a href="https://mobikul.com/author/abdulraheem-mk357/" target="_blank" rel="noreferrer">
                  Published work <ArrowUpRight size={14} />
                </a>
                <a href="https://www.linkedin.com/in/abdul-raheem-b44457235/" target="_blank" rel="noreferrer">
                  <Linkedin size={16} /> LinkedIn <ArrowUpRight size={14} />
                </a>
              </div>
            </motion.div>
          </div>
        </section>

        {/* 02 / SELECTED WORK */}
        <section id="work" className="section section-alt">
          <div className="container">
            <motion.div variants={reveal} initial="hidden" whileInView="show" viewport={{ once: true }} className="section-heading">
              <span className="section-index">02 / SELECTED WORK</span>
              <h2>
                Products built to
                <br />
                <span className="gradient-text">solve real problems.</span>
              </h2>
              <p className="heading-note">
                A curated selection of production-grade platforms, systems, and mobile applications I’ve engineered.
              </p>
            </motion.div>
            <div className="project-grid">
              {projects.map((p, i) => {
                const Icon = p.icon;
                return (
                  <motion.article
                    key={p.n}
                    className="project-card"
                    variants={reveal}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, amount: 0.15 }}
                    transition={{ delay: i * 0.08 }}
                    whileHover={{ y: -6 }}
                  >
                    <div className="project-top">
                      <span>
                        {p.n} / {p.type}
                      </span>
                      <span className="project-icon">
                        <Icon size={20} />
                      </span>
                    </div>
                    <div className="project-art">
                      <div className={`art-orb ${p.orb}`} />
                      <div className="art-window">
                        <div className="window-dots">
                          <i />
                          <i />
                          <i />
                        </div>
                        <div className="window-line wide" />
                        <div className="window-line" />
                        <div className="window-pills">
                          {p.badges.map((b) => (
                            <span key={b} className="art-pill">
                              <span className="art-pill-dot" />
                              {b}
                            </span>
                          ))}
                        </div>
                        <div className="window-line short" />
                      </div>
                      <div className="art-caption">{p.metric}</div>
                    </div>
                    <h3>{p.title}</h3>
                    <p>{p.text}</p>

                    {p.playStore && (
                      <div className="project-app-links">
                        <a href={p.playStore} target="_blank" rel="noreferrer" className="store-pill">
                          <span>Google Play App</span>
                          <ExternalLink size={12} />
                        </a>
                        {p.appStore && (
                          <a href={p.appStore} target="_blank" rel="noreferrer" className="store-pill store-pill-apple">
                            <span>App Store</span>
                            <ExternalLink size={12} />
                          </a>
                        )}
                      </div>
                    )}

                    <div className="tag-list">
                      {p.stack.map((t) => (
                        <span key={t}>{t}</span>
                      ))}
                    </div>
                  </motion.article>
                );
              })}
            </div>
            <p className="project-disclaimer">
              Engineered across high-scale debt recovery operations, retail point-of-sale credit (BNPL), enterprise workforce automation (HRMS), and mobile commerce.
            </p>
          </div>
        </section>

        {/* 03 / LIVE PUBLISHED APPS */}
        <section id="apps" className="section container">
          <motion.div variants={reveal} initial="hidden" whileInView="show" viewport={{ once: true }} className="section-heading">
            <span className="section-index">03 / LIVE DEPLOYMENTS</span>
            <h2>
              Published apps on
              <br />
              <span className="gradient-text">Google Play &amp; App Store.</span>
            </h2>
            <p className="heading-note">
              Real production applications deployed and actively serving customers, delivery agents, merchants, and corporate workforces.
            </p>
          </motion.div>

          <div className="apps-grid">
            {publishedApps.map((app, i) => (
              <motion.div
                key={app.name}
                className={`app-card app-accent-${app.accent}`}
                variants={reveal}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.1 }}
                transition={{ delay: i * 0.05 }}
                whileHover={{ y: -4 }}
              >
                <div className="app-card-head">
                  <span className="app-category">{app.category}</span>
                  <span className="app-status-badge">
                    <span className="live-dot" /> LIVE STORE
                  </span>
                </div>
                <h3>{app.name}</h3>
                <p>{app.desc}</p>
                <div className="app-card-tags">
                  {app.tags.map((t) => (
                    <span key={t}>{t}</span>
                  ))}
                </div>
                <div className="app-card-actions">
                  {app.playStore && (
                    <a href={app.playStore} target="_blank" rel="noreferrer" className="store-btn store-btn-play">
                      <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor">
                        <path d="M3.609 1.814L13.792 12 3.61 22.186a2.036 2.036 0 0 1-.61-1.46V3.274c0-.573.23-1.09.61-1.46zM15.207 13.414l2.843 2.843-12.802 7.391 9.959-10.234zm0-2.828L5.248.352l12.802 7.391-2.843 2.843zm1.414 1.414l3.586-2.071a1.5 1.5 0 0 1 0 2.599l-3.586 2.072-1.414-1.414 1.414-1.186z" />
                      </svg>
                      <span>Google Play</span>
                      <ExternalLink size={12} />
                    </a>
                  )}
                  {app.appStore && (
                    <a href={app.appStore} target="_blank" rel="noreferrer" className="store-btn store-btn-apple">
                      <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor">
                        <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.37c.62-.75 1.04-1.8 0.92-2.85-.9.04-2 .6-2.65 1.36-.58.67-1.08 1.74-.95 2.77 1 .08 2.05-.53 2.68-1.28" />
                      </svg>
                      <span>App Store</span>
                      <ExternalLink size={12} />
                    </a>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* 04 / TOOLKIT & TECHNICAL SKILLS */}
        <section id="skills" className="section section-alt">
          <div className="container">
            <motion.div variants={reveal} initial="hidden" whileInView="show" viewport={{ once: true }} className="section-heading">
              <span className="section-index">04 / TOOLKIT</span>
              <h2>
                My engineering
                <br />
                <span className="gradient-text">toolkit &amp; skills.</span>
              </h2>
              <p className="heading-note">
                Comprehensive technical capabilities spanning cross-platform mobile engineering, backend distributed systems, cloud DevOps, security compliance, and AI tooling.
              </p>
            </motion.div>
            <div className="skills-grid skills-grid-expanded">
              {skillCategories.map((group, i) => (
                <motion.div
                  key={group.category}
                  className="skill-group"
                  variants={reveal}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.04 }}
                >
                  <div className="skill-group-head">
                    <span>{String(i + 1).padStart(2, '0')}</span>
                    <h3>{group.category}</h3>
                  </div>
                  <div className="skill-tags">
                    {group.tags.map((skill) => (
                      <span key={skill}>{skill}</span>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* 05 / CERTIFICATIONS */}
        <section id="certifications" className="section container">
          <motion.div variants={reveal} initial="hidden" whileInView="show" viewport={{ once: true }} className="section-heading">
            <span className="section-index">05 / CREDENTIALS</span>
            <h2>
              Verified professional
              <br />
              <span className="gradient-text">certifications.</span>
            </h2>
            <p className="heading-note">
              Formally verified credentials across computer security, algorithms, core software development, and programming.
            </p>
          </motion.div>

          <div className="cert-grid">
            {certifications.map((c, i) => (
              <motion.a
                key={c.title}
                href={c.link}
                target="_blank"
                rel="noreferrer"
                className={`cert-card cert-accent-${c.accent}`}
                variants={reveal}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                whileHover={{ y: -6 }}
              >
                <div className="cert-top">
                  <span className="cert-category">{c.category}</span>
                  <span className="cert-icon">
                    <Award size={18} />
                  </span>
                </div>
                <h3>{c.title}</h3>
                <span className="cert-issuer">{c.issuer}</span>
                <div className="cert-action">
                  <span>View Verified Certificate</span>
                  <ExternalLink size={14} />
                </div>
              </motion.a>
            ))}
          </div>
        </section>

        {/* 06 / EXPERIENCE */}
        <section id="experience" className="section section-alt">
          <div className="container">
            <motion.div variants={reveal} initial="hidden" whileInView="show" viewport={{ once: true }} className="section-heading">
              <span className="section-index">06 / EXPERIENCE</span>
              <h2>
                From shipping apps
                <br />
                <span className="gradient-text">to leading delivery.</span>
              </h2>
            </motion.div>
            <div className="timeline">
              {/* CredResolve */}
              <motion.article variants={reveal} initial="hidden" whileInView="show" viewport={{ once: true }} className="timeline-item">
                <div className="timeline-date">2024 — PRESENT</div>
                <div className="timeline-marker marker-credresolve" />
                <div className="timeline-content">
                  <div className="timeline-title">
                    <h3>Flutter Developer and Full-Stack Engineer &amp; Team Lead</h3>
                    <span className="company-badge badge-credresolve">CredResolve</span>
                  </div>
                  <p className="timeline-lead">
                    Leading mobile and backend engineering for enterprise-scale AI-driven loan recovery platforms. Responsible for designing
                    scalable, secure, and high-performance systems using <strong>Flutter</strong>, <strong>Java Spring Boot</strong>,{' '}
                    <strong>Microservices</strong>, <strong>Kafka</strong>, <strong>Redis</strong>, and <strong>MySQL/PostgreSQL</strong>.
                  </p>
                  <ul className="timeline-bullets">
                    <li>
                      <span className="bullet-dot" />
                      <span>
                        <strong>Architected and developed scalable backend microservices</strong> using Java Spring Boot and Kafka-based event-driven architecture for high-volume lead processing.
                      </span>
                    </li>
                    <li>
                      <span className="bullet-dot" />
                      <span>
                        <strong>Built and managed systems handling 50L+ leads</strong>, ensuring scalability, reliability, and efficient data processing.
                      </span>
                    </li>
                    <li>
                      <span className="bullet-dot" />
                      <span>
                        <strong>Developed secure Flutter applications</strong> for field recovery agents with advanced role-based access control, real-time tracking, and recovery workflows.
                      </span>
                    </li>
                    <li>
                      <span className="bullet-dot" />
                      <span>
                        <strong>Integrated communication and automation channels</strong> including WhatsApp, IVR, Dialer, SMS, Voice Bots, Chatbots, Email, and Legal Workflows.
                      </span>
                    </li>
                    <li>
                      <span className="bullet-dot" />
                      <span>
                        <strong>Implemented enterprise security practices</strong> including Vault-based secret management and successfully cleared VAPT for backend and Android applications.
                      </span>
                    </li>
                    <li>
                      <span className="bullet-dot" />
                      <span>
                        <strong>Established production observability</strong> using Grafana, Kibana, Sentry, and New Relic for monitoring, logging, error tracking, and performance analysis.
                      </span>
                    </li>
                    <li>
                      <span className="bullet-dot" />
                      <span>
                        <strong>Designed and integrated secure REST APIs</strong> between mobile applications, backend services, and third-party systems.
                      </span>
                    </li>
                    <li>
                      <span className="bullet-dot" />
                      <span>
                        <strong>Led the complete SDLC</strong>, including architecture, development, code reviews, sprint planning, debugging, deployment, and production support.
                      </span>
                    </li>
                    <li>
                      <span className="bullet-dot" />
                      <span>
                        <strong>Mentored developers, distributed tasks</strong>, reviewed code, and ensured timely delivery of high-quality production features.
                      </span>
                    </li>
                    <li>
                      <span className="bullet-dot" />
                      <span>
                        <strong>Worked closely with product and business teams</strong> to convert complex loan-recovery requirements into scalable technical solutions.
                      </span>
                    </li>
                    <li>
                      <span className="bullet-dot" />
                      <span>
                        <strong>Focused on system scalability</strong>, security, performance optimization, clean architecture, and reliable production deployments.
                      </span>
                    </li>
                  </ul>
                  <div className="tag-list">
                    <span>Flutter</span>
                    <span>Java Spring Boot</span>
                    <span>Microservices</span>
                    <span>Kafka</span>
                    <span>Redis</span>
                    <span>PostgreSQL</span>
                    <span>VAPT Security</span>
                    <span>Grafana / Sentry</span>
                    <span>Team leadership</span>
                  </div>
                </div>
              </motion.article>

              {/* Webkul */}
              <motion.article variants={reveal} initial="hidden" whileInView="show" viewport={{ once: true }} className="timeline-item">
                <div className="timeline-date">OCT 2022 — DEC 2023</div>
                <div className="timeline-marker marker-webkul" />
                <div className="timeline-content">
                  <div className="timeline-title">
                    <h3>Flutter Developer</h3>
                    <span className="company-badge badge-webkul">Webkul</span>
                  </div>
                  <p className="timeline-lead">
                    Worked as a Flutter Developer on multiple production-grade mobile applications across <strong>e-commerce</strong>,{' '}
                    <strong>marketplace</strong>, <strong>hyperlocal</strong>, <strong>POS</strong>, <strong>delivery</strong>, and{' '}
                    <strong>logistics</strong> domains.
                  </p>
                  <ul className="timeline-bullets">
                    <li>
                      <span className="bullet-dot bullet-dot-webkul" />
                      <span>
                        <strong>Developed and maintained cross-platform mobile applications</strong> using Flutter and Dart for Android and iOS.
                      </span>
                    </li>
                    <li>
                      <span className="bullet-dot bullet-dot-webkul" />
                      <span>
                        <strong>Built e-commerce and marketplace applications</strong> integrated with platforms such as Magento 2, WooCommerce, CS-Cart, Odoo, and PrestaShop.
                      </span>
                    </li>
                    <li>
                      <span className="bullet-dot bullet-dot-webkul" />
                      <span>
                        <strong>Implemented scalable UI architectures</strong> and state management using BLoC and Provider.
                      </span>
                    </li>
                    <li>
                      <span className="bullet-dot bullet-dot-webkul" />
                      <span>
                        <strong>Integrated REST APIs, authentication</strong>, payment gateways, product/catalog services, order management, and third-party services.
                      </span>
                    </li>
                    <li>
                      <span className="bullet-dot bullet-dot-webkul" />
                      <span>
                        <strong>Developed applications for customers, delivery partners, vendors, and administrators</strong> with role-based workflows.
                      </span>
                    </li>
                    <li>
                      <span className="bullet-dot bullet-dot-webkul" />
                      <span>
                        <strong>Worked on real-time features</strong>, push notifications, location tracking, order management, and delivery workflows.
                      </span>
                    </li>
                    <li>
                      <span className="bullet-dot bullet-dot-webkul" />
                      <span>
                        <strong>Gained hands-on experience with native Android (Kotlin) and iOS (Swift)</strong> development for platform-specific requirements and Flutter integrations.
                      </span>
                    </li>
                    <li>
                      <span className="bullet-dot bullet-dot-webkul" />
                      <span>
                        <strong>Managed application releases and deployments</strong> on Google Play Store and Apple App Store, including signing, certificates, metadata, and release issues.
                      </span>
                    </li>
                    <li>
                      <span className="bullet-dot bullet-dot-webkul" />
                      <span>
                        <strong>Worked closely with backend, QA, UI/UX, and product teams</strong> throughout the complete SDLC.
                      </span>
                    </li>
                    <li>
                      <span className="bullet-dot bullet-dot-webkul" />
                      <span>
                        <strong>Optimized application performance</strong>, resolved production bugs, and improved app stability and user experience.
                      </span>
                    </li>
                    <li>
                      <span className="bullet-dot bullet-dot-webkul" />
                      <span>
                        <strong>Contributed to multiple client projects</strong> and successfully delivered production-ready mobile applications.
                      </span>
                    </li>
                  </ul>
                  <div className="tag-list">
                    <span>Flutter</span>
                    <span>Dart</span>
                    <span>BLoC</span>
                    <span>Provider</span>
                    <span>Android (Kotlin)</span>
                    <span>iOS (Swift)</span>
                    <span>Play Store &amp; App Store</span>
                    <span>E-Commerce / POS</span>
                  </div>
                </div>
              </motion.article>

              {/* Caringio Tech */}
              <motion.article variants={reveal} initial="hidden" whileInView="show" viewport={{ once: true }} className="timeline-item">
                <div className="timeline-date">APR 2022 — SEP 2022</div>
                <div className="timeline-marker marker-caringio" />
                <div className="timeline-content">
                  <div className="timeline-title">
                    <h3>Flutter Developer</h3>
                    <span className="company-badge badge-caringio">Caringio Tech</span>
                  </div>
                  <p className="timeline-lead">
                    Built modular Flutter application features and supported cross-platform releases for <strong>Android</strong> and{' '}
                    <strong>iOS</strong>.
                  </p>
                  <div className="tag-list">
                    <span>Dart</span>
                    <span>Flutter</span>
                    <span>Mobile releases</span>
                    <span>Component architecture</span>
                  </div>
                </div>
              </motion.article>

              {/* UpBrain */}
              <motion.article variants={reveal} initial="hidden" whileInView="show" viewport={{ once: true }} className="timeline-item">
                <div className="timeline-date">JAN 2022 — MAR 2022</div>
                <div className="timeline-marker marker-upbrain" />
                <div className="timeline-content">
                  <div className="timeline-title">
                    <h3>Frontend Web Developer Intern</h3>
                    <span className="company-badge badge-upbrain">UpBrain</span>
                  </div>
                  <p className="timeline-lead">
                    Built foundational, responsive web interfaces using <strong>HTML5</strong>, <strong>CSS3</strong>, and{' '}
                    <strong>modern JavaScript</strong>.
                  </p>
                  <div className="tag-list">
                    <span>HTML5</span>
                    <span>CSS3</span>
                    <span>JavaScript</span>
                    <span>Responsive Design</span>
                  </div>
                </div>
              </motion.article>
            </div>
          </div>
        </section>

        {/* 07 / CONTACT */}
        <section id="contact" className="section container">
          <motion.div variants={reveal} initial="hidden" whileInView="show" viewport={{ once: true }} className="contact-panel">
            <div className="contact-glow" />
            <span className="section-index">07 / LET’S CONNECT</span>
            <h2>
              Have a meaningful
              <br />
              problem to <span className="gradient-text">solve?</span>
            </h2>
            <p>
              I’m open to opportunities across <strong>India and Worldwide (Relocation &amp; Remote)</strong>. Let’s talk about building high-impact mobile and backend systems together.
            </p>
            <div className="contact-actions">
              <a className="button button-primary" href="https://www.linkedin.com/in/abdul-raheem-b44457235/" target="_blank" rel="noreferrer">
                <Linkedin size={17} /> Connect on LinkedIn <ArrowUpRight size={16} />
              </a>
              <a className="button button-ghost" href="https://github.com/abdul7860924928" target="_blank" rel="noreferrer">
                <Github size={17} /> Explore GitHub
              </a>
              <a className="button button-ghost" href="https://mobikul.com/author/abdulraheem-mk357/" target="_blank" rel="noreferrer">
                <Mail size={17} /> Published writing
              </a>
            </div>
            <div className="contact-foot">
              <ShieldCheck size={15} /> Thoughtful engineering. Clear ownership. Global impact.
            </div>
          </motion.div>
        </section>
      </main>

      <footer className="footer container">
        <a className="brand" href="#home">
          <span className="brand-mark">AR</span>
          <span>
            ABDUL RAHEEM<span className="brand-dot">.</span>
            <small>ENGINEER / BUILDER</small>
          </span>
        </a>
        <span>Designed &amp; built with intention · 2026</span>
        <a href="#home" className="back-top">
          Back to top <ArrowDownRight size={15} />
        </a>
      </footer>
    </div>
  );
}

export default App;
