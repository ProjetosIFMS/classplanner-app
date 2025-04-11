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
import {
  ToggleGroup,
  ToggleGroupItem,
} from "@/app/_components/ui/toggle-group";
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
import { useGetModalities } from "@/hooks/react-query/modalities";
import ClipLoader from "react-spinners/ClipLoader";

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
    commonData: { courses, pedagogicalProjects, areas },
  } = useAuth();
  const [showMessage, setShowMessage] = useState<boolean>(false);
  const router = useRouter();

  const getModalities = useGetModalities(session);

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
      pedagogical_project_id: data?.pedagogical_project_id ?? "",
      modalities_ids: data?.modalities_ids ?? [
        ...(
          getModalities.data?.map((modality) => {
            if (modality.name === "Oferta") return modality.id;
            return null;
          }) ?? []
        ).filter((id) => id !== null),
      ],
    }),
    [data, getModalities.data]
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

  if (!courses || !pedagogicalProjects || !areas) return <LoadingCard />;

  return (
    <div className="max-w-4xl">
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

                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="code"
                    render={({ field }) => (
                      <FormItem className="grid-cols-1">
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
                  <FormField
                    control={form.control}
                    name="modalities_ids"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="font-semibold text-sm">
                          Modalidades
                        </FormLabel>
                        {getModalities.isLoading ? (
                          <ClipLoader />
                        ) : (
                          <FormControl>
                            <ToggleGroup
                              type="multiple"
                              {...field}
                              onValueChange={(selectedIds) => {
                                const selectedModalities =
                                  getModalities.data?.filter((modality) =>
                                    selectedIds.includes(modality.id)
                                  );

                                const hasEletiva = selectedModalities?.some(
                                  (modality) => modality.name === "Eletiva"
                                );
                                const hasOferta = selectedModalities?.some(
                                  (modality) => modality.name === "Oferta"
                                );

                                if (hasEletiva && hasOferta) {
                                  const lastSelectedId =
                                    selectedIds[selectedIds.length - 1];
                                  const lastSelectedModality =
                                    getModalities.data?.find(
                                      (modality) =>
                                        modality.id === lastSelectedId
                                    );

                                  if (
                                    lastSelectedModality?.name === "Eletiva"
                                  ) {
                                    selectedIds = selectedIds.filter(
                                      (id) =>
                                        getModalities.data?.find(
                                          (modality) => modality.id === id
                                        )?.name !== "Oferta"
                                    );
                                  } else if (
                                    lastSelectedModality?.name === "Oferta"
                                  ) {
                                    selectedIds = selectedIds.filter(
                                      (id) =>
                                        getModalities.data?.find(
                                          (modality) => modality.id === id
                                        )?.name !== "Eletiva"
                                    );
                                  }
                                }

                                if (!hasEletiva && !hasOferta) {
                                  const ofertaId = getModalities.data?.find(
                                    (modality) => modality.name === "Oferta"
                                  )?.id;

                                  if (ofertaId) {
                                    selectedIds.push(ofertaId);
                                  }
                                }

                                form.setValue("modalities_ids", selectedIds);
                              }}
                            >
                              {getModalities.data?.map((modality) => {
                                return (
                                  <ToggleGroupItem
                                    key={modality.id}
                                    value={modality.id}
                                    className="w-full"
                                    title={modality.name}
                                  >
                                    <span
                                      className={isUpdate ? "hidden" : "inline"}
                                    >
                                      {modality.name}
                                    </span>
                                    <span
                                      className={
                                        !isUpdate ? "hidden" : "inline"
                                      }
                                    >
                                      {modality.name.charAt(0)}
                                    </span>
                                  </ToggleGroupItem>
                                );
                              })}
                            </ToggleGroup>
                          </FormControl>
                        )}
                        <FormMessage className="text-[10px]" />
                      </FormItem>
                    )}
                  />
                </div>
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
                          onValueChange={(e) => {
                            field.onChange(e);
                            form.resetField("pedagogical_project_id");
                          }}
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
                            {pedagogicalProjects?.map((values, index) => {
                              const isSameId =
                                values.course_id == form.getValues("course_id");

                              return (
                                <div key={index}>
                                  {isSameId && (
                                    <SelectItem
                                      key={values.id}
                                      value={values.id}
                                    >
                                      {values.year}
                                    </SelectItem>
                                  )}
                                </div>
                              );
                            })}
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage className="text-[10px]" />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                              Number.parseInt(e.target.value, 10) || 0
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
                              Number.parseInt(e.target.value, 10) || 0
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
                              Number.parseInt(e.target.value, 10) || 0
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
