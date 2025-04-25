import { getCourses } from "@/app/_actions/getCourses";
import { Session } from "@/types/session";
import { useQuery } from "@tanstack/react-query";

export function useGetAllCourses(session: Session) {
  return useQuery({
    queryKey: ["GET", "course"],
    queryFn: async () => await getCourses(session),
    enabled: !!session,
  });
}
