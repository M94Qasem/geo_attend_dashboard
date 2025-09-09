// In src/components/Cards/CardMap.js
import React from "react";

export default function CardMap() {
  return (
    <>
      <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded">
        <div className="rounded-t mb-0 px-4 py-3 border-0">
          <div className="flex flex-wrap items-center">
            <div className="relative w-full px-4 max-w-full flex-grow flex-1">
              <h3 className="font-semibold text-base text-blueGray-700">
                Live Geofence Map
              </h3>
            </div>
          </div>
        </div>
        <div className="p-4" style={{ height: "600px" }}>
          {/* Map component will be integrated here */}
          <div className="bg-gray-200 h-full w-full flex items-center justify-center">
            <p className="text-gray-500">Map Placeholder</p>
          </div>
        </div>
      </div>
    </>
  );
}
