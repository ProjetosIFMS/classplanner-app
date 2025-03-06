import { Modality } from "@/types/modality";
import api from "@/utils/axios-instance";
import { AxiosResponse } from "axios";

export async function getModalities(session: string): Promise<Modality[]> {
  try {
    const res: AxiosResponse<Modality[]> = await api.get("/modality", {
      headers: {
        Authorization: `Bearer ${session}`,
      },
    });
    return res.data;
  } catch (err) {
    throw err;
  }
}
