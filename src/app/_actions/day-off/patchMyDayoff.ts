"use server";
import api from "@/utils/axios-instance";

import { Session } from "@/types/session";
import { SelectDayOffValues } from "@/types/validation/select-day-off_form";

export async function patchMyDayoff(
  session: Session,
  data: SelectDayOffValues
) {
  try {
    const response = await api.patch(`/dayoff`, data, {
      headers: {
        Authorization: `Bearer ${session}`,
      },
    });
    return response.data;
  } catch (err) {
    throw err;
  }
}
