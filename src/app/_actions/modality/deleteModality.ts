'use server'
import api from "@/utils/axios-instance";
import { revalidatePath } from "next/cache";
export async function deleteModality(
  session: string | undefined,
  modality_id: string,
) {
  try {
    await api.delete(`/modality/${modality_id}`, {
      headers: {
        Authorization: `Bearer ${session}`,
      },
    });
    revalidatePath("modality/list");
    return true;
  } catch (err) {
    throw err;
  }
}