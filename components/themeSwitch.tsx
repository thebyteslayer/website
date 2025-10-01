'use client';

import React, { useState } from 'react';
import { MdOutlineDarkMode, MdOutlineLightMode } from 'react-icons/md';
import { HiOutlineComputerDesktop } from 'react-icons/hi2';
import { useTheme } from './theme';

export type ThemeMode = 'system' | 'light' | 'dark';
export type EffectiveTheme = 'light' | 'dark';

interface ThemeControlProps {
  onThemeChange?: (effectiveTheme: EffectiveTheme) => void;
}

export default function ThemeSwitch({ onThemeChange }: ThemeControlProps = {}) {
  const { theme: activeTheme, setTheme } = useTheme();
  const [hoveredTheme, setHoveredTheme] = useState<ThemeMode | null>(null);

  const getEffectiveTheme = (): EffectiveTheme => {
    if (activeTheme === 'system') {
      return typeof window !== 'undefined' && window.matchMedia('(prefers-color-scheme: dark)').matches
        ? 'dark'
        : 'light';
    }
    return activeTheme as 'light' | 'dark';
  };

  const handleThemeClick = (theme: ThemeMode) => {
    setTheme(theme);
    const newEffectiveTheme: EffectiveTheme = theme === 'system'
      ? (typeof window !== 'undefined' && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light')
      : theme as 'light' | 'dark';
    onThemeChange?.(newEffectiveTheme);
  };

  const getDisplayLabel = (theme: ThemeMode): React.ReactNode => {
    switch (theme) {
      case 'system': return <HiOutlineComputerDesktop size={14} />;
      case 'light': return <MdOutlineLightMode size={14} />;
      case 'dark': return <MdOutlineDarkMode size={14} />;
    }
  };

  const getCircleClasses = (theme: ThemeMode) => {
    const isActive = activeTheme === theme;
    const isHovered = hoveredTheme === theme;
    const effectiveTheme = getEffectiveTheme();
    const isDark = effectiveTheme === 'dark';

    let classes = 'theme-switch-circle';

    if (isActive) classes += ' active';
    if (isHovered) classes += ' hovered';

    // Add theme-specific classes for CSS styling
    classes += isDark ? ' dark-theme' : ' light-theme';

    return classes;
  };

  const getMarginLeft = (theme: ThemeMode) => {
    if (theme === 'system') return '0.5px';
    if (theme === 'light') return '1px';
    if (theme === 'dark') return '0.5px';
    return '0';
  };

  return (
    <div className="theme-switch">
      <div
        className={getCircleClasses('system')}
        style={{ marginLeft: getMarginLeft('system') }}
        onClick={() => handleThemeClick('system')}
        onMouseEnter={() => setHoveredTheme('system')}
        onMouseLeave={() => setHoveredTheme(null)}
      >
        {getDisplayLabel('system')}
      </div>
      <div
        className={getCircleClasses('light')}
        style={{ marginLeft: getMarginLeft('light') }}
        onClick={() => handleThemeClick('light')}
        onMouseEnter={() => setHoveredTheme('light')}
        onMouseLeave={() => setHoveredTheme(null)}
      >
        {getDisplayLabel('light')}
      </div>
      <div
        className={getCircleClasses('dark')}
        style={{ marginLeft: getMarginLeft('dark') }}
        onClick={() => handleThemeClick('dark')}
        onMouseEnter={() => setHoveredTheme('dark')}
        onMouseLeave={() => setHoveredTheme(null)}
      >
        {getDisplayLabel('dark')}
      </div>
    </div>
  );
}
