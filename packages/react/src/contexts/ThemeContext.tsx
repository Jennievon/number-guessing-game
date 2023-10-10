import { createContext, useContext, useState, useEffect } from "react";
import { ThemeContextType, ThemeProviderProps } from "../libs/types";

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function useTheme(): ThemeContextType {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}

export function ThemeProvider({ children }: ThemeProviderProps): JSX.Element {
  const [theme, setTheme] = useState<string>("");

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      setTheme(savedTheme);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  const otherTheme = theme === "light" ? "dark" : "light";

  return (
    <ThemeContext.Provider value={{ theme, otherTheme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}
