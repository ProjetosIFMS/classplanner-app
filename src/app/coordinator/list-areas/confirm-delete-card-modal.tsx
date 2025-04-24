import React from "react";

import { DeleteDialog } from "@/app/_components/dialogs/delete-dialog";

export const ConfirmDeleteCardModal = ({
  id,
  isLoading,
  onDelete,
}: {
  id: string;
  isLoading?: boolean;
  onDelete: (id: string) => void;
}) => {
  const [isOpen, setIsOpen] = React.useState<boolean>(false);
  return (
    <DeleteDialog
      handleDelete={() => onDelete(id)}
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      isLoading={isLoading}
    />
  );
};
