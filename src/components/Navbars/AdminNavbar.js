import React, { useState, useEffect } from "react";
import { FaSearch, FaMoon, FaSun } from "react-icons/fa";

import UserDropdown from "components/Dropdowns/UserDropdown.js";
import NotificationDropdown from "components/Dropdowns/NotificationDropdown.js";

export default function AdminNavbar() {
  const [darkMode, setDarkMode] = useState(false);
  // 1. استخدام الحالة التي اقترحتها أنت لمراقبة التمرير
  const [scrolled, setScrolled] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    if (!darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

  // 2. استخدام useEffect الذي اقترحته أنت
  useEffect(() => {
    const handleScroll = () => {
      // تغيير الحالة إذا كان التمرير أكبر من 10 بكسل
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []); // يعمل مرة واحدة فقط

  return (
    // 3. تطبيق الكلاسات الديناميكية التي اقترحتها أنت
    <nav
      className={`fixed top-0 left-0 right-0 z-20 transition-colors duration-300 md:ml-64 ${
        scrolled ? "bg-sky-600 shadow-md" : "bg-transparent"
      }`}
    >
      <div className="flex items-center justify-between px-6 py-3">
        
        <h1 className="text-white text-lg font-semibold tracking-wide">
          Dashboard
        </h1>

        <div className="hidden md:flex flex-1 justify-center px-6">
          <div className="relative w-full max-w-md">
            <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search here..."
              className="w-full pl-10 pr-4 py-2 rounded-lg text-sm text-slate-700 placeholder-slate-400 shadow focus:outline-none focus:ring-2 focus:ring-sky-400"
            />
          </div>
        </div>

        <div className="flex items-center gap-6">
          <button
            onClick={toggleDarkMode}
            className="text-white hover:text-slate-200 focus:outline-none"
            title="Toggle Dark Mode"
          >
            {darkMode ? <FaSun size={20} /> : <FaMoon size={20} />}
          </button>

          <NotificationDropdown />
          <UserDropdown />
        </div>
      </div>
    </nav>
  );
}
