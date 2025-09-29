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
} from "react-icons/fa";
import { FaChartBar } from "react-icons/fa6";

// 1. خريطة لربط الأسماء النصية (strings) بمكونات الأيقونات
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
  // دعم الأسماء القديمة من Font Awesome
  "far fa-chart-bar": FaChartBar,
  "fas fa-chart-pie": FaChartPie,
  "fas fa-users": FaUsers,
  "fas fa-percent": FaPercentage,
};

// 2. خريطة للألوان لضمان عدم حذفها من قبل Tailwind CSS
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
  statIconName, // Prop قديمة (string)
  statIconColor, // Prop قديمة (string)
  icon, // Prop جديدة (يمكن أن تكون string أو React element)
  color, // Prop جديدة (string)
}) {
  // 3. المنطق الذكي لتحديد الأيقونة
  let IconComponent;
  const finalIconProp = icon || statIconName;

  if (React.isValidElement(finalIconProp)) {
    // الحالة 1: إذا كانت الـ prop هي عنصر React بالفعل (مثل <FaUsers />)
    IconComponent = () => React.cloneElement(finalIconProp, { size: 20 });
  } else {
    // الحالة 2: إذا كانت الـ prop هي نص (string)
    const FoundIcon = iconMap[finalIconProp] || FaChartPie;
    IconComponent = () => <FoundIcon size={20} />;
  }

  // 4. تحديد اللون بنفس الطريقة الذكية
  const finalColorName = color || statIconColor;
  const iconColorClass = colorMap[finalColorName] || "bg-gray-500";

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
  // جعل prop الأيقونة تقبل نصًا أو عنصرًا
  icon: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  color: PropTypes.string,
};
