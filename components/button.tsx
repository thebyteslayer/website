'use client';

import type React from "react";
import { useState } from "react";

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

  const isHighlight = effects.includes("highlight");
  const isShrink = effects.includes("shrink");

  const classNames = [
    "button",
    color === "inverted" ? "button-inverted" : "button-monochrome",
    isHighlight ? "button-highlight" : "",
    isShrink ? "button-shrink" : "",
  ].filter(Boolean).join(" ");

  return (
    <button
      className={classNames}
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {children}
    </button>
  );
};

export default Button;
