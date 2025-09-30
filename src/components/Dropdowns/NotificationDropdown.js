import React, { Fragment } from "react";
// 1. استيراد المكونات اللازمة من Headless UI
import { Menu, Transition } from "@headlessui/react";
// 2. استيراد الأيقونات التي سنستخدمها
import { FaBell, FaExclamationCircle, FaUserPlus } from "react-icons/fa";

export default function NotificationDropdown() {
  return (
    // 3. استخدام مكون Menu كحاوية رئيسية
    <Menu as="div" className="relative inline-block text-left">
      <Menu.Button className="relative text-white hover:text-slate-200 focus:outline-none">
        {/* 4. تصميم عداد التنبيهات ليكون بارزًا */}
        <span className="absolute -top-2 -right-2 flex h-5 w-5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-5 w-5 bg-red-500 text-white text-xs items-center justify-center">3</span>
        </span>
        <FaBell size={22} />
      </Menu.Button>

      {/* 5. استخدام Transition لإضافة تأثيرات الحركة */}
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        {/* 6. Menu.Items هي القائمة المنسدلة نفسها */}
        <Menu.Items className="origin-top-right absolute right-0 mt-2 w-80 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-50">
          <div className="p-1">
            <div className="px-3 py-2">
              <p className="text-sm font-bold text-slate-800">Notifications</p>
            </div>
            <div className="border-t border-slate-200" />
            
            {/* 7. مثال على إشعار */}
            <Menu.Item>
              {({ active }) => (
                <a href="#pablo" onClick={(e) => e.preventDefault()} className={`group flex items-center w-full px-3 py-3 text-sm rounded-md ${active ? 'bg-slate-100' : ''}`}>
                  <FaExclamationCircle className="mr-3 h-5 w-5 text-yellow-500 flex-shrink-0" />
                  <div>
                    <p className="font-semibold text-slate-700">New Override Request</p>
                    <p className="text-xs text-slate-500">From: Ahmed Ali - 5 minutes ago</p>
                  </div>
                </a>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <a href="#pablo" onClick={(e) => e.preventDefault()} className={`group flex items-center w-full px-3 py-3 text-sm rounded-md ${active ? 'bg-slate-100' : ''}`}>
                  <FaUserPlus className="mr-3 h-5 w-5 text-sky-500 flex-shrink-0" />
                  <div>
                    <p className="font-semibold text-slate-700">New User Registered</p>
                    <p className="text-xs text-slate-500">Fatima Zahra - 1 hour ago</p>
                  </div>
                </a>
              )}
            </Menu.Item>
            
            <div className="border-t border-slate-200 mt-1" />
             <Menu.Item>
                <a href="#pablo" onClick={(e) => e.preventDefault()} className="block text-center text-sm py-2 text-sky-600 font-semibold hover:bg-slate-100 rounded-md">
                  View All Notifications
                </a>
            </Menu.Item>
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
}
