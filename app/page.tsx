'use client';

import React, { useState } from 'react';
import Button from '../modules/Button';
import ComingSoon from '../modules/ComingSoon';
import EntryLog from '../modules/EntryLog';
import ThemeControl, { EffectiveTheme } from '../modules/Theme';

export default function Home() {
  const [currentTheme, setCurrentTheme] = useState<EffectiveTheme>('light');
  const [showEntryLog, setShowEntryLog] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  const handleThemeChange = (effectiveTheme: EffectiveTheme) => {
    setCurrentTheme(effectiveTheme);
  };

  const handleEntryLogComplete = () => {
    setShowEntryLog(false);
  };

  React.useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const backgroundColor = currentTheme === 'dark' ? '#000000' : '#fafafa';

  return (
    <>
      <style jsx global>{`
        html, body {
          background-color: ${backgroundColor} !important;
          margin: 0;
          padding: 0;
        }
        body {
          overscroll-behavior: none;
        }
      `}</style>
      
      {/* EntryLog overlay - shows first, then disappears */}
      {showEntryLog && (
        <EntryLog 
          theme={currentTheme} 
          autoStart={true} 
          speed={50} 
          onComplete={handleEntryLogComplete}
        />
      )}
      
      {/* Main page content - always rendered but hidden behind EntryLog initially */}
      <div style={{
        minHeight: '100vh',
        backgroundColor,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative'
      }}>
        <div style={{ 
          textAlign: 'center',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          width: '100%',
          maxWidth: '800px',
          padding: isMobile ? '16px' : '20px'
        }}>
          <ComingSoon theme={currentTheme} />
          <div style={{ marginTop: isMobile ? '2rem' : '3rem' }}>
            <div 
              onClick={() => window.open('https://money.thebyteslayer.com', '_blank')}
              style={{ display: 'inline-block', cursor: 'pointer' }}
            >
              <Button theme={currentTheme}>
                Learn More
              </Button>
            </div>
          </div>
        </div>
        <div style={{
          position: 'absolute',
          bottom: isMobile ? '16px' : '20px',
          left: '50%',
          transform: 'translateX(-50%)'
        }}>
          <ThemeControl onThemeChange={handleThemeChange} />
        </div>
      </div>
    </>
  );
}
