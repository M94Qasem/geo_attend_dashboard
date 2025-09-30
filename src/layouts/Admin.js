import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";

// components
import AdminNavbar from "components/Navbars/AdminNavbar.js";
import Sidebar from "components/Sidebar/Sidebar.js";

// views
import Dashboard from "views/admin/Dashboard.js";
import AttendanceLog from "views/admin/AttendanceLog.js"; 
import Management from "views/admin/Management.js";
import Analytics from "views/admin/Analytics.js"; 

export default function Admin() {
  return (
    <>
      <Sidebar />
      <div className="relative md:ml-64 bg-slate-100 min-h-screen">
        <AdminNavbar />
        
        {/* 1. تم حذف padding-top من هنا */}
        {/* الآن كل صفحة تبدأ من أعلى الشاشة، خلف الشريط العلوي */}
        <div className="w-full mx-auto">
          <Switch>
            <Route path="/admin/dashboard" exact component={Dashboard} />
            <Route path="/admin/attendance" exact component={AttendanceLog} />
            <Route path="/admin/management" exact component={Management} />
            <Route path="/admin/analytics" exact component={Analytics} />
            <Redirect from="/admin" to="/admin/dashboard" />
          </Switch>
        </div>
      </div>
    </>
  );
}
