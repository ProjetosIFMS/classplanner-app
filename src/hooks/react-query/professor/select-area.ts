import { useMutation } from "@tanstack/react-query";

import { Session } from "@/types/session";
import { patchSelectArea } from "@/app/_actions/professor/patchSelectArea";
import { deleteUserToken } from "@/app/_actions/deleteUserToken";

export function usePatchSelectArea(session: Session) {
  return useMutation({
    mutationKey: ["PATCH", "user/select-area"],
    mutationFn: (area_id: string) => patchSelectArea(area_id, session),
    onSettled: () => {
      deleteUserToken();
    },
  });
}
