import React from "react";

import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/app/_components/ui/dialog";
import { Button } from "@/app/_components/ui/button";
import { MdDelete } from "react-icons/md";
import ClipLoader from "react-spinners/ClipLoader";

interface DeleteDialogProps {
  handleDelete: () => void;
  isLoading?: boolean;
  title?: string;
  description?: React.ReactNode;
  trigger?: React.ReactNode;
  openState?: boolean;
  setOpenState?: (open: boolean) => void;
}

export function DeleteDialog(props: DeleteDialogProps) {
  return (
    <Dialog open={props.openState} onOpenChange={props.setOpenState}>
      <DialogTrigger asChild>
        {props.trigger ?? (
          <Button
            size="icon"
            variant="ghost"
            className="text-destructive hover:text-destructive/90 hover:bg-destructive/10"
          >
            <MdDelete />
          </Button>
        )}
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>{props.title ?? "Confirmar exclusão"}</DialogTitle>
        </DialogHeader>

        {props.description ?? (
          <p className="text-sm text-muted-foreground">
            Você tem certeza que deseja excluir este item? Esta ação não pode
            ser desfeita.
          </p>
        )}

        <Button
          variant="destructive"
          onClick={props.handleDelete}
          className={`mt-4 ${props.isLoading ? "opacity-80" : ""}`}
          disabled={props.isLoading}
        >
          {props.isLoading ? (
            <div className="flex items-center gap-2">
              <ClipLoader size={16} color="#FFFFFF" />
              <span>Excluindo...</span>
            </div>
          ) : (
            <span>Excluir</span>
          )}
        </Button>
      </DialogContent>
    </Dialog>
  );
}
