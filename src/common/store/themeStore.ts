import { create } from "zustand";

type ThemeMode = "light" | "dark";

type ThemeState = {
  mode: ThemeMode;
  toggleMode: () => void;
};

export const useThemeStore = create<ThemeState>((set) => ({
  mode: "light",
  toggleMode: () =>
    set((state) => {
      const nextMode = state.mode === "light" ? "dark" : "light";
      document.documentElement.classList.toggle("dark", nextMode === "dark");
      return { mode: nextMode };
    }),
}));
