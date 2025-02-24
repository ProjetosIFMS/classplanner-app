"use server";

import api from "@/utils/axios-instance";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const getAreas = async () => {
  try {
    const cookieStore = await cookies();
    const access_token = cookieStore.get("access_token");
    if (!access_token) {
      redirect("/");
    }

    const res = await api.get("/area", {
      headers: {
        Authorization: `Bearer ${access_token.value}`,
      },
    });
    return res.data;
  } catch (error) {
    throw new Error(`Error retrieving areas: ${error}`);
  }
};

export const updateArea = async (area_id: string) => {
  try {
    const cookieStore = await cookies();
    const access_token = cookieStore.get("access_token");
    if (!access_token) {
      redirect("/");
    }

    const bodyData = {
      area_id: area_id,
    };

    const res = await api.patch("/user/select-area", bodyData, {
      headers: {
        Authorization: `Bearer ${access_token.value}`,
      },
    });
    if (res.status == 200) redirect("/professor/dashboard");
  } catch (error) {
    throw new Error(`Error updating user area: ${error}`);
  }
};
