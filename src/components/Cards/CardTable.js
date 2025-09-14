import React from "react";
import PropTypes from "prop-types";

export default function CardTable({ title, columns, data }) {
  return (
    <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded bg-white">
      
      {/* Card Header */}
      <div className="rounded-t mb-0 px-6 py-4 border-0">
        <div className="flex flex-wrap items-center">
          <div className="relative w-full max-w-full flex-grow flex-1">
            <h3 className="font-semibold text-lg text-blueGray-700">
              {title}
            </h3>
          </div>
        </div>
      </div>

      {/* --- Filters Section --- */}
      <div className="px-6 py-4 border-t border-b border-blueGray-200 bg-gray-50">
        <div className="flex flex-col md:flex-row md:items-end gap-4">

          {/* Date Filter */}
          <div className="flex flex-col w-full md:w-1/4">
            <label className="text-sm font-medium text-gray-600 mb-1">
              Date
            </label>
            <input
              type="text"
              placeholder="mm/dd/yyyy"
              className="border border-gray-300 px-3 py-2 rounded-lg text-gray-700 text-sm 
                         focus:outline-none focus:ring-2 focus:ring-indigo-500 shadow-sm"
            />
          </div>

          {/* Employee Filter */}
          <div className="flex flex-col w-full md:w-1/4">
            <label className="text-sm font-medium text-gray-600 mb-1">
              Employee
            </label>
            <select className="border border-gray-300 px-3 py-2 rounded-lg text-gray-700 text-sm 
                               focus:outline-none focus:ring-2 focus:ring-indigo-500 shadow-sm">
              <option>All Employees</option>
            </select>
          </div>

          {/* Department Filter */}
          <div className="flex flex-col w-full md:w-1/4">
            <label className="text-sm font-medium text-gray-600 mb-1">
              Department
            </label>
            <select className="border border-gray-300 px-3 py-2 rounded-lg text-gray-700 text-sm 
                               focus:outline-none focus:ring-2 focus:ring-indigo-500 shadow-sm">
              <option>All Departments</option>
            </select>
          </div>

          {/* Export Button */}
          <div className="flex w-full md:w-auto justify-start md:justify-end">
            <button
              className="bg-indigo-500 hover:bg-indigo-700 text-white font-semibold px-6 py-2 
                         rounded-lg shadow transition-all duration-200"
              type="button"
            >
              Export
            </button>
          </div>
        </div>
      </div>
      {/* --- End Filters Section --- */}

      {/* Table Section */}
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
