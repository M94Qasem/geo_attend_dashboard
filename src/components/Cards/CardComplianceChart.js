import React, { useEffect, useRef } from "react";
// 1. استخدام الاستيراد التلقائي الذي يسجل كل شيء بأمان
import Chart from "chart.js/auto";

export default function CardComplianceChart() {
  const canvasRef = useRef(null);

  useEffect(() => {
    if (!canvasRef.current) return;
    const ctx = canvasRef.current.getContext("2d");

    // 2. إعدادات الرسم البياني المحدثة لـ Chart.js v4
    const config = {
      type: "bar",
      data: {
        labels: ["Engineering", "Sales", "HR", "Marketing", "Operations"],
        datasets: [
          {
            label: "Late",
            backgroundColor: "#fbbf24", // orange-400
            borderColor: "#fbbf24",
            data: [30, 78, 56, 34, 45],
            barThickness: 12, // زيادة سمك الأعمدة قليلاً
          },
          {
            label: "Absent",
            backgroundColor: "#f87171", // red-400
            borderColor: "#f87171",
            data: [27, 68, 86, 74, 10],
            barThickness: 12,
          },
        ],
      },
      options: {
        maintainAspectRatio: false,
        responsive: true,
        plugins: {
          legend: {
            labels: {
              color: "rgba(0,0,0,.6)", // لون أغمق للنص
            },
            align: "end",
            position: "bottom",
          },
          title: {
            display: false,
          },
        },
        scales: { // 3. تحديث بنية المحاور
          x: {
            grid: {
              display: false, // إخفاء خطوط الشبكة العمودية
            },
            ticks: {
              color: "rgba(0,0,0,.6)",
            },
          },
          y: {
            grid: {
              color: "rgba(0,0,0,0.05)", // خطوط شبكة أفقية خفيفة
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
    // 4. تصميم البطاقة (لا تغيير هنا)
    <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded-lg">
      <div className="rounded-t mb-0 px-4 py-3 bg-transparent">
        <div className="flex flex-wrap items-center">
          <div className="relative w-full max-w-full flex-grow flex-1">
            <h6 className="uppercase text-slate-400 mb-1 text-xs font-semibold">
              Compliance
            </h6>
            <h2 className="text-slate-700 text-xl font-semibold">
              Issues by Department
            </h2>
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
