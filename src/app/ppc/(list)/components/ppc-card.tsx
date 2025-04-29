"use client";
import { validate as isUUID } from "uuid";
import ClipLoader from "react-spinners/ClipLoader";

import { Button } from "@/app/_components/ui/button";
import { Card } from "@/app/_components/ui/card";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/app/_components/ui/accordion";

import { PPC } from "@/types/ppc";
import { memo } from "react";
import { MdDescription, MdAccessTime } from "react-icons/md";
import { UpdatePPCmodalForm } from "@/app/ppc/(list)/components/update-ppc-modal-form";
import { DeletePPCmodal } from "@/app/ppc/(list)/components/delete-ppc-modal";
import { Session } from "@/types/session";
import { useAuth } from "@/app/_components/auth/AuthContext";
import { Role } from "@/types/user";

interface PPCcardProps {
  ppc: PPC;
  index: number;
  session: Session;
  isLoading?: boolean;
}

export const PPCCard = memo(
  ({ ppc, index, session, isLoading = false }: PPCcardProps) => {
    const { user } = useAuth();
    return (
      <Card key={ppc.id} className="overflow-hidden">
        <Accordion type="single" collapsible defaultValue={`item-${index}`}>
          <AccordionItem value={`item-${index}`} className="border-b-0">
            <AccordionTrigger className="px-4 py-3 font-semibold hover:no-underline">
              <div className="flex justify-between items-center  gap-4">
                <span>PPC {ppc.year}</span>

                {ppc.status ? (
                  <p className="bg-green-50 text-green-700 border-green-200">
                    Ativo
                  </p>
                ) : (
                  <p className="bg-green-50 text-red-700 border-red-400">
                    Inativo
                  </p>
                )}
              </div>
            </AccordionTrigger>
            <AccordionContent className="px-4 pb-4">
              {isLoading || !isUUID(ppc.id) ? (
                <div className="flex justify-center items-center">
                  <ClipLoader size={64} />
                </div>
              ) : (
                <div className="flex flex-col gap-4">
                  <div className="flex flex-col gap-4 mt-2">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <MdAccessTime size={16} />
                      <span>Última modificação: </span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <MdAccessTime size={16} />
                      <span>Data de inserção: </span>
                    </div>
                  </div>

                  <div className="flex justify-end gap-2">
                    <a target="_blank" href={ppc.documentUrl ?? "#"}>
                      <Button className="flex items-center gap-2 w-fit">
                        <MdDescription />
                        Documento
                      </Button>
                    </a>

                    <div>
                      {user?.role !== Role.PROFESSOR && (
                        <>
                          <UpdatePPCmodalForm data={ppc} session={session} />
                          <DeletePPCmodal data={ppc} session={session} />
                        </>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </Card>
    );
  }
);

PPCCard.displayName = "PPCCard";
