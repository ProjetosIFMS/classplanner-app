"use client";

import React from "react";
import ClipLoader from "react-spinners/ClipLoader";

import ListAreasCard from "./list-areas-card";
import { useAuth } from "@/app/_components/auth/AuthContext";
import { CreateAreaModal } from "@/app/coordinator/list-areas/create-area-modal";
import { useGetAllAreas, useDeleteArea } from "@/hooks/react-query/areas";

const ListArea = () => {
  const { session } = useAuth();
  const getAllAreas = useGetAllAreas(session);
  const deleteArea = useDeleteArea(session);
  const [isDeleting, setIsDeleting] = React.useState<boolean>(false);

  function handleDelete(id: string) {
    setIsDeleting(true);
    deleteArea.mutate(id, {
      onSuccess: () => {},
      onError: () => {},
      onSettled: () => {
        setIsDeleting(false);
      },
    });
  }

  return (
    <section className="flex-1 h-full">
      <div className="container mx-auto py-4 h-full">
        <div className="flex justify-between">
          <h1 className="text-2xl font-bold mb-6">Áreas Acadêmicas</h1>
          <CreateAreaModal />
        </div>
        <div className="bg-white h-full rounded-lg shadow-sm">
          {getAllAreas.isFetching || isDeleting ? (
            <div className="flex justify-center items-center h-full">
              <ClipLoader size={50} color="#000000" />
            </div>
          ) : getAllAreas.data && getAllAreas.data.length === 0 ? (
            <div className="flex justify-center items-center h-full">
              <p className="text-gray-500">Nenhuma área encontrada.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6 content-start">
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
