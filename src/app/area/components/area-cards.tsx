"use client";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/app/_components/ui/card";
import { useAreas } from "@/hooks/useAreas";

export const AreaCards = () => {
  const areas = useAreas();

  if (!areas) {
    return <p className="text-muted-foreground">Carregando...</p>;
  }

  return (
    <div className="bg-white grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 md:gap-8 lg:gap-12 w-full max-w-full mx-auto p-4 sm:p-6 md:p-10 lg:p-14 shadow-lg border rounded-md">
      {areas &&
        areas.map((area, index) => (
          <Card
            key={index}
            className="h-full cursor-pointer w-full mx-auto overflow-hidden border border-border/40 transition-all duration-300 shadow-lg hover:shadow-xl hover:shadow-primary/20 hover:border-primary/20"
          >
            <CardHeader>
              <CardTitle className="self-center border-b px-3 border-neutral-600 text-base sm:text-lg md:text-xl">
                {area.name}
              </CardTitle>
            </CardHeader>
            <CardContent className="flex justify-center py-4 sm:py-6">
              <span className="bg-slate-500 rounded-full p-8 sm:p-10 md:p-12 lg:p-20 inline-block hover:shadow-md hover:shadow-primary/20 transition-all duration-300"></span>
            </CardContent>
            <CardFooter className="flex flex-col sm:flex-row justify-around gap-2 sm:gap-3 pt-0 p-3 sm:p-4 border-t border-border/100">
              <p className="font-medium text-xs sm:text-sm mt-2 sm:mt-4">
                <span className="font-bold text-muted-foreground">
                  Total de professores:{" "}
                </span>
                <span className="text-muted"> </span>
              </p>

              <p className="text-muted-foreground font-bold text-xs sm:text-sm mt-2 sm:mt-4">
                Disciplinas:
              </p>
            </CardFooter>
          </Card>
        ))}
    </div>
  );
};
