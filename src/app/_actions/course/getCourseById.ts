"use server";

import api from "@/utils/axios-instance";

import { Session } from "@/types/session";
import { Course } from "@/types/course";
import { AxiosResponse } from "axios";

export async function getCourseById(
  session: Session,
  course_id: string
): Promise<Course | null> {
  try {
    const res: AxiosResponse<Course> = await api.get(`/course/${course_id}`, {
      headers: {
        Authorization: `Bearer ${session}`,
      },
    });

    return res.data;
  } catch (err) {
    throw err;
  }
}
