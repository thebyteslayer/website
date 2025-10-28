<template>
  <button
    :style="buttonStyles"
    @click="handleClick"
    @mouseenter="isHovered = true"
    @mouseleave="isHovered = false"
  >
    <slot />
  </button>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";

type ColorOption = "monochrome" | "inverted";
type SizeOption = "medium";
type EffectOption = "highlight" | "shrink";

interface Props {
  onClick?: () => void;
  color?: ColorOption;
  size?: SizeOption;
  effects?: EffectOption[];
}

const props = withDefaults(defineProps<Props>(), {
  color: "monochrome",
  size: "medium",
  effects: () => [],
});

const isHovered = ref(false);

const isHighlight = computed(() => props.effects.includes("highlight"));
const isShrink = computed(() => props.effects.includes("shrink"));

const buttonStyles = computed(() => {
  const baseStyles = {
    borderRadius: "4px",
    border: "1px solid var(--border)",
    cursor: "pointer",
    height: "24px",
    width: "200px",
    fontSize: isShrink.value && isHovered.value ? "10.45px" : "11px",
    transform: isShrink.value && isHovered.value ? "scale(0.95)" : "none",
  };

  if (props.color === "monochrome") {
    if (isHighlight.value && isHovered.value) {
      return {
        ...baseStyles,
        backgroundColor: "var(--background)",
        color: "var(--foreground)",
      };
    }
    return {
      ...baseStyles,
      backgroundColor: "var(--foreground)",
      color: "var(--background)",
    };
  }

  if (props.color === "inverted") {
    if (isHighlight.value && isHovered.value) {
      return {
        ...baseStyles,
        backgroundColor: "var(--foreground)",
        color: "var(--background)",
      };
    }
    return {
      ...baseStyles,
      backgroundColor: "var(--background)",
      color: "var(--foreground)",
    };
  }

  return baseStyles;
});

const handleClick = () => {
  if (props.onClick) {
    props.onClick();
  }
};
</script>
