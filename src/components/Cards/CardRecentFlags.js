// src/components/Cards/CardRecentFlags.js

import React from "react";
import { FaExclamationTriangle, FaWifi, FaUserShield } from "react-icons/fa";
import { Link } from "react-router-dom";

// ✅ تعديل الدالة لتعيد ألوانًا مختلفة بناءً على الوضع الليلي
const getFlagDetails = (type, isDarkMode) => {
  if (isDarkMode) {
    // --- ألوان الوضع الليلي ---
    switch (type) {
      case "Override":
        return {
          icon: FaExclamationTriangle,
          bgColor: "bg-yellow-900/50", // خلفية شفافة داكنة
          textColor: "text-yellow-400",
        };
      case "Network Failure":
        return {
          icon: FaWifi,
          bgColor: "bg-red-900/50",
          textColor: "text-red-400",
        };
      case "Device Mismatch":
        return {
          icon: FaUserShield,
          bgColor: "bg-purple-900/50",
          textColor: "text-purple-400",
        };
      default:
        return {
          icon: FaExclamationTriangle,
          bgColor: "bg-slate-700",
          textColor: "text-slate-400",
        };
    }
  } else {
    // --- ألوان الوضع العادي (الأصلي) ---
    switch (type) {
      case "Override":
        return {
          icon: FaExclamationTriangle,
          bgColor: "bg-yellow-100",
          textColor: "text-yellow-600",
        };
      case "Network Failure":
        return {
          icon: FaWifi,
          bgColor: "bg-red-100",
          textColor: "text-red-600",
        };
      case "Device Mismatch":
        return {
          icon: FaUserShield,
          bgColor: "bg-purple-100",
          textColor: "text-purple-600",
        };
      default:
        return {
          icon: FaExclamationTriangle,
          bgColor: "bg-slate-100",
          textColor: "text-slate-600",
        };
    }
  }
};

export default function CardRecentFlags() {
  const flags = [
    { id: 1, type: "Override", message: "Manual override by Manager for Ali Ahmed.", time: "09:10 AM" },
    { id: 2, type: "Network Failure", message: "Network verification failed for Sara Omar.", time: "09:30 AM" },
    { id: 3, type: "Device Mismatch", message: "Device mismatch detected for Karim Said.", time: "10:05 AM" },
  ];

  // ✅ التحقق من الوضع الليلي
  const isDarkMode = document.documentElement.classList.contains('dark');

  return (
    // ✅ إضافة كلاسات الوضع الليلي للبطاقة
    <div className="relative flex flex-col min-w-0 break-words bg-white dark:bg-slate-800 w-full mb-6 shadow-lg rounded-lg">
      <div className="rounded-t mb-0 px-4 py-3 border-0">
        <div className="flex flex-wrap items-center">
          <div className="relative w-full px-4 max-w-full flex-grow flex-1">
            {/* ✅ تعديل لون النص للوضع الليلي */}
            <h3 className="font-semibold text-base text-slate-700 dark:text-white">
              Recent Flags
            </h3>
          </div>
        </div>
      </div>
      <div className="p-4">
        <ul className="space-y-4">
          {flags.map((flag) => {
            // ✅ تمرير حالة الوضع الليلي للدالة المساعدة
            const { icon: Icon, bgColor, textColor } = getFlagDetails(flag.type, isDarkMode);
            return (
              <li key={flag.id} className="flex items-start space-x-4">
                <span className={`p-3 rounded-full ${bgColor} ${textColor}`}>
                  <Icon />
                </span>
                <div className="flex-grow">
                  {/* ✅ تعديل ألوان النصوص للوضع الليلي */}
                  <p className="text-sm font-medium text-slate-800 dark:text-slate-200">{flag.message}</p>
                  <p className="text-xs text-slate-500 dark:text-slate-400">{flag.time}</p>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
      {/* ✅ تعديل قسم "View All" للوضع الليلي */}
      <div className="rounded-b px-4 py-3 border-t border-slate-200 dark:border-slate-700 text-center">
        <Link
          to="/admin/attendance-log"
          className="text-indigo-500 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 text-sm font-semibold"
        >
          View All Logs
        </Link>
      </div>
    </div>
  );
}
