import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/app/_components/ui/card";

export type Discipline = {
  name: string;
  workload: string;
  semester: string;
  shift?: string;
};

export interface DisciplinesPanelProps {
  course: string;
  disciplines: Discipline[];
}

export const DisciplinesPanel = ({
  course,
  disciplines,
}: DisciplinesPanelProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl">{course}</CardTitle>
        <CardDescription> Suas disciplinas </CardDescription>
        <CardContent className="w-[100%]">
          {disciplines.map((discipline, index) => (
            <div
              key={index}
              className="border-[1px] border-solid border-zinc-300 p-3 flex flex-row gap-3 items-center"
            >
              <div className="flex flex-column gap-2 items-center self-start">
                <p className="font-bold text-sm">{discipline.name}</p>
                <p className="text-sky-400 text-sm">
                  (C.H {discipline.workload}hs)
                </p>
              </div>
              <p className="text-[10px] text-muted-foreground">
                {course} {discipline.semester}
              </p>
              {discipline.shift && (
                <p className="text-[10px] text-muted-foreground">
                  {discipline.shift}
                </p>
              )}
            </div>
          ))}
        </CardContent>
      </CardHeader>
    </Card>
  );
};
