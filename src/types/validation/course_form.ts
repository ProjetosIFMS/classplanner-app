import { z } from "zod";

export const courseSchema = z.object({
  name: z
    .string({ message: "Insira o nome do curso" })
    .min(10, "O nome do curso deve conter mais que 10 caracteres")
    .max(40, "O nome do curso deve conter menos que 40 caracteres"),
  quantity_semester: z.coerce
    .number({ message: "Necessário inserir um número" })
    .min(1, "Número de semestres deve ser maior que 1")
    .max(12, "Número de semestres não pode ser maior que 12"),
  workload: z.coerce
    .number({ message: "Necessário inserir um número" })
    .min(1, "Carga horária deve ser superior que 1")
    .max(10000, "Carga horária deve ser menor que 10000"),
});

export type CourseValues = z.infer<typeof courseSchema>;
