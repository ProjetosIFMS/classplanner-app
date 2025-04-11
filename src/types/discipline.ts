export interface Discipline {
  id: string;
  name: string;
  area_id: string;
  semester: number;
  pedagogical_project_id: string;
  course_id: string;
  modalities_ids: string[];
  code: string;
  practicalHours: number;
  theoreticalHours: number;
  extensionHours: number;
}
