// src/components/Cards/CardTable.js

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

export default function CardTable({
  data,
  columns,
  onExport,
  filtersComponent,
}) {
  const [sorting, setSorting] = useState([]);

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
    initialState: {
      pagination: {
        pageSize: 8,
      },
    },
  });

  return (
    // ✅ 1. تعديل البطاقة الرئيسية لدعم الوضع الليلي والتخلص من prop اللون
    <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-white dark:bg-slate-800">
      
      {/* 2. عرض مكون الفلاتر (الذي أصبح يدعم الوضع الليلي بنفسه) */}
      {filtersComponent && (
        <div className="rounded-t-lg mb-0 border-b border-slate-200 dark:border-slate-700">
          {filtersComponent}
        </div>
      )}

      {/* 3. تعديل رأس الجدول (العنوان وزر التصدير) */}
      <div className="rounded-t mb-0 px-4 py-3">
        <div className="flex flex-wrap items-center justify-between">
          <h3 className="font-semibold text-lg text-slate-700 dark:text-white">
            Attendance Records
          </h3>
          <button
            onClick={onExport}
            className="px-4 py-2 bg-sky-500 text-white text-sm font-bold rounded-md hover:bg-sky-600 shadow transition-all disabled:bg-sky-300 disabled:cursor-not-allowed"
            disabled={data.length === 0}
          >
            Export CSV
          </button>
        </div>
      </div>
      
      {/* 4. تعديل الجدول لدعم الوضع الليلي */}
      <div className="block w-full overflow-x-auto">
        <table className="items-center w-full bg-transparent border-collapse">
          <thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    // ✅ تعديل رأس الأعمدة للوضع الليلي
                    className="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-slate-50 dark:bg-slate-700 text-slate-500 dark:text-slate-300 border-slate-100 dark:border-slate-600"
                  >
                    <div
                      {...{
                        className: header.column.getCanSort()
                          ? "cursor-pointer select-none flex items-center gap-2"
                          : "flex items-center gap-2",
                        onClick: header.column.getToggleSortingHandler(),
                      }}
                    >
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                      {{
                        asc: <FaSortUp />,
                        desc: <FaSortDown />,
                      }[header.column.getIsSorted()] ??
                        (header.column.getCanSort() ? (
                          <FaSort className="opacity-30" />
                        ) : null)}
                    </div>
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.length > 0 ? (
              table.getRowModel().rows.map((row) => (
                <tr
                  key={row.id}
                  // ✅ تعديل لون التحويم للصفوف
                  className="hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
                >
                  {row.getVisibleCells().map((cell) => (
                    <td
                      key={cell.id}
                      // ✅ تعديل لون النص والحدود للخلايا
                      className="border-t-0 dark:border-slate-700 px-6 align-middle text-sm whitespace-nowrap p-4 text-slate-700 dark:text-slate-300"
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </td>
                  ))}
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={columns.length}
                  // ✅ تعديل نص "لا توجد سجلات"
                  className="text-center py-10 text-slate-500 dark:text-slate-400"
                >
                  No records found for the selected filters.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      
      {/* 5. تعديل قسم الترقيم للوضع الليلي */}
      {table.getPageCount() > 1 && (
        <div className="py-3 px-4 flex items-center justify-between flex-wrap gap-2 border-t border-solid border-slate-200 dark:border-slate-700">
          <span className="text-sm font-medium text-slate-600 dark:text-slate-300">
            Page{" "}
            <strong>
              {table.getState().pagination.pageIndex + 1} of{" "}
              {table.getPageCount()}
            </strong>
          </span>
          <div className="flex items-center gap-2">
            <button
              onClick={() => table.setPageIndex(0)}
              disabled={!table.getCanPreviousPage()}
              className="p-1 px-2 border rounded disabled:opacity-50 disabled:cursor-not-allowed transition-opacity border-slate-300 dark:border-slate-600 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700"
            >
              {"<<"}
            </button>
            <button
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
              className="p-1 px-2 border rounded disabled:opacity-50 disabled:cursor-not-allowed transition-opacity border-slate-300 dark:border-slate-600 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700"
            >
              {"<"}
            </button>
            <button
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
              className="p-1 px-2 border rounded disabled:opacity-50 disabled:cursor-not-allowed transition-opacity border-slate-300 dark:border-slate-600 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700"
            >
              {">"}
            </button>
            <button
              onClick={() => table.setPageIndex(table.getPageCount() - 1)}
              disabled={!table.getCanNextPage()}
              className="p-1 px-2 border rounded disabled:opacity-50 disabled:cursor-not-allowed transition-opacity border-slate-300 dark:border-slate-600 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700"
            >
              {">>"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

CardTable.defaultProps = {
  onExport: () => {},
  filtersComponent: null,
};

CardTable.propTypes = {
  data: PropTypes.array.isRequired,
  columns: PropTypes.array.isRequired,
  onExport: PropTypes.func,
  filtersComponent: PropTypes.node,
};
