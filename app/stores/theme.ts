import { defineStore } from "pinia";
import { ref } from "vue";

export type ThemeMode = "light" | "dark";

const STORAGE_KEY = "theme";

function readSystemPreference() {
  return window.matchMedia("(prefers-color-scheme: dark)").matches;
}

export const useThemeStore = defineStore("theme", () => {
  const mode = ref<ThemeMode | null>(null);
  const isDark = ref(false);

  let systemListener: ((event: MediaQueryListEvent) => void) | null = null;

  function apply(dark: boolean) {
    isDark.value = dark;
    document.documentElement.classList.toggle("dark", dark);
  }

  function resolveDark() {
    if (mode.value) return mode.value === "dark";
    return readSystemPreference();
  }

  function onSystemChange(event: MediaQueryListEvent) {
    if (!localStorage.getItem(STORAGE_KEY)) {
      apply(event.matches);
    }
  }

  function init() {
    if (!import.meta.client) return;

    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved === "light" || saved === "dark") {
      mode.value = saved;
    }

    apply(resolveDark());

    const media = window.matchMedia("(prefers-color-scheme: dark)");
    systemListener = onSystemChange;
    media.addEventListener("change", systemListener);
  }

  function dispose() {
    if (!import.meta.client || !systemListener) return;
    window
      .matchMedia("(prefers-color-scheme: dark)")
      .removeEventListener("change", systemListener);
    systemListener = null;
  }

  function setMode(next: ThemeMode) {
    mode.value = next;
    localStorage.setItem(STORAGE_KEY, next);
    apply(next === "dark");
  }

  function toggle() {
    setMode(isDark.value ? "light" : "dark");
  }

  return {
    mode,
    isDark,
    init,
    dispose,
    setMode,
    toggle,
  };
});
