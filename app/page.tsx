'use client';

import React, { useState } from 'react';
import Button from '../modules/Button';
import ComingSoon from '../modules/ComingSoon';
import ThemeControl, { EffectiveTheme } from '../modules/Theme';

export default function Home() {
  const [currentTheme, setCurrentTheme] = useState<EffectiveTheme>('light');

  const handleThemeChange = (effectiveTheme: EffectiveTheme) => {
    setCurrentTheme(effectiveTheme);
  };

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
          justifyContent: 'center'
        }}>
          <ComingSoon theme={currentTheme} />
          <div style={{ marginTop: '3rem' }}>
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
          bottom: '20px',
          left: '50%',
          transform: 'translateX(-50%)'
        }}>
          <ThemeControl onThemeChange={handleThemeChange} />
        </div>
      </div>
    </>
  );
}
