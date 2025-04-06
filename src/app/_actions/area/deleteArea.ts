"use server";
import api from "@/utils/axios-instance";
import { revalidatePath } from "next/cache";

export async function deleteArea(session: string | undefined, id: string) {
  try {
    await api.delete(`/area/${id}`, {
      headers: {
        Authorization: `Bearer ${session}`,
      },
    });
    revalidatePath("area/list");

    return true;
  } catch (err) {
    throw err;
  }
}
