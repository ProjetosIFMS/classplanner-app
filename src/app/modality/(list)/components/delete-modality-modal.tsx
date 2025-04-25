import React from "react";

import { DeleteDialog } from "@/app/_components/dialogs/delete-dialog";

import { useDeleteModality } from "@/hooks/react-query/modalities";
import { Modality } from "@/types/modality";
import { Session } from "@/types/session";

interface DeleteModalityModalProps {
  session: Session;
  data: Modality;
}

export function DeleteModalityModal({
  session,
  data,
}: DeleteModalityModalProps) {
  const [isOpen, setIsOpen] = React.useState(false);

  const deleteModality = useDeleteModality(session);

  function handleDelete(modality_id: string) {
    setIsOpen(false);
    deleteModality.mutate(modality_id);
  }

  return (
    <DeleteDialog
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      handleDelete={() => handleDelete(data.id)}
      title="Excluir modalidade"
      description={`Tem certeza que deseja excluir a modalidade ${data.name}? Esta ação não pode ser desfeita.`}
      isLoading={deleteModality.isPending}
    />
  );
}
