'use client';

import React, { useState, useEffect } from 'react';
import { MdOutlineDarkMode, MdOutlineLightMode } from 'react-icons/md';
import { HiOutlineComputerDesktop } from 'react-icons/hi2';

export type ThemeMode = 'system' | 'light' | 'dark';
export type EffectiveTheme = 'light' | 'dark';

interface ThemeControlProps {
  onThemeChange?: (effectiveTheme: EffectiveTheme) => void;
}

export default function ThemeControl({ onThemeChange }: ThemeControlProps = {}) {
  const [activeTheme, setActiveTheme] = useState<ThemeMode>('system');
  const [systemTheme, setSystemTheme] = useState<'light' | 'dark'>('light');
  const [hoveredTheme, setHoveredTheme] = useState<ThemeMode | null>(null);
  const [mounted, setMounted] = useState(false);

  const setCookie = (name: string, value: string, days: number = 36500) => {
    const expires = new Date();
    expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000);
    document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/`;
  };

  const getCookie = (name: string): string | null => {
    const nameEQ = name + "=";
    const ca = document.cookie.split(';');
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) === ' ') c = c.substring(1, c.length);
      if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
  };

  useEffect(() => {
    const savedTheme = getCookie('theme-preference');
    if (savedTheme && (savedTheme === 'system' || savedTheme === 'light' || savedTheme === 'dark')) {
      setActiveTheme(savedTheme as ThemeMode);
    }

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    setSystemTheme(mediaQuery.matches ? 'dark' : 'light');

    const handleChange = (e: MediaQueryListEvent) => {
      setSystemTheme(e.matches ? 'dark' : 'light');
    };

    mediaQuery.addEventListener('change', handleChange);
    setMounted(true);
    
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  const getEffectiveTheme = (): EffectiveTheme => {
    if (activeTheme === 'system') {
      return systemTheme;
    }
    return activeTheme as 'light' | 'dark';
  };

  const handleThemeClick = (theme: ThemeMode) => {
    setActiveTheme(theme);
    setCookie('theme-preference', theme);
  };

  useEffect(() => {
    if (mounted) {
      const effectiveTheme = getEffectiveTheme();
      onThemeChange?.(effectiveTheme);
    }
  }, [activeTheme, systemTheme, onThemeChange, mounted]);

  const getDisplayLabel = (theme: ThemeMode): React.ReactNode => {
    switch (theme) {
      case 'system': return <HiOutlineComputerDesktop size={14} />;
      case 'light': return <MdOutlineLightMode size={14} />;
      case 'dark': return <MdOutlineDarkMode size={14} />;
    }
  };

  const circleStyle = (theme: ThemeMode, isActive: boolean) => {
    let marginLeft = '0';
    if (theme === 'system') marginLeft = '-0.5px';
    if (theme === 'light') marginLeft = '0px';
    if (theme === 'dark') marginLeft = '-0.5px';

    const effectiveTheme = getEffectiveTheme();
    const isDark = effectiveTheme === 'dark';
    const isHovered = hoveredTheme === theme;
    
    let textColor;
    if (isActive) {
      textColor = isDark ? '#ffffff' : '#000000';
    } else if (isHovered) {
      textColor = isDark ? '#ffffff' : '#000000';
    } else {
      textColor = '#8f8f8f';
    }
    
    return {
      width: 'calc(24px - 2px)',
      height: 'calc(24px - 2px)',
      borderRadius: '50%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      cursor: 'pointer',
      fontSize: '11px',
      fontWeight: 'bold',
      textRendering: 'optimizeLegibility' as const,
      fontSmooth: 'always' as any,
      WebkitFontSmoothing: 'antialiased' as any,
      border: isActive ? `1px solid ${isDark ? '#252525' : '#e6e6e6'}` : '1px solid transparent',
      boxSizing: 'content-box' as const,
      backgroundColor: isActive ? (isDark ? '#0a0a0a' : '#ffffff') : 'transparent',
      color: textColor,
      marginLeft,
      zIndex: isActive ? 2 : 1,
      flexShrink: 0,
    };
  };

  return (
    <div
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        background: 'transparent',
        border: `1px solid ${getEffectiveTheme() === 'dark' ? '#252525' : '#e6e6e6'}`,
        borderRadius: 'calc(24px / 2)',
        padding: '0px',
        width: 'calc(72px - 2.5px)',
        height: 'calc(24px - 2px)',
        position: 'relative',
        boxSizing: 'content-box' as const,
      }}
    >
        <div
          style={circleStyle('system', activeTheme === 'system')}
          onClick={() => handleThemeClick('system')}
          onMouseEnter={() => setHoveredTheme('system')}
          onMouseLeave={() => setHoveredTheme(null)}
        >
          {getDisplayLabel('system')}
        </div>
        <div
          style={circleStyle('light', activeTheme === 'light')}
          onClick={() => handleThemeClick('light')}
          onMouseEnter={() => setHoveredTheme('light')}
          onMouseLeave={() => setHoveredTheme(null)}
        >
          {getDisplayLabel('light')}
        </div>
        <div
          style={circleStyle('dark', activeTheme === 'dark')}
          onClick={() => handleThemeClick('dark')}
          onMouseEnter={() => setHoveredTheme('dark')}
          onMouseLeave={() => setHoveredTheme(null)}
        >
          {getDisplayLabel('dark')}
        </div>
      </div>
  );
}
