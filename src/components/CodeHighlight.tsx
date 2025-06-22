import React, { useEffect, useRef } from 'react';
import hljs from 'highlight.js';
import { useColorMode } from '@docusaurus/theme-common';

interface CodeHighlightProps {
  code: string;
  language: string;
  className?: string;
}

const CodeHighlight: React.FC<CodeHighlightProps> = ({ 
  code, 
  language, 
  className = '' 
}) => {
  const codeRef = useRef<HTMLElement>(null);
  const { colorMode } = useColorMode();

  useEffect(() => {
    // Remove any existing highlight.js stylesheets
    const existingStyles = document.querySelectorAll('link[href*="highlight.js/styles/"]');
    existingStyles.forEach(style => style.remove());

    // Import the appropriate theme based on color mode
    const loadTheme = async () => {
      try {
        if (colorMode === 'dark') {
          await import('highlight.js/styles/github-dark.css');
        } else {
          await import('highlight.js/styles/github.css');
        }
      } catch (error) {
        console.warn('Failed to load highlight.js theme:', error);
        await import('highlight.js/styles/default.css');
      }
    };

    loadTheme();
  }, [colorMode]);

  useEffect(() => {
    if (codeRef.current) {
      hljs.highlightElement(codeRef.current);
    }
  }, [code, language, colorMode]);

  return (
    <pre className={`hljs ${className}`}>
      <code 
        ref={codeRef}
        className={`language-${language}`}
      >
        {code}
      </code>
    </pre>
  );
};

export default CodeHighlight; 