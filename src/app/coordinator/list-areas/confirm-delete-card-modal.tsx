import React from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/app/_components/ui/alert-dialog";
import { Loader2, Trash2 } from "lucide-react";
import { Button } from "@/app/_components/ui/button";

export const ConfirmDeleteCardModal = ({
  id,
  isLoading,
  onDelete,
}: {
  id: string;
  isLoading?: boolean;
  onDelete: (id: string) => void;
}) => {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 hover:text-destructive"
        >
          <Trash2 className="h-4 w-4" />
          <span className="sr-only">Excluir</span>
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Tem certeza que deseja excluir esta área?
          </AlertDialogTitle>
          <AlertDialogDescription>
            Esta ação não pode ser desfeita. Esta área e todas as suas
            configurações serão excluídas permanentemente.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={isLoading}>Cancelar</AlertDialogCancel>
          <AlertDialogAction
            className="bg-red-600 hover:bg-red-700 w-20"
            onClick={() => onDelete(id)}
            disabled={isLoading}
          >
            {isLoading ? <Loader2 className="animate-spin" /> : "Excluir"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
