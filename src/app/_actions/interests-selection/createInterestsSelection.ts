import api from "@/utils/axios-instance";
import { professorInterestsSelectionSchema } from "@/types/validation/interests-selection_form";
import { Session } from "@/types/session";

export async function createInterestsSelection(
  formData: professorInterestsSelectionSchema,
  session: Session
) {
  try {
    const res = await api.post("/interest-selection", formData, {
      headers: {
        Authorization: `Bearer ${session}`,
      },
    });
    return res.data;
  } catch (err) {
    throw err;
  }
}
