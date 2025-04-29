import React from "react";

import { PPC } from "@/types/ppc";
import { Session } from "@/types/session";
import { DeleteDialog } from "@/app/_components/dialogs/delete-dialog";
import { useDeletePPC } from "@/hooks/react-query/ppc";

interface DeletePPCmodalProps {
  session: Session;
  data: PPC;
}

export function DeletePPCmodal({ session, data }: DeletePPCmodalProps) {
  const [isOpen, setIsOpen] = React.useState(false);

  const deletePPC = useDeletePPC(session);

  function handleDelete(ppc_id: string) {
    deletePPC.mutate(ppc_id, { onSuccess: () => setIsOpen(false) });
  }

  return (
    <DeleteDialog
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      handleDelete={() => handleDelete(data.id)}
      title="Excluir PPC"
      description={`Tem certeza que deseja excluir o PPC ${data.year}? Esta ação não pode ser desfeita.`}
      isLoading={deletePPC.isPending}
    />
  );
}
