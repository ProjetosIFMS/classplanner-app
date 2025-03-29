"use client";

import React from "react";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { ArrowUpDownIcon, ArrowUpIcon, ArrowDownIcon } from "lucide-react";

import { Card, CardContent } from "@/app/_components/ui/card";

export type ProfessorAndDiscipline = {
  professorName: string;
  disciplineName: string;
  courseName: string;
  workload: int;
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

interface ProfessorAndDisciplinesTableProps {
  data?: ProfessorAndDiscipline[];
}

export const ProfessorAndDisciplinesTable = (
  props: ProfessorAndDisciplinesTableProps
) => {
  const table = useReactTable({
    data: props.data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });
  return (
    <Card className="w-full pt-10">
      <CardContent>
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
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    {cell.column.id === "workload" ? "h" : ""}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </CardContent>
    </Card>
  );
};
