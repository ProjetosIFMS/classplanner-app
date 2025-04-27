import React from "react";
import { Plus } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/app/_components/ui/button";
import {
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormControl,
} from "@/app/_components/ui/form";
import { Input } from "@/app/_components/ui/input";
import {
  Select,
  SelectValue,
  SelectTrigger,
  SelectContent,
  SelectItem,
} from "@/app/_components/ui/select";

import { Session } from "@/types/session";
import { CreateDialogForm } from "@/app/_components/dialogs/create-dialog-form";
import { courseSchema, CourseValues } from "@/types/validation/course_form";
import { usePostCourse } from "@/hooks/react-query/courses";

interface CreateCourseModalFormProps {
  session: Session;
}

export function CreateCourseModalForm({ session }: CreateCourseModalFormProps) {
  const [isOpen, setIsOpen] = React.useState(false);

  const postCourse = usePostCourse(session);

  const form = useForm<CourseValues>({
    resolver: zodResolver(courseSchema),
    defaultValues: { name: "", quantity_semester: 1, workload: 0 },
  });

  function onSubmit(data: CourseValues) {
    setIsOpen(false);
    postCourse.mutate(data, {
      onSuccess: () => {
        setIsOpen(false);
      },
    });
  }

  return (
    <CreateDialogForm<CourseValues>
      form={form}
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      onSubmit={onSubmit}
      trigger={
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Novo Curso
        </Button>
      }
      title="Criar curso"
      description="Preencha os campos abaixo para criar um novo curso"
    >
      <FormField
        control={form.control}
        name="name"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="font-semibold text-sm">Nome</FormLabel>
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
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mt-3">
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
                      <SelectItem key={index} value={(index + 1).toString()}>
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
              <FormLabel className="font-semibold">Carga horária</FormLabel>
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
    </CreateDialogForm>
  );
}
