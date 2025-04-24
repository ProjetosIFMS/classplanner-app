import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { Session } from "@/types/session";
import { getDisciplines } from "@/app/_actions/discipline/getDisciplines";
import { deleteDiscipline } from "@/app/_actions/discipline/deleteDiscipline";
import { DisciplineValues } from "@/types/validation/discipline_form";
import { createDiscipline } from "@/app/_actions/discipline/createDiscipline";
import { updateDiscipline } from "@/app/_actions/discipline/updateDiscipline";

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
    onSettled: () => {
      console.log("settled");
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
    onSettled: () => {
      console.log("settled");
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
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["GET", "disciplines"] });
    },
  });
}
