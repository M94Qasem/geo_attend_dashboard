import React, { useState } from "react";
import PropTypes from "prop-types";
import DatePicker from "react-datepicker";
import Button from "../Elements/Button";
import { FaCircle } from "react-icons/fa";
import "react-datepicker/dist/react-datepicker.css";

export default function CardTable({ title, columns, data }) {
  const [filters, setFilters] = useState({
    startDate: null,
    endDate: null,
    employee: "all",
    department: "all",
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
    console.log("Applying Filters:", filters);
  };

  const clearFilters = () => {
    setFilters({
      startDate: null,
      endDate: null,
      employee: "all",
      department: "all",
    });
    console.log("Filters Cleared");
  };

  const customArrow = `url("data:image/svg+xml,%3Csvg viewBox='0 0 20 20' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M6 8L10 12L14 8' stroke='%236B7280' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E" )`;

  return (
    <div className="relative flex flex-col min-w-0 w-full mb-6 shadow-lg rounded-lg bg-white overflow-hidden">
      
      {/* FIX: Reverted to a simpler, more consistent header style */}
      <div className="rounded-t mb-0 px-6 py-4 border-b">
        <h3 className="font-semibold text-lg text-slate-700">{title}</h3>
      </div>

      {/* Filters Section - This part is now working perfectly */}
      <div className="px-6 py-5 border-b border-slate-200 bg-slate-50">
        <div className="flex flex-wrap items-end gap-4">
          
          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-700 mb-2">Date Range</label>
            <DatePicker
              selectsRange={true}
              startDate={filters.startDate}
              endDate={filters.endDate}
              onChange={handleDateChange}
              isClearable={true}
              placeholderText="Select date range"
              className="border border-gray-300 px-4 py-2 rounded-lg text-gray-700 text-sm 
                         focus:outline-none focus:ring-2 focus:ring-indigo-500 shadow-sm w-52"
            />
          </div>

          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-700 mb-2">Employee</label>
            <select
              name="employee"
              value={filters.employee}
              onChange={handleInputChange}
              className="appearance-none border border-gray-300 bg-white px-4 py-2 pr-10 rounded-lg text-gray-700 text-sm 
                         focus:outline-none focus:ring-2 focus:ring-indigo-500 shadow-sm w-44 bg-no-repeat"
              style={{ backgroundImage: customArrow, backgroundPosition: 'right 0.5rem center', backgroundSize: '1.5em 1.5em' }}
            >
              <option value="all">All Employees</option>
            </select>
          </div>

          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-700 mb-2">Department</label>
            <select
              name="department"
              value={filters.department}
              onChange={handleInputChange}
              className="appearance-none border border-gray-300 bg-white px-4 py-2 pr-10 rounded-lg text-gray-700 text-sm 
                         focus:outline-none focus:ring-2 focus:ring-indigo-500 shadow-sm w-44 bg-no-repeat"
              style={{ backgroundImage: customArrow, backgroundPosition: 'right 0.5rem center', backgroundSize: '1.5em 1.5em' }}
            >
              <option value="all">All Departments</option>
            </select>
          </div>

          <div className="flex gap-3 ml-auto">
            <Button onClick={applyFilters} variant="primary">
              Apply
            </Button>
            <Button onClick={clearFilters} variant="secondary">
              Clear
            </Button>
          </div>
        </div>
      </div>

      {/* Table Section */}
      <div className="block w-full overflow-x-auto">
        <table className="items-center w-full border-collapse">
          <thead>
            <tr>
              {columns.map((column, index) => (
                <th
                  key={index}
                  className="px-6 py-3 border-b text-xs uppercase font-semibold text-left bg-slate-50 text-slate-600"
                >
                  {column}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((row, rowIndex) => (
              <tr
                key={rowIndex}
                className="hover:bg-slate-50 transition-colors duration-150"
              >
                <td className="border-b border-slate-100 px-6 py-4 text-sm text-gray-700 whitespace-nowrap">{row.employee}</td>
                <td className="border-b border-slate-100 px-6 py-4 text-sm text-gray-700 whitespace-nowrap">{row.department}</td>
                <td className="border-b border-slate-100 px-6 py-4 text-sm text-gray-700 whitespace-nowrap">{row.date}</td>
                <td className="border-b border-slate-100 px-6 py-4 text-sm text-gray-700 whitespace-nowrap">{row.checkIn}</td>
                <td className="border-b border-slate-100 px-6 py-4 text-sm text-gray-700 whitespace-nowrap">{row.checkOut}</td>
                <td className="border-b border-slate-100 px-6 py-4 text-sm text-gray-700 whitespace-nowrap">{row.duration}</td>
                <td className="border-b border-slate-100 px-6 py-4 text-sm text-gray-700 whitespace-nowrap">{row.location}</td>
                <td className="border-b border-slate-100 px-6 py-4 text-sm text-gray-700 whitespace-nowrap">
                  <div className="flex items-center">
                    {/* This will now work correctly because of the safelist */}
                    <FaCircle className={`text-${row.status.color}-500 mr-2`} />
                    {row.status.text}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

CardTable.defaultProps = {
  title: "Attendance Records",
  columns: [],
  data: [],
};

CardTable.propTypes = {
  title: PropTypes.string,
  columns: PropTypes.arrayOf(PropTypes.string),
  data: PropTypes.arrayOf(PropTypes.object),
};
