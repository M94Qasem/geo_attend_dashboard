// src/views/admin/Management.js

import React from "react";
import { Tab } from '@headlessui/react';
import { FaUsers, FaClock, FaMapMarkedAlt, FaWifi, FaExclamationTriangle } from "react-icons/fa";

// استيراد المكونات
import CardStats from "../../components/Cards/CardStats.js";
import UserManagementTab from "../../components/Management/UserManagementTab.js";
import ShiftManagementTab from "../../components/Management/ShiftManagementTab.js";
import GeofenceManagementTab from "../../components/Management/GeofenceManagementTab.js";
import NetworkManagementTab from "../../components/Management/NetworkManagementTab.js";
import OverrideManagementTab from "../../components/Management/OverrideManagementTab.js";

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function Management() {
  const tabs = [
    { name: "Users", icon: <FaUsers className="w-5 h-5" /> },
    { name: "Shifts", icon: <FaClock className="w-5 h-5" /> },
    { name: "Geofences", icon: <FaMapMarkedAlt className="w-5 h-5" /> },
    { name: "Network", icon: <FaWifi className="w-5 h-5" /> },
    { name: "Overrides", icon: <FaExclamationTriangle className="w-5 h-5" /> },
  ];

  return (
    <>
      {/* ✅ 1. تعديل الهيدر للوضع الليلي والطباعة */}
      <div className="relative bg-sky-600 dark:bg-slate-700 md:pt-32 pb-32 pt-12 print:hidden">
        <div className="px-4 md:px-10 mx-auto w-full">
          <div className="flex flex-wrap">
            <div className="w-full lg:w-6/12 xl:w-3/12 px-4">
              <CardStats statSubtitle="Total Users" statTitle="76" icon={<FaUsers />} color="pink" />
            </div>
            <div className="w-full lg:w-6/12 xl:w-3/12 px-4">
              <CardStats statSubtitle="Pending Overrides" statTitle="5" icon={<FaExclamationTriangle />} color="yellow" />
            </div>
            <div className="w-full lg:w-6/12 xl:w-3/12 px-4">
              <CardStats statSubtitle="Active Geofences" statTitle="12" icon={<FaMapMarkedAlt />} color="blue" />
            </div>
            <div className="w-full lg:w-6/12 xl:w-3/12 px-4">
              <CardStats statSubtitle="Network Rules" statTitle="28" icon={<FaWifi />} color="emerald" />
            </div>
          </div>
        </div>
      </div>

      {/* ✅ 2. تعديل حاوية المحتوى للطباعة */}
      <div className="relative px-4 md:px-10 mx-auto w-full -m-24 print:m-0 print:p-0">
        <div className="flex flex-wrap mt-8">
          <div className="w-full mb-12">
            <Tab.Group>
              {/* ✅ 3. تعديل شريط التبويبات للوضع الليلي */}
              <Tab.List className="flex space-x-1 rounded-lg bg-slate-100 dark:bg-slate-700 p-1 mb-6">
                {tabs.map((tab) => (
                  <Tab
                    key={tab.name}
                    className={({ selected }) =>
                      classNames(
                        'flex-1 md:w-auto flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-medium rounded-lg transition-all',
                        'focus:outline-none focus:ring-2 ring-offset-2 ring-offset-sky-400 dark:ring-offset-slate-800 ring-white ring-opacity-60',
                        selected
                          ? 'bg-white dark:bg-slate-800 shadow text-sky-700 dark:text-white'
                          : 'text-slate-500 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-600 hover:text-slate-700 dark:hover:text-slate-200'
                      )
                    }
                  >
                    {tab.icon} {tab.name}
                  </Tab>
                ))}
              </Tab.List>
              {/* نفترض أن المكونات الداخلية للتبويبات تم تعديلها لتدعم الوضع الليلي */}
              <Tab.Panels>
                <Tab.Panel><UserManagementTab /></Tab.Panel>
                <Tab.Panel><ShiftManagementTab /></Tab.Panel>
                <Tab.Panel><GeofenceManagementTab /></Tab.Panel>
                <Tab.Panel><NetworkManagementTab /></Tab.Panel>
                <Tab.Panel><OverrideManagementTab /></Tab.Panel>
              </Tab.Panels>
            </Tab.Group>
          </div>
        </div>
      </div>
    </>
  );
}
