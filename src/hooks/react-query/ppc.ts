import { createPpc } from "@/app/_actions/pedagogical-project/createPpc";
import { Session } from "@/types/session";
import { PPCValues } from "@/types/validation/ppc_form";
import { useMutation } from "@tanstack/react-query";

export function usePostPPC(session: Session) {
  return useMutation({
    mutationKey: ["POST", "pedagogical-project"],
    mutationFn: (data: PPCValues) => createPpc(data, session),
  });
}
