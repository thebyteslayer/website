import React from 'react';

interface ComingSoonProps {
  theme?: 'light' | 'dark';
}

const ComingSoon: React.FC<ComingSoonProps> = ({ theme = 'light' }) => {
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
          fontSize: '4rem',
          fontWeight: 'bold',
          color: '#ffffff',
          marginBottom: '1rem',
          margin: '0 0 1rem 0'
        }}>
          Coming Soon
        </h1>
        <p style={{
          fontFamily: 'Times New Roman, serif',
          fontSize: '1rem',
          color: '#ffffff',
          margin: '0'
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
          fontSize: '4rem',
          fontWeight: 'bold',
          color: '#000000',
          marginBottom: '1rem',
          margin: '0 0 1rem 0'
        }}>
          Coming Soon
        </h1>
        <p style={{
          fontFamily: 'Times New Roman, serif',
          fontSize: '1rem',
          color: '#000000',
          margin: '0'
        }}>
          This Website is currently under Construction check back later.
        </p>
      </div>
    );
  }
};

export default ComingSoon;
