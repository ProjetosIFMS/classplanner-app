"use server";
import api from "@/utils/axios-instance";

export const getAreas = async (session: string | undefined) => {
  try {
    const res = await api.get("/area", {
      headers: {
        Authorization: `Bearer ${session}`,
      },
    });
    return res.data;
  } catch (error) {
    throw new Error(`${error}`);
  }
};

export const updateArea = async (area_id: string, session: string) => {
  try {
    const bodyData = {
      area_id: area_id,
    };

    const res = await api.patch("/user/select-area", bodyData, {
      headers: {
        Authorization: `Bearer ${session}`,
      },
    });
    return res.data;
  } catch (error) {
    throw new Error(`${error}`);
  }
};
