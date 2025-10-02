// src/components/Cards/CardAnalyticsTable.js

import React, { useState } from "react";
import PropTypes from "prop-types";
// ✅ استيراد الأيقونات اللازمة
import { FaCircle, FaFileExcel } from "react-icons/fa";

// خريطة لترجمة الألوان إلى كلاسات Tailwind كاملة
const statusColorMap = {
  emerald: "text-emerald-500",
  orange: "text-orange-500",
  red: "text-red-500",
  yellow: "text-yellow-500",
  amber: "text-amber-500",
};

export default function CardAnalyticsTable({ title, columns, data }) {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 7;

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(data.length / itemsPerPage);

  const handleNextPage = () => { if (currentPage < totalPages) setCurrentPage(currentPage + 1); };
  const handlePrevPage = () => { if (currentPage > 1) setCurrentPage(currentPage - 1); };

  // وظيفة وهمية لزر التصدير
  const exportData = () => {
    console.log("Exporting table data...");
    // سيتم هنا إضافة منطق تصدير البيانات إلى Excel
  };

  return (
    <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-xl bg-white dark:bg-slate-800">
      {/* Card Header */}
      <div className="rounded-t mb-0 px-4 py-3 border-0">
        <div className="flex flex-wrap items-center justify-between">
          <h3 className="font-semibold text-lg text-slate-700 dark:text-white">
            {title}
          </h3>
          {/* ✅ إضافة زر التصدير هنا */}
          <button
            onClick={exportData}
            className="flex items-center gap-2 bg-emerald-500 text-white font-bold text-xs px-4 py-2 rounded-lg shadow hover:shadow-md outline-none focus:outline-none"
          >
            <FaFileExcel /> Export to Excel
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="block w-full overflow-x-auto">
        <table className="items-center w-full bg-transparent border-collapse">
          <thead>
            <tr>
              {columns.map((column, index) => (
                <th key={index} className="px-6 bg-slate-50 dark:bg-slate-700 text-slate-500 dark:text-slate-400 align-middle border border-solid border-slate-100 dark:border-slate-600 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                  {column}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {currentItems.map((row, rowIndex) => (
              <tr key={rowIndex} className="hover:bg-slate-50 dark:hover:bg-slate-700">
                <td className="border-t-0 dark:border-slate-700 px-6 align-middle text-sm whitespace-nowrap p-4 text-slate-700 dark:text-slate-300">{row.date}</td>
                <td className="border-t-0 dark:border-slate-700 px-6 align-middle text-sm whitespace-nowrap p-4 text-slate-700 dark:text-slate-300">{row.employee}</td>
                <td className="border-t-0 dark:border-slate-700 px-6 align-middle text-sm whitespace-nowrap p-4 text-slate-700 dark:text-slate-300">{row.checkIn}</td>
                <td className="border-t-0 dark:border-slate-700 px-6 align-middle text-sm whitespace-nowrap p-4 text-slate-700 dark:text-slate-300">{row.checkOut}</td>
                <td className="border-t-0 dark:border-slate-700 px-6 align-middle text-sm whitespace-nowrap p-4 text-slate-700 dark:text-slate-300">{row.duration}</td>
                <td className="border-t-0 dark:border-slate-700 px-6 align-middle text-sm whitespace-nowrap p-4">
                  <div className="flex items-center text-slate-700 dark:text-slate-300">
                    <FaCircle className={`mr-2 ${statusColorMap[row.status.color] || 'text-slate-500'}`} />
                    {row.status.text}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination Footer */}
      <div className="rounded-b px-4 py-3 border-t border-slate-200 dark:border-slate-700 flex justify-between items-center print:hidden">
        <span className="text-sm text-slate-500 dark:text-slate-400">
          Page {currentPage} of {totalPages}
        </span>
        <div className="flex gap-2">
          <button onClick={handlePrevPage} disabled={currentPage === 1} className="bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300 px-4 py-2 text-sm font-semibold rounded-md disabled:opacity-50 disabled:cursor-not-allowed dark:hover:bg-slate-600">
            Previous
          </button>
          <button onClick={handleNextPage} disabled={currentPage === totalPages} className="bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300 px-4 py-2 text-sm font-semibold rounded-md disabled:opacity-50 disabled:cursor-not-allowed dark:hover:bg-slate-600">
            Next
          </button>
        </div>
      </div>
    </div>
  );
}

CardAnalyticsTable.propTypes = {
  title: PropTypes.string,
  columns: PropTypes.arrayOf(PropTypes.string),
  data: PropTypes.arrayOf(PropTypes.object),
};
