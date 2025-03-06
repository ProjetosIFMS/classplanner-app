"use server";

import { DisciplineSchema } from "@/types/validation/discipline_form";
import api from "@/utils/axios-instance";
import { revalidatePath } from "next/cache";

export async function createDiscipline(
  formData: DisciplineSchema,
  session: string | undefined,
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

export async function getDisciplines(session: string | undefined) {
  try {
    const res = await api.get("/discipline", {
      headers: {
        Authorization: `Bearer ${session}`,
      },
    });
    return res.data;
  } catch (err) {
    throw err;
  }
}

export async function deleteDiscipline(
  session: string | undefined,
  discipline_id: string,
) {
  try {
    await api.delete(`/discipline/${discipline_id}`, {
      headers: {
        Authorization: `Bearer ${session}`,
      },
    });
    revalidatePath("discipline/list");
    return true;
  } catch (err) {
    throw err;
  }
}
