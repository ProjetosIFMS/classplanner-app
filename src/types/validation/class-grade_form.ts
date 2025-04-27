import { isAfter, isSameMonth } from "date-fns";
import { z } from "zod";

const classgradeDisciplineSchema = z.object({
  discipline_id: z.string({ message: "Inválida seleção de disciplina" }).uuid(),
  modalities_ids: z.string().uuid().array(),
});

const classgradeDisciplineArray = z
  .array(classgradeDisciplineSchema)
  .min(
    1,
    "Necessário a seleção de no mínimo uma disciplina para a criação de turma"
  );

export const classgradeSchema = z.object({
  period: z
    .object({
      from: z.date().optional(),
      to: z.date().optional(),
    })
    .refine(
      (data) => {
        if (data.from && data.to) {
          return isAfter(data.to, data.from) || isSameMonth(data.to, data.from);
        }
        return true;
      },
      {
        message: "End date must be after or the same as start date",
        path: ["to"],
      }
    ),
  course_id: z.string({ message: "Selecione um curso válido" }).uuid(),
  semester: z.number({ message: "Insira um semestre válido" }),
  year: z.coerce.number({ message: "Insira um ano válido" }),
  pedagogical_project_id: z.string({
    message: "Insira um Projeto Pedagógico válido",
  }),
  disciplines: classgradeDisciplineArray,
  period_id: z.string().uuid().optional(),
});

export type ClassgradeValues = z.infer<typeof classgradeSchema>;
