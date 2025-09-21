import React from "react";

// Import the management cards
import CardUserSettings from "components/Cards/CardUserSettings.js";
import CardGeofenceSettings from "components/Cards/CardGeofenceSettings.js";
import CardShiftManagement from "components/Cards/CardShiftManagement.js"; // <-- 1. سنقوم بإنشاء هذا الملف

export default function Management() {
  return (
    <>
      {/* Header: This provides the blue background and top spacing */}
      <div className="relative bg-sky-600 md:pt-32 pb-32 pt-12">
        <div className="px-4 md:px-10 mx-auto w-full">
          {/* You can add CardStats here in the future if needed */}
        </div>
      </div>
      
      {/* Page content: This part contains the cards */}
      <div className="px-4 md:px-10 mx-auto w-full -m-24">
        <div className="flex flex-wrap mt-4">
          <div className="w-full mb-12 px-4">
            <CardUserSettings />
          </div>
          <div className="w-full mb-12 px-4">
            <CardGeofenceSettings />
          </div>
          <div className="w-full mb-12 px-4">
            <CardShiftManagement /> {/* <-- 2. أضفنا البطاقة الثالثة هنا */}
          </div>
        </div>
      </div>
    </>
  );
}
