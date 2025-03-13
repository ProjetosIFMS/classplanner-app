"use client";
import { Button } from "./button";
import {
  FieldValues,
  SubmitHandler,
  useForm,
  UseFormProps,
  UseFormReturn,
} from "react-hook-form";
import { MdOutlineClose, MdCheck } from "react-icons/md";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./card";
import { ReactNode } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { FormProvider } from "react-hook-form";

type FormCardProps<TFormValues extends FieldValues> = {
  title?: string;
  description?: string;
  schema: z.ZodType<TFormValues>;
  defaultValues: UseFormProps<TFormValues>["defaultValues"];
  onSubmit: SubmitHandler<TFormValues>;
  children: (form: UseFormReturn<TFormValues>) => ReactNode;
  weight: "sm" | "md" | "lg" | "xl" | "2xl";
};

export const FormCard = <TFormValues extends FieldValues>({
  onSubmit,
  title,
  description,
  children,
  schema,
  defaultValues,
  weight = "sm",
}: FormCardProps<TFormValues>) => {
  const form = useForm<TFormValues>({
    resolver: zodResolver(schema),
    defaultValues,
  });

  const handleSubmit = async (data: TFormValues) => {
    try {
      await onSubmit(data);
      form.reset();
    } catch (err) {
      throw err;
    }
  };

  return (
    <Card className={`w-full max-w-${weight} max-w- mx-auto shadow-sm`}>
      <CardHeader className="border-b pb-2 pt-4 px-4">
        <CardTitle>{title}</CardTitle>
        <CardDescription className="text-xs">{description}</CardDescription>
      </CardHeader>
      <FormProvider {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="mt-5">
          <CardContent>{children(form)}</CardContent>
          <CardFooter className="justify-end">
            <div className="flex justify-end gap-5 mt-6">
              <Button
                type="button"
                onClick={() => form.reset()}
                variant={"outline"}
              >
                Cancelar
                <MdOutlineClose className="ml-2" />
              </Button>
              <Button
                type="submit"
                disabled={form.formState.isSubmitting}
                variant={"default"}
              >
                {form.formState.isSubmitting ? "Salvando..." : "Salvar"}
                <MdCheck className="ml-2" />
              </Button>
            </div>
          </CardFooter>
        </form>
      </FormProvider>
    </Card>
  );
};
