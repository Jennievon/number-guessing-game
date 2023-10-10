import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

// Define the type for the context value
interface ThemeContextType {
  theme: string;
  otherTheme: string;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

// Define the type for the ThemeProvider props
interface ThemeProviderProps {
  children: ReactNode;
}

export function useTheme(): ThemeContextType {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}

export function ThemeProvider({ children }: ThemeProviderProps): JSX.Element {
  const [theme, setTheme] = useState<string>(""); // Replace with your desired initial value

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      setTheme(savedTheme);
    } else {
      setTheme("light"); // Replace with your desired initial value
    }
  }, []);

  useEffect(() => {
    // Apply the theme-related logic here
    if (theme === "dark") {
      document.body.classList.add("dark");
    } else {
      document.body.classList.remove("dark");
    }

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
