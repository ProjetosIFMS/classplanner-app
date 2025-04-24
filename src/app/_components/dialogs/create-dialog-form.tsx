import { MdOutlineClose, MdCheck } from "react-icons/md";
import { type UseFormReturn, type FieldValues } from "react-hook-form";

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

interface CreateDialogFormProps<TFormValues extends FieldValues> {
  children: React.ReactNode;
  trigger: React.ReactNode;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  form: UseFormReturn<TFormValues>;
  onSubmit: (data: TFormValues) => void | Promise<void>;
  title?: string;
  description?: string;
  isLoading?: boolean;
}

export function CreateDialogForm<TFormValues extends FieldValues>({
  children,
  trigger,
  isOpen,
  setIsOpen,
  form,
  onSubmit,
  title = "Criar item",
  description = "Preencha os detalhes para a criação do item",
  isLoading = false,
}: CreateDialogFormProps<TFormValues>) {
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
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
                onClick={() => setIsOpen(false)}
                variant={"outline"}
              >
                Cancelar <MdOutlineClose className="ml-2" />
              </Button>
              <Button disabled={isLoading} type="submit">
                {isLoading ? "Criando" : "Criar"} <MdCheck className="ml-2" />
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
