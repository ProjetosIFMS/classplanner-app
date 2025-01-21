export type Role = "PROFESSOR" | "COORDINATOR" | "ADMIN";

export type User = {
  email: string;
  firstName: string;
  lastName: string;
  role: Role;
  picture: string;
};
