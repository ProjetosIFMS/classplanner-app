"use client";

import React from "react";

import { useCourses } from "@/hooks/useCourses";
import { usePedagogicalProjects } from "@/hooks/usePedagogicalProjects";
import { CoursesPedagogicalProjects } from "@/app/_components/courses-pedagogical-projects";

export default function SelectInterest() {
  const courses = useCourses();
  const pedagogicalProjects = usePedagogicalProjects();

  const [pedagogicalProjectId, setPedagogicalProjectId] =
    React.useState<string>("");
  const [isCourseSelected, setIsCourseSelected] =
    React.useState<boolean>(false);
  const [isPedagogicalProjectSelected, setIsPedagogicalProjectSelected] =
    React.useState<boolean>(false);

  return (
    <div>
      <CoursesPedagogicalProjects
        courses={courses}
        pedagogicalProjects={pedagogicalProjects}
        setPedagogicalProjectId={setPedagogicalProjectId}
        setIsCourseSelected={setIsCourseSelected}
        setIsPedagogicalProjectSelected={setIsPedagogicalProjectSelected}
      />
    </div>
  );
}
