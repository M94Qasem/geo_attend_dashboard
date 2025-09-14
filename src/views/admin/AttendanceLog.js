import React from "react";

// Import the components we will use on this page
import CardStats from "components/Cards/CardStats.js";
import CardTable from "components/Cards/CardTable.js";

export default function AttendanceLog() {
  // Define the columns for our attendance log table
  const columns = [
    "Employee", "Department", "Date", "Check-in", "Check-out",
    "Work Duration", "Location", "Status",
  ];

  // Create some realistic mock data for the table
  const data = [
    { employee: "John Doe", department: "IT", date: "2025-09-11", checkIn: "08:02 AM", checkOut: "05:05 PM", duration: "9h 3m", location: "Head Office", status: { text: "On-time", color: "emerald" } },
    { employee: "Jane Smith", department: "HR", date: "2025-09-11", checkIn: "08:17 AM", checkOut: "05:01 PM", duration: "8h 44m", location: "Warehouse A", status: { text: "Late", color: "orange" } },
    { employee: "Sam Wilson", department: "Operations", date: "2025-09-11", checkIn: "07:55 AM", checkOut: "04:30 PM", duration: "8h 35m", location: "Head Office", status: { text: "Override", color: "yellow" } },
    { employee: "Alex Ray", department: "IT", date: "2025-09-11", checkIn: "N/A", checkOut: "N/A", duration: "N/A", location: "N/A", status: { text: "Absent", color: "red" } },
  ];

  return (
    <>
      {/* Header - This part is working correctly and will not be changed */}
      <div className="relative bg-lightBlue-600 md:pt-32 pb-32 pt-12">
        <div className="px-4 md:px-10 mx-auto w-full">
          <div>
            {/* Card stats */}
            <div className="flex flex-wrap">
              <div className="w-full lg:w-6/12 xl:w-3/12 px-4">
                <CardStats
                  statSubtitle="Total Records"
                  statTitle="3,450"
                  statIconName="fas fa-database"
                  // FINAL AND CORRECT FIX: Using the correct Tailwind class name.
                  // 'lightBlue' is the legacy name that works. 'sky' is the modern equivalent.
                  statIconColor="bg-lightBlue-500"
                />
              </div>
              <div className="w-full lg:w-6/12 xl:w-3/12 px-4">
                <CardStats
                  statSubtitle="Total Overrides"
                  statTitle="76"
                  statIconName="fas fa-exclamation-triangle"
                  statIconColor="bg-yellow-500"
                />
              </div>
              <div className="w-full lg:w-6/12 xl:w-3/12 px-4">
                <CardStats
                  statSubtitle="Total Late"
                  statTitle="123"
                  statIconName="fas fa-clock"
                  statIconColor="bg-orange-500"
                />
              </div>
              <div className="w-full lg:w-6/12 xl:w-3/12 px-4">
                <CardStats
                  statSubtitle="Total Absences"
                  statTitle="21"
                  statIconName="fas fa-user-slash"
                  statIconColor="bg-red-500"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="px-4 md:px-10 mx-auto w-full -m-24">
        <div className="flex flex-wrap mt-4">
          <div className="w-full mb-12 px-4">
            <CardTable title="Detailed Attendance Log" columns={columns} data={data} />
          </div>
        </div>
      </div>
    </>
  );
}
