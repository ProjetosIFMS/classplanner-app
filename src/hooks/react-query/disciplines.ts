import { useQuery } from "@tanstack/react-query";

import { Session } from "@/types/session";
import { getDisciplines } from "@/app/_actions/discipline/getDisciplines";

export function useGetAllDisciplines(session: Session) {
  return useQuery({
    queryKey: ["GET all", "disciplines"],
    queryFn: () => getDisciplines(session),
  });
}
