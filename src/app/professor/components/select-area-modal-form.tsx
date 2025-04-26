import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  FormItem,
  FormField,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/app/_components/ui/form";
import {
  Select,
  SelectTrigger,
  SelectItem,
  SelectContent,
  SelectValue,
} from "@/app/_components/ui/select";
import { Button } from "@/app/_components/ui/button";

import { UpdateDialogForm } from "@/app/_components/dialogs/update-dialog-form";
import { usePatchSelectArea } from "@/hooks/react-query/professor/select-area";
import { Session } from "@/types/session";
import {
  SelectAreaValues,
  selectAreaSchema,
} from "@/types/validation/select_area_form";
import { useGetAllAreas } from "@/hooks/react-query/areas";

interface SelectAreaModalFormProps {
  session: Session;
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export function SelectAreaModalForm({
  session,
  isOpen,
  setIsOpen,
}: SelectAreaModalFormProps) {
  const getAreas = useGetAllAreas(session);
  const patchSelectArea = usePatchSelectArea(session);

  const form = useForm<SelectAreaValues>({
    resolver: zodResolver(selectAreaSchema),
  });

  function onSubmit(formData: SelectAreaValues) {
    patchSelectArea.mutate(formData.area_id, {
      onSuccess: () => {
        setIsOpen(false);
      },
    });
  }

  return (
    <UpdateDialogForm<SelectAreaValues>
      form={form}
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      title="Selecione seu eixo"
      description=""
      onSubmit={onSubmit}
      trigger={<Button>Alterar meu eixo</Button>}
      isLoading={patchSelectArea.isPending}
    >
      <FormField
        control={form.control}
        name="area_id"
        render={({ field }) => {
          return (
            <FormItem>
              <FormLabel className="font-bold">Eixo</FormLabel>
              <FormControl>
                <Select
                  name="area"
                  onValueChange={field.onChange}
                  required
                  value={field.value}
                >
                  <SelectTrigger {...field} id="area">
                    <SelectValue placeholder="Selecione" />
                  </SelectTrigger>
                  <SelectContent position="popper">
                    {getAreas.data?.map((area) => (
                      <SelectItem key={area.id} value={area.id}>
                        {area.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          );
        }}
      />
    </UpdateDialogForm>
  );
}
