import React from "react";
import Chart from "chart.js";

export default function CardMonthlyPerformanceChart() {
  React.useEffect(() => {
    const config = {
      type: "bar",
      data: {
        labels: ["Week 1", "Week 2", "Week 3", "Week 4"],
        datasets: [
          {
            label: "Expected Hours",
            backgroundColor: "#a0aec0", // slate-400
            borderColor: "#a0aec0",
            data: [400, 400, 400, 400],
            fill: false,
          },
          {
            label: "Logged Hours",
            fill: false,
            backgroundColor: "#4f46e5", // indigo-600
            borderColor: "#4f46e5",
            data: [380, 395, 370, 410],
          },
        ],
      },
      options: {
        maintainAspectRatio: false,
        responsive: true,
        title: { display: false },
        tooltips: { mode: "index", intersect: false },
        hover: { mode: "nearest", intersect: true },
        legend: { labels: { fontColor: "rgba(0,0,0,.4)" }, align: "end", position: "bottom" },
        scales: {
          xAxes: [{ display: true, scaleLabel: { display: false }, gridLines: { display: false } }],
          yAxes: [{ display: true, scaleLabel: { display: false } }],
        },
      },
    };
    const ctx = document.getElementById("monthly-performance-chart").getContext("2d");
    window.myBar = new Chart(ctx, config);
  }, []);
  return (
    <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded-lg p-4">
      <div className="rounded-t mb-0 px-4 py-3 bg-transparent">
        <div className="flex flex-wrap items-center">
          <div className="relative w-full max-w-full flex-grow flex-1">
            <h6 className="uppercase text-slate-400 mb-1 text-xs font-semibold">Performance</h6>
            <h2 className="text-slate-700 text-xl font-semibold">Monthly Work Hours</h2>
          </div>
        </div>
      </div>
      <div className="p-4 flex-auto">
        <div className="relative h-350-px">
          <canvas id="monthly-performance-chart"></canvas>
        </div>
      </div>
    </div>
  );
}
