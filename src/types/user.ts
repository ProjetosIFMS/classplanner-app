export enum Role {
  COORDINATOR = "COORDINATOR",
  PROFESSOR = "PROFESSOR",
  ADMIN = "ADMIN",
}

export type User = {
  email: string;
  firstName: string;
  lastName: string;
  role: Role;
  picture: string;
  area_id: string;
  id?: string;
};
