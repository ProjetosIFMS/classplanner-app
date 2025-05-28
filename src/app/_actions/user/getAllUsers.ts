"use server"
import { Session } from "@/types/session";
import { User } from "@/types/user";
import api from "@/utils/axios-instance";
import { AxiosResponse } from "axios";

export async function getAllUsers(session: Session): Promise<User[]> {
  try {
    const res: AxiosResponse<User[]> = await api.get("/user", {
      headers: {
        Authorization: `Bearer ${session}`,
      },
    });
    return res.data;
  } catch (err) {
    throw err;
  }
}
