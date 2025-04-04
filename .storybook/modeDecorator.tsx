import React, { useEffect } from "react";
import { Sun, Moon } from "lucide-react";

export const ModeDecorator = ({ children, context }) => {
  const theme = context?.globals?.theme || "light"; // Ensure `context` is not undefined
  const isDarkMode = theme === "dark";

  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDarkMode);
  }, [isDarkMode]);

  return (
    <div className={isDarkMode ? "dark" : ""}>
      {/* Dark Mode Toggle in Top-Right of Page */}
      <div className="fixed top-4 right-4 z-50">
        <button
          onClick={() =>
            context.globals.update("theme", isDarkMode ? "light" : "dark")
          }
          className={`p-2 rounded-full shadow border transition ${
            isDarkMode ? "bg-gray-800 text-white" : "bg-white text-black"
          }`}
        >
          {isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
        </button>
      </div>

      {/* Render Story inside */}
      {children}
    </div>
  );
};
