"use client";

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
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/app/_components/ui/popover";
import { Textarea } from "@/app/_components/ui/textarea";
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

export const SelectDayOffForm = () => {
  const [showPrepDay, setShowPrepDay] = useState(false);
  const [showSpecificRequest, setShowSpecificRequest] = useState(false);
  const defaultValues: SelectDayOffValues = {
    preparationDay: undefined,
    specificRequest: "",
    classFrequency: null,
    timeSchedule: null,
  };

  const onSubmitForm: SubmitHandler<SelectDayOffValues> = async (formData) => {
    console.log(formData);
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
              name="preparationDay"
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
              name="specificRequest"
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
                name="timeSchedule"
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
                name="classFrequency"
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

            {(!!(
              form.formState.errors.specificRequest ||
              form.formState.errors.preparationDay
            ) ||
              form.formState.errors.classFrequency ||
              form.formState.errors.timeSchedule) && (
              <div
                className=" text-red-500 py-2  text-center border-b border-b-red-400 text-sm relative"
                role="alert"
              >
                <span>{form.formState.errors.specificRequest?.message}</span>
                <span>{form.formState.errors.classFrequency?.message}</span>
              </div>
            )}
          </div>
        )}
      </FormCard>
      <div></div>
    </>
  );
};
