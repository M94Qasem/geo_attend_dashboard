/*eslint-disable*/
import React from "react";
import { NavLink, Link } from "react-router-dom";
import {
  FaTimes,
  FaBars,
  FaTachometerAlt,
  FaClipboardList,
  FaChartBar,
  FaCogs,
} from "react-icons/fa";

export default function Sidebar() {
  const [collapseShow, setCollapseShow] = React.useState("hidden");

  const links = [
    { path: "/admin/dashboard", icon: <FaTachometerAlt />, name: "Dashboard" },
    { path: "/admin/attendance", icon: <FaClipboardList />, name: "Attendance Log" },
    { path: "/admin/management", icon: <FaCogs />, name: "Management" },
    { path: "/admin/analytics", icon: <FaChartBar />, name: "Analytics & Reports" },
  ];

  return (
    <>
      <nav className="md:left-0 md:block md:fixed md:top-0 md:bottom-0 md:overflow-y-auto md:flex-row md:flex-nowrap md:overflow-hidden shadow-xl bg-white flex flex-wrap items-center justify-between relative md:w-64 z-10 py-4 px-6">
        <div className="md:flex-col md:items-stretch md:min-h-full md:flex-nowrap px-0 flex flex-wrap items-center justify-between w-full mx-auto">
          {/* Toggler */}
          <button
            className="cursor-pointer text-black opacity-50 md:hidden px-3 py-1 text-xl leading-none bg-transparent rounded border border-solid border-transparent"
            type="button"
            onClick={() => setCollapseShow("bg-white m-2 py-3 px-6")}
          >
            <FaBars />
          </button>
          {/* Brand */}
          <Link
            className="md:block text-left md:pb-2 text-slate-600 mr-0 inline-block whitespace-nowrap text-sm uppercase font-bold p-4 px-0"
            to="/"
          >
            Geo-Attend
          </Link>
          
          {/* Collapsible Menu */}
          <div
            className={
              "md:flex md:flex-col md:items-stretch md:opacity-100 md:relative md:mt-4 md:shadow-none shadow absolute top-0 left-0 right-0 z-40 overflow-y-auto overflow-x-hidden h-auto items-center flex-1 rounded " +
              collapseShow
            }
          >
            {/* Collapse header */}
            <div className="md:min-w-full md:hidden block pb-4 mb-4 border-b border-solid border-slate-200">
              <div className="flex flex-wrap">
                <div className="w-6/12">
                  <Link
                    className="md:block text-left md:pb-2 text-slate-600 mr-0 inline-block whitespace-nowrap text-sm uppercase font-bold p-4 px-0"
                    to="/"
                  >
                    Geo-Attend
                  </Link>
                </div>
                <div className="w-6/12 flex justify-end">
                  <button
                    type="button"
                    className="cursor-pointer text-black opacity-50 md:hidden px-3 py-1 text-xl leading-none bg-transparent rounded border border-solid border-transparent"
                    onClick={() => setCollapseShow("hidden")}
                  >
                    <FaTimes />
                  </button>
                </div>
              </div>
            </div>
            
            <hr className="my-4 md:min-w-full" />
            <h6 className="md:min-w-full text-slate-500 text-xs uppercase font-bold block pt-1 pb-4 no-underline">
              Main Menu
            </h6>
            
            <ul className="md:flex-col md:min-w-full flex flex-col list-none">
              {links.map((link, index) => (
                <li key={index} className="items-center">
                  {/* 1. تطبيق التحسين على الرابط النشط */}
                  <NavLink
                    className={({ isActive }) => 
                      "text-xs uppercase py-3 font-bold block flex items-center gap-3 px-4 rounded-lg transition-colors " +
                      (isActive
                        ? "bg-sky-50 text-sky-600" // خلفية زرقاء فاتحة ونص أزرق داكن
                        : "text-slate-700 hover:bg-slate-100")
                    }
                    to={link.path}
                    onClick={() => setCollapseShow("hidden")}
                  >
                    <span className={({isActive}) => isActive ? 'text-sky-500' : 'text-slate-400'}>
                      {React.cloneElement(link.icon, { className: "text-lg" })}
                    </span>
                    {link.name}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}
