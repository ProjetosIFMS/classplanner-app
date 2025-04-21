import { AuditLog } from "@/types/audit-log";
import { Session } from "@/types/session";
import api from "@/utils/axios-instance";
import { AxiosResponse } from "axios";

export async function getMyAuditLogs(
  session: Session,
  maxListSize?: number
): Promise<AuditLog[]> {
  try {
    const res: AxiosResponse<AuditLog[]> = await api.get<AuditLog[]>(
      "/audit-log/me",
      {
        headers: {
          Authorization: `Bearer ${session}`,
        },
        params: {
          maxListSize: maxListSize ?? 5,
        },
      }
    );

    return res.data;
  } catch (err) {
    throw err;
  }
}
