"use client";

import React from "react";
import Link from "next/link";

import { Button } from "@/app/_components/ui/button";

import { Discipline } from "@/types/discipline";
import { Panel } from "./panel";
import { useAuth } from "@/app/_components/auth/AuthContext";
import { useGetMyAuditLogsInfinite } from "@/hooks/react-query/audit-logs";
import { formatAuditLogMessage } from "@/lib/auditLogMessage";
import { useGetMyInterestsSelection } from "@/hooks/react-query/interests-selection";
import { useGetAllCourses } from "@/hooks/react-query/courses";
import { useGetAllDisciplines } from "@/hooks/react-query/disciplines";
import { SelectAreaModalForm } from "@/app/professor/components/select-area-modal-form";
import { CoursesPanel } from "@/app/professor/dashboard/components/courses-panel";
import { SelectDayoffModalForm } from "@/app/professor/components/select-dayoff-modal-form";
import { useGetMyDayoff } from "@/hooks/react-query/dayoff";

export default function ProfessorDashboard() {
  const [isSelectAreaModalOpen, setIsSelectAreaModalOpen] =
    React.useState<boolean>(false);
  const [isSelectDayoffModalOpen, setIsSelectDayoffModalOpen] =
    React.useState<boolean>(false);

  const { user, session } = useAuth();
  const getMyAuditLogsInfinite = useGetMyAuditLogsInfinite(session);
  const getMyInterestsSelection = useGetMyInterestsSelection(session);
  const getAllCourses = useGetAllCourses(session);
  const getAllDisciplines = useGetAllDisciplines(session);
  const getMyDayoff = useGetMyDayoff(session);

  const [disciplinesPanelInfo, setDisciplinesPanelInfo] = React.useState<
    {
      course_name: string;
      disciplines: Discipline[];
    }[]
  >([]);

  React.useEffect(() => {
    if (user?.area_id === null) {
      setIsSelectAreaModalOpen(true);
    }
  }, [user]);

  React.useEffect(() => {
    if (
      (getMyInterestsSelection.data?.length ?? 0) > 0 &&
      (getAllDisciplines.data?.length ?? 0) > 0 &&
      (getAllCourses.data?.length ?? 0) > 0
    ) {
      setDisciplinesPanelInfo(() => {
        const activeInterestsSelection = getMyInterestsSelection.data?.filter(
          (interest) => interest.status !== "INACTIVE"
        );

        const relatedDisciplines = getAllDisciplines.data?.filter(
          (discipline) =>
            activeInterestsSelection?.some(
              (interest) => interest.discipline_id === discipline.id
            )
        );

        const relatedCourses = getAllCourses.data?.filter((course) =>
          relatedDisciplines?.some(
            (discipline) => discipline.course_id === course.id
          )
        );

        return (
          relatedCourses?.map((course) => {
            const disciplines = relatedDisciplines?.filter(
              (discipline) => discipline.course_id === course.id
            );

            return {
              course_name: course.name
                .split(" ")
                .map((word) => word[0])
                .filter((letter) => letter === letter.toUpperCase())
                .join(""),
              disciplines: disciplines ?? [],
            };
          }) ?? []
        );
      });
    }
  }, [
    getMyInterestsSelection.data,
    getAllCourses.data,
    getAllDisciplines.data,
  ]);

  const notifications = [
    {
      title: "Existem conflitos em suas disciplinas",
      description: "1 hour ago",
    },
    {
      title: "Existem conflitos em suas disciplinas",
      description: "1 hour ago",
    },
    {
      title: "Existem conflitos em suas disciplinas",
      description: "1 hour ago",
    },
    {
      title: "Sua seleção de interesse a disciplinas foi confirmada",
      description: "2 weeks ago",
    },
    {
      title: "Período de seleção de interesse de disciplinas aberto",
      description: "4 weeks ago",
    },
  ];

  function next() {
    getMyAuditLogsInfinite.fetchNextPage();
  }

  return (
    <section>
      <div className="flex flex-col items-center">
        <div>
          <div className="flex justify-between items-center">
            <h1 className="text-lg font-extrabold py-6">Dashboard</h1>
            <div>
              <SelectAreaModalForm
                session={session}
                isOpen={isSelectAreaModalOpen}
                setIsOpen={setIsSelectAreaModalOpen}
              />
            </div>
          </div>
          <div className="justify-between gap-12 grid grid-cols-2">
            <Panel
              name="Avisos"
              panelDescription={`Você tem ${notifications.length} avisos`}
              messages={notifications}
            />
            <Panel
              name="Histórico"
              messages={
                getMyAuditLogsInfinite.data
                  ? getMyAuditLogsInfinite.data?.pages.flatMap((page) => {
                      return page.data.map(formatAuditLogMessage);
                    })
                  : []
              }
              loading={getMyAuditLogsInfinite.isLoading}
              hasMore={getMyAuditLogsInfinite.hasNextPage}
              next={next}
              panelDescription={
                getMyAuditLogsInfinite.isLoading
                  ? ""
                  : getMyAuditLogsInfinite.data &&
                      getMyAuditLogsInfinite.data.pages.length > 0
                    ? `Você tem ${getMyAuditLogsInfinite.data.pages[0].total} notificações`
                    : ""
              }
            />
          </div>
          <div>
            <div className="flex justify-between items-center">
              <h1 className="text-lg font-extrabold py-6">Suas disciplinas</h1>
              <div className="flex justify-center items-center space-x-4">
                <SelectDayoffModalForm
                  session={session}
                  isOpen={isSelectDayoffModalOpen}
                  setIsOpen={setIsSelectDayoffModalOpen}
                  isLoading={getMyDayoff.isLoading}
                  isUpdate={getMyDayoff.data !== undefined}
                  data={getMyDayoff.data ?? undefined}
                />

                <Link href={"/professor/select-interest"}>
                  <Button>Ir para seleção de interesses</Button>
                </Link>
              </div>
            </div>
            <div className="flex flex-col items-center justify-center bg-white dark:bg-gray-950 rounded-lg shadow w-full">
              <CoursesPanel
                courses={disciplinesPanelInfo}
                isLoading={
                  getMyInterestsSelection.isLoading ||
                  getAllCourses.isLoading ||
                  getAllDisciplines.isLoading
                }
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
