"use server";
import { Session } from "@/types/session";
import api from "@/utils/axios-instance";

export async function getAreaById(session: Session, id: string) {
  try {
    const res = await api.get(`/area/${id}`, {
      headers: {
        Authorization: `Bearer ${session}`,
      },
    });
    return res.data;
  } catch (err) {
    throw err;
  }
}
