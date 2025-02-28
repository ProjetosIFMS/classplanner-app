import { z } from "zod";

export const ppcSchema = z.object({
  PPCYear: z.coerce
    .number({
      message: "O ano de criação é necessário",
      invalid_type_error: "Campo deve ser composto de números",
    })
    .min(2000, { message: "O ano de criação deve ser maior que o de 2000" }),
  semesterQuantity: z.coerce
    .number({ message: "A quantidade de semestres é necessária" })
    .min(1, "A quantidade de semestres não pode ser menor que 1")
    .max(12, "A quantidade de semestres deve ser menor que 12"),
  hasTCC: z.coerce.string().default("true"),
  extensionCourses: z.coerce
    .number()
    .min(0, "Número de aulas de extensão não pode ser menor que 0")
    .max(5, "Número de aulas de extensão não pode ser maior que 5")
    .optional()
    .or(z.literal(0)),
  workload: z.coerce
    .number({
      message: "A carga horária é necessária",
      invalid_type_error: "Carga horária deve ser um número",
    })
    .min(1000, "A carga horária não pode ser menor que 1000")
    .max(4000, "A carga horária não pode ser maior que 4000"),
  additionalHours: z.coerce.number().optional().or(z.literal(0)),
  internshipHours: z.coerce.number().optional().or(z.literal(0)),
  description: z
    .string()
    .min(10, "A descrição deve conter mais que 10 caracteres")
    .optional()
    .or(z.literal("")),
});

export const areaSchema = z.object({
  area: z.string().min(1, "Por favor selecione uma opção."),
});

export type PPCSchema = z.infer<typeof ppcSchema>;
export type AreaSchema = z.infer<typeof areaSchema>;
