<template>
  <div :style="containerStyle">
    <div
      v-for="theme in themes"
      :key="theme"
      :style="circleStyle(theme, isActiveTheme(theme))"
      @click="handleThemeClick(theme)"
      @mouseenter="hoveredTheme = theme"
      @mouseleave="hoveredTheme = null"
    >
      <component :is="getDisplayLabel(theme)" :size="14" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { Monitor, Moon, Sun } from "lucide-vue-next";
import { computed, ref } from "vue";

type ThemeMode = "system" | "light" | "dark";

const themes: ThemeMode[] = ["system", "light", "dark"];
const hoveredTheme = ref<ThemeMode | null>(null);

const colorMode = useColorMode();

const isActiveTheme = (theme: ThemeMode) => {
  return colorMode.preference === theme;
};

const handleThemeClick = (theme: ThemeMode) => {
  colorMode.preference = theme;
};

const getDisplayLabel = (theme: ThemeMode) => {
  switch (theme) {
    case "system":
      return Monitor;
    case "light":
      return Sun;
    case "dark":
      return Moon;
  }
};

const circleStyle = (theme: ThemeMode, isActive: boolean) => {
  let marginLeft = "0";
  if (theme === "system") marginLeft = "-0.5px";
  if (theme === "light") marginLeft = "0px";
  if (theme === "dark") marginLeft = "-0.5px";

  const isHovered = hoveredTheme.value === theme;

  let textColor;
  if (isActive) {
    textColor = "var(--foreground)";
  } else if (isHovered) {
    textColor = "var(--foreground)";
  } else {
    textColor = "#8f8f8f";
  }

  return {
    width: "calc(24px - 2px)",
    height: "calc(24px - 2px)",
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    fontSize: "11px",
    fontWeight: "bold",
    textRendering: "optimizeLegibility",
    fontSmooth: "always",
    WebkitFontSmoothing: "antialiased",
    border: isActive ? "1px solid var(--border)" : "1px solid transparent",
    boxSizing: "content-box",
    backgroundColor: isActive ? "var(--soft-background)" : "transparent",
    color: textColor,
    marginLeft,
    zIndex: isActive ? 2 : 1,
    flexShrink: 0,
  };
};

const containerStyle = {
  display: "inline-flex",
  alignItems: "center",
  background: "transparent",
  border: "1px solid var(--border)",
  borderRadius: "calc(24px / 2)",
  padding: "0px",
  width: "calc(72px - 2.5px)",
  height: "calc(24px - 2px)",
  position: "relative",
  boxSizing: "content-box",
};
</script>
