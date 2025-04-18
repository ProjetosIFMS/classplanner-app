import { Session } from "@/types/session";
import { SelectDayOffValues } from "@/types/validation/select-day-off_form";
import api from "@/utils/axios-instance";
import { AxiosResponse } from "axios";

export const createDayOff = async (
  session: Session,
  formData: SelectDayOffValues,
) => {
  try {
    const res: AxiosResponse<SelectDayOffValues> = await api.post(
      "/dayoff",
      formData,
      {
        headers: {
          Authorization: `Bearer ${session}`,
        },
      },
    );
    return res.data;
  } catch (error) {
    throw error;
  }
};
