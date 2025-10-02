// src/components/Management/ShiftManagementTab.js

import React, { useState } from "react";
import { FaEdit, FaTrashAlt } from "react-icons/fa";

const mockShifts = [
  { id: 1, name: "Morning Shift", startTime: "09:00", endTime: "17:00", days: ["Sun", "Mon", "Tue", "Wed", "Thu"] },
  { id: 2, name: "Night Shift", startTime: "17:00", endTime: "01:00", days: ["Sun", "Mon", "Tue", "Wed", "Thu"] },
  { id: 3, name: "Weekend Support", startTime: "10:00", endTime: "15:00", days: ["Fri", "Sat"] },
];

const allDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

export default function ShiftManagementTab() {
  const [shifts, setShifts] = useState(mockShifts);
  const [selectedDays, setSelectedDays] = useState([]);

  const handleAction = (action, shiftId) => {
    alert(`Action: ${action} on Shift ID: ${shiftId}`);
  };

  const toggleDay = (day) => {
    setSelectedDays(prevDays =>
      prevDays.includes(day)
        ? prevDays.filter(d => d !== day)
        : [...prevDays, day]
    );
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 p-4">
      
      {/* ✅ 1. تعديل نموذج الإضافة للوضع الليلي */}
      <div className="lg:col-span-1">
        <div className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-md border border-slate-200 dark:border-slate-700">
          <h3 className="text-lg font-semibold text-slate-800 dark:text-white mb-4">Add New Shift</h3>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-600 dark:text-slate-400 mb-1">Shift Name</label>
              <input type="text" placeholder="e.g., Morning Shift" className="w-full border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-700 dark:text-slate-200 rounded-md shadow-sm focus:ring-sky-500 focus:border-sky-500" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-600 dark:text-slate-400 mb-1">Start Time</label>
                <input type="time" className="w-full border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-700 dark:text-slate-200 rounded-md shadow-sm focus:ring-sky-500 focus:border-sky-500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-600 dark:text-slate-400 mb-1">End Time</label>
                <input type="time" className="w-full border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-700 dark:text-slate-200 rounded-md shadow-sm focus:ring-sky-500 focus:border-sky-500" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-600 dark:text-slate-400 mb-1">Days of the Week</label>
              <div className="flex flex-wrap gap-2 mt-2">
                {allDays.map(day => (
                  <button
                    key={day}
                    onClick={() => toggleDay(day)}
                    // ✅ 2. تعديل أزرار الأيام للوضع الليلي
                    className={`px-3 py-1 text-sm border rounded-full transition-colors ${
                      selectedDays.includes(day)
                        ? "bg-sky-500 text-white border-sky-500"
                        : "border-slate-300 dark:border-slate-600 text-slate-600 dark:text-slate-300 hover:bg-sky-100 dark:hover:bg-sky-900/50"
                    }`}
                  >
                    {day}
                  </button>
                ))}
              </div>
            </div>
            <button className="w-full bg-sky-600 text-white font-bold py-2 px-4 rounded-md hover:bg-sky-700 transition-colors">
              + Add Shift
            </button>
          </div>
        </div>
      </div>

      {/* ✅ 3. تعديل جدول العرض للوضع الليلي */}
      <div className="lg:col-span-2">
        <div className="bg-white dark:bg-slate-800 rounded-lg shadow-md border border-slate-200 dark:border-slate-700 overflow-hidden">
          <table className="min-w-full divide-y divide-slate-200 dark:divide-slate-700">
            <thead className="bg-slate-50 dark:bg-slate-700">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">Shift Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">Timings</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">Days</th>
                <th className="px-6 py-3 text-center text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-slate-800 divide-y divide-slate-200 dark:divide-slate-700">
              {shifts.map((shift) => (
                <tr key={shift.id} className="hover:bg-slate-50 dark:hover:bg-slate-700/50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-slate-900 dark:text-white">{shift.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500 dark:text-slate-400">{shift.startTime} - {shift.endTime}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">
                    <div className="flex flex-wrap gap-1">
                      {/* ✅ 4. تعديل شارات الأيام للوضع الليلي */}
                      {shift.days.map(day => <span key={day} className="px-2 py-0.5 text-xs bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 rounded-full">{day}</span>)}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-center text-sm font-medium">
                    <div className="flex items-center justify-center gap-4">
                      {/* ✅ 5. تعديل ألوان أيقونات الإجراءات للوضع الليلي */}
                      <button onClick={() => handleAction('edit', shift.id)} className="text-slate-500 dark:text-slate-400 hover:text-sky-600 dark:hover:text-sky-400 transition-colors" title="Edit Shift"><FaEdit /></button>
                      <button onClick={() => handleAction('delete', shift.id)} className="text-slate-500 dark:text-slate-400 hover:text-red-600 dark:hover:text-red-500 transition-colors" title="Delete Shift"><FaTrashAlt /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
