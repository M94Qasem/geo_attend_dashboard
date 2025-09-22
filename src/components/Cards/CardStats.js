import React from "react";
import PropTypes from "prop-types";
// 1. استيراد كل الأيقونات التي نحتاجها
import { FaUserCheck, FaUserSlash, FaClock, FaExclamationTriangle, FaChartPie } from "react-icons/fa";

// 2. تحديث الخريطة لتشمل كل الأيقونات
const iconMap = {
  "FaUserCheck": FaUserCheck,
  "FaUserSlash": FaUserSlash,
  "FaClock": FaClock,
  "FaExclamationTriangle": FaExclamationTriangle,
  "FaChartPie": FaChartPie, // أيقونة افتراضية
};

export default function CardStats({
  statSubtitle,
  statTitle,
  statArrow,
  statPercent,
  statPercentColor,
  statDescripiron,
  icon, // تم تغيير الاسم من statIconName إلى icon
  color, // تم تغيير الاسم من statIconColor إلى color
}) {
  const IconComponent = iconMap[icon] || FaChartPie;
  
  // 3. بناء كلاس اللون ديناميكياً
  const iconColorClass = `bg-${color}-500`;

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
              className={
                `text-white p-3 text-center inline-flex items-center justify-center w-12 h-12 shadow-lg rounded-full ${iconColorClass}`
              }
            >
              <IconComponent />
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
  icon: "FaChartPie",
  color: "slate",
};

CardStats.propTypes = {
  statSubtitle: PropTypes.string,
  statTitle: PropTypes.string,
  statArrow: PropTypes.oneOf(["up", "down"]),
  statPercent: PropTypes.string,
  statPercentColor: PropTypes.string,
  statDescripiron: PropTypes.string,
  icon: PropTypes.string,
  color: PropTypes.string,
};
