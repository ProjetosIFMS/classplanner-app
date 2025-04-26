"use client";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/app/_components/ui/card";

import { LoadingCard } from "@/app/_components/ui/loading-card";
import { CourseCard } from "../components/course-card";
import { useAuth } from "@/app/_components/auth/AuthContext";
import { useGetAllCourses } from "@/hooks/react-query/courses";
import { Role } from "@/types/user";
import { CreateCourseModalForm } from "@/app/course/(list)/components/create-course-modal-form";

export default function ListCourses() {
  const { user, session } = useAuth();
  const getCourses = useGetAllCourses(session);

  return (
    <section className="min-h-screen flex flex-col">
      <div className="flex-1 p-6 max-w-7xl mx-auto w-full">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold">Cursos</h1>
          {user?.role === Role.COORDINATOR && (
            <CreateCourseModalForm session={session} />
          )}
        </div>

        <div className="mt-6 flex-1">
          <Card className="w-full">
            <CardHeader />
            <CardContent className="grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
              {getCourses.isLoading ? (
                <div className="flex justify-center items-center col-span-1 md:col-span-2 lg:col-span-3">
                  <LoadingCard />
                </div>
              ) : (
                getCourses.data?.map((course, index) => (
                  <CourseCard key={index} course={course} session={session} />
                ))
              )}
            </CardContent>
            <CardFooter />
          </Card>
        </div>
      </div>
    </section>
  );
}
