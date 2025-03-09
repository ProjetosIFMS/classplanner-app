import { z } from "zod";

export const modalitySchema = z.object({
    name: z.string().min(1, "O nome da modalidade deve conter mais que 1 caracter"),

});

export type ModalitySchema = z.infer<typeof modalitySchema>;
