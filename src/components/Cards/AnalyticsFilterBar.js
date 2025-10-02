// src/components/Cards/AnalyticsFilterBar.js

import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
// ✅ استيراد الأيقونات اللازمة
import { FaFilter, FaRedo } from "react-icons/fa";

export default function AnalyticsFilterBar() {
  const [filters, setFilters] = useState({
    startDate: null,
    endDate: null,
    employee: "all",
    department: "all",
    reportType: "monthly",
  });

  const handleDateChange = (dates) => {
    const [start, end] = dates;
    setFilters({ ...filters, startDate: start, endDate: end });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value });
  };

  const applyFilters = () => console.log("Applying Filters:", filters);
  const resetFilters = () => setFilters({ startDate: null, endDate: null, employee: "all", department: "all", reportType: "monthly" });

  const customArrowDark = `url("data:image/svg+xml,%3Csvg viewBox='0 0 20 20' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M6 8L10 12L14 8' stroke='%239CA3AF' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E"  )`;
  const customArrowLight = `url("data:image/svg+xml,%3Csvg viewBox='0 0 20 20' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M6 8L10 12L14 8' stroke='%236B7280' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E"  )`;

  return (
    <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-xl bg-white dark:bg-slate-800 p-4 print:hidden">
      <div className="flex flex-wrap items-center justify-between">
        <h3 className="font-semibold text-lg text-slate-700 dark:text-white mb-4 md:mb-0">Analytics Filters</h3>
        <div className="flex items-center gap-2">
          {/* ✅ تغيير النص وإضافة أيقونة */}
          <button onClick={applyFilters} className="flex items-center gap-2 bg-sky-600 text-white font-bold text-sm px-6 py-3 rounded-lg shadow hover:shadow-lg outline-none focus:outline-none">
            <FaFilter /> Apply Filters
          </button>
          {/* ✅ إضافة أيقونة */}
          <button onClick={resetFilters} className="flex items-center gap-2 bg-slate-200 text-slate-700 font-bold text-sm px-4 py-3 rounded-lg hover:bg-slate-300 dark:bg-slate-700 dark:text-slate-300 dark:hover:bg-slate-600">
            <FaRedo /> Reset
          </button>
        </div>
      </div>
      <hr className="my-4 md:min-w-full border-slate-200 dark:border-slate-700" />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        
        {/* ... (بقية حقول الفلاتر تبقى كما هي مع دعم الوضع الليلي) ... */}
        <div className="flex flex-col">
          <label className="text-sm font-medium text-gray-700 dark:text-slate-400 mb-2">Date Range</label>
          <DatePicker 
            selectsRange={true} 
            startDate={filters.startDate} 
            endDate={filters.endDate} 
            onChange={handleDateChange} 
            isClearable={true} 
            placeholderText="Select date range" 
            className="border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-700 dark:text-slate-300 px-4 py-2 rounded-lg w-full focus:ring-sky-500"
          />
        </div>
        <div className="flex flex-col">
          <label className="text-sm font-medium text-gray-700 dark:text-slate-400 mb-2">Report Type</label>
          <select name="reportType" value={filters.reportType} onChange={handleInputChange} className="appearance-none border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-700 dark:text-slate-300 px-4 py-2 pr-10 rounded-lg w-full focus:ring-sky-500" style={{ backgroundImage: document.documentElement.classList.contains('dark') ? customArrowDark : customArrowLight, backgroundPosition: 'right 0.5rem center', backgroundSize: '1.5em 1.5em' }}>
            <option value="daily">Daily</option>
            <option value="weekly">Weekly</option>
            <option value="monthly">Monthly</option>
          </select>
        </div>
        <div className="flex flex-col">
          <label className="text-sm font-medium text-gray-700 dark:text-slate-400 mb-2">Employee</label>
          <select name="employee" value={filters.employee} onChange={handleInputChange} className="appearance-none border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-700 dark:text-slate-300 px-4 py-2 pr-10 rounded-lg w-full focus:ring-sky-500" style={{ backgroundImage: document.documentElement.classList.contains('dark') ? customArrowDark : customArrowLight, backgroundPosition: 'right 0.5rem center', backgroundSize: '1.5em 1.5em' }}>
            <option value="all">All Employees</option>
          </select>
        </div>
        <div className="flex flex-col">
          <label className="text-sm font-medium text-gray-700 dark:text-slate-400 mb-2">Department</label>
          <select name="department" value={filters.department} onChange={handleInputChange} className="appearance-none border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-700 dark:text-slate-300 px-4 py-2 pr-10 rounded-lg w-full focus:ring-sky-500" style={{ backgroundImage: document.documentElement.classList.contains('dark') ? customArrowDark : customArrowLight, backgroundPosition: 'right 0.5rem center', backgroundSize: '1.5em 1.5em' }}>
            <option value="all">All Departments</option>
          </select>
        </div>
      </div>
    </div>
  );
}
