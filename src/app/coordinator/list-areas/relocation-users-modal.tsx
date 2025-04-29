"use client";

import React, { useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/app/_components/ui/dialog";
import { Button } from "@/app/_components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/app/_components/ui/select";
import { Label } from "@/app/_components/ui/label";
import { Loader2 } from "lucide-react";
import { getAreaById } from "@/app/_actions/area/getAreaById";
import { useAuth } from "@/app/_components/auth/AuthContext";
import { Area } from "@/types/area";
import { getAreas } from "@/app/_actions/area/getAreas";
import { User } from "@/types/user";

interface RelocationUsersModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  areaId: string;
}

export const RelocationUsersModal = ({
  isOpen,
  onOpenChange,
  areaId,
}: RelocationUsersModalProps) => {
  const { session } = useAuth();

  const [isLoading, setIsLoading] = React.useState(false);
  const [area, setArea] = React.useState<Area>();
  const [areas, setAreas] = React.useState<Area[]>([]);
  const [selectedUsers, setSelectedUsers] = React.useState<{
    [userId: string]: string;
  }>({});

  useEffect(() => {
    getAreas(session).then((data) => {
      const filteredAreas = data.filter((area: Area) => area.id !== areaId);
      setAreas(filteredAreas);
    });

    getAreaById(session, areaId).then((data) => {
      setArea(data);
    });
  }, [areaId, session]);

  const handleRelocation = async () => {
    if (Object.values(selectedUsers).some((v) => !v)) return;

    setIsLoading(true);
    try {
      console.log("Realocando usuários:", selectedUsers);
      onOpenChange(false);
    } catch (error) {
      console.error("Erro ao realocar:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:min-w-[425px]">
        <DialogHeader>
          <DialogTitle>Realocar Professores</DialogTitle>
          <DialogDescription>
            Selecione a área para onde deseja realocar os professores.
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          {area?.User?.map((user: User) => (
            <div key={user.id} className="grid grid-cols-4 items-center gap-4">
              <Label className="col-span-1">{`${user.firstName} ${user.lastName}`}</Label>
              <Select
                value={user.id ? selectedUsers[user.id] || "" : ""}
                onValueChange={(value) =>
                  setSelectedUsers((prev) => ({
                    ...prev,
                    [String(user.id)]: value,
                  }))
                }
              >
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Selecione uma nova área" />
                </SelectTrigger>
                <SelectContent>
                  {areas.map((areaOption) => (
                    <SelectItem key={areaOption.id} value={areaOption.id}>
                      {areaOption.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          ))}
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancelar
          </Button>
          <Button
            onClick={handleRelocation}
            disabled={
              isLoading ||
              !Object.keys(selectedUsers).length ||
              Object.values(selectedUsers).some((v) => !v)
            }
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Realocando...
              </>
            ) : (
              "Confirmar Realocação"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
