import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { AlertCircle } from "lucide-react";
import { Plus } from "lucide-react";
import ClipLoader from "react-spinners/ClipLoader";

import { Button } from "@/app/_components/ui/button";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
} from "@/app/_components/ui/form";
import { Checkbox } from "@/app/_components/ui/checkbox";
import { Label } from "@/app/_components/ui/label";
import { Textarea } from "@/app/_components/ui/textarea";

import { CreateDialogForm } from "@/app/_components/dialogs/create-dialog-form";
import { UpdateDialogForm } from "@/app/_components/dialogs/update-dialog-form";
import { Session } from "@/types/session";
import {
  usePatchMyDayoff,
  usePostDayOffSelection,
} from "@/hooks/react-query/dayoff";
import {
  ClassFrequencyValues,
  DayValues,
  getEnglishWeekday,
  selectDayOffSchema,
  SelectDayOffValues,
  TimeScheduleValues,
} from "@/types/validation/select-day-off_form";
import { Dayoff } from "@/types/dayoff";
import { getPortugueseWeekday } from "@/types/validation/select-day-off_form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/app/_components/ui/select";

interface SelectDayOffModalFormProps {
  session: Session;
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  data?: Dayoff;
  isUpdate?: boolean;
  isLoading?: boolean;
}

export function SelectDayoffModalForm({
  session,
  isOpen,
  setIsOpen,
  data,
  isUpdate = false,
  isLoading = false,
}: SelectDayOffModalFormProps) {
  const [showPrepDay, setShowPrepDay] = React.useState<boolean>(false);
  const [showSpecificRequest, setShowSpecificRequest] =
    React.useState<boolean>(false);

  const postMyDayoff = usePostDayOffSelection(session);
  const patchMyDayoff = usePatchMyDayoff(session);

  const defaultValues = React.useMemo(
    () => ({
      frequency:
        (data?.frequency as "3 aulas contínuas" | "Aulas separadas") || null,
      reason: data?.reason || "",
      schedule: (data?.schedule as "Contínuos" | "Espaçados") || null,
      weekday: data?.weekday ? getPortugueseWeekday(data.weekday) : "",
    }),
    [data]
  );

  const form = useForm<SelectDayOffValues>({
    resolver: zodResolver(selectDayOffSchema),
    defaultValues,
  });

  React.useEffect(() => {
    if (data) {
      if (data.weekday) {
        setShowPrepDay(true);
        setShowSpecificRequest(false);
      }

      if (data.reason) {
        setShowSpecificRequest(true);
        setShowPrepDay(false);
      }
      form.reset({
        frequency: data.frequency || undefined,
        reason: data.reason || "",
        schedule: data.schedule || undefined,
        weekday: data.weekday ? getPortugueseWeekday(data.weekday) : "",
      });
    }
  }, [data, form]);

  function onSubmit(formData: SelectDayOffValues) {
    formData.weekday = getEnglishWeekday(
      formData.weekday as
        | "Segunda-Feira"
        | "Terça-Feira"
        | "Quarta-Feira"
        | "Quinta-Feira"
        | "Sexta-Feira"
        | undefined
    );

    if (isUpdate && data?.id) {
      patchMyDayoff.mutate(formData, {
        onSuccess: () => {
          setIsOpen(false);
        },
      });
    } else {
      postMyDayoff.mutate(formData, {
        onSuccess: () => {
          setIsOpen(false);
        },
      });
    }
  }

  function RenderFormFields() {
    return (
      <div className="space-y-8">
        <FormField
          control={form.control}
          name="weekday"
          render={({ field }) => (
            <FormItem>
              <div className="flex items-center space-x-3">
                <Checkbox
                  id="prep-day-checkbox"
                  className="rounded-sm"
                  checked={showPrepDay}
                  onCheckedChange={(checked) => {
                    setShowPrepDay(!!checked);
                    setShowSpecificRequest(false);
                    form.setValue("reason", "");
                  }}
                />
                <FormLabel
                  htmlFor="prep-day-checkbox"
                  className="text-sm font-medium text-gray-700 cursor-pointer"
                >
                  Escolher dia de preparação
                </FormLabel>
              </div>
              <FormControl>
                {showPrepDay && (
                  <div className="grid grid-cols-5 gap-5 mt-4">
                    {DayValues.map((day) => (
                      <Button
                        key={day}
                        type="button"
                        {...field}
                        onClick={() => field.onChange(day)}
                        className={`
                                  h-14 w-14 rounded-full 
                                  ${
                                    field.value === day
                                      ? "bg-gray-500 text-white"
                                      : "bg-gray-100 text-gray-700"
                                  }
                                  hover:bg-gray-300 
                                  transition-colors 
                                  flex items-center justify-center
                                `}
                      >
                        {day.slice(0, 3)}
                      </Button>
                    ))}
                  </div>
                )}
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="reason"
          render={({ field }) => (
            <FormItem>
              <div className="flex items-center space-x-3">
                <Checkbox
                  id="specific-request-checkbox"
                  className="rounded-sm"
                  checked={showSpecificRequest}
                  onCheckedChange={(checked) => {
                    setShowSpecificRequest(!!checked);
                    setShowPrepDay(false);
                    form.setValue("weekday", undefined);
                  }}
                />
                <FormLabel
                  htmlFor="specific-request-checkbox"
                  className="text-sm font-medium text-gray-700 cursor-pointer"
                >
                  Fazer uma solicitação especifica
                </FormLabel>
              </div>
              <FormControl>
                {showSpecificRequest && (
                  <div className="space-y-2 mt-4">
                    <Label className="text-base">Motivo da solicitação</Label>
                    <Textarea
                      className="h-24 resize-none"
                      placeholder="Descreva a solicitação..."
                      {...field}
                      value={field.value}
                      onChange={field.onChange}
                    />
                  </div>
                )}
              </FormControl>
            </FormItem>
          )}
        />

        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="schedule"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-base">Horários de aula</FormLabel>
                <FormControl>
                  <Select
                    onValueChange={field.onChange}
                    value={field.value || undefined}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione uma opção" />
                    </SelectTrigger>
                    <SelectContent>
                      {TimeScheduleValues.map((val) => (
                        <SelectItem key={val} value={val}>
                          {val}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="frequency"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-base">Frequência de aula</FormLabel>
                <FormControl>
                  <Select
                    onValueChange={field.onChange}
                    value={field.value || undefined}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione uma opção" />
                    </SelectTrigger>
                    <SelectContent>
                      {ClassFrequencyValues.map((val) => (
                        <SelectItem key={val} value={val}>
                          {val}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormControl>
              </FormItem>
            )}
          />
        </div>

        {Object.keys(form.formState.errors).length > 0 && (
          <div
            className="bg-red-50 border border-red-200 rounded-md p-3 text-sm text-red-600"
            role="alert"
          >
            <div className="flex items-center gap-2 mb-2 font-medium">
              <AlertCircle className="h-4 w-4" />
              <span>Solicitação inválida, corrija os seguintes erros:</span>
            </div>
            <ul className="space-y-1 pl-6 list-disc">
              {form.formState.errors.weekday?.message && (
                <li>{form.formState.errors.weekday.message}</li>
              )}
              {form.formState.errors.reason?.message && (
                <li>{form.formState.errors.reason.message}</li>
              )}
              {form.formState.errors.frequency?.message && (
                <li>{form.formState.errors.frequency.message}</li>
              )}
              {form.formState.errors.schedule?.message && (
                <li>{form.formState.errors.schedule.message}</li>
              )}
            </ul>
          </div>
        )}
      </div>
    );
  }

  if (isLoading) {
    return (
      <Button disabled>
        <ClipLoader size={20} color="#FFFFFF" />
      </Button>
    );
  }

  if (isUpdate) {
    return (
      <UpdateDialogForm
        form={form}
        title="Editar solicitação de dia de preparação"
        description=""
        onSubmit={onSubmit}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        trigger={<Button>Editar solicitação de dia de preparação</Button>}
        isLoading={patchMyDayoff.isPending}
      >
        <button type="button" onClick={() => console.log(form.getValues())}>
          abc
        </button>
        <RenderFormFields />
      </UpdateDialogForm>
    );
  }

  return (
    <CreateDialogForm
      form={form}
      title="Criar solicitação de dia de preparação"
      description=""
      onSubmit={onSubmit}
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      trigger={
        <Button>
          <Plus className="h-4 w-4" />
          Criar solicitação de dia de preparação
        </Button>
      }
      isLoading={patchMyDayoff.isPending}
    >
      <RenderFormFields />
    </CreateDialogForm>
  );
}
