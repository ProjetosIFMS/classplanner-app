"use server";
import { Discipline } from "@/types/discipline";
import { Session } from "@/types/session";
import api from "@/utils/axios-instance";

export async function getDisciplines(session: Session): Promise<Discipline[]> {
  try {
    const res = await api.get<Discipline[]>("/discipline", {
      headers: {
        Authorization: `Bearer ${session}`,
      },
    });
    return res.data;
  } catch (err) {
    throw err;
  }
}
