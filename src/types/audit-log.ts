import { User } from "@/types/user";

export enum AUDITLOG_ACTION {
  CREATE = "CREATE",
  UPDATE = "UPDATE",
  DELETE = "DELETE",
}

export type AuditLog = {
  id: string;
  action: AUDITLOG_ACTION;
  url: string;
  resource_id: string;
  created_at: Date;
  user_id?: string;
  User?: User;
};
