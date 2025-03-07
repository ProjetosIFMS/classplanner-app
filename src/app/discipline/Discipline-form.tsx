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
import { createDiscipline, updateDiscipline } from "./actions";
import { useMemo, useState } from "react";
import { MessageBox } from "../_components/ui/messageBox";
import { Discipline } from "@/types/discipline";
import { useRouter } from "next/navigation";

interface DisciplineFormProps {
  title: string;
  data?: Discipline;
  isUpdate?: boolean;
}

const DisciplineForm = ({ title, data, isUpdate }: DisciplineFormProps) => {
  const {
    session,
    commonData: { courses, pedagogicalProjects, areas, modalities },
  } = useAuth();
  const [showMessage, setShowMessage] = useState<boolean>(false);
  const router = useRouter();

  const defaultValues = useMemo<DisciplineSchema>(
    () => ({
      semester: data?.semester ?? 0,
      practicalHours: data?.practicalHours ?? 0,
      extensionHours: data?.extensionHours ?? 0,
      theoreticalHours: data?.theoreticalHours ?? 0,
      code: data?.code ?? "",
      name: data?.name ?? "",
      area_id: data?.area_id ?? "",
      course_id: data?.course_id ?? "",
      modality_id: data?.modality_id ?? "",
      pedagogical_project_id: data?.pedagogical_project_id ?? "",
    }),
    [data],
  );

  const form = useForm<DisciplineSchema>({
    resolver: zodResolver(disciplineSchema),
    defaultValues,
  });

  const {
    handleSubmit,
    formState: { isSubmitting, isDirty },
  } = form;

  const onSubmitForm: SubmitHandler<DisciplineSchema> = async (formData) => {
    if (isUpdate && data?.id) {
      await updateDiscipline(formData, session, data.id);
      form.reset(defaultValues);
      router.refresh();
    } else {
      await createDiscipline(formData, session);
      setShowMessage(true);
      form.reset();
      router.refresh();
    }
  };

  const handleCloseMessage = () => {
    setShowMessage(false);
  };

  if (!courses || !pedagogicalProjects || !areas || !modalities)
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
                          onValueChange={field.onChange}
                          value={field.value}
                          required
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Selecione um curso" />
                          </SelectTrigger>
                          <SelectContent>
                            {courses?.map((values) => (
                              <SelectItem key={values.id} value={values.id}>
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
                          onValueChange={field.onChange}
                          value={field.value}
                          required
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Selecione um projeto" />
                          </SelectTrigger>
                          <SelectContent>
                            {pedagogicalProjects?.map((values) => (
                              <SelectItem key={values.id} value={values.id}>
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
                          onValueChange={field.onChange}
                          value={field.value}
                          required
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Selecione uma área" />
                          </SelectTrigger>
                          <SelectContent>
                            {areas?.map((values) => (
                              <SelectItem key={values.id} value={values.id}>
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
                          onValueChange={field.onChange}
                          value={field.value}
                          required
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Selecione uma modalidade" />
                          </SelectTrigger>
                          <SelectContent>
                            {modalities?.map((values) => (
                              <SelectItem key={values.id} value={values.id}>
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
                          required
                          onValueChange={(value) =>
                            field.onChange(Number.parseInt(value, 10))
                          }
                          value={field.value?.toString()}
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
                          value={field.value}
                          onChange={(e) =>
                            field.onChange(
                              Number.parseInt(e.target.value, 10) || 0,
                            )
                          }
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
                          value={field.value}
                          onChange={(e) =>
                            field.onChange(
                              Number.parseInt(e.target.value, 10) || 0,
                            )
                          }
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
                      <FormLabel className="font-semibold text-nowrap">
                        Horas de Extensão
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          placeholder="Horas de extensão"
                          id="extensionHours"
                          value={field.value}
                          onChange={(e) =>
                            field.onChange(
                              Number.parseInt(e.target.value, 10) || 0,
                            )
                          }
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
                type="button"
                onClick={() => {
                  form.reset();
                }}
                variant={"outline"}
              >
                Cancelar
                <MdOutlineClose className="ml-2" />
              </Button>
              <Button
                type="submit"
                disabled={isSubmitting || (!isDirty && isUpdate)}
                variant={"default"}
              >
                {isSubmitting ? "Salvando..." : "Salvar"}
                <MdCheck className="ml-2" />
              </Button>
            </div>
          </form>
        </Form>
        <MessageBox
          title={"Ação bem sucedida"}
          description={"A disciplina foi registrada."}
          state={showMessage}
          onClose={handleCloseMessage}
        />
      </CardContent>
    </Card>
  );
};

export default DisciplineForm;
