import { useEffect, useState } from "react";
import { MdOutlineLightMode } from "react-icons/md";
import { CiDark } from "react-icons/ci";
const ThemeToggle = () => {
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("theme") === "dark" || 
      (!localStorage.getItem("theme") && window.matchMedia("(prefers-color-scheme: dark)").matches);
  });

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  return (
    <button
      onClick={() => setDarkMode(!darkMode)}
      className="dark:text-gray-50 font-bold"
    >
      {darkMode ? <MdOutlineLightMode  size={25}/>: <CiDark  size={25}/>}
    </button>
  );
};

export default ThemeToggle;