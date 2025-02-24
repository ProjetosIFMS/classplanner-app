"use server";

import { User } from "@/types/user";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import api from "@/utils/axios-instance";
import { AxiosResponse } from "axios";

export const getUserData = async (): Promise<User> => {
  const cookieStore = await cookies();
  const access_token = cookieStore.get("access_token");

  if (!access_token) {
    redirect("/");
  }

  try {
    const response: AxiosResponse<User> = await api.get("/google/me", {
      headers: {
        Authorization: `Bearer ${access_token.value}`,
      },
    });

    if (!response.data.area_id && response.data.role == "PROFESSOR") {
      redirect("/professor/select-area");
    }

    return response.data;
  } catch (error) {
    throw error;
  }
};
