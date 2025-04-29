import { useQueryClient, useQuery, useMutation } from "@tanstack/react-query";

import { getModalities } from "@/app/_actions/modality/getModalities";
import { Session } from "@/types/session";
import { ModalityValues } from "@/types/validation/modality_form";
import { createModality } from "@/app/_actions/modality/createModality";
import { updateModality } from "@/app/_actions/modality/updateModality";
import { deleteModality } from "@/app/_actions/modality/deleteModality";
import { Modality } from "@/types/modality"; // You might need to create/import this type

export function useGetAllModalities(session: Session) {
  return useQuery({
    queryKey: ["GET", "modality"],
    queryFn: async () => await getModalities(session),
    enabled: !!session,
  });
}

export function usePostModality(session: Session) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["POST", "modality"],
    mutationFn: (data: ModalityValues) => createModality(data, session),
    onMutate: async (formData: ModalityValues) => {
      await queryClient.cancelQueries({ queryKey: ["GET", "modality"] });

      const previousModalities = queryClient.getQueryData<Modality[]>([
        "GET",
        "modality",
      ]);

      const tempId = `temp-${Date.now()}`;

      const newModality: Modality = {
        id: tempId,
        ...formData,
      };

      queryClient.setQueryData<Modality[]>(["GET", "modality"], (oldData) => {
        if (!oldData) return [newModality];
        return [...oldData, newModality];
      });

      return { previousModalities };
    },
    onError: (_error, _formData, context) => {
      if (context?.previousModalities) {
        queryClient.setQueryData(
          ["GET", "modality"],
          context.previousModalities
        );
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["GET", "modality"] });
    },
  });
}

export function usePatchModality(session: Session) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["PATCH", "modality"],
    mutationFn: ({
      data,
      modality_id,
    }: {
      data: ModalityValues;
      modality_id: string;
    }) => updateModality(data, session, modality_id),
    onMutate: async ({ data, modality_id }) => {
      await queryClient.cancelQueries({ queryKey: ["GET", "modality"] });

      const previousModalities = queryClient.getQueryData<Modality[]>([
        "GET",
        "modality",
      ]);

      const tempId = `temp-${Date.now()}`;

      queryClient.setQueryData<Modality[]>(["GET", "modality"], (oldData) => {
        if (!oldData) return [];
        return oldData.map((modality) =>
          modality.id === modality_id
            ? {
                ...modality,
                ...data,
                id: tempId,
              }
            : modality
        );
      });

      return { previousModalities };
    },
    onError: (_error, _variables, context) => {
      if (context?.previousModalities) {
        queryClient.setQueryData(
          ["GET", "modality"],
          context.previousModalities
        );
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["GET", "modality"] });
    },
  });
}

export function useDeleteModality(session: Session) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["DELETE", "modality"],
    mutationFn: (modality_id: string) => deleteModality(session, modality_id),
    onMutate: async (modality_id) => {
      await queryClient.cancelQueries({ queryKey: ["GET", "modality"] });

      const previousModalities = queryClient.getQueryData<Modality[]>([
        "GET",
        "modality",
      ]);

      queryClient.setQueryData<Modality[]>(["GET", "modality"], (oldData) => {
        if (!oldData) return [];
        return oldData.filter((modality) => modality.id !== modality_id);
      });

      return { previousModalities };
    },
    onError: (_error, _variables, context) => {
      if (context?.previousModalities) {
        queryClient.setQueryData(
          ["GET", "modality"],
          context.previousModalities
        );
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["GET", "modality"] });
    },
  });
}
