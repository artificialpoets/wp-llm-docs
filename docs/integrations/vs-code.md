---
id: vs-code
title: VS Code Integration
sidebar_label: VS Code
keywords: [vs code, integration, extension, ai, wordpress]
description: Guide to integrating WP LLM with Visual Studio Code for WordPress development
---

# VS Code Integration

Integrate WP LLM with Visual Studio Code to supercharge your WordPress development workflow with AI-powered code generation, analysis, and best practices.

## **Overview**

VS Code integration with WP LLM provides:
- Inline code generation for WordPress (PHP, JS, CSS)
- Security and performance analysis
- Block and plugin scaffolding
- Prompt templates and code snippets

<MermaidDiagram chart={`
graph TD
    A[VS Code] --> B[WP LLM Extension]
    B --> C[Code Generation]
    B --> D[Code Analysis]
    B --> E[Block/Plugin Scaffolding]
    C --> F[PHP]
    C --> G[JS/React]
    C --> H[CSS]
    D --> I[Security]
    D --> J[Performance]
    E --> K[Blocks]
    E --> L[Plugins]
`} />

## **Installation**

### **Prerequisites**
- Visual Studio Code (latest)
- WP LLM API key
- Node.js 18+

### **Steps**
1. **Install WP LLM Extension**
   - Search for "WP LLM" in the VS Code Extensions Marketplace
   - Click Install
2. **Configure API Key**
   - Open Command Palette (Cmd+Shift+P)
   - Type `WP LLM: Set API Key`
   - Enter your API key
3. **Extension Settings**
   - Access via `Settings > Extensions > WP LLM`
   - Configure model, max tokens, temperature, etc.

## **Features**

### **Inline Code Generation**
- Type a prompt as a comment and press `Cmd+Shift+L` to generate code
- Example:
```php
// Generate a custom post type for testimonials
```

### **Block/Plugin Scaffolding**
- Use the command palette:
  - `WP LLM: Generate Block`
  - `WP LLM: Generate Plugin`
- Fill in the prompt details

### **Code Analysis**
- Highlight code and run `WP LLM: Analyze Code`
- Security, performance, and best practices feedback

### **Prompt Templates & Snippets**
- Use built-in prompt templates for common tasks
- Add your own in `settings.json`:
```json
{
  "wp-llm.prompts": {
    "custom-post-type": "Create a custom post type for {name} with fields: {fields}"
  }
}
```

## **Keyboard Shortcuts**
| Shortcut         | Action                        |
|------------------|------------------------------|
| Cmd+Shift+L      | Generate code from comment    |
| Cmd+Shift+B      | Generate Gutenberg block      |
| Cmd+Shift+A      | Analyze selected code         |
| Cmd+Shift+P      | Open command palette          |

## **Troubleshooting**

### **Common Issues**
- **Extension not loading**: Reload VS Code, check logs (`Help > Toggle Developer Tools`)
- **API key issues**: Re-enter via Command Palette
- **Performance**: Lower `maxTokens` in settings

### **Debugging**
- Enable verbose logging in settings
- Check extension output panel

## **Best Practices**
- Use specific prompts for best results
- Always review generated code
- Keep API keys secure (never commit to git)

---

**Related Documentation:**
- [Cursor IDE Integration](./cursor-ide.md)
- [WP-CLI Integration](./wp-cli.md)
- [API Reference](../api-reference.md)
- [Advanced Usage](../advanced-usage.md) 