import { headers } from "next/headers";
import { userAgentFromString } from "next/server";

export async function isServerMobile() {
  const headersList = await headers();
  const userAgent = headersList.get("user-agent");
  const { device } = userAgentFromString(userAgent || undefined);
  return device.type === "mobile";
}
