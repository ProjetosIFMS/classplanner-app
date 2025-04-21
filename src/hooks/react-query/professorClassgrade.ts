import { getProfessorClassgrade } from "@/app/_actions/professor-classgrade/getProfessorClassgrade";
import { Session } from "@/types/session";

export function useGetProfessorClassgrade(session: Session) {
  return {
    queryKey: ["GET", "professor-classgrade"],
    queryFn: () => getProfessorClassgrade(session),
  };
}
