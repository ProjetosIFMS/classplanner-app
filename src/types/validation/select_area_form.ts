import { z } from "zod";

export const selectAreaSchema = z.object({
  area_id: z
    .string({ message: "Selecione uma área" })
    .uuid({ message: "Formato inválido" }),
});

export type SelectAreaValues = z.infer<typeof selectAreaSchema>;
