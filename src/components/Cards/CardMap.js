// src/components/Cards/CardMap.js

import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, Circle } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from 'leaflet';
import { FaMoon, FaSun } from "react-icons/fa";

const createCustomIcon = (color) => {
  const markerHtml = `<span style="background-color: ${color}; width: 1.5rem; height: 1.5rem; display: block; left: -0.75rem; top: -0.75rem; position: relative; border-radius: 50% 50% 50% 0; transform: rotate(-45deg); border: 1px solid #FFFFFF; box-shadow: 0 0 5px rgba(0,0,0,0.5);"></span>`;
  return L.divIcon({
    html: markerHtml,
    className: ""
  });
};

const greenIcon = createCustomIcon("#22c55e");
const redIcon = createCustomIcon("#ef4444");

const geofences = [
  { id: 1, center: [27.0183, 14.4607], radius: 500, name: "Zallaf HQ" },
  { id: 2, center: [27.0300, 14.4700], radius: 300, name: "Field Office" }
];
const employees = [
  { id: 1, name: "Ali Ahmed", position: [27.0185, 14.4610], checkIn: "08:05 AM", status: "Present", network: "OK" },
  { id: 2, name: "Sara Omar", position: [27.0305, 14.4702], checkIn: "08:15 AM", status: "Present", network: "Failed" }
];

export default function CardMap() {
  const [mapDarkMode, setMapDarkMode] = useState(false);
  const [tileLayer, setTileLayer] = useState({
    url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
    attribution: '&copy; OpenStreetMap'
  } );

  useEffect(() => {
    if (mapDarkMode) {
      setTileLayer({
        url: "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png",
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
      } );
    } else {
      setTileLayer({
        url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
        attribution: '&copy; OpenStreetMap'
      } );
    }
  }, [mapDarkMode]);

  return (
    <div className="relative flex flex-col min-w-0 break-words bg-white dark:bg-slate-800 w-full mb-6 shadow-lg rounded-lg">
      <div className="rounded-t mb-0 px-4 py-3 border-0">
        <div className="flex flex-wrap items-center justify-between">
          <h3 className="font-semibold text-base text-slate-700 dark:text-white">
            Live Geofence Map
          </h3>
          <button 
            onClick={() => setMapDarkMode(!mapDarkMode)}
            className="p-2 rounded-full bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-600"
            title="Toggle Map Theme"
          >
            {mapDarkMode ? <FaSun size={16} /> : <FaMoon size={16} />}
          </button>
        </div>
      </div>
      <div className="p-4">
        <div className="relative h-500-px">
          <MapContainer 
            center={[27.0183, 14.4607]} 
            zoom={14} 
            style={{ height: "100%", width: "100%", borderRadius: "0.5rem", zIndex: 1 }}
            key={tileLayer.url}
          >
            <TileLayer url={tileLayer.url} attribution={tileLayer.attribution} />
            
            {geofences.map((g) => (
              <Circle key={g.id} center={g.center} radius={g.radius} pathOptions={{ color: "blue", fillOpacity: 0.1 }}>
                <Popup>{g.name}</Popup>
              </Circle>
            ))}

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
          
          <div className="absolute bottom-6 right-6 bg-white dark:bg-slate-700 p-2 rounded shadow-md z-[1000]">
            <h4 className="font-bold text-xs mb-1 text-slate-700 dark:text-white">Legend</h4>
            <div className="flex items-center mb-1">
              <div className="w-3 h-3 rounded-full bg-emerald-500 mr-2"></div>
              <span className="text-xs text-slate-600 dark:text-slate-300">Network OK</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 rounded-full bg-red-500 mr-2"></div>
              <span className="text-xs text-slate-600 dark:text-slate-300">Network Failed</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
