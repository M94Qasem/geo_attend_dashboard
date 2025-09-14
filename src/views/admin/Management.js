import React from "react";

// Import the new management cards we will create
import CardUserSettings from "components/Cards/CardUserSettings.js";
import CardGeofenceSettings from "components/Cards/CardGeofenceSettings.js";

export default function Management() {
  return (
    <>
      <div className="flex flex-wrap mt-4">
        <div className="w-full mb-12 px-4">
          <CardUserSettings />
        </div>
        <div className="w-full mb-12 px-4">
          <CardGeofenceSettings />
        </div>
        {/* We can add CardShiftManagement here later */}
      </div>
    </>
  );
}
