import { Role, User } from "@/types/user";
import { jwtVerify } from "jose";

export async function verifyAuth(token: string): Promise<User | null> {
  if (!token) return null;

  try {
    const secret = new TextEncoder().encode(process.env.JWT_SECRET || "");
    const { payload } = await jwtVerify(token, secret);

    return {
      id: payload.sub as string,
      role: payload.role as Role,
      area_id: payload.area_id as string,
      email: payload.email as string,
      firstName: payload.firstName as string,
      lastName: payload.lastName as string,
      picture: payload.picture as string,
    };
  } catch (err) {
    throw err;
  }
}
