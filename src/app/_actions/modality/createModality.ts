import api from "@/utils/axios-instance";
import { ModalityValues } from "@/types/validation/modality_form";
import { Session } from "@/types/session";

export async function createModality(
  formData: ModalityValues,
  session: Session
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
