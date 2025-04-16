import { z } from "zod";

export const professorInterestsSelectionSchema = z.object({
  disciplines_ids: z.array(z.string().uuid()),
});

export type ProfessorInterestsSelectionValues = z.infer<
  typeof professorInterestsSelectionSchema
>;
