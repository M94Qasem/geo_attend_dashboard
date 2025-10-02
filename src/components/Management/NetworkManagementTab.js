// src/components/Management/NetworkManagementTab.js

import React, { useState, Fragment } from "react";
import { FaTrashAlt, FaPlus } from "react-icons/fa";
import { Listbox, Transition } from '@headlessui/react';
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid';

// بيانات وهمية لقواعد الشبكة
const mockRules = [
  { id: 1, type: "SSID", value: "Company_WiFi_Main" },
  { id: 2, type: "BSSID", value: "00:1A:2B:3C:4D:5E" },
  { id: 3, type: "IP Subnet", value: "192.168.1.0/24" },
];

const ruleTypes = ["SSID", "BSSID", "IP Subnet", "Domain"];

export default function NetworkManagementTab() {
  const [rules, setRules] = useState(mockRules);
  const [selectedType, setSelectedType] = useState(ruleTypes[0]);

  const handleAction = (action, ruleId) => {
    alert(`Action: ${action} on Rule ID: ${ruleId}`);
  };

  return (
    <div className="p-4">
      {/* ✅ 1. تعديل الحاوية الرئيسية للوضع الليلي */}
      <div className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-md border border-slate-200 dark:border-slate-700">
        <h3 className="text-lg font-semibold text-slate-800 dark:text-white mb-4">Add New Network Rule</h3>
        
        {/* ✅ 2. تعديل فورم الإضافة للوضع الليلي */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end mb-6 pb-6 border-b border-slate-200 dark:border-slate-700">
          <div className="md:col-span-1">
            <Listbox value={selectedType} onChange={setSelectedType}>
              <div className="relative">
                <Listbox.Label className="block text-sm font-medium text-slate-600 dark:text-slate-400 mb-1">Rule Type</Listbox.Label>
                {/* ✅ 3. تعديل زر Listbox للوضع الليلي */}
                <Listbox.Button className="relative w-full cursor-default rounded-lg bg-white dark:bg-slate-700 py-2 pl-3 pr-10 text-left shadow-sm border border-slate-300 dark:border-slate-600 focus:outline-none focus-visible:border-sky-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-sky-300 sm:text-sm">
                  <span className="block truncate text-slate-900 dark:text-white">{selectedType}</span>
                  <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                    <ChevronUpDownIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                  </span>
                </Listbox.Button>
                <Transition as={Fragment} leave="transition ease-in duration-100" leaveFrom="opacity-100" leaveTo="opacity-0">
                  {/* ✅ 4. تعديل قائمة الخيارات للوضع الليلي */}
                  <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white dark:bg-slate-700 py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm z-10">
                    {ruleTypes.map((type, typeIdx) => (
                      <Listbox.Option key={typeIdx} className={({ active }) => `relative cursor-default select-none py-2 pl-10 pr-4 ${active ? 'bg-sky-100 dark:bg-sky-600 text-sky-900 dark:text-white' : 'text-gray-900 dark:text-gray-300'}`} value={type}>
                        {({ selected }) => (
                          <>
                            <span className={`block truncate ${selected ? 'font-medium' : 'font-normal'}`}>{type}</span>
                            {selected ? (<span className="absolute inset-y-0 left-0 flex items-center pl-3 text-sky-600 dark:text-sky-400"><CheckIcon className="h-5 w-5" aria-hidden="true" /></span>) : null}
                          </>
                        )}
                      </Listbox.Option>
                    ))}
                  </Listbox.Options>
                </Transition>
              </div>
            </Listbox>
          </div>
          <div className="md:col-span-1">
            <label className="block text-sm font-medium text-slate-600 dark:text-slate-400 mb-1">Value</label>
            <input type="text" placeholder="e.g., Company_WiFi" className="w-full border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-700 dark:text-slate-200 rounded-md shadow-sm focus:ring-sky-500 focus:border-sky-500" />
          </div>
          <div>
            <button className="w-full bg-sky-600 text-white font-bold py-2 px-4 rounded-md hover:bg-sky-700 transition-colors flex items-center justify-center gap-2">
              <FaPlus /> Add Rule
            </button>
          </div>
        </div>

        {/* ✅ 5. تعديل جدول العرض للوضع الليلي */}
        <h3 className="text-lg font-semibold text-slate-800 dark:text-white mb-4">Current Rules</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-slate-200 dark:divide-slate-700">
            <thead className="bg-slate-50 dark:bg-slate-700">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">Type</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">Value</th>
                <th className="px-6 py-3 text-center text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-slate-800 divide-y divide-slate-200 dark:divide-slate-700">
              {rules.map(rule => (
                <tr key={rule.id} className="hover:bg-slate-50 dark:hover:bg-slate-700/50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    {/* ✅ 6. تعديل شارة النوع للوضع الليلي */}
                    <span className="px-2 py-1 text-xs font-semibold text-sky-800 bg-sky-100 dark:text-sky-200 dark:bg-sky-900/50 rounded-full">{rule.type}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap font-mono text-sm text-slate-700 dark:text-slate-300">{rule.value}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-center">
                    <button onClick={() => handleAction('delete', rule.id)} className="text-slate-400 hover:text-red-600 dark:hover:text-red-500 transition-colors" title="Delete Rule">
                      <FaTrashAlt />
                    </button>
                  </td>
                </tr>
              ))}
               {rules.length === 0 && (
                <tr>
                  <td colSpan="3" className="text-center py-10 text-slate-500 dark:text-slate-400">No network rules defined yet.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
