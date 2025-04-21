import { Classgrade } from "@/types/classgrade";
import { User } from "@/types/user";

export interface ProfessorClassgrade {
  id: string;
  user_id?: string;
  classGrade_id?: string;
  ClassGrade?: Classgrade;
  priority: boolean;
  Professor?: User;
}
