import { getMyAuditLogs } from "@/app/_actions/audit-log/getMyAuditLogs";
import { Session } from "@/types/session";
import { useInfiniteQuery } from "@tanstack/react-query";

export function useGetMyAuditLogsInfinite(session: Session) {
  return useInfiniteQuery({
    queryKey: ["GET", "audit-log"],
    queryFn: ({ pageParam }) => getMyAuditLogs(session, pageParam),
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages, lastPageParam) => {
      if (lastPage?.data.length === 0) {
        return undefined;
      }
      return lastPageParam + 1;
    },
  });
}
