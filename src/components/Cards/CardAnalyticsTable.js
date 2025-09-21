import React, { useState } from "react";
import PropTypes from "prop-types";
import { FaCircle } from "react-icons/fa";

export default function CardAnalyticsTable({ title, columns, data }) {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10; // Show 10 items per page

  // --- Pagination Logic ---
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(data.length / itemsPerPage);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-white">
      {/* Card Header */}
      <div className="rounded-t mb-0 px-4 py-3 border-0">
        <div className="flex flex-wrap items-center">
          <div className="relative w-full px-4 max-w-full flex-grow flex-1">
            <h3 className="font-semibold text-lg text-slate-700">{title}</h3>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="block w-full overflow-x-auto">
        <table className="items-center w-full bg-transparent border-collapse">
          <thead>
            <tr>
              {columns.map((column, index) => (
                <th key={index} className="px-6 bg-slate-50 text-slate-500 align-middle border border-solid border-slate-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                  {column}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {currentItems.map((row, rowIndex) => (
              <tr key={rowIndex} className="hover:bg-slate-50">
                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">{row.date}</td>
                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">{row.employee}</td>
                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">{row.checkIn}</td>
                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">{row.checkOut}</td>
                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">{row.duration}</td>
                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                  <div className="flex items-center">
                    <FaCircle className={`text-${row.status.color}-500 mr-2`} />
                    {row.status.text}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* --- Pagination Footer --- */}
      <div className="rounded-b px-4 py-3 border-t flex justify-between items-center">
        <span className="text-sm text-slate-500">
          Page {currentPage} of {totalPages}
        </span>
        <div className="flex gap-2">
          <button
            onClick={handlePrevPage}
            disabled={currentPage === 1}
            className="bg-slate-200 text-slate-700 px-4 py-2 text-sm font-semibold rounded-md disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Previous
          </button>
          <button
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
            className="bg-slate-200 text-slate-700 px-4 py-2 text-sm font-semibold rounded-md disabled:opacity-50 disabled:cursor-not-allowed"
          >
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
