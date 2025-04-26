"use client";

import React from "react";
import ClipLoader from "react-spinners/ClipLoader";

import { Tabs, TabsTrigger, TabsList } from "@/app/_components/ui/tabs";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/app/_components/ui/accordion";
import { Button } from "@/app/_components/ui/button";

import type { PPC } from "@/types/ppc";
import type { Course } from "@/types/course";
import type { Discipline } from "@/types/discipline";
import { MdCheck } from "react-icons/md";

interface CoursesPedagogicalProjectsDisciplinesProps {
  courses: Course[];
  pedagogicalProjects: PPC[];
  disciplines: Discipline[];
  workload?: number;
  posting?: boolean;
  renderDisciplineForm: (discipline: Discipline) => React.ReactNode;
  renderBeforeDisciplines?: () => React.ReactNode;
  setPedagogicalProject?: React.Dispatch<React.SetStateAction<PPC | undefined>>;
  onSetPedagogicalProject?: (pedagogicalProject: PPC | undefined) => void;
  setCourse?: React.Dispatch<React.SetStateAction<Course | undefined>>;
  onSetCourse?: (course: Course | undefined) => void;
  setIsCourseSelected?: React.Dispatch<React.SetStateAction<boolean>>;
  setIsPedagogicalProjectSelected?: React.Dispatch<
    React.SetStateAction<boolean>
  >;
  showSubmitButton?: boolean;
}

