import React, { useEffect, useRef } from "react";
import Chart from "chart.js/auto";

export default function CardAttendanceChart() {
  const canvasRef = useRef(null);

  useEffect(() => {
    if (!canvasRef.current) return;
    const ctx = canvasRef.current.getContext("2d");

    const config = {
      type: "line",
      data: {
        labels: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
        datasets: [
          {
            label: "Attendance",
            // --- التعديل رقم 1: تغيير لون الخط والتعبئة ---
            // تم تغيير لون التعبئة إلى تدرج أزرق سماوي شفاف
            backgroundColor: "rgba(56, 189, 248, 0.2)", 
            // تم تغيير لون الخط إلى أزرق سماوي واضح
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
              color: 'white',
            }
          },
          title: { display: false },
        },
        interaction: { intersect: false, mode: "index" },
        scales: {
          x: { 
            ticks: { color: "rgba(255,255,255,.7)" }, 
            grid: { display: false } 
          },
          y: {
            ticks: { color: "rgba(255,255,255,.7)" },
            grid: { color: "rgba(255, 255, 255, 0.15)", borderDash: [3] },
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
    // --- التعديل رقم 2: تغيير لون خلفية البطاقة ---
    // تم تغيير الخلفية إلى لون رمادي داكن أكثر عمقًا
    <div className="relative flex flex-col min-w-0 break-words bg-slate-800 w-full mb-6 shadow-lg rounded-lg">
      <div className="rounded-t mb-0 px-4 py-3 bg-transparent">
        <h6 className="uppercase text-slate-100 mb-1 text-xs font-semibold">Overview</h6>
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
