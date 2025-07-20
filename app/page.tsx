'use client';

import React, { useState } from 'react';
import Button from '../modules/button';
import ComingSoon from '../modules/coming-soon';
import ThemeButton from '../modules/theme';

export default function Home() {
  const [isDark, setIsDark] = useState(false);

  const toggleTheme = () => {
    setIsDark(!isDark);
  };

  return (
    <>
      <style jsx global>{`
        html, body {
          background-color: ${isDark ? '#000000' : '#fafafa'} !important;
          margin: 0;
          padding: 0;
        }
        body {
          overscroll-behavior: none;
        }
      `}</style>
      <div style={{
        minHeight: '100vh',
        backgroundColor: isDark ? '#000000' : '#fafafa',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
      <div style={{ 
        textAlign: 'center',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <ComingSoon theme={isDark ? 'dark' : 'light'} />
        <div style={{ marginTop: '3rem' }}>
          <div 
            onClick={() => window.open('https://money.thebyteslayer.com', '_blank')}
            style={{ display: 'inline-block', cursor: 'pointer' }}
          >
            <Button theme={isDark ? 'dark' : 'light'}>
              Learn More
            </Button>
          </div>
        </div>
      </div>
      <ThemeButton theme={isDark ? 'dark' : 'light'} onToggle={toggleTheme} />
    </div>
    </>
  );
}
