import { InterestsSelection } from "@/types/interests-selection";
import { Session } from "@/types/session";
import api from "@/utils/axios-instance";
import { AxiosResponse } from "axios";

export async function getMyInterestsSelection(
  session: Session
): Promise<InterestsSelection[]> {
  try {
    const res: AxiosResponse<InterestsSelection[]> = await api.get<
      InterestsSelection[]
    >("/interest-selection/me", {
      headers: {
        Authorization: `Bearer ${session}`,
      },
    });

    return res.data;
  } catch (err) {
    throw err;
  }
}
