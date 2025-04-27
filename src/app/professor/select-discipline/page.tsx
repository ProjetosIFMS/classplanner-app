"use client";
import { useAuth } from "@/app/_components/auth/AuthContext";
import { CoursesPedagogicalProjectsDisciplines } from "@/app/_components/courses-pedagogical-projects-disciplines";
import { Checkbox } from "@/app/_components/ui/checkbox";
import { FormControl, FormField, FormItem } from "@/app/_components/ui/form";
import { FormCard } from "@/app/_components/ui/form-card";
import { Input } from "@/app/_components/ui/input";
import { useGetAllDisciplines } from "@/hooks/react-query/disciplines";
import {
  professorDisciplineSelectionSchema,
  ProfessorDisciplineSelectionValues,
} from "@/types/validation/select-discipline_form";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { SubmitHandler } from "react-hook-form";

export default function SelectDiscipline() {
  const {
    session,
    commonData: { courses, pedagogicalProjects },
  } = useAuth();
  const { data: disciplines } = useGetAllDisciplines(session);
  const [isAnyDisciplineChecked, setIsAnyDisciplineChecked] =
    useState<boolean>(false);
  const [totalWorkload, setTotalWorkload] = useState<number>(0);
  const defaultValues: ProfessorDisciplineSelectionValues = {
    course_id: "",
    pedagogical_project_id: "",
    disciplines: [],
  };
  const router = useRouter();

  const onSubmitForm: SubmitHandler<
    ProfessorDisciplineSelectionValues
  > = async (formData) => {
    try {
      console.log("Falta integração", formData);
      router.refresh();
    } catch (err) {
      throw err;
    }
  };

  return (
    <div className="container py-8 max-w-5xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">
          Seleção de Disciplinas
        </h1>
        <p className="text-gray-600 mt-2">
          Selecione unidades curriculares de seu interesse para lecionar
        </p>
      </div>

      <FormCard<ProfessorDisciplineSelectionValues>
        description="Escolha as unidades curriculares que você tem interesse em ministrar"
        title="Selecione suas disciplinas"
        onSubmit={onSubmitForm}
        isUpdate={false}
        disabled={!isAnyDisciplineChecked}
        width="xl"
        schema={professorDisciplineSelectionSchema}
        defaultValues={defaultValues}
      >
        {(form) => (
          <div className="space-y-6">
            <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
              <CoursesPedagogicalProjectsDisciplines
                courses={courses ?? []}
                pedagogicalProjects={pedagogicalProjects ?? []}
                disciplines={disciplines ?? []}
                showSubmitButton={false}
                workload={totalWorkload}
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
                renderDisciplineForm={(discipline) => (
                  <div className="py-2 px-3 hover:bg-gray-100 rounded-md transition-colors">
                    <FormField
                      control={form.control}
                      name="disciplines"
                      render={({ field }) => (
                        <div className="flex items-center gap-3">
                          <Checkbox
                            value={discipline.id}
                            onCheckedChange={(checked) => {
                              if (checked) {
                                setTotalWorkload(
                                  (prev) =>
                                    prev +
                                    discipline.theoreticalHours +
                                    discipline.practicalHours,
                                );
                                setIsAnyDisciplineChecked(true);
                                field.onChange([
                                  ...field.value,
                                  { id: discipline.id },
                                ]);
                              } else {
                                field.onChange(
                                  field.value.filter(
                                    (item) => item.id !== discipline.id,
                                  ),
                                );
                                setTotalWorkload(
                                  (prev) =>
                                    prev -
                                    discipline.theoreticalHours +
                                    discipline.practicalHours,
                                );
                              }
                            }}
                            className="h-5 w-5"
                          />
                        </div>
                      )}
                    />
                  </div>
                )}
              />
            </div>
            <div className="flex gap-8 justify-end">
              {form.formState.errors.disciplines && (
                <p className="text-red-500 text-sm mt-2">
                  * {form.formState.errors.disciplines.message}
                </p>
              )}
              {form.formState.errors.course_id && (
                <p className="text-red-500 text-sm mt-2">
                  * {form.formState.errors.course_id.message}
                </p>
              )}
              {form.formState.errors.pedagogical_project_id && (
                <p className="text-red-500 text-sm mt-2">
                  * {form.formState.errors.pedagogical_project_id.message}
                </p>
              )}
            </div>

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
        )}
      </FormCard>
    </div>
  );
}
