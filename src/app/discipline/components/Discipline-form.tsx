"use client";

import { type SubmitHandler } from "react-hook-form";
import {
  disciplineSchema,
  type DisciplineValues,
} from "@/types/validation/discipline_form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/app/_components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/app/_components/ui/select";
import { useAuth } from "@/app/_components/auth/AuthContext";
import { Input } from "@/app/_components/ui/input";
import { createDiscipline } from "@/app/_actions/discipline/createDiscipline";
import { useMemo, useState } from "react";
import { MessageBox } from "@/app/_components/ui/messageBox";
import { Discipline } from "@/types/discipline";
import { useRouter } from "next/navigation";
import { updateDiscipline } from "@/app/_actions/discipline/updateDiscipline";
import { FormCard } from "@/app/_components/ui/form-card";
import { FormProps } from "@/types/form-props";
import { LoadingCard } from "@/app/_components/ui/loading-card";

interface DisciplineFormProps extends Readonly<FormProps> {
  data?: Discipline;
}

const DisciplineForm = ({
  title,
  description,
  data,
  isUpdate,
}: DisciplineFormProps) => {
  const {
    session,
    commonData: { courses, pedagogicalProjects, areas, modalities },
  } = useAuth();
  const [showMessage, setShowMessage] = useState<boolean>(false);
  const router = useRouter();

  const defaultValues = useMemo<DisciplineValues>(
    () => ({
      semester: data?.semester ?? 1,
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

  const onSubmitForm: SubmitHandler<DisciplineValues> = async (formData) => {
    if (isUpdate && data?.id) {
      await updateDiscipline(formData, session, data.id);
      router.refresh();
    } else {
      await createDiscipline(formData, session);
      setShowMessage(true);
      router.refresh();
    }
  };

  const handleCloseMessage = () => {
    setShowMessage(false);
  };

  if (!courses || !pedagogicalProjects || !areas || !modalities)
    return <LoadingCard />;

  return (
    <div>
      <FormCard
        schema={disciplineSchema}
        defaultValues={defaultValues}
        title={title}
        description={description}
        width="2xl"
        onSubmit={onSubmitForm}
      >
        {(form) => (
          <div>
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

            <div className="space-y-3">
              <h3 className="text-md font-medium mt-7">Informações do Curso</h3>

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
                          defaultValue="1"
                          onValueChange={(value) =>
                            field.onChange(Number.parseInt(value, 10))
                          }
                          value={field.value?.toString()}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Selecione um semestre" />
                          </SelectTrigger>
                          <SelectContent className="text-center">
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

            <div className="space-y-3 mt-7">
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
          </div>
        )}
      </FormCard>

      <MessageBox
        title={"Ação bem sucedida"}
        description={"A disciplina foi registrada."}
        state={showMessage}
        onClose={handleCloseMessage}
      />
    </div>
  );
};

export default DisciplineForm;
