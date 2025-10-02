// src/components/Cards/CardAnalyticsKPI.js

import React from "react";
import PropTypes from "prop-types";
import { FaArrowUp, FaArrowDown } from "react-icons/fa";

export default function CardAnalyticsKPI({ title, value, icon, iconColor, change, changeType }) {
  const isPositive = changeType === 'positive';

  return (
    // ✅ إضافة كلاسات الوضع الليلي هنا
    <div className="relative flex flex-col min-w-0 break-words bg-white dark:bg-slate-800 rounded-xl mb-6 xl:mb-0 shadow-lg p-4">
      <div className="flex-auto">
        <div className="flex flex-wrap items-center">
          <div className="relative w-auto pr-4 flex-initial">
            <div className={`text-white p-3 text-center inline-flex items-center justify-center w-14 h-14 shadow-lg rounded-full ${iconColor}`}>
              <i className={`${icon} text-xl`}></i>
            </div>
          </div>
          <div className="relative w-full pr-4 max-w-full flex-grow flex-1">
            {/* ✅ تعديل ألوان النصوص للوضع الليلي */}
            <h5 className="text-slate-400 dark:text-slate-500 uppercase font-bold text-xs">{title}</h5>
            <span className="font-semibold text-2xl text-slate-700 dark:text-white">{value}</span>
          </div>
        </div>
        <p className="text-sm text-slate-400 dark:text-slate-500 mt-4">
          <span className={`mr-2 ${isPositive ? 'text-emerald-500' : 'text-red-500'}`}>
            {isPositive ? <FaArrowUp className="inline-block" /> : <FaArrowDown className="inline-block" />} {change}
          </span>
          <span className="whitespace-nowrap">Since last month</span>
        </p>
      </div>
    </div>
  );
}

CardAnalyticsKPI.propTypes = {
  title: PropTypes.string,
  value: PropTypes.string,
  icon: PropTypes.string,
  iconColor: PropTypes.string,
  change: PropTypes.string,
  changeType: PropTypes.oneOf(['positive', 'negative']),
};
