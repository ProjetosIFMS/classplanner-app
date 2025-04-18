import { z } from "zod";

import { WEEKDAY } from "@/types/weekday";

const WeekDayEnum = z.enum(Object.keys(WEEKDAY) as [string, ...string[]], {
  message: "Selecione um dia",
});

const TimeScheduleEnum = z.enum(["Contínuos", "Espaçados"], {
  message: "Selecione uma opção",
});

const ClassFrequencyEnum = z.enum(["3 aulas contínuas", "Aulas separadas"], {
  message: "Selecione uma opção",
});

export const selectDayOffSchema = z
  .object({
    weekday: WeekDayEnum.optional(),
    reason: z.string({ message: "Insira a sua solicitação" }).optional(),
    schedule: TimeScheduleEnum.nullable().refine((val) => val !== undefined, {
      message: "Selecione uma opção",
    }),
    frequency: ClassFrequencyEnum.nullable().refine(
      (val) => val !== undefined,
      { message: "Selecione uma opção" }
    ),
  })
  .superRefine(
    ({ reason, weekday, frequency, schedule }, refinementContext) => {
      if ((!reason || reason.trim() === "") && !weekday) {
        refinementContext.addIssue({
          code: z.ZodIssueCode.custom,
          message:
            "Selecione um dia da semana ou forneça uma solicitação específica.",
          path: ["weekday"],
        });
      }
      if (reason && reason.trim() !== "" && weekday) {
        refinementContext.addIssue({
          code: z.ZodIssueCode.custom,
          message:
            "Escolha apenas uma opção: dia da semana OU solicitação específica.",
          path: ["weekday"],
        });
        refinementContext.addIssue({
          code: z.ZodIssueCode.custom,
          message:
            "Escolha apenas uma opção: dia da semana OU solicitação específica.",
          path: ["reason"],
        });
      }

      if (reason && reason.trim() !== "" && reason.trim().length < 20) {
        refinementContext.addIssue({
          code: z.ZodIssueCode.custom,
          message:
            "A solicitação deve ser descritiva e conter no mínimo 20 caracteres.",
          path: ["reason"],
        });
      }

      if (!schedule) {
        refinementContext.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Selecione os horários de aula.",
          path: ["schedule"],
        });
      }
      if (!frequency) {
        refinementContext.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Selecione a frequência de aulas.",
          path: ["frequency"],
        });
      }
    }
  );

export type SelectDayOffValues = z.infer<typeof selectDayOffSchema>;

export const DayValues = Object.keys(WEEKDAY);
export const TimeScheduleValues = Object.values(TimeScheduleEnum.Values);
export const ClassFrequencyValues = Object.values(ClassFrequencyEnum.Values);

export const getEnglishWeekday = (
  portugueseDay: keyof typeof WEEKDAY | undefined
): (typeof WEEKDAY)[keyof typeof WEEKDAY] | undefined => {
  if (!portugueseDay) return undefined;
  return WEEKDAY[portugueseDay];
};
