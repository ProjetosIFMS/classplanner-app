"use server";
import { Session } from "@/types/session";
import api from "@/utils/axios-instance";

export async function getAreas(session: Session) {
  try {
    const res = await api.get("/area", {
      headers: {
        Authorization: `Bearer ${session}`,
      },
    });
    return res.data;
  } catch (err) {
    throw err;
  }
}
