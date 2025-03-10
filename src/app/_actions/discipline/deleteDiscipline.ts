"use server";
import api from "@/utils/axios-instance";
import { revalidatePath } from "next/cache";

export async function deleteDiscipline(
  session: string | undefined,
  discipline_id: string,
) {
  try {
    await api.delete(`/discipline/${discipline_id}`, {
      headers: {
        Authorization: `Bearer ${session}`,
      },
    });
    revalidatePath("discipline/list");
    return true;
  } catch (err) {
    throw err;
  }
}
