"use server";
import { Session } from "@/types/session";
import api from "@/utils/axios-instance";

export async function patchSelectArea(area_id: string, session: Session) {
  try {
    const bodyData = {
      area_id: area_id,
    };

    const res = await api.patch("/user/select-area", bodyData, {
      headers: {
        Authorization: `Bearer ${session}`,
      },
    });
    return res.data;
  } catch (error) {
    throw error;
  }
}
