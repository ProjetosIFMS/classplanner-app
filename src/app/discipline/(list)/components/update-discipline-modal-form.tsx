import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import ClipLoader from "react-spinners/ClipLoader";

import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/app/_components/ui/form";
import { Input } from "@/app/_components/ui/input";
import {
  ToggleGroup,
  ToggleGroupItem,
} from "@/app/_components/ui/toggle-group";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectItem,
  SelectContent,
} from "@/app/_components/ui/select";

import { UpdateDialogForm } from "@/app/_components/dialogs/update-dialog-form";
import { Session } from "@/types/session";
import {
  usePatchDiscipline,
} from "@/hooks/react-query/disciplines";
import {
  DisciplineValues,
  disciplineSchema,
} from "@/types/validation/discipline_form";
import { useGetAllModalities } from "@/hooks/react-query/modalities";
import { useGetAllAreas } from "@/hooks/react-query/areas";
import { useGetAllCourses } from "@/hooks/react-query/courses";
import { useGetAllPPC } from "@/hooks/react-query/ppc";
import { Discipline } from "@/types/discipline";

interface UpdateDisciplineModalFormProps {
  session: Session;
  data: Discipline;
}

export function UpdateDisciplineModalForm({
  session,
  data,
}: UpdateDisciplineModalFormProps) {
  const [isOpen, setIsOpen] = React.useState(false);

  const getAreas = useGetAllAreas(session);
  const getCourses = useGetAllCourses(session);
  const getModalities = useGetAllModalities(session);
  const getPPCs = useGetAllPPC(session);
  const patchDiscipline = usePatchDiscipline(session);

  const form = useForm<DisciplineValues>({
    resolver: zodResolver(disciplineSchema),
    defaultValues: {
      semester: data.semester ?? 1,
      practicalHours: data.practicalHours ?? 0,
      extensionHours: data.extensionHours ?? 0,
      theoreticalHours: data.theoreticalHours ?? 0,
      code: data.code ?? "",
      name: data.name ?? "",
      area_id: data.area_id ?? "",
      course_id: data.course_id ?? "",
      pedagogical_project_id: data.pedagogical_project_id ?? "",
      modalities_ids: data.modalities_ids ?? [
        ...(
          getModalities.data?.map((modality) => {
            if (modality.name === "Oferta") return modality.id;
            return null;
          }) ?? []
        ).filter((id) => id !== null),
      ],
    },
  });

  function onSubmit(formData: DisciplineValues) {
    patchDiscipline.mutate(
      { data: formData, discipline_id: data.id },
      {
        onSuccess: () => {
          setIsOpen(false);
        },
      }
    );
  }

  return (
    <UpdateDialogForm<DisciplineValues>
      form={form}
      onSubmit={onSubmit}
      setIsOpen={setIsOpen}
      description="Preencha os campos abaixo para criar uma nova disciplina."
      title="Criar Disciplina"
      isLoading={patchDiscipline.isPending}
      isOpen={isOpen}
    >
      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-semibold text-sm">Nome</FormLabel>
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
                          const selectedModalities = getModalities.data?.filter(
                            (modality) => selectedIds.includes(modality.id)
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
                                (modality) => modality.id === lastSelectedId
                              );

                            if (lastSelectedModality?.name === "Eletiva") {
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
                              <span title={modality.name}>
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
                <FormLabel className="font-semibold text-sm">Curso</FormLabel>
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
                      {getCourses.data?.map((values) => (
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
                      {getPPCs.data?.map((values, index) => {
                        const isSameId =
                          values.course_id == form.getValues("course_id");

                        return (
                          <div key={index}>
                            {isSameId && (
                              <SelectItem key={values.id} value={values.id}>
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
                <FormLabel className="font-semibold text-sm">Área</FormLabel>
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
                      {getAreas.data?.map((values) => (
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
                        <SelectItem key={index} value={(index + 1).toString()}>
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
                      field.onChange(Number.parseInt(e.target.value, 10) || 0)
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
                      field.onChange(Number.parseInt(e.target.value, 10) || 0)
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
                      field.onChange(Number.parseInt(e.target.value, 10) || 0)
                    }
                  />
                </FormControl>
                <FormMessage className="text-[10px]" />
              </FormItem>
            )}
          />
        </div>
      </div>
    </UpdateDialogForm>
  );
}
