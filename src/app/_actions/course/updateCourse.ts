"use server";

import { Session } from "@/types/session";
import { CourseValues } from "@/types/validation/course_form";
import api from "@/utils/axios-instance";

export async function updateCourse(
  session: Session,
  formData: CourseValues,
  course_id: string
) {
  try {
    const course = await api.patch(`course/${course_id}`, formData, {
      headers: {
        Authorization: `Bearer ${session}`,
      },
    });

    return course.data;
  } catch (err) {
    throw err;
  }
}
