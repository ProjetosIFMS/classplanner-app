"use client";

import React from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Card, CardContent } from "@/app/_components/ui/card";
import { FormField, FormItem, FormControl } from "@/app/_components/ui/form";
import { Checkbox } from "@/app/_components/ui/checkbox";

import { useAuth } from "@/app/_components/auth/AuthContext";
import { useCourses } from "@/hooks/useCourses";
import { usePedagogicalProjects } from "@/hooks/usePedagogicalProjects";
import { CoursesPedagogicalProjectsDisciplines } from "@/app/_components/courses-pedagogical-projects-disciplines";
import { useGetAllDisciplines } from "@/hooks/react-query/disciplines";
import {
  ProfessorInterestsForm,
  professorInterestsFormSchema,
} from "@/app/professor/select-interest/ProfessorInterestsForm";
import "./style.css";

import { type Course } from "@/types/course";
import { type PPC } from "@/types/ppc";

export default function SelectInterest() {
  const { session } = useAuth();
  const courses = useCourses();
  const pedagogicalProjects = usePedagogicalProjects();
  const disciplines = useGetAllDisciplines(session);

  const [workload, setWorkload] = React.useState<number>(0);
  const [course, setCourse] = React.useState<Course>();
  const [pedagogicalProject, setPedagogicalProject] = React.useState<PPC>();
  const [isCourseSelected, setIsCourseSelected] =
    React.useState<boolean>(false);
  const [isPedagogicalProjectSelected, setIsPedagogicalProjectSelected] =
    React.useState<boolean>(false);

  const form = useForm<z.infer<typeof professorInterestsFormSchema>>({
    resolver: zodResolver(professorInterestsFormSchema),
    defaultValues: {
      disciplines_ids: [],
    },
  });

  React.useEffect(() => {
    form.reset();
  }, [course, form]);

  React.useEffect(() => {
    form.reset();
  }, [pedagogicalProject, form]);

  function onSubmit(data: z.infer<typeof professorInterestsFormSchema>) {
    console.log(data);
  }

  return (
    <section>
      <div className="flex flex-col items-center justify-center mx-auto">
        <div>
          <div className="py-6">
            <h1 className="text-2xl font-extrabold">Seleção de interesses</h1>
            <h2 className="text-lg text-muted-foreground">
              Selecione unidades curriculares de interesse
            </h2>
          </div>
          <Card className="pt-6 w-full min-w-[80rem]">
            <CardContent>
              <ProfessorInterestsForm form={form} onSubmit={onSubmit}>
                <CoursesPedagogicalProjectsDisciplines
                  courses={courses}
                  pedagogicalProjects={pedagogicalProjects}
                  disciplines={disciplines.data}
                  workload={workload}
                  setCourse={setCourse}
                  setPedagogicalProject={setPedagogicalProject}
                  setIsCourseSelected={setIsCourseSelected}
                  setIsPedagogicalProjectSelected={
                    setIsPedagogicalProjectSelected
                  }
                  renderDisciplineForm={(discipline) => (
                    <FormField
                      control={form.control}
                      name={`disciplines_ids`}
                      render={({ field }) => (
                        <FormItem className="flex items-center space-x-1 space-y-0">
                          <FormControl>
                            <Checkbox
                              checked={field.value?.includes(discipline.id)}
                              onCheckedChange={(checked) => {
                                if (checked) {
                                  setWorkload(
                                    (prev) => prev + discipline.theoreticalHours
                                  );
                                  field.onChange([
                                    ...field.value,
                                    discipline.id,
                                  ]);
                                } else {
                                  setWorkload(
                                    (prev) => prev - discipline.theoreticalHours
                                  );
                                  field.onChange(
                                    field.value?.filter(
                                      (id) => id !== discipline.id
                                    )
                                  );
                                }
                              }}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  )}
                />
              </ProfessorInterestsForm>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
