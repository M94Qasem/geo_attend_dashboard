import React, { useEffect, useRef } from "react";
// 1. استخدام الاستيراد التلقائي الذي يسجل كل شيء بأمان
import Chart from "chart.js/auto";

export default function CardMonthlyPerformanceChart() {
  const canvasRef = useRef(null);

  useEffect(() => {
    if (!canvasRef.current) return;
    const ctx = canvasRef.current.getContext("2d");

    // 2. إعدادات الرسم البياني المحدثة لـ Chart.js v4
    const config = {
      type: "bar",
      data: {
        labels: ["Week 1", "Week 2", "Week 3", "Week 4"],
        datasets: [
          {
            label: "Expected Hours",
            backgroundColor: "#cbd5e1", // slate-300
            borderColor: "#cbd5e1",
            data: [400, 400, 400, 400],
          },
          {
            label: "Logged Hours",
            backgroundColor: "#4f46e5", // indigo-600
            borderColor: "#4f46e5",
            data: [380, 395, 370, 410],
          },
        ],
      },
      options: {
        maintainAspectRatio: false,
        responsive: true,
        plugins: { // 3. تحديث بنية الـ plugins
          legend: {
            position: "bottom",
            align: "end",
            labels: {
              color: "rgba(0,0,0,.6)",
            },
          },
          title: {
            display: false,
          },
        },
        scales: { // 4. تحديث بنية المحاور
          x: {
            grid: {
              display: false,
            },
            ticks: {
              color: "rgba(0,0,0,.6)",
            },
          },
          y: {
            grid: {
              color: "rgba(0,0,0,0.05)",
            },
            ticks: {
              color: "rgba(0,0,0,.6)",
            },
          },
        },
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
            <h6 className="uppercase text-slate-400 mb-1 text-xs font-semibold">Performance</h6>
            <h2 className="text-slate-700 text-xl font-semibold">Monthly Work Hours</h2>
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
