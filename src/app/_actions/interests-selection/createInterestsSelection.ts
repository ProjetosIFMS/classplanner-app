import api from "@/utils/axios-instance";
import { type ProfessorInterestsSelectionValues } from "@/types/validation/interests-selection_form";
import { Session } from "@/types/session";
import { InterestsSelection } from "@/types/interests-selection";
import { AxiosResponse } from "axios";

export async function createInterestsSelection(
  formData: ProfessorInterestsSelectionValues,
  session: Session
): Promise<InterestsSelection[]> {
  try {
    const res: AxiosResponse<InterestsSelection[]> = await api.post(
      "/interest-selection",
      formData,
      {
        headers: {
          Authorization: `Bearer ${session}`,
        },
      }
    );
    return res.data;
  } catch (err) {
    throw err;
  }
}
