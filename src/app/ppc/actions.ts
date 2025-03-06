"use server";

import { PPC } from "@/types/ppc";
import { PPCSchema } from "@/types/validation/ppc_form";
import api from "@/utils/axios-instance";
import { revalidatePath } from "next/cache";

export async function getPpc(session: string | undefined): Promise<PPC[]> {
  try {
    const res = await api.get("/pedagogical-project", {
      headers: {
        Authorization: `Bearer ${session}`,
      },
    });
    return res.data;
  } catch (err) {
    throw err;
  }
}

export async function deletePpc(session: string | undefined, id: string) {
  try {
    await api.delete(`/pedagogical-project/${id}`, {
      headers: {
        Authorization: `Bearer ${session}`,
      },
    });
    revalidatePath("/ppc/list");

    return true;
  } catch {
    return false;
  }
}

export async function createPpc(
  formData: PPCSchema,
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

export async function updatePpc(
  id: string,
  data: PPCSchema,
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
