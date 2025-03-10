"use server";
import api from "@/utils/axios-instance";
import { revalidatePath } from "next/cache";

export async function deletePpc(session: string | undefined, id: string) {
  try {
    await api.delete(`/pedagogical-project/${id}`, {
      headers: {
        Authorization: `Bearer ${session}`,
      },
    });
    revalidatePath("/ppc/list");

    return true;
  } catch {
    return false;
  }
}
