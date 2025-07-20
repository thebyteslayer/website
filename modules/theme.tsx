'use client';

import React, { useState } from 'react';

interface ThemeButtonProps {
  theme?: 'light' | 'dark';
  onToggle: () => void;
}

const ThemeButton: React.FC<ThemeButtonProps> = ({ theme = 'light', onToggle }) => {
  const [hoveredCircle, setHoveredCircle] = useState<'L' | 'D' | null>(null);
  if (theme === 'dark') {
    return (
      <div
        style={{
          position: 'fixed',
          bottom: '20px',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '70px',
          height: '30px',
          backgroundColor: 'transparent',
          border: '1px solid #1a1a1a',
          borderRadius: '15px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '1px',
        }}
        onMouseEnter={(e) => e.stopPropagation()}
        onMouseLeave={(e) => e.stopPropagation()}
      >
        <div
          onClick={onToggle}
          style={{
            width: '28px',
            height: '28px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '12px',
            fontWeight: 'bold',
            color: hoveredCircle === 'L' ? '#ffffff' : '#1a1a1a',
            cursor: 'pointer',
            zIndex: 1,
          }}
          onMouseEnter={() => setHoveredCircle('L')}
          onMouseLeave={() => setHoveredCircle(null)}
        >
          L
        </div>

        <div
          style={{
            width: '28px',
            height: '28px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '12px',
            fontWeight: 'bold',
            color: '#1a1a1a',
            cursor: 'default',
            zIndex: 1,
          }}
        >
          D
        </div>

        <div
          style={{
            position: 'absolute',
            top: '50%',
            transform: 'translateY(-50%)',
            left: '39px',
            width: '30px',
            height: '30px',
            backgroundColor: '#000000',
            border: '1px solid #1a1a1a',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '12px',
            fontWeight: 'bold',
            color: '#ffffff',
            zIndex: 2,
          }}
        >
          D
        </div>
      </div>
    );
  } else {
    return (
      <div
        style={{
          position: 'fixed',
          bottom: '20px',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '70px',
          height: '30px',
          backgroundColor: 'transparent',
          border: '1px solid #e1e1e1',
          borderRadius: '15px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '1px',
        }}
        onMouseEnter={(e) => e.stopPropagation()}
        onMouseLeave={(e) => e.stopPropagation()}
      >
        <div
          style={{
            width: '28px',
            height: '28px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '12px',
            fontWeight: 'bold',
            color: '#e1e1e1',
            cursor: 'default',
            zIndex: 1,
          }}
        >
          L
        </div>

        <div
          onClick={onToggle}
          style={{
            width: '28px',
            height: '28px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '12px',
            fontWeight: 'bold',
            color: hoveredCircle === 'D' ? '#000000' : '#e1e1e1',
            cursor: 'pointer',
            zIndex: 1,
          }}
          onMouseEnter={() => setHoveredCircle('D')}
          onMouseLeave={() => setHoveredCircle(null)}
        >
          D
        </div>

        <div
          style={{
            position: 'absolute',
            top: '50%',
            transform: 'translateY(-50%)',
            left: '-1px',
            width: '30px',
            height: '30px',
            backgroundColor: '#ffffff',
            border: '1px solid #e1e1e1',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '12px',
            fontWeight: 'bold',
            color: '#000000',
            zIndex: 2,
          }}
        >
          L
        </div>
      </div>
    );
  }
};

export default ThemeButton; 