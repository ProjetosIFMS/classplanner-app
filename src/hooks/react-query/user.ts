import { getUserData } from "@/app/_actions/getUserData";
import { getAllUsers } from "@/app/_actions/user/getAllUsers";
import { Session } from "@/types/session";
import { useQuery } from "@tanstack/react-query";

export function useGetAllUsers(session: Session) {
  return useQuery({
    queryKey: ["GET", "users"],
    queryFn: () => getAllUsers(session),
  });
}

export function useGetUserData(session: Session) {
  return useQuery({
    queryKey: ["GET", "user"],
    queryFn: async () => await getUserData(session),
    enabled: !!session,
  });
}
