"use server";
import { PPC } from "@/types/ppc";
import { PPCValues } from "@/types/validation/ppc_form";
import api from "@/utils/axios-instance";
import { uploadFile } from "../uploads/uploadFile";

export async function createPpc(
  { document, ...formData }: PPCValues,
  session: string | undefined,
): Promise<PPC> {
  try {
    const res = await api.post("/pedagogical-project", formData, {
      headers: {
        Authorization: `Bearer ${session}`,
      },
    });

    const { id } = res.data;

    if (id && document) {
      try {
        await uploadFile(document, id, session);
      } catch (err) {
        throw err;
      }
    }

    return res.data;
  } catch (err) {
    throw err;
  }
}
