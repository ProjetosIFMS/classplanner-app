"use client";
import { useState, useCallback, useMemo } from "react";
import { type SubmitHandler } from "react-hook-form";
import { DateRange } from "react-day-picker";

import { Input } from "@/app/_components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/app/_components/ui/select";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/app/_components/ui/form";

import { useAuth } from "@/app/_components/auth/AuthContext";
import { MessageBox } from "@/app/_components/ui/messageBox";
import { useRouter } from "next/navigation";
import { Classgrade } from "@/types/classgrade";
import { FormCard } from "@/app/_components/ui/form-card";
import { FormProps } from "@/types/form-props";
import { LoadingCard } from "@/app/_components/ui/loading-card";
import { MonthYearPicker } from "@/app/_components/ui/month-year-picker";
import { Course } from "@/types/course";
import { PPC } from "@/types/ppc";
import { createPeriod } from "@/app/_actions/period/createPeriod";
import { createClassgrade } from "@/app/_actions/classgrade/createClassgrade";
import { CoursesPedagogicalProjectsDisciplines } from "@/app/_components/courses-pedagogical-projects-disciplines";
import { useGetAllDisciplines } from "@/hooks/react-query/disciplines";
import {
  classgradeSchema,
  ClassgradeValues,
} from "@/types/validation/class-grade_form";
import { Checkbox } from "@/app/_components/ui/checkbox";
import { Caption } from "@/app/classgrade/create/components/caption";

interface ClassgradeFormProps extends FormProps {
  data?: Classgrade;
}

