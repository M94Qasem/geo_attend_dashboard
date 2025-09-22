import React from "react";
import { FaCheckCircle, FaExclamationCircle } from "react-icons/fa";

export default function CardLiveFeed() {
  // 1. بيانات وهمية مع تفاصيل إضافية للحالات المختلفة
  const records = [
    { id: 1, name: "Ali Ahmed", time: "08:05 AM", geofence: "Zallaf HQ", network: "OK", isLate: false },
    { id: 2, name: "Sara Omar", time: "08:17 AM", geofence: "Field Office", network: "OK", isLate: true },
    { id: 3, name: "Karim Said", time: "08:25 AM", geofence: "Zallaf HQ", network: "Failed", isLate: true },
    { id: 4, name: "Nora Fathi", time: "07:58 AM", geofence: "Zallaf HQ", network: "OK", isLate: false },
  ];

  // 2. دالة لتحديد لون خلفية الصف بناءً على حالته
  const getRowClass = (record) => {
    if (record.network === "Failed") return "bg-red-50 hover:bg-red-100";
    if (record.isLate) return "bg-orange-50 hover:bg-orange-100";
    return "hover:bg-slate-50"; // لون افتراضي عند التحويم
  };

  return (
    // 3. تصميم البطاقة ليكون مرناً ويملأ المساحة المتاحة
    <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded-lg h-full">
      <div className="rounded-t mb-0 px-4 py-3 border-0">
        <div className="flex flex-wrap items-center">
          <div className="relative w-full px-4 max-w-full flex-grow flex-1">
            <h3 className="font-semibold text-base text-slate-700">
              Live Attendance Feed
            </h3>
          </div>
        </div>
      </div>
      <div className="block w-full overflow-x-auto">
        {/* 4. جدول بتصميم حديث */}
        <table className="items-center w-full bg-transparent border-collapse">
          <thead>
            <tr>
              <th className="px-6 align-middle border-b-2 border-slate-100 py-3 text-xs uppercase whitespace-nowrap font-semibold text-left text-slate-500">
                Employee
              </th>
              <th className="px-6 align-middle border-b-2 border-slate-100 py-3 text-xs uppercase whitespace-nowrap font-semibold text-left text-slate-500">
                Time
              </th>
              <th className="px-6 align-middle border-b-2 border-slate-100 py-3 text-xs uppercase whitespace-nowrap font-semibold text-left text-slate-500">
                Location
              </th>
              <th className="px-6 align-middle border-b-2 border-slate-100 py-3 text-xs uppercase whitespace-nowrap font-semibold text-center text-slate-500">
                Network
              </th>
            </tr>
          </thead>
          <tbody>
            {records.map((r) => (
              <tr key={r.id} className={`${getRowClass(r)} transition-colors duration-150`}>
                <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left">
                  {r.name}
                </th>
                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                  {r.time}
                </td>
                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                  {r.geofence}
                </td>
                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-center">
                  {/* 5. استخدام أيقونات للحالة */}
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
