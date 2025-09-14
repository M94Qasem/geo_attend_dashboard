import React from "react";
import Button from "../Elements/Button";

export default function CardGeofenceSettings() {
  // Mock data for demonstration
  const geofences = [
    { id: 1, name: "Head Office", radius: "50m", bssids: 5 },
    { id: 2, name: "Warehouse A", radius: "100m", bssids: 3 },
    { id: 3, name: "Remote Site B", radius: "200m", bssids: 1 },
  ];

  return (
    <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-white">
      <div className="rounded-t mb-0 px-4 py-3 border-b">
        <div className="flex flex-wrap items-center">
          <div className="relative w-full px-4 max-w-full flex-grow flex-1">
            <h3 className="font-semibold text-lg text-slate-700">Geofence & Network Management</h3>
          </div>
          <div className="relative w-full px-4 max-w-full flex-grow flex-1 text-right">
            <Button variant="primary">Add New Geofence</Button>
          </div>
        </div>
      </div>
      <div className="block w-full overflow-x-auto">
        <table className="items-center w-full bg-transparent border-collapse">
          <thead>
            <tr>
              <th className="px-6 bg-slate-50 text-slate-500 align-middle border py-3 text-xs uppercase whitespace-nowrap font-semibold text-left">Location Name</th>
              <th className="px-6 bg-slate-50 text-slate-500 align-middle border py-3 text-xs uppercase whitespace-nowrap font-semibold text-left">Radius</th>
              <th className="px-6 bg-slate-50 text-slate-500 align-middle border py-3 text-xs uppercase whitespace-nowrap font-semibold text-left">Allowed Networks (BSSIDs)</th>
              <th className="px-6 bg-slate-50 text-slate-500 align-middle border py-3 text-xs uppercase whitespace-nowrap font-semibold text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {geofences.map(geo => (
              <tr key={geo.id}>
                <th className="border-t-0 px-6 align-middle text-xs whitespace-nowrap p-4 text-left">{geo.name}</th>
                <td className="border-t-0 px-6 align-middle text-xs whitespace-nowrap p-4">{geo.radius}</td>
                <td className="border-t-0 px-6 align-middle text-xs whitespace-nowrap p-4">{geo.bssids}</td>
                <td className="border-t-0 px-6 align-middle text-xs whitespace-nowrap p-4">
                  <a href="#pablo" className="text-sky-500 hover:text-sky-700">Edit</a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
