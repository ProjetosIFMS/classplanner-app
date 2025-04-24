"use client";

import React from "react";
import type { ColumnDef, Row } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import { MdEdit } from "react-icons/md";

import { Button } from "@/app/_components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/app/_components/ui/dialog";

import ModalityForm from "../../components/modality-form";
import { Modality } from "@/types/modality";
import { Session } from "@/types/session";
import { useDeleteModality } from "@/hooks/react-query/modalities";
import { DeleteDialog } from "@/app/_components/dialogs/delete-dialog";

interface ActionsRowProps {
  row: Row<Modality>;
  session: Session;
}

function ActionsRow(props: ActionsRowProps) {
  const modality = props.row.original;
  const deleteModality = useDeleteModality(props.session);
  const [isDeleteOpen, setIsDeleteOpen] = React.useState(false);

  function handleDelete() {
    deleteModality.mutate(modality.id, {
      onSuccess: () => {
        setIsDeleteOpen(false);
      },
    });
  }

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
            description="Preencha os detalhes para à criação da modalidade"
          />
        </DialogContent>
      </Dialog>

      <DeleteDialog
        handleDelete={handleDelete}
        isLoading={deleteModality.isPending}
        title="Excluir modalidade"
        description={`Você tem certeza que deseja excluir a modalidade ${modality.name}? Essa ação não poderá ser desfeita.`}
        isOpen={isDeleteOpen}
        setIsOpen={setIsDeleteOpen}
      />
    </div>
  );
}

export const createColumns = (
  session: string | undefined
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
      cell: ({ row }) => <ActionsRow row={row} session={session} />,
    },
  ];
};