export function CoursesPedagogicalProjectsDisciplines(
  props: CoursesPedagogicalProjectsDisciplinesProps
) {
  const [localCourses, setLocalCourses] = React.useState<Course[]>([]);
  const [localPedagogicalProjects, setLocalPedagogicalProjects] =
    React.useState<PPC[]>([]);
  const [localCourse, setLocalCourse] = React.useState<Course>();
  const [localPedagogicalProject, setLocalPedagogicalProject] =
    React.useState<PPC>();

  const [localFilteredDisciplines, setLocalFilteredDisciplines] =
    React.useState<Discipline[]>([]);

  React.useEffect(() => {
    setLocalCourses(props.courses);
  }, [props.courses]);

  React.useEffect(() => {
    setLocalPedagogicalProjects(props.pedagogicalProjects);
  }, [props.pedagogicalProjects]);

  return (
    <div className="">
      <div className="flex justify-between flex-col lg:flex-row items-center">
        <div className="min-w-96 max-w-96">
          <Tabs
            onValueChange={(courseId) => {
              setLocalCourse(localCourses.find((c) => c.id === courseId));
              setLocalPedagogicalProject(undefined);
              setLocalFilteredDisciplines([]);
              if (props.setPedagogicalProject)
                props.setPedagogicalProject(undefined);
              if (props.onSetPedagogicalProject) {
                props.onSetPedagogicalProject(undefined);
              }
              if (props.setCourse)
                props.setCourse(localCourses.find((c) => c.id === courseId));
              if (props.onSetCourse)
                props.onSetCourse(
                  localCourses.find((c) => c.id === courseId) as Course
                );
              if (props.setIsCourseSelected) props.setIsCourseSelected(true);
              if (props.setIsPedagogicalProjectSelected)
                props.setIsPedagogicalProjectSelected(false);
            }}
            className="w-full"
          >
            <TabsList className="flex justify-start h-14 w-full overflow-x-auto scrollbar-thin">
              {props.courses.length > 0 ? (
                localCourses?.map((course) => (
                  <TabsTrigger
                    key={`course-${course.id}`}
                    value={course.id}
                    className="whitespace-nowrap p-2"
                  >
                    {course.name}
                  </TabsTrigger>
                ))
              ) : (
                <div className="flex w-full justify-center items-center">
                  <ClipLoader />
                </div>
              )}
            </TabsList>
          </Tabs>
        </div>

        <div className="min-w-96 max-w-96">
          <Tabs
            value={localPedagogicalProject?.id ?? ""}
            onValueChange={(pedagogicalProjectId) => {
              setLocalPedagogicalProject(
                localPedagogicalProjects.find(
                  (pedagogicalProject) =>
                    pedagogicalProject.id === pedagogicalProjectId
                )
              );
              setLocalFilteredDisciplines(
                props.disciplines.filter(
                  (discipline) =>
                    discipline.pedagogical_project_id ===
                      pedagogicalProjectId &&
                    discipline.course_id === localCourse?.id
                )
              );
              if (props.setPedagogicalProject)
                props.setPedagogicalProject(
                  localPedagogicalProjects.find(
                    (pedagogicalProject) =>
                      pedagogicalProject.id === pedagogicalProjectId
                  )
                );
              if (props.onSetPedagogicalProject)
                props.onSetPedagogicalProject(
                  localPedagogicalProjects.find(
                    (pedagogicalProject) =>
                      pedagogicalProject.id === pedagogicalProjectId
                  )
                );
              if (props.setIsPedagogicalProjectSelected)
                props.setIsPedagogicalProjectSelected(true);
            }}
            className="w-full"
          >
            <TabsList className="flex justify-between h-14 w-full overflow-x-auto flex-nowrap overflow-y-hidden scrollbar-thin">
              {props.courses.length <= 0 && (
                <div className="flex justify-center items-center w-full">
                  <ClipLoader />
                </div>
              )}

              {props.courses.length > 0 && !localCourse && (
                <p className="w-full text-center">Selecione um curso</p>
              )}

              {localCourse &&
                !localPedagogicalProjects.some(
                  (pedagogicalProject) =>
                    pedagogicalProject.course_id === localCourse.id
                ) && (
                  <p className="w-full text-center">
                    Nenhum PPC encontrado para este curso
                  </p>
                )}

              {localCourse &&
                localPedagogicalProjects?.map((pedagogicalProject, index) => {
                  if (
                    pedagogicalProject.status &&
                    pedagogicalProject.course_id === localCourse.id
                  ) {
                    return (
                      <TabsTrigger
                        key={`pedagogicalProject-${index}`}
                        value={pedagogicalProject.id}
                        className="whitespace-nowrap p-2 w-full"
                      >
                        PPC {pedagogicalProject.year}
                      </TabsTrigger>
                    );
                  }
                  return null;
                })}
            </TabsList>
          </Tabs>
        </div>
      </div>

      <div>
        {localFilteredDisciplines?.length > 0 ? (
          <Accordion
            type="multiple"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 m-4"
            defaultValue={Array.from(
              { length: localCourse?.quantity_semester || 0 },
              (_, index) => index + 1
            ).map(String)}
          >
            {Array.from(
              { length: localCourse?.quantity_semester || 0 },
              (_, index) => (
                <AccordionItem
                  key={`semester-${index + 1}`}
                  value={(index + 1).toString()}
                >
                  <AccordionTrigger>
                    <span className="font-bold">SEMESTRE {index + 1}</span>
                  </AccordionTrigger>
                  <AccordionContent className="space-y-2">
                    {props.renderBeforeDisciplines && (
                      <props.renderBeforeDisciplines />
                    )}
                    {localFilteredDisciplines.filter(
                      (discipline) => discipline.semester === index + 1
                    ).length > 0 ? (
                      localFilteredDisciplines
                        .filter(
                          (discipline) => discipline.semester === index + 1
                        )
                        .map((discipline) => {
                          return (
                            <div
                              className="flex justify-between"
                              key={`discipline-${discipline.id}`}
                            >
                              <span>{discipline.name}</span>
                              {props.renderDisciplineForm(discipline)}
                            </div>
                          );
                        })
                    ) : (
                      <p className="text-center text-gray-500">
                        Nenhuma disciplina disponível para este semestre.
                      </p>
                    )}
                  </AccordionContent>
                </AccordionItem>
              )
            )}
          </Accordion>
        ) : (
          <p className="text-center col-span-3 p-40">
            {!localCourse && !localPedagogicalProject && "Selecione um curso"}
            {localCourse && !localPedagogicalProject && "Selecione um PPC"}
            {localCourse &&
              localPedagogicalProject &&
              "Nenhuma disciplina encontrada"}
          </p>
        )}
      </div>

      <div className="w-full flex items-center justify-between px-4">
        <div>
          {props.workload !== undefined &&
            props.workload >= 0 &&
            !(localPedagogicalProject === undefined) && (
              <div>
                <span className="text-muted-foreground">Carga horária: </span>
                <span className="font-bold">{props.workload}h</span>
              </div>
            )}
        </div>
        {props.showSubmitButton && (
          <Button
            className="flex justify-center items-center"
            type="submit"
            disabled={localPedagogicalProject === undefined || props.posting}
          >
            {props.posting ? (
              <ClipLoader color="#fff" size={20} />
            ) : (
              <div className="flex justify-center items-center gap-1">
                Salvar <MdCheck />
              </div>
            )}
          </Button>
        )}
      </div>
    </div>
  );
}
