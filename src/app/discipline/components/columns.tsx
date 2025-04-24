"use client";

import type { ColumnDef, Row } from "@tanstack/react-table";
import { MdEdit } from "react-icons/md";
import { ArrowUpDown } from "lucide-react";
import React from "react";

import { Button } from "@/app/_components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/app/_components/ui/dialog";

import DisciplineForm from "../components/Discipline-form";
import type { Discipline } from "@/types/discipline";
import { DeleteDialog } from "@/app/_components/dialogs/delete-dialog";
import { useDeleteDiscipline } from "@/hooks/react-query/disciplines";
import { Session } from "@/types/session";

interface ActionsRowProps {
  row: Row<Discipline>;
  session: Session;
}

function ActionsRow(props: ActionsRowProps) {
  const discipline = props.row.original;
  const deleteDiscipline = useDeleteDiscipline(props.session);
  const [isDeleteOpen, setIsDeleteOpen] = React.useState(false);

  function handleDelete() {
    deleteDiscipline.mutate(discipline.id, {
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
          <DisciplineForm
            data={discipline}
            isUpdate
            title="Editar Disciplina"
            description="Preencha os detalhes para a edição da disciplina"
          />
        </DialogContent>
      </Dialog>

      <DeleteDialog
        handleDelete={handleDelete}
        isLoading={deleteDiscipline.isPending}
        title="Excluir disciplina"
        description={
          <p className="text-muted-foreground">
            Você tem certeza que deseja excluir a disciplina{" "}
            <span className="font-bold text-black">{discipline.name}</span>?
            Essa ação não poderá ser desfeita.
          </p>
        }
        openState={isDeleteOpen}
        setOpenState={setIsDeleteOpen}
      />
    </div>
  );
}

// Create a function that returns the columns with the delete function injected
export const createColumns = (
  session: string | undefined
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
      cell: ({ row }) => <ActionsRow row={row} session={session} />,
    },
  ];
};
