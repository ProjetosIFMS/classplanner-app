import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

import { createCourse } from "@/app/_actions/course/createCourse";
import { getCourses } from "@/app/_actions/getCourses";
import { Course } from "@/types/course";
import { Session } from "@/types/session";
import { CourseValues } from "@/types/validation/course_form";
import { updateCourse } from "@/app/_actions/course/updateCourse";
import { deleteCourse } from "@/app/_actions/course/deleteCourse";

export function useGetAllCourses(session: Session) {
  return useQuery({
    queryKey: ["GET", "course"],
    queryFn: async () => await getCourses(session),
    enabled: !!session,
  });
}

export function usePostCourse(session: Session) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["POST", "course"],
    mutationFn: (formData: CourseValues): Promise<Course | null> =>
      createCourse(session, formData),
    onMutate: async (formData) => {
      await queryClient.cancelQueries({ queryKey: ["GET", "course"] });

      const previousCourses =
        queryClient.getQueryData<Course[]>(["GET", "course"]) || [];

      const tempId = `temp-${Date.now()}`;

      const newCourse: Course = {
        id: tempId,
        ...formData,
      };

      queryClient.setQueryData<Course[]>(
        ["GET", "course"],
        [...previousCourses, newCourse]
      );

      return { previousCourses };
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["GET", "course"] });
    },
  });
}

export function usePatchCourse(session: Session) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["PATCH", "course"],
    mutationFn: ({
      formData,
      course_id,
    }: {
      formData: CourseValues;
      course_id: string;
    }): Promise<Course | null> => updateCourse(session, formData, course_id),
    onMutate: async ({ formData, course_id }) => {
      await queryClient.cancelQueries({ queryKey: ["GET", "course"] });

      const tempId = `temp-${Date.now()}`;

      const previousCourses =
        queryClient.getQueryData<Course[]>(["GET", "course"]) || [];

      queryClient.setQueryData<Course[]>(["GET", "course"], (oldData) => {
        if (!oldData) return [];

        return oldData.map((course) => {
          return course.id === course_id
            ? { ...course, ...formData, id: tempId }
            : course;
        });
      });

      return { previousCourses };
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["GET", "course"] });
    },
  });
}

export function useDeleteCourse(session: Session) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["DELETE", "course"],
    mutationFn: (course_id: string): Promise<boolean> =>
      deleteCourse(session, course_id),
    onMutate: async (course_id) => {
      await queryClient.cancelQueries({ queryKey: ["GET", "course"] });

      const previousCourses =
        queryClient.getQueryData<Course[]>(["GET", "course"]) || [];

      queryClient.setQueryData<Course[]>(
        ["GET", "course"],
        previousCourses.filter((course) => course.id !== course_id)
      );

      return { previousCourses };
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["GET", "course"] });
    },
  });
}
