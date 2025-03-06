"use client";

import { type SubmitHandler, useForm } from "react-hook-form";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../_components/ui/card";
import {
  disciplineSchema,
  type DisciplineSchema,
} from "@/types/validation/discipline_form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../_components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../_components/ui/select";
import { useAuth } from "../_components/auth/AuthContext";
import { Input } from "../_components/ui/input";
import { Button } from "../_components/ui/button";
import { MdCheck, MdOutlineClose } from "react-icons/md";
import { createDiscipline } from "./actions";

interface DisciplineFormProps {
  title: string;
  // data?: Discipline;
}

const DisciplineForm = ({ title }: DisciplineFormProps) => {
  const {
    session,
    commonData: { courses, pedagogicalProjects, areas, modalities },
  } = useAuth();

  const form = useForm<DisciplineSchema>({
    resolver: zodResolver(disciplineSchema),
    defaultValues: {
      area_id: "",
      code: "",
      course_id: "",
      extensionHours: 0,
      theoreticalHours: 0,
      practicalHours: 0,
      modality_id: "",
      name: "",
      pedagogical_project_id: "",
      semester: 0,
    },
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = form;

  const onSubmitForm: SubmitHandler<DisciplineSchema> = async (formData) => {
    const res = await createDiscipline(formData, session);
    form.reset();
    console.log(res);
  };

  if (!courses || !pedagogicalProjects || !areas)
    return <p className="text-muted-foreground text-md">Carregando...</p>;

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>Insira as informações da disciplina</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={handleSubmit(onSubmitForm)} className="space-y-6">
            {/* Basic Information Section */}
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                          placeholder="Nome da disciplina"
                          id="name"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage className="text-[10px]" />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="code"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-semibold text-sm">
                        Código
                      </FormLabel>
                      <FormControl>
                        <Input placeholder="Código UC" id="code" {...field} />
                      </FormControl>
                      <FormMessage className="text-[10px]" />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            {/* Course Information Section */}
            <div className="space-y-4">
              <h3 className="text-md font-medium">Informações do Curso</h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="course_id"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-semibold text-sm">
                        Curso
                      </FormLabel>
                      <FormControl>
                        <Select
                          name="course_id"
                          onValueChange={field.onChange}
                          required
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Selecione um curso" />
                          </SelectTrigger>
                          <SelectContent>
                            {courses?.map((values, index) => (
                              <SelectItem key={index} value={values.id}>
                                {values.name}
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
                  name="pedagogical_project_id"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-semibold text-sm">
                        Projeto Pedagógico
                      </FormLabel>
                      <FormControl>
                        <Select
                          name="pedagogical_project_id"
                          onValueChange={field.onChange}
                          required
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Selecione um projeto" />
                          </SelectTrigger>
                          <SelectContent>
                            {pedagogicalProjects?.map((values, index) => (
                              <SelectItem key={index} value={values.id}>
                                {values.year}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage className="text-[10px]" />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <FormField
                  control={form.control}
                  name="area_id"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-semibold text-sm">
                        Área
                      </FormLabel>
                      <FormControl>
                        <Select
                          name="area_id"
                          onValueChange={field.onChange}
                          required
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Selecione uma área" />
                          </SelectTrigger>
                          <SelectContent>
                            {areas?.map((values, index) => (
                              <SelectItem key={index} value={values.id}>
                                {values.name}
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
                  name="modality_id"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-semibold text-sm">
                        Modalidade
                      </FormLabel>
                      <FormControl>
                        <Select
                          name="modality_id"
                          onValueChange={field.onChange}
                          required
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Selecione uma modalidade" />
                          </SelectTrigger>
                          <SelectContent>
                            {modalities?.map((values, index) => (
                              <SelectItem key={index} value={values.id}>
                                {values.name}
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
                  name="semester"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-semibold text-sm">
                        Semestre
                      </FormLabel>
                      <FormControl>
                        <Select
                          name="semester"
                          onValueChange={field.onChange}
                          required
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Selecione um semestre" />
                          </SelectTrigger>
                          <SelectContent>
                            {[...Array(12)].map((_, index) => (
                              <SelectItem
                                key={index}
                                value={(index + 1).toString()}
                              >
                                {index + 1}º Semestre
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage className="text-[10px]" />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            {/* Hours Section */}
            <div className="space-y-4">
              <h3 className="text-md font-medium">Carga Horária</h3>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <FormField
                  control={form.control}
                  name="theoreticalHours"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-semibold text-sm">
                        Horas Teóricas
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          placeholder="Horas teóricas"
                          id="theoricalHours"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage className="text-[10px]" />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="practicalHours"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-semibold text-sm">
                        Horas Práticas
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          placeholder="Horas práticas"
                          id="practicalHours"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage className="text-[10px]" />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="extensionHours"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-semibold text-sm">
                        Horas de Extensão
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          placeholder="Horas de extensão"
                          id="extensionHours"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage className="text-[10px]" />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            <div className="flex justify-end gap-5">
              <Button
                type="reset"
                onClick={() => form.reset()}
                variant={"outline"}
              >
                Cancelar
                <MdOutlineClose />
              </Button>
              <Button type="submit" disabled={isSubmitting} variant={"default"}>
                Salvar
                <MdCheck />
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default DisciplineForm;
