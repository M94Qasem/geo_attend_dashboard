import React, { useState, useMemo, Fragment } from "react";
import { Dialog, Transition, Tab } from '@headlessui/react';
import { XMarkIcon as XIcon } from '@heroicons/react/24/outline';
import { FaCheck, FaTimes, FaPlus } from "react-icons/fa";
import Papa from "papaparse";

// استيراد المكونات
import AttendanceFilters from "../../components/Cards/AttendanceFilters.js";
import AttendanceActionModal from "../../components/Modals/AttendanceActionModal.js";
import CardTable from "../../components/Cards/CardTable.js";
import CardStats from "../../components/Cards/CardStats.js";

// --- البيانات والإعدادات ---
const mockData = [
    // بيانات وهمية موسعة لإظهار الترقيم بشكل أفضل
    { id: 1, name: "Ahmed Ali", department: "Engineering", location: "HQ", status: "On Time", time: "08:55 AM", ip: "192.168.1.10", device: "Mobile", checkIn: "08:55", checkOut: "17:00", duration: "8h 5m" },
    { id: 2, name: "Fatima Zahra", department: "Marketing", location: "Branch A", status: "Late", time: "09:15 AM", ip: "192.168.2.25", device: "Web", checkIn: "09:15", checkOut: "17:30", duration: "8h 15m" },
    { id: 3, name: "Youssef Hassan", department: "HR", location: "HQ", status: "Absent", time: "N/A", ip: "N/A", device: "N/A", checkIn: "N/A", checkOut: "N/A", duration: "N/A" },
    { id: 4, name: "Sara Ibrahim", department: "Engineering", location: "Remote", status: "On Time", time: "08:50 AM", ip: "10.0.5.12", device: "Mobile", checkIn: "08:50", checkOut: "16:55", duration: "8h 5m" },
    { id: 5, name: "Khalid Omar", department: "Sales", location: "Branch B", status: "Override", time: "09:05 AM", ip: "192.168.3.40", device: "Admin Panel", checkIn: "09:05", checkOut: "17:10", duration: "8h 5m" },
    { id: 6, name: "Omar Abdullah", department: "IT", location: "HQ", status: "Failure", time: "N/A", ip: "192.168.1.55", device: "Mobile", checkIn: "09:00", checkOut: "N/A", duration: "N/A" },
    { id: 7, name: "Layla Mustafa", department: "Sales", location: "Remote", status: "Late", time: "09:25 AM", ip: "10.0.8.19", device: "Web", checkIn: "09:25", checkOut: "17:40", duration: "8h 15m" },
    { id: 8, name: "Hassan Tarek", department: "HR", location: "HQ", status: "On Time", time: "08:45 AM", ip: "192.168.1.18", device: "Mobile", checkIn: "08:45", checkOut: "16:50", duration: "8h 5m" },
    { id: 9, name: "Aisha Mohammed", department: "IT", location: "Branch B", status: "On Time", time: "08:59 AM", ip: "192.168.3.41", device: "Web", checkIn: "08:59", checkOut: "17:05", duration: "8h 6m" },
];

const departmentOptions = [...new Set(mockData.map(item => item.department))].map(dep => ({ value: dep, label: dep }));
const locationOptions = [...new Set(mockData.map(item => item.location))].map(loc => ({ value: loc, label: loc }));

