import { ProfessorClassgrade } from "@/types/professor-classgrade";
import { Session } from "@/types/session";
import api from "@/utils/axios-instance";
import { AxiosResponse } from "axios";

export async function getProfessorClassgrade(
  session: Session
): Promise<ProfessorClassgrade[]> {
  try {
    const res: AxiosResponse<ProfessorClassgrade[]> = await api.get(
      "/professor-classgrade",
      {
        headers: {
          Authorization: `Bearer ${session}`,
        },
      }
    );
    return res.data;
  } catch (err) {
    throw err;
  }
}
