"use client";

import { Panel } from "@/app/professor/dashboard/panel";
import {
  ProfessorAndDisciplinesTable,
  type ProfessorAndDiscipline,
} from "@/app/coordinator/dashboard/professors-and-disciplines-table";
import React from "react";

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

const mockedHistory = [
  {
    title: "Selecionou a disciplina Algoritmos I em Engenharia da Computação",
    description: "1 hour ago",
  },
  {
    title: "Selecionou a disciplina Algoritmos I em TADS",
    description: "1 hour ago",
  },
  {
    title: "Selecionou a disciplina Algoritmos I em TADS",
    description: "1 hour ago",
  },
  {
    title: "Selecionou a disciplina Algoritmos I em TADS",
    description: "1 hour ago",
  },
  {
    title: "Selecionou a disciplina Algoritmos I em TADS",
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

const CoordinatorDashboard = () => {
  const [notifications, setNotifications] = React.useState(() => [
    ...mockedNotifications,
  ]);
  const [history, setHistory] = React.useState(() => [...mockedHistory]);
  const [professorsAndDisciplineData, setProfessorsAndDisciplineData] =
    React.useState(() => [...mockedProfessorsAndDisciplineData]);
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
              panelDescription={`Você realizou ${history.length} ações`}
              messages={history}
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
};

export default CoordinatorDashboard;
