"use client";
import { PPC } from "@/types/ppc";
import { Card, CardContent, CardHeader } from "@/app/_components/ui/card";
import { LoadingCard } from "@/app/_components/ui/loading-card";
import { Button } from "@/app/_components/ui/button";
import { useState, useCallback } from "react";
import { PPCCard } from "./ppc-card";
import { Session } from "@/types/session";
import Link from "next/link";

type DeletePpcFunction = (session: Session, ppc_id: string) => Promise<boolean>;

interface ListCardPpcProps {
  data: PPC[];
  deletePpcFn: DeletePpcFunction;
  session: Session;
  isLoading?: boolean;
}

export const ListCardPpc = ({
  data,
  session,
  deletePpcFn,
  isLoading,
}: ListCardPpcProps) => {
  const [deletingItems, setDeletingItems] = useState<Record<string, boolean>>(
    {},
  );
  const [feedbackMessages, setFeedbackMessages] = useState<
    Record<string, { message: string; isError: boolean }>
  >({});

  const handleDelete = useCallback(
    async (ppcId: string) => {
      setDeletingItems((prev) => ({ ...prev, [ppcId]: true }));

      setFeedbackMessages((prev) => {
        const newMessages = { ...prev };
        delete newMessages[ppcId];
        return newMessages;
      });

      try {
        const success = await deletePpcFn(session, ppcId);

        if (!success) {
          setFeedbackMessages((prev) => ({
            ...prev,
            [ppcId]: {
              message: "Erro ao excluir. Tente novamente.",
              isError: true,
            },
          }));
        }
      } catch {
        setFeedbackMessages((prev) => ({
          ...prev,
          [ppcId]: {
            message: "Ocorreu um erro ao excluir.",
            isError: true,
          },
        }));
      } finally {
        setDeletingItems((prev) => {
          const newItems = { ...prev };
          delete newItems[ppcId];
          return newItems;
        });
      }
    },
    [deletePpcFn, session],
  );

  if (isLoading) return <LoadingCard size="lg" />;

  if (!data || data.length === 0) {
    return (
      <Card className="w-full">
        <CardContent className="flex flex-col items-center justify-center py-10">
          <p className="text-muted-foreground mb-4">Nenhum PPC encontrado</p>
          <Button asChild>
            <Link href={"/ppc/create"}>Adicionar PPC</Link>
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full">
      <CardHeader></CardHeader>
      <CardContent className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {data.map((ppc, index) => (
          <PPCCard
            key={ppc.id}
            ppc={ppc}
            index={index}
            isDeleting={!!deletingItems[ppc.id]}
            feedback={feedbackMessages[ppc.id]}
            handleDeleteClick={handleDelete}
            session={session}
          />
        ))}
      </CardContent>
    </Card>
  );
};
