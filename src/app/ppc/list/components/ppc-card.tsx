"use client";
import { Button } from "@/app/_components/ui/button";
import { Card } from "@/app/_components/ui/card";
import {
  DialogHeader,
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
} from "@/app/_components/ui/dialog";
import { PPC } from "@/types/ppc";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/app/_components/ui/accordion";
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/app/_components/ui/alert-dialog";
import { memo } from "react";
import { MdDescription, MdAccessTime, MdEdit, MdDelete } from "react-icons/md";
import { PPCForm } from "../../Ppc-form";

export const PPCCard = memo(
  ({
    ppc,
    index,
    isDeleting,
    feedback,
    handleDeleteClick,
  }: {
    ppc: PPC;
    index: number;
    isDeleting: boolean;
    feedback?: { message: string; isError: boolean };
    handleDeleteClick: (id: string) => void;
    session: string | undefined;
  }) => {
    return (
      <Card key={ppc.id} className="overflow-hidden">
        <Accordion type="single" collapsible defaultValue={`item-${index}`}>
          <AccordionItem value={`item-${index}`} className="border-b-0">
            <AccordionTrigger className="px-4 py-3 font-semibold hover:no-underline">
              <div className="flex items-center gap-2">
                <span>PPC {ppc.year}</span>
                {ppc.status ? (
                  <p className="bg-green-50 text-green-700 border-green-200">
                    Ativo
                  </p>
                ) : (
                  <p className="bg-green-50 text-red-700 border-red-400">
                    Desativado
                  </p>
                )}
              </div>
            </AccordionTrigger>
            <AccordionContent className="px-4 pb-4">
              <div className="flex flex-col gap-4">
                <Button
                  variant="outline"
                  className="flex items-center gap-2 w-fit"
                >
                  <MdDescription className="text-primary" />
                  Visualizar documento
                </Button>

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

                {feedback && (
                  <div
                    className={`text-sm p-2 rounded ${feedback.isError ? "bg-red-50 text-red-600" : "bg-green-50 text-green-600"}`}
                  >
                    {feedback.message}
                  </div>
                )}

                <div className="flex justify-end gap-2 mt-2">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button
                        variant="outline"
                        size="icon"
                        className="text-blue-600"
                      >
                        <MdEdit size={18} />
                      </Button>
                    </DialogTrigger>
                    <DialogContent
                      aria-describedby={undefined}
                      className="sm:max-w-[500px] sm:max-h-[850px]"
                    >
                      <DialogHeader>
                        <DialogTitle>Editar PPC</DialogTitle>
                      </DialogHeader>
                      <PPCForm isUpdate data={ppc} />
                    </DialogContent>
                  </Dialog>

                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button
                        variant="outline"
                        size="icon"
                        className="text-red-600"
                      >
                        <MdDelete size={18} />
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent className="sm:max-w-[500px]">
                      <AlertDialogHeader>
                        <AlertDialogTitle>Você tem certeza?</AlertDialogTitle>
                        <AlertDialogDescription>
                          Essa ação não pode ser desfeita. Deseja deletar mesmo
                          assim o PPC {ppc.year}?
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancelar</AlertDialogCancel>
                        <AlertDialogAction
                          onClick={() => handleDeleteClick(ppc.id)}
                          disabled={isDeleting}
                          className="bg-red-600 hover:bg-red-700"
                        >
                          {isDeleting ? (
                            <>
                              <span className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-background border-t-transparent" />
                              Excluindo...
                            </>
                          ) : (
                            "Excluir"
                          )}
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </Card>
    );
  },
);

PPCCard.displayName = "PPCCard";
