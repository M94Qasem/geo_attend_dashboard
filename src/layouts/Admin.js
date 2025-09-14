import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";

// components
import AdminNavbar from "components/Navbars/AdminNavbar.js";
import Sidebar from "components/Sidebar/Sidebar.js";

// views
import Dashboard from "views/admin/Dashboard.js";
import Maps from "views/admin/Maps.js";
import Settings from "views/admin/Settings.js";
// UPDATED: Import the new component
import AttendanceLog from "views/admin/AttendanceLog.js"; 

export default function Admin() {
  return (
    <>
      <Sidebar />
      {/* FIX: Replaced 'blueGray' with 'slate' for v3 compatibility */}
      <div className="relative md:ml-64 bg-slate-100 min-h-screen">
        <AdminNavbar />
        {/* The header is now part of each page (Dashboard, AttendanceLog, etc.) */}
        {/* The content of each page will be rendered here */}
        <div className="w-full mx-auto">
          <Switch>
            <Route path="/admin/dashboard" exact component={Dashboard} />
            <Route path="/admin/attendance-log" exact component={AttendanceLog} />
            <Route path="/admin/maps" exact component={Maps} />
            <Route path="/admin/settings" exact component={Settings} />
            <Redirect from="/admin" to="/admin/dashboard" />
          </Switch>
        </div>
      </div>
    </>
  );
}
