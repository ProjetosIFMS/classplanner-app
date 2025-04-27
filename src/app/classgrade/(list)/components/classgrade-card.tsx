import React, { useMemo } from "react";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/app/_components/ui/card";

import { Classgrade } from "@/types/classgrade";
import { ClassgradeDetailsModal } from "@/app/classgrade/(list)/components/classgrade-details-modal";

interface ClassgradeCardProps {
  classgrade: Classgrade;
  PPCyear: number | undefined;
  courseName: string | undefined;
  //   quantityProfessors: number | undefined;
}

export function ClassgradeCard({
  classgrade,
  PPCyear,
  courseName,
  //   quantityProfessors,
}: ClassgradeCardProps) {
  const classgradeInformation = useMemo(() => {
    return {
      PPC: PPCyear,
      //   "N° Professores": quantityProfessors,
      "N° Disciplinas": classgrade?.ClassGradeDiscipline?.length ?? 0,
    };
  }, [classgrade, PPCyear]);

  return (
    <Card>
      <CardContent className="space-y-4">
        <CardHeader>
          <CardTitle className="text-lg" title={courseName}>
            {courseName
              ?.split(" ")
              .map((word) =>
                word[0] && word[0] === word[0].toUpperCase() ? word[0] : ""
              )
              .join("")}{" "}
            - Semestre {classgrade.semester}
          </CardTitle>
        </CardHeader>

        <div>
          <div className="flex flex-col gap-2">
            {Object.entries(classgradeInformation).map(([key, value]) => (
              <div key={key} className="flex justify-between items-center px-6">
                <span className="font-medium">{key}:</span>
                <span>{value}</span>
              </div>
            ))}
          </div>
        </div>

        <CardFooter className="flex justify-end items-center py-0">
          <ClassgradeDetailsModal classgrade={classgrade} />
        </CardFooter>
      </CardContent>
    </Card>
  );
}
