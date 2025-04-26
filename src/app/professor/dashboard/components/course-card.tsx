import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/app/_components/ui/card";

import { Discipline } from "@/types/discipline";

interface CourseCardProps {
  course: {
    course_name: string;
    disciplines: Discipline[];
  };
}

export function CourseCard({ course }: CourseCardProps) {
  return (
    <Card className="">
      <CardHeader>
        <CardTitle className="text-2xl">{course.course_name}</CardTitle>
      </CardHeader>
      <CardContent className="w-auto overflow-y-auto">
        {course.disciplines.map((discipline, index) => (
          <div
            key={index}
            className="border-[1px] border-solid border-zinc-300 p-3 flex flex-row gap-3 items-center mb-2"
          >
            <div className="flex flex-column gap-2 items-center self-start">
              <p className="font-bold text-sm">{discipline.name}</p>
              <p className="text-sky-400 text-sm">
                (C.H {discipline.extensionHours}hs)
              </p>
            </div>
            <p className="text-[10px] text-muted-foreground">
              {course.course_name} {discipline.semester}
            </p>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
