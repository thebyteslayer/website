'use client';

import type React from "react";
import { useState } from "react";
import { useTheme } from "./theme";

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
  const [isHovered, setIsHovered] = useState(false);
  const { theme } = useTheme();

  const effectiveTheme =
    theme === "system" &&
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : theme === "dark"
        ? "dark"
        : "light";

  const baseStyles = {
    borderRadius: "4px",
    border: `1px solid ${effectiveTheme === "light" ? "#e6e6e6" : "#1f1f1f"}`,
    cursor: "pointer",
  };

  const isInverted = color === "inverted";
  const baseBackground =
    effectiveTheme === "light"
      ? isInverted
        ? "#ffffff"
        : "#000000"
      : isInverted
        ? "#000000"
        : "#ffffff";
  const baseColor =
    effectiveTheme === "light"
      ? isInverted
        ? "#000000"
        : "#ffffff"
      : isInverted
        ? "#ffffff"
        : "#000000";

  const isHighlight = effects.includes("highlight");
  const isShrink = effects.includes("shrink");

  const dynamicStyles = {
    height: "24px",
    width: "200px",
    backgroundColor: isHighlight && isHovered ? baseColor : baseBackground,
    fontSize: isShrink && isHovered ? "10.45px" : "11px",
    color: isHighlight && isHovered ? baseBackground : baseColor,
    transform: isShrink && isHovered ? "scale(0.95)" : "scale(1)",
  };

  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{ ...baseStyles, ...dynamicStyles }}
    >
      {children}
    </button>
  );
};

export default Button;