export const ClassgradeForm = ({
  data,
  isUpdate,
  title,
  description,
  onCompleteUpdate,
}: ClassgradeFormProps) => {
  const {
    session,
    commonData: { courses, pedagogicalProjects, modalities },
  } = useAuth();
  const [showMessage, setShowMessage] = useState<boolean>(false);
  const [isAnyDisciplineChecked, setIsAnyDisciplineChecked] =
    useState<boolean>(false);
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const yearOptions = Array.from({ length: 20 }, (_, i) => currentYear - i);
  const router = useRouter();

  const getDisciplines = useGetAllDisciplines(session);

  const ofertaModalityId = useMemo(
    () => modalities?.find((m) => m.name === "Oferta")?.id ?? "",
    [modalities]
  );

  const dobraModalityId = useMemo(
    () => modalities?.find((m) => m.name === "Dobra")?.id ?? "",
    [modalities]
  );

  const eletivaModalityId = useMemo(
    () => modalities?.find((m) => m.name === "Eletiva")?.id ?? "",
    [modalities]
  );

  const fallbackPpc: PPC = useMemo(
    () => ({
      course_id: "",
      complementaryHours: 0,
      description: "",
      extensionCourses: 0,
      hasTCC: false,
      id: "",
      stageHours: 0,
      status: false,
      workload: 0,
      year: 2000,
      documentUrl: "",
    }),
    []
  );

  const fallbackCourse: Course = useMemo(
    () => ({
      id: "",
      name: "",
      quantity_semester: 0,
      workload: 0,
    }),
    []
  );

  const defaultValues = useMemo(
    () => ({
      ppc: pedagogicalProjects?.[0] ?? fallbackPpc,
      course: courses?.[0] ?? fallbackCourse,
      course_id: data?.course_id ?? courses?.[0]?.id ?? "",
      semester: data?.semester ?? 1,
      year: data?.year ?? currentYear,
      pedagogical_project_id:
        data?.pedagogical_project_id ?? pedagogicalProjects?.[0]?.id ?? "",
      // period_id: data?.period_id ?? "",
      disciplines: [],
      period: undefined,
    }),
    [
      data,
      currentYear,
      courses,
      pedagogicalProjects,
      fallbackCourse,
      fallbackPpc,
    ]
  );

  const onSubmitForm: SubmitHandler<ClassgradeValues> = async (formData) => {
    try {
      if (isUpdate && onCompleteUpdate) {
        // await updateClassgrade(data.id, formData, session);
        onCompleteUpdate();
      } else {
        const period_id = (await createPeriod(formData.period, session)).id;
        await createClassgrade({ ...formData, period_id }, session);
        router.refresh();
        setShowMessage(true);
      }
    } catch (err) {
      throw err;
    }
  };

  const handleCloseMessage = useCallback(() => {
    setShowMessage(false);
  }, []);

  if (!courses || !pedagogicalProjects || !modalities) return <LoadingCard />;

  return (
    <div>
      <FormCard<ClassgradeValues>
        schema={classgradeSchema}
        defaultValues={defaultValues}
        onSubmit={onSubmitForm}
        title={title}
        width="xl"
        description={description}
        isUpdate={isUpdate}
        footerExtras={<Caption />}
        disabled={!isAnyDisciplineChecked}
      >
        {(form) => (
          <>
            <div className="space-y-3">
              <div className="flex flex-row text-nowrap gap-3 items-center">
                <div>
                  <FormField
                    control={form.control}
                    name="year"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="font-semibold text-xs">
                          Selecione o ano
                        </FormLabel>
                        <FormControl>
                          <Select
                            value={field.value.toString()}
                            onValueChange={(value) =>
                              field.onChange(value.toString())
                            }
                          >
                            <SelectTrigger id="year" className="h-8 text-sm">
                              <SelectValue placeholder="Ano" />
                            </SelectTrigger>
                            <SelectContent
                              position="popper"
                              className="max-h-[200px]"
                            >
                              <SelectGroup>
                                {yearOptions.map((year) => (
                                  <SelectItem
                                    key={year}
                                    value={year.toString()}
                                  >
                                    {year}
                                  </SelectItem>
                                ))}
                              </SelectGroup>
                            </SelectContent>
                          </Select>
                        </FormControl>
                        <FormMessage className="text-[10px]" />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="space-y-3">
                  <FormField
                    control={form.control}
                    name="period"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="font-semibold text-xs">
                          Selecione o período
                        </FormLabel>
                        <FormControl>
                          <MonthYearPicker
                            initialDateRange={field.value as DateRange}
                            onDateRangeChange={field.onChange}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>
                <FormField
                  control={form.control}
                  name="semester"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-semibold text-xs">
                        Selecione o semestre
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
                                {index + 1} º
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

              <CoursesPedagogicalProjectsDisciplines
                showSubmitButton={false}
                courses={courses}
                disciplines={getDisciplines.data ?? []}
                pedagogicalProjects={pedagogicalProjects}
                onSetCourse={(course) => {
                  if (course) {
                    form.reset();
                  }
                }}
                onSetPedagogicalProject={(ppc) => {
                  if (ppc) {
                    form.reset();
                    form.setValue("pedagogical_project_id", ppc.id);
                    form.setValue("course_id", ppc.course_id);
                  }
                }}
                renderBeforeDisciplines={() => {
                  const checkboxStyle =
                    "w-4 h-4 inline-flex items-center justify-center text-sm";

                  return (
                    <div className="flex items-center justify-end space-x-4">
                      <span className={checkboxStyle} title="Oferta">
                        O
                      </span>
                      <span className={checkboxStyle} title="Dobra">
                        D
                      </span>
                      <span className={checkboxStyle} title="Eletiva">
                        E
                      </span>
                    </div>
                  );
                }}
                renderDisciplineForm={(discipline) => (
                  <>
                    <FormField
                      control={form.control}
                      name="disciplines"
                      render={({ field }) => {
                        function ModalityCheckbox({
                          modality_name,
                          modality_id,
                        }: {
                          modality_name: string;
                          modality_id: string;
                        }) {
                          const currentDisciplines =
                            form.getValues("disciplines");
                          const existingDiscipline = currentDisciplines.find(
                            (d) => d.discipline_id === discipline.id
                          );

                          const hasOferta =
                            existingDiscipline?.modalities_ids.includes(
                              ofertaModalityId
                            );
                          const hasEletiva =
                            existingDiscipline?.modalities_ids.includes(
                              eletivaModalityId
                            );

                          const isDisabled =
                            (modality_id === ofertaModalityId && hasEletiva) ||
                            (modality_id === eletivaModalityId && hasOferta) ||
                            (modality_id === dobraModalityId &&
                              !hasOferta &&
                              !hasEletiva);

                          return (
                            <Checkbox
                              id={modality_name}
                              title={modality_name}
                              disabled={isDisabled}
                              className="disabled:opacity-50"
                              checked={
                                existingDiscipline?.modalities_ids.includes(
                                  modality_id
                                ) ?? false
                              }
                              onCheckedChange={(checked) => {
                                if (checked) {
                                  if (existingDiscipline) {
                                    field.onChange(
                                      currentDisciplines.map((d) =>
                                        d.discipline_id === discipline.id
                                          ? {
                                              ...d,
                                              modalities_ids: [
                                                ...d.modalities_ids,
                                                modality_id,
                                              ],
                                            }
                                          : d
                                      )
                                    );
                                  } else {
                                    setIsAnyDisciplineChecked(true);
                                    field.onChange([
                                      ...currentDisciplines,
                                      {
                                        discipline_id: discipline.id,
                                        modalities_ids: [modality_id],
                                      },
                                    ]);
                                  }
                                } else {
                                  const updatedDisciplines = currentDisciplines
                                    .map((d) => {
                                      if (d.discipline_id === discipline.id) {
                                        if (
                                          modality_id === ofertaModalityId ||
                                          modality_id === eletivaModalityId
                                        ) {
                                          return {
                                            ...d,
                                            modalities_ids:
                                              d.modalities_ids.filter(
                                                (id) =>
                                                  id !== modality_id &&
                                                  id !== dobraModalityId
                                              ),
                                          };
                                        }
                                        return {
                                          ...d,
                                          modalities_ids:
                                            d.modalities_ids.filter(
                                              (id) => id !== modality_id
                                            ),
                                        };
                                      }
                                      return d;
                                    })
                                    .filter((d) => d.modalities_ids.length > 0);

                                  field.onChange(updatedDisciplines);

                                  if (
                                    modality_name !== "Dobra" &&
                                    // currentDisciplines.length === 1) ||
                                    updatedDisciplines.length === 0
                                  ) {
                                    setIsAnyDisciplineChecked(false);
                                  }
                                }
                              }}
                            />
                          );
                        }
                        return (
                          <div className="flex items-center justify-center space-x-4">
                            <ModalityCheckbox
                              modality_name="Oferta"
                              modality_id={ofertaModalityId}
                            />
                            <ModalityCheckbox
                              modality_name="Dobra"
                              modality_id={dobraModalityId}
                            />
                            <ModalityCheckbox
                              modality_name="Eletiva"
                              modality_id={eletivaModalityId}
                            />
                          </div>
                        );
                      }}
                    />
                  </>
                )}
              />

              <div className="hidden">
                <FormField
                  control={form.control}
                  name="course_id"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input type="hidden" {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="pedagogical_project_id"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input type="hidden" {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="semester"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input type="hidden" {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="disciplines"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          type="hidden"
                          {...field}
                          value={JSON.stringify(field.value || [])}
                          onChange={(e) =>
                            field.onChange(JSON.parse(e.target.value))
                          }
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
            </div>
          </>
        )}
      </FormCard>
      {showMessage && !isUpdate && (
        <MessageBox
          description="Turma criada com sucesso."
          title="Turma criada"
          onClose={handleCloseMessage}
          state={showMessage}
        />
      )}
    </div>
  );
};
