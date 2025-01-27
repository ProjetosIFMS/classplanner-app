type Role = 'ADMIN' | 'PROFESSOR' | 'COORDINATOR';

export interface User {
  firstName: string;
  lastName: string;
  email: string;
  picture: string;
  role: Role;
}
