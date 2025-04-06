import { z } from "zod";

export const disciplineSchema = z.object({
  course_id: z
    .string({ message: "O curso é necessário" })
    .uuid({ message: "Valor inválido" }),
  name: z
    .string()
    .min(8, "O nome da disciplina deve conter mais que 8 caracteres"),
  code: z
    .string({ message: "Código da unidade curricular é necessário" })
    .min(4, "Deve conter mais que 4 caracteres"),
  pedagogical_project_id: z
    .string({ message: "Selecione um projeto pedagógico" })
    .uuid({ message: "Valor inválido" }),
  area_id: z
    .string({ message: "Selecione uma área" })
    .uuid({ message: "Valor inválido" }),
  semester: z.coerce
    .number()
    .min(1, " Número de semestres não pode ser menor que 1")
    .max(12, "Número de semestres não pode ser maior que 12")
    .optional(),
  practicalHours: z.coerce
    .number({ message: "Insira um número" })
    .min(0, "Total de horas deve ser maior que 0")
    .optional(),
  extensionHours: z.coerce
    .number({ message: "Insira um número" })
    .min(0, "Total de horas deve ser maior que 0")
    .optional(),
  theoreticalHours: z.coerce
    .number({ message: "Insira um número" })
    .min(0, "Total de horas deve ser maior que 0"),
});

export type DisciplineValues = z.infer<typeof disciplineSchema>;
