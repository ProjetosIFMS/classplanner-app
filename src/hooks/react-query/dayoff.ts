import { useMutation, useQueryClient, useQuery } from "@tanstack/react-query";

import { createDayOff } from "@/app/_actions/day-off/createDayOff";
import { Session } from "@/types/session";
import { SelectDayOffValues } from "@/types/validation/select-day-off_form";
import { getMyDayoff } from "@/app/_actions/day-off/getMyDayoff";
import { patchMyDayoff } from "@/app/_actions/day-off/patchMyDayoff";

export function useGetMyDayoff(session: Session) {
  return useQuery({
    queryKey: ["GET", "dayoff/me"],
    queryFn: () => getMyDayoff(session),
    retry: false,
  });
}

export function usePostDayOffSelection(session: Session) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["POST", "dayoff"],
    mutationFn: (data: SelectDayOffValues) => createDayOff(session, data),
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["GET", "dayoff/me"] });
    },
  });
}

export function usePatchMyDayoff(session: Session) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["PATCH", "dayoff"],
    mutationFn: (data: SelectDayOffValues) => patchMyDayoff(session, data),
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["GET", "dayoff/me"] });
    },
  });
}
