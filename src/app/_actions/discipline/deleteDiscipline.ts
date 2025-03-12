"use server";
import { Session } from "@/types/session";
import api from "@/utils/axios-instance";
import { revalidatePath } from "next/cache";

export async function deleteDiscipline(
  session: Session,
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
