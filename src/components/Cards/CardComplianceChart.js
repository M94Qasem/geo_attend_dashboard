// src/components/Cards/CardComplianceChart.js

import React, { useEffect, useRef } from "react";
import Chart from "chart.js/auto";

export default function CardComplianceChart() {
  const canvasRef = useRef(null);

  // ✅✅✅ تطبيق الحل الصحيح باستخدام MutationObserver
  useEffect(() => {
    if (!canvasRef.current) return;
    const ctx = canvasRef.current.getContext("2d");
    let chartInstance;

    // 1. دالة مركزية لرسم المخطط بناءً على حالة الوضع الليلي
    const renderChart = (isDark) => {
      // تحديد الألوان الصحيحة بناءً على الحالة
      const textColor = isDark ? 'rgba(255, 255, 255, 0.7)' : '#334155';
      const gridColor = isDark ? 'rgba(255, 255, 255, 0.15)' : '#d1d5db';

      // تدمير النسخة القديمة من المخطط قبل رسم الجديدة
      if (chartInstance) {
        chartInstance.destroy();
      }

      // إنشاء نسخة جديدة من المخطط بالإعدادات الصحيحة
      chartInstance = new Chart(ctx, {
        type: "bar",
        data: {
          labels: ["Engineering", "Sales", "HR", "Marketing", "Operations"],
          datasets: [
            { label: "Late", backgroundColor: "#fbbf24", data: [30, 78, 56, 34, 45], barThickness: 12 },
            { label: "Absent", backgroundColor: "#f87171", data: [27, 68, 86, 74, 10], barThickness: 12 },
          ],
        },
        options: {
          maintainAspectRatio: false,
          responsive: true,
          plugins: {
            legend: {
              labels: { color: textColor, font: { size: 13, weight: "500" } },
              align: "end",
              position: "bottom",
            },
          },
          scales: {
            x: { ticks: { color: textColor }, grid: { display: false } },
            y: { ticks: { color: textColor }, grid: { color: gridColor } },
          },
        },
      });
    };

    // 2. الرسم لأول مرة عند تحميل المكون
    renderChart(document.documentElement.classList.contains("dark"));

    // 3. إنشاء "مراقب" يتابع التغييرات على كلاسات العنصر <html>
    const observer = new MutationObserver((mutations) => {
      // نتأكد أن التغيير حدث على الكلاس
      mutations.forEach(mutation => {
        if (mutation.attributeName === "class") {
          const isDark = document.documentElement.classList.contains("dark");
          renderChart(isDark);
        }
      });
    });

    // 4. بدء المراقبة
    observer.observe(document.documentElement, { attributes: true });

    // 5. دالة التنظيف: إيقاف المراقبة وتدمير المخطط عند إزالة المكون
    return () => {
      if (chartInstance) {
        chartInstance.destroy();
      }
      observer.disconnect();
    };
  }, []); // ✅ الاعتماد على [] فارغة لأن useEffect يدير دورة حياته بنفسه الآن

  return (
    <div className="relative flex flex-col min-w-0 break-words bg-white dark:bg-slate-800 w-full mb-6 shadow-lg rounded-lg">
      <div className="rounded-t mb-0 px-4 py-3 bg-transparent">
        <div className="flex flex-wrap items-center">
          <div className="relative w-full max-w-full flex-grow flex-1">
            <h6 className="uppercase text-slate-400 dark:text-slate-500 mb-1 text-xs font-semibold">
              Compliance
            </h6>
            <h2 className="text-slate-700 dark:text-white text-xl font-semibold">
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
