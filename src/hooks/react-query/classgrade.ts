import { useQuery } from "@tanstack/react-query";

import { getClassgrades } from "@/app/_actions/classgrade/getClassgrades";
import { Session } from "@/types/session";

export function useGetAllClassgrades(
  session: Session,
  query?: Record<string, string | number | boolean>
) {
  return useQuery({
    queryKey: ["GET", "classgrade"],
    queryFn: async () => await getClassgrades(session, query),
  });
}
