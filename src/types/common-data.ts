import { Area } from "./area";
import { Course } from "./course";
import { Modality } from "./modality";
import { PPC } from "./ppc";

export type CommonData = {
  courses: Course[] | null;
  pedagogicalProjects: PPC[] | null;
  areas: Area[] | null;
  modalities: Modality[] | null;
};
