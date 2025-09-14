import React, { useState } from "react";
import PropTypes from "prop-types";
import DatePicker from "react-datepicker";

// استيراد ملف الأنماط الخاص بمكتبة التاريخ
import "react-datepicker/dist/react-datepicker.css";

export default function CardTable({ title, columns, data }) {
  // 1. إدارة حالة الفلاتر باستخدام useState
  const [filters, setFilters] = useState({
    startDate: null,
    endDate: null,
    employee: "all",
    department: "all",
  });

  // 2. دالة لتحديث نطاق التاريخ
  const handleDateChange = (dates) => {
    const [start, end] = dates;
    setFilters({ ...filters, startDate: start, endDate: end });
  };

  // دالة عامة لتحديث باقي حقول الإدخال
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value });
  };

  // 3. دوال التحكم في الفلاتر
  const applyFilters = () => {
    console.log("Applying Filters:", filters);
    // الخطوة التالية: سيتم استدعاء الـ API من هنا مع إرسال كائن الفلاتر
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

  return (
    <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded bg-white">
      
      {/* Card Header */}
      <div className="rounded-t mb-0 px-6 py-4 border-0">
        <div className="flex flex-wrap items-center">
          <div className="relative w-full max-w-full flex-grow flex-1">
            <h3 className="font-semibold text-lg text-blueGray-700">{title}</h3>
          </div>
        </div>
      </div>

      {/* --- قسم الفلاتر التفاعلي مع المسافات الصحيحة --- */}
      <div className="px-6 py-4 border-t border-b border-blueGray-200 bg-gray-50">
        <div className="flex flex-wrap items-end gap-4">

          {/* فلتر نطاق التاريخ */}
          <div className="flex flex-col flex-grow min-w-[200px]">
            <label className="text-sm font-medium text-gray-600 mb-1">Date Range</label>
            <DatePicker
              selectsRange={true}
              startDate={filters.startDate}
              endDate={filters.endDate}
              onChange={handleDateChange}
              isClearable={true}
              placeholderText="Select date range"
              className="border border-gray-300 px-3 py-2 rounded-lg text-gray-700 text-sm 
                         focus:outline-none focus:ring-2 focus:ring-indigo-500 shadow-sm w-full"
            />
          </div>

          {/* فلتر الموظف */}
          <div className="flex flex-col flex-grow min-w-[180px]">
            <label className="text-sm font-medium text-gray-600 mb-1">Employee</label>
            <select 
              name="employee"
              value={filters.employee}
              onChange={handleInputChange}
              className="border border-gray-300 px-3 py-2 rounded-lg text-gray-700 text-sm 
                         focus:outline-none focus:ring-2 focus:ring-indigo-500 shadow-sm">
              <option value="all">All Employees</option>
              {/* سيتم ملء هذه الخيارات من الـ API لاحقاً */}
            </select>
          </div>

          {/* فلتر القسم */}
          <div className="flex flex-col flex-grow min-w-[180px]">
            <label className="text-sm font-medium text-gray-600 mb-1">Department</label>
            <select 
              name="department"
              value={filters.department}
              onChange={handleInputChange}
              className="border border-gray-300 px-3 py-2 rounded-lg text-gray-700 text-sm 
                         focus:outline-none focus:ring-2 focus:ring-indigo-500 shadow-sm">
              <option value="all">All Departments</option>
              {/* سيتم ملء هذه الخيارات من الـ API لاحقاً */}
            </select>
          </div>

          {/* أزرار الإجراءات */}
          <div className="flex gap-2">
            <button
              className="bg-indigo-500 hover:bg-indigo-600 text-white font-semibold px-4 py-2 
                         rounded-lg shadow-sm transition-all duration-200 text-sm"
              type="button"
              onClick={applyFilters}
            >
              Apply
            </button>
            <button
              className="bg-gray-500 hover:bg-gray-600 text-white font-semibold px-4 py-2 
                         rounded-lg shadow-sm transition-all duration-200 text-sm"
              type="button"
              onClick={clearFilters}
            >
              Clear
            </button>
          </div>
        </div>
      </div>
      {/* --- نهاية قسم الفلاتر --- */}

      {/* قسم الجدول */}
      <div className="block w-full overflow-x-auto">
        <table className="items-center w-full bg-transparent border-collapse">
          <thead>
            <tr>
              {columns.map((column, index) => (
                <th
                  key={index}
                  className="px-6 align-middle border border-solid py-3 text-xs uppercase 
                             border-l-0 border-r-0 whitespace-nowrap font-semibold text-left 
                             bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                >
                  {column}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((row, rowIndex) => (
              <tr key={rowIndex}>
                <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs 
                               whitespace-nowrap p-4 text-left">
                  {row.employee}
                </th>
                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs 
                               whitespace-nowrap p-4">
                  {row.department}
                </td>
                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs 
                               whitespace-nowrap p-4">
                  {row.date}
                </td>
                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs 
                               whitespace-nowrap p-4">
                  {row.checkIn}
                </td>
                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs 
                               whitespace-nowrap p-4">
                  {row.checkOut}
                </td>
                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs 
                               whitespace-nowrap p-4">
                  {row.duration}
                </td>
                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs 
                               whitespace-nowrap p-4">
                  {row.location}
                </td>
                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs 
                               whitespace-nowrap p-4">
                  <i className={`fas fa-circle text-${row.status.color}-500 mr-2`}></i>
                  {row.status.text}
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
  title: "Table",
  columns: [],
  data: [],
};

CardTable.propTypes = {
  title: PropTypes.string,
  columns: PropTypes.arrayOf(PropTypes.string),
  data: PropTypes.arrayOf(PropTypes.object),
};
