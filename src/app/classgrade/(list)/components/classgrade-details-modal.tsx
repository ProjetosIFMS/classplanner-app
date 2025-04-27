import React from "react";

import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogHeader,
  DialogClose,
} from "@/app/_components/ui/dialog";
import { Button } from "@/app/_components/ui/button";
import {
  Card,
  CardContent,
  CardTitle,
  CardHeader,
} from "@/app/_components/ui/card";

import { Classgrade } from "@/types/classgrade";

interface ClassgradeDetailsModalProps {
  classgrade: Classgrade;
}

export function ClassgradeDetailsModal({
  classgrade,
}: ClassgradeDetailsModalProps) {
  return (
    <Dialog>
      <DialogTrigger asChild onClick={() => console.log(classgrade)}>
        <Button>Ver detalhes</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Disciplinas</DialogTitle>
        </DialogHeader>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {classgrade.ClassGradeDiscipline?.length > 0 ? (
            classgrade.ClassGradeDiscipline?.map((classGradeDiscipline) => {
              return (
                <Card key={classGradeDiscipline.Discipline.id} className="">
                  <CardContent>
                    <CardHeader className="">
                      <CardTitle>
                        {classGradeDiscipline.Discipline.name}
                      </CardTitle>
                    </CardHeader>
                    <p title="Carga horária">
                      C.H.: {classGradeDiscipline.Discipline.theoreticalHours}
                    </p>
                  </CardContent>
                </Card>
              );
            })
          ) : (
            <p className="col-span-1 sm:col-span-2 lg:col-span-3 text-center">
              Não há disciplinas para esta turma.
            </p>
          )}
        </div>

        <DialogClose asChild>
          <Button>Fechar</Button>
        </DialogClose>
      </DialogContent>
    </Dialog>
  );
}
