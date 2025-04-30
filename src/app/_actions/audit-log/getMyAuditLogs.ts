import { AuditLogPagination } from "@/types/audit-log";
import { Session } from "@/types/session";
import api from "@/utils/axios-instance";
import { AxiosResponse } from "axios";

export async function getMyAuditLogs(
  session: Session,
  page: number = 1,
  pageSize: number = 10
): Promise<AuditLogPagination> {
  try {
    const res: AxiosResponse<AuditLogPagination> =
      await api.get<AuditLogPagination>("/audit-log/me", {
        headers: {
          Authorization: `Bearer ${session}`,
        },
        params: {
          page: page,
          pageSize: pageSize,
        },
      });

    return res.data;
  } catch (err) {
    throw err;
  }
}
