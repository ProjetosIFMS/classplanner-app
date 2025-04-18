import { createDayOff } from "@/app/_actions/day-off/createDayOff";
import { Session } from "@/types/session";
import { SelectDayOffValues } from "@/types/validation/select-day-off_form";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function usePostDayOffSelection(session: Session) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["POST", "dayoff"],
    mutationFn: (data: SelectDayOffValues) => createDayOff(session, data),
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["dayoff"] });
    },
  });
}
