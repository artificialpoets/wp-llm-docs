---
id: deployment
title: Deployment Guide
sidebar_label: Deployment
description: Complete guide for deploying the WP LLM documentation site to production
keywords: [deployment, production, hosting, CI/CD, netlify, vercel, github pages]
---

# Deployment Guide

This guide covers deploying the WP LLM documentation site to various hosting platforms and production environments.

## **Quick Deployment Options**

### **Netlify (Recommended)**

1. **Connect Repository**
   ```bash
   # Push your code to GitHub/GitLab
   git add .
   git commit -m "Initial WP LLM documentation site"
   git push origin main
   ```

2. **Deploy Settings**
   - Build command: `npm run build`
   - Publish directory: `build`
   - Node version: `20.x`

3. **Environment Variables**
   ```env
   NODE_VERSION=20
   NPM_FLAGS=--legacy-peer-deps
   ```

### **Vercel**

1. **Import Project**
   ```bash
   # Install Vercel CLI
   npm i -g vercel
   
   # Deploy
   vercel
   ```

2. **Build Configuration**
   ```json
   {
     "buildCommand": "npm run build",
     "outputDirectory": "build",
     "installCommand": "npm install"
   }
   ```

### **GitHub Pages**

1. **Setup GitHub Actions**
   Create `.github/workflows/deploy.yml`:
   ```yaml
   name: Deploy to GitHub Pages
   
   on:
     push:
       branches: [main]
   
   jobs:
     build-and-deploy:
       runs-on: ubuntu-latest
       steps:
         - uses: actions/checkout@v3
         - uses: actions/setup-node@v3
           with:
             node-version: '20'
         - run: npm ci
         - run: npm run build
         - uses: peaceiris/actions-gh-pages@v3
           with:
             github_token: ${{ secrets.GITHUB_TOKEN }}
             publish_dir: ./build
   ```

## **Production Configuration**

### **Environment Setup**

1. **Production Build**
   ```bash
   # Clean install
   rm -rf node_modules package-lock.json
   npm ci
   
   # Production build
   npm run build
   
   # Test production build
   npm run serve
   ```

2. **Performance Optimization**
   ```bash
   # Analyze bundle size
   npm run build -- --analyze
   
   # Check for broken links
   npm run build 2>&1 | grep "broken anchors"
   ```

### **Custom Domain Setup**

1. **DNS Configuration**
   ```
   Type: CNAME
   Name: docs
   Value: your-site.netlify.app
   ```

2. **SSL Certificate**
   - Automatically handled by Netlify/Vercel
   - Force HTTPS redirect in Docusaurus config

### **SEO Optimization**

1. **Meta Tags**
   ```typescript
   // docusaurus.config.ts
   const config: Config = {
     title: 'WP LLM Documentation',
     tagline: 'AI-powered WordPress development',
     url: 'https://docs.wp-llm.com',
     baseUrl: '/',
     favicon: 'img/favicon.ico',
     organizationName: 'wp-llm',
     projectName: 'wp-llm-docs',
   };
   ```

2. **Sitemap Generation**
   ```bash
   # Generate sitemap
   npm run build
   # Sitemap automatically generated in build/sitemap.xml
   ```

## **CI/CD Pipeline**

### **Automated Testing**

1. **Pre-deployment Checks**
   ```bash
   # Lint and type check
   npm run lint
   npm run type-check
   
   # Build test
   npm run build
   
   # Link validation
   npm run broken-links
   ```

2. **Performance Monitoring**
   ```bash
   # Lighthouse CI
   npm install -g @lhci/cli
   lhci autorun
   ```

### **Staging Environment**

1. **Preview Deployments**
   ```bash
   # Netlify preview
   git push origin feature/new-docs
   # Automatic preview URL generated
   ```

2. **Testing Checklist**
   - [ ] All pages load correctly
   - [ ] Navigation works
   - [ ] Search functionality
   - [ ] Mobile responsiveness
   - [ ] Performance metrics
   - [ ] SEO meta tags

## **Monitoring & Analytics**

### **Performance Monitoring**

1. **Core Web Vitals**
   ```javascript
   // Add to docusaurus.config.ts
   const config: Config = {
     scripts: [
       {
         src: 'https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID',
         async: true,
       },
     ],
   };
   ```

