import React from "react";
import Chart from "chart.js";

export default function CardComplianceChart() {
  React.useEffect(() => {
    let config = {
      type: "bar",
      data: {
        labels: ["Engineering", "Sales", "HR", "Marketing", "Operations"],
        datasets: [
          {
            label: "Late",
            backgroundColor: "#ed64a6", // This is a hex code, no change needed
            borderColor: "#ed64a6",
            data: [30, 78, 56, 34, 45], // Example data
            fill: false,
            barThickness: 8,
          },
          {
            label: "Absent",
            fill: false,
            backgroundColor: "#4c51bf", // This is a hex code, no change needed
            borderColor: "#4c51bf",
            data: [27, 68, 86, 74, 10], // Example data
            barThickness: 8,
          },
        ],
      },
      options: {
        maintainAspectRatio: false,
        responsive: true,
        title: {
          display: false,
        },
        tooltips: {
          mode: "index",
          intersect: false,
        },
        hover: {
          mode: "nearest",
          intersect: true,
        },
        legend: {
          labels: {
            fontColor: "rgba(0,0,0,.4)",
          },
          align: "end",
          position: "bottom",
        },
        scales: {
          xAxes: [{ display: true, scaleLabel: { display: false } }],
          yAxes: [{ display: true, scaleLabel: { display: false } }],
        },
      },
    };
    let ctx = document.getElementById("compliance-bar-chart").getContext("2d");
    window.myBar = new Chart(ctx, config);
  }, []);
  return (
    <>
      <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded">
        <div className="rounded-t mb-0 px-4 py-3 bg-transparent">
          <div className="flex flex-wrap items-center">
            <div className="relative w-full max-w-full flex-grow flex-1">
              {/* FIX: Replaced 'blueGray' with 'slate' for v3 compatibility */}
              <h6 className="uppercase text-slate-400 mb-1 text-xs font-semibold">
                Compliance
              </h6>
              {/* FIX: Replaced 'blueGray' with 'slate' */}
              <h2 className="text-slate-700 text-xl font-semibold">
                Issues by Department
              </h2>
            </div>
          </div>
        </div>
        <div className="p-4 flex-auto">
          <div className="relative h-350-px">
            <canvas id="compliance-bar-chart"></canvas>
          </div>
        </div>
      </div>
    </>
  );
}
