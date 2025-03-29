import { z } from "zod";

export const ppcSchema = z.object({
  year: z.coerce
    .number({
      message: "É necessário",
    })
    .min(2000, { message: "O ano de criação deve ser maior que o de 2000" }),
  hasTCC: z.coerce.boolean({ message: "É necessário" }),
  status: z.coerce.boolean({ message: "Necessário" }),
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
  document: z
    .custom<File>((file) => file instanceof File, {
      message: "Insira um arquivo",
    })
    .refine((file) => file.size <= 10 * 1024 * 1024, {
      message: "O arquivo deve ser menor ou igual que 10MB ",
    })
    .refine(
      (file) =>
        ["image/png", "image/jpeg", "application/pdf"].includes(file.type),
      {
        message: "Apenas extensões PNG, JPEG e PDF são permitidas",
      },
    )
    .optional(),
});

export type PPCValues = z.infer<typeof ppcSchema>;
