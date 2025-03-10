"use server";
import { PPCValues } from "@/types/validation/ppc_form";
import api from "@/utils/axios-instance";

export async function createPpc(
  formData: PPCValues,
  session: string | undefined,
) {
  try {
    await api.post("/pedagogical-project", formData, {
      headers: {
        Authorization: `Bearer ${session}`,
      },
    });
    return true;
  } catch (err) {
    throw err;
  }
}
