import { cookies } from "next/headers";
export const getSession = async () => {
  const cookieStore = await cookies();
  const access_token = cookieStore.get("session")?.value;

  if (!access_token) {
    throw new Error("Session token is missing. This should never happen.");
  }
  return access_token;
};
