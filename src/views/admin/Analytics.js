// src/views/admin/Analytics.js

import React from "react";

// 1. استيراد كل المكونات النهائية التي تحتاجها هذه الصفحة
import AnalyticsFilterBar from "components/Cards/AnalyticsFilterBar.js";
import CardAnalyticsKPI from "components/Cards/CardAnalyticsKPI.js";
import CardMonthlyPerformanceChart from "components/Cards/CardMonthlyPerformanceChart.js";
import CardComplianceReasonsChart from "components/Cards/CardComplianceReasonsChart.js";
import CardAnalyticsTable from "components/Cards/CardAnalyticsTable.js";

export default function Analytics() {
  // --- بيانات وهمية محسّنة للصفحة ---
  const kpiData = [
    { title: "Total Attendance Days", value: "1,250", change: "+5.4%", changeType: "positive", icon: "fas fa-calendar-check", iconColor: "bg-sky-500" },
    { title: "Average Check-in", value: "08:12 AM", change: "-3 min", changeType: "positive", icon: "fas fa-sign-in-alt", iconColor: "bg-emerald-500" },
    { title: "Total Absentees", value: "35", change: "+2", changeType: "negative", icon: "fas fa-times-circle", iconColor: "bg-red-500" },
    { title: "Compliance Rate", value: "92%", change: "-1.2%", changeType: "negative", icon: "fas fa-percentage", iconColor: "bg-indigo-500" },
  ];

  const tableColumns = ["Date", "Employee", "Check-in", "Check-out", "Duration", "Status"];
  
  const tableData = [
    { date: "2025-09-11", employee: "John Doe", checkIn: "08:02", checkOut: "17:05", duration: "9h 3m", status: { text: "On-time", color: "emerald" } },
    { date: "2025-09-11", employee: "Jane Smith", checkIn: "08:17", checkOut: "17:01", duration: "8h 44m", status: { text: "Late", color: "orange" } },
    { date: "2025-09-10", employee: "John Doe", checkIn: "07:58", checkOut: "17:02", duration: "9h 4m", status: { text: "On-time", color: "emerald" } },
    { date: "2025-09-10", employee: "Sam Wilson", checkIn: "N/A", checkOut: "N/A", duration: "N/A", status: { text: "Absent", color: "red" } },
    { date: "2025-09-09", employee: "Jane Smith", checkIn: "08:05", checkOut: "16:30", duration: "8h 25m", status: { text: "Early Leave", color: "yellow" } },
    { date: "2025-09-09", employee: "John Doe", checkIn: "08:01", checkOut: "17:00", duration: "8h 59m", status: { text: "On-time", color: "emerald" } },
    { date: "2025-09-08", employee: "Alex Ray", checkIn: "09:00", checkOut: "17:30", duration: "8h 30m", status: { text: "Override", color: "amber" } },
    { date: "2025-09-08", employee: "Jane Smith", checkIn: "08:25", checkOut: "17:10", duration: "8h 45m", status: { text: "Late", color: "orange" } },
  ];

  return (
    <>
      {/* ✅ 1. تعديل الهيدر ليدعم الوضع الليلي */}
      <div className="relative bg-sky-600 dark:bg-slate-700 md:pt-32 pb-32 pt-12 print:hidden">
        <div className="px-4 md:px-10 mx-auto w-full">
          <div className="flex flex-wrap">
            {kpiData.map((kpi, index) => (
              <div key={index} className="w-full lg:w-6/12 xl:w-3/12 px-2">
                <CardAnalyticsKPI {...kpi} />
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* 2. المحتوى الرئيسي (لا يحتاج تعديل، فقط كلاسات الطباعة) */}
      <div className="relative px-4 md:px-10 mx-auto w-full -m-24 print:m-0 print:p-0">
        
        {/* شريط الفلاتر (يتم إخفاؤه عند الطباعة) */}
        <div className="flex flex-wrap mt-4 print:hidden">
          <div className="w-full">
            <AnalyticsFilterBar />
          </div>
        </div>

        {/* الرسوم البيانية */}
        <div className="flex flex-wrap mt-4">
          <div className="w-full xl:w-8/12 px-2 mb-4 xl:mb-0">
            <CardMonthlyPerformanceChart />
          </div>
          <div className="w-full xl:w-4/12 px-2">
            <CardComplianceReasonsChart />
          </div>
        </div>

        {/* جدول البيانات التفصيلي */}
        <div className="flex flex-wrap mt-4">
          <div className="w-full px-2">
            <CardAnalyticsTable title="Detailed Report Data" columns={tableColumns} data={tableData} />
          </div>
        </div>
      </div>
    </>
  );
}
