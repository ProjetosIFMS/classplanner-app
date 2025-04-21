"use client";

import React from "react";

import { Discipline } from "@/types/discipline";
import { DisciplinesPanel } from "./disciplines-panel";
import { Panel } from "./panel";
import { useAuth } from "@/app/_components/auth/AuthContext";
import { useGetMyAuditLogs } from "@/hooks/react-query/audit-logs";
import { formatAuditLogMessage } from "@/lib/auditLogMessage";
import { useGetMyInterestsSelection } from "@/hooks/react-query/interests-selection";
import { useGetAllCourses } from "@/hooks/react-query/courses";
import { useGetAllDisciplines } from "@/hooks/react-query/disciplines";
import ClipLoader from "react-spinners/ClipLoader";

export default function ProfessorDashboard() {
  const { session } = useAuth();
  const getMyAuditLogs = useGetMyAuditLogs(session);
  const getMyInterestsSelection = useGetMyInterestsSelection(session);
  const getAllCourses = useGetAllCourses(session);
  const getAllDisciplines = useGetAllDisciplines(session);

  const [disciplinesPanelInfo, setDisciplinesPanelInfo] = React.useState<
    {
      course: string;
      disciplines: Discipline[];
    }[]
  >([]);

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
              course: course.name
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

  return (
    <section>
      <div className="flex flex-col items-center justify-center ">
        <div>
          <h1 className="text-lg font-extrabold py-6">Dashboard</h1>
          <div className="flex flex-row justify-around gap-12">
            <Panel name="Avisos" messages={notifications} />
            <Panel
              name="Histórico"
              messages={
                getMyAuditLogs.data
                  ? getMyAuditLogs.data.map((log) => formatAuditLogMessage(log))
                  : []
              }
              loading={getMyAuditLogs.isLoading}
            />
          </div>
          <h2 className="text-lg font-extrabold py-6 self-start">
            Suas Disciplinas
          </h2>
          <div className="flex flex-row justify-between gap-16 mb-24 mx-8">
            {getMyInterestsSelection.isLoading ||
            getAllCourses.isLoading ||
            getAllDisciplines.isLoading ? (
              <div className="flex justify-center items-center w-full">
                <ClipLoader />
              </div>
            ) : (
              disciplinesPanelInfo.map((disciplinePanel, index) => (
                <DisciplinesPanel
                  key={index}
                  course={disciplinePanel.course}
                  disciplines={disciplinePanel.disciplines}
                />
              ))
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
