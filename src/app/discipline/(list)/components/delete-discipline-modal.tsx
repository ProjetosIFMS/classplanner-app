import React from "react";

import { DeleteDialog } from "@/app/_components/dialogs/delete-dialog";
import { useDeleteDiscipline } from "@/hooks/react-query/disciplines";
import { Session } from "@/types/session";
import { Discipline } from "@/types/discipline";

interface DeleteDisciplineModalProps {
  session: Session;
  data: Discipline;
}

export function DeleteDisciplineModal({
  session,
  data,
}: DeleteDisciplineModalProps) {
  const [isOpen, setIsOpen] = React.useState(false);

  const deleteDiscipline = useDeleteDiscipline(session);

  function handleDelete(discipline_id: string) {
    setIsOpen(false);
    deleteDiscipline.mutate(discipline_id);
  }

  return (
    <DeleteDialog
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      handleDelete={() => handleDelete(data.id)}
      title="Excluir modalidade"
      description={`Tem certeza que deseja excluir a modalidade ${data.name}? Esta ação não pode ser desfeita.`}
      isLoading={deleteDiscipline.isPending}
    />
  );
}
