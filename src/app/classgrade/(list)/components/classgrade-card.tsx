import React from "react";
import { GraduationCap, BookOpen } from "lucide-react";

import { Card, CardContent } from "@/app/_components/ui/card";

import { Classgrade } from "@/types/classgrade";
import { ClassgradeDetailsModal } from "@/app/classgrade/(list)/components/classgrade-details-modal";

interface ClassgradeCardProps {
  classgrade: Classgrade;
  PPCyear: number | undefined;
  courseName: string | undefined;
}

export function ClassgradeCard({
  classgrade,
  PPCyear,
  courseName,
}: ClassgradeCardProps) {
  // Generate acronym from course name
  const courseAcronym = courseName
    ?.split(" ")
    .map((word) =>
      word[0] && word[0] === word[0].toUpperCase() ? word[0] : ""
    )
    .join("");

  return (
    <Card className="overflow-hidden hover:shadow-md transition-shadow duration-300">
      <CardContent className="p-0">
        <div className="bg-gradient-to-r from-gray-50 to-gray-100 px-5 py-4 border-b border-gray-100">
          <div className="flex justify-between items-center">
            <h3 className="font-medium text-gray-800">
              <span className="font-bold">{courseAcronym}</span> • Semestre{" "}
              {classgrade.semester}
            </h3>
            <span className="text-sm text-gray-500">{classgrade.year}</span>
          </div>
        </div>

        <div className="px-5 py-4 space-y-3">
          <div className="flex items-center text-sm text-gray-600">
            <GraduationCap className="h-4 w-4 mr-2 text-gray-400" />
            <span className="mr-2">PPC:</span>
            <span className="font-medium">{PPCyear}</span>
          </div>

          <div className="flex items-center text-sm text-gray-600">
            <BookOpen className="h-4 w-4 mr-2 text-gray-400" />
            <span className="mr-2">Disciplinas:</span>
            <span className="font-medium">
              {classgrade?.ClassGradeDiscipline?.length ?? 0}
            </span>
          </div>
        </div>

        <div className="px-5 py-3 bg-gray-50 border-t border-gray-100 flex justify-end">
          <ClassgradeDetailsModal classgrade={classgrade} />
        </div>
      </CardContent>
    </Card>
  );
}