export default function AttendanceLog() {
  const [filters, setFilters] = useState({ employee: "", departments: [], locations: [], quick: "" });
  const [modal, setModal] = useState({ isOpen: false, record: null });
  const [panel, setPanel] = useState({ isOpen: false, record: null });

  const filteredData = useMemo(() => {
    return mockData.filter(item => {
      const employeeMatch = item.name.toLowerCase().includes(filters.employee.toLowerCase());
      const departmentMatch = filters.departments.length === 0 || filters.departments.some(d => d.value === item.department);
      const locationMatch = filters.locations.length === 0 || filters.locations.some(l => l.value === item.location);
      const quickMatch = filters.quick === "" || item.status === filters.quick;
      return employeeMatch && departmentMatch && locationMatch && quickMatch;
    });
  }, [filters]);

  const handleAction = (type, record) => {
    if (type === "manual") {
      setModal({ isOpen: true, record });
    } else {
      alert(`Action: '${type}' on employee: ${record.name}`);
    }
  };

  const openDetailsPanel = (record) => {
    setPanel({ isOpen: true, record });
  };

  const handleExport = () => {
    const csv = Papa.unparse(filteredData);
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", "attendance_records.csv");
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const columns = useMemo(() => [
    { 
      accessorKey: 'name', 
      header: 'Employee', 
      cell: info => (
        <span className="font-bold cursor-pointer hover:text-sky-500 transition-colors" onClick={() => openDetailsPanel(info.row.original)}>
          {info.getValue()}
        </span>
      ) 
    },
    { accessorKey: 'department', header: 'Department' },
    { accessorKey: 'checkIn', header: 'Check-in' },
    { accessorKey: 'duration', header: 'Duration', cell: info => <span className="font-bold">{info.getValue()}</span> },
    { 
      accessorKey: 'status', 
      header: 'Status', 
      cell: info => {
        const status = info.getValue();
        let colorClasses = "";
        switch (status) {
          case "On Time": colorClasses = "bg-green-100 text-green-800"; break;
          case "Late": colorClasses = "bg-yellow-100 text-yellow-800"; break;
          case "Override": colorClasses = "bg-blue-100 text-blue-800"; break;
          case "Absent": colorClasses = "bg-red-100 text-red-800"; break;
          case "Failure": colorClasses = "bg-purple-100 text-purple-800"; break;
          default: colorClasses = "bg-gray-100 text-gray-800";
        }
        return <span className={`px-2 py-1 font-semibold leading-tight text-xs rounded-full ${colorClasses}`}>{status}</span>;
      }
    },
    {
      id: 'actions', 
      header: 'Actions', 
      cell: ({ row }) => (
        <div className="flex gap-3 justify-center">
          <button className="text-green-500 hover:text-green-700 transition-colors" title="Approve" onClick={() => handleAction('approve', row.original)}><FaCheck /></button>
          <button className="text-red-500 hover:text-red-700 transition-colors" title="Reject" onClick={() => handleAction('reject', row.original)}><FaTimes /></button>
          <button className="text-yellow-500 hover:text-yellow-700 transition-colors" title="Add Manual Entry" onClick={() => handleAction('manual', row.original)}><FaPlus /></button>
        </div>
      )
    },
  ], []);

  return (
    <>
      <div className="relative bg-sky-600 md:pt-32 pb-16 pt-12">
        <div className="px-4 md:px-10 mx-auto w-full">
          {/* خلفية فقط */}
        </div>
      </div>
      
      <div className="px-4 md:px-10 mx-auto w-full -m-24">
        <div className="flex flex-wrap">
            <div className="w-full lg:w-6/12 xl:w-3/12 px-4">
                <CardStats 
                  statSubtitle="ON TIME" 
                  statTitle="350,897" 
                  statArrow="up" 
                  statPercent="3.48" 
                  statPercentColor="text-emerald-500" 
                  statDescripiron="Since last month" 
                  icon="FaUserCheck" 
                  color="green" 
                />
            </div>
            <div className="w-full lg:w-6/12 xl:w-3/12 px-4">
                <CardStats 
                  statSubtitle="LATE" 
                  statTitle="2,356" 
                  statArrow="down" 
                  statPercent="3.48" 
                  statPercentColor="text-red-500" 
                  statDescripiron="Since last week" 
                  icon="FaClock" 
                  color="orange" 
                />
            </div>
            <div className="w-full lg:w-6/12 xl:w-3/12 px-4">
                <CardStats 
                  statSubtitle="ABSENT" 
                  statTitle="924" 
                  statArrow="down" 
                  statPercent="1.10" 
                  statPercentColor="text-orange-500" 
                  statDescripiron="Since yesterday" 
                  icon="FaUserSlash" 
                  color="red" 
                />
            </div>
            <div className="w-full lg:w-6/12 xl:w-3/12 px-4">
                <CardStats 
                  statSubtitle="OVERRIDE" 
                  statTitle="49,65%" 
                  statArrow="up" 
                  statPercent="12" 
                  statPercentColor="text-emerald-500" 
                  statDescripiron="Since last month" 
                  icon="FaExclamationTriangle" 
                  color="blue" 
                />
            </div>
        </div>

        <div className="flex flex-wrap mt-4">
          <div className="w-full mb-12">
            <CardTable 
              color="light" 
              data={filteredData} 
              columns={columns} 
              onExport={handleExport}
              filtersComponent={
                <AttendanceFilters 
                  filters={filters} 
                  setFilters={setFilters} 
                  departmentOptions={departmentOptions} 
                  locationOptions={locationOptions} 
                />
              }
            />
          </div>
        </div>
      </div>

      <AttendanceActionModal isOpen={modal.isOpen} onClose={() => setModal({ isOpen: false, record: null })} record={modal.record} onSave={(r) => console.log("Saved:", r)} />
      
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
                    <div className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
                      <div className="bg-sky-700 py-6 px-4 sm:px-6">
                        <div className="flex items-center justify-between">
                          <Dialog.Title className="text-lg font-medium text-white">Record Details</Dialog.Title>
                          <button type="button" className="rounded-md text-sky-200 hover:text-white" onClick={() => setPanel({ isOpen: false, record: null })}>
                            <XIcon className="h-6 w-6" />
                          </button>
                        </div>
                        <p className="mt-1 text-sm text-sky-300">Details for <strong className="text-white">{panel.record?.name}</strong></p>
                      </div>
                      <div className="relative flex-1">
                        <Tab.Group>
                          <Tab.List className="flex space-x-1 rounded-t-xl bg-sky-900/20 p-1">
                            <Tab className={({ selected }) => `w-full rounded-lg py-2.5 text-sm font-medium leading-5 ${selected ? 'bg-white shadow text-sky-700' : 'text-blue-100 hover:bg-white/[0.12]'}`}>Details</Tab>
                            <Tab className={({ selected }) => `w-full rounded-lg py-2.5 text-sm font-medium leading-5 ${selected ? 'bg-white shadow text-sky-700' : 'text-blue-100 hover:bg-white/[0.12]'}`}>Activity Log</Tab>
                          </Tab.List>
                          <Tab.Panels className="mt-2 p-4">
                            <Tab.Panel>
                              <ul className="space-y-2 text-sm">
                                <li className="p-3 bg-slate-100 rounded-lg"><strong>Status:</strong> {panel.record?.status}</li>
                                <li className="p-3 bg-slate-100 rounded-lg"><strong>Time:</strong> {panel.record?.time}</li>
                                <li className="p-3 bg-slate-100 rounded-lg"><strong>Department:</strong> {panel.record?.department}</li>
                                <li className="p-3 bg-slate-100 rounded-lg"><strong>Location:</strong> {panel.record?.location}</li>
                                <li className="p-3 bg-slate-100 rounded-lg"><strong>IP Address:</strong> {panel.record?.ip}</li>
                                <li className="p-3 bg-slate-100 rounded-lg"><strong>Device:</strong> {panel.record?.device}</li>
                              </ul>
                              <div className="mt-6 h-64 bg-gray-200 rounded-lg flex items-center justify-center">
                                <p className="text-gray-500">[Map Component Placeholder]</p>
                              </div>
                            </Tab.Panel>
                            <Tab.Panel>
                              <div className="text-center py-10 text-slate-500">
                                <p>Activity log for this record will be displayed here.</p>
                                <p className="text-xs">(e.g., Check-in, Override Approved, Manual Entry)</p>
                              </div>
                            </Tab.Panel>
                          </Tab.Panels>
                        </Tab.Group>
                      </div>
                    </div>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    </>
  );
}
