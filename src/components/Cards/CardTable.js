import React, { useState } from "react";
import PropTypes from "prop-types";
import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  flexRender,
} from "@tanstack/react-table";
import { FaSort, FaSortUp, FaSortDown } from "react-icons/fa";

export default function CardTable({ color, data, columns }) {
  const [sorting, setSorting] = useState([]);

  // 1. استخدام useReactTable مع البيانات والأعمدة التي يتم تمريرها كـ props
  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
    },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    // يمكنك ضبط حجم الصفحة الافتراضي هنا
    initialState: {
        pagination: {
            pageSize: 8,
        },
    },
  });

  return (
    <div
      className={
        "relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded " +
        (color === "light" ? "bg-white" : "bg-slate-700 text-white")
      }
    >
      <div className="rounded-t mb-0 px-4 py-3 border-0">
        <h3 className={"font-semibold text-lg " + (color === "light" ? "text-slate-700" : "text-white")}>
          Attendance Records
        </h3>
      </div>
      <div className="block w-full overflow-x-auto">
        {/* 2. بناء الجدول بشكل ديناميكي باستخدام flexRender */}
        <table className="items-center w-full bg-transparent border-collapse">
          <thead className="sticky top-0">
            {table.getHeaderGroups().map(headerGroup => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map(header => (
                  <th
                    key={header.id}
                    className="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-slate-50 text-slate-500 border-slate-100 dark:bg-slate-600 dark:text-slate-200 dark:border-slate-500"
                  >
                    {/* 3. تفعيل الفرز عند النقر على رأس العمود */}
                    <div
                      {...{
                        className: header.column.getCanSort() ? 'cursor-pointer select-none flex items-center gap-2' : 'flex items-center gap-2',
                        onClick: header.column.getToggleSortingHandler(),
                      }}
                    >
                      {flexRender(header.column.columnDef.header, header.getContext())}
                      {{
                        asc: <FaSortUp />,
                        desc: <FaSortDown />,
                      }[header.column.getIsSorted()] ?? (header.column.getCanSort() ? <FaSort className="opacity-30" /> : null)}
                    </div>
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.map(row => (
              <tr key={row.id} className="hover:bg-gray-50 dark:hover:bg-slate-600/50 transition-colors">
                {row.getVisibleCells().map(cell => (
                  <td key={cell.id} className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* 4. عناصر التحكم بالترقيم (Pagination) */}
      <div className="py-3 px-4 flex items-center justify-between flex-wrap gap-2 border-t border-solid border-slate-200 dark:border-slate-600">
        <span className="text-sm font-medium">
          Page{' '}
          <strong>
            {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
          </strong>
        </span>
        <div className="flex items-center gap-2">
          <button onClick={() => table.setPageIndex(0)} disabled={!table.getCanPreviousPage()} className="p-1 px-2 border rounded disabled:opacity-50 disabled:cursor-not-allowed transition-opacity">
            {'<<'}
          </button>
          <button onClick={() => table.previousPage()} disabled={!table.getCanPreviousPage()} className="p-1 px-2 border rounded disabled:opacity-50 disabled:cursor-not-allowed transition-opacity">
            {'<'}
          </button>
          <button onClick={() => table.nextPage()} disabled={!table.getCanNextPage()} className="p-1 px-2 border rounded disabled:opacity-50 disabled:cursor-not-allowed transition-opacity">
            {'>'}
          </button>
          <button onClick={() => table.setPageIndex(table.getPageCount() - 1)} disabled={!table.getCanNextPage()} className="p-1 px-2 border rounded disabled:opacity-50 disabled:cursor-not-allowed transition-opacity">
            {'>>'}
          </button>
        </div>
      </div>
    </div>
  );
}

// 5. تحديث propTypes ليعكس أن البيانات والأعمدة تأتي من الخارج
CardTable.propTypes = {
  color: PropTypes.oneOf(["light", "dark"]),
  data: PropTypes.array.isRequired,
  columns: PropTypes.array.isRequired,
};
