import { z } from "zod";

export const professorDisciplineSelectionSchema = z.object({
  course_id: z.string().min(1, { message: "Selecione um curso" }),
  pedagogical_project_id: z.string().min(1, { message: "Selecione um PPC" }),
  disciplines: z.array(
    z.object({
      id: z.string().min(1, { message: "Selecione uma disciplina" }),
    }),
  ),
});

export type ProfessorDisciplineSelectionValues = z.infer<
  typeof professorDisciplineSelectionSchema
>;
