'use client';

import React, { useState, useEffect } from 'react';

interface EntryLogProps {
  theme?: 'light' | 'dark';
  autoStart?: boolean;
  speed?: number;
  onComplete?: () => void;
}

const EntryLog: React.FC<EntryLogProps> = ({ theme = 'light', autoStart = true, speed = 150, onComplete }) => {
  const [visibleLines, setVisibleLines] = useState<number>(0);
  const [isComplete, setIsComplete] = useState(false);
  const [shouldHide, setShouldHide] = useState(false);

  const logLines = [
    'Running build in Washington, D.C., USA (East) – iad1',
    'Build machine configuration: 2 cores, 8 GB',
    'Cloning github.com/thebyteslayer/website (Branch: main, Commit: 0c13b90)',
    'Cloning completed: 271.000ms',
    'Installing dependencies ...',
    'Creating an optimized production build ...',
    'Compiled successfully in 5.0s',
    'Linting and checking validity of types ...',
    'Collecting page data ...',
    'Generating static pages (4/4)',
    'Finalizing page optimization ...',
    'Collecting build traces ...',
    'Deploying outputs...',
    'Deployment completed',
    'Uploading build cache [191.29 MB]...',
    'Build cache uploaded: 3.626s',
    'Exiting build container'
  ];

  useEffect(() => {
    if (!autoStart) return;

    const interval = setInterval(() => {
      setVisibleLines(prev => {
        const next = prev + 1;
        if (next > logLines.length) {
          setIsComplete(true);
          return logLines.length;
        }
        return next;
      });
    }, speed);

    return () => clearInterval(interval);
  }, [autoStart, speed, logLines.length]);

  useEffect(() => {
    if (isComplete) {
      const hideTimer = setTimeout(() => {
        setShouldHide(true);
        onComplete?.();
      }, 300);

      return () => clearTimeout(hideTimer);
    }
  }, [isComplete, onComplete]);

  if (shouldHide) {
    return null;
  }

  const isDark = theme === 'dark';
  
  const containerStyle: React.CSSProperties = {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100vw',
    height: '100vh',
    zIndex: 9999,
    fontFamily: 'monospace',
    fontSize: '14px',
    lineHeight: '1.5',
    padding: '40px',
    backgroundColor: isDark ? '#000000' : '#fafafa',
    color: isDark ? '#ffffff' : '#000000',
    overflow: 'hidden',
    whiteSpace: 'pre-wrap',
    wordBreak: 'break-word',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start'
  };

  const lineStyle = (index: number): React.CSSProperties => ({
    opacity: index < visibleLines ? 1 : 0,
    marginBottom: '2px'
  });

  return (
    <div style={containerStyle}>
      {logLines.map((line, index) => (
        <div key={index} style={lineStyle(index)}>
          {line}
        </div>
      ))}
      {isComplete && (
        <div 
          style={{
            ...lineStyle(logLines.length),
            marginTop: '16px',
            color: isDark ? '#4ade80' : '#16a34a',
            fontWeight: 'bold'
          }}
        >
          ✓ Build completed successfully
        </div>
      )}
    </div>
  );
};

export default EntryLog;
