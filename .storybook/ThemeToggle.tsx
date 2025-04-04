import React, { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";

const ThemeWrapper = ({ children }) => {
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    const root = document.documentElement;
    if (theme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  }, [theme]);

  return (
    <div className="w-full">
   
      <div className="fixed top-4 right-4 z-50">
        <button
          onClick={() =>
            setTheme((prev) => (prev === "light" ? "dark" : "light"))
          }
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-200 text-black dark:text-white shadow transition"
        >
          {theme === "light" ? (
            <>
              <Moon className="w-5 h-5" />
         
            </>
          ) : (
            <>
              <Sun className="w-5 h-5" />
           
            </>
          )}
        </button>
      </div>

      
      <div className="bg-white dark:bg-gray-950 text-black dark:text-white p-6 pt-24 transition-colors ">
        {children}
      </div>
    </div>
  );
};

export default ThemeWrapper;
