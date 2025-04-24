"use client";

import { z } from "zod";
import React from "react";
import { Plus } from "lucide-react";

import { Button } from "@/app/_components/ui/button";
import { Input } from "@/app/_components/ui/input";
import {
  Form,
  FormItem,
  FormField,
  FormControl,
  FormLabel,
  FormMessage,
} from "@/app/_components/ui/form";

import { areaSchema } from "@/types/validation/area_form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { usePostArea } from "@/hooks/react-query/areas";
import { useAuth } from "@/app/_components/auth/AuthContext";
import { CreateDialog } from "@/app/_components/dialogs/create-dialog";

export function CreateAreaModal() {
  const { session } = useAuth();
  const postArea = usePostArea(session);

  const [isOpen, setIsOpen] = React.useState<boolean>(false);

  const form = useForm<z.infer<typeof areaSchema>>({
    resolver: zodResolver(areaSchema),
    defaultValues: {
      name: "",
    },
  });

  function onSubmit(data: z.infer<typeof areaSchema>) {
    setIsOpen(false);
    postArea.mutate(data, {
      onSuccess: () => {},
      onError: () => {},
    });
  }
  return (
    <CreateDialog
      handleCreate={form.handleSubmit(onSubmit)}
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
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
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
        </form>
      </Form>
    </CreateDialog>
  );
}
