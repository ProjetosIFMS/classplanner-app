'use server'
import { Course } from "@/types/course";
import { Session } from "@/types/session";
import api from "@/utils/axios-instance";
import { AxiosResponse } from "axios";

export async function getCourses(session: Session): Promise<Course[]> {
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
