"use server";
import { Session } from "@/types/session";
import api from "@/utils/axios-instance";

export async function getDisciplines(session: Session) {
  try {
    const res = await api.get("/discipline", {
      headers: {
        Authorization: `Bearer ${session}`,
      },
    });
    return res.data;
  } catch (err) {
    throw err;
  }
}
