import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from 'leaflet';

// This is a fix for a known issue with react-leaflet where the default marker icon doesn't show up.
// We are manually importing the marker icon.
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

export default function CardMap() {
  // UPDATED: Set the initial position to Sabha, Libya
  const position = [27.0377, 14.4283];

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
        <div className="p-4">
          {/* Map Container */}
          <div className="relative h-500-px">
            <MapContainer center={position} zoom={13} style={{ height: "100%", width: "100%" }}>
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              />
              {/* Example Marker */}
              <Marker position={position}>
                <Popup>
                  {/* UPDATED: Popup text to reflect the new location */}
                  Head Office   
 Sabha, Libya.
                </Popup>
              </Marker>
            </MapContainer>
          </div>
        </div>
      </div>
    </>
   );
}
