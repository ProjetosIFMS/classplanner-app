import React from "react";

import { Tabs, TabsList, TabsTrigger } from "@/app/_components/ui/tabs";

import { PPC } from "@/types/ppc";
import { Course } from "@/types/course";

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
    <div>
      <Tabs
        value={localCourseId}
        onValueChange={(courseId) => {
          setLocalCourseId(courseId);
          setLocalPedagogicalProjectId("");
          props.setPedagogicalProjectId();
          props.setIsCourseSelected(true);
          props.setIsPedagogicalProjectSelected(false);
        }}
      >
        <TabsList>
          {localCourses?.map((course, index) => (
            <TabsTrigger key={`course-${index}`} value={course.id}>
              {course.name}
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>

      {localCourseId && (
        <Tabs
          value={localPedagogicalProjectId}
          onValueChange={(pedagogicalProjectId) => {
            setLocalPedagogicalProjectId(pedagogicalProjectId);
            props.setPedagogicalProjectId(pedagogicalProjectId);
            props.setIsPedagogicalProjectSelected(true);
          }}
        >
          <TabsList>
            {localPedagogicalProjects?.map((pedagogicalProject, index) => {
              if (
                pedagogicalProject.status &&
                pedagogicalProject.course_id === localCourseId
              ) {
                return (
                  <TabsTrigger
                    key={`pedagogicalProject-${index}`}
                    value={pedagogicalProject.id}
                  >
                    PPC {pedagogicalProject.year}
                  </TabsTrigger>
                );
              }
            })}
          </TabsList>
        </Tabs>
      )}
    </div>
  );
}
