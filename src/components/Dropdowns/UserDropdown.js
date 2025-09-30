import React, { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import { FaUser, FaCog, FaSignOutAlt } from "react-icons/fa";

// دالة مساعدة لدمج الكلاسات
function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

export default function UserDropdown() {
  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <Menu.Button className="inline-flex justify-center w-full rounded-full text-sm font-medium text-white focus:outline-none">
          <span className="w-12 h-12 text-sm text-white bg-slate-200 inline-flex items-center justify-center rounded-full">
            <img alt="..." className="w-full rounded-full align-middle border-none shadow-lg" src={require("assets/img/team-1-800x800.jpg")} />
          </span>
        </Menu.Button>
      </div>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-50">
          <div className="py-1">
            {/* قسم معلومات المستخدم */}
            <div className="px-4 py-3">
              <p className="text-sm font-bold text-slate-900 truncate">Admin User</p>
              <p className="text-xs text-slate-500 truncate">admin@example.com</p>
            </div>
            <div className="border-t border-slate-200" />
            
            {/* قسم الإعدادات الشخصية */}
            <div className="py-1">
              <Menu.Item>
                {({ active }) => (
                  <a href="#pablo" onClick={(e) => e.preventDefault()} className={classNames(active ? 'bg-slate-100' : '', 'group flex items-center px-4 py-2 text-sm text-slate-700')}>
                    <FaUser className="mr-3 h-5 w-5 text-slate-400" />
                    Profile
                  </a>
                )}
              </Menu.Item>
              <Menu.Item>
                {({ active }) => (
                  <a href="#pablo" onClick={(e) => e.preventDefault()} className={classNames(active ? 'bg-slate-100' : '', 'group flex items-center px-4 py-2 text-sm text-slate-700')}>
                    <FaCog className="mr-3 h-5 w-5 text-slate-400" />
                    Settings
                  </a>
                )}
              </Menu.Item>
            </div>

            {/* قسم الخروج */}
            <div className="border-t border-slate-200" />
            <div className="py-1">
              <Menu.Item>
                {({ active }) => (
                  <a href="#pablo" onClick={(e) => e.preventDefault()} className={classNames(active ? 'bg-slate-100' : '', 'group flex items-center px-4 py-2 text-sm text-slate-700')}>
                    <FaSignOutAlt className="mr-3 h-5 w-5 text-slate-400" />
                    Logout
                  </a>
                )}
              </Menu.Item>
            </div>
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
}
