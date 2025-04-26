import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { Session } from "@/types/session";
import { getDisciplines } from "@/app/_actions/discipline/getDisciplines";
import { deleteDiscipline } from "@/app/_actions/discipline/deleteDiscipline";
import { DisciplineValues } from "@/types/validation/discipline_form";
import { createDiscipline } from "@/app/_actions/discipline/createDiscipline";
import { updateDiscipline } from "@/app/_actions/discipline/updateDiscipline";
import { Discipline } from "@/types/discipline";

export function useGetAllDisciplines(session: Session) {
  return useQuery({
    queryKey: ["GET", "disciplines"],
    queryFn: () => getDisciplines(session),
  });
}

export function usePostDiscipline(session: Session) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["POST", "discipline"],
    mutationFn: (data: DisciplineValues) => createDiscipline(data, session),
    onMutate: async (formData: DisciplineValues) => {
      await queryClient.cancelQueries({ queryKey: ["GET", "disciplines"] });

      const previousDisciplines = queryClient.getQueryData<Discipline[]>([
        "GET",
        "disciplines",
      ]);

      const tempId = `temp-${Date.now()}`;

      const newDiscipline: Discipline = {
        id: tempId,
        ...formData,
        semester: formData.semester ?? 1,
        theoreticalHours: formData.theoreticalHours ?? 0,
        practicalHours: formData.practicalHours ?? 0,
        extensionHours: formData.extensionHours ?? 0,
      };

      queryClient.setQueryData<Discipline[]>(
        ["GET", "disciplines"],
        (oldData) => {
          if (!oldData) return [newDiscipline];

          return [...oldData, newDiscipline];
        }
      );
      return { previousDisciplines };
    },
    onError: (_error, _formData, context) => {
      if (context?.previousDisciplines) {
        queryClient.setQueryData(
          ["GET", "disciplines"],
          context.previousDisciplines
        );
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["GET", "disciplines"] });
    },
  });
}

export function usePatchDiscipline(session: Session) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["PATCH", "discipline"],
    mutationFn: ({
      data,
      discipline_id,
    }: {
      data: DisciplineValues;
      discipline_id: string;
    }) => updateDiscipline(data, session, discipline_id),
    onMutate: async ({ data, discipline_id }) => {
      await queryClient.cancelQueries({ queryKey: ["GET", "disciplines"] });

      const previousDisciplines = queryClient.getQueryData<Discipline[]>([
        "GET",
        "disciplines",
      ]);

      const tempId = `temp-${Date.now()}`;

      queryClient.setQueryData<Discipline[]>(
        ["GET", "disciplines"],
        (oldData) => {
          if (!oldData) return [];

          return oldData.map((discipline) =>
            discipline.id === discipline_id
              ? {
                  ...discipline,
                  ...data,
                  id: tempId,
                  semester: data.semester ?? discipline.semester,
                  theoreticalHours:
                    data.theoreticalHours ?? discipline.theoreticalHours,
                  practicalHours:
                    data.practicalHours ?? discipline.practicalHours,
                  extensionHours:
                    data.extensionHours ?? discipline.extensionHours,
                }
              : discipline
          );
        }
      );
      return { previousDisciplines };
    },
    onError: (_error, _variables, context) => {
      if (context?.previousDisciplines) {
        queryClient.setQueryData(
          ["GET", "disciplines"],
          context.previousDisciplines
        );
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["GET", "disciplines"] });
    },
  });
}

export function useDeleteDiscipline(session: Session) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["DELETE", "discipline"],
    mutationFn: (discipline_id: string) =>
      deleteDiscipline(session, discipline_id),
    onMutate: async (discipline_id) => {
      await queryClient.cancelQueries({ queryKey: ["GET", "disciplines"] });

      const previousDisciplines = queryClient.getQueryData<Discipline[]>([
        "GET",
        "disciplines",
      ]);

      queryClient.setQueryData<Discipline[]>(
        ["GET", "disciplines"],
        (oldData) => {
          if (!oldData) return [];
          return oldData.filter(
            (discipline) => discipline.id !== discipline_id
          );
        }
      );

      return { previousDisciplines };
    },
    onError: (_error, _variables, context) => {
      if (context?.previousDisciplines) {
        queryClient.setQueryData(
          ["GET", "disciplines"],
          context.previousDisciplines
        );
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["GET", "disciplines"] });
    },
  });
}
