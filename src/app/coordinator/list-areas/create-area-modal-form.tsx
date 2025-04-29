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
import { usePostArea } from "@/hooks/react-query/areas";
import { useAuth } from "@/app/_components/auth/AuthContext";
import { CreateDialogForm } from "@/app/_components/dialogs/create-dialog-form";

export function CreateAreaModalForm() {
  const { session } = useAuth();
  const postArea = usePostArea(session);

  const [isOpen, setIsOpen] = React.useState<boolean>(false);

  const form = useForm<AreaValues>({
    resolver: zodResolver(areaSchema),
    defaultValues: {
      name: "",
    },
  });

  function onSubmit(data: AreaValues) {
    setIsOpen(false);
    postArea.mutate(data, {
      onSuccess: () => {},
      onError: () => {},
      onSettled: () => {
        form.reset();
      },
    });
  }
  return (
    <CreateDialogForm<AreaValues>
      form={form}
      onSubmit={onSubmit}
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      trigger={
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Nova área
        </Button>
      }
      title="Criar nova área"
      description="Preencha os campos para a criação da área"
      isLoading={postArea.isPending}
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
    </CreateDialogForm>
  );
}
