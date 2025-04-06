"use client";

import React, { useEffect, useState } from "react";
import ListAreasCard from "./list-areas-card";
import { useAuth } from "@/app/_components/auth/AuthContext";
import { getAreas } from "@/app/_actions/area/getAreas";
import { Area } from "@/types/area";
import { deleteArea } from "@/app/_actions/area/deleteArea";

const areasData = [
  {
    id: "1",
    title: "Desenvolvimento Web",
    description: "Área de desenvolvimento web",
    totalTeachers: 10,
    disciplines: [
      {
        title: "Algoritmos I",
        description: "Disciplinas relacionadas a algoritmos",
        totalTeachers: 10,
      },
      {
        title: "Algoritmos II",
        description: "Disciplinas relacionadas a algoritmos",
        totalTeachers: 10,
      },
      {
        title: "Algoritmos III",
        description: "Disciplinas relacionadas a algoritmos",
        totalTeachers: 10,
      },
    ],
  },
  {
    id: "2",
    title: "Redes de Computadores",
    description: "Disciplinas relacionadas a redes de computadores",
    totalTeachers: 10,
    disciplines: [
      {
        title: "Redes I",
        description: "Disciplinas relacionadas a redes",
        totalTeachers: 10,
      },
      {
        title: "Redes II",
        description: "Disciplinas relacionadas a redes",
        totalTeachers: 10,
      },
      {
        title: "Redes III",
        description: "Disciplinas relacionadas a redes",
        totalTeachers: 10,
      },
    ],
  },
  {
    id: "3",
    title: "Banco de Dados Relacionais",
    description: "Disciplinas relacionadas a banco de dados",
    totalTeachers: 10,
    disciplines: [
      {
        title: "Banco de Dados I",
        description: "Disciplinas relacionadas a banco de dados",
        totalTeachers: 10,
      },
      {
        title: "Banco de Dados II",
        description: "Disciplinas relacionadas a banco de dados",
        totalTeachers: 10,
      },
      {
        title: "Banco de Dados III",
        description: "Disciplinas relacionadas a banco de dados",
        totalTeachers: 10,
      },
    ],
  },
  {
    id: "4",
    title: "Segurança de Software",
    description: "Disciplinas relacionadas a segurança de software",
    totalTeachers: 10,
    disciplines: [
      {
        title: "Segurança I",
        description: "Disciplinas relacionadas a segurança",
        totalTeachers: 10,
      },
      {
        title: "Segurança II",
        description: "Disciplinas relacionadas a segurança",
        totalTeachers: 10,
      },
      {
        title: "Segurança III",
        description: "Disciplinas relacionadas a segurança",
        totalTeachers: 10,
      },
    ],
  },
  {
    id: "5",
    title: "Generalista",
    description: "a definir",
    totalTeachers: 10,
    disciplines: [
      {
        title: "Generalista I",
        description: "a definir",
        totalTeachers: 10,
      },
      {
        title: "Generalista II",
        description: "a definir",
        totalTeachers: 10,
      },
      {
        title: "Generalista III",
        description: "a definir",
        totalTeachers: 10,
      },
    ],
  },
  {
    id: "6",
    title: "Inteligência Artificial",
    description: "a definir",
    totalTeachers: 10,
    disciplines: [
      {
        title: "IA I",
        description: "a definir",
        totalTeachers: 10,
      },
      {
        title: "IA II",
        description: "a definir",
        totalTeachers: 10,
      },
      {
        title: "IA III",
        description: "a definir",
        totalTeachers: 10,
      },
    ],
  },
  {
    id: "7",
    title: "Engenharia de Software",
    description: "a definir",
    totalTeachers: 10,
    disciplines: [
      {
        title: "Engenharia I",
        description: "a definir",
        totalTeachers: 10,
      },
      {
        title: "Engenharia II",
        description: "a definir",
        totalTeachers: 10,
      },
      {
        title: "Engenharia III",
        description: "a definir",
        totalTeachers: 10,
      },
    ],
  },
];

const ListArea = () => {
  const { session } = useAuth();
  const [areas, setAreas] = useState<Area[]>();
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    getAreas(session).then((response) => {
      setAreas(response);
    });
  }, [session]);

  const handleDelete = (id: string) => {
    setIsLoading(true);
    deleteArea(session, id).then(() => {
      setAreas((prevAreas) => prevAreas?.filter((area) => area.id !== id));
      setTimeout(() => {
        setIsLoading(false);
      }, 500);
    });
  };

  return (
    <section className="flex-1 h-full">
      <div className="container mx-auto py-4 h-full">
        <h1 className="text-2xl font-bold mb-6">Áreas Acadêmicas</h1>
        <div className="bg-white h-full rounded-lg shadow-sm">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6  content-start">
            {areas &&
              areas.map((area, index) => (
                <ListAreasCard
                  key={index}
                  id={area.id}
                  title={area.name}
                  data={area}
                  onDelete={handleDelete}
                  isLoading={isLoading}
                />
              ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ListArea;
