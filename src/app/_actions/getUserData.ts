"use server";

import { Session } from "@/types/session";
import { User } from "@/types/user";
import api from "@/utils/axios-instance";
import { AxiosResponse } from "axios";

export const getUserData = async (
  session: Session,
): Promise<User | null> => {
  if (!session) {
    return null;
  }

  try {
    const response: AxiosResponse<User> = await api.get("/google/me", {
      headers: {
        Authorization: `Bearer ${session}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};
