// src/components/Management/GeofenceManagementTab.js

import React, { useState, useMemo, Fragment, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, Circle } from 'react-leaflet';
import { Dialog, Transition } from '@headlessui/react';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { FaMoon, FaSun } from "react-icons/fa"; // استيراد أيقونات التبديل

// إصلاح أيقونة Marker
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

const mockGeofences = [
  { id: 1, name: "Headquarters", position: [24.7136, 46.6753], radius: 500 },
  { id: 2, name: "Branch A", position: [24.7742, 46.7386], radius: 300 },
  { id: 3, name: "Warehouse", position: [24.642, 46.793], radius: 1000 },
];

export default function GeofenceManagementTab() {
  const [geofences, setGeofences] = useState(mockGeofences);
  const [selected, setSelected] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // ✅ 1. إضافة حالة منفصلة لوضع الخريطة المظلم
  const [mapDarkMode, setMapDarkMode] = useState(false);
  const [tileLayer, setTileLayer] = useState({
    url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
    attribution: '&copy; OpenStreetMap'
  } );

  // ✅ 2. useEffect لتحديث طبقة الخريطة عند تغيير الحالة
  useEffect(() => {
    const newLayer = mapDarkMode
      ? { url: "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png", attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>' }
      : { url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", attribution: '&copy; OpenStreetMap' };
    setTileLayer(newLayer );
  }, [mapDarkMode]);

  const filteredGeofences = useMemo(() => 
    geofences.filter(fence => 
      fence.name.toLowerCase().includes(searchTerm.toLowerCase())
    ), [geofences, searchTerm]
  );

  function closeModal() { setIsModalOpen(false); }
  function openModal() { setIsModalOpen(true); }

  return (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 p-4">
        {/* ✅ 3. تعديل اللوحة الجانبية للوضع الليلي */}
        <div className="lg:col-span-1 bg-white dark:bg-slate-800 p-6 rounded-lg shadow-md border border-slate-200 dark:border-slate-700 h-full flex flex-col">
          <h3 className="text-lg font-semibold text-slate-800 dark:text-white mb-2">Manage Geofences</h3>
          <input 
            type="text"
            placeholder="Search by name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-700 dark:text-slate-200 rounded-md shadow-sm mb-4 focus:ring-sky-500 focus:border-sky-500"
          />
          <ul className="space-y-2 flex-grow overflow-y-auto">
            {filteredGeofences.map(fence => (
              <li 
                key={fence.id} 
                onClick={() => setSelected(fence)}
                className={`p-3 rounded-md cursor-pointer transition-colors ${selected?.id === fence.id ? 'bg-sky-100 dark:bg-sky-900/50 border-sky-500' : 'bg-slate-50 dark:bg-slate-700/50 hover:bg-slate-100 dark:hover:bg-slate-700 border-transparent'} border`}
              >
                <p className="font-semibold text-slate-700 dark:text-slate-200">{fence.name}</p>
                <p className="text-xs text-slate-500 dark:text-slate-400">Radius: {fence.radius}m</p>
              </li>
            ))}
             {filteredGeofences.length === 0 && (
              <p className="text-center text-slate-400 dark:text-slate-500 py-4">No locations found.</p>
            )}
          </ul>
          <button onClick={openModal} className="w-full mt-4 bg-sky-600 text-white font-bold py-2 px-4 rounded-md hover:bg-sky-700 transition-colors">
            + Add New Geofence
          </button>
        </div>

        {/* ✅ 4. تعديل حاوية الخريطة وإضافة زر التبديل */}
        <div className="lg:col-span-2 h-[500px] rounded-lg shadow-md overflow-hidden relative z-0">
          <MapContainer center={[24.7136, 46.6753]} zoom={11} scrollWheelZoom={false} style={{ height: '100%', width: '100%' }} key={tileLayer.url}>
            <TileLayer url={tileLayer.url} attribution={tileLayer.attribution} />
            {filteredGeofences.map(fence => (
              <React.Fragment key={fence.id}>
                <Marker position={fence.position}><Popup>{fence.name}</Popup></Marker>
                <Circle center={fence.position} radius={fence.radius} pathOptions={{ color: selected?.id === fence.id ? 'blue' : 'gray', fillColor: selected?.id === fence.id ? 'blue' : 'gray', fillOpacity: 0.2 }} />
              </React.Fragment>
             ))}
          </MapContainer>
          <button 
            onClick={() => setMapDarkMode(!mapDarkMode)}
            className="absolute top-3 right-3 z-[1000] p-2 rounded-full bg-white/80 dark:bg-slate-800/80 text-slate-600 dark:text-slate-300 hover:bg-white dark:hover:bg-slate-700 shadow-md"
            title="Toggle Map Theme"
          >
            {mapDarkMode ? <FaSun size={16} /> : <FaMoon size={16} />}
          </button>
        </div>
      </div>

      {/* ✅ 5. تعديل النافذة المنبثقة (Modal) للوضع الليلي */}
      <Transition appear show={isModalOpen} as={Fragment}>
        <Dialog as="div" className="relative z-[2000]" onClose={closeModal}>
          <Transition.Child as={Fragment} enter="ease-out duration-300" enterFrom="opacity-0" enterTo="opacity-100" leave="ease-in duration-200" leaveFrom="opacity-100" leaveTo="opacity-0">
            <div className="fixed inset-0 bg-black/50 dark:bg-black/70" />
          </Transition.Child>
          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child as={Fragment} enter="ease-out duration-300" enterFrom="opacity-0 scale-95" enterTo="opacity-100 scale-100" leave="ease-in duration-200" leaveFrom="opacity-100 scale-100" leaveTo="opacity-0 scale-95">
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white dark:bg-slate-800 p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title as="h3" className="text-lg font-medium leading-6 text-gray-900 dark:text-white">
                    Add New Geofence
                  </Dialog.Title>
                  <div className="mt-4 space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-600 dark:text-slate-400 mb-1">Location Name</label>
                      <input type="text" placeholder="e.g., Main Office" className="w-full border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-700 dark:text-slate-200 rounded-md shadow-sm focus:ring-sky-500 focus:border-sky-500" />
                    </div>
                     <div>
                      <label className="block text-sm font-medium text-slate-600 dark:text-slate-400 mb-1">Coordinates (Lat, Lng)</label>
                      <input type="text" placeholder="24.7136, 46.6753" className="w-full border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-700 dark:text-slate-200 rounded-md shadow-sm focus:ring-sky-500 focus:border-sky-500" />
                    </div>
                     <div>
                      <label className="block text-sm font-medium text-slate-600 dark:text-slate-400 mb-1">Radius (in meters)</label>
                      <input type="number" placeholder="500" className="w-full border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-700 dark:text-slate-200 rounded-md shadow-sm focus:ring-sky-500 focus:border-sky-500" />
                    </div>
                  </div>
                  <div className="mt-6 flex justify-end gap-4">
                    <button type="button" className="inline-flex justify-center rounded-md border border-transparent bg-slate-100 dark:bg-slate-700 px-4 py-2 text-sm font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-600" onClick={closeModal}>
                      Cancel
                    </button>
                    <button type="button" className="inline-flex justify-center rounded-md border border-transparent bg-sky-600 px-4 py-2 text-sm font-medium text-white hover:bg-sky-700" onClick={closeModal}>
                      Save Geofence
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
