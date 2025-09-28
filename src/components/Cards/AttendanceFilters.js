// src/components/Cards/AttendanceFilters.js
import React from "react";
import Select from "react-select";

// أنماط react-select للوضع الفاتح
const selectStyles = {
  control: (styles) => ({
    ...styles,
    backgroundColor: 'white',
    borderColor: '#cbd5e1', // slate-300
    minHeight: '38px',
    height: '38px',
    boxShadow: 'none',
    '&:hover': { borderColor: '#94a3b8' } // slate-400
  }),
  option: (styles, { isFocused }) => ({
    ...styles,
    backgroundColor: isFocused ? '#f1f5f9' : 'white', // slate-100 on focus
    color: '#1e293b', // slate-800
    ':active': {
      ...styles[':active'],
      backgroundColor: '#e2e8f0', // slate-200
    },
  }),
  multiValue: (styles) => ({ ...styles, backgroundColor: '#e2e8f0' }),
  multiValueLabel: (styles) => ({ ...styles, color: '#1e293b' }),
  input: (styles) => ({ ...styles, color: '#1e293b' }),
  singleValue: (styles) => ({ ...styles, color: '#1e293b' }),
  menu: (styles) => ({ ...styles, backgroundColor: 'white', border: '1px solid #e2e8f0' }),
};

export default function AttendanceFilters({ filters, setFilters, departmentOptions, locationOptions }) {
  const handleFilterChange = (name, value) => {
    setFilters(prev => ({ ...prev, [name]: value }));
  };

  return (
    // تم إزالة الخلفية والظل من هنا لأنها ستكون جزءًا من CardTable
    <div className="p-4"> 
      <h3 className="text-slate-700 font-semibold mb-4">Filters</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Employee Search */}
        <div>
          <label className="block text-sm font-medium text-slate-600 mb-1">Employee</label>
          <input
            type="text"
            placeholder="Search by name..."
            className="h-[38px] border rounded px-3 py-1.5 w-full bg-white border-slate-300 text-slate-700 focus:outline-none focus:ring-1 focus:ring-sky-500 focus:border-sky-500"
            value={filters.employee}
            onChange={(e) => handleFilterChange('employee', e.target.value)}
          />
        </div>

        {/* Department Select */}
        <div>
          <label className="block text-sm font-medium text-slate-600 mb-1">Department</label>
          <Select
            isMulti
            options={departmentOptions}
            onChange={(selected) => handleFilterChange('departments', selected)}
            styles={selectStyles}
          />
        </div>

        {/* Location Select */}
        <div>
          <label className="block text-sm font-medium text-slate-600 mb-1">Location</label>
          <Select
            isMulti
            options={locationOptions}
            onChange={(selected) => handleFilterChange('locations', selected)}
            styles={selectStyles}
          />
        </div>
        
        {/* Quick Filter */}
        <div>
          <label className="block text-sm font-medium text-slate-600 mb-1">Quick Filter</label>
          <select
            className="h-[38px] border rounded px-3 py-1.5 w-full bg-white border-slate-300 text-slate-700 focus:outline-none focus:ring-1 focus:ring-sky-500 focus:border-sky-500"
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
