import api from "@/utils/axios-instance";
import { ModalitySchema } from "@/types/validation/modality_form";

export async function createModality(
  formData: ModalitySchema,
  session: string | undefined | undefined,
) {
  try {
    const res = await api.post("/modality", formData, {
      headers: {
        Authorization: `Bearer ${session}`,
      },
    });
    return res.data;
  } catch (err) {
    throw err;
  }
}
