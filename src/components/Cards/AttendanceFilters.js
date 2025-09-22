// src/components/Cards/AttendanceFilters.js
import React from "react";
import Select from "react-select";

// أنماط مخصصة لـ react-select لتناسب المظهر الداكن
const selectStyles = {
  control: (styles) => ({ ...styles, backgroundColor: '#334155', borderColor: '#475569', minHeight: '38px', height: '38px' }),
  option: (styles, { isFocused }) => ({ ...styles, backgroundColor: isFocused ? '#475569' : '#334155', color: 'white' }),
  multiValue: (styles) => ({ ...styles, backgroundColor: '#475569' }),
  multiValueLabel: (styles) => ({ ...styles, color: 'white' }),
  input: (styles) => ({ ...styles, color: 'white' }),
  singleValue: (styles) => ({ ...styles, color: 'white' }),
  menu: (styles) => ({ ...styles, backgroundColor: '#334155' }),
};

export default function AttendanceFilters({ filters, setFilters, departmentOptions, locationOptions }) {
  const handleFilterChange = (name, value) => {
    setFilters(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="bg-white dark:bg-slate-700 shadow rounded-lg p-4 mb-6">
      <h3 className="text-slate-700 dark:text-white font-semibold mb-4">Filters</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Employee Search */}
        <div>
          <label className="block text-sm text-slate-600 dark:text-slate-300 mb-1">Employee</label>
          <input
            type="text"
            placeholder="Search by name..."
            className="border rounded px-3 py-1.5 w-full bg-white dark:bg-slate-700 dark:border-slate-500 dark:text-white"
            value={filters.employee}
            onChange={(e) => handleFilterChange('employee', e.target.value)}
          />
        </div>

        {/* Department Select */}
        <div>
          <label className="block text-sm text-slate-600 dark:text-slate-300 mb-1">Department</label>
          <Select
            isMulti
            options={departmentOptions}
            onChange={(selected) => handleFilterChange('departments', selected)}
            styles={selectStyles}
          />
        </div>

        {/* Location Select */}
        <div>
          <label className="block text-sm text-slate-600 dark:text-slate-300 mb-1">Location</label>
          <Select
            isMulti
            options={locationOptions}
            onChange={(selected) => handleFilterChange('locations', selected)}
            styles={selectStyles}
          />
        </div>
        
        {/* Quick Anomaly Filter */}
        <div>
          <label className="block text-sm text-slate-600 dark:text-slate-300 mb-1">Quick Filter</label>
          <select
            className="border rounded px-3 py-1.5 w-full bg-white dark:bg-slate-700 dark:border-slate-500 dark:text-white"
            value={filters.quick}
            onChange={(e) => handleFilterChange('quick', e.target.value)}
          >
            <option value="">All Statuses</option>
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
