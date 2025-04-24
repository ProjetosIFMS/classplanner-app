import React from "react";

import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogFooter,
  AlertDialogDescription,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/app/_components/ui/alert-dialog";
import { Button } from "@/app/_components/ui/button";
import { MdDelete } from "react-icons/md";
import ClipLoader from "react-spinners/ClipLoader";

interface DeleteDialogProps {
  handleDelete: () => void;
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  isLoading?: boolean;
  title?: string;
  description?: string;
  trigger?: React.ReactNode;
}

export function DeleteDialog({
  handleDelete,
  isOpen,
  setIsOpen,
  isLoading = false,
  title = "Confirmar exclusão",
  description = "Tem certeza que deseja excluir este item? Esta ação não pode ser desfeita.",
  trigger = undefined,
}: DeleteDialogProps) {
  return (
    <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
      <AlertDialogTrigger asChild>
        {trigger ?? (
          <Button
            size="icon"
            variant="ghost"
            className="text-destructive hover:text-destructive/90 hover:bg-destructive/10"
          >
            <MdDelete />
          </Button>
        )}
      </AlertDialogTrigger>

      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title ?? "Confirmar exclusão"}</AlertDialogTitle>
          <AlertDialogDescription>
            {description ??
              "Tem certeza que deseja excluir este item? Esta ação não pode ser desfeita."}
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel disabled={isLoading}>Cancelar</AlertDialogCancel>
          <AlertDialogAction
            onClick={handleDelete}
            className={`bg-red-600 hover:bg-red-700 ${isLoading ? "opacity-80" : ""}`}
            disabled={isLoading}
          >
            {isLoading ? (
              <div className="flex items-center gap-2">
                <ClipLoader size={16} color="#FFFFFF" />
                <span>Excluindo...</span>
              </div>
            ) : (
              <span>Excluir</span>
            )}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
