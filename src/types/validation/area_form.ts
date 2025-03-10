import { z } from "zod";

export const areaSchema = z.object({
  area: z
    .string({ message: "Selecione uma área" })
    .uuid({ message: "Formato inválido" }),
});

export type AreaValues = z.infer<typeof areaSchema>;
