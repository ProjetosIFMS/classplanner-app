"use server";
import { Session } from "@/types/session";
import api from "@/utils/axios-instance";

import { Area } from "@/types/area";

export async function getAreas(session: Session): Promise<Area[]> {
  try {
    const res = await api.get<Area[]>("/area", {
      headers: {
        Authorization: `Bearer ${session}`,
      },
    });
    return res.data;
  } catch (err) {
    throw err;
  }
}
