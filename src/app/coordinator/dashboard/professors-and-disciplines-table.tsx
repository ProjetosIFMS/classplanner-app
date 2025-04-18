"use client";

import React from "react";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  getPaginationRowModel,
  PaginationState,
  useReactTable,
} from "@tanstack/react-table";
import { ArrowUpDownIcon, ArrowUpIcon, ArrowDownIcon } from "lucide-react";
import ClipLoader from "react-spinners/ClipLoader";

import { Card, CardContent } from "@/app/_components/ui/card";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
} from "@/app/_components/ui/pagination";

export type ProfessorAndDiscipline = {
  professorName: string;
  disciplineName: string;
  courseName: string;
  workload: number;
};

const columnHelper = createColumnHelper<ProfessorAndDiscipline>();

const columns = [
  columnHelper.accessor("professorName", {
    header: "Professor",
    cell: (info) => info.getValue(),
    sortingFn: "alphanumeric",
  }),
  columnHelper.accessor("disciplineName", {
    header: "Disciplina",
    cell: (info) => info.getValue(),
    sortingFn: "alphanumeric",
  }),
  columnHelper.accessor("courseName", {
    header: "Curso",
    cell: (info) => info.getValue(),
    sortingFn: "alphanumeric",
  }),
  columnHelper.accessor("workload", {
    header: "Carga Horária",
    cell: (info) => info.getValue(),
    sortingFn: "alphanumeric",
  }),
];

const paginationItemClassName =
  "cursor-pointer px-2 py-1 text-sm text-gray-700 hover:bg-gray-200 rounded-md select-none";

interface ProfessorAndDisciplinesTableProps {
  data?: ProfessorAndDiscipline[];
  isLoading?: boolean;
}

export const ProfessorAndDisciplinesTable = (
  props: ProfessorAndDisciplinesTableProps
) => {
  const [pagination, setPagination] = React.useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });

  const table = useReactTable({
    data: props.data ?? [],
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onPaginationChange: setPagination,
    state: {
      pagination,
    },
  });
  return (
    <Card className="w-full pt-8">
      <CardContent>
        {props.isLoading ? (
          <div className="flex justify-center items-center">
            <ClipLoader />
          </div>
        ) : (
          <table className="w-full border-collapse">
            <thead className="border-b border-gray-300">
              {table.getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <th
                      key={header.id}
                      colSpan={header.colSpan}
                      className={`px-4 py-2 text-muted-foreground font-medium cursor-pointer ${
                        header.column.id === "workload"
                          ? "text-right"
                          : "text-left"
                      }`}
                      onClick={header.column.getToggleSortingHandler()}
                    >
                      <div className="flex items-center gap-2">
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                        {{
                          asc: <ArrowUpIcon size={16} />,
                          desc: <ArrowDownIcon size={16} />,
                        }[header.column.getIsSorted() as string] ?? (
                          <ArrowUpDownIcon size={16} />
                        )}
                      </div>
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody>
              {table.getRowModel().rows.map((row, rowIndex) => (
                <tr
                  key={row.id}
                  className={`${rowIndex > 0 ? "border-t border-gray-300" : ""}`}
                >
                  {row.getVisibleCells().map((cell) => (
                    <td
                      key={cell.id}
                      className={`px-4 py-6
                        ${cell.column.id === "workload" ? "text-right" : ""}
                        ${cell.column.id === "disciplineName" ? "font-normal" : "font-medium"}
                    `}
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                      {cell.column.id === "workload" ? "h" : ""}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        )}
        <Pagination>
          <PaginationContent>
            <PaginationItem
              className={`${paginationItemClassName} ${!table.getCanPreviousPage() ? "text-gray-400 pointer-events-none" : ""}`}
              onClick={() => table.firstPage()}
            >
              {"<<"}
            </PaginationItem>

            <PaginationItem
              className={`${paginationItemClassName} ${!table.getCanPreviousPage() ? "text-gray-400 pointer-events-none" : ""}`}
              onClick={() => table.previousPage()}
            >
              {"<"}
            </PaginationItem>

            <PaginationItem className="px-2 py-1 text-sm font-medium">
              {!props.isLoading &&
                `${pagination.pageIndex + 1} / ${table.getPageCount()}`}
            </PaginationItem>

            <PaginationItem
              className={`${paginationItemClassName} ${!table.getCanNextPage() ? "text-gray-400 pointer-events-none" : ""}`}
              onClick={() => table.nextPage()}
            >
              {">"}
            </PaginationItem>

            <PaginationItem
              className={`${paginationItemClassName} ${!table.getCanNextPage() ? "text-gray-400 pointer-events-none" : ""}`}
              onClick={() => table.lastPage()}
            >
              {">>"}
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </CardContent>
    </Card>
  );
};
