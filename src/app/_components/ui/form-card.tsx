"use client";
import { Button } from "./button";
import {
  FieldValues,
  SubmitErrorHandler,
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
  onError?: SubmitErrorHandler<TFormValues>;
  children: (form: UseFormReturn<TFormValues>) => ReactNode;
  width: "sm" | "md" | "lg" | "xl" | "2xl";
  isUpdate?: boolean;
  headerExtras?: ReactNode;
  footerExtras?: ReactNode;
  disabled?: boolean;
};

export const FormCard = <TFormValues extends FieldValues>({
  onSubmit,
  onError,
  title,
  description,
  children,
  schema,
  defaultValues,
  width = "sm",
  isUpdate,
  headerExtras,
  footerExtras = <div />,
  disabled = false,
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

  const handleError: SubmitErrorHandler<TFormValues> = (data) => {
    try {
      onError?.(data);
    } catch (err) {
      throw err;
    }
  };

  return (
    <Card className={`w-full max-w-${width} mx-auto shadow-sm`}>
      <CardHeader className="border-b pb-2 pt-4 px-4">
        <CardTitle className="flex flex-row gap-4 items-center">
          {title}
          {headerExtras}
        </CardTitle>
        <CardDescription className="text-xs">{description}</CardDescription>
      </CardHeader>
      <FormProvider {...form}>
        <form
          onSubmit={form.handleSubmit(handleSubmit, handleError)}
          className="mt-5"
        >
          <CardContent>{children(form)}</CardContent>
          <CardFooter className="justify-between">
            {footerExtras}
            <div className="flex justify-center items-center gap-5">
              {!isUpdate && (
                <Button
                  type="button"
                  onClick={() => form.reset()}
                  variant={"outline"}
                >
                  Cancelar
                  <MdOutlineClose className="ml-2" />
                </Button>
              )}
              <Button
                type="submit"
                disabled={form.formState.isSubmitting || disabled}
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
