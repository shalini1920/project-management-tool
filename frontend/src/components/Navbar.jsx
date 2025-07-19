import { useEffect, useState } from "react";

function Navbar() {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  return (
    <nav className="flex items-center justify-between p-4 bg-white dark:bg-gray-900 shadow-md">
      <h1 className="text-2xl font-bold text-indigo-600 dark:text-indigo-300">Project Tool</h1>
      <button
        onClick={() => setDarkMode(!darkMode)}
        className="bg-indigo-500 hover:bg-indigo-600 text-white px-4 py-2 rounded-md transition"
      >
        {darkMode ? "☀ Light" : "🌙 Dark"}
      </button>
    </nav>
  );
}

export default Navbar;