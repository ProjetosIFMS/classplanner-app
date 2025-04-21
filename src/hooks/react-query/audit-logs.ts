import { getMyAuditLogs } from "@/app/_actions/audit-log/getMyAuditLogs";
import { Session } from "@/types/session";
import { useQuery } from "@tanstack/react-query";

export function useGetMyAuditLogs(session: Session, maxListSize?: number) {
  return useQuery({
    queryKey: ["GET", "audit-logs"],
    queryFn: () => getMyAuditLogs(session, maxListSize),
  });
}
