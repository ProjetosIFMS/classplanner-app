import { z } from "zod";

export const ppcSchema = z.object({
  year: z.coerce
    .number({
      message: "É necessário",
      invalid_type_error: "Campo deve ser composto de números",
    })
    .min(2000, { message: "O ano de criação deve ser maior que o de 2000" }),
  hasTCC: z.coerce.boolean({ message: "É necessário" }).default(false),
  status: z.coerce.boolean({ message: "Necessário" }).default(true),
  extensionCourses: z.coerce
    .number()
    .min(0, "Total de aulas deve ser maior que 0")
    .or(z.literal(0)),
  workload: z.coerce
    .number({
      message: "É necessário",
      invalid_type_error: "Carga horária deve ser um número",
    })
    .min(1000, "Horas totais deve ser maior que 1000")
    .max(4000, "Horas totais deve ser maior que 4000"),
  complementaryHours: z.coerce
    .number()
    .min(0, "Total de horas deve ser menor que 0"),
  stageHours: z.coerce.number().min(0, "Total de horas deve ser menor que 0"),
  description: z
    .string()
    .min(10, "A descrição deve conter mais que 10 caracteres")
    .or(z.literal("")),
  course_id: z
    .string({ message: "Necessário selecionar um curso" })
    .uuid({ message: "Valor inválido" }),
});

export type PPCSchema = z.infer<typeof ppcSchema>;
