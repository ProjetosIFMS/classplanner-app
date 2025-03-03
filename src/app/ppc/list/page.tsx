"use client";
import { Header } from "@/app/_components/header";
import { Card, CardContent } from "@/app/_components/ui/card";
import { useEffect, useState } from "react";
import { deletePpc, getPpc } from "../actions";
import { useAuth } from "@/app/_components/auth/AuthContext";
import {
  Accordion,
  AccordionContent,
  AccordionTrigger,
} from "@/app/_components/ui/accordion";
import { AccordionItem } from "@radix-ui/react-accordion";
import { MdEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/app/_components/ui/dialog";
import { PPCForm } from "@/app/ppc/ppc-form";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/app/_components/ui/alert-dialog";
import { PPC } from "@/types/ppc";

export default function ListPpc() {
  const [ppc, setPpc] = useState<PPC[] | null>(null);
  const { session } = useAuth();

  useEffect(() => {
    const fetchPpc = async () => {
      try {
        const res = await getPpc(session);
        if (res) setPpc(res);
      } catch (err) {
        throw err;
      }
    };
    fetchPpc();
  }, [session]);

  const handleDeletePPC = async (
    session: string | undefined,
    ppc_id: string,
  ) => {
    await deletePpc(session, ppc_id);
  };

  return (
    <section className="flex flex-col items-center justify-center ">
      <Header />
      <h1 className="mt-8"></h1>
      <Card className="w-[900px]">
        <CardContent className="grid grid-flow-col grid-rows-2 gap-x-16 gap-y-5">
          {ppc &&
            ppc.map((ppc, key) => (
              <div key={key}>
                <Accordion collapsible type="single">
                  <AccordionItem value={`item-${key}`}>
                    <AccordionTrigger className="font-bold">
                      Projeto Pedagógico de curso {ppc.year}
                    </AccordionTrigger>
                    <AccordionContent className="flex flex-row mt-8 justify-between">
                      <div className="flex flex-col gap-2">
                        <p className="underline cursor-pointer">
                          Visualizar documento
                        </p>
                        <div>
                          <p className="text-xs text-muted-foreground">
                            Última Modificação:
                          </p>
                          <p className="text-xs text-muted-foreground">
                            data_modificacao
                          </p>
                        </div>
                      </div>
                      <div className="flex flex-col gap-1">
                        <div className="flex flex-row gap self-end gap-5">
                          <Dialog>
                            <DialogTrigger asChild>
                              <MdEdit
                                size={25}
                                color="#3A4F95"
                                className="cursor-pointer"
                              />
                            </DialogTrigger>
                            <DialogContent
                              aria-describedby={undefined}
                              className="sm:max-w-[500px] sm:max-h-[850px]"
                            >
                              <DialogHeader>
                                <DialogTitle></DialogTitle>
                              </DialogHeader>
                              <PPCForm
                                title="Editar PPC"
                                key={key}
                                data={ppc}
                              ></PPCForm>
                              <div className="grid gap-4 py-4"></div>
                            </DialogContent>
                          </Dialog>

                          <AlertDialog>
                            <AlertDialogTrigger>
                              <MdDelete
                                size={25}
                                color="#F96161"
                                className="cursor-pointer"
                              />
                            </AlertDialogTrigger>
                            <AlertDialogContent
                              aria-describedby={undefined}
                              className="sm:max-w-[500px]"
                            >
                              <AlertDialogHeader>
                                <AlertDialogTitle>
                                  Você tem certeza?
                                </AlertDialogTitle>
                                <AlertDialogDescription>
                                  Essa ação não pode ser desfeita. Deseja
                                  deletar mesmo assim o PPC {ppc.year}?
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel>Cancelar</AlertDialogCancel>
                                <AlertDialogAction
                                  onClick={() =>
                                    handleDeletePPC(session, ppc.id)
                                  }
                                >
                                  Deletar
                                </AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground">
                            Data de inserção:
                          </p>
                          <p className="text-xs text-muted-foreground">
                            data_insercao
                          </p>
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </div>
            ))}
        </CardContent>
      </Card>
    </section>
  );
}
