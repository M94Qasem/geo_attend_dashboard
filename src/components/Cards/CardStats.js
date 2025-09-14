import React from "react";
import PropTypes from "prop-types";

export default function CardStats({
  statSubtitle,
  statTitle,
  statArrow,
  statPercent,
  statPercentColor,
  statDescripiron,
  statIconName,
  statIconColor,
}) {
  return (
    <>
      <div className="relative flex flex-col min-w-0 break-words bg-white rounded mb-6 xl:mb-0 shadow-lg">
        <div className="flex-auto p-4">
          <div className="flex flex-wrap">
            <div className="relative w-full pr-4 max-w-full flex-grow flex-1">
              {/* FIX: Replaced 'blueGray' with 'slate' for v3 compatibility */}
              <h5 className="text-slate-400 uppercase font-bold text-xs">
                {statSubtitle}
              </h5>
              {/* FIX: Replaced 'blueGray' with 'slate' */}
              <span className="font-semibold text-xl text-slate-700">
                {statTitle}
              </span>
            </div>
            <div className="relative w-auto pl-4 flex-initial">
              <div
                className={
                  "text-white p-3 text-center inline-flex items-center justify-center w-12 h-12 shadow-lg rounded-full " +
                  statIconColor
                }
              >
                <i className={statIconName}></i>
              </div>
            </div>
          </div>
          
          {/* This part handles the percentage below the main stat, if it exists */}
          {statPercent && (
            // FIX: Replaced 'blueGray' with 'slate'
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
    </>
  );
}

// Default values for props
CardStats.defaultProps = {
  statSubtitle: "Metric",
  statTitle: "0",
  statIconName: "fas fa-chart-pie",
  // FIX: Replaced 'blueGray' with 'slate' for the default icon color
  statIconColor: "bg-slate-500",
};

// Type checking for props
CardStats.propTypes = {
  statSubtitle: PropTypes.string,
  statTitle: PropTypes.string,
  statArrow: PropTypes.oneOf(["up", "down"]),
  statPercent: PropTypes.string,
  statPercentColor: PropTypes.string,
  statDescripiron: PropTypes.string,
  statIconName: PropTypes.string,
  statIconColor: PropTypes.string,
};
