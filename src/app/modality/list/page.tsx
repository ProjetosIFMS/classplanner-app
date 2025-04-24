"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/app/_components/auth/AuthContext";
import { Button } from "@/app/_components/ui/button";
import { Plus } from "lucide-react";
import Link from "next/link";
import { getModalities } from "@/app/_actions/modality/getModalities";
import { Modality } from "@/types/modality";
import { createColumns } from "./components/columns";
import { DataTable } from "./components/data-table";
import { deleteModality } from "@/app/_actions/modality/deleteModality";
import { Role } from "@/types/user";

const ListModalities = () => {
  const { session, user } = useAuth();
  const [data, setData] = useState<Modality[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchModalities = async (session: string | undefined) => {
      setIsLoading(true);
      try {
        const res = await getModalities(session);
        if (res) setData(res);
      } catch (error) {
        throw error;
      } finally {
        setIsLoading(false);
      }
    };
    fetchModalities(session);
  }, [session]);

  const handleDeleteModality = async (
    session: string | undefined,
    modality_id: string
  ) => {
    const success = await deleteModality(session, modality_id);
    if (success) {
      setData((prevData) =>
        prevData.filter((modality) => modality.id !== modality_id)
      );
    }
    return success;
  };

  const columns = createColumns(handleDeleteModality, session);

  return (
    <section className="min-h-screen flex flex-col">
      <div className="flex-1 p-6 max-w-7xl mx-auto w-full">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold">Modalidades</h1>
          {user?.role !== Role.PROFESSOR && (
            <Button asChild>
              <Link href="/modality/create">
                <Plus className="mr-2 h-4 w-4" />
                Nova Modalidade
              </Link>
            </Button>
          )}
        </div>
        <div className="bg-white dark:bg-gray-950 rounded-lg shadow p-6">
          <DataTable
            data={data}
            columns={columns}
            isLoading={isLoading}
            searchColumn="name"
            searchPlaceholder="Buscar modalidades..."
          />
        </div>
      </div>
    </section>
  );
};

export default ListModalities;
