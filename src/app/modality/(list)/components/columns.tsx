"use client";

import React from "react";
import type { ColumnDef } from "@tanstack/react-table";
import { validate as isUUID } from "uuid";

import { Button } from "@/app/_components/ui/button";

import { Modality } from "@/types/modality";
import { UpdateModalityModalForm } from "@/app/modality/(list)/components/update-modality-modal-form";
import { DeleteModalityModal } from "@/app/modality/(list)/components/delete-modality-modal";
import ClipLoader from "react-spinners/ClipLoader";
import { RenderSortingIcon } from "@/app/_components/table/render-sorting-icon";
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
            <RenderSortingIcon column={column} />
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
      cell: ({ row }) =>
        isUUID(row.original.id) ? (
          <div className="flex items-center justify-center space-x-2">
            <UpdateModalityModalForm session={session} data={row.original} />

            <DeleteModalityModal session={session} data={row.original} />
          </div>
        ) : (
          <>
            <ClipLoader />
          </>
        ),
    },
  ];
};
