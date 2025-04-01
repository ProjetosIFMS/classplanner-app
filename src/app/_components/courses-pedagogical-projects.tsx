"use client";

import React from "react";
import { Tabs, TabsTrigger, TabsList } from "@/app/_components/ui/tabs";
import type { PPC } from "@/types/ppc";
import type { Course } from "@/types/course";

interface CoursesPedagogicalProjectsProps {
  courses: Course[];
  pedagogicalProjects: PPC[];
  setPedagogicalProjectId: React.Dispatch<React.SetStateAction<string>>;
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
            if (props.setIsCourseSelected) props.setIsCourseSelected(true);
            if (props.setIsPedagogicalProjectSelected)
              props.setIsPedagogicalProjectSelected(false);
          }}
          className="w-full"
        >
          <TabsList className="flex h-14 w-full overflow-x-auto flex-nowrap overflow-y-hidden scrollbar-thin">
            {localCourses?.map((course, index) => (
              <TabsTrigger
                key={`course-${index}`}
                value={course.id}
                className="whitespace-nowrap p-2"
              >
                {course.name}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
      </div>

      <div className="w-[40%]">
        {localCourseId ? (
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
        ) : (
          <div className="h-14 flex items-center justify-center border rounded-md bg-muted text-muted-foreground">
            Selecione um curso
          </div>
        )}
      </div>
    </div>
  );
}
