import { Area } from "./area";
import { Course } from "./course";
import { Modality } from "./modality";
import { PPC } from "./ppc";

export type CommonData = {
  courses: Course[] | undefined;
  pedagogicalProjects: PPC[] | undefined;
  areas: Area[] | undefined;
  modalities: Modality[] | undefined;
};
