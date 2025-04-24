import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Plus } from "lucide-react";

import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/app/_components/ui/form";
import { Button } from "@/app/_components/ui/button";
import { Input } from "@/app/_components/ui/input";

import { CreateDialogForm } from "@/app/_components/dialogs/create-dialog-form";
import {
  ModalityValues,
  modalitySchema,
} from "@/types/validation/modality_form";
import { usePostModality } from "@/hooks/react-query/modalities";
import { Session } from "@/types/session";

interface CreateModalityFormProps {
  session: Session;
}

export function CreateModalityForm({ session }: CreateModalityFormProps) {
  const [isOpen, setIsOpen] = React.useState(false);

  const postModality = usePostModality(session);

  const form = useForm<ModalityValues>({
    resolver: zodResolver(modalitySchema),
    defaultValues: {
      name: "",
    },
  });

  function onSubmit(data: ModalityValues) {
    postModality.mutate(data, {
      onSuccess: () => {
        setIsOpen(false);
      },
    });
  }

  return (
    <CreateDialogForm<ModalityValues>
      form={form}
      onSubmit={onSubmit}
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      trigger={
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Nova Modalidade
        </Button>
      }
      description="Preencha os campos abaixo para criar uma nova modalidade."
      title="Criar Modalidade"
      isLoading={postModality.isPending}
    >
      <FormField
        control={form.control}
        name="name"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Nome</FormLabel>
            <FormControl>
              <Input placeholder="Nome da modalidade" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </CreateDialogForm>
  );
}
