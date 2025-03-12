"use server";

import { Session } from "@/types/session";
import { CourseValues } from "@/types/validation/course_form";
import api from "@/utils/axios-instance";

export const createCourse = async (
  session: Session,
  formData: CourseValues,
) => {
  try {
    const isCreated = await api.post("course/", formData, {
      headers: {
        Authorization: `Bearer ${session}`,
      },
    });

    return isCreated.data;
  } catch (err) {
    throw err;
  }
};
