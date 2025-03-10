"use server";
import { PPCValues } from "@/types/validation/ppc_form";
import api from "@/utils/axios-instance";

export async function updatePpc(
  id: string,
  data: PPCValues,
  session: string | undefined,
) {
  try {
    const res = await api.patch(`/pedagogical-project/${id}`, data, {
      headers: {
        Authorization: `Bearer ${session}`,
      },
    });
    return res.data;
  } catch (err) {
    throw err;
  }
}
