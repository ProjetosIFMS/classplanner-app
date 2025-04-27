"use client";

import { DataTable } from "@/app/_components/ui/data-table";
import { createColumns } from "./components/columns";
import { useAuth } from "@/app/_components/auth/AuthContext";
import { Role } from "@/types/user";
import { useGetAllDisciplines } from "@/hooks/react-query/disciplines";
import { CreateDisciplineModalForm } from "@/app/discipline/(list)/components/create-discipline-modal-form";

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
            <CreateDisciplineModalForm session={session} />
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
