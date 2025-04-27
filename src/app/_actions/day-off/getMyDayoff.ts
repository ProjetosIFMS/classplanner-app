"use server";

import { Dayoff } from "@/types/dayoff";
import { Session } from "@/types/session";
import api from "@/utils/axios-instance";

export async function getMyDayoff(session: Session): Promise<Dayoff> {
  try {
    const res = await api.get<Dayoff>("/dayoff/me", {
      headers: {
        Authorization: `Bearer ${session}`,
      },
    });
    return res.data;
  } catch (err) {
    throw err;
  }
}
