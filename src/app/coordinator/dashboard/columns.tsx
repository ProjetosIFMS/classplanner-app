import { ColumnDef } from "@tanstack/react-table";

import { Button } from "@/app/_components/ui/button";

import { RenderSortingIcon } from "@/app/_components/table/render-sorting-icon";

export type ProfessorAndDiscipline = {
  professorName: string;
  disciplineName: string;
  courseName: string;
  workload: number;
};

export function createColumns(): ColumnDef<ProfessorAndDiscipline>[] {
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
