import { Course } from "@/types/course";
import api from "@/utils/axios-instance";
import { AxiosResponse } from "axios";

export async function getCourses(session: string): Promise<Course[]> {
  try {
    const res: AxiosResponse<Course[]> = await api.get("/course", {
      headers: {
        Authorization: `Bearer ${session}`,
      },
    });
    return res.data;
  } catch (err) {
    throw err;
  }
}
