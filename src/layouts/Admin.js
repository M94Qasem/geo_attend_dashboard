import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";

// components
import AdminNavbar from "components/Navbars/AdminNavbar.js";
import Sidebar from "components/Sidebar/Sidebar.js";

// views
import Dashboard from "views/admin/Dashboard.js";
import Maps from "views/admin/Maps.js";
import Settings from "views/admin/Settings.js";
import AttendanceLog from "views/admin/AttendanceLog.js"; 
import Management from "views/admin/Management.js"; // <-- 1. أضف هذا السطر

export default function Admin() {
  return (
    <>
      <Sidebar />
      <div className="relative md:ml-64 bg-slate-100 min-h-screen">
        <AdminNavbar />
        <div className="w-full mx-auto">
          <Switch>
            <Route path="/admin/dashboard" exact component={Dashboard} />
            <Route path="/admin/attendance-log" exact component={AttendanceLog} />
            <Route path="/admin/management" exact component={Management} /> {/* <-- 2. أضف هذا السطر */}
            <Route path="/admin/maps" exact component={Maps} />
            <Route path="/admin/settings" exact component={Settings} />
            <Redirect from="/admin" to="/admin/dashboard" />
          </Switch>
        </div>
      </div>
    </>
  );
}
