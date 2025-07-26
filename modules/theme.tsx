'use client';

import React, { useState, useEffect } from 'react';

type Theme = 'system' | 'light' | 'dark';

interface ThemeButtonProps {
  theme: Theme;
  onThemeChange: (theme: Theme) => void;
  effectiveTheme: 'light' | 'dark';
}

const ThemeButton: React.FC<ThemeButtonProps> = ({ theme, onThemeChange, effectiveTheme }) => {
  const [hoveredCircle, setHoveredCircle] = useState<'S' | 'L' | 'D' | null>(null);

  const handleThemeClick = (newTheme: Theme) => {
    onThemeChange(newTheme);
  };

  const isDark = effectiveTheme === 'dark';

  return (
    <div
      style={{
        position: 'fixed',
        bottom: '20px',
        left: '50%',
        transform: 'translateX(-50%)',
        width: '84px',
        height: '24px',
        backgroundColor: 'transparent',
        border: isDark ? '1px solid #252525' : '1px solid #e6e6e6',
        borderRadius: '12px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '1px',
        fontFamily: 'system-ui, -apple-system, sans-serif',
      }}
      onMouseEnter={(e) => e.stopPropagation()}
      onMouseLeave={(e) => e.stopPropagation()}
    >
      <div
        onClick={() => handleThemeClick('system')}
        style={{
          width: '22px',
          height: '22px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '10px',
          fontWeight: 'bold',
          fontFamily: 'inherit',
          color: theme === 'system' 
            ? (isDark ? '#ffffff' : '#000000')
            : (hoveredCircle === 'S' 
                ? (isDark ? '#ffffff' : '#000000') 
                : '#8f8f8f'),
          cursor: 'pointer',
          zIndex: 1,
        }}
        onMouseEnter={() => setHoveredCircle('S')}
        onMouseLeave={() => setHoveredCircle(null)}
      >
        S
      </div>

      <div
        onClick={() => handleThemeClick('light')}
        style={{
          width: '22px',
          height: '22px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '10px',
          fontWeight: 'bold',
          fontFamily: 'inherit',
          color: theme === 'light' 
            ? (isDark ? '#ffffff' : '#000000')
            : (hoveredCircle === 'L' 
                ? (isDark ? '#ffffff' : '#000000') 
                : '#8f8f8f'),
          cursor: 'pointer',
          zIndex: 1,
        }}
        onMouseEnter={() => setHoveredCircle('L')}
        onMouseLeave={() => setHoveredCircle(null)}
      >
        L
      </div>

      <div
        onClick={() => handleThemeClick('dark')}
        style={{
          width: '22px',
          height: '22px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '10px',
          fontWeight: 'bold',
          fontFamily: 'inherit',
          color: theme === 'dark' 
            ? (isDark ? '#ffffff' : '#000000')
            : (hoveredCircle === 'D' 
                ? (isDark ? '#ffffff' : '#000000') 
                : '#8f8f8f'),
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
          left: theme === 'system' ? '0px' : theme === 'light' ? '30px' : '60px',
          width: '24px',
          height: '24px',
          backgroundColor: isDark ? '#0a0a0a' : '#ffffff',
          border: isDark ? '1px solid #252525' : '1px solid #e6e6e6',
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '10px',
          fontWeight: 'bold',
          fontFamily: 'inherit',
          color: isDark ? '#ffffff' : '#000000',
          zIndex: 2,
        }}
      >
        {theme === 'system' ? 'S' : theme === 'light' ? 'L' : 'D'}
      </div>
    </div>
  );
};

export const useTheme = () => {
  const [theme, setTheme] = useState<Theme>('system');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const savedTheme = getCookie('theme') as Theme | null;
    if (savedTheme && ['system', 'light', 'dark'].includes(savedTheme)) {
      setTheme(savedTheme);
    }
  }, []);

  const changeTheme = (newTheme: Theme) => {
    setTheme(newTheme);
    setCookie('theme', newTheme, 365);
  };

  const getEffectiveTheme = (): 'light' | 'dark' => {
    if (!mounted) {
      return 'light';
    }
    
    if (theme === 'system') {
      if (typeof window !== 'undefined') {
        return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
      }
      return 'light';
    }
    return theme as 'light' | 'dark';
  };

  return {
    theme,
    effectiveTheme: getEffectiveTheme(),
    changeTheme,
    mounted,
  };
};

const setCookie = (name: string, value: string, days: number) => {
  if (typeof document === 'undefined') return;
  const expires = new Date();
  expires.setTime(expires.getTime() + (days * 24 * 60 * 60 * 1000));
  document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/`;
};

const getCookie = (name: string): string | null => {
  if (typeof document === 'undefined') return null;
  const nameEQ = name + "=";
  const ca = document.cookie.split(';');
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) === ' ') c = c.substring(1, c.length);
    if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
  }
  return null;
};

export default ThemeButton; 