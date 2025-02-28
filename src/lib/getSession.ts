import { cookies } from "next/headers";
export const getSession = async () => {
  const cookieStore = await cookies();
  const access_token = cookieStore.get("session")?.value;
  return access_token;
};
