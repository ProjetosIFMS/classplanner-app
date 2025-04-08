import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { Session } from "@/types/session";
import { AreaValues } from "@/types/validation/area_form";
import { Area } from "@/types/area";

import { createArea } from "@/app/_actions/area/createArea";
import { getAreas } from "@/app/_actions/area/getAreas";
import { deleteArea } from "@/app/_actions/area/deleteArea";

export function useGetAllAreas(session: Session) {
  return useQuery({
    queryKey: ["GET", "areas"],
    queryFn: () => getAreas(session),
  });
}

export function usePostArea(session: Session) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["POST", "area"],
    mutationFn: (formData: AreaValues): Promise<Area | null> =>
      createArea(session, formData),
    onSuccess: () => {
      queryClient.invalidateQueries(["areas"]);
    },
  });
}

export function useDeleteArea(session: Session) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["DELETE", "area"],
    mutationFn: (id: string): Promise<void> => deleteArea(session, id),
    onSuccess: () => {
      queryClient.invalidateQueries(["areas"]);
    },
  });
}
