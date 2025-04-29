import { Session } from "@/types/session";
import { ClassgradeValues } from "@/types/validation/class-grade_form";
import api from "@/utils/axios-instance";

export const createClassgrade = async (
  formData: ClassgradeValues,
  session: Session
) => {
  try {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { period, ...data } = formData;
    const res = await api.post("/classgrade", data, {
      headers: {
        Authorization: `Bearer ${session}`,
      },
    });
    return res.data;
  } catch (err) {
    throw err;
  }
};
