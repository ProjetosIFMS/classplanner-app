import { Course } from "@/types/course";
import { BookOpen, Clock } from "lucide-react";
import { Button } from "@/app/_components/ui/button";

export const CourseCard = (course: Course) => {
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 border border-gray-100 flex flex-col h-full">
      <div className="p-6 flex-1 flex flex-col">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">
          {course.name}
        </h2>
        <div className="space-y-3 mb-auto">
          <div className="flex items-center text-gray-600">
            <BookOpen className="h-5 w-5 mr-2" />
            <span>{course.quantity_semester} semestres</span>
          </div>
          <div className="flex items-center text-gray-600">
            <Clock className="h-5 w-5 mr-2" />
            <span>{course.workload} horas</span>
          </div>
        </div>
        <div className="mt-6 pt-4 border-t border-gray-100">
          <Button className="w-full text-white py-2 px-4 rounded-lg hover:bg-gray-500 transition-colors duration-200">
            Ver detalhes
          </Button>
        </div>
      </div>
    </div>
  );
};
