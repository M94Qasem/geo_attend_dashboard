// Create this new file in: src/components/Cards/CardTopEmployees.js
import React from "react";

export default function CardTopEmployees() {
  return (
    <>
      <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded">
        <div className="rounded-t mb-0 px-4 py-3 border-0">
          <div className="flex flex-wrap items-center">
            <div className="relative w-full px-4 max-w-full flex-grow flex-1">
              <h3 className="font-semibold text-base text-blueGray-700">
                Top 5 Punctual Employees
              </h3>
            </div>
            <div className="relative w-full px-4 max-w-full flex-grow flex-1 text-right">
              <button
                className="bg-indigo-500 text-white active:bg-indigo-600 text-xs font-bold uppercase px-3 py-1 rounded outline-none focus:outline-none mr-1 mb-1"
                type="button"
              >
                See all
              </button>
            </div>
          </div>
        </div>
        <div className="block w-full overflow-x-auto">
          <table className="items-center w-full bg-transparent border-collapse">
            <thead>
              <tr>
                <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border py-3 text-xs uppercase whitespace-nowrap font-semibold text-left">
                  Employee
                </th>
                <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border py-3 text-xs uppercase whitespace-nowrap font-semibold text-left">
                  Department
                </th>
                <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border py-3 text-xs uppercase whitespace-nowrap font-semibold text-left">
                  On-time Percentage
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th className="border-t-0 px-6 align-middle text-xs whitespace-nowrap p-4 text-left">Ali Ahmed</th>
                <td className="border-t-0 px-6 align-middle text-xs whitespace-nowrap p-4">Engineering</td>
                <td className="border-t-0 px-6 align-middle text-xs whitespace-nowrap p-4">
                  <div className="flex items-center">
                    <span className="mr-2">99%</span>
                    <div className="relative w-full"><div className="overflow-hidden h-2 text-xs flex rounded bg-emerald-200"><div style={{ width: "99%" }} className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-emerald-500"></div></div></div>
                  </div>
                </td>
              </tr>
              {/* Add more example rows as needed */}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
