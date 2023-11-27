import { createContext, useState } from "react";

export const DarkModeContext = createContext();

export function DarkModeProvider({ children }) {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const handleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    updateDarkMode(!isDarkMode);
  }

  return <DarkModeContext.Provider value={{ isDarkMode, handleDarkMode }}>
    {children}
  </DarkModeContext.Provider>
}

function updateDarkMode(isDarkMode) {
  if(isDarkMode) {
    document.documentElement.classList.add('darkMode');
  } else {
    document.documentElement.classList.remove('darkMode');
  }
}