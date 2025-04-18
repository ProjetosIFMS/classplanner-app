"use client";

import React from "react";

import { Discipline } from "@/types/discipline";
import { DisciplinesPanel } from "./disciplines-panel";
import { Panel } from "./panel";
import { useAuth } from "@/app/_components/auth/AuthContext";
import { useGetMyAuditLogs } from "@/hooks/react-query/audit-logs";
import { formatAuditLogMessage } from "@/lib/auditLogMessage";

export default function ProfessorDashboard() {
  const { session } = useAuth();
  const getMyAuditLogs = useGetMyAuditLogs(session);

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

  const disciplines: Discipline[] = [];

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
          <div className="flex flex-row gap-16 mb-24 mx-8">
            <DisciplinesPanel course="TADS" disciplines={disciplines} />
            <DisciplinesPanel course="TADS" disciplines={disciplines} />
            <DisciplinesPanel course="TADS" disciplines={disciplines} />
          </div>
        </div>
      </div>
    </section>
  );
}
