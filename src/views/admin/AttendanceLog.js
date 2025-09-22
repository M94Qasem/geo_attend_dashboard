// src/views/admin/AttendanceLog.js

import React, { useState, useMemo, Fragment } from "react";
import { Dialog, Transition } from '@headlessui/react';
import { XMarkIcon as XIcon } from '@heroicons/react/24/outline';
import { FaCheck, FaTimes, FaPlus, FaCheckCircle, FaExclamationTriangle, FaTimesCircle } from "react-icons/fa";

// استيراد المكونات المنفصلة
import AttendanceFilters from "../../components/Cards/AttendanceFilters.js";
import AttendanceActionModal from "../../components/Modals/AttendanceActionModal.js";
import CardTable from "../../components/Cards/CardTable.js";

// --- البيانات والإعدادات ---

// بيانات وهمية شاملة (في تطبيق حقيقي، ستأتي من API)
const mockData = [
    { id: 1, name: "Ahmed Ali", department: "Engineering", location: "HQ", status: "On Time", time: "08:55 AM", ip: "192.168.1.10", device: "Mobile", checkIn: "08:55", checkOut: "17:00", duration: "8h 5m" },
    { id: 2, name: "Fatima Zahra", department: "Marketing", location: "Branch A", status: "Late", time: "09:15 AM", ip: "192.168.2.25", device: "Web", checkIn: "09:15", checkOut: "17:30", duration: "8h 15m" },
    { id: 3, name: "Youssef Hassan", department: "HR", location: "HQ", status: "Absent", time: "N/A", ip: "N/A", device: "N/A", checkIn: "N/A", checkOut: "N/A", duration: "N/A" },
    { id: 4, name: "Sara Ibrahim", department: "Engineering", location: "Remote", status: "On Time", time: "08:50 AM", ip: "10.0.5.12", device: "Mobile", checkIn: "08:50", checkOut: "16:55", duration: "8h 5m" },
    { id: 5, name: "Khalid Omar", department: "Sales", location: "Branch B", status: "Override", time: "09:05 AM", ip: "192.168.3.40", device: "Admin Panel", checkIn: "09:05", checkOut: "17:10", duration: "8h 5m" },
    { id: 6, name: "Omar Abdullah", department: "IT", location: "HQ", status: "Failure", time: "N/A", ip: "192.168.1.55", device: "Mobile", checkIn: "09:00", checkOut: "N/A", duration: "N/A" },
];

// استخراج خيارات الفلاتر من البيانات تلقائيًا
const departmentOptions = [...new Set(mockData.map(item => item.department))].map(dep => ({ value: dep, label: dep }));
const locationOptions = [...new Set(mockData.map(item => item.location))].map(loc => ({ value: loc, label: loc }));


