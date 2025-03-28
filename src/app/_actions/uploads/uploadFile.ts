"use server";

import { PPC } from "@/types/ppc";
import { Session } from "@/types/session";
import api from "@/utils/axios-instance";
import { AxiosResponse } from "axios";

type DocumentUrl = string;

export const uploadFile = async (
  file: File,
  ppc_id: string,
  session: Session,
): Promise<DocumentUrl> => {
  try {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("projectId", ppc_id);

    const res: AxiosResponse<PPC> = await api.post("/uploads/files", formData, {
      headers: {
        Authorization: `Bearer ${session}`,
        "Content-Type": "multipart/form-data",
      },
    });

    return res.data.documentUrl;
  } catch (err) {
    throw err;
  }
};
