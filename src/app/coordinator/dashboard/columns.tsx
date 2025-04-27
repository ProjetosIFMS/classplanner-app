import { ColumnDef, Column } from "@tanstack/react-table";
import { ArrowUpDown, ArrowUp, ArrowDown } from "lucide-react";

import { Button } from "@/app/_components/ui/button";

export type ProfessorAndDiscipline = {
  professorName: string;
  disciplineName: string;
  courseName: string;
  workload: number;
};

export function createColumns(): ColumnDef<ProfessorAndDiscipline>[] {
  function RenderSortingIcon({
    column,
  }: {
    column: Column<ProfessorAndDiscipline, unknown>;
  }) {
    return (
      {
        asc: <ArrowUp />,
        desc: <ArrowDown />,
      }[column.getIsSorted() as string] ?? <ArrowUpDown />
    );
  }

  return [
    {
      accessorKey: "professorName",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            className="p-0 hover:bg-transparent"
          >
            Professor
            <RenderSortingIcon column={column} />
          </Button>
        );
      },
      cell: ({ row }) => (
        <div className="font-medium">{row.getValue("professorName")}</div>
      ),
    },
    {
      accessorKey: "disciplineName",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            className="p-0 hover:bg-transparent"
          >
            Disciplina
            <RenderSortingIcon column={column} />
          </Button>
        );
      },
      cell: ({ row }) => (
        <div className="font-medium">{row.getValue("disciplineName")}</div>
      ),
    },
    {
      accessorKey: "courseName",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            className="p-0 hover:bg-transparent"
          >
            Curso
            <RenderSortingIcon column={column} />
          </Button>
        );
      },
      cell: ({ row }) => (
        <div className="font-medium">{row.getValue("courseName")}</div>
      ),
    },
    {
      accessorKey: "workload",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            className="p-0 hover:bg-transparent"
          >
            Carga horária
            <RenderSortingIcon column={column} />
          </Button>
        );
      },
      cell: ({ row }) => (
        <div className="flex font-medium">{row.getValue("workload")}</div>
      ),
    },
  ];
}
