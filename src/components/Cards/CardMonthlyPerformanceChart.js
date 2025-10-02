// src/components/Cards/CardMonthlyPerformanceChart.js

import React from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

// بيانات وهمية محسّنة للمخطط
const data = [
  { name: 'Week 1', expected: 400, logged: 380 },
  { name: 'Week 2', expected: 400, logged: 395 },
  { name: 'Week 3', expected: 400, logged: 370 },
  { name: 'Week 4', expected: 400, logged: 410 },
  { name: 'Week 5', expected: 400, logged: 390 },
];

export default function CardMonthlyPerformanceChart() {
  // ✅ التحقق من الوضع الليلي لتحديد الألوان
  const isDarkMode = document.documentElement.classList.contains('dark');
  const textColor = isDarkMode ? '#a0aec0' : '#64748b'; // slate-400 or slate-500
  const gridColor = isDarkMode ? 'rgba(255, 255, 255, 0.1)' : '#e2e8f0';

  return (
    // ✅ إضافة كلاسات الوضع الليلي للبطاقة
    <div className="relative flex flex-col min-w-0 break-words bg-white dark:bg-slate-800 w-full mb-6 shadow-lg rounded-xl">
      <div className="rounded-t mb-0 px-4 py-3 bg-transparent">
        <div className="flex flex-wrap items-center">
          <div className="relative w-full max-w-full flex-grow flex-1">
            {/* ✅ تعديل ألوان النصوص للوضع الليلي */}
            <h6 className="uppercase text-slate-400 dark:text-slate-500 mb-1 text-xs font-semibold">Performance</h6>
            <h2 className="text-slate-700 dark:text-white text-xl font-semibold">Monthly Work Hours</h2>
          </div>
        </div>
      </div>
      <div className="p-4 flex-auto">
        <div className="relative h-[350px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={data}
              margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            >
              {/* ✅ استخدام ألوان ديناميكية للشبكة */}
              <CartesianGrid stroke={gridColor} strokeDasharray="3 3" vertical={false} />
              {/* ✅ استخدام ألوان ديناميكية للنصوص */}
              <XAxis dataKey="name" tick={{ fill: textColor }} />
              <YAxis tick={{ fill: textColor }} />
              <Tooltip
                cursor={{ fill: 'rgba(100, 116, 139, 0.1)' }} // slate-500 with opacity
                contentStyle={{
                  backgroundColor: isDarkMode ? '#2d3748' : '#fff', // dark:card or white
                  borderRadius: '0.75rem',
                  border: `1px solid ${gridColor}`,
                }}
                labelStyle={{ color: isDarkMode ? '#e2e8f0' : '#334155' }} // dark:text or slate-700
              />
              <Legend wrapperStyle={{ paddingTop: '20px', color: textColor }} />
              <Bar dataKey="expected" stackId="a" fill={isDarkMode ? '#475569' : '#cbd5e1'} name="Expected Hours" radius={[4, 4, 0, 0]} />
              <Bar dataKey="logged" stackId="b" fill="#4f46e5" name="Logged Hours" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
