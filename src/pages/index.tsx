import React, { useState, ReactNode } from 'react';
import Layout from '@theme/Layout';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Link from '@docusaurus/Link';

import styles from './index.module.css';

// Hero Section Component
function HeroSection(): ReactNode {
  return (
    <section className={styles.heroSection}>
      <div className="container">
        <div className={styles.heroContent}>
          <div className={styles.heroText}>
            <div className={styles.heroBadge}>
              <span className={styles.badgeIcon}>⚡</span>
              AI-Powered WordPress Development
            </div>
            
            <h1 className={styles.heroTitle}>
              Build WordPress Faster with{' '}
              <span className={styles.gradientText}>Intelligent AI</span>
            </h1>
            
            <p className={styles.heroSubtitle}>
              Generate production-ready WordPress code, blocks, and plugins with specialized AI trained on the entire WordPress ecosystem. 
              Accelerate your development workflow with intelligent automation.
            </p>
            
            <div className={styles.heroStats}>
              <div className={styles.stat}>
                <div className={styles.statNumber}>50+</div>
                <div className={styles.statLabel}>Developers</div>
              </div>
              <div className={styles.stat}>
                <div className={styles.statNumber}>25+</div>
                <div className={styles.statLabel}>Features</div>
              </div>
              <div className={styles.stat}>
                <div className={styles.statNumber}>99.9%</div>
                <div className={styles.statLabel}>Uptime</div>
              </div>
            </div>
            
            <div className={styles.heroButtons}>
              <Link to="/docs/getting-started/quick-start" className={styles.primaryButton}>
                <span>Start Building</span>
                <svg className={styles.buttonIcon} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </Link>
              <Link href="https://github.com/artificialpoets/wp-llm-docs" className={styles.secondaryButton}>
                <svg className={styles.buttonIcon} fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
                <span>View on GitHub</span>
              </Link>
            </div>
          </div>
          
          <div className={styles.heroVisual}>
            <div className={styles.heroImageContainer}>
              <img 
                src="/img/hero-home.png"
                alt="AI-powered WordPress development"
                className={styles.heroImage}
              />
              <div className={styles.floatingCard}>
                <div className={styles.cardHeader}>
                  <div className={styles.cardIcon}>🎯</div>
                  <span>New Model!</span>
                </div>
                <div className={styles.cardContent}>
                  <div className={styles.cardStat}>
                    <span className={styles.cardNumber}>70B</span>
                    <span className={styles.cardLabel}>Parameters</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// Social Proof Section Component
function SocialProofSection(): ReactNode {
  return (
    <section className={styles.socialProofSection}>
      <div className="container">
        <div className={styles.socialProofContent}>
          <p className={styles.socialProofText}>
            Trusted by leading WordPress agencies and developers worldwide
          </p>
          <div className={styles.logosGrid}>
            <div className={styles.logoPlaceholder}>WordPress.org</div>
            <div className={styles.logoPlaceholder}>WooCommerce</div>
            <div className={styles.logoPlaceholder}>Elementor</div>
            <div className={styles.logoPlaceholder}>Yoast SEO</div>
            <div className={styles.logoPlaceholder}>Jetpack</div>
            <div className={styles.logoPlaceholder}>Automattic</div>
          </div>
          <div className={styles.testimonial}>
            <div className={styles.testimonialContent}>
              "WP LLM has revolutionized our development workflow. We're shipping features 3x faster while maintaining code quality."
            </div>
            <div className={styles.testimonialAuthor}>
              <div className={styles.authorAvatar}>JS</div>
              <div className={styles.authorInfo}>
                <div className={styles.authorName}>John Smith</div>
                <div className={styles.authorTitle}>Lead Developer, TechCorp</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// Features Section Component
function FeaturesSection(): ReactNode {
  const features = [
    {
      icon: "⚡",
      title: "Lightning Fast Generation",
      description: "Generate complete WordPress plugins, themes, and blocks in seconds, not hours.",
      highlight: "3x faster development"
    },
    {
      icon: "🎯",
      title: "WordPress-Specific AI",
      description: "Trained on the entire WordPress ecosystem for accurate, production-ready code.",
      highlight: "Specialized training"
    },
    {
      icon: "🔒",
      title: "Security First",
      description: "All generated code follows WordPress security standards and best practices.",
      highlight: "Built-in best practices"
    },
    {
      icon: "🔄",
      title: "Real-time Analysis",
      description: "Get immediate code analysis, optimization suggestions, and security checks.",
      highlight: "Instant feedback"
    },
    {
      icon: "🎨",
      title: "Block Theme Support",
      description: "Full support for Gutenberg blocks, block themes, and modern WordPress development.",
      highlight: "Modern WordPress"
    },
    {
      icon: "🚀",
      title: "Enterprise Ready",
      description: "Deploy to production with enterprise-grade reliability and support.",
      highlight: "Scale with confidence"
    }
  ];

  return (
    <section className={styles.featuresSection}>
      <div className="container">
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>
            Why Choose WP LLM?
          </h2>
          <p className={styles.sectionSubtitle}>
            The most advanced AI integration platform for WordPress
          </p>
        </div>
        <div className={styles.featuresGrid}>
          {features.map((feature, index) => (
            <div key={index} className={styles.featureCard}>
              <div className={styles.featureHeader}>
                <div className={styles.featureIcon}>{feature.icon}</div>
                <span className={styles.featureHighlight}>{feature.highlight}</span>
              </div>
              <h3 className={styles.featureTitle}>{feature.title}</h3>
              <p className={styles.featureDescription}>{feature.description}</p>
            </div>
          ))}
        </div>
        
        <div className={styles.sectionCTAs}>
          <Link to="/get-in-touch" className={styles.primaryButton}>
            <span>Get in Touch</span>
            <svg className={styles.buttonIcon} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </Link>
          <Link to="/docs/intro" className={styles.secondaryButton}>
            <span>Read the Documentation</span>
            <svg className={styles.buttonIcon} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}

// Comparison Section Component
function ComparisonSection(): ReactNode {
  return (
    <section className={styles.comparisonSection}>
      <div className="container">
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>
            WP LLM vs Alternatives
          </h2>
          <p className={styles.sectionSubtitle}>
            See how leading developers choose WP LLM
          </p>
        </div>
        <div className={styles.comparisonTable}>
          <div className={styles.tableHeader}>
            <div className={styles.tableCell}>Feature</div>
            <div className={styles.tableCell}>WP LLM</div>
            <div className={styles.tableCell}>Other Plugins</div>
          </div>
          <div className={styles.tableRow}>
            <div className={styles.tableCell}>WordPress Specialization</div>
            <div className={styles.tableCell}>✅ Trained on WordPress Ecosystem</div>
            <div className={styles.tableCell}>❌ Generic AI Models</div>
          </div>
          <div className={styles.tableRow}>
            <div className={styles.tableCell}>Code Quality</div>
            <div className={styles.tableCell}>✅ Production-Ready Code</div>
            <div className={styles.tableCell}>❌ Requires Manual Review</div>
          </div>
          <div className={styles.tableRow}>
            <div className={styles.tableCell}>WordPress Standards</div>
            <div className={styles.tableCell}>✅ Built-in Best Practices</div>
            <div className={styles.tableCell}>❌ Generic Patterns</div>
          </div>
          <div className={styles.tableRow}>
            <div className={styles.tableCell}>Security Focus</div>
            <div className={styles.tableCell}>✅ WordPress Security Standards</div>
            <div className={styles.tableCell}>❌ Basic Security</div>
          </div>
          <div className={styles.tableRow}>
            <div className={styles.tableCell}>Development Speed</div>
            <div className={styles.tableCell}>✅ 3x Faster Development</div>
            <div className={styles.tableCell}>❌ Manual Coding</div>
          </div>
          <div className={styles.tableRow}>
            <div className={styles.tableCell}>Modern WordPress</div>
            <div className={styles.tableCell}>✅ Block Themes & Gutenberg</div>
            <div className={styles.tableCell}>❌ Legacy Approaches</div>
          </div>
        </div>
      </div>
    </section>
  );
}

// Services Section Component
function ServicesSection(): ReactNode {
  const services = [
    {
      icon: '🔌',
      title: 'Plugin Development',
      description: 'Generate complete WordPress plugins with admin interfaces, settings pages, and database integration.',
      status: 'active'
    },
    {
      icon: '🎨',
      title: 'Theme Development',
      description: 'Create modern block themes with custom templates, patterns, and theme.json configuration.',
      status: 'active'
    },
    {
      icon: '🧱',
      title: 'Block Development',
      description: 'Build custom Gutenberg blocks with React components, server-side rendering, and block patterns.',
      status: 'active'
    },
    {
      icon: '🔗',
      title: 'REST API',
      description: 'Generate REST API endpoints with proper authentication, validation, and WordPress integration.',
      status: 'active'
    },
    {
      icon: '⚙️',
      title: 'CLI Tools',
      description: 'Create WordPress CLI commands for automation, deployment, and maintenance tasks.',
      status: 'coming-soon'
    },
    {
      icon: '🔍',
      title: 'Code Analysis',
      description: 'Analyze existing code for security issues, performance optimization, and WordPress standards.',
      status: 'active'
    }
  ];

  return (
    <section className={styles.providersSection}>
      <div className="container">
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>
            What Can You Build?
          </h2>
          <p className={styles.sectionSubtitle}>
            From simple plugins to complex enterprise solutions
          </p>
        </div>
        <div className={styles.providersGrid}>
          {services.map((service, index) => (
            <div key={index} className={styles.providerCard}>
              {service.status === "coming-soon" ? (
                <>
                  <div className={styles.providerHeader}>
                    <div className={styles.serviceIcon}>{service.icon}</div>
                    <h3 className={styles.providerName}>{service.title}</h3>
                    <span className={styles.comingSoon}>Coming soon</span>
                  </div>
                  <p className={styles.providerDescription}>{service.description}</p>
                </>
              ) : (
                <div className={styles.providerCardContent}>
                  <div className={styles.providerHeader}>
                    <div className={styles.serviceIcon}>{service.icon}</div>
                    <h3 className={styles.providerName}>{service.title}</h3>
                    <span className={styles.statusActive}>Available</span>
                  </div>
                  <p className={styles.providerDescription}>{service.description}</p>
                </div>
              )}
            </div>
          ))}
        </div>
        
        <div className={styles.sectionCTAs}>
          <Link to="/get-in-touch" className={styles.primaryButton}>
            <span>Get in Touch</span>
            <svg className={styles.buttonIcon} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </Link>
          <Link to="/docs/intro" className={styles.secondaryButton}>
            <span>Read the Documentation</span>
            <svg className={styles.buttonIcon} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}

// Main Component
export default function Home(): ReactNode {
  const { siteConfig } = useDocusaurusContext();
  
  return (
    <Layout
      title="WP LLM - Build WordPress Faster with Intelligent AI"
      description="Generate production-ready WordPress code, blocks, and plugins with specialized AI trained on the entire WordPress ecosystem."
    >
      <main className={styles.main}>
        <HeroSection />
        <SocialProofSection />
        <FeaturesSection />
        <ComparisonSection />
        <ServicesSection />
      </main>
    </Layout>
  );
}
