import { WEEKDAY } from "@/types/weekday";

export enum DAYOFF_STATUS {
  PENDING = "PENDING",
  APPROVED = "APPROVED",
  REJECTED = "REJECTED",
}

export interface Dayoff {
  id: string;
  reason?: string | null;
  schedule: "Contínuos" | "Espaçados" | null | undefined;
  frequency: "3 aulas contínuas" | "Aulas separadas" | null | undefined;
  weekday?: WEEKDAY | null;
  created_at: Date;
  updated_at: Date;
  status: DAYOFF_STATUS;
  user_id: string;
}
