"use server";
import { Session } from "@/types/session";
import { DisciplineValues } from "@/types/validation/discipline_form";
import api from "@/utils/axios-instance";

export async function updateDiscipline(
  formData: DisciplineValues,
  session: Session,
  discipline_id: string,
) {
  try {
    const res = await api.patch(`/discipline/${discipline_id}`, formData, {
      headers: {
        Authorization: `Bearer ${session}`,
      },
    });
    return res.data;
  } catch (err) {
    throw err;
  }
}
