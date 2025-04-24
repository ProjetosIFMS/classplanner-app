"use client";

import React from "react";
import type { ColumnDef, Row } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";

import { Button } from "@/app/_components/ui/button";

import { Modality } from "@/types/modality";
import { Session } from "@/types/session";
import { useDeleteModality } from "@/hooks/react-query/modalities";
import { DeleteDialog } from "@/app/_components/dialogs/delete-dialog";
import { UpdateModalityModalForm } from "@/app/modality/(list)/components/update-modality-modal-form";

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
      <UpdateModalityModalForm session={props.session} data={modality} />

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
