import { MdOutlineClose, MdCheck } from "react-icons/md";
import { type UseFormReturn, type FieldValues } from "react-hook-form";
import { MdEdit } from "react-icons/md";

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
import { Form } from "@/app/_components/ui/form";

interface UpdateDialogFormProps<TFormValues extends FieldValues> {
  children: React.ReactNode;
  trigger?: React.ReactNode;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  form: UseFormReturn<TFormValues>;
  onSubmit: (data: TFormValues) => void | Promise<void>;
  title?: string;
  description?: string;
  isLoading?: boolean;
}

export function UpdateDialogForm<TFormValues extends FieldValues>({
  children,
  isOpen,
  setIsOpen,
  form,
  onSubmit,
  trigger = null,
  title = "Editar item",
  description = "Preencha os detalhes para a edição do item",
  isLoading = false,
}: UpdateDialogFormProps<TFormValues>) {
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {trigger ?? (
          <Button variant="ghost" className="text-blue-600" size="icon">
            <MdEdit />
          </Button>
        )}
      </DialogTrigger>
      <DialogContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <DialogHeader>
              <DialogTitle>{title}</DialogTitle>
              <DialogDescription>{description}</DialogDescription>
            </DialogHeader>

            {children}

            <DialogFooter>
              <Button
                disabled={isLoading}
                type="button"
                onClick={() => setIsOpen(false)}
                variant={"outline"}
              >
                Cancelar <MdOutlineClose className="ml-2" />
              </Button>
              <Button disabled={isLoading} type="submit">
                {isLoading ? "Salvando" : "Salvar"} <MdCheck className="ml-2" />
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
