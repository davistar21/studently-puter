import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
  type ReactNode,
} from "react";

type Theme = "dark" | "light" | "system";

interface ThemeProviderProps {
  children: ReactNode;
  defaultTheme?: Theme;
  storageKey?: string;
}

interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({
  children,
  defaultTheme = "system",
  storageKey = "vite-ui-theme",
}: ThemeProviderProps) {
  const isBrowser = typeof window !== "undefined";

  const [theme, setThemeState] = useState<Theme>(() => {
    if (!isBrowser) return defaultTheme;
    const stored = localStorage.getItem(storageKey) as Theme | null;
    return stored || defaultTheme;
  });

  const applyTheme = useCallback(
    (newTheme: Theme) => {
      if (!isBrowser) return;

      const root = window.document.documentElement;
      root.classList.remove("light", "dark");

      const appliedTheme =
        newTheme === "system"
          ? window.matchMedia("(prefers-color-scheme: dark)").matches
            ? "dark"
            : "light"
          : newTheme;

      root.classList.add(appliedTheme);
    },
    [isBrowser]
  );

  // Apply theme on mount and whenever it changes
  useEffect(() => {
    applyTheme(theme);
  }, [theme, applyTheme]);

  const setTheme = useCallback(
    (newTheme: Theme) => {
      if (isBrowser) {
        localStorage.setItem(storageKey, newTheme);
      }
      setThemeState(newTheme);
    },
    [isBrowser, storageKey]
  );

  const value: ThemeContextType = { theme, setTheme };

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
}

export function useTheme(): ThemeContextType {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}
