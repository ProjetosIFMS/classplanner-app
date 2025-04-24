import { MdOutlineClose, MdCheck } from "react-icons/md";

import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/app/_components/ui/dialog";
import { Button } from "@/app/_components/ui/button";

interface EditDialogProps {
  children: React.ReactNode;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  handleEdit: () => void;
  title?: string;
  description?: string;
  isLoading?: boolean;
}

export function EditDialog({
  children,
  isOpen,
  setIsOpen,
  handleEdit,
  title = "Editar item",
  description = "Preencha os detalhes para a edição do item",
  isLoading = false,
}: EditDialogProps) {
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>

        {children}

        <DialogFooter>
          <Button disabled={isLoading}>
            Cancelar <MdOutlineClose className="ml-2" />
          </Button>

          <Button disabled={isLoading} onClick={handleEdit}>
            {isLoading ? "Salvando" : "Salvar"} <MdCheck className="ml-2" />
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
