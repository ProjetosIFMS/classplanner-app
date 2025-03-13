import { Session } from "@/types/session";
import { AreaValues } from "@/types/validation/area_form";
import api from "@/utils/axios-instance";

export const createArea = async (session: Session, formData: AreaValues) => {
  try {
    const isAreaCreated = await api.post("/area", formData, {
      headers: {
        Authorization: `Bearer ${session}`,
      },
    });
    return isAreaCreated.data;
  } catch (err) {
    throw err;
  }
};
