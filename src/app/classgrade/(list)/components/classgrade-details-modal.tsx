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
import { Classgrade } from "@/types/classgrade";
import { Eye } from "lucide-react"; // Add this import

interface ClassgradeDetailsModalProps {
  classgrade: Classgrade;
}

export function ClassgradeDetailsModal({
  classgrade,
}: ClassgradeDetailsModalProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          size="sm"
          className="text-white hover:text-gray-900 hover:bg-gray-100"
        >
          <Eye className="h-4 w-4 mr-2" />
          Detalhes
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-xl font-medium tracking-tight">
            Disciplinas da Turma
          </DialogTitle>
          <p className="text-sm text-gray-500 mt-1">
            Semestre {classgrade.semester} • {classgrade.year}
          </p>
        </DialogHeader>

        {classgrade.ClassGradeDiscipline?.length > 0 ? (
          <div className="mt-4 grid gap-3 grid-cols-1 sm:grid-cols-2">
            {classgrade.ClassGradeDiscipline.map((classGradeDiscipline) => (
              <div
                key={classGradeDiscipline.Discipline.id}
                className="p-3 border border-gray-100 rounded-md hover:border-gray-200 transition-colors"
              >
                <h3 className="font-medium text-gray-800 mb-1">
                  {classGradeDiscipline.Discipline.name}
                </h3>
                <div className="flex gap-4 text-sm text-gray-600">
                  <span>
                    {classGradeDiscipline.Discipline.theoreticalHours}h
                  </span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="py-12 flex items-center justify-center text-gray-400">
            Não há disciplinas para esta turma.
          </div>
        )}

        <DialogClose asChild>
          <Button variant="outline" size="sm" className="mt-4 ml-auto">
            Fechar
          </Button>
        </DialogClose>
      </DialogContent>
    </Dialog>
  );
}
