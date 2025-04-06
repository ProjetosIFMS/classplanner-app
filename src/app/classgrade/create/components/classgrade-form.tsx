"use client";

import { Input } from "@/app/_components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/app/_components/ui/select";
import { UseFormReturn, type SubmitHandler } from "react-hook-form";
import {
  classgradeSchema,
  ClassgradeValues,
} from "@/types/validation/class-grade_form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/app/_components/ui/form";
import { useAuth } from "@/app/_components/auth/AuthContext";
import { useState, useCallback, useMemo, useEffect } from "react";
import { MessageBox } from "@/app/_components/ui/messageBox";
import { useRouter } from "next/navigation";
import { getDisciplines } from "@/app/_actions/discipline/getDisciplines";
import { Classgrade } from "@/types/classgrade";
import { FormCard } from "@/app/_components/ui/form-card";
import { FormProps } from "@/types/form-props";
import { LoadingCard } from "@/app/_components/ui/loading-card";
import { MonthYearPicker } from "@/app/_components/ui/month-year-picker";
import { Tabs, TabsList, TabsTrigger } from "@/app/_components/ui/tabs";
import { Course } from "@/types/course";
import { PPC } from "@/types/ppc";
import { Discipline } from "@/types/discipline";
import { Checkbox } from "@/app/_components/ui/checkbox";
import { Caption } from "../components/caption";
import { DateRange } from "react-day-picker";
import { createPeriod } from "@/app/_actions/period/createPeriod";
import { createClassgrade } from "@/app/_actions/classgrade/createClassgrade";

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
  const [disciplines, setDisciplines] = useState<Discipline[]>();
  const [showMessage, setShowMessage] = useState<boolean>(false);
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const yearOptions = Array.from({ length: 20 }, (_, i) => currentYear - i);
  const router = useRouter();

  const fallbackPpc: PPC = {
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
  };

  const fallbackCourse: Course = {
    id: "",
    name: "",
    quantity_semester: 0,
    workload: 0,
  };

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
      fallbackCourse,
    ],
  );

  const [tabsValues, setTabValues] = useState({
    ppc: defaultValues.ppc,
    course: defaultValues.course,
  });

  const updateValues = (key: "course" | "ppc", value: string) => {
    if (key === "course") {
      const selectedCourse =
        courses?.find((course) => course.id === value) || fallbackCourse;
      setTabValues((prev) => ({ ...prev, course: selectedCourse }));
    } else {
      const selectedPpc =
        pedagogicalProjects?.find((ppc) => ppc.id === value) || fallbackPpc;
      setTabValues((prev) => ({ ...prev, ppc: selectedPpc }));
    }
  };

  useEffect(() => {
    const fetchDisciplines = async () => {
      const fetchedDisciplines = await getDisciplines(session);
      setDisciplines(fetchedDisciplines);
    };
    fetchDisciplines();
  }, [session]);

  const onSubmitForm: SubmitHandler<ClassgradeValues> = async (formData) => {
    try {
      if (isUpdate && onCompleteUpdate) {
        // await updateClassgrade(data.id, formData, session);
        onCompleteUpdate();
      } else {
        console.log(typeof formData.year);
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

  const isSameCourseAndPpc = (course_id: string, ppc_id: string) => {
    return course_id === tabsValues.course.id && ppc_id === tabsValues.ppc.id;
  };

  const handleCheckboxChange = (
    modality_id: string,
    discipline_id: string,
    checked: boolean | string,
    form: UseFormReturn<ClassgradeValues>,
  ) => {
    const currentDisciplines = form.getValues("disciplines");

    const existingDiscipline = currentDisciplines.find(
      (item) => item.discipline_id === discipline_id,
    );

    let updatedDisciplines;

    if (existingDiscipline) {
      const updatedModalities = checked
        ? [...existingDiscipline.modalities_ids, modality_id]
        : existingDiscipline.modalities_ids.filter((id) => id !== modality_id);

      if (updatedModalities.length === 0) {
        updatedDisciplines = currentDisciplines.filter(
          (item) => item.discipline_id !== discipline_id,
        );
      } else {
        updatedDisciplines = currentDisciplines.map((item) =>
          item.discipline_id === discipline_id
            ? { ...item, modalities_ids: updatedModalities }
            : item,
        );
      }
    } else {
      updatedDisciplines = [
        ...currentDisciplines,
        { discipline_id, modalities_ids: [modality_id] },
      ];
    }

    form.setValue("disciplines", updatedDisciplines);
  };

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

              <div className="flex flex-col justify-around gap-8 sm:flex-row">
                <Tabs
                  className="flex"
                  onValueChange={(value) => {
                    updateValues("course", value);
                    form.setValue("course_id", value);
                  }}
                  value={tabsValues.course.id}
                >
                  <TabsList className="bg-zinc-400 sm:flex sm:flex-row">
                    {courses &&
                      courses.map((course) => (
                        <TabsTrigger
                          key={course.name.toLowerCase()}
                          className="text-white"
                          value={course.id}
                        >
                          {course.name}
                        </TabsTrigger>
                      ))}
                  </TabsList>
                </Tabs>

                <Tabs
                  onValueChange={(value) => {
                    updateValues("ppc", value);
                    form.setValue("pedagogical_project_id", value);
                  }}
                  value={tabsValues.ppc.id}
                >
                  <TabsList className="bg-zinc-400">
                    {pedagogicalProjects &&
                      pedagogicalProjects.map((pedagogicalProject, index) => {
                        const isSameId =
                          pedagogicalProject.course_id === tabsValues.course.id;

                        return (
                          <div key={index}>
                            {isSameId && (
                              <TabsTrigger
                                key={index}
                                className="text-white"
                                value={pedagogicalProject.id}
                              >
                                PPC {pedagogicalProject.year}
                              </TabsTrigger>
                            )}
                          </div>
                        );
                      })}
                  </TabsList>
                </Tabs>
              </div>

              <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                {Array.from(
                  { length: tabsValues.course.quantity_semester },
                  (_, semesterIndex) => (
                    <div
                      key={semesterIndex}
                      className="border rounded-lg p-4 shadow-sm"
                    >
                      <div className="flex flex-row justify-between items-center border-b pb-2">
                        <h3 className="font-extrabold text-base">
                          Semestre {semesterIndex + 1}
                        </h3>
                        <div className="flex flex-row font-extrabold text-sm">
                          <h4 className="w-8 text-center">O</h4>
                          <h4 className="w-8 text-center">D</h4>
                          <h4 className="w-8 text-center">E</h4>
                        </div>
                      </div>

                      <div className="space-y-1 max-h-[400px] overflow-y-auto">
                        {disciplines?.map((discipline, index) => (
                          <div key={index} className="text-left">
                            {semesterIndex === discipline.semester - 1 &&
                            isSameCourseAndPpc(
                              discipline.course_id,
                              discipline.pedagogical_project_id,
                            ) ? (
                              <div className="grid grid-cols-[1fr,auto] gap-2 items-center py-2 text-sm border-b">
                                <div className="flex flex-col justify-self-start pr-2 overflow-hidden">
                                  <h4 className="font-medium truncate hover:text-clip hover:overflow-visible text-wrap">
                                    {discipline.name}
                                  </h4>
                                  <p className="text-xs text-gray-600">
                                    <strong>
                                      {discipline.practicalHours +
                                        discipline.theoreticalHours}{" "}
                                      horas/aulas
                                    </strong>
                                  </p>
                                </div>
                                <div className="flex space-y-0 gap-3 min-w-[90px] justify-end mr-3">
                                  {modalities
                                    .slice(0, 3)
                                    .map((modality, idx) => (
                                      <div key={idx}>
                                        <FormControl>
                                          <Checkbox
                                            onCheckedChange={(checked) => {
                                              handleCheckboxChange(
                                                modality.id,
                                                discipline.id,
                                                checked,
                                                form,
                                              );
                                            }}
                                          />
                                        </FormControl>
                                      </div>
                                    ))}
                                </div>
                              </div>
                            ) : null}
                          </div>
                        ))}
                      </div>
                    </div>
                  ),
                )}
              </div>

              <Caption />

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
          description="Plano Pedagógico de Curso criado com sucesso."
          title="PPC criado"
          onClose={handleCloseMessage}
          state={showMessage}
        />
      )}
    </div>
  );
};
