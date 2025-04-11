import { getModalities } from "@/app/_actions/modality/getModalities";
import { Session } from "@/types/session";
import { useQuery } from "@tanstack/react-query";

export function useGetModalities(session: Session) {
  return useQuery({
    queryKey: ["GET", "modality"],
    queryFn: () => getModalities(session),
  });
}
