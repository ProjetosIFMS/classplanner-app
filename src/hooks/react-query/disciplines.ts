import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { Session } from "@/types/session";
import { getDisciplines } from "@/app/_actions/discipline/getDisciplines";
import { deleteDiscipline } from "@/app/_actions/discipline/deleteDiscipline";

export function useGetAllDisciplines(session: Session) {
  return useQuery({
    queryKey: ["GET all", "disciplines"],
    queryFn: () => getDisciplines(session),
  });
}

export function useDeleteDiscipline(session: Session) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["DELETE", "discipline"],
    mutationFn: (discipline_id: string) =>
      deleteDiscipline(session, discipline_id),
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["GET all", "disciplines"] });
    },
  });
}
