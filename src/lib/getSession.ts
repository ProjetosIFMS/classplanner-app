import { cookies } from "next/headers";
export const getSession = async (): Promise<string | undefined> => {
  try {
    const cookieStore = await cookies();
    const access_token = cookieStore.get("session")?.value;
    return access_token;
  } catch {
    throw new Error("Access token not found..");
  }
};
