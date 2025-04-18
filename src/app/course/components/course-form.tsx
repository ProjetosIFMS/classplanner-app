"use client";
import { createCourse } from "@/app/_actions/course/createCourse";
import { useAuth } from "@/app/_components/auth/AuthContext";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/app/_components/ui/form";
import { FormCard } from "@/app/_components/ui/form-card";
import { Input } from "@/app/_components/ui/input";
import { MessageBox } from "@/app/_components/ui/messageBox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/app/_components/ui/select";
import { FormProps } from "@/types/form-props";
import { courseSchema, CourseValues } from "@/types/validation/course_form";
import { useState } from "react";
import { SubmitHandler } from "react-hook-form";

export const CourseForm = ({ title, description }: FormProps) => {
  const { session } = useAuth();
  const [message, setMessage] = useState<boolean>(false);

  const defaultValues: CourseValues = {
    name: "",
    quantity_semester: 1,
    workload: 0,
  };

  const onSubmitForm: SubmitHandler<CourseValues> = async (formData) => {
    await createCourse(session, formData);
    setMessage(true);
  };

  const handleCloseMessage = () => {
    setMessage(false);
  };

  return (
    <div>
      <FormCard<CourseValues>
        defaultValues={defaultValues}
        schema={courseSchema}
        width="lg"
        onSubmit={onSubmitForm}
        title={title}
        description={description}
      >
        {(form) => (
          <div>
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
          </div>
        )}
      </FormCard>

      <MessageBox
        title="Curso criado"
        state={message}
        onClose={handleCloseMessage}
        description="Registro feito com sucesso."
      />
    </div>
  );
};
