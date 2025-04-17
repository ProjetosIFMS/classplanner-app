import { Discipline } from "@/types/discipline";
import { User } from "@/types/user";

export enum InterestsSelectionStatus {
  ACTIVE = "ACTIVE",
  INACTIVE = "INACTIVE",
  PENDING = "PENDING",
  APPROVED = "APPROVED",
}

export interface InterestsSelection {
  id: string;
  user_id: string;
  discipline_id: string;
  created_at: Date;
  status: InterestsSelectionStatus;
  Professor?: User;
  Discipline?: Discipline;
}
