"use server"

import { User } from "@/types/user";
import {cookies} from "next/headers"
import { redirect } from "next/navigation";
import api from "@/utils/axios-instance";

export const getUserData = async (): Promise<User> => {
    const cookieStore = await cookies();
    const access_token = cookieStore.get("access_token");
    if (!access_token) {
      redirect("/");
    }

    try {
      const response = await api.get("/google/me", {
        headers: {
          Authorization: `Bearer ${access_token.value}`,
        },
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  };