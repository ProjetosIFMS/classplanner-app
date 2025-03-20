"use client";
import { Button, buttonVariants } from "@/app/_components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/app/_components/ui/dialog";
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
import { useRouter } from "next/navigation";
import {
  MdDelete,
  MdEdit,
  MdKeyboardReturn,
  MdOutlineGroups,
} from "react-icons/md";
import { AreaForm } from "./create-area-form";
import { Users, BookOpen } from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/app/_components/ui/card";
import { Area } from "@/types/area";
import { useState } from "react";

type AreaCardProps = {
  data: Area;
};

export const AreaCards = ({ data }: AreaCardProps) => {
  const router = useRouter();
  const [open, setOpen] = useState(false);

  const handleRedirect = () =>
    router.push("/coordinator/relocation-professors");

  return (
    <Card
      key={data.id}
      className="w-[calc(100vw-2rem)] sm:w-auto mx-auto sm:mx-0 overflow-hidden transition-all duration-300 hover:shadow-lg group bg-white/50 backdrop-blur supports-[backdrop-filter]:bg-white/50"
    >
      <CardHeader className="space-y-4 p-4 sm:p-6">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg sm:text-xl line-clamp-2">
            {data.name}
          </CardTitle>

          <div className="flex gap-2 shrink-0">
            <Dialog open={open} onOpenChange={setOpen}>
              <DialogTrigger asChild>
                <Button
                  variant="outline"
                  size="icon"
                  className="h-8 w-8 sm:h-10 sm:w-10 text-blue-600 hover:bg-blue-50 transition-colors"
                >
                  <MdEdit className="h-4 w-4 sm:h-5 sm:w-5" />
                </Button>
              </DialogTrigger>
              <DialogContent aria-describedby={undefined}>
                <DialogHeader>
                  <DialogTitle></DialogTitle>
                </DialogHeader>
                <AreaForm
                  onCompleteUpdate={() => setOpen(false)}
                  isUpdate
                  description="Altere o nome do eixo"
                  title={`Edição de eixo - ${data.name}`}
                  data={data}
                />
              </DialogContent>
            </Dialog>
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button
                  variant="outline"
                  size="icon"
                  className="h-8 w-8 sm:h-10 sm:w-10 text-red-600 hover:bg-red-50 transition-colors"
                >
                  <MdDelete className="h-4 w-4 sm:h-5 sm:w-5" />
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent className="w-full max-w-md sm:max-w-lg">
                <AlertDialogHeader>
                  <AlertDialogTitle>
                    Essa ação não pode ser realizada!
                  </AlertDialogTitle>
                  <AlertDialogDescription>
                    Para que você possa excluir esta área você deve realocar os
                    professores alocados a ela. Deseja realocar antes de
                    excluir?
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogAction
                    className={buttonVariants({
                      variant: "outline",
                      className: "text-black",
                    })}
                    onClick={handleRedirect}
                  >
                    Realocar <MdOutlineGroups className="ml-2" />
                  </AlertDialogAction>
                  <AlertDialogCancel
                    className={buttonVariants({
                      variant: "default",
                      className: "hover:text-white",
                    })}
                  >
                    Voltar <MdKeyboardReturn className="ml-2" />
                  </AlertDialogCancel>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-3 p-4 sm:p-6">
        <div className="flex items-center text-gray-600 text-sm sm:text-base">
          <Users className="h-4 w-4 sm:h-5 sm:w-5 mr-2 flex-shrink-0" />
          <span className="truncate">Total de professores: </span>
        </div>
        <div className="flex items-center text-gray-600 text-sm sm:text-base">
          <BookOpen className="h-4 w-4 sm:h-5 sm:w-5 mr-2 flex-shrink-0" />
          <span className="truncate">Disciplinas: </span>
        </div>
      </CardContent>
    </Card>
  );
};
