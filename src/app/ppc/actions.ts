import { PPC } from "@/types/ppc";
import { PPCSchema } from "@/types/validation/forms";
import api from "@/utils/axios-instance";

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
    const res = await api.delete(`/pedagogical-project/${id}`, {
      headers: {
        Authorization: `Bearer ${session}`,
      },
    });
    return res.data;
  } catch (err) {
    throw err;
  }
}

export async function createPpc(
  formData: PPCSchema,
  session: string | undefined,
) {
  try {
    const res = await api.post("/pedagogical-project", formData, {
      headers: {
        Authorization: `Bearer ${session}`,
      },
    });
    return res.data;
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
    return res;
  } catch (err) {
    throw err;
  }
}
