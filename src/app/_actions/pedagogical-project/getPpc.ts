"use server";
import { PPC } from "@/types/ppc";
import api from "@/utils/axios-instance";

export async function getPpc(session: string | undefined): Promise<PPC[]> {
  try {
    const res = await api.get("/pedagogical-project", {
      headers: {
        Authorization: `Bearer ${session}`,
      },
    });
    return res.data;
  } catch (err) {
    throw err;
  }
}
