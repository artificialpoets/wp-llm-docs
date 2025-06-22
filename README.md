# WP LLM Documentation

This is the official documentation site for WP LLM, a specialized AI tool for WordPress development. Built with Docusaurus, this site provides comprehensive documentation, tutorials, and resources for developers working with WordPress.

## 🚀 Quick Start

### Prerequisites

- Node.js 20.x or higher
- npm or yarn

### Local Development

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Start the development server:**
   ```bash
   npm start
   ```

3. **Build for production:**
   ```bash
   npm run build
   ```

4. **Serve the production build locally:**
   ```bash
   npm run serve
   ```

## 📚 Documentation Structure

- **Getting Started** - Quick start guides and setup instructions
- **Core Documentation** - API reference, capabilities, and concepts
- **Integrations** - IDE integrations, CLI tools, and webhooks
- **Advanced Usage** - Performance optimization, security best practices
- **Enterprise** - Enterprise features and deployment guides
- **Contributing** - How to contribute to the project

## 🛠️ Development

### Project Structure

```
docusaurus/
├── docs/                    # Documentation markdown files
├── src/
│   ├── components/          # Custom React components
│   ├── css/                # Custom styles
│   ├── pages/              # Additional pages
│   └── theme/              # Theme customizations
├── static/                 # Static assets (images, etc.)
├── docusaurus.config.ts    # Main configuration
└── sidebars.ts            # Documentation sidebar structure
```

### Key Features

- **Modern Documentation** - Built with Docusaurus v4
- **Search Functionality** - Full-text search across all docs
- **Dark/Light Mode** - Automatic theme switching
- **Responsive Design** - Mobile-friendly interface
- **SEO Optimized** - Built-in SEO features
- **GitHub Integration** - Edit links and version control

## 🚀 Deployment

This site is automatically deployed to GitHub Pages via GitHub Actions. The deployment workflow:

1. Builds the site on every push to `main`
2. Deploys to GitHub Pages at `https://artificialpoets.github.io/wp-llm-docs/`

### Manual Deployment

If you need to deploy manually:

```bash
npm run build
# Upload the contents of the build/ directory to your hosting provider
```

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](docs/contributing/contributing-guide.md) for details.

### Development Workflow

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test locally with `npm start`
5. Submit a pull request

## 📖 Documentation Guidelines

- Use clear, concise language
- Include code examples where appropriate
- Follow the established structure and formatting
- Test all links and code snippets
- Update the sidebar configuration when adding new pages

## 🔧 Configuration

Key configuration files:

- `docusaurus.config.ts` - Main site configuration
- `sidebars.ts` - Documentation navigation structure
- `.github/workflows/deploy.yml` - GitHub Actions deployment workflow

## 📞 Support

- **Documentation Issues** - Open an issue in this repository
- **WP LLM Support** - Visit [artificialpoets.com](https://www.artificialpoets.com)
- **Community** - Join our Discord or GitHub discussions

## 📄 License

This documentation is licensed under the same terms as the WP LLM project.

---

Built with ❤️ by the WP LLM team
