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
- **Advanced Usage** - Advanced features and customization
- **Integrations** - IDE and tool integrations
- **Enterprise** - Enterprise features and solutions
- **Contributing** - How to contribute to the project

## 🛠️ Development

### Project Structure

```
docusaurus/
├── docs/                 # Documentation markdown files
├── src/
│   ├── pages/           # Static pages
│   ├── components/      # Custom React components
│   └── css/            # Custom styles
├── static/             # Static assets (images, etc.)
├── docusaurus.config.ts # Main configuration
└── sidebars.ts         # Documentation sidebar configuration
```

### Key Features

- **Modern Documentation** - Built with Docusaurus 3
- **Search Functionality** - Full-text search across all docs
- **Dark/Light Mode** - Automatic theme switching
- **Mobile Responsive** - Optimized for all devices
- **SEO Optimized** - Open Graph and meta tags
- **Performance** - Fast loading and optimized builds

## 🚀 Deployment

### GitHub Pages (Automatic)

1. **GitHub Actions Workflow** - Automatically builds and deploys on push to main branch
2. Deploys to custom domain at `https://docs.wp-llm.com`

### Manual Deployment

1. **Build the site:**
   ```bash
   npm run build
   ```

2. **Deploy to your preferred hosting service**

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](docs/contributing/contributing-guide.md) for details.

### Development Workflow

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test locally with `npm start`
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

- **Documentation**: [docs.wp-llm.com](https://docs.wp-llm.com)
- **GitHub Issues**: [Report bugs or request features](https://github.com/artificialpoets/wp-llm-docs/issues)
- **Community**: Join our discussions and get help

## 🔗 Links

- **Main Website**: [wp-llm.com](https://wp-llm.com)
- **GitHub Repository**: [github.com/artificialpoets/wp-llm-docs](https://github.com/artificialpoets/wp-llm-docs)
- **API Documentation**: [docs.wp-llm.com/api-reference](https://docs.wp-llm.com/api-reference)

---

Built with ❤️ by the WP LLM team
