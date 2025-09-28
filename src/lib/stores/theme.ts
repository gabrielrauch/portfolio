import { browser } from "$app/environment";
import { writable } from "svelte/store";

type Theme = "light" | "dark" | "system";

function createThemeStore() {
  const { subscribe, set } = writable<Theme>("system");

  return {
    subscribe,
    setTheme: (theme: Theme) => {
      if (browser) {
        localStorage.setItem("theme", theme);
        updateDOM(theme);
      }
      set(theme);
    },
    init: () => {
      if (browser) {
        const stored = localStorage.getItem("theme") as Theme;
        const theme = stored || "system";
        updateDOM(theme);
        set(theme);
      }
    },
  };
}

function updateDOM(theme: Theme) {
  if (!browser) return;

  let resolvedTheme: "light" | "dark";

  if (theme === "system") {
    resolvedTheme = window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
  } else {
    resolvedTheme = theme;
  }

  document.documentElement.classList.remove("light", "dark");
  document.documentElement.classList.add(resolvedTheme);
  document.documentElement.style.colorScheme = resolvedTheme;
}

export const themeStore = createThemeStore();
