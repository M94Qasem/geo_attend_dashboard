// src/components/Cards/CardAttendanceChart.js

import React, { useEffect, useRef } from "react";
import Chart from "chart.js/auto";

export default function CardAttendanceChart() {
  const canvasRef = useRef(null);

  useEffect(() => {
    if (!canvasRef.current) return;
    const ctx = canvasRef.current.getContext("2d");
    let chartInstance;

    const renderChart = () => {
      const labelColor = 'rgba(255, 255, 255, 0.7)';
      const gridColor = 'rgba(255, 255, 255, 0.15)';

      if (chartInstance) {
        chartInstance.destroy();
      }

      chartInstance = new Chart(ctx, {
        type: "line",
        data: {
          labels: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
          datasets: [
            {
              label: "Attendance",
              backgroundColor: "rgba(56, 189, 248, 0.2)",
              borderColor: "#0ea5e9",
              data: [65, 78, 66, 72, 80, 67, 75],
              fill: true,
              tension: 0.4,
            },
          ],
        },
        options: {
          maintainAspectRatio: false,
          responsive: true,
          plugins: {
            legend: {
              display: true,
              position: 'bottom',
              labels: {
                color: labelColor,
                font: {
                  size: 13,
                  weight: '500'
                }
              }
            },
            title: { display: false },
          },
          interaction: { intersect: false, mode: "index" },
          scales: {
            x: {
              ticks: { color: labelColor },
              grid: { display: false }
            },
            y: {
              ticks: { color: labelColor },
              grid: { color: gridColor, borderDash: [3] },
            },
          },
        },
      });
    };

    renderChart();

    // ✅✅✅ الحل الصحيح: مراقبة "class" الخاص بـ <html> فقط
    const observer = new MutationObserver((mutations) => {
      mutations.forEach(mutation => {
        if (mutation.attributeName === "class") {
          // لا نحتاج لإعادة الرسم هنا لأن ألوان هذا المخطط ثابتة
          // لكن نترك المراقب كإجراء احترازي للمستقبل
        }
      });
    });

    // بدء المراقبة على العنصر الصحيح وبالفلتر الصحيح
    observer.observe(document.documentElement, { 
      attributes: true, 
      attributeFilter: ['class'] 
    });

    return () => {
      if (chartInstance) {
        chartInstance.destroy();
      }
      observer.disconnect();
    };
  }, []);

  return (
    <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-slate-800">
      <div className="rounded-t mb-0 px-4 py-3 bg-transparent">
        <h6 className="uppercase text-slate-400 mb-1 text-xs font-semibold">Overview</h6>
        <h2 className="text-white text-xl font-semibold">Weekly Attendance Trend</h2>
      </div>
      <div className="p-4 flex-auto">
        <div className="relative h-350-px">
          <canvas ref={canvasRef}></canvas>
        </div>
      </div>
    </div>
  );
}
