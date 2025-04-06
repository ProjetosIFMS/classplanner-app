"use client";

import React from "react";

import { Card, CardContent } from "@/app/_components/ui/card";

import { useAuth } from "@/app/_components/auth/AuthContext";
import { useCourses } from "@/hooks/useCourses";
import { usePedagogicalProjects } from "@/hooks/usePedagogicalProjects";
import { CoursesPedagogicalProjects } from "@/app/_components/courses-pedagogical-projects";
import { useGetAllDisciplines } from "@/hooks/react-query/disciplines";
import "./style.css";

export default function SelectInterest() {
  const { session } = useAuth();
  const courses = useCourses();
  const pedagogicalProjects = usePedagogicalProjects();
  const disciplines = useGetAllDisciplines(session);

  const [pedagogicalProjectId, setPedagogicalProjectId] =
    React.useState<string>("");
  const [isCourseSelected, setIsCourseSelected] =
    React.useState<boolean>(false);
  const [isPedagogicalProjectSelected, setIsPedagogicalProjectSelected] =
    React.useState<boolean>(false);

  return (
    <section>
      <div className="flex flex-col items-center justify-center">
        <div>
          <h1 className="text-lg font-extrabold py-6">Seleção de interesses</h1>
          <Card className="pt-6 w-full min-w-[80rem]">
            <CardContent>
              <CoursesPedagogicalProjects
                courses={courses}
                pedagogicalProjects={pedagogicalProjects}
                setPedagogicalProjectId={setPedagogicalProjectId}
                setIsCourseSelected={setIsCourseSelected}
                setIsPedagogicalProjectSelected={
                  setIsPedagogicalProjectSelected
                }
              />
              {isPedagogicalProjectSelected &&
                disciplines?.data &&
                disciplines.data.map((discipline, index) => {
                  if (
                    discipline.pedagogical_project_id === pedagogicalProjectId
                  ) {
                    return <p key={`discipline-${index}`}>{discipline.name}</p>;
                  }
                })}
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
