"use client";

import React from "react";

import { Panel } from "@/app/professor/dashboard/panel";
import {
  ProfessorAndDisciplinesTable,
  type ProfessorAndDiscipline,
} from "@/app/coordinator/dashboard/professors-and-disciplines-table";
import { formatAuditLogMessage } from "@/lib/auditLogMessage";
import { useGetMyAuditLogs } from "@/hooks/react-query/audit-logs";
import { useAuth } from "@/app/_components/auth/AuthContext";

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

const mockedProfessorsAndDisciplineData: ProfessorAndDiscipline[] = [
  {
    professorName: "Prof. Dr. Fulano de Tal",
    disciplineName: "Algoritmos I",
    courseName: "Engenharia da Computação",
    workload: "60",
  },
  {
    professorName: "Prof. Dr. Ciclano de Tal",
    disciplineName: "BAlgoritmos II",
    courseName: "Engenharia da Computação",
    workload: "60",
  },
  {
    professorName: "Prof. Dr. Beltrano de Tal",
    disciplineName: "CAlgoritmos III",
    courseName: "Engenharia da Computação",
    workload: "60",
  },
];

export default function CoordinatorDashboard() {
  const [notifications, setNotifications] = React.useState(() => [
    ...mockedNotifications,
  ]);
  const [professorsAndDisciplineData, setProfessorsAndDisciplineData] =
    React.useState(() => [...mockedProfessorsAndDisciplineData]);

  const { session } = useAuth();
  const getMyAuditLogs = useGetMyAuditLogs(session);

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
            <div className="flex flex-col items-center justify-center">
              <ProfessorAndDisciplinesTable
                data={professorsAndDisciplineData}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
