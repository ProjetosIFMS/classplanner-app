"use server";

import { User } from "@/types/user";
import api from "@/utils/axios-instance";
import { AxiosResponse } from "axios";

export const getUserData = async (
  access_token: string | undefined,
): Promise<User | null> => {
  if (!access_token) {
    return null;
  }

  try {
    const response: AxiosResponse<User> = await api.get("/google/me", {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });

    return response.data;
  } catch (error) {
    throw error;
  }
};
