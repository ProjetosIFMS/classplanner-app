"use client";

import { Button } from "@/app/_components/ui/button";
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
import ModalityForm from "../../modality-form";
import { Modality } from "@/types/modality";

// Define a type for the delete function
type DeleteModalityFunction = (
  session: string | undefined,
  modality_id: string,
) => Promise<boolean>;

// Create a function that returns the columns with the delete function injected
export const createColumns = (
  deleteModalityFn: DeleteModalityFunction,
  session: string | undefined,
): ColumnDef<Modality>[] => {
  return [
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
        <div className="max-w-[300px] truncate flex justify-center font-medium">
          {row.getValue("name")}
        </div>
      ),
    },
    {
      id: "actions",
      header: () => <div className="text-center">Ações</div>,
      cell: ({ row }) => {
        const modality = row.original;

        const handleDelete = async () => {
          if (
            confirm(`Deseja realmente excluir a modalidade ${modality.name}?`)
          ) {
            try {
              const success = await deleteModalityFn(session, modality.id);
              if (success) {
                alert("Modalidade excluída com sucesso!");
              } else {
                alert("Erro ao excluir modalidade.");
              }
            } catch {
              alert("Ocorreu um erro ao excluir a modalidade.");
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
                <ModalityForm
                  data={modality}
                  isUpdate
                  title="Editar Modalidade"
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
