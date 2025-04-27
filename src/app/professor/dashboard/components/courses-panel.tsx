import React from "react";

import {
  Card,
  CardContent,
  CardHeader,
  CardFooter,
} from "@/app/_components/ui/card";

import { Discipline } from "@/types/discipline";
import ClipLoader from "react-spinners/ClipLoader";
import { CourseCard } from "@/app/professor/dashboard/components/course-card";

interface CoursesPanelProps {
  courses: {
    course_name: string;
    disciplines: Discipline[];
  }[];
  isLoading?: boolean;
}

export function CoursesPanel({
  courses,
  isLoading = false,
}: CoursesPanelProps) {
  return (
    <Card>
      <CardContent>
        <CardHeader></CardHeader>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {isLoading ? (
            <div className="col-span-1 md:col-span-2 lg:col-span-3 flex justify-center items-center">
              <ClipLoader size={64} />
            </div>
          ) : courses.length > 0 ? (
            courses.map((course, index) => (
              <CourseCard course={course} key={index} />
            ))
          ) : (
            <p className="col-span-1 md:col-span-2 lg:col-span-3 text-center text-xl">
              Não há disciplinas relacionadas à você
            </p>
          )}
        </div>

        <CardFooter></CardFooter>
      </CardContent>
    </Card>
  );
}
