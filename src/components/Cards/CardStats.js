import React from "react";
import PropTypes from "prop-types";
import {
  FaUserCheck,
  FaUserSlash,
  FaClock,
  FaExclamationTriangle,
  FaChartPie,
  FaUsers,
  FaPercentage,
} from "react-icons/fa";
import { FaChartBar } from "react-icons/fa6";

// خريطة لربط اسم الأيقونة بالمكون الفعلي
const iconMap = {
  FaUserCheck,
  FaUserSlash,
  FaClock,
  FaExclamationTriangle,
  FaChartPie,
  FaUsers,
  FaPercentage,
  FaChartBar,
  // دعم الأسماء القديمة
  "far fa-chart-bar": FaChartBar,
  "fas fa-chart-pie": FaChartPie,
  "fas fa-users": FaUsers,
  "fas fa-percent": FaPercentage,
};

// 1. خريطة للألوان (الحل لمشكلة Tailwind Purge)
// نكتب هنا أسماء الكلاسات الكاملة
const colorMap = {
  red: "bg-red-500",
  orange: "bg-orange-500",
  pink: "bg-pink-500",
  emerald: "bg-emerald-500",
  green: "bg-green-500",
  blue: "bg-blue-500",
  sky: "bg-sky-500",
  yellow: "bg-yellow-500",
  // دعم القيم القديمة التي كانت تحتوي على "bg-"
  "bg-red-500": "bg-red-500",
  "bg-orange-500": "bg-orange-500",
  "bg-pink-500": "bg-pink-500",
  "bg-sky-500": "bg-sky-500",
};

export default function CardStats({
  statSubtitle,
  statTitle,
  statArrow,
  statPercent,
  statPercentColor,
  statDescripiron,
  statIconName, // Prop قديمة
  statIconColor, // Prop قديمة
  icon, // Prop جديدة
  color, // Prop جديدة
}) {
  // 2. دمج الـ props بذكاء
  const finalIconName = icon || statIconName;
  const finalColorName = color || statIconColor;

  // اختيار المكون والكلاس من الخرائط
  const IconComponent = iconMap[finalIconName] || FaChartPie;
  const iconColorClass = colorMap[finalColorName] || "bg-gray-500"; // لون افتراضي آمن

  return (
    <div className="relative flex flex-col min-w-0 break-words bg-white rounded mb-6 xl:mb-0 shadow-lg">
      <div className="flex-auto p-4">
        <div className="flex flex-wrap">
          <div className="relative w-full pr-4 max-w-full flex-grow flex-1">
            <h5 className="text-slate-400 uppercase font-bold text-xs">
              {statSubtitle}
            </h5>
            <span className="font-semibold text-xl text-slate-700">
              {statTitle}
            </span>
          </div>
          <div className="relative w-auto pl-4 flex-initial">
            <div
              className={`text-white p-3 text-center inline-flex items-center justify-center w-12 h-12 shadow-lg rounded-full ${iconColorClass}`}
            >
              <IconComponent size={20} />
            </div>
          </div>
        </div>
        
        {statPercent && (
          <p className="text-sm text-slate-400 mt-4">
            <span className={statPercentColor + " mr-2"}>
              <i
                className={
                  statArrow === "up"
                    ? "fas fa-arrow-up"
                    : statArrow === "down"
                    ? "fas fa-arrow-down"
                    : ""
                }
              ></i>{" "}
              {statPercent}%
            </span>
            <span className="whitespace-nowrap">{statDescripiron}</span>
          </p>
        )}
      </div>
    </div>
  );
}

// --- القيم الافتراضية والتحقق من الخصائص ---
CardStats.defaultProps = {
  statSubtitle: "Metric",
  statTitle: "0",
};

CardStats.propTypes = {
  statSubtitle: PropTypes.string,
  statTitle: PropTypes.string,
  statArrow: PropTypes.oneOf(["up", "down"]),
  statPercent: PropTypes.string,
  statPercentColor: PropTypes.string,
  statDescripiron: PropTypes.string,
  statIconName: PropTypes.string,
  statIconColor: PropTypes.string,
  icon: PropTypes.string,
  color: PropTypes.string,
};
