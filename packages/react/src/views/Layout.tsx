import React from "react";
import { useTheme } from "../contexts/ThemeContext";
import ThemeToggle from "../components/ThemeToggle";
import Header from "../components/Header";

function Layout({ children }: { children: React.ReactNode }) {
  const { theme } = useTheme();
  const isDarkMode = theme === "dark";

  return (
    <div
      className={`min-h-screen bg-${isDarkMode ? "gray-900" : "white"} text-${
        isDarkMode ? "white" : "gray-900"
      } transition-colors duration-500`}
    >
      <Header />

      <main className="flex flex-col items-center h-screen p-4">
        <div
          className="rounded-lg overflow-hidden shadow-md w-[470px] max-w-full m-4 bg-dark
      min-h-[430px] p-4"
        >
          {children}
        </div>
      </main>

      <div className="fixed bottom-4 right-4">
        <ThemeToggle />
      </div>
    </div>
  );
}

export default Layout;
