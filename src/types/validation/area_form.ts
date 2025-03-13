import { z } from "zod";

export const areaSchema = z.object({
  name: z
    .string({ message: "Necessário inserir o nome da área" })
    .min(1, "O nome da área deve conter mais que 1 caracter")
    .max(40, "O nome da área deve conter menos que 40 caracteres"),
});

export type AreaValues = z.infer<typeof areaSchema>;
