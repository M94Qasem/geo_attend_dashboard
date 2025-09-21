import React from "react";
import Button from "../Elements/Button";

export default function CardShiftManagement() {
  // Mock data for demonstration
  const shifts = [
    { id: 1, name: "Morning Shift", startTime: "08:00 AM", endTime: "04:00 PM", gracePeriod: "15 mins" },
    { id: 2, name: "Evening Shift", startTime: "04:00 PM", endTime: "12:00 AM", gracePeriod: "15 mins" },
    { id: 3, name: "Night Shift", startTime: "12:00 AM", endTime: "08:00 AM", gracePeriod: "10 mins" },
  ];

  return (
    <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-white">
      <div className="rounded-t mb-0 px-4 py-3 border-b">
        <div className="flex flex-wrap items-center">
          <div className="relative w-full px-4 max-w-full flex-grow flex-1">
            <h3 className="font-semibold text-lg text-slate-700">Shift Management</h3>
          </div>
          <div className="relative w-full px-4 max-w-full flex-grow flex-1 text-right">
            <Button variant="primary">Add New Shift</Button>
          </div>
        </div>
      </div>
      <div className="block w-full overflow-x-auto">
        <table className="items-center w-full bg-transparent border-collapse">
          <thead>
            <tr>
              <th className="px-6 bg-slate-50 text-slate-500 align-middle border py-3 text-xs uppercase whitespace-nowrap font-semibold text-left">Shift Name</th>
              <th className="px-6 bg-slate-50 text-slate-500 align-middle border py-3 text-xs uppercase whitespace-nowrap font-semibold text-left">Start Time</th>
              <th className="px-6 bg-slate-50 text-slate-500 align-middle border py-3 text-xs uppercase whitespace-nowrap font-semibold text-left">End Time</th>
              <th className="px-6 bg-slate-50 text-slate-500 align-middle border py-3 text-xs uppercase whitespace-nowrap font-semibold text-left">Grace Period</th>
              <th className="px-6 bg-slate-50 text-slate-500 align-middle border py-3 text-xs uppercase whitespace-nowrap font-semibold text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {shifts.map(shift => (
              <tr key={shift.id}>
                <th className="border-t-0 px-6 align-middle text-xs whitespace-nowrap p-4 text-left">{shift.name}</th>
                <td className="border-t-0 px-6 align-middle text-xs whitespace-nowrap p-4">{shift.startTime}</td>
                <td className="border-t-0 px-6 align-middle text-xs whitespace-nowrap p-4">{shift.endTime}</td>
                <td className="border-t-0 px-6 align-middle text-xs whitespace-nowrap p-4">{shift.gracePeriod}</td>
                <td className="border-t-0 px-6 align-middle text-xs whitespace-nowrap p-4">
                  <a href="#pablo" className="text-sky-500 hover:text-sky-700">Edit</a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
