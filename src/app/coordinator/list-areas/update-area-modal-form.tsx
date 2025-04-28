"use client";

import React from "react";
import { Plus } from "lucide-react";

import { Button } from "@/app/_components/ui/button";
import { Input } from "@/app/_components/ui/input";
import {
  FormItem,
  FormField,
  FormControl,
  FormLabel,
  FormMessage,
} from "@/app/_components/ui/form";

import { areaSchema, AreaValues } from "@/types/validation/area_form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { usePatchArea } from "@/hooks/react-query/areas";
import { useAuth } from "@/app/_components/auth/AuthContext";
import { UpdateDialogForm } from "@/app/_components/dialogs/update-dialog-form";
import { Area } from "@/types/area";

interface UpdateAreaModalFormProps {
  data: Area;
}

export function UpdateAreaModalForm({ data }: UpdateAreaModalFormProps) {
  const { session } = useAuth();
  const patchArea = usePatchArea(session);

  const [isOpen, setIsOpen] = React.useState<boolean>(false);

  const form = useForm<AreaValues>({
    resolver: zodResolver(areaSchema),
    defaultValues: {
      name: data?.name ?? "",
    },
  });

  const { id: area_id } = data;
  function onSubmit(data: AreaValues) {
    setIsOpen(false);
    patchArea.mutate(
      { formData: data, area_id: area_id },
      {
        onSuccess: () => {},
        onError: () => {},
      }
    );
  }
  return (
    <UpdateDialogForm<AreaValues>
      form={form}
      onSubmit={onSubmit}
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      title="Editar área"
      description={`Preencha os campos para editar a área ${data?.name}`}
      isLoading={patchArea.isPending}
    >
      <FormField
        control={form.control}
        name="name"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Nome</FormLabel>
            <FormControl>
              <Input placeholder="Nome da área" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </UpdateDialogForm>
  );
}
