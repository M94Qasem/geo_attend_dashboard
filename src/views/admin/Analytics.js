import React from "react";

// 1. استيراد كل المكونات التي تحتاجها هذه الصفحة
import AnalyticsFilterBar from "components/Cards/AnalyticsFilterBar.js";
import CardAnalyticsKPI from "components/Cards/CardAnalyticsKPI.js";
import CardMonthlyPerformanceChart from "components/Cards/CardMonthlyPerformanceChart.js";
import CardComplianceReasonsChart from "components/Cards/CardComplianceReasonsChart.js";
import CardAnalyticsTable from "components/Cards/CardAnalyticsTable.js"; // <-- المكون الجديد للجدول

export default function Analytics() {
  // --- بيانات وهمية للصفحة ---

  // بيانات لبطاقات KPI
  const kpiData = {
    totalAttendanceDays: "1,250",
    avgCheckIn: "08:12 AM",
    avgCheckOut: "04:55 PM",
    complianceRate: "92%",
  };

  // أعمدة الجدول التفصيلي
  const tableColumns = ["Date", "Employee", "Check-in", "Check-out", "Duration", "Status"];
  
  // بيانات وهمية للجدول (أكثر من 10 صفوف لإظهار الترقيم)
  const tableData = [
    { date: "2025-09-11", employee: "John Doe", checkIn: "08:02", checkOut: "17:05", duration: "9h 3m", status: { text: "On-time", color: "emerald" } },
    { date: "2025-09-11", employee: "Jane Smith", checkIn: "08:17", checkOut: "17:01", duration: "8h 44m", status: { text: "Late", color: "orange" } },
    { date: "2025-09-10", employee: "John Doe", checkIn: "07:58", checkOut: "17:02", duration: "9h 4m", status: { text: "On-time", color: "emerald" } },
    { date: "2025-09-10", employee: "Sam Wilson", checkIn: "N/A", checkOut: "N/A", duration: "N/A", status: { text: "Absent", color: "red" } },
    { date: "2025-09-09", employee: "Jane Smith", checkIn: "08:05", checkOut: "16:30", duration: "8h 25m", status: { text: "Early Leave", color: "yellow" } },
    { date: "2025-09-09", employee: "John Doe", checkIn: "08:01", checkOut: "17:00", duration: "8h 59m", status: { text: "On-time", color: "emerald" } },
    { date: "2025-09-08", employee: "Alex Ray", checkIn: "09:00", checkOut: "17:30", duration: "8h 30m", status: { text: "Override", color: "amber" } },
    { date: "2025-09-08", employee: "Jane Smith", checkIn: "08:25", checkOut: "17:10", duration: "8h 45m", status: { text: "Late", color: "orange" } },
    { date: "2025-09-07", employee: "John Doe", checkIn: "08:00", checkOut: "17:01", duration: "9h 1m", status: { text: "On-time", color: "emerald" } },
    { date: "2025-09-07", employee: "Sam Wilson", checkIn: "08:03", checkOut: "17:00", duration: "8h 57m", status: { text: "On-time", color: "emerald" } },
    { date: "2025-09-06", employee: "Jane Smith", checkIn: "07:59", checkOut: "17:03", duration: "9h 4m", status: { text: "On-time", color: "emerald" } },
    { date: "2025-09-06", employee: "Alex Ray", checkIn: "N/A", checkOut: "N/A", duration: "N/A", status: { text: "Absent", color: "red" } },
  ];

  return (
    <>
      {/* Header */}
      <div className="relative bg-sky-600 md:pt-32 pb-32 pt-12">
        <div className="px-4 md:px-10 mx-auto w-full"></div>
      </div>
      
      {/* Page content */}
      <div className="px-4 md:px-10 mx-auto w-full -m-24">
        
        {/* الصف الأول: شريط الفلترة */}
        <div className="flex flex-wrap">
          <div className="w-full">
            <AnalyticsFilterBar />
          </div>
        </div>

        {/* الصف الثاني: بطاقات KPI */}
        <div className="flex flex-wrap mt-4">
          <div className="w-full lg:w-6/12 xl:w-3/12 px-2"><CardAnalyticsKPI title="Total Attendance Days" value={kpiData.totalAttendanceDays} icon="fas fa-calendar-check" iconColor="bg-sky-500"/></div>
          <div className="w-full lg:w-6/12 xl:w-3/12 px-2"><CardAnalyticsKPI title="Average Check-in" value={kpiData.avgCheckIn} icon="fas fa-sign-in-alt" iconColor="bg-emerald-500"/></div>
          <div className="w-full lg:w-6/12 xl:w-3/12 px-2"><CardAnalyticsKPI title="Average Check-out" value={kpiData.avgCheckOut} icon="fas fa-sign-out-alt" iconColor="bg-red-500"/></div>
          <div className="w-full lg:w-6/12 xl:w-3/12 px-2"><CardAnalyticsKPI title="Compliance Rate" value={kpiData.complianceRate} icon="fas fa-percentage" iconColor="bg-indigo-500"/></div>
        </div>

        {/* الصف الثالث: الرسوم البيانية */}
        <div className="flex flex-wrap mt-4">
          <div className="w-full xl:w-8/12 px-2 mb-4 xl:mb-0"><CardMonthlyPerformanceChart /></div>
          <div className="w-full xl:w-4/12 px-2"><CardComplianceReasonsChart /></div>
        </div>

        {/* 2. الصف الرابع: جدول البيانات التفصيلي */}
        <div className="flex flex-wrap mt-4">
          <div className="w-full px-2">
            <CardAnalyticsTable title="Detailed Report Data" columns={tableColumns} data={tableData} />
          </div>
        </div>
      </div>
    </>
  );
}
