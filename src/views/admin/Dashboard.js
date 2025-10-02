// src/views/admin/Dashboard.js

import React from "react";

// استيراد كل المكونات
import CardStats from "components/Cards/CardStats.js";
import CardMap from "components/Cards/CardMap.js";
import CardLiveFeed from "components/Cards/CardLiveFeed.js";
import CardRecentFlags from "components/Cards/CardRecentFlags.js";
import CardAttendanceChart from "components/Cards/CardAttendanceChart.js";
import CardComplianceChart from "components/Cards/CardComplianceChart.js";

export default function Dashboard() {
  return (
    <>
      {/* ✅ تم تعديل الهيدر ليدعم الوضع الليلي ويتناسق مع التصميم */}
      <div className="relative bg-sky-600 dark:bg-slate-700 md:pt-32 pb-32 pt-12 print:hidden">
        <div className="px-4 md:px-10 mx-auto w-full">
          <div>
            {/* بطاقات الإحصائيات */}
            <div className="flex flex-wrap">
              <div className="w-full lg:w-6/12 xl:w-3/12 px-4">
                <CardStats
                  statSubtitle="Live Attendance"
                  statTitle="15"
                  statIconName="fas fa-user-check"
                  statIconColor="bg-emerald-500"
                />
              </div>
              <div className="w-full lg:w-6/12 xl:w-3/12 px-4">
                <CardStats
                  statSubtitle="Late Today"
                  statTitle="2"
                  statIconName="fas fa-clock"
                  statIconColor="bg-orange-500"
                />
              </div>
              <div className="w-full lg:w-6/12 xl:w-3/12 px-4">
                <CardStats
                  statSubtitle="Absent Today"
                  statTitle="5"
                  statIconName="fas fa-user-slash"
                  statIconColor="bg-red-500"
                />
              </div>
              <div className="w-full lg:w-6/12 xl:w-3/12 px-4">
                <CardStats
                  statSubtitle="Pending Overrides"
                  statTitle="3"
                  statIconName="fas fa-exclamation-triangle"
                  statIconColor="bg-yellow-500"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* حاوية المحتوى الرئيسي مع دعم الطباعة */}
      <div className="px-4 md:px-10 mx-auto w-full -m-24 print:m-0 print:p-0">
        
        {/* الصف الأول: الرسوم البيانية */}
        <div className="flex flex-wrap mt-4">
          <div className="w-full xl:w-8/12 mb-12 xl:mb-0 px-4">
            <CardAttendanceChart />
          </div>
          <div className="w-full xl:w-4/12 px-4">
            <CardComplianceChart />
          </div>
        </div>

        {/* الصف الثاني: الخريطة و الـ Live Feed */}
        <div className="flex flex-wrap mt-4">
          <div className="w-full xl:w-8/12 mb-12 xl:mb-0 px-4">
            <CardMap />
          </div>
          <div className="w-full xl:w-4/12 px-4">
            <CardLiveFeed />
          </div>
        </div>

        {/* الصف الثالث: الـ Recent Flags */}
        <div className="flex flex-wrap mt-4">
          <div className="w-full mb-12 px-4">
            <CardRecentFlags />
          </div>
        </div>

      </div>
    </>
  );
}
