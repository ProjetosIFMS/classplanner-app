import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/app/_components/ui/form";
import { Input } from "@/app/_components/ui/input";

import { UpdateDialogForm } from "@/app/_components/dialogs/update-dialog-form";
import {
  ModalityValues,
  modalitySchema,
} from "@/types/validation/modality_form";
import { usePatchModality } from "@/hooks/react-query/modalities";
import { Session } from "@/types/session";
import { Modality } from "@/types/modality";

interface UpdateModalityModalFormProps {
  session: Session;
  data: Modality;
}

export function UpdateModalityModalForm({
  session,
  data,
}: UpdateModalityModalFormProps) {
  const [isOpen, setIsOpen] = React.useState(false);

  const patchModality = usePatchModality(session);

  const form = useForm<ModalityValues>({
    resolver: zodResolver(modalitySchema),
    defaultValues: {
      name: "",
    },
  });

  function onSubmit(formData: ModalityValues) {
    setIsOpen(false);
    patchModality.mutate(
      { data: formData, modality_id: data.id },
      {
        onSuccess: () => {
          setIsOpen(false);
        },
      }
    );
  }

  return (
    <UpdateDialogForm<ModalityValues>
      form={form}
      onSubmit={onSubmit}
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      description={`Preencha os campos abaixo para editar a modalidade ${data.name}.`}
      title="Editar modalidade"
      isLoading={patchModality.isPending}
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
    </UpdateDialogForm>
  );
}
