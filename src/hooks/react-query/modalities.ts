import { useQueryClient, useQuery, useMutation } from "@tanstack/react-query";

import { getModalities } from "@/app/_actions/modality/getModalities";
import { Session } from "@/types/session";
import { ModalityValues } from "@/types/validation/modality_form";
import { createModality } from "@/app/_actions/modality/createModality";
import { updateModality } from "@/app/_actions/modality/updateModality";
import { deleteModality } from "@/app/_actions/modality/deleteModality";

export function useGetAllModalities(session: Session) {
  return useQuery({
    queryKey: ["GET", "modality"],
    queryFn: async () => await getModalities(session),
  });
}

export function usePostModality(session: Session) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: ModalityValues) => createModality(data, session),
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["GET", "modality"] });
    },
  });
}

export function usePatchModality(session: Session) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      data,
      modality_id,
    }: {
      data: ModalityValues;
      modality_id: string;
    }) => updateModality(data, session, modality_id),
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["GET", "modality"] });
    },
  });
}
export function useDeleteModality(session: Session) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (modality_id: string) => deleteModality(session, modality_id),
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["GET", "modality"] });
    },
  });
}
