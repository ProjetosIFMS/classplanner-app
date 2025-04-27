"use server";

import api from "@/utils/axios-instance";

import { Session } from "@/types/session";
import { AxiosResponse } from "axios";
import { InterestsSelection } from "@/types/interests-selection";

export async function getInterestsSelection(session: Session) {
  try {
    const res: AxiosResponse<InterestsSelection[]> = await api.get(
      "/interest-selection",
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
