"use server";
import api from "@/utils/axios-instance";

export async function getDisciplines(session: string | undefined) {
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
