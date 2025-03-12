"use client";
import { useCallback, useEffect, useState } from "react";
import { deletePpc } from "@/app/_actions/pedagogical-project/deletePpc";
import { getPpc } from "@/app/_actions/pedagogical-project/getPpc";
import { useAuth } from "@/app/_components/auth/AuthContext";

import { PPC } from "@/types/ppc";
import { Button } from "@/app/_components/ui/button";
import Link from "next/link";
import { Plus } from "lucide-react";
import { ListCardPpc } from "../components/list-card";

export default function ListPpc() {
  const [ppc, setPpc] = useState<PPC[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { session } = useAuth();

  const fetchPpc = useCallback(async () => {
    setIsLoading(true);
    try {
      const res = await getPpc(session);
      if (res) setPpc(res);
    } catch (err) {
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, [session]);

  useEffect(() => {
    fetchPpc();
  }, [fetchPpc]);

  const handleDeletePPC = useCallback(
    async (sessionToken: string | undefined, ppc_id: string) => {
      try {
        const success = await deletePpc(sessionToken, ppc_id);
        if (success) {
          setPpc((prevData) => prevData.filter((ppc) => ppc.id !== ppc_id));
        }
        return success;
      } catch (error) {
        console.error("Error deleting PPC:", error);
        return false;
      }
    },
    [],
  );

  return (
    <section className="flex flex-col items-center justify-center">
      <div className="flex-1 p-6 max-w-7xl mx-auto w-full">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold">Projetos Pedagógicos</h1>
          <Button asChild className="shadow-lg">
            <Link href="/ppc/create">
              <Plus className="mr-2 h-4 w-4" />
              Novo PPC
            </Link>
          </Button>
        </div>
        <ListCardPpc
          data={ppc}
          deletePpcFn={handleDeletePPC}
          session={session}
          isLoading={isLoading}
        />
      </div>
    </section>
  );
}
