import api from "@/utils/axios-instance";
import { ModalitySchema } from "@/types/validation/modality_form";
import { Session } from "@/types/session";

export async function createModality(
  formData: ModalitySchema,
  session: Session,
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
