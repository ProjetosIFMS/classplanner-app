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

interface CreateDialogProps {
  children: React.ReactNode;
  trigger: React.ReactNode;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  handleCreate: () => void;
  title?: string;
  description?: string;
  isLoading?: boolean;
}

export function CreateDialog({
  children,
  trigger,
  isOpen,
  setIsOpen,
  handleCreate,
  title = "Criar item",
  description = "Preencha os detalhes para a criação do item",
  isLoading = false,
}: CreateDialogProps) {
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
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

          <Button disabled={isLoading} onClick={handleCreate}>
            {isLoading ? "Criando" : "Criar"} <MdCheck className="ml-2" />
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
