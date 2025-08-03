'use client';

import React from 'react';

interface ButtonProps {
  children: React.ReactNode;
  className?: string;
  theme?: 'light' | 'dark';
}

const Button: React.FC<ButtonProps> = ({ children, className = '', theme = 'light' }) => {
  if (theme === 'dark') {
    // Dark version
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
      }}>
        <button
          className={className}
          style={{
            padding: '3px 26px',
            backgroundColor: '#ffffff',
            color: '#000000',
            borderRadius: '4px',
            border: 'none',
            fontFamily: 'Times New Roman, serif',
            fontWeight: '500',
            fontSize: '10px',
            cursor: 'pointer',
            background: '#ffffff',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'scale(0.95)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'scale(1)';
          }}
        >
          {children}
        </button>
      </div>
    );
  } else {
    // Light version
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
      }}>
        <button
          className={className}
          style={{
            padding: '3px 26px',
            backgroundColor: '#000000',
            color: '#ffffff',
            borderRadius: '4px',
            border: 'none',
            fontFamily: 'Times New Roman, serif',
            fontWeight: '500',
            fontSize: '10px',
            cursor: 'pointer',
            background: '#000000',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'scale(0.95)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'scale(1)';
          }}
        >
          {children}
        </button>
      </div>
    );
  }
};

export default Button;
