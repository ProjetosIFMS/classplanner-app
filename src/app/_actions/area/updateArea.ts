import { AreaValues } from "@/types/validation/area_form";
import api from "@/utils/axios-instance";

export const updateArea = async (
  session: string | undefined,
  area_id: string,
  formData: AreaValues
) => {
  try {
    const res = await api.patch(`/area/${area_id}`, formData, {
      headers: {
        Authorization: `Bearer ${session}`,
      },
    });

    return res.data;
  } catch (err) {
    throw err;
  }
};
