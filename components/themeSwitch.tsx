'use client';

import React, { useState } from 'react';
import { MdOutlineDarkMode, MdOutlineLightMode } from 'react-icons/md';
import { HiOutlineComputerDesktop } from 'react-icons/hi2';
import { useTheme } from 'next-themes';

export type ThemeMode = 'system' | 'light' | 'dark';

export default function ThemeSwitch() {
  const { theme: activeTheme, setTheme, resolvedTheme } = useTheme();
  const [hoveredTheme, setHoveredTheme] = useState<ThemeMode | null>(null);
  const [mounted, setMounted] = useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  const handleThemeClick = (theme: ThemeMode) => {
    setTheme(theme);
  };

  const getDisplayLabel = (theme: ThemeMode): React.ReactNode => {
    switch (theme) {
      case 'system': return <HiOutlineComputerDesktop size={14} />;
      case 'light': return <MdOutlineLightMode size={14} />;
      case 'dark': return <MdOutlineDarkMode size={14} />;
    }
  };

  const getEffectiveTheme = () => {
    // Only return resolved theme after mounting to prevent hydration mismatch
    if (!mounted) return 'light'; // Default to light during SSR
    return resolvedTheme === 'dark' ? 'dark' : 'light';
  };

  const circleStyle = (theme: ThemeMode, isActive: boolean) => {
    let marginLeft = '0';
    if (theme === 'system') marginLeft = '-0.5px';
    if (theme === 'light') marginLeft = '0px';
    if (theme === 'dark') marginLeft = '-0.5px';

    const effectiveTheme = getEffectiveTheme();
    const isDark = effectiveTheme === 'dark';
    const isHovered = hoveredTheme === theme && mounted;

    let textColor;
    if (isActive && mounted) {
      textColor = 'var(--foreground)';
    } else if (isHovered) {
      textColor = 'var(--foreground)';
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
      border: (isActive && mounted) ? '1px solid var(--border)' : '1px solid transparent',
      boxSizing: 'content-box' as const,
      backgroundColor: (isActive && mounted) ? 'var(--soft-background)' : 'transparent',
      color: textColor,
      marginLeft,
      zIndex: (isActive && mounted) ? 2 : 1,
      flexShrink: 0,
    };
  };

  const containerStyle = {
    display: 'inline-flex',
    alignItems: 'center',
    background: 'transparent',
    border: '1px solid var(--border)',
    borderRadius: 'calc(24px / 2)',
    padding: '0px',
    width: 'calc(72px - 2.5px)',
    height: 'calc(24px - 2px)',
    position: 'relative' as const,
    boxSizing: 'content-box' as const,
  };

  return (
    <div style={containerStyle}>
      <div
        style={circleStyle('system', mounted && activeTheme === 'system')}
        onClick={() => handleThemeClick('system')}
        onMouseEnter={() => setHoveredTheme('system')}
        onMouseLeave={() => setHoveredTheme(null)}
      >
        {getDisplayLabel('system')}
      </div>
      <div
        style={circleStyle('light', mounted && activeTheme === 'light')}
        onClick={() => handleThemeClick('light')}
        onMouseEnter={() => setHoveredTheme('light')}
        onMouseLeave={() => setHoveredTheme(null)}
      >
        {getDisplayLabel('light')}
      </div>
      <div
        style={circleStyle('dark', mounted && activeTheme === 'dark')}
        onClick={() => handleThemeClick('dark')}
        onMouseEnter={() => setHoveredTheme('dark')}
        onMouseLeave={() => setHoveredTheme(null)}
      >
        {getDisplayLabel('dark')}
      </div>
    </div>
  );
}
