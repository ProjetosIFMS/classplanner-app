"use server";

import { Session } from "@/types/session";
import api from "@/utils/axios-instance";

export async function deleteCourse(session: Session, course_id: string) {
  try {
    const course = await api.delete(`course/${course_id}`, {
      headers: {
        Authorization: `Bearer ${session}`,
      },
    });

    return course.data;
  } catch (err) {
    throw err;
  }
}
