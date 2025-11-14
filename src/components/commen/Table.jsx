import React, { useLayoutEffect, useEffect, useState } from "react";
import {
  useReactTable,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
} from "@tanstack/react-table";
import { Skeleton } from "@mui/material";

const DataTable = ({ columns, data, onRowClick, striped = true, loading = false }) => {
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  });

  const table = useReactTable({
    data,
    columns,
    state: { pagination },
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  const adjustRowsByHeight = () => {
    const screenHeight = window.innerHeight;
    const headerHeight = 140;
    const rowHeight = 36;
    const availableHeight = screenHeight - headerHeight;
    const rows = Math.floor(availableHeight / rowHeight);
    const pageSize = Math.max(5, Math.min(rows, 100));
    setPagination((prev) => ({ ...prev, pageSize }));
  };

  useLayoutEffect(() => {
    adjustRowsByHeight();
  }, []);

  useEffect(() => {
    window.addEventListener("resize", adjustRowsByHeight);
    return () => window.removeEventListener("resize", adjustRowsByHeight);
  }, []);

  const skeletonRows = Array.from({ length: pagination.pageSize });

  return (
    <>
      <table className="w-full border-collapse border">
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th
                  key={header.id}
                  className="p-2 border-b bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider"
                >
                  {flexRender(header.column.columnDef.header, header.getContext())}
                </th>
              ))}
            </tr>
          ))}
        </thead>

        <tbody>
          {loading
            ? skeletonRows.map((_, i) => (
                <tr key={i}>
                  {columns.map((col, j) => (
                    <td key={j} className="py-2 px-2 border-b">
                      <div className="h-3 bg-gray-200 rounded w-[80%]"></div>
                    </td>
                  ))}
                </tr>
              ))
            : table.getRowModel().rows.map((row) => (
                <tr
                  key={row.id}
                  className="even:bg-gray-100 hover:bg-gray-200 cursor-pointer"
                  onClick={() => onRowClick?.(row.original)}
                >
                  {row.getVisibleCells().map((cell) => (
                    <td key={cell.id} className="py-1 px-2 text-xs text-gray-800">
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </td>
                  ))}
                </tr>
              ))}
        </tbody>
      </table>

      {/* Pagination Footer */}
      <div className="flex flex-col sm:flex-row justify-between items-center p-2 bg-gray-50 border-b border-l border-r border-gray-200 gap-2 sm:gap-0">
        <div className="text-sm text-gray-600">
          Page {pagination.pageIndex + 1} of {table.getPageCount()}
        </div>

        {/* Page number buttons (pagination window) */}
        <div className="flex items-center gap-1 flex-wrap justify-center sm:justify-end">
          <button
            className="px-2 py-1 border rounded text-sm disabled:opacity-50"
            onClick={() => table.setPageIndex(0)}
            disabled={!table.getCanPreviousPage()}
          >
            {"<<"}
          </button>
          <button
            className="px-2 py-1 border rounded text-sm disabled:opacity-50"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Prev
          </button>

          {/* Pagination Window Logic */}
          {(() => {
            const totalPages = table.getPageCount();
            const current = pagination.pageIndex;
            const windowSize = 5;

            let start = Math.max(0, current - Math.floor(windowSize / 2));
            let end = Math.min(totalPages, start + windowSize);

            if (end - start < windowSize) {
              start = Math.max(0, end - windowSize);
            }

            return (
              <>
                {start > 0 && (
                  <span className="px-2 py-1 text-gray-500">...</span>
                )}

                {Array.from({ length: end - start }).map((_, i) => {
                  const pageIndex = start + i;
                  return (
                    <button
                      key={pageIndex}
                      className={`px-2 py-1 border rounded text-sm ${
                        pageIndex === current
                          ? "bg-blue-500 text-white"
                          : "bg-white hover:bg-gray-100"
                      }`}
                      onClick={() => table.setPageIndex(pageIndex)}
                    >
                      {pageIndex + 1}
                    </button>
                  );
                })}

                {end < totalPages && (
                  <span className="px-2 py-1 text-gray-500">...</span>
                )}
              </>
            );
          })()}

          <button
            className="px-2 py-1 border rounded text-sm disabled:opacity-50"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </button>
          <button
            className="px-2 py-1 border rounded text-sm disabled:opacity-50"
            onClick={() => table.setPageIndex(table.getPageCount() - 1)}
            disabled={!table.getCanNextPage()}
          >
            {">>"}
          </button>
        </div>
      </div>
    </>
  );
};

export default DataTable;
