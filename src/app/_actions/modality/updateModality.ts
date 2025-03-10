"use server";
import api from "@/utils/axios-instance";
import { ModalitySchema } from "@/types/validation/modality_form";

export async function updateModality(
  formData: ModalitySchema,
  session: string | undefined | undefined,
  modality_id: string,
) {
  try {
    const res = await api.patch(`/modality/${modality_id}`, formData, {
      headers: {
        Authorization: `Bearer ${session}`,
      },
    });
    return res.data;
  } catch (err) {
    throw err;
  }
}
