// src/components/Modals/AttendanceActionModal.js
import React from "react";
import { Dialog, Transition } from '@headlessui/react';
import { Fragment } from 'react';

export default function AttendanceActionModal({ isOpen, onClose, record, onSave }) {
  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        <Transition.Child as={Fragment} enter="ease-out duration-300" enterFrom="opacity-0" enterTo="opacity-100" leave="ease-in duration-200" leaveFrom="opacity-100" leaveTo="opacity-0">
          <div className="fixed inset-0 bg-black bg-opacity-50" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child as={Fragment} enter="ease-out duration-300" enterFrom="opacity-0 scale-95" enterTo="opacity-100 scale-100" leave="ease-in duration-200" leaveFrom="opacity-100 scale-100" leaveTo="opacity-0 scale-95">
              <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white dark:bg-slate-800 p-6 text-left align-middle shadow-xl transition-all">
                <Dialog.Title as="h3" className="text-lg font-medium leading-6 text-gray-900 dark:text-white">
                  Manual Entry / Override
                </Dialog.Title>
                <div className="mt-2">
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Employee: <span className="font-semibold">{record?.name}</span>
                  </p>
                </div>

                <div className="mt-4">
                  <label className="block text-sm text-slate-600 dark:text-slate-300 mb-1">Reason / Note</label>
                  <textarea
                    className="border rounded w-full px-3 py-2 bg-white dark:bg-slate-700 dark:border-slate-600 dark:text-white"
                    rows="3"
                    placeholder="Enter reason for manual action..."
                  />
                </div>

                <div className="mt-6 flex justify-end gap-3">
                  <button type="button" className="px-4 py-2 rounded-md bg-slate-200 dark:bg-slate-600 text-slate-800 dark:text-slate-200 hover:bg-slate-300 dark:hover:bg-slate-500" onClick={onClose}>
                    Cancel
                  </button>
                  <button type="button" className="px-4 py-2 rounded-md bg-sky-600 text-white hover:bg-sky-700" onClick={() => { onSave(record); onClose(); }}>
                    Save Action
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
