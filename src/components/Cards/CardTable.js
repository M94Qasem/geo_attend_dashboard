import React from "react";
import PropTypes from "prop-types";

export default function CardTable({ title, columns, data }) {
  return (
    <>
      <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded bg-white">
        {/* Card Header */}
        <div className="rounded-t mb-0 px-4 py-3 border-0">
          <div className="flex flex-wrap items-center">
            <div className="relative w-full px-4 max-w-full flex-grow flex-1">
              <h3 className="font-semibold text-lg text-blueGray-700">
                {title}
              </h3>
            </div>
          </div>
        </div>

        {/* START: Redesigned Filters Section */}
        <div className="px-6 py-4 border-t border-b border-blueGray-200 bg-blueGray-50">
          <div className="flex flex-wrap items-center justify-between">
            
            {/* Filters Group */}
            <div className="flex flex-wrap items-center gap-4">
              {/* Date Filter */}
              <div className="flex items-center">
                <label className="text-sm font-bold text-blueGray-500 mr-2">Date:</label>
                <input 
                  type="text" 
                  placeholder="mm/dd/yyyy"
                  className="border-gray-300 rounded-md shadow-sm p-2 text-sm" 
                />
              </div>
              {/* Employee Filter */}
              <div className="flex items-center">
                <label className="text-sm font-bold text-blueGray-500 mr-2">Employee:</label>
                <select className="border-gray-300 rounded-md shadow-sm p-2 text-sm pr-8">
                  <option>All Employees</option>
                </select>
              </div>
              {/* Department Filter */}
              <div className="flex items-center">
                <label className="text-sm font-bold text-blueGray-500 mr-2">Department:</label>
                <select className="border-gray-300 rounded-md shadow-sm p-2 text-sm pr-8">
                  <option>All Departments</option>
                </select>
              </div>
            </div>

            {/* Export Button */}
            <div>
              <button
                className="bg-indigo-500 text-white active:bg-indigo-600 text-xs font-bold uppercase px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none"
                type="button"
              >
                Export
              </button>
            </div>

          </div>
        </div>
        {/* END: Redesigned Filters Section */}

        {/* Table Section */}
        <div className="block w-full overflow-x-auto">
          <table className="items-center w-full bg-transparent border-collapse">
            <thead>
              <tr>
                {columns.map((column, index) => (
                  <th
                    key={index}
                    className="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                  >
                    {column}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {data.map((row, rowIndex) => (
                <tr key={rowIndex}>
                  <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left">
                    {row.employee}
                  </th>
                  <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                    {row.department}
                  </td>
                  <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                    {row.date}
                  </td>
                  <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                    {row.checkIn}
                  </td>
                  <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                    {row.checkOut}
                  </td>
                  <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                    {row.duration}
                  </td>
                  <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                    {row.location}
                  </td>
                  <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                    <i className={`fas fa-circle text-${row.status.color}-500 mr-2`}></i>
                    {row.status.text}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
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
