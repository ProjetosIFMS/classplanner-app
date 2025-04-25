import { createPpc } from "@/app/_actions/pedagogical-project/createPpc";
import { getPpc } from "@/app/_actions/pedagogical-project/getPpc";
import { Session } from "@/types/session";
import { PPCValues } from "@/types/validation/ppc_form";
import { useMutation, useQuery } from "@tanstack/react-query";

export function usePostPPC(session: Session) {
  return useMutation({
    mutationKey: ["POST", "pedagogical-project"],
    mutationFn: (data: PPCValues) => createPpc(data, session),
  });
}

export function useGetAllPPC(session: Session) {
  return useQuery({
    queryKey: ["GET", "pedagogical-project"],
    queryFn: async () => await getPpc(session),
  });
}
