// src/components/Cards/AttendanceFilters.js

import React, { useState, useEffect } from "react"; // ✅ 1. استيراد useEffect
import Select from "react-select";

// (أنماط lightStyles و darkStyles تبقى كما هي)
const lightStyles = {
  control: (styles) => ({ ...styles, backgroundColor: 'white', borderColor: '#cbd5e1', minHeight: '38px', height: '38px', boxShadow: 'none', '&:hover': { borderColor: '#94a3b8' } }),
  option: (styles, { isFocused }) => ({ ...styles, backgroundColor: isFocused ? '#f1f5f9' : 'white', color: '#1e293b', ':active': { ...styles[':active'], backgroundColor: '#e2e8f0' } }),
  multiValue: (styles) => ({ ...styles, backgroundColor: '#e2e8f0' }),
  multiValueLabel: (styles) => ({ ...styles, color: '#1e293b' }),
  input: (styles) => ({ ...styles, color: '#1e293b' }),
  singleValue: (styles) => ({ ...styles, color: '#1e293b' }),
  menu: (styles) => ({ ...styles, backgroundColor: 'white', border: '1px solid #e2e8f0' }),
};

const darkStyles = {
  control: (styles) => ({ ...styles, backgroundColor: '#334155', borderColor: '#475569', minHeight: '38px', height: '38px', boxShadow: 'none', '&:hover': { borderColor: '#64748b' } }),
  option: (styles, { isFocused }) => ({ ...styles, backgroundColor: isFocused ? '#475569' : '#334155', color: '#e2e8f0', ':active': { ...styles[':active'], backgroundColor: '#1e293b' } }),
  multiValue: (styles) => ({ ...styles, backgroundColor: '#475569' }),
  multiValueLabel: (styles) => ({ ...styles, color: '#e2e8f0' }),
  input: (styles) => ({ ...styles, color: '#e2e8f0' }),
  singleValue: (styles) => ({ ...styles, color: '#e2e8f0' }),
  menu: (styles) => ({ ...styles, backgroundColor: '#1e293b', border: '1px solid #475569' }),
};

export default function AttendanceFilters({ filters, setFilters, departmentOptions, locationOptions }) {
  const handleFilterChange = (name, value) => {
    setFilters(prev => ({ ...prev, [name]: value }));
  };

  // ✅ 2. استخدام useState و useEffect لمراقبة الوضع
  const [isDarkMode, setIsDarkMode] = useState(
    () => document.documentElement.classList.contains('dark')
  );

  useEffect(() => {
    const observer = new MutationObserver(() => {
      setIsDarkMode(document.documentElement.classList.contains('dark'));
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class'],
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="p-4"> 
      <h3 className="text-slate-700 dark:text-white font-semibold mb-4">Filters</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        
        <div>
          <label className="block text-sm font-medium text-slate-600 dark:text-slate-400 mb-1">Employee</label>
          <input
            type="text"
            placeholder="Search by name..."
            className="h-[38px] border rounded px-3 py-1.5 w-full bg-white dark:bg-slate-700 border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-200 focus:outline-none focus:ring-1 focus:ring-sky-500 focus:border-sky-500"
            value={filters.employee}
            onChange={(e) => handleFilterChange('employee', e.target.value)}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-600 dark:text-slate-400 mb-1">Department</label>
          {/* ✅ 3. الاعتماد على حالة isDarkMode بدلاً من التحقق المباشر */}
          <Select
            isMulti
            options={departmentOptions}
            onChange={(selected) => handleFilterChange('departments', selected)}
            styles={isDarkMode ? darkStyles : lightStyles}
            placeholder="Select departments..."
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-600 dark:text-slate-400 mb-1">Location</label>
          <Select
            isMulti
            options={locationOptions}
            onChange={(selected) => handleFilterChange('locations', selected)}
            styles={isDarkMode ? darkStyles : lightStyles}
            placeholder="Select locations..."
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-slate-600 dark:text-slate-400 mb-1">Quick Filter</label>
          <select
            className="h-[38px] border rounded px-3 py-1.5 w-full bg-white dark:bg-slate-700 border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-200 focus:outline-none focus:ring-1 focus:ring-sky-500 focus:border-sky-500"
            value={filters.quick}
            onChange={(e) => handleFilterChange('quick', e.target.value)}
          >
            <option value="">All Statuses</option>
            <option value="On Time">On Time</option>
            <option value="Late">Late Only</option>
            <option value="Override">Overrides</option>
            <option value="Failure">Verification Failed</option>
            <option value="Absent">Absent</option>
          </select>
        </div>
      </div>
    </div>
  );
}
