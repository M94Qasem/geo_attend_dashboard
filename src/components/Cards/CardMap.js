import React from "react";
import { MapContainer, TileLayer, Marker, Popup, Circle } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from 'leaflet';

// --- 1. إنشاء أيقونات مخصصة للموظفين ---
const createCustomIcon = (color) => {
  const markerHtml = `<span style="background-color: ${color}; width: 1.5rem; height: 1.5rem; display: block; left: -0.75rem; top: -0.75rem; position: relative; border-radius: 50% 50% 50% 0; transform: rotate(-45deg); border: 1px solid #FFFFFF; box-shadow: 0 0 5px rgba(0,0,0,0.5);"></span>`;
  return L.divIcon({
    html: markerHtml,
    className: ""
  });
};

const greenIcon = createCustomIcon("#22c55e"); // emerald-500
const redIcon = createCustomIcon("#ef4444");   // red-500

// --- 2. بيانات وهمية ---
const geofences = [
  { id: 1, center: [27.0183, 14.4607], radius: 500, name: "Zallaf HQ" },
  { id: 2, center: [27.0300, 14.4700], radius: 300, name: "Field Office" }
];
const employees = [
  { id: 1, name: "Ali Ahmed", position: [27.0185, 14.4610], checkIn: "08:05 AM", status: "Present", network: "OK" },
  { id: 2, name: "Sara Omar", position: [27.0305, 14.4702], checkIn: "08:15 AM", status: "Present", network: "Failed" }
];

export default function CardMap() {
  return (
    // --- 3. الحفاظ على التصميم الأصلي للبطاقة ---
    <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded-lg">
      <div className="rounded-t mb-0 px-4 py-3 border-0">
        <div className="flex flex-wrap items-center">
          <div className="relative w-full px-4 max-w-full flex-grow flex-1">
            <h3 className="font-semibold text-base text-slate-700">
              Live Geofence Map
            </h3>
          </div>
        </div>
      </div>
      <div className="p-4">
        {/* --- 4. إعادة الحجم الكبير والواضح للخريطة --- */}
        <div className="relative h-500-px">
          <MapContainer center={[27.0183, 14.4607]} zoom={14} style={{ height: "100%", width: "100%", borderRadius: "0.5rem" }}>
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" attribution="&copy; OpenStreetMap" />
            
            {/* Geofences */}
            {geofences.map((g ) => (
              <Circle key={g.id} center={g.center} radius={g.radius} pathOptions={{ color: "blue", fillOpacity: 0.1 }}>
                <Popup>{g.name}</Popup>
              </Circle>
            ))}

            {/* Employees */}
            {employees.map((e) => (
              <Marker key={e.id} position={e.position} icon={e.network === "OK" ? greenIcon : redIcon}>
                <Popup>
                  <b>{e.name}</b>  

                  Check-in: {e.checkIn}  

                  Status: {e.status}  

                  Network: {e.network}
                </Popup>
              </Marker>
            ))}
          </MapContainer>
          
          {/* --- 5. Legend (لا يزال موجوداً) --- */}
          <div className="absolute bottom-6 right-6 bg-white p-2 rounded shadow-md z-[1000]">
            <h4 className="font-bold text-xs mb-1">Legend</h4>
            <div className="flex items-center mb-1">
              <div className="w-3 h-3 rounded-full bg-emerald-500 mr-2"></div>
              <span className="text-xs">Network OK</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 rounded-full bg-red-500 mr-2"></div>
              <span className="text-xs">Network Failed</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
