import React from "react";
import { FaExclamationTriangle, FaWifi, FaUserShield } from "react-icons/fa";
import { Link } from "react-router-dom";

// 1. دالة مساعدة لاختيار الأيقونة واللون المناسبين
const getFlagDetails = (type) => {
  switch (type) {
    case "Override":
      return {
        icon: FaExclamationTriangle,
        color: "yellow",
        bgColor: "bg-yellow-100",
        textColor: "text-yellow-600",
      };
    case "Network Failure":
      return {
        icon: FaWifi,
        color: "red",
        bgColor: "bg-red-100",
        textColor: "text-red-600",
      };
    case "Device Mismatch":
      return {
        icon: FaUserShield,
        color: "purple",
        bgColor: "bg-purple-100",
        textColor: "text-purple-600",
      };
    default:
      return {
        icon: FaExclamationTriangle,
        color: "slate",
        bgColor: "bg-slate-100",
        textColor: "text-slate-600",
      };
  }
};

export default function CardRecentFlags() {
  // 2. بيانات وهمية للأنشطة المشبوهة
  const flags = [
    { id: 1, type: "Override", message: "Manual override by Manager for Ali Ahmed.", time: "09:10 AM" },
    { id: 2, type: "Network Failure", message: "Network verification failed for Sara Omar.", time: "09:30 AM" },
    { id: 3, type: "Device Mismatch", message: "Device mismatch detected for Karim Said.", time: "10:05 AM" },
  ];

  return (
    // 3. تصميم البطاقة بشكل حديث
    <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded-lg">
      <div className="rounded-t mb-0 px-4 py-3 border-0">
        <div className="flex flex-wrap items-center">
          <div className="relative w-full px-4 max-w-full flex-grow flex-1">
            <h3 className="font-semibold text-base text-slate-700">
              Recent Flags
            </h3>
          </div>
        </div>
      </div>
      <div className="p-4">
        {/* 4. استخدام قائمة Timeline بدلاً من جدول */}
        <ul className="space-y-4">
          {flags.map((flag) => {
            const { icon: Icon, bgColor, textColor } = getFlagDetails(flag.type);
            return (
              <li key={flag.id} className="flex items-start space-x-4">
                <span className={`p-3 rounded-full ${bgColor} ${textColor}`}>
                  <Icon />
                </span>
                <div className="flex-grow">
                  <p className="text-sm font-medium text-slate-800">{flag.message}</p>
                  <p className="text-xs text-slate-500">{flag.time}</p>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
      {/* 5. إضافة زر "View All" في الأسفل */}
      <div className="rounded-b px-4 py-3 border-t text-center">
        <Link
          to="/admin/attendance-log" // يوجه إلى صفحة السجلات الكاملة
          className="text-indigo-500 hover:text-indigo-700 text-sm font-semibold"
        >
          View All Logs
        </Link>
      </div>
    </div>
  );
}
