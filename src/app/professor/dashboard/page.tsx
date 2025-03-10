import { Discipline } from "@/types/discipline";
import { DisciplinesPanel } from "./disciplinesPanel";
import { Panel } from "./panel";

const Dashboard = async () => {
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

  const records = [
    {
      title: "Selecionou a disciplina Algoritmos I em TADS",
      description: "1 hour ago",
    },
    {
      title: "Selecionou a disciplina Algoritmos I em TADS",
      description: "1 hour ago",
    },
    {
      title: "Selecionou a disciplina Algoritmos I em Engenharia da Computação",
      description: "1 hour ago",
    },
    {
      title:
        "Selecionou a disciplina Estrutura de Dados em Engenharia da Computação",
      description: "1 hour ago",
    },
    {
      title: "Selecionou a disciplina Algoritmos I em Engenharia da Computação",
      description: "1 hour ago",
    },
  ];

  const disciplines: Discipline[] = [];

  return (
    <section>
      <div className="flex flex-col items-center justify-center ">
        <div>
          <h1 className="text-lg font-extrabold py-6">Dashboard</h1>
          <div className="flex flex-row justify-around gap-12">
            <Panel
              name="Avisos"
              panelDescription={`Você têm ${notifications.length} avisos`}
              messages={notifications}
            />
            <Panel
              name="Histórico"
              panelDescription={`Você realizou ${records.length} ações`}
              messages={records}
            />
          </div>
          <h2 className="text-lg font-extrabold py-6 self-start">
            {" "}
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
};

export default Dashboard;
