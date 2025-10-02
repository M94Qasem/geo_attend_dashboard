// src/components/Cards/CardLiveFeed.js

import React from "react";
import { FaCheckCircle, FaExclamationCircle } from "react-icons/fa";

export default function CardLiveFeed() {
  const records = [
    { id: 1, name: "Ali Ahmed", time: "08:05 AM", geofence: "Zallaf HQ", network: "OK", isLate: false },
    { id: 2, name: "Sara Omar", time: "08:17 AM", geofence: "Field Office", network: "OK", isLate: true },
    { id: 3, name: "Karim Said", time: "08:25 AM", geofence: "Zallaf HQ", network: "Failed", isLate: true },
    { id: 4, name: "Nora Fathi", time: "07:58 AM", geofence: "Zallaf HQ", network: "OK", isLate: false },
  ];

  // ✅ تعديل الدالة لتشمل ألوان الوضع الليلي
  const getRowClass = (record) => {
    if (record.network === "Failed") return "bg-red-50 dark:bg-red-900/30 hover:bg-red-100 dark:hover:bg-red-900/50";
    if (record.isLate) return "bg-orange-50 dark:bg-orange-900/30 hover:bg-orange-100 dark:hover:bg-orange-900/50";
    return "hover:bg-slate-50 dark:hover:bg-slate-700";
  };

  return (
    // ✅ إضافة كلاسات الوضع الليلي للبطاقة
    <div className="relative flex flex-col min-w-0 break-words bg-white dark:bg-slate-800 w-full mb-6 shadow-lg rounded-lg h-full">
      <div className="rounded-t mb-0 px-4 py-3 border-0">
        <div className="flex flex-wrap items-center">
          <div className="relative w-full px-4 max-w-full flex-grow flex-1">
            {/* ✅ تعديل لون النص للوضع الليلي */}
            <h3 className="font-semibold text-base text-slate-700 dark:text-white">
              Live Attendance Feed
            </h3>
          </div>
        </div>
      </div>
      <div className="block w-full overflow-x-auto">
        <table className="items-center w-full bg-transparent border-collapse">
          <thead>
            <tr>
              {/* ✅ تعديل رأس الجدول للوضع الليلي */}
              <th className="px-6 align-middle border-b-2 border-slate-100 dark:border-slate-700 py-3 text-xs uppercase whitespace-nowrap font-semibold text-left text-slate-500 dark:text-slate-400">
                Employee
              </th>
              <th className="px-6 align-middle border-b-2 border-slate-100 dark:border-slate-700 py-3 text-xs uppercase whitespace-nowrap font-semibold text-left text-slate-500 dark:text-slate-400">
                Time
              </th>
              <th className="px-6 align-middle border-b-2 border-slate-100 dark:border-slate-700 py-3 text-xs uppercase whitespace-nowrap font-semibold text-left text-slate-500 dark:text-slate-400">
                Location
              </th>
              <th className="px-6 align-middle border-b-2 border-slate-100 dark:border-slate-700 py-3 text-xs uppercase whitespace-nowrap font-semibold text-center text-slate-500 dark:text-slate-400">
                Network
              </th>
            </tr>
          </thead>
          <tbody>
            {records.map((r) => (
              <tr key={r.id} className={`${getRowClass(r)} transition-colors duration-150`}>
                {/* ✅ تعديل لون نص الصفوف للوضع الليلي */}
                <th className="border-t-0 dark:border-slate-700 px-6 align-middle text-xs whitespace-nowrap p-4 text-left text-slate-700 dark:text-slate-300">
                  {r.name}
                </th>
                <td className="border-t-0 dark:border-slate-700 px-6 align-middle text-xs whitespace-nowrap p-4 text-slate-700 dark:text-slate-300">
                  {r.time}
                </td>
                <td className="border-t-0 dark:border-slate-700 px-6 align-middle text-xs whitespace-nowrap p-4 text-slate-700 dark:text-slate-300">
                  {r.geofence}
                </td>
                <td className="border-t-0 dark:border-slate-700 px-6 align-middle text-xs whitespace-nowrap p-4 text-center">
                  {r.network === "OK" ? (
                    <FaCheckCircle className="text-emerald-500 inline-block" title="Network OK" />
                  ) : (
                    <FaExclamationCircle className="text-red-500 inline-block" title="Network Failed" />
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
