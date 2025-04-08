"use client";

import { z } from "zod";
import ClipLoader from "react-spinners/ClipLoader";
import React from "react";

import { Button } from "@/app/_components/ui/button";
import { Input } from "@/app/_components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/app/_components/ui/dialog";
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
    postArea.mutate(data, {
      onSuccess: () => {
        setIsOpen(false);
      },
      onError: () => {},
    });
  }
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="text-lg font-bold">
          Criar área
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Criar área</DialogTitle>
        </DialogHeader>
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
            <DialogFooter>
              <Button type="submit" disabled={postArea.isPending}>
                {postArea.isPending ? (
                  <ClipLoader color="#FFFFFF" size={16} />
                ) : (
                  "Enviar"
                )}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
