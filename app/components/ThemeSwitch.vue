<template>
  <div :style="_containerStyle">
    <div
      v-for="theme in _themes"
      :key="theme"
      :style="_circleStyle(theme, _isActiveTheme(theme))"
      @click="_handleThemeClick(theme)"
      @mouseenter="hoveredTheme = theme"
      @mouseleave="hoveredTheme = null"
    >
      <component :is="_getDisplayLabel(theme)" :size="14" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { Monitor, Moon, Sun } from "lucide-vue-next";
import { ref, computed } from "vue";

type ThemeMode = "system" | "light" | "dark";

const _themes: ThemeMode[] = ["system", "light", "dark"];
const hoveredTheme = ref<ThemeMode | null>(null);

const colorMode = useColorMode();

const _activeTheme = computed(() => colorMode.preference);

const _isActiveTheme = (theme: ThemeMode) => {
  return _activeTheme.value === theme;
};

const _handleThemeClick = (theme: ThemeMode) => {
  colorMode.preference = theme;
};

const _getDisplayLabel = (theme: ThemeMode) => {
  switch (theme) {
    case "system":
      return Monitor;
    case "light":
      return Sun;
    case "dark":
      return Moon;
  }
};

const _circleStyle = (theme: ThemeMode, isActive: boolean) => {
  let marginLeft = "0";
  if (theme === "system") marginLeft = "-1.5px";
  if (theme === "light") marginLeft = "0px";
  if (theme === "dark") marginLeft = "0.5px";

  const isHovered = hoveredTheme.value === theme;

  let textColor: string;
  if (isActive) {
    textColor = "var(--foreground)";
  } else if (isHovered) {
    textColor = "var(--foreground)";
  } else {
    textColor = "#8f8f8f";
  }

  let borderRadius = "4px";
  if (theme === "system") borderRadius = "4px 0px 0px 4px";
  if (theme === "light") borderRadius = "0px";
  if (theme === "dark") borderRadius = "0px 4px 4px 0px";

  return {
    width: "calc(24px - 2px)",
    height: "calc(24px - 2px)",
    borderRadius,
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

const _containerStyle = {
  display: "inline-flex",
  alignItems: "center",
  background: "transparent",
  border: "1px solid var(--border)",
  borderRadius: "4px",
  padding: "0px",
  width: "calc(72px - 2.5px)",
  height: "calc(24px - 2px)",
  position: "relative",
  boxSizing: "content-box",
};
</script>
