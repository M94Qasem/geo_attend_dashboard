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
    // إزالة الطلب من القائمة بعد معالجته
    setOverrides(prev => prev.filter(o => o.id !== overrideId));
  };

  return (
    <div className="p-4">
      <div className="bg-white rounded-lg shadow-md border border-slate-200 overflow-hidden">
        <div className="p-4 border-b border-slate-200">
          <h3 className="text-lg font-semibold text-slate-800">Pending Override Requests</h3>
          <p className="text-sm text-slate-500">Review and approve or reject manual attendance entries.</p>
        </div>
        
        {/* 1. إضافة حاوية التمرير الأفقي للجدول */}
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-slate-200">
            <thead className="bg-slate-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Employee</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Details</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Reason</th>
                <th className="px-6 py-3 text-center text-xs font-medium text-slate-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-slate-200">
              {overrides.map((override) => (
                <tr key={override.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-slate-900">{override.employee}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">
                    <div>{override.date}</div>
                    <div>{override.requestedTime}</div>
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-500 max-w-sm whitespace-normal">{override.reason}</td>
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
                  <td colSpan="4" className="text-center py-10 text-slate-500">
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
