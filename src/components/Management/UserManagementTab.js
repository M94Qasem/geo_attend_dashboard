import React, { useState } from "react";
import { FaEdit, FaTrashAlt, FaPlus } from "react-icons/fa";

// بيانات وهمية للمستخدمين
const mockUsers = [
  { id: 1, name: "Admin User", email: "admin@example.com", role: "Admin", department: "IT" },
  { id: 2, name: "Manager One", email: "manager1@example.com", role: "Manager", department: "Sales" },
  { id: 3, name: "User Alpha", email: "user.alpha@example.com", role: "User", department: "Sales" },
  { id: 4, name: "Manager Two", email: "manager2@example.com", role: "Manager", department: "Engineering" },
  { id: 5, name: "User Bravo", email: "user.bravo@example.com", role: "User", department: "Engineering" },
  { id: 6, name: "Jane Doe", email: "jane.doe@example.com", role: "User", department: "HR" },
];

export default function UserManagementTab() {
  // eslint-disable-next-line no-unused-vars
  const [users, setUsers] = useState(mockUsers);

  const handleAction = (action, userId) => {
    alert(`Action: ${action} on User ID: ${userId}`);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md border border-slate-200">
      {/* 1. تطبيق الـ Toolbar الموحد الذي اقترحته */}
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-slate-800">Users Management</h3>
        <div className="flex gap-2">
          <button className="bg-sky-600 text-white px-4 py-2 rounded-md shadow hover:bg-sky-700 flex items-center gap-2 text-sm font-medium">
            <FaPlus /> Add User
          </button>
          <button className="bg-slate-100 text-slate-700 px-4 py-2 rounded-md border border-slate-300 hover:bg-slate-200 text-sm font-medium">
            Export CSV
          </button>
        </div>
      </div>
      
      {/* 2. استخدام جدول HTML مباشر ونظيف بدلاً من CardTable */}
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-slate-200">
          <thead className="bg-slate-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Department</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Role</th>
              <th className="px-6 py-3 text-center text-xs font-medium text-slate-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-slate-200">
            {users.map(user => (
              <tr key={user.id} className="hover:bg-slate-50 transition-colors">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-slate-900">{user.name}</div>
                  <div className="text-sm text-slate-500">{user.email}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">{user.department}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    user.role === 'Admin' ? 'bg-green-100 text-green-800' :
                    user.role === 'Manager' ? 'bg-blue-100 text-blue-800' :
                    'bg-slate-100 text-slate-800'
                  }`}>
                    {user.role}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-center text-sm font-medium">
                   <div className="flex items-center justify-center gap-4">
                      <button onClick={() => handleAction('edit', user.id)} className="text-slate-500 hover:text-sky-600 transition-colors" title="Edit Role"><FaEdit size={16} /></button>
                      <button onClick={() => handleAction('delete', user.id)} className="text-slate-500 hover:text-red-600 transition-colors" title="Delete User"><FaTrashAlt size={16} /></button>
                    </div>
                </td>
              </tr>
            ))}
            {users.length === 0 && (
                <tr>
                  <td colSpan="4" className="text-center py-10 text-slate-500">
                    No users found.
                  </td>
                </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
