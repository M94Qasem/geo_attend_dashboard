import React from "react";
import Chart from "chart.js";

export default function CardComplianceReasonsChart() {
  React.useEffect(() => {
    const config = {
      type: "pie",
      data: {
        labels: ["Late Check-in", "Absence", "Manual Override", "Early Check-out"],
        datasets: [
          {
            label: "Compliance Issues",
            backgroundColor: ["#fbbf24", "#f87171", "#facc15", "#fb923c"], // amber, red, yellow, orange
            borderColor: "#ffffff",
            data: [40, 30, 20, 10],
          },
        ],
      },
      options: {
        maintainAspectRatio: false,
        responsive: true,
        title: { display: false },
        legend: { position: "bottom", labels: { fontColor: "rgba(0,0,0,.4)" } },
        tooltips: {
          callbacks: {
            label: function (tooltipItem, data) {
              let label = data.labels[tooltipItem.index] || '';
              let value = data.datasets[tooltipItem.datasetIndex].data[tooltipItem.index];
              return `${label}: ${value}%`;
            }
          }
        }
      },
    };
    const ctx = document.getElementById("compliance-reasons-chart").getContext("2d");
    window.myPie = new Chart(ctx, config);
  }, []);
  return (
    <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded-lg p-4">
      <div className="rounded-t mb-0 px-4 py-3 bg-transparent">
        <div className="flex flex-wrap items-center">
          <div className="relative w-full max-w-full flex-grow flex-1">
            <h6 className="uppercase text-slate-400 mb-1 text-xs font-semibold">Compliance</h6>
            <h2 className="text-slate-700 text-xl font-semibold">Reasons for Non-Compliance</h2>
          </div>
        </div>
      </div>
      <div className="p-4 flex-auto">
        <div className="relative h-350-px">
          <canvas id="compliance-reasons-chart"></canvas>
        </div>
      </div>
    </div>
  );
}
