"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
  ReactNode,
} from "react";

interface ThemeContextType {
  isDark: boolean;
  toggle: () => void;
  fontSize: number;
  increaseFontSize: () => void;
  decreaseFontSize: () => void;
  resetFontSize: () => void;
}

const ThemeContext = createContext<ThemeContextType>({
  isDark: false,
  toggle: () => {},
  fontSize: 16,
  increaseFontSize: () => {},
  decreaseFontSize: () => {},
  resetFontSize: () => {},
});

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [isDark, setIsDark] = useState(false);
  const [fontSize, setFontSize] = useState(16);

  useEffect(() => {
    const savedTheme = localStorage.getItem("cv-theme");
    const savedFont = localStorage.getItem("cv-font");

    if (savedTheme === "dark") {
      setIsDark(true);
      document.documentElement.classList.add("dark");
    }
    if (savedFont) {
      const size = parseInt(savedFont, 10);
      setFontSize(size);
      document.documentElement.style.fontSize = `${size}px`;
    }
  }, []);

  const toggle = useCallback(() => {
    setIsDark((prev) => {
      const next = !prev;
      if (next) {
        document.documentElement.classList.add("dark");
        localStorage.setItem("cv-theme", "dark");
      } else {
        document.documentElement.classList.remove("dark");
        localStorage.setItem("cv-theme", "light");
      }
      return next;
    });
  }, []);

  const applySize = (size: number) => {
    document.documentElement.style.fontSize = `${size}px`;
    localStorage.setItem("cv-font", String(size));
  };

  const increaseFontSize = useCallback(() => {
    setFontSize((prev) => {
      const next = Math.min(prev + 2, 22);
      applySize(next);
      return next;
    });
  }, []);

  const decreaseFontSize = useCallback(() => {
    setFontSize((prev) => {
      const next = Math.max(prev - 2, 14);
      applySize(next);
      return next;
    });
  }, []);

  const resetFontSize = useCallback(() => {
    setFontSize(16);
    document.documentElement.style.fontSize = "16px";
    localStorage.removeItem("cv-font");
  }, []);

  return (
    <ThemeContext.Provider
      value={{
        isDark,
        toggle,
        fontSize,
        increaseFontSize,
        decreaseFontSize,
        resetFontSize,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => useContext(ThemeContext);
