import React, { useEffect, useRef } from 'react';
import mermaid from 'mermaid';
import { useColorMode } from '@docusaurus/theme-common';

interface MermaidDiagramProps {
  chart: string;
  title?: string;
  className?: string;
}

export default function MermaidDiagram({ chart, title, className = '' }: MermaidDiagramProps) {
  const mermaidRef = useRef<HTMLDivElement>(null);
  const { colorMode } = useColorMode();

  useEffect(() => {
    // Configure Mermaid with theme based on color mode
    const isDark = colorMode === 'dark';
    
    mermaid.initialize({
      startOnLoad: false,
      theme: isDark ? 'dark' : 'neutral',
      themeVariables: {
        // Light mode colors
        primaryColor: isDark ? '#ffffff' : '#000000',
        primaryTextColor: isDark ? '#ffffff' : '#000000',
        primaryBorderColor: isDark ? '#ffffff' : '#000000',
        lineColor: isDark ? '#a3a3a3' : '#666666',
        secondaryColor: isDark ? '#262626' : '#f5f5f5',
        tertiaryColor: isDark ? '#1a1a1a' : '#ffffff',
        background: isDark ? '#0f0f0f' : '#ffffff',
        fontFamily: 'Manrope, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
        fontSize: '14px',
        border: isDark ? '#404040' : '#e1e4e8',
        errorBkgColor: isDark ? '#7f1d1d' : '#ffebee',
        errorTextColor: isDark ? '#fca5a5' : '#c62828',
        successColor: isDark ? '#10b981' : '#4caf50',
        successTextColor: isDark ? '#6ee7b7' : '#2e7d32',
        warningColor: isDark ? '#f59e0b' : '#ff9800',
        warningTextColor: isDark ? '#fcd34d' : '#ef6c00',
        infoColor: isDark ? '#3b82f6' : '#2196f3',
        infoTextColor: isDark ? '#93c5fd' : '#1565c0',
      },
      flowchart: {
        useMaxWidth: true,
        htmlLabels: true,
        curve: 'basis',
      },
      sequence: {
        diagramMarginX: 50,
        diagramMarginY: 10,
        actorMargin: 50,
        width: 150,
        height: 65,
        boxMargin: 10,
        boxTextMargin: 5,
        noteMargin: 10,
        messageMargin: 35,
        mirrorActors: true,
        bottomMarginAdj: 1,
        useMaxWidth: true,
        rightAngles: false,
        showSequenceNumbers: false,
      },
      gantt: {
        useMaxWidth: true,
        leftPadding: 75,
        rightPadding: 20,
        topPadding: 50,
        gridLineStartPadding: 35,
        fontSize: 11,
        numberSectionStyles: 4,
        axisFormat: '%Y-%m-%d',
        topAxis: false,
      },
      er: {
        useMaxWidth: true,
        diagramPadding: 20,
        layoutDirection: 'TB',
        minEntityWidth: 100,
        minEntityHeight: 75,
        entityPadding: 15,
        stroke: isDark ? '#a3a3a3' : 'gray',
        fill: isDark ? '#1a1a1a' : 'honeydew',
        fontSize: 12,
      },
      mindmap: {
        useMaxWidth: true,
        padding: 5,
      },
    });

    if (mermaidRef.current) {
      mermaid.render(`mermaid-${Date.now()}`, chart).then(({ svg }) => {
        if (mermaidRef.current) {
          mermaidRef.current.innerHTML = svg;
        }
      }).catch((error) => {
        console.error('Mermaid rendering error:', error);
        if (mermaidRef.current) {
          mermaidRef.current.innerHTML = `<div style="color: ${isDark ? '#ef4444' : 'red'}; padding: 1rem; border: 1px solid ${isDark ? '#ef4444' : 'red'}; border-radius: 4px; background-color: ${isDark ? '#1a1a1a' : '#ffffff'};">Error rendering diagram: ${error.message}</div>`;
        }
      });
    }
  }, [chart, colorMode]);

  return (
    <div className={`mermaid-diagram ${className}`} style={{ margin: '2rem 0' }}>
      {title && (
        <div className="mermaid-title" style={{
          fontSize: '0.875rem',
          fontWeight: '600',
          color: colorMode === 'dark' ? '#ffffff' : '#666666',
          marginBottom: '0.5rem',
          textTransform: 'uppercase',
          letterSpacing: '0.05em'
        }}>
          {title}
        </div>
      )}
      <div 
        ref={mermaidRef}
        className="mermaid-content"
        style={{
          backgroundColor: colorMode === 'dark' ? '#1a1a1a' : '#ffffff',
          border: `1px solid ${colorMode === 'dark' ? '#404040' : '#e1e4e8'}`,
          borderRadius: '6px',
          padding: '1rem',
          overflow: 'auto',
          textAlign: 'center'
        }}
      />
    </div>
  );
} 