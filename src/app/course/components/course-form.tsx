"use client";
import { createCourse } from "@/app/_actions/course/createCourse";
import { useAuth } from "@/app/_components/auth/AuthContext";
import { Button } from "@/app/_components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/app/_components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/app/_components/ui/form";
import { Input } from "@/app/_components/ui/input";
import { MessageBox } from "@/app/_components/ui/messageBox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/app/_components/ui/select";
import { courseSchema, CourseValues } from "@/types/validation/course_form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { MdCheck, MdOutlineClose } from "react-icons/md";

interface CourseFormProps {
  title?: string;
}

export const CourseForm = ({ title }: CourseFormProps) => {
  const { session } = useAuth();
  const [message, setMessage] = useState<boolean>(false);

  const form = useForm<CourseValues>({
    resolver: zodResolver(courseSchema),
    defaultValues: {
      name: "",
      quantity_semester: 1,
      workload: 0,
    },
  });

  const {
    formState: { isSubmitting },
    handleSubmit,
  } = form;

  const onSubmitForm: SubmitHandler<CourseValues> = async (formData) => {
    await createCourse(session, formData);
    form.reset();
    setMessage(true);
  };

  const handleCloseMessage = () => {
    setMessage(false);
  };

  return (
    <Card className="w-full max-w-md mx-auto shadow-sm">
      <CardHeader className="border-b pb-2 pt-4 px-4">
        <CardTitle>{title}</CardTitle>
        <CardDescription className="text-xs">
          Preencha os detalhes da criação do Curso
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-4 px-4">
        <Form {...form}>
          <form onSubmit={handleSubmit(onSubmitForm)}>
            <div className="space-y-3">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-semibold text-sm">
                      Nome
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Nome do curso"
                        type="text"
                        id="name"
                        className="h-8 text-sm"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="text-[10px]" />
                  </FormItem>
                )}
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-6">
              <FormField
                control={form.control}
                name="quantity_semester"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-semibold text-sm">
                      Quantidade de semestres
                    </FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={(value) =>
                          field.onChange(Number.parseInt(value, 10))
                        }
                        defaultValue={"1"}
                        value={(field.value ?? 1).toString()}
                      >
                        <SelectTrigger className="text-center">
                          <SelectValue placeholder="Selecione um semestre" />
                        </SelectTrigger>
                        <SelectContent className="text-center">
                          {[...Array(12)].map((_, index) => (
                            <SelectItem
                              key={index}
                              value={(index + 1).toString()}
                            >
                              {index + 1}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage className="text-[10px]" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="workload"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-semibold">
                      Carga horária
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="Horas totais"
                        id="workload"
                        value={field.value}
                        onChange={(e) =>
                          field.onChange(Number.parseInt(e.target.value, 10))
                        }
                      />
                    </FormControl>
                    <FormMessage className="text-[10px]" />
                  </FormItem>
                )}
              />
            </div>
            <div className="flex justify-end gap-5 mt-6">
              <Button
                type="button"
                onClick={() => {
                  form.reset();
                }}
                variant={"outline"}
              >
                Cancelar
                <MdOutlineClose className="ml-2" />
              </Button>
              <Button type="submit" disabled={isSubmitting} variant={"default"}>
                {isSubmitting ? "Salvando..." : "Salvar"}
                <MdCheck className="ml-2" />
              </Button>
            </div>
          </form>
        </Form>
        <MessageBox
          title="Curso criado"
          state={message}
          onClose={handleCloseMessage}
          description="Registro feito com sucesso."
        />
      </CardContent>
    </Card>
  );
};
