import { ClassgradeDiscipline } from "@/types/classgradeDiscipline";
import { ClassgradeValues } from "./validation/class-grade_form";

export interface Classgrade extends ClassgradeValues {
  id: string;
  ClassGradeDiscipline: ClassgradeDiscipline[];
}
