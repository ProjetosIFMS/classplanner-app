import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { Session } from "@/types/session";
import { AreaValues } from "@/types/validation/area_form";
import { Area } from "@/types/area";

import { createArea } from "@/app/_actions/area/createArea";
import { getAreas } from "@/app/_actions/area/getAreas";
import { deleteArea } from "@/app/_actions/area/deleteArea";
import { updateArea } from "@/app/_actions/area/updateArea";

export function useGetAllAreas(session: Session) {
  return useQuery({
    queryKey: ["areas"],
    queryFn: async () => await getAreas(session),
    enabled: !!session,
  });
}

export function usePostArea(session: Session) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["POST", "area"],
    mutationFn: (formData: AreaValues): Promise<Area | null> =>
      createArea(session, formData),
    onMutate: async (formData) => {
      await queryClient.cancelQueries({ queryKey: ["areas"] });

      const previousAreas = queryClient.getQueryData<Area[]>(["areas"]) || [];

      const tempId = `temp-${Date.now()}`;

      const newArea: Area = {
        id: tempId,
        ...formData,
        Discipline: [],
        User: [],
      };

      queryClient.setQueryData<Area[]>(["areas"], [...previousAreas, newArea]);

      return { previousAreas };
    },
    onError: (_error, _formData, context) => {
      if (context?.previousAreas) {
        queryClient.setQueryData(["areas"], context.previousAreas);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["areas"] });
    },
  });
}

export function usePatchArea(session: Session) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["PATCH", "area"],
    mutationFn: ({
      formData,
      area_id,
    }: {
      formData: AreaValues;
      area_id: string;
    }): Promise<Area | null> => updateArea(session, area_id, formData),
    onMutate: async ({ formData, area_id }) => {
      await queryClient.cancelQueries({ queryKey: ["areas"] });

      const previousAreas = queryClient.getQueryData<Area[]>(["areas"]) || [];

      const tempId = `temp-${Date.now()}`;

      const updatedAreas = previousAreas.map((area) =>
        area.id === area_id ? { ...area, ...formData, id: tempId } : area
      );

      queryClient.setQueryData<Area[]>(["areas"], updatedAreas);

      return { previousAreas };
    },
    onError: (_error, _formData, context) => {
      if (context?.previousAreas) {
        queryClient.setQueryData(["areas"], context.previousAreas);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["areas"] });
    },
  });
}

export function useDeleteArea(session: Session) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["DELETE", "area"],
    mutationFn: (id: string): Promise<boolean> => deleteArea(session, id),
    onMutate: async (id) => {
      await queryClient.cancelQueries({ queryKey: ["areas"] });

      const previousAreas = queryClient.getQueryData<Area[]>(["areas"]);

      if (previousAreas) {
        queryClient.setQueryData<Area[]>(
          ["areas"],
          previousAreas.filter((area) => area.id !== id)
        );
      }

      return { previousAreas };
    },
    onError: (_error, _id, context) => {
      if (context?.previousAreas) {
        queryClient.setQueryData(["areas"], context.previousAreas);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["areas"] });
    },
  });
}
