"use client";

import React from "react";
import ClipLoader from "react-spinners/ClipLoader";

import { Tabs, TabsTrigger, TabsList } from "@/app/_components/ui/tabs";

import type { PPC } from "@/types/ppc";
import type { Course } from "@/types/course";

interface CoursesPedagogicalProjectsProps {
  courses: Course[];
  pedagogicalProjects: PPC[];
  setPedagogicalProjectId: React.Dispatch<React.SetStateAction<string>>;
  setCourseId?: React.Dispatch<React.SetStateAction<string>>;
  setIsCourseSelected?: React.Dispatch<React.SetStateAction<boolean>>;
  setIsPedagogicalProjectSelected?: React.Dispatch<
    React.SetStateAction<boolean>
  >;
}

export function CoursesPedagogicalProjects(
  props: CoursesPedagogicalProjectsProps
) {
  const [localCourses, setLocalCourses] = React.useState<Course[]>([]);
  const [localPedagogicalProjects, setLocalPedagogicalProjects] =
    React.useState<PPC[]>([]);
  const [localCourseId, setLocalCourseId] = React.useState<string>("");
  const [localPedagogicalProjectId, setLocalPedagogicalProjectId] =
    React.useState<string>("");

  React.useEffect(() => {
    setLocalCourses(props.courses);
  }, [props.courses]);

  React.useEffect(() => {
    setLocalPedagogicalProjects(props.pedagogicalProjects);
  }, [props.pedagogicalProjects]);

  return (
    <div className="flex flex-row w-full gap-4 justify-between">
      <div className="w-[40%]">
        <Tabs
          value={localCourseId}
          onValueChange={(courseId) => {
            setLocalCourseId(courseId);
            setLocalPedagogicalProjectId("");
            props.setPedagogicalProjectId("");
            if (props.setCourseId) props.setCourseId(courseId);
            if (props.setIsCourseSelected) props.setIsCourseSelected(true);
            if (props.setIsPedagogicalProjectSelected)
              props.setIsPedagogicalProjectSelected(false);
          }}
          className="w-full"
        >
          <TabsList className="flex justify-start h-14 w-full overflow-x-auto scrollbar-thin">
            {props.courses ? (
              localCourses?.map((course, index) => (
                <TabsTrigger
                  key={`course-${index}`}
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

      <div className="w-[40%]">
        <Tabs
          value={localPedagogicalProjectId}
          onValueChange={(pedagogicalProjectId) => {
            setLocalPedagogicalProjectId(pedagogicalProjectId);
            props.setPedagogicalProjectId(pedagogicalProjectId);
            if (props.setIsPedagogicalProjectSelected)
              props.setIsPedagogicalProjectSelected(true);
          }}
          className="w-full"
        >
          <TabsList className="flex justify-between h-14 w-full overflow-x-auto flex-nowrap overflow-y-hidden scrollbar-thin">
            {!props.courses && (
              <div className="flex justify-center items-center w-full">
                <ClipLoader />
              </div>
            )}
            {props.courses && !localCourseId && (
              <p className="w-full text-center">Selecione um curso</p>
            )}
            {localPedagogicalProjects?.map((pedagogicalProject, index) => {
              if (
                pedagogicalProject.status &&
                pedagogicalProject.course_id === localCourseId
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
  );
}
