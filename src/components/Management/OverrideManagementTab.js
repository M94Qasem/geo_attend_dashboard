// src/components/Management/OverrideManagementTab.js

import React, { useState } from "react";
import { FaCheck, FaTimes } from "react-icons/fa";

// بيانات وهمية لطلبات التجاوز
const mockOverrides = [
  { id: 1, employee: "User Bravo", date: "2024-10-26", requestedTime: "09:05 AM", reason: "Forgot my ID card, security let me in." },
  { id: 2, employee: "Layla Mustafa", date: "2024-10-26", requestedTime: "09:25 AM", reason: "Client meeting ran late, have email proof." },
  { id: 3, employee: "Manager One", date: "2024-10-25", requestedTime: "17:30 PM", reason: "Had to stay late to finish project report." },
];

export default function OverrideManagementTab() {
  const [overrides, setOverrides] = useState(mockOverrides);

  const handleAction = (action, overrideId) => {
    alert(`Action: ${action} on Override ID: ${overrideId}`);
    setOverrides(prev => prev.filter(o => o.id !== overrideId));
  };

  return (
    <div className="p-4">
      {/* ✅ 1. تعديل الحاوية الرئيسية للوضع الليلي */}
      <div className="bg-white dark:bg-slate-800 rounded-lg shadow-md border border-slate-200 dark:border-slate-700 overflow-hidden">
        {/* ✅ 2. تعديل رأس البطاقة للوضع الليلي */}
        <div className="p-4 border-b border-slate-200 dark:border-slate-700">
          <h3 className="text-lg font-semibold text-slate-800 dark:text-white">Pending Override Requests</h3>
          <p className="text-sm text-slate-500 dark:text-slate-400">Review and approve or reject manual attendance entries.</p>
        </div>
        
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-slate-200 dark:divide-slate-700">
            {/* ✅ 3. تعديل رأس الجدول للوضع الليلي */}
            <thead className="bg-slate-50 dark:bg-slate-700">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">Employee</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">Details</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">Reason</th>
                <th className="px-6 py-3 text-center text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            {/* ✅ 4. تعديل جسم الجدول للوضع الليلي */}
            <tbody className="bg-white dark:bg-slate-800 divide-y divide-slate-200 dark:divide-slate-700">
              {overrides.map((override) => (
                <tr key={override.id} className="hover:bg-slate-50 dark:hover:bg-slate-700/50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-slate-900 dark:text-white">{override.employee}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500 dark:text-slate-400">
                    <div>{override.date}</div>
                    <div>{override.requestedTime}</div>
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-500 dark:text-slate-400 max-w-sm whitespace-normal">{override.reason}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-center text-sm font-medium">
                    <div className="flex items-center justify-center gap-3">
                      <button 
                        onClick={() => handleAction('approve', override.id)} 
                        className="flex items-center gap-2 bg-emerald-500 text-white font-bold py-2 px-4 rounded-md hover:bg-emerald-600 transition-colors"
                        title="Approve Request"
                      >
                        <FaCheck /> Approve
                      </button>
                      <button 
                        onClick={() => handleAction('reject', override.id)} 
                        className="flex items-center gap-2 bg-red-500 text-white font-bold py-2 px-4 rounded-md hover:bg-red-600 transition-colors"
                        title="Reject Request"
                      >
                        <FaTimes /> Reject
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {overrides.length === 0 && (
                <tr>
                  <td colSpan="4" className="text-center py-10 text-slate-500 dark:text-slate-400">
                    No pending override requests. Great job!
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
