import React, { useState } from "react";
import DatePicker from "react-datepicker";
import Button from "../Elements/Button";
import "react-datepicker/dist/react-datepicker.css";

export default function AnalyticsFilterBar() {
  const [filters, setFilters] = useState({
    startDate: null,
    endDate: null,
    employee: "all",
    department: "all",
    reportType: "monthly", // Default report type
  });

  const handleDateChange = (dates) => {
    const [start, end] = dates;
    setFilters({ ...filters, startDate: start, endDate: end });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value });
  };

  const applyFilters = () => {
    console.log("Applying Strategic Analytics Filters:", filters);
    // In the future, this will trigger a data fetch for the entire page.
  };

  const exportData = () => {
    console.log("Exporting data with filters:", filters);
    // This will eventually trigger a PDF/Excel export.
  };

  const customArrow = `url("data:image/svg+xml,%3Csvg viewBox='0 0 20 20' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M6 8L10 12L14 8' stroke='%236B7280' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E" )`;

  return (
    <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-white p-6">
      <h3 className="font-semibold text-lg text-slate-700 mb-4">Analytics & Reports Filters</h3>
      <div className="flex flex-wrap items-end gap-4">
        
        {/* Date Range Filter */}
        <div className="flex flex-col">
          <label className="text-sm font-medium text-gray-700 mb-2">Date Range</label>
          <DatePicker
            selectsRange={true}
            startDate={filters.startDate}
            endDate={filters.endDate}
            onChange={handleDateChange}
            isClearable={true}
            placeholderText="Select custom date range"
            className="border border-gray-300 px-4 py-2 rounded-lg text-gray-700 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 shadow-sm w-52"
          />
        </div>

        {/* Report Type Filter */}
        <div className="flex flex-col">
          <label className="text-sm font-medium text-gray-700 mb-2">Report Type</label>
          <select
            name="reportType"
            value={filters.reportType}
            onChange={handleInputChange}
            className="appearance-none border border-gray-300 bg-white px-4 py-2 pr-10 rounded-lg text-gray-700 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 shadow-sm w-44 bg-no-repeat"
            style={{ backgroundImage: customArrow, backgroundPosition: 'right 0.5rem center', backgroundSize: '1.5em 1.5em' }}
          >
            <option value="daily">Daily</option>
            <option value="weekly">Weekly</option>
            <option value="monthly">Monthly</option>
            <option value="yearly">Yearly</option>
          </select>
        </div>

        {/* Employee Filter */}
        <div className="flex flex-col">
          <label className="text-sm font-medium text-gray-700 mb-2">Employee</label>
          <select
            name="employee"
            value={filters.employee}
            onChange={handleInputChange}
            className="appearance-none border border-gray-300 bg-white px-4 py-2 pr-10 rounded-lg text-gray-700 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 shadow-sm w-44 bg-no-repeat"
            style={{ backgroundImage: customArrow, backgroundPosition: 'right 0.5rem center', backgroundSize: '1.5em 1.5em' }}
          >
            <option value="all">All Employees</option>
          </select>
        </div>

        {/* Department Filter */}
        <div className="flex flex-col">
          <label className="text-sm font-medium text-gray-700 mb-2">Department</label>
          <select
            name="department"
            value={filters.department}
            onChange={handleInputChange}
            className="appearance-none border border-gray-300 bg-white px-4 py-2 pr-10 rounded-lg text-gray-700 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 shadow-sm w-44 bg-no-repeat"
            style={{ backgroundImage: customArrow, backgroundPosition: 'right 0.5rem center', backgroundSize: '1.5em 1.5em' }}
          >
            <option value="all">All Departments</option>
          </select>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3 ml-auto">
          <Button onClick={applyFilters} variant="primary">Generate Report</Button>
          <Button onClick={exportData} variant="secondary">Export</Button>
        </div>
      </div>
    </div>
  );
}
