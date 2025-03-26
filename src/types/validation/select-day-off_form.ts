import { z } from "zod";

const PreparationDayEnum = z.enum(
  [
    "Segunda-Feira",
    "Terça-Feira",
    "Quarta-Feira",
    "Quinta-Feira",
    "Sexta-Feira",
  ],
  { message: "Selecione um dia" },
);

const TimeScheduleEnum = z.enum(["Contínuos", "Espaçados"], {
  message: "Selecione uma opção",
});

const ClassFrequencyEnum = z.enum(["3 aulas contínuas", "Aulas separadas"], {
  message: "Selecione uma opção",
});

export const selectDayOffSchema = z
  .object({
    preparationDay: PreparationDayEnum.optional(),
    specificRequest: z
      .string({ message: "Insira a sua solicitação" })
      .optional(),
    timeSchedule: TimeScheduleEnum.nullable().refine(
      (val) => val !== undefined,
      { message: "Selecione uma opção" },
    ),
    classFrequency: ClassFrequencyEnum.nullable().refine(
      (val) => val !== undefined,
      { message: "Selecione uma opção" },
    ),
  })
  .superRefine(
    (
      { specificRequest, preparationDay, classFrequency, timeSchedule },
      refinementContext,
    ) => {
      if (!specificRequest && !preparationDay) {
        refinementContext.addIssue({
          code: z.ZodIssueCode.custom,
          message:
            "Insira pelo menos o valor a uma opção para o dia de preparação.",
          path: ["specificRequest"],
        });
        refinementContext.addIssue({
          code: z.ZodIssueCode.custom,
          message:
            "Insira pelo menos o valor a uma opção para o dia de preparação.",
          path: ["preparationDay"],
        });
      } else if (
        (specificRequest || preparationDay) &&
        (!timeSchedule || !classFrequency)
      ) {
        refinementContext.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Selecione os horários de aula e a frequência",
          path: ["classFrequency"],
        });
        refinementContext.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Selecione os horários de aula e a frequência",
          path: ["timeSchedule"],
        });
      }
    },
  );

export type SelectDayOffValues = z.infer<typeof selectDayOffSchema>;

export const DayValues = Object.values(PreparationDayEnum.Values);
export const TimeScheduleValues = Object.values(TimeScheduleEnum.Values);
export const ClassFrequencyValues = Object.values(ClassFrequencyEnum.Values);
