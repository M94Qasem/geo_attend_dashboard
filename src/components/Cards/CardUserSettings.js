import React from "react";
import Button from "../Elements/Button"; // Using our reusable button

export default function CardUserSettings() {
  // Mock data for demonstration
  const users = [
    { id: 1, name: "John Doe", email: "john.doe@example.com", department: "IT", role: "Admin" },
    { id: 2, name: "Jane Smith", email: "jane.smith@example.com", department: "HR", role: "Manager" },
    { id: 3, name: "Sam Wilson", email: "sam.wilson@example.com", department: "Operations", role: "Employee" },
  ];

  return (
    <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-white">
      <div className="rounded-t mb-0 px-4 py-3 border-b">
        <div className="flex flex-wrap items-center">
          <div className="relative w-full px-4 max-w-full flex-grow flex-1">
            <h3 className="font-semibold text-lg text-slate-700">User Management</h3>
          </div>
          <div className="relative w-full px-4 max-w-full flex-grow flex-1 text-right">
            <Button variant="primary">Add New User</Button>
          </div>
        </div>
      </div>
      <div className="block w-full overflow-x-auto">
        <table className="items-center w-full bg-transparent border-collapse">
          <thead>
            <tr>
              <th className="px-6 bg-slate-50 text-slate-500 align-middle border py-3 text-xs uppercase whitespace-nowrap font-semibold text-left">User</th>
              <th className="px-6 bg-slate-50 text-slate-500 align-middle border py-3 text-xs uppercase whitespace-nowrap font-semibold text-left">Department</th>
              <th className="px-6 bg-slate-50 text-slate-500 align-middle border py-3 text-xs uppercase whitespace-nowrap font-semibold text-left">Role</th>
              <th className="px-6 bg-slate-50 text-slate-500 align-middle border py-3 text-xs uppercase whitespace-nowrap font-semibold text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user.id}>
                <th className="border-t-0 px-6 align-middle text-xs whitespace-nowrap p-4 text-left flex items-center">
                  <span className="ml-3 font-bold text-slate-600">{user.name}</span>
                </th>
                <td className="border-t-0 px-6 align-middle text-xs whitespace-nowrap p-4">{user.department}</td>
                <td className="border-t-0 px-6 align-middle text-xs whitespace-nowrap p-4">{user.role}</td>
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