2. **Error Tracking**
   ```javascript
   // Sentry integration
   import * as Sentry from "@sentry/react";
   
   Sentry.init({
     dsn: "YOUR_SENTRY_DSN",
     environment: process.env.NODE_ENV,
   });
   ```

### **Analytics Setup**

1. **Google Analytics 4**
   ```typescript
   // docusaurus.config.ts
   const config: Config = {
     plugins: [
       [
         '@docusaurus/plugin-google-analytics',
         {
           trackingID: 'G-XXXXXXXXXX',
         },
       ],
     ],
   };
   ```

2. **Search Analytics**
   ```typescript
   // Algolia DocSearch
   const config: Config = {
     plugins: [
       [
         '@docusaurus/plugin-content-docs',
         {
           algolia: {
             apiKey: 'YOUR_API_KEY',
             indexName: 'wp-llm-docs',
             contextualSearch: true,
           },
         },
       ],
     ],
   };
   ```

## **Security & Compliance**

### **Security Headers**

1. **Content Security Policy**
   ```typescript
   // docusaurus.config.ts
   const config: Config = {
     customFields: {
       securityHeaders: {
         'Content-Security-Policy': "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline';",
         'X-Frame-Options': 'DENY',
         'X-Content-Type-Options': 'nosniff',
       },
     },
   };
   ```

2. **HTTPS Enforcement**
   ```typescript
   const config: Config = {
     url: 'https://docs.wp-llm.com',
     baseUrl: '/',
   };
   ```

### **Accessibility Compliance**

1. **WCAG 2.1 AA Compliance**
   ```bash
   # Install accessibility testing
   npm install -g axe-core
   
   # Run accessibility audit
   axe https://docs.wp-llm.com
   ```

2. **Keyboard Navigation**
   - Test all interactive elements
   - Ensure proper focus management
   - Verify skip links work

## **Backup & Recovery**

### **Content Backup**

1. **Documentation Backup**
   ```bash
   # Backup docs directory
   tar -czf docs-backup-$(date +%Y%m%d).tar.gz docs/
   
   # Backup configuration
   cp docusaurus.config.ts docusaurus.config.backup.ts
   ```

2. **Version Control**
   ```bash
   # Tag releases
   git tag -a v1.0.0 -m "Initial documentation release"
   git push origin v1.0.0
   ```

### **Disaster Recovery**

1. **Rollback Procedure**
   ```bash
   # Revert to previous version
   git checkout v0.9.0
   npm run build
   # Redeploy
   ```

2. **Emergency Contacts**
   - Hosting provider support
   - Domain registrar
   - SSL certificate provider

## **Post-Deployment Checklist**

### **Immediate Verification**

- [ ] Site loads without errors
- [ ] All navigation links work
- [ ] Search functionality operational
- [ ] Mobile responsiveness verified
- [ ] Performance metrics acceptable
- [ ] SSL certificate valid
- [ ] Analytics tracking active

### **Ongoing Maintenance**

- [ ] Regular dependency updates
- [ ] Content updates and reviews
- [ ] Performance monitoring
- [ ] Security audits
- [ ] User feedback collection
- [ ] SEO optimization

### **Monitoring Alerts**

- [ ] Uptime monitoring
- [ ] Performance degradation alerts
- [ ] Security vulnerability notifications
- [ ] SSL certificate expiration warnings
- [ ] Domain expiration reminders

## **Troubleshooting**

### **Common Deployment Issues**

1. **Build Failures**
   ```bash
   # Clear cache and rebuild
   rm -rf node_modules .docusaurus
   npm ci
   npm run build
   ```

2. **Broken Links**
   ```bash
   # Check for broken links
   npm run broken-links
   
   # Fix internal links
   # Update sidebar configuration
   ```

3. **Performance Issues**
   ```bash
   # Analyze bundle
   npm run build -- --analyze
   
   # Optimize images
   npm run optimize-images
   ```

### **Support Resources**

- [Docusaurus Deployment Guide](https://docusaurus.io/docs/deployment)
- [Netlify Documentation](https://docs.netlify.com/)
- [Vercel Documentation](https://vercel.com/docs)
- [GitHub Pages Documentation](https://docs.github.com/en/pages)

---

**Next Steps:**
- [Performance Optimization](./performance-optimization.md)
- [Security Best Practices](./security-best-practices.md)
- [Troubleshooting](./troubleshooting.md) 