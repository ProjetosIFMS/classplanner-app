"use client";
import React, { useCallback } from "react";
import Link from "next/link";
import { Plus } from "lucide-react";

import { Button } from "@/app/_components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/app/_components/ui/card";

import { useAuth } from "@/app/_components/auth/AuthContext";
import { useGetAllClassgrades } from "@/hooks/react-query/classgrade";
import { Role } from "@/types/user";
import { useGetAllCourses } from "@/hooks/react-query/courses";
import ClipLoader from "react-spinners/ClipLoader";
import { useGetAllPPC } from "@/hooks/react-query/ppc";
import { Classgrade } from "@/types/classgrade";
import { ClassgradeCard } from "@/app/classgrade/(list)/components/classgrade-card";

export default function ClassgradeList() {
  const { session, user } = useAuth();
  const getClassgrades = useGetAllClassgrades(session, {
    includeDisciplines: true,
  });
  const getCourses = useGetAllCourses(session);
  const getPPCs = useGetAllPPC(session);

  const getCourseFromClassgrade = useCallback(
    (classgrade: Classgrade) => {
      if (!classgrade) return null;
      const course = getCourses.data?.find(
        (course) => course.id === classgrade.course_id
      );

      if (!course) return null;

      return course;
    },
    [getCourses.data]
  );

  const getPPCfromClassgrade = useCallback(
    (classgrade: Classgrade) => {
      const ppc = getPPCs.data?.find(
        (ppc) => ppc.id === classgrade.pedagogical_project_id
      );
      if (!ppc) return null;
      return ppc;
    },
    [getPPCs.data]
  );

  return (
    <section className="min-h-screen flex flex-col">
      <div className="flex-1 p-6 max-w-7xl mx-auto w-full">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold">Turmas</h1>
          {user?.role === Role.COORDINATOR && (
            <Link href={"/classgrade/create"}>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Nova turma
              </Button>
            </Link>
          )}
        </div>

        <div className="mt-6 flex-1">
          <Card className="w-full">
            <CardHeader />
            <CardContent className="grid gap-8 grid-cols-1 lg:grid-cols-2">
              {getClassgrades.isLoading ||
              getCourses.isLoading ||
              getPPCs.isLoading ? (
                <div className="flex items-center justify-center col-span-1 lg:col-span-2">
                  <ClipLoader size={64} />
                </div>
              ) : (
                getClassgrades.data?.map((classgrade) => (
                  <ClassgradeCard
                    key={classgrade.id}
                    classgrade={classgrade}
                    PPCyear={getPPCfromClassgrade(classgrade)?.year}
                    courseName={getCourseFromClassgrade(classgrade)?.name}
                  />
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
