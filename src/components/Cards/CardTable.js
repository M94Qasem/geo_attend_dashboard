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

// 1. قبول مكون الفلاتر "filtersComponent" كـ prop
export default function CardTable({
  color,
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
    <div
      className={
        "relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded " +
        (color === "light" ? "bg-white" : "bg-slate-700 text-white")
      }
    >
      {/* 2. عرض مكون الفلاتر هنا إذا تم تمريره */}
      {filtersComponent && (
        <div className="rounded-t-lg mb-0 px-4 py-3 border-0">
          {filtersComponent}
        </div>
      )}

      <div className="rounded-t mb-0 px-4 py-3 border-0">
        <div className="flex flex-wrap items-center justify-between">
          <h3
            className={
              "font-semibold text-lg " +
              (color === "light" ? "text-slate-700" : "text-white")
            }
          >
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
      <div className="block w-full overflow-x-auto">
        <table className="items-center w-full bg-transparent border-collapse">
          <thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    className="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-slate-50 text-slate-500 border-slate-100"
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
                  className="hover:bg-gray-50 transition-colors"
                >
                  {row.getVisibleCells().map((cell) => (
                    <td
                      key={cell.id}
                      className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4"
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
                  className="text-center py-10 text-slate-500"
                >
                  No records found for the selected filters.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      {/* 3. تصحيح منطق عرض الترقيم */}
      {table.getPageCount() > 1 && (
        <div className="py-3 px-4 flex items-center justify-between flex-wrap gap-2 border-t border-solid border-slate-200">
          <span className="text-sm font-medium text-slate-600">
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
              className="p-1 px-2 border rounded disabled:opacity-50 disabled:cursor-not-allowed transition-opacity"
            >
              {"<<"}
            </button>
            <button
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
              className="p-1 px-2 border rounded disabled:opacity-50 disabled:cursor-not-allowed transition-opacity"
            >
              {"<"}
            </button>
            <button
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
              className="p-1 px-2 border rounded disabled:opacity-50 disabled:cursor-not-allowed transition-opacity"
            >
              {">"}
            </button>
            <button
              onClick={() => table.setPageIndex(table.getPageCount() - 1)}
              disabled={!table.getCanNextPage()}
              className="p-1 px-2 border rounded disabled:opacity-50 disabled:cursor-not-allowed transition-opacity"
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
  color: "light",
  onExport: () => {},
  filtersComponent: null,
};

CardTable.propTypes = {
  color: PropTypes.oneOf(["light", "dark"]),
  data: PropTypes.array.isRequired,
  columns: PropTypes.array.isRequired,
  onExport: PropTypes.func,
  filtersComponent: PropTypes.node, // Prop جديدة لمكون الفلاتر
};
