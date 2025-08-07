import React, { useState, useEffect } from 'react';

interface ComingSoonProps {
  theme?: 'light' | 'dark';
}

const ComingSoon: React.FC<ComingSoonProps> = ({ theme = 'light' }) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);
  if (theme === 'dark') {
    return (
      <div style={{ 
        textAlign: 'center',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <h1 style={{
          fontFamily: 'Times New Roman, serif',
          fontSize: isMobile ? '2.5rem' : '4rem',
          fontWeight: 'bold',
          color: '#ffffff',
          marginBottom: '1rem',
          margin: '0 0 1rem 0'
        }}>
          Coming Soon
        </h1>
        <p style={{
          fontFamily: 'Times New Roman, serif',
          fontSize: isMobile ? '0.9rem' : '1rem',
          color: '#ffffff',
          margin: '0',
          padding: isMobile ? '0 8px' : '0'
        }}>
          This Website is currently under Construction check back later.
        </p>
      </div>
    );
  } else {
    return (
      <div style={{ 
        textAlign: 'center',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <h1 style={{
          fontFamily: 'Times New Roman, serif',
          fontSize: isMobile ? '2.5rem' : '4rem',
          fontWeight: 'bold',
          color: '#000000',
          marginBottom: '1rem',
          margin: '0 0 1rem 0'
        }}>
          Coming Soon
        </h1>
        <p style={{
          fontFamily: 'Times New Roman, serif',
          fontSize: isMobile ? '0.9rem' : '1rem',
          color: '#000000',
          margin: '0',
          padding: isMobile ? '0 8px' : '0'
        }}>
          This Website is currently under Construction check back later.
        </p>
      </div>
    );
  }
};

export default ComingSoon;
