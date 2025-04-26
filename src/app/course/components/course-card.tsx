import ClipLoader from "react-spinners/ClipLoader";
import { validate as isUUID } from "uuid";

import { Button } from "@/app/_components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/app/_components/ui/card";

import { Course } from "@/types/course";
import { BookOpen, Clock } from "lucide-react";
import { UpdateCourseModalForm } from "@/app/course/(list)/components/update-course-modal-form";
import { DeleteCourseModal } from "@/app/course/(list)/components/delete-course-modal";
import { Session } from "@/types/session";

interface CourseCardProps {
  session: Session;
  course: Course;
}

export function CourseCard({ course, session }: CourseCardProps) {
  return (
    <Card>
      <CardContent className="flex flex-col h-full">
        <CardHeader className="flex-none">
          <CardTitle className="text-lg">{course.name}</CardTitle>
        </CardHeader>

        {!isUUID(course.id) ? (
          <div className="flex-1 flex items-center justify-center">
            <ClipLoader />
          </div>
        ) : (
          <div className="flex flex-col flex-1 justify-end">
            <div className="space-y-3">
              <div className="flex items-center text-gray-600">
                <BookOpen className="h-5 w-5 mr-2" />
                <span>{course.quantity_semester} semestres</span>
              </div>
              <div className="flex items-center text-gray-600">
                <Clock className="h-5 w-5 mr-2" />
                <span>{course.workload} horas</span>
              </div>
            </div>

            <CardFooter className="justify-between m-0 p-0 pt-4 px-6">
              <Button>Ver detalhes</Button>
              <div>
                <UpdateCourseModalForm data={course} session={session} />
                <DeleteCourseModal data={course} session={session} />
              </div>
            </CardFooter>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
