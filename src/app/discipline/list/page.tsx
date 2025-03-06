"use client";

import { Header } from "@/app/_components/header";
import { DataTable } from "@/app/discipline/list/components/data-table";
import { createColumns } from "./components/columns";
import { useEffect, useState } from "react";
import { useAuth } from "@/app/_components/auth/AuthContext";
import type { Discipline } from "@/types/discipline";
import { deleteDiscipline, getDisciplines } from "../actions";
import { Button } from "@/app/_components/ui/button";
import { Plus } from "lucide-react";
import Link from "next/link";

const ListDisciplines = () => {
  const { session } = useAuth();
  const [data, setData] = useState<Discipline[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchDisciplines = async (session: string | undefined) => {
      setIsLoading(true);
      try {
        const res = await getDisciplines(session);
        if (res) setData(res);
      } catch (error) {
        throw error;
      } finally {
        setIsLoading(false);
      }
    };
    fetchDisciplines(session);
  }, [session]);

  const handleDeleteDiscipline = async (
    session: string | undefined,
    discipline_id: string,
  ) => {
    const success = await deleteDiscipline(session, discipline_id);
    if (success) {
      setData((prevData) =>
        prevData.filter((discipline) => discipline.id !== discipline_id),
      );
    }
    return success;
  };

  const columns = createColumns(handleDeleteDiscipline, session);

  return (
    <section className="min-h-screen flex flex-col">
      <Header />
      <div className="flex-1 p-6 max-w-7xl mx-auto w-full">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold">Disciplinas</h1>
          <Button asChild>
            <Link href="/discipline/create">
              <Plus className="mr-2 h-4 w-4" />
              Nova Disciplina
            </Link>
          </Button>
        </div>
        <div className="bg-white dark:bg-gray-950 rounded-lg shadow p-6">
          <DataTable
            data={data}
            columns={columns}
            isLoading={isLoading}
            searchColumn="name"
            searchPlaceholder="Buscar disciplinas..."
          />
        </div>
      </div>
    </section>
  );
};

export default ListDisciplines;
