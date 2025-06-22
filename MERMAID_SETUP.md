# Mermaid Integration Setup

This document explains how Mermaid diagrams are integrated into the WP MCP documentation.

## 🎯 What's Installed

- **mermaid**: The core Mermaid library for rendering diagrams
- **Custom MermaidDiagram component**: A React wrapper that integrates with Docusaurus
- **Neutral theme configuration**: Matches your black & white design system
- **Responsive styling**: Works on all device sizes

## 📁 Files Added/Modified

### New Files
- `src/components/MermaidDiagram/index.tsx` - Custom Mermaid component
- `docs/Guides/MermaidExamples.md` - Examples and usage guide
- `MERMAID_SETUP.md` - This setup guide

### Modified Files
- `src/theme/MDXComponents.js` - Added MermaidDiagram component
- `src/css/custom.css` - Added Mermaid styling
- `package.json` - Added mermaid dependency

## 🎨 Theme Configuration

The Mermaid diagrams use a neutral theme with:
- **Primary colors**: Black and white
- **Font**: Inter (matches your design system)
- **Borders**: Subtle gray borders
- **Background**: Clean white background
- **Dark mode support**: Automatic theme switching

## 🚀 Usage

### Basic Usage
```jsx
<MermaidDiagram 
  title="Your Diagram Title"
  chart={`
flowchart TD
    A[Start] --> B[Process]
    B --> C[End]
  `}
/>
```

### Supported Chart Types
- Flowcharts
- Sequence Diagrams
- Component Diagrams
- Entity Relationship Diagrams
- Mindmaps
- Gantt Charts
- State Diagrams
- Class Diagrams

## 🔧 Configuration

The Mermaid configuration is in `src/components/MermaidDiagram/index.tsx` and includes:
- Neutral theme with custom colors
- Responsive settings
- Font configuration
- Error handling

## 📱 Responsive Design

Diagrams automatically:
- Scale to container width
- Maintain aspect ratios
- Adjust padding on mobile
- Support touch interactions

## 🌙 Dark Mode

Diagrams automatically adapt to:
- Light mode: White background, dark text
- Dark mode: Dark background, light text
- Consistent styling across themes

## 🐛 Troubleshooting

### Common Issues
1. **Diagrams not rendering**: Check browser console for errors
2. **Syntax errors**: Validate Mermaid syntax at mermaid.live
3. **Styling issues**: Check CSS overrides

### Debug Mode
Add `console.log` to the MermaidDiagram component to debug rendering issues.

## 📚 Resources

- [Mermaid Documentation](https://mermaid.js.org/)
- [Mermaid Live Editor](https://mermaid.live/)
- [Docusaurus MDX Guide](https://docusaurus.io/docs/markdown-features/react)

## 🔄 Maintenance

- Update Mermaid library: `npm update mermaid`
- Review theme colors quarterly
- Test on new devices/browsers
- Monitor performance impact 