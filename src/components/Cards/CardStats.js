// src/components/Cards/CardStats.js

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
  FaMapMarkedAlt,
  FaWifi,
  FaArrowUp,
  FaArrowDown,
} from "react-icons/fa";
import { FaChartBar } from "react-icons/fa6";

const iconMap = {
  FaUserCheck,
  FaUserSlash,
  FaClock,
  FaExclamationTriangle,
  FaChartPie,
  FaUsers,
  FaPercentage,
  FaMapMarkedAlt,
  FaWifi,
  FaChartBar,
  "far fa-chart-bar": FaChartBar,
  "fas fa-chart-pie": FaChartPie,
  "fas fa-users": FaUsers,
  "fas fa-percent": FaPercentage,
  "fas fa-user-check": FaUserCheck,
  "fas fa-user-slash": FaUserSlash,
  "fas fa-clock": FaClock,
  "fas fa-exclamation-triangle": FaExclamationTriangle,
};

const colorMap = {
  red: "bg-red-500",
  orange: "bg-orange-500",
  pink: "bg-pink-500",
  emerald: "bg-emerald-500",
  green: "bg-green-500",
  blue: "bg-blue-500",
  sky: "bg-sky-500",
  yellow: "bg-yellow-500",
  "bg-red-500": "bg-red-500",
  "bg-orange-500": "bg-orange-500",
  "bg-pink-500": "bg-pink-500",
  "bg-sky-500": "bg-sky-500",
  "bg-yellow-500": "bg-yellow-500",
  "bg-emerald-500": "bg-emerald-500",
};

export default function CardStats({
  statSubtitle,
  statTitle,
  statArrow,
  statPercent,
  statPercentColor,
  statDescripiron,
  statIconName,
  statIconColor,
  icon,
  color,
}) {
  let IconComponent;
  const finalIconProp = icon || statIconName;

  if (React.isValidElement(finalIconProp)) {
    IconComponent = () => React.cloneElement(finalIconProp, { size: 20 });
  } else {
    const FoundIcon = iconMap[finalIconProp] || FaChartPie;
    IconComponent = () => <FoundIcon size={20} />;
  }

  const finalColorName = color || statIconColor;
  const iconColorClass = colorMap[finalColorName] || "bg-gray-500";

  return (
    // ✅ إضافة كلاسات الوضع الليلي للبطاقة الرئيسية
    <div className="relative flex flex-col min-w-0 break-words bg-white dark:bg-slate-800 rounded-lg mb-6 xl:mb-0 shadow-lg">
      <div className="flex-auto p-4">
        <div className="flex flex-wrap">
          <div className="relative w-full pr-4 max-w-full flex-grow flex-1">
            {/* ✅ تعديل ألوان النصوص للوضع الليلي */}
            <h5 className="text-slate-400 dark:text-slate-500 uppercase font-bold text-xs">
              {statSubtitle}
            </h5>
            <span className="font-semibold text-xl text-slate-700 dark:text-white">
              {statTitle}
            </span>
          </div>
          <div className="relative w-auto pl-4 flex-initial">
            <div
              className={`text-white p-3 text-center inline-flex items-center justify-center w-12 h-12 shadow-lg rounded-full ${iconColorClass}`}
            >
              <IconComponent />
            </div>
          </div>
        </div>
        
        {statPercent && (
          // ✅ تعديل لون النص السفلي للوضع الليلي
          <p className="text-sm text-slate-400 dark:text-slate-500 mt-4">
            <span className={statPercentColor + " mr-2"}>
              {statArrow === "up" ? <FaArrowUp className="inline-block" /> : <FaArrowDown className="inline-block" />}
              {" "}{statPercent}%
            </span>
            <span className="whitespace-nowrap">{statDescripiron}</span>
          </p>
        )}
      </div>
    </div>
  );
}

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
  icon: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  color: PropTypes.string,
};
