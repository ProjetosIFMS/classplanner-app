import { createPpc } from "@/app/_actions/pedagogical-project/createPpc";
import { getPpc } from "@/app/_actions/pedagogical-project/getPpc";
import { updatePpc } from "@/app/_actions/pedagogical-project/updatePpc";
import { Session } from "@/types/session";
import { PPCValues } from "@/types/validation/ppc_form";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { deletePpc } from "@/app/_actions/pedagogical-project/deletePpc";
import { PPC } from "@/types/ppc";

export function useGetAllPPC(session: Session) {
  return useQuery({
    queryKey: ["GET", "pedagogical-project"],
    queryFn: async () => await getPpc(session),
    enabled: !!session,
  });
}

export function usePostPPC(session: Session) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["POST", "pedagogical-project"],
    mutationFn: (data: PPCValues) => createPpc(data, session),
    onMutate: async (formData) => {
      await queryClient.cancelQueries({
        queryKey: ["GET", "pedagogical-project"],
      });

      const previousPPCs = queryClient.getQueryData<PPC[]>([
        "GET",
        "pedagogical-project",
      ]);

      const tempId = `temp-${Date.now()}`;

      const newPPC: PPC = {
        id: tempId,
        ...formData,
        documentUrl: undefined,
      };

      queryClient.setQueryData<PPC[]>(
        ["GET", "pedagogical-project"],
        (oldData) => {
          if (!oldData) return [newPPC];

          return [...oldData, newPPC];
        }
      );

      return { previousPPCs };
    },
    onError: (_error, _formData, context) => {
      if (context?.previousPPCs) {
        queryClient.setQueryData(
          ["GET", "pedagogical-project"],
          context.previousPPCs
        );
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: ["GET", "pedagogical-project"],
      });
    },
  });
}

export function usePatchPPC(session: Session) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["PATCH", "pedagogical-project"],
    mutationFn: ({
      formData,
      ppc_id,
    }: {
      formData: PPCValues;
      ppc_id: string;
    }) => updatePpc(ppc_id, formData, session),
    onMutate: async ({ formData, ppc_id }) => {
      await queryClient.cancelQueries({
        queryKey: ["GET", "pedagogical-project"],
      });

      const previousPPCs = queryClient.getQueryData<PPC[]>([
        "GET",
        "pedagogical-project",
      ]);

      const tempId = `temp-${Date.now()}`;

      queryClient.setQueryData<PPC[]>(
        ["GET", "pedagogical-project"],
        (oldData) => {
          if (!oldData) return [];

          return oldData.map((ppc) =>
            ppc.id === ppc_id ? { ...ppc, ...formData, id: tempId } : ppc
          );
        }
      );

      return { previousPPCs };
    },
    onError: (_error, _formData, context) => {
      if (context?.previousPPCs) {
        queryClient.setQueryData(
          ["GET", "pedagogical-project"],
          context.previousPPCs
        );
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: ["GET", "pedagogical-project"],
      });
    },
  });
}

export function useDeletePPC(session: Session) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["DELETE", "pedagogical-project"],
    mutationFn: (ppc_id: string) => deletePpc(session, ppc_id),
    onMutate: async (ppc_id) => {
      await queryClient.cancelQueries({
        queryKey: ["GET", "pedagogical-project"],
      });

      const previousPPCs = queryClient.getQueryData<PPC[]>([
        "GET",
        "pedagogical-project",
      ]);

      queryClient.setQueryData<PPC[]>(
        ["GET", "pedagogical-project"],
        (oldData) => {
          if (!oldData) return [];
          return oldData.filter((ppc) => ppc.id !== ppc_id);
        }
      );

      return { previousPPCs };
    },
    onError: (_error, _formData, context) => {
      if (context?.previousPPCs) {
        queryClient.setQueryData(
          ["GET", "pedagogical-project"],
          context.previousPPCs
        );
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: ["GET", "pedagogical-project"],
      });
    },
  });
}
