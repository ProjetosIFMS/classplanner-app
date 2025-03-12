"use server";
import { Session } from "@/types/session";
import { DisciplineValues } from "@/types/validation/discipline_form";
import api from "@/utils/axios-instance";

export async function createDiscipline(
  formData: DisciplineValues,
  session: Session,
) {
  try {
    const res = await api.post("/discipline", formData, {
      headers: {
        Authorization: `Bearer ${session}`,
      },
    });
    return res.data;
  } catch (err) {
    throw err;
  }
}
