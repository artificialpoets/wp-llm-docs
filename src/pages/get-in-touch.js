import React, { useEffect } from 'react';
import Layout from '@theme/Layout';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';

// Helper for icons
const CheckIcon = () => (
  <span style={{
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: 24,
    height: 24,
    borderRadius: '50%',
    background: 'var(--ifm-color-success)',
    color: 'white',
    fontWeight: 700,
    fontSize: 14,
    marginRight: 12,
    boxShadow: '0 1px 2px rgba(0,0,0,0.08)'
  }}>✓</span>
);

export default function GetInTouch() {
  const {siteConfig} = useDocusaurusContext();

  const trackDocumentationClick = () => {
    if (typeof window !== 'undefined' && window.dataLayer) {
      // GTM Button Click Event
      window.dataLayer.push({
        event: 'button_click',
        button_name: 'view_documentation',
        page_location: window.location.href,
        custom_event: 'contact_page_doc_click'
      });

      // GA4 Button Click Event
      if (window.gtag) {
        window.gtag('event', 'click', {
          event_category: 'Contact',
          event_label: 'View Documentation',
          value: 1
        });
      }

      // Google Ads Conversion Event
      if (window.gtag) {
        window.gtag('event', 'conversion', {
          send_to: 'GT-T9WXRMMD',
          value: 1,
          currency: 'USD',
          transaction_id: 'doc_click_' + Date.now()
        });
      }
    }
  };

  // Debug function to check tracking status
  const checkTrackingStatus = () => {
    console.log('🔍 Tracking Status Check:');
    console.log('GTM Container ID:', 'GTM-MKVPSLQF');
    console.log('GA4 Measurement ID:', 'G-0M4YWL90YR');
    console.log('Google Ads ID:', 'GT-T9WXRMMD');
    console.log('DataLayer available:', typeof window !== 'undefined' && !!window.dataLayer);
    console.log('GTAG available:', typeof window !== 'undefined' && !!window.gtag);
    if (typeof window !== 'undefined' && window.dataLayer) {
      console.log('DataLayer events:', window.dataLayer);
    }
  };

  // Add debug function to window for testing
  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.checkTrackingStatus = checkTrackingStatus;
    }
  }, []);

  useEffect(() => {
    // Track contact page view
    if (typeof window !== 'undefined' && window.dataLayer) {
      // GTM Page View
      window.dataLayer.push({
        event: 'page_view',
        page_title: 'Contact Page',
        page_location: window.location.href,
        custom_event: 'contact_page_view'
      });

      // Google Analytics 4 Page View
      if (window.gtag) {
        window.gtag('config', 'G-0M4YWL90YR', {
          page_title: 'Contact Page',
          page_location: window.location.href,
          custom_map: {
            'custom_event_1': 'contact_page_view'
          }
        });
      }

      // Google Ads Conversion Tracking
      if (window.gtag) {
        window.gtag('event', 'page_view', {
          send_to: 'GT-T9WXRMMD',
          value: 1,
          currency: 'USD'
        });
      }
    }

    // Track iframe load
    const iframe = document.querySelector('iframe[title="WP LLM Contact Form"]');
    if (iframe) {
      iframe.addEventListener('load', () => {
        if (typeof window !== 'undefined' && window.dataLayer) {
          // GTM Form Load Event
          window.dataLayer.push({
            event: 'contact_form_loaded',
            custom_event: 'tally_form_loaded'
          });

          // GA4 Form Load Event
          if (window.gtag) {
            window.gtag('event', 'form_load', {
              event_category: 'Contact',
              event_label: 'Tally Form',
              value: 1
            });
          }
        }
      });
    }
  }, []);

  return (
    <Layout
      title="Contact WP LLM"
      description="Transform your WordPress development with AI. Get in touch to accelerate your projects by 70%.">
      {/* Hero Section */}
      <section
        style={{
          background: 'var(--ifm-background-surface-color)',
          borderBottom: '1px solid var(--ifm-toc-border-color)',
          padding: '3.5rem 0 2.5rem 0',
          textAlign: 'center',
        }}
      >
        <h1
          style={{
            fontSize: '2.8rem',
            fontWeight: 800,
            marginBottom: '1rem',
            color: 'var(--ifm-heading-color)',
            letterSpacing: '-1px',
          }}
        >
          Let's Build Something <span style={{color: 'var(--ifm-color-primary)'}}>Amazing</span> Together
        </h1>
        <p
          style={{
            fontSize: '1.25rem',
            color: 'var(--ifm-font-color-base)',
            opacity: 0.85,
            marginBottom: '2.5rem',
            fontWeight: 400,
          }}
        >
          The fastest way to supercharge your WordPress workflow with AI. <br />
          <span style={{color: 'var(--ifm-color-primary)'}}>Get in touch</span> and join the next generation of WordPress developers.
        </p>
      </section>

      {/* Main Content */}
      <main className="container margin-vert--xl">
        <div className="row" style={{alignItems: 'flex-start'}}>
          {/* Contact Form Card */}
          <div className="col col--7" style={{minWidth: 320, margin: '0 auto'}}>
            <div
              style={{
                background: 'var(--ifm-background-color)',
                borderRadius: 18,
                boxShadow: '0 4px 32px rgba(0,0,0,0.07)',
                border: '1px solid var(--ifm-toc-border-color)',
                padding: '2.5rem 2rem',
                marginBottom: '2.5rem',
                position: 'relative',
                zIndex: 2,
              }}
            >
              <h2
                style={{
                  fontSize: '1.7rem',
                  fontWeight: 700,
                  marginBottom: '1.2rem',
                  color: 'var(--ifm-heading-color)',
                  textAlign: 'center',
                }}
              >
                Get in Touch
              </h2>
              <p style={{textAlign: 'center', color: 'var(--ifm-font-color-base)', opacity: 0.8, marginBottom: 24}}>
                Fill out the form and our team will get back to you within 24 hours.
              </p>
              <div
                style={{
                  background: 'var(--ifm-background-color)',
                  borderRadius: 12,
                  padding: '1.5rem 1rem',
                  marginBottom: 16,
                  border: '1px solid var(--ifm-toc-border-color)',
                }}
              >
                <iframe
                  src="https://tally.so/embed/mJbGpJ?alignLeft=1&hideTitle=1&transparentBackground=1&dynamicHeight=1"
                  loading="lazy"
                  width="100%"
                  height="504"
                  frameBorder="0"
                  marginHeight="0"
                  marginWidth="0"
                  title="WP LLM Contact Form"
                  style={{
                    borderRadius: 8,
                    background: 'white',
                    border: 'none',
                    width: '100%',
                  }}
                />
              </div>
              <div style={{fontSize: '0.95rem', color: 'black', textAlign: 'center', marginTop: 8}}>
                🔒 100% privacy. No spam. No sharing.
              </div>
            </div>
          </div>

          {/* Value/Proof Column */}
          <div className="col col--5" style={{paddingLeft: 32, minWidth: 320}}>
            <div style={{marginBottom: 32}}>
              <h3 style={{fontWeight: 700, fontSize: '1.2rem', color: 'var(--ifm-heading-color)', marginBottom: 16}}>
                Why WP LLM?
              </h3>
              <ul style={{listStyle: 'none', padding: 0, margin: 0}}>
                <li style={{display: 'flex', alignItems: 'center', marginBottom: 12}}><CheckIcon />Accelerate projects by 70%</li>
                <li style={{display: 'flex', alignItems: 'center', marginBottom: 12}}><CheckIcon />Production-ready, secure code</li>
                <li style={{display: 'flex', alignItems: 'center', marginBottom: 12}}><CheckIcon />Custom AI for your workflow</li>
                <li style={{display: 'flex', alignItems: 'center', marginBottom: 12}}><CheckIcon />Loved by 500+ developers</li>
                <li style={{display: 'flex', alignItems: 'center', marginBottom: 12}}><CheckIcon />Expert support, fast response</li>
              </ul>
            </div>
            <hr style={{border: 'none', borderTop: '1px solid var(--ifm-toc-border-color)', margin: '2rem 0'}} />
            <div style={{marginBottom: 32}}>
              <h3 style={{fontWeight: 700, fontSize: '1.2rem', color: 'var(--ifm-heading-color)', marginBottom: 16}}>
                What Developers Say
              </h3>
              <div style={{background: 'var(--ifm-background-surface-color)', borderRadius: 10, padding: '1.1rem 1rem', marginBottom: 12, borderLeft: '4px solid var(--ifm-color-primary)'}}>
                <p style={{fontStyle: 'italic', color: 'var(--ifm-font-color-base)', marginBottom: 8}}>
                  "WP LLM cut our dev time in half. The AI suggestions are spot on."
                </p>
                <div style={{fontWeight: 600, fontSize: '0.95rem', color: 'var(--ifm-color-primary)'}}>John S. – Senior WP Dev</div>
              </div>
              <div style={{background: 'var(--ifm-background-surface-color)', borderRadius: 10, padding: '1.1rem 1rem', borderLeft: '4px solid var(--ifm-color-primary)'}}>
                <p style={{fontStyle: 'italic', color: 'var(--ifm-font-color-base)', marginBottom: 8}}>
                  "Finally, an AI tool that actually understands WordPress."
                </p>
                <div style={{fontWeight: 600, fontSize: '0.95rem', color: 'var(--ifm-color-primary)'}}>Maria J. – Agency Owner</div>
              </div>
            </div>
          </div>
        </div>
        {/* Bottom CTA */}
        <div className="row" style={{marginTop: '3.5rem'}}>
          <div className="col col--12">
            <div style={{
              textAlign: 'center',
              background: 'var(--ifm-background-surface-color)',
              borderRadius: 14,
              padding: '2rem',
              border: '2px dashed var(--ifm-toc-border-color)',
              maxWidth: '800px',
              margin: '0 auto 32px auto',
            }}>
              <h3 style={{marginBottom: '1rem', color: 'var(--ifm-heading-color)'}}>
                Still Have Questions?
              </h3>
              <p style={{marginBottom: '1.5rem', color: 'var(--ifm-font-color-base)', opacity: 0.8}}>
                Check out our documentation to learn more about WP LLM.
              </p>
              <div style={{display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap'}}>
                <a
                  href="/docs/getting-started/quick-start"
                  style={{
                    background: 'var(--ifm-color-primary)',
                    color: 'white',
                    padding: '0.75rem 1.5rem',
                    borderRadius: 8,
                    textDecoration: 'none',
                    fontWeight: 500,
                    transition: 'all 0.3s',
                  }}
                  onClick={trackDocumentationClick}
                >
                  📚 View Documentation
                </a>
              </div>
            </div>
          </div>
        </div>
      </main>
    </Layout>
  );
} 