---
id: wp-cli
title: WP-CLI Integration
sidebar_label: WP-CLI
keywords: [wp-cli, integration, command line, ai, wordpress]
description: Guide to integrating WP LLM with WP-CLI for WordPress development
---

# WP-CLI Integration

Integrate WP LLM with WP-CLI to automate and enhance your WordPress development workflow from the command line using AI.

## **Overview**

WP-CLI integration with WP LLM provides:
- Command-line code generation
- Automated plugin and block scaffolding
- Security and performance analysis
- Batch operations and scripting

<MermaidDiagram chart={`
graph TD
    A[WP-CLI] --> B[WP LLM Plugin]
    B --> C[Code Generation]
    B --> D[Analysis]
    B --> E[Scaffolding]
    C --> F[PHP]
    C --> G[JS/React]
    D --> H[Security]
    D --> I[Performance]
    E --> J[Blocks]
    E --> K[Plugins]
`} />

## **Installation**

### **Prerequisites**
- WP-CLI installed
- WP LLM API key
- Node.js 18+

### **Steps**
1. **Install WP LLM WP-CLI Plugin**
   ```bash
   wp plugin install wp-llm-wpcli --activate
   ```
2. **Configure API Key**
   ```bash
   wp llm set-api-key your-api-key-here
   ```
3. **Verify Installation**
   ```bash
   wp llm status
   ```

## **Features**

### **Code Generation**
- Generate code from the command line:
   ```bash
   wp llm generate "Create a custom post type for testimonials"
   ```
- Output saved to file or printed to console

### **Block/Plugin Scaffolding**
- Scaffold a new block:
   ```bash
   wp llm scaffold block --name=hero-section
   ```
- Scaffold a new plugin:
   ```bash
   wp llm scaffold plugin --name=custom-plugin
   ```

### **Code Analysis**
- Analyze code for security and performance:
   ```bash
   wp llm analyze plugin.php --type=security
   wp llm analyze theme --type=performance
   ```

## **Scripting & Automation**
- Use in bash scripts for batch operations
- Example:
   ```bash
   for file in $(ls *.php); do
     wp llm analyze $file --type=security
   done
   ```

## **Troubleshooting**

### **Common Issues**
- **Plugin not found**: Ensure plugin is installed and activated
- **API key issues**: Re-run `wp llm set-api-key`
- **Network errors**: Check internet connection

### **Debugging**
- Use `--debug` flag for verbose output
- Check WP-CLI logs

## **Best Practices**
- Use clear, specific prompts
- Review generated code before deploying
- Keep API keys secure

---

**Related Documentation:**
- [Cursor IDE Integration](./cursor-ide.md)
- [VS Code Integration](./vs-code.md)
- [API Reference](../api-reference.md)
- [Advanced Usage](../advanced-usage.md) 