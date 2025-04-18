import { getAllUsers } from "@/app/_actions/user/getAllUsers";
import { Session } from "@/types/session";
import { useQuery } from "@tanstack/react-query";

export function useGetAllUsers(session: Session) {
  return useQuery({
    queryKey: ["GET", "user"],
    queryFn: () => getAllUsers(session),
  });
}
