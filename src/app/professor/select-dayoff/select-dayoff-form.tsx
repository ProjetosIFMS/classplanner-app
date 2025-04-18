"use client";

import { useAuth } from "@/app/_components/auth/AuthContext";
import { Button } from "@/app/_components/ui/button";
import { Checkbox } from "@/app/_components/ui/checkbox";
import { Combobox } from "@/app/_components/ui/combobox";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/app/_components/ui/form";
import { FormCard } from "@/app/_components/ui/form-card";
import { Label } from "@/app/_components/ui/label";
import { MessageBox } from "@/app/_components/ui/messageBox";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/app/_components/ui/popover";
import { Textarea } from "@/app/_components/ui/textarea";
import { usePostDayOffSelection } from "@/hooks/react-query/day-off";
import {
  ClassFrequencyValues,
  DayValues,
  selectDayOffSchema,
  SelectDayOffValues,
  TimeScheduleValues,
} from "@/types/validation/select-day-off_form";
import { AlertCircle } from "lucide-react";
import { useState } from "react";
import { SubmitHandler } from "react-hook-form";
import { toast } from "sonner";
import { getEnglishWeekday } from "@/types/validation/select-day-off_form";

export const SelectDayOffForm = () => {
  const [showPrepDay, setShowPrepDay] = useState(false);
  const [showSpecificRequest, setShowSpecificRequest] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const { session } = useAuth();
  const postDayOffSelection = usePostDayOffSelection(session);
  const defaultValues: SelectDayOffValues = {
    weekday: undefined,
    reason: "",
    frequency: null,
    schedule: null,
  };

  const onSubmitForm: SubmitHandler<SelectDayOffValues> = async (formData) => {
    formData.weekday = getEnglishWeekday(
      formData.weekday as
        | "Segunda-Feira"
        | "Terça-Feira"
        | "Quarta-Feira"
        | "Quinta-Feira"
        | "Sexta-Feira"
        | undefined
    );
    try {
      postDayOffSelection.mutate(formData, {
        onSuccess: () => {
          setShowMessage(true);
          toast.success("Solicitação de dia de preparação feita com sucesso.");
        },
      });
    } catch {
      toast.error("Erro ao fazer a solicitação.");
    }
  };

  return (
    <>
      <FormCard<SelectDayOffValues>
        schema={selectDayOffSchema}
        defaultValues={defaultValues}
        title="Selecione um dia da semana"
        description="Indique um dia de sua preferência em que gostaria que aulas não fossem alocadas."
        width="md"
        onSubmit={onSubmitForm}
        headerExtras={
          <Popover>
            <PopoverTrigger asChild className="relative">
              <AlertCircle className="text-gray-500 hover:text-yellow-500 transition-colors cursor-pointer size-6" />
            </PopoverTrigger>
            <PopoverContent className="w-80 p-4 text-sm">
              <p>
                <b>Formulário de disponibilidade</b> em que se indica um dia de
                preparação, tipo de horário de aula e observações referente a
                frequência de aulas.
              </p>
            </PopoverContent>
          </Popover>
        }
      >
        {(form) => (
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
                        <Label className="text-base">
                          Motivo da solicitação
                        </Label>
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
                    <FormLabel className="text-base">
                      Horários de aula
                    </FormLabel>
                    <FormControl>
                      <Combobox
                        items={TimeScheduleValues.map((val) => ({
                          value: val,
                          label: val,
                        }))}
                        onSelect={field.onChange}
                        value={field.value || undefined}
                        disableSearch
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="frequency"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-base">
                      Frequência de aula
                    </FormLabel>
                    <FormControl>
                      <Combobox
                        items={ClassFrequencyValues.map((val) => ({
                          value: val,
                          label: val,
                        }))}
                        onSelect={field.onChange}
                        value={field.value || undefined}
                        disableSearch
                      />
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
        )}
      </FormCard>
      <div>
        <MessageBox
          description="Solicitação de dia de preparação feita com sucesso."
          title="Dia de preparação"
          redirectPath="/professor/dashboard"
          state={showMessage}
          onClose={() => setShowMessage(false)}
        />
      </div>
    </>
  );
};
