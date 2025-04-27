"use server";
import api from "@/utils/axios-instance";
import { Session } from "@/types/session";
import { AxiosResponse } from "axios";
import { Classgrade } from "@/types/classgrade";

export async function getClassgrades(
  session: Session,
  query?: Record<string, string | number | boolean>
) {
  try {
    const queryString = query
      ? "?" + new URLSearchParams(query as Record<string, string>).toString()
      : "";
    const res: AxiosResponse<Classgrade[]> = await api.get(
      `/classgrade${queryString}`,
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
