"use client";

import { useAuth } from "@/app/_components/auth/AuthContext";
import { createColumns } from "./components/columns";
import { DataTable } from "@/app/_components/ui/data-table";
import { Role } from "@/types/user";
import { useGetAllModalities } from "@/hooks/react-query/modalities";

import { CreateModalityModalForm } from "@/app/modality/(list)/components/create-modality-modal-form";

export default function ListModalities() {
  const { session, user } = useAuth();
  const getModalities = useGetAllModalities(session);

  const columns = createColumns(session);

  return (
    <section className="min-h-screen flex flex-col">
      <div className="flex-1 p-6 max-w-7xl mx-auto w-full">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold">Modalidades</h1>
          {user?.role !== Role.PROFESSOR && (
            <CreateModalityModalForm session={session} />
          )}
        </div>
        <div className="bg-white dark:bg-gray-950 rounded-lg shadow p-6">
          <DataTable
            data={getModalities.data ?? []}
            columns={columns}
            isLoading={getModalities.isLoading}
            searchColumn="name"
            searchPlaceholder="Buscar modalidades..."
          />
        </div>
      </div>
    </section>
  );
}
