import React, { useEffect, useRef, useState } from 'react';
import hljs from 'highlight.js';
import { useColorMode } from '@docusaurus/theme-common';
// Change this line to use a different theme:
// import 'highlight.js/styles/github.css'; // Light GitHub theme
// Popular alternatives:
// import 'highlight.js/styles/github-dark.css'; // Dark GitHub theme
// import 'highlight.js/styles/nord.css'; // Clean dark theme with blue accents
// import 'highlight.js/styles/atom-one-dark.css'; // Popular dark theme
// import 'highlight.js/styles/obsidian.css'; // Minimalist dark theme
// import 'highlight.js/styles/night-owl.css'; // Dark theme with good contrast

export default function CodeBlock({ children, className = '', title, showLineNumbers = false, showCopyButton = true, wrapLongLines = false }) {
  const codeRef = useRef(null);
  const [copied, setCopied] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const { colorMode } = useColorMode();
  
  // Extract language from className (e.g., language-js)
  const language = className.replace('language-', '') || 'plaintext';

  useEffect(() => {
    // Remove any existing highlight.js stylesheets
    const existingStyles = document.querySelectorAll('link[href*="highlight.js/styles/"]');
    existingStyles.forEach(style => style.remove());

    // Import the appropriate theme based on color mode
    const loadTheme = async () => {
      try {
        if (colorMode === 'dark') {
          // Dark mode themes - choose one:
          await import('highlight.js/styles/github-dark.css');
          // Alternative dark themes you can try:
          // await import('highlight.js/styles/nord.css');
          // await import('highlight.js/styles/atom-one-dark.css');
          // await import('highlight.js/styles/obsidian.css');
          // await import('highlight.js/styles/night-owl.css');
          // await import('highlight.js/styles/dracula.css');
        } else {
          // Light mode themes - choose one:
          await import('highlight.js/styles/github.css');
          // Alternative light themes you can try:
          // await import('highlight.js/styles/atom-one-light.css');
          // await import('highlight.js/styles/xcode.css');
          // await import('highlight.js/styles/vs.css');
          // await import('highlight.js/styles/stackoverflow-light.css');
        }
      } catch (error) {
        console.warn('Failed to load highlight.js theme:', error);
        // Fallback to default theme
        await import('highlight.js/styles/default.css');
      }
    };

    loadTheme();
  }, [colorMode]);

  useEffect(() => {
    if (codeRef.current) {
      hljs.highlightElement(codeRef.current);
    }
  }, [children, language, colorMode]);

  // Only render as a code block if we have a language class
  // This prevents inline code from being processed as blocks
  if (!className || !className.includes('language-')) {
    return <code className={className}>{children}</code>;
  }

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(children);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy code:', err);
    }
  };

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  const codeContent = children?.toString() || '';
  const hasLongLines = codeContent.split('\n').some(line => line.length > 80);
  const shouldShowExpandButton = hasLongLines && !wrapLongLines;

  return (
    <div className="code-block-container">
      {/* Header with title and buttons */}
      <div className="code-block-header">
        <div className="code-block-title">
          {title || language}
        </div>
        <div className="code-block-actions">
          {shouldShowExpandButton && (
            <button onClick={toggleExpand}>
              {isExpanded ? 'Collapse' : 'Expand'}
            </button>
          )}
          {showCopyButton && (
            <button 
              onClick={handleCopy}
              className={copied ? 'copied' : ''}
            >
              {copied ? 'Copied!' : 'Copy'}
            </button>
          )}
        </div>
      </div>

      {/* Code block */}
      <pre 
        className={`hljs ${className} ${isExpanded ? 'expanded' : ''}`}
        style={{
          whiteSpace: wrapLongLines ? 'pre-wrap' : 'pre',
          wordBreak: wrapLongLines ? 'break-word' : 'normal',
          maxHeight: isExpanded ? 'none' : '400px',
          overflow: isExpanded ? 'visible' : 'auto'
        }}
      >
        <code ref={codeRef} className={className}>
          {children}
        </code>
      </pre>
    </div>
  );
} 