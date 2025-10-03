'use client';

import * as React from "react";
import { useTheme } from 'next-themes';

type ColorOption = "monochrome" | "inverted";
type SizeOption = "medium";
type EffectOption = "highlight" | "shrink";

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  color?: ColorOption;
  size?: SizeOption;
  effects?: EffectOption[];
}

const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  color = "monochrome",
  size = "medium",
  effects = [],
}) => {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);
  const [isHovered, setIsHovered] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  const isHighlight = effects.includes("highlight");
  const isShrink = effects.includes("shrink");

  const getButtonStyles = () => {
    const baseStyles = {
      borderRadius: '4px',
      border: '1px solid var(--border)',
      cursor: 'pointer',
      height: '24px',
      width: '200px',
      fontSize: isShrink && isHovered ? '10.45px' : '11px',
      transform: isShrink && isHovered ? 'scale(0.95)' : 'none',
    };

    if (color === "monochrome") {
      if (isHighlight && isHovered) {
        return {
          ...baseStyles,
          backgroundColor: 'var(--background)',
          color: 'var(--foreground)',
        };
      }
      return {
        ...baseStyles,
        backgroundColor: 'var(--foreground)',
        color: 'var(--background)',
      };
    }

    if (color === "inverted") {
      if (isHighlight && isHovered) {
        return {
          ...baseStyles,
          backgroundColor: 'var(--foreground)',
          color: 'var(--background)',
        };
      }
      return {
        ...baseStyles,
        backgroundColor: 'var(--background)',
        color: 'var(--foreground)',
      };
    }

    return baseStyles;
  };

  return (
    <button
      style={getButtonStyles()}
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {children}
    </button>
  );
};

export default Button;
