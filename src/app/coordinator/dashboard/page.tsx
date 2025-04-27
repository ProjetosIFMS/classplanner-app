"use client";

import React from "react";

import { Panel } from "@/app/professor/dashboard/panel";
import { formatAuditLogMessage } from "@/lib/auditLogMessage";
import { useGetMyAuditLogs } from "@/hooks/react-query/audit-logs";
import { useAuth } from "@/app/_components/auth/AuthContext";
import { useGetAllInterestsSelection } from "@/hooks/react-query/interests-selection";
import { useGetAllDisciplines } from "@/hooks/react-query/disciplines";
import { useGetAllUsers } from "@/hooks/react-query/user";
import { useGetAllCourses } from "@/hooks/react-query/courses";
import { DataTable } from "@/app/_components/ui/data-table";
import { createColumns } from "@/app/coordinator/dashboard/columns";

const mockedNotifications = [
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
    title: "Existem conflitos em suas disciplinas",
    description: "1 hour ago",
  }, 
  {
    title: "Existem conflitos em suas disciplinas",
    description: "1 hour ago",
  },
];

export default function CoordinatorDashboard() {
  const [notifications, setNotifications] = React.useState(() => [
    ...mockedNotifications,
  ]);
  const [professorsAndDisciplineData, setProfessorsAndDisciplineData] =
    React.useState<ProfessorAndDiscipline[]>([]);
  const columns = createColumns();

  const { session } = useAuth();
  const getMyAuditLogs = useGetMyAuditLogs(session);
  const getInterestsSelection = useGetAllInterestsSelection(session);
  const getAllDisciplines = useGetAllDisciplines(session);
  const getAllUsers = useGetAllUsers(session);
  const getAllCourses = useGetAllCourses(session);

  React.useEffect(() => {
    if (
      (getInterestsSelection.data?.length ?? 0) > 0 &&
      (getAllDisciplines.data?.length ?? 0) > 0 &&
      (getAllUsers.data?.length ?? 0) > 0 &&
      (getAllCourses.data?.length ?? 0) > 0
    ) {
      setProfessorsAndDisciplineData((): ProfessorAndDiscipline[] => {
        return (
          getInterestsSelection.data
            ?.filter(
              (interestSelection) => interestSelection.status !== "INACTIVE"
            )
            .flatMap((interestSelection) => {
              const relatedUser = getAllUsers.data?.find(
                (user) => user.id === interestSelection.user_id
              );
              const relatedDiscipline = getAllDisciplines.data?.find(
                (discipline) =>
                  discipline.id === interestSelection.discipline_id
              );
              const relatedCourse = getAllCourses.data?.find(
                (course) => course.id === relatedDiscipline?.course_id
              );

              return {
                professorName: `${
                  relatedUser?.firstName
                } ${relatedUser?.lastName}`,
                disciplineName: relatedDiscipline?.name || "N/A",
                courseName: relatedCourse?.name || "N/A",
                workload: relatedDiscipline?.practicalHours || 0,
              };
            }) || []
        );
      });
    }
  }, [
    getInterestsSelection.data,
    getAllDisciplines.data,
    getAllUsers.data,
    getAllCourses.data,
  ]);

  return (
    <section>
      <div className="flex flex-col items-center justify-center">
        <div>
          <h1 className="text-lg font-extrabold py-6">Dashboard</h1>
          <div className="flex flex-row justify-around gap-12">
            <Panel
              name="Avisos"
              panelDescription={`Você tem ${notifications.length} avisos`}
              messages={notifications}
            />
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
          <div>
            <h1 className="text-lg font-extrabold py-6">
              Professores & Disciplinas
            </h1>
            <div className="flex flex-col items-center justify-center bg-white dark:bg-gray-950 rounded-lg shadow p-6">
              <DataTable
                data={professorsAndDisciplineData ?? []}
                columns={columns}
                isLoading={
                  getInterestsSelection.isLoading ||
                  getAllDisciplines.isLoading ||
                  getAllUsers.isLoading ||
                  getAllCourses.isLoading
                }
                searchColumn="professorName"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
