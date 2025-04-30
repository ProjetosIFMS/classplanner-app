"use client";

import React from "react";
import ClipLoader from "react-spinners/ClipLoader";

import ListAreasCard from "./list-areas-card";
import { useAuth } from "@/app/_components/auth/AuthContext";
import { CreateAreaModalForm } from "@/app/coordinator/list-areas/create-area-modal-form";
import { useGetAllAreas, useDeleteArea } from "@/hooks/react-query/areas";
import { Layout, BookMarked } from "lucide-react";

const ListArea = () => {
  const { session } = useAuth();
  const getAllAreas = useGetAllAreas(session);
  const deleteArea = useDeleteArea(session);

  function handleDelete(id: string) {
    deleteArea.mutate(id, {
      onSuccess: () => {},
      onError: () => {},
      onSettled: () => {},
    });
  }

  return (
    <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <div className="flex flex-col space-y-6">
        {/* Header with title and action button */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <BookMarked className="h-6 w-6 text-gray-700" />
            <h1 className="text-2xl font-bold text-gray-800">
              Áreas Acadêmicas
            </h1>
          </div>
          <CreateAreaModalForm />
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
          {getAllAreas.isLoading ? (
            <div className="flex justify-center items-center h-64">
              <ClipLoader size={40} color="#4B5563" />
            </div>
          ) : getAllAreas.data && getAllAreas.data.length === 0 ? (
            <div className="flex flex-col justify-center items-center py-16 px-4 text-center">
              <Layout className="h-12 w-12 text-gray-300 mb-3" />
              <p className="text-gray-500 font-medium">
                Nenhuma área encontrada
              </p>
              <p className="text-gray-400 text-sm mt-1 max-w-sm">
                Crie uma nova área acadêmica usando o botão &aposNova Área&apos
                acima
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2  gap-8 sm:p-6 m-8 ">
              {getAllAreas.data &&
                getAllAreas.data.map((area) => (
                  <ListAreasCard
                    key={area.id}
                    id={area.id}
                    title={area.name}
                    data={area}
                    onDelete={handleDelete}
                    isLoading={deleteArea.isPending}
                  />
                ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default ListArea;
