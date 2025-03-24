"use client";

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
import { Button } from "@/app/_components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/app/_components/ui/card";
import { Checkbox } from "@/app/_components/ui/checkbox";
import { Combobox } from "@/app/_components/ui/combobox";
import { Label } from "@/app/_components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/app/_components/ui/popover";
import { Textarea } from "@/app/_components/ui/textarea";
import { AlertCircle, Check } from "lucide-react";
import { useState } from "react";

export const SelectDayOffForm = () => {
  const [showPrepDay, setShowPrepDay] = useState(false);
  const [showSpecificRequest, setShowSpecificRequest] = useState(false);

  return (
    <Card className="max-w-[646px] w-full">
      <CardHeader>
        <CardTitle className="font-semibold text-base flex items-center justify-start gap-2">
          Selecione um dia da semana{" "}
          <Popover>
            <PopoverTrigger asChild>
              <AlertCircle className="hover:text-yellow-300 transition-all rotate-180 cursor-pointer" />
            </PopoverTrigger>
            <PopoverContent className="w-80 p-4">
              <p className="text-sm">
                <b>Formulário de disponibilidade</b> em que se indica um dia de
                preparação, tipo de horário de aula e observações referente a
                frequência de aulas.
              </p>
            </PopoverContent>
          </Popover>{" "}
        </CardTitle>
        <CardDescription>
          Indique um dia de sua preferência em que gostaria que aulas
          <span className="font-semibold pl-1">não</span> fossem alocadas.
        </CardDescription>
      </CardHeader>
      <CardContent className="px-[58px]">
        <div className="flex flex-row gap-2 justify-start items-center">
          <Checkbox
            id="terms"
            className="rounded-none"
            checked={showPrepDay}
            onCheckedChange={(checked) => {
              setShowPrepDay(!!checked);
              setShowSpecificRequest(false);
            }}
          />
          <Label
            htmlFor="terms"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-gray-700"
          >
            Escolher dia de preparação
          </Label>
        </div>
        {showPrepDay && (
          <div className="flex flex-row gap-2 justify-between items-center my-5">
            {["Seg", "Ter", "Qua", "Qui", "Sex"].map((day) => (
              <div
                key={day}
                className="flex justify-center items-center bg-[#F5F5F5] h-16 w-16 rounded-full shadow-md hover:shadow-lg transition-shadow cursor-pointer"
              >
                <p className="text-center cursor-pointer">{day}</p>
              </div>
            ))}
          </div>
        )}
        <div className="flex flex-row gap-2 justify-start items-center mt-9">
          <Checkbox
            id="terms"
            className="rounded-none"
            checked={showSpecificRequest}
            onCheckedChange={(checked) => {
              setShowSpecificRequest(!!checked);
              setShowPrepDay(false);
            }}
          />
          <Label
            htmlFor="terms"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-gray-700"
          >
            Fazer uma solicitação especifica
          </Label>
        </div>
        {showSpecificRequest && (
          <div className="mt-4 flex flex-col gap-2">
            <Label className="text-base">Motivo da solicitação</Label>
            <Textarea
              className="h-24 resize-none"
              placeholder="Descreva a solicitação..."
            />
          </div>
        )}
        <div className="mt-8 flex justify-between w-full flex-row gap-2">
          <div className="flex flex-col gap-2">
            <Label className="text-base">Hórarios de aula</Label>
            <Combobox disableSearch />
          </div>
          <div className="flex flex-col gap-2">
            <Label className="text-base ">Frequência de aula</Label>
            <Combobox disableSearch />
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-end mx-[41px] mt-5 px-0">
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button
              variant={"default"}
              className="flex gap-1 justify-start items-center"
            >
              Salvar <Check />
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>
                Gostaria de rever sua seleção?
              </AlertDialogTitle>
              <AlertDialogDescription>
                Sua seleção influencia diretamente em como seus horários são
                organizados.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Rever</AlertDialogCancel>
              <AlertDialogAction>Continuar</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </CardFooter>
    </Card>
  );
};
