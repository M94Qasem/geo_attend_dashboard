import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from 'leaflet';

// Fix for the default marker icon issue in react-leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

export default function CardMap() {
  // UPDATED: Set the position to Zallaf Company in Sabha, Libya
  const position = [27.0183, 14.4607];

  return (
    <>
      <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded">
        <div className="rounded-t mb-0 px-4 py-3 border-0">
          <div className="flex flex-wrap items-center">
            <div className="relative w-full px-4 max-w-full flex-grow flex-1">
              {/* FIX: Replaced 'blueGray' with 'slate' for v3 compatibility */}
              <h3 className="font-semibold text-base text-slate-700">
                Live Geofence Map
              </h3>
            </div>
          </div>
        </div>
        <div className="p-4">
          {/* Map Container */}
          <div className="relative h-500-px">
            <MapContainer center={position} zoom={15} style={{ height: "100%", width: "100%" }}>
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              />
              {/* Example Marker for the company */}
              <Marker position={position}>
                <Popup>
                  {/* UPDATED: Popup text to reflect the company name */}
                  Zallaf Libya Oil & Gas Co.
                </Popup>
              </Marker>
            </MapContainer>
          </div>
        </div>
      </div>
    </>
    );
}
