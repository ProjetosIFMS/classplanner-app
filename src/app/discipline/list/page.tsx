"use client";

import { DataTable } from "@/app/_components/ui/data-table";
import { createColumns } from "../components/columns";
import { useAuth } from "@/app/_components/auth/AuthContext";
import { Button } from "@/app/_components/ui/button";
import { Plus } from "lucide-react";
import Link from "next/link";
import { Role } from "@/types/user";
import { useGetAllDisciplines } from "@/hooks/react-query/disciplines";

const ListDisciplines = () => {
  const { session, user } = useAuth();
  const getDisciplines = useGetAllDisciplines(session);

  const columns = createColumns(session);

  return (
    <section className="min-h-screen flex flex-col">
      <div className="flex-1 p-6 max-w-7xl mx-auto w-full">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold">Disciplinas</h1>
          {user?.role !== Role.PROFESSOR && (
            <Button asChild>
              <Link href="/discipline/create">
                <Plus className="mr-2 h-4 w-4" />
                Nova Disciplina
              </Link>
            </Button>
          )}
        </div>
        <div className="bg-white dark:bg-gray-950 rounded-lg shadow p-6">
          <DataTable
            data={getDisciplines.data ?? []}
            columns={columns}
            isLoading={getDisciplines.isLoading}
            searchColumn="name"
            searchPlaceholder="Buscar disciplinas..."
          />
        </div>
      </div>
    </section>
  );
};

export default ListDisciplines;
