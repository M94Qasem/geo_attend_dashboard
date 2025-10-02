// src/components/Cards/CardComplianceReasonsChart.js

import React from "react";
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';

// بيانات وهمية للمخطط
const data = [
  { name: 'Late Check-in', value: 40 },
  { name: 'Absence', value: 30 },
  { name: 'Manual Override', value: 20 },
  { name: 'Early Check-out', value: 10 },
];

// ✅ مجموعة ألوان جديدة وأكثر تباينًا
const COLORS = ['#f97316', '#ef4444', '#3b82f6', '#eab308'];
// (orange-500, red-500, blue-500, yellow-500)

export default function CardComplianceReasonsChart() {
  // التحقق من الوضع الليلي لتحديد الألوان
  const isDarkMode = document.documentElement.classList.contains('dark');
  const textColor = isDarkMode ? '#a0aec0' : '#64748b';
  const gridColor = isDarkMode ? 'rgba(255, 255, 255, 0.1)' : '#e2e8f0';

  return (
    // إضافة كلاسات الوضع الليلي للبطاقة
    <div className="relative flex flex-col min-w-0 break-words bg-white dark:bg-slate-800 w-full mb-6 shadow-lg rounded-xl">
      <div className="rounded-t mb-0 px-4 py-3 bg-transparent">
        <div className="flex flex-wrap items-center">
          <div className="relative w-full max-w-full flex-grow flex-1">
            {/* تعديل ألوان النصوص للوضع الليلي */}
            <h6 className="uppercase text-slate-400 dark:text-slate-500 mb-1 text-xs font-semibold">Compliance</h6>
            <h2 className="text-slate-700 dark:text-white text-xl font-semibold">Reasons for Non-Compliance</h2>
          </div>
        </div>
      </div>
      <div className="p-4 flex-auto">
        <div className="relative h-[350px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                fill="#8884d8"
                paddingAngle={5}
                dataKey="value"
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: isDarkMode ? '#2d3748' : '#fff',
                  borderRadius: '0.75rem',
                  border: `1px solid ${gridColor}`,
                }}
                labelStyle={{ color: isDarkMode ? '#e2e8f0' : '#334155' }}
                formatter={(value, name) => [`${value}%`, name]}
              />
              {/* استخدام لون نص ديناميكي للـ Legend */}
              <Legend iconType="circle" wrapperStyle={{ paddingTop: '20px', color: textColor }} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
