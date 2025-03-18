"use client";
import { useAuth } from "@/app/_components/auth/AuthContext";
import { Button } from "@/app/_components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/app/_components/ui/card";
import { LoadingCard } from "@/app/_components/ui/loading-card";
import { useCourses } from "@/hooks/useCourses";
import { Plus } from "lucide-react";
import Link from "next/link";
import { CourseCard } from "../components/course-card";

export default function ListCourses() {
  const { user } = useAuth();
  const courses = useCourses();

  if (!courses) return <LoadingCard />;

  return (
    <section className="flex min-h-[75vh] justify-center items-center">
      <div className="flex-1 max-w-7xl mx-auto w-full">
        {user?.role === "ADMIN" && (
          <div className="flex justify-end mb-4">
            <Button asChild className="shadow-lg w-auto ">
              <Link href="/course/create">
                <Plus className="mr-2 h-4 w-4" />
                Novo Curso
              </Link>
            </Button>
          </div>
        )}

        <div className="mt-6 flex-1">
          <Card className="w-full">
            <CardHeader>
              <CardTitle>Todos os cursos</CardTitle>
              <CardDescription>
                Lista de todos os cursos criados.
              </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
              {courses.map((course, index) => (
                <CourseCard key={index} {...course} />
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
