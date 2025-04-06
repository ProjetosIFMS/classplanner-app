import { Discipline } from "./discipline";
import { User } from "./user";

export type Area = {
  id: string;
  name: string;
  Discipline: Discipline[];
  User: User[];
};
