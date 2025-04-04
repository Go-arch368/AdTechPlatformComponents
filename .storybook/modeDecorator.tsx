import React, { useState, useEffect } from "react";
import { Sun, Moon } from "lucide-react";

export const ModeDecorator = (Story: any) => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const savedMode = localStorage.getItem('storybook-dark-mode');
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const initialMode = savedMode ? savedMode === 'true' : systemPrefersDark;

    setIsDarkMode(initialMode);
    document.documentElement.classList.toggle('dark', initialMode);
  }, []);

  const toggleMode = () => {
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);
    localStorage.setItem('storybook-dark-mode', String(newMode));
    document.documentElement.classList.toggle('dark', newMode);
  };

  return (
    <div className={`relative ${isDarkMode ? 'dark' : ''}`}>
      {/* Toggle Button in top-right corner */}
      <div className="fixed top-2 right-2 z-[2147483647]">
        <button
          onClick={toggleMode}
          className={`
            p-2 rounded-full
            ${isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'}
            border border-gray-300 dark:border-gray-600
            shadow hover:shadow-md transition-all
            flex items-center justify-center
          `}
          aria-label="Toggle Dark Mode"
        >
          {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
        </button>
      </div>

      <Story />
    </div>
  );
};
