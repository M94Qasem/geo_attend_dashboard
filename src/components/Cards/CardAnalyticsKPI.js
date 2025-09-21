import React from "react";
import PropTypes from "prop-types";

export default function CardAnalyticsKPI({ title, value, icon, iconColor }) {
  return (
    <div className="relative flex flex-col min-w-0 break-words bg-white rounded-lg mb-6 xl:mb-0 shadow-lg p-6">
      <div className="flex items-center">
        <div className={`text-white p-3 text-center inline-flex items-center justify-center w-12 h-12 shadow-lg rounded-full ${iconColor}`}>
          <i className={icon}></i>
        </div>
        <div className="ml-4">
          <h5 className="text-slate-400 uppercase font-bold text-xs">{title}</h5>
          <span className="font-bold text-2xl text-slate-700">{value}</span>
        </div>
      </div>
    </div>
  );
}

// Set default props for the component
CardAnalyticsKPI.defaultProps = {
  title: "Metric Title",
  value: "0",
  icon: "fas fa-chart-bar",
  iconColor: "bg-slate-500",
};

// Define prop types for type checking
CardAnalyticsKPI.propTypes = {
  title: PropTypes.string,
  value: PropTypes.string,
  icon: PropTypes.string,
  iconColor: PropTypes.string,
};
