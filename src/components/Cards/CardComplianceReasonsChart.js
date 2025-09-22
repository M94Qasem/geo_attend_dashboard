import React, { useEffect, useRef } from "react";
// 1. استخدام الاستيراد التلقائي الذي يسجل كل شيء بأمان
import Chart from "chart.js/auto";

export default function CardComplianceReasonsChart() {
  const canvasRef = useRef(null);

  useEffect(() => {
    if (!canvasRef.current) return;
    const ctx = canvasRef.current.getContext("2d");

    // 2. إعدادات الرسم البياني المحدثة لـ Chart.js v4
    const config = {
      type: "pie",
      data: {
        labels: ["Late Check-in", "Absence", "Manual Override", "Early Check-out"],
        datasets: [
          {
            label: "Compliance Issues",
            backgroundColor: ["#fbbf24", "#f87171", "#facc15", "#fb923c"], // amber-400, red-400, yellow-400, orange-400
            borderColor: "#ffffff",
            data: [40, 30, 20, 10],
          },
        ],
      },
      options: {
        maintainAspectRatio: false,
        responsive: true,
        plugins: { // 3. تحديث بنية الـ plugins
          legend: {
            position: "bottom",
            labels: {
              color: "rgba(0,0,0,.6)", // لون أغمق للنص
            },
          },
          title: {
            display: false,
          },
          tooltip: { // 4. تحديث بنية الـ tooltips
            callbacks: {
              label: function (context) {
                let label = context.label || '';
                let value = context.parsed || 0;
                return `${label}: ${value}%`;
              }
            }
          }
        }
      },
    };

    const chartInstance = new Chart(ctx, config);

    return () => {
      chartInstance.destroy();
    };
  }, []);

  return (
    // 5. تصميم البطاقة (لا تغيير هنا)
    <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded-lg">
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
          <canvas ref={canvasRef}></canvas>
        </div>
      </div>
    </div>
  );
}
