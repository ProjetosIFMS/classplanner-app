"use client";

import { Button } from "@/app/_components/ui/button";
import type { Discipline } from "@/types/discipline";
import type { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/app/_components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/app/_components/ui/dialog";
import { MdDelete, MdEdit } from "react-icons/md";
import DisciplineForm from "../components/Discipline-form";

// Define a type for the delete function
type DeleteDisciplineFunction = (
  session: string | undefined,
  discipline_id: string,
) => Promise<boolean>;

// Create a function that returns the columns with the delete function injected
export const createColumns = (
  deleteDisciplineFn: DeleteDisciplineFunction,
  session: string | undefined,
): ColumnDef<Discipline>[] => {
  return [
    {
      accessorKey: "code",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            className="p-0 hover:bg-transparent"
          >
            COD.
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => (
        <div className="font-medium">{row.getValue("code")}</div>
      ),
    },
    {
      accessorKey: "name",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            className="p-0 hover:bg-transparent"
          >
            Nome
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => (
        <div className="max-w-[300px] truncate font-medium">
          {row.getValue("name")}
        </div>
      ),
    },
    {
      accessorKey: "semester",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            className="p-0 hover:bg-transparent"
          >
            Semestre
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => (
        <div className="text-center">
          <p>{row.getValue("semester")}º</p>
        </div>
      ),
    },
    {
      accessorKey: "totalHours",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            className="p-0 hover:bg-transparent"
          >
            Carga Horária Total
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => {
        const discipline = row.original;
        const totalHours =
          discipline?.practicalHours +
          discipline?.theoreticalHours +
          discipline?.extensionHours;

        return <div className="text-center font-medium">{totalHours}h</div>;
      },
    },
    {
      accessorKey: "practicalHours",
      header: "CH Prática",
      cell: ({ row }) => (
        <div className="text-center">{row.getValue("practicalHours")}h</div>
      ),
    },
    {
      accessorKey: "theoreticalHours",
      header: "CH Teórica",
      cell: ({ row }) => (
        <div className="text-center">{row.getValue("theoreticalHours")}h</div>
      ),
    },
    {
      accessorKey: "extensionHours",
      header: "CH Extensão",
      cell: ({ row }) => (
        <div className="text-center">{row.getValue("extensionHours")}h</div>
      ),
    },
    {
      id: "actions",
      header: () => <div className="text-center">Ações</div>,
      cell: ({ row }) => {
        const discipline = row.original;

        const handleDelete = async () => {
          if (
            confirm(`Deseja realmente excluir a disciplina ${discipline.name}?`)
          ) {
            try {
              const success = await deleteDisciplineFn(session, discipline.id);
              if (success) {
                alert("Disciplina excluída com sucesso!");
              } else {
                alert("Erro ao excluir disciplina.");
              }
            } catch {
              alert("Ocorreu um erro ao excluir a disciplina.");
            }
          }
        };

        return (
          <div className="flex items-center justify-center space-x-2">
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="ghost" className="text-blue-600" size="icon">
                  <MdEdit />
                </Button>
              </DialogTrigger>
              <DialogContent
                aria-describedby={undefined}
                className=" sm-max-w-[950px] sm:max-h-[720px]"
              >
                <DialogHeader>
                  <DialogTitle></DialogTitle>
                </DialogHeader>
                <DisciplineForm
                  data={discipline}
                  isUpdate
                  title="Editar Disciplina"
                  description="Preencha os detalhes para a edição da disciplina"
                />
              </DialogContent>
            </Dialog>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  size="icon"
                  variant="ghost"
                  className="text-destructive hover:text-destructive/90 hover:bg-destructive/10"
                >
                  <MdDelete />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem
                  className="text-destructive focus:text-destructive cursor-pointer"
                  onClick={handleDelete}
                >
                  Confirmar exclusão
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        );
      },
    },
  ];
};
