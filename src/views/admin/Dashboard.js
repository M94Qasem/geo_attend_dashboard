import React from "react";

// Components
import CardStats from "components/Cards/CardStats.js";
import CardMap from "components/Cards/CardMap.js";
import CardLiveFeed from "components/Cards/CardLiveFeed.js";
import CardAttendanceChart from "components/Cards/CardAttendanceChart.js";
import CardComplianceChart from "components/Cards/CardComplianceChart.js";
import CardTopEmployees from "components/Cards/CardTopEmployees.js";

export default function Dashboard() {
  return (
    <>
      {/* Header section with KPI Cards */}
      <div className="relative bg-lightBlue-600 md:pt-32 pb-32 pt-12">
        <div className="px-4 md:px-10 mx-auto w-full">
          <div>
            {/* Card stats row */}
            <div className="flex flex-wrap">
              <div className="w-full lg:w-6/12 xl:w-3/12 px-4">
                <CardStats
                  statSubtitle="LIVE ATTENDANCE"
                  statTitle="15"
                  statIconName="fas fa-users"
                  statIconColor="bg-emerald-500"
                />
              </div>
              <div className="w-full lg:w-6/12 xl:w-3/12 px-4">
                <CardStats
                  statSubtitle="LATE TODAY"
                  statTitle="2"
                  statIconName="fas fa-clock"
                  statIconColor="bg-orange-500"
                />
              </div>
              <div className="w-full lg:w-6/12 xl:w-3/12 px-4">
                <CardStats
                  statSubtitle="ABSENT TODAY"
                  statTitle="5"
                  statIconName="fas fa-user-slash"
                  statIconColor="bg-red-500"
                />
              </div>
              <div className="w-full lg:w-6/12 xl:w-3/12 px-4">
                <CardStats
                  statSubtitle="PENDING OVERRIDES"
                  statTitle="3"
                  statIconName="fas fa-exclamation-triangle"
                  statIconColor="bg-yellow-500"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Page content */}
      <div className="px-4 md:px-10 mx-auto w-full -m-24">
        {/* === NEW LAYOUT ORDER === */}

        {/* First Row: Charts */}
        <div className="flex flex-wrap">
          <div className="w-full xl:w-8/12 mb-12 xl:mb-0 px-4">
            <CardAttendanceChart />
          </div>
          <div className="w-full xl:w-4/12 px-4">
            <CardComplianceChart />
          </div>
        </div>

        {/* Second Row: Map and Live Feed */}
        <div className="flex flex-wrap mt-4">
          <div className="w-full xl:w-8/12 mb-12 xl:mb-0 px-4">
            <CardMap />
          </div>
          <div className="w-full xl:w-4/12 px-4">
            <div className="flex flex-col h-full">
              <CardLiveFeed />
            </div>
          </div>
        </div>

        {/* Third Row: Tables */}
        <div className="flex flex-wrap mt-4">
          <div className="w-full mb-12 px-4">
            <CardTopEmployees />
          </div>
        </div>
      </div>
    </>
  );
}