export default function AttendanceLog() {
  // --- الحالات (State Management) ---

  // حالة موحدة للفلاتر
  const [filters, setFilters] = useState({ employee: "", departments: [], locations: [], quick: "" });
  
  // حالة للنافذة المنبثقة (Modal) للإجراءات السريعة
  const [modal, setModal] = useState({ isOpen: false, record: null });
  
  // حالة للوحة الجانبية (Panel) لعرض التفاصيل
  const [panel, setPanel] = useState({ isOpen: false, record: null });

  // --- منطق البيانات (Data Logic) ---

  // تطبيق الفلاتر على البيانات باستخدام useMemo للأداء
  const filteredData = useMemo(() => {
    return mockData.filter(item => {
      const employeeMatch = item.name.toLowerCase().includes(filters.employee.toLowerCase());
      const departmentMatch = filters.departments.length === 0 || filters.departments.some(d => d.value === item.department);
      const locationMatch = filters.locations.length === 0 || filters.locations.some(l => l.value === item.location);
      const quickMatch = filters.quick === "" || item.status === filters.quick;
      return employeeMatch && departmentMatch && locationMatch && quickMatch;
    });
  }, [filters]);

  // --- معالجات الأحداث (Event Handlers) ---

  // دالة لمعالجة الإجراءات القادمة من الجدول
  const handleAction = (type, record) => {
    if (type === "manual") {
      setModal({ isOpen: true, record }); // فتح النافذة المنبثقة للإدخال اليدوي
    } else {
      // في تطبيق حقيقي، ستقوم بتنفيذ استدعاء API هنا
      alert(`Action: '${type}' on employee: ${record.name}`);
    }
  };

  // دالة لفتح لوحة التفاصيل
  const openDetailsPanel = (record) => {
    setPanel({ isOpen: true, record });
  };

  // --- تعريف أعمدة الجدول (Column Definitions) ---

  const columns = useMemo(() => [
    { 
      accessorKey: 'name', 
      header: 'Employee', 
      // عند النقر على الاسم، تفتح لوحة التفاصيل
      cell: info => (
        <span 
          className="font-bold cursor-pointer hover:text-sky-500 transition-colors" 
          onClick={() => openDetailsPanel(info.row.original)}
        >
          {info.getValue()}
        </span>
      ) 
    },
    { accessorKey: 'department', header: 'Department' },
    { accessorKey: 'checkIn', header: 'Check-in' },
    { accessorKey: 'checkOut', header: 'Check-out' },
    { accessorKey: 'duration', header: 'Duration' },
    { 
      accessorKey: 'status', 
      header: 'Status', 
      // عرض الحالة مع أيقونة ولون مميز
      cell: info => {
        const status = info.getValue();
        let icon;
        switch (status) {
          case "On Time": icon = <FaCheckCircle className="text-green-500" />; break;
          case "Late": case "Override": icon = <FaExclamationTriangle className="text-yellow-500" />; break;
          case "Absent": case "Failure": icon = <FaTimesCircle className="text-red-500" />; break;
          default: icon = null;
        }
        return <div className="flex items-center gap-2">{icon}<span>{status}</span></div>;
      }
    },
    {
      id: 'actions', 
      header: 'Actions', 
      // عرض أيقونات الإجراءات السريعة
      cell: ({ row }) => (
        <div className="flex gap-3 justify-center">
          <button className="text-green-500 hover:text-green-700 transition-colors" title="Approve" onClick={() => handleAction('approve', row.original)}><FaCheck /></button>
          <button className="text-red-500 hover:text-red-700 transition-colors" title="Reject" onClick={() => handleAction('reject', row.original)}><FaTimes /></button>
          <button className="text-yellow-500 hover:text-yellow-700 transition-colors" title="Add Manual Entry" onClick={() => handleAction('manual', row.original)}><FaPlus /></button>
        </div>
      )
    },
  ], []);

  // --- العرض (Render) ---

  return (
    <div className="w-full p-4 md:p-6">
      {/* 1. عرض مكون الفلاتر وتمرير الخصائص اللازمة */}
      <AttendanceFilters 
        filters={filters} 
        setFilters={setFilters} 
        departmentOptions={departmentOptions} 
        locationOptions={locationOptions} 
      />
      
      {/* 2. عرض مكون الجدول وتمرير البيانات والأعمدة */}
      <div className="flex flex-wrap mt-4">
        <div className="w-full mb-12">
          <CardTable 
            color="dark" 
            data={filteredData} 
            columns={columns} 
          />
        </div>
      </div>

      {/* 3. عرض النافذة المنبثقة (Modal) عند الحاجة */}
      <AttendanceActionModal 
        isOpen={modal.isOpen} 
        onClose={() => setModal({ isOpen: false, record: null })} 
        record={modal.record} 
        onSave={(r) => console.log("Saved manual entry for:", r)} 
      />
      
      {/* 4. عرض اللوحة الجانبية (Panel) عند الحاجة */}
      <Transition.Root show={panel.isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-40" onClose={() => setPanel({ isOpen: false, record: null })}>
          <Transition.Child as={Fragment} enter="ease-in-out duration-500" enterFrom="opacity-0" enterTo="opacity-100" leave="ease-in-out duration-500" leaveFrom="opacity-100" leaveTo="opacity-0">
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>
          <div className="fixed inset-0 overflow-hidden">
            <div className="absolute inset-0 overflow-hidden">
              <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
                <Transition.Child as={Fragment} enter="transform transition ease-in-out duration-500" enterFrom="translate-x-full" enterTo="translate-x-0" leave="transform transition ease-in-out duration-500" leaveFrom="translate-x-0" leaveTo="translate-x-full">
                  <Dialog.Panel className="pointer-events-auto w-screen max-w-md">
                    <div className="flex h-full flex-col overflow-y-scroll bg-white dark:bg-slate-800 py-6 shadow-xl">
                      <div className="px-4 sm:px-6">
                        <div className="flex items-start justify-between">
                          <Dialog.Title className="text-lg font-medium text-gray-900 dark:text-white">Record Details</Dialog.Title>
                          <div className="ml-3 flex h-7 items-center">
                            <button type="button" className="rounded-md bg-white dark:bg-slate-700 text-gray-400 dark:text-gray-200 hover:text-gray-500 focus:outline-none" onClick={() => setPanel({ isOpen: false, record: null })}>
                              <XIcon className="h-6 w-6" aria-hidden="true" />
                            </button>
                          </div>
                        </div>
                      </div>
                      <div className="relative mt-6 flex-1 px-4 sm:px-6">
                        {panel.record && (
                          <div>
                            <p className="text-sm text-gray-500 dark:text-gray-400">Details for <strong className="text-gray-800 dark:text-white">{panel.record.name}</strong></p>
                            <ul className="mt-4 space-y-2 text-sm">
                              <li className="p-3 bg-slate-100 dark:bg-slate-700/50 rounded-lg"><strong>Status:</strong> {panel.record.status}</li>
                              <li className="p-3 bg-slate-100 dark:bg-slate-700/50 rounded-lg"><strong>Time:</strong> {panel.record.time}</li>
                              <li className="p-3 bg-slate-100 dark:bg-slate-700/50 rounded-lg"><strong>Department:</strong> {panel.record.department}</li>
                              <li className="p-3 bg-slate-100 dark:bg-slate-700/50 rounded-lg"><strong>Location:</strong> {panel.record.location}</li>
                              <li className="p-3 bg-slate-100 dark:bg-slate-700/50 rounded-lg"><strong>IP Address:</strong> {panel.record.ip}</li>
                              <li className="p-3 bg-slate-100 dark:bg-slate-700/50 rounded-lg"><strong>Device:</strong> {panel.record.device}</li>
                            </ul>
                            <div className="mt-6 h-64 bg-gray-200 dark:bg-slate-700 rounded-lg flex items-center justify-center">
                              <p className="text-gray-500">[Map Component Placeholder]</p>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    </div>
  );
}
